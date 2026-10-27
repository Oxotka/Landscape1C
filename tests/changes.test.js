const { test } = require("node:test");
const assert = require("node:assert/strict");
const { collect } = require("../scripts/changes.js");
const item = (maturity, updated = "2026-10-15") => ({ name: "git", added: "2026-06-01", updated, maturity, roles: ["разработчик", "администратор"] });
test("Хранит переходы между значениями; даты и порядок ролей не создают событий", () => {
    const events = collect([
        { date: "2026-06-01", items: [item("нишевое")] },
        { date: "2026-10-15", items: [item("продвинутое")] },
        { date: "2026-10-15", items: [item("базовое")] },
        { date: "2026-10-16", items: [{ ...item("базовое", "2026-10-16"), roles: ["администратор", "разработчик"] }] },
    ]);
    assert.equal(events.length, 2);
    assert.deepEqual(events[0].changes, [{ field: "maturity", before: "нишевое", after: "базовое" }]);
    assert.equal(events[1].type, "added");
});
test("Отмененная в тот же день правка исчезает из истории", () => {
    const events = collect([
        { date: "2026-06-01", items: [item("базовое")] },
        { date: "2026-10-15", items: [item("нишевое")] },
        { date: "2026-10-15", items: [item("базовое")] },
    ]);
    assert.equal(events.length, 1);
});

test("Генератор сохраняет текущие правки и не переписывает неизменную историю", () => {
    const fs = require("node:fs");
    const os = require("node:os");
    const path = require("node:path");
    const { execFileSync } = require("node:child_process");
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "landscape-history-"));
    const run = (command, args, options = {}) => execFileSync(command, args, { cwd: root, encoding: "utf8", ...options });
    try {
        fs.mkdirSync(path.join(root, "scripts"));
        fs.mkdirSync(path.join(root, "app"));
        fs.copyFileSync(path.join(__dirname, "../scripts/changes.js"), path.join(root, "scripts/changes.js"));
        const data = (maturity) => `window.LANDSCAPE = ${JSON.stringify({ items: [item(maturity)] })};\n`;
        fs.writeFileSync(path.join(root, "app/data.js"), data("продвинутое"));
        run("git", ["init", "-q"]);
        run("git", ["config", "user.name", "History Test"]);
        run("git", ["config", "user.email", "history-test@example.invalid"]);
        run("git", ["add", "app/data.js"]);
        run("git", ["commit", "-qm", "initial"]);
        fs.writeFileSync(path.join(root, "app/data.js"), data("базовое"));
        run(process.execPath, ["scripts/changes.js"]);
        const output = path.join(root, "app/changes.js");
        const context = { window: {} };
        require("node:vm").runInNewContext(fs.readFileSync(output, "utf8"), context);
        const change = context.window.LANDSCAPE_CHANGES.find((event) => event.type === "updated");
        assert.equal(change.changes[0].before, "продвинутое");
        assert.equal(change.changes[0].after, "базовое");
        const original = fs.readFileSync(output, "utf8");
        fs.writeFileSync(output, original.replace("window.LANDSCAPE_CHANGES", "window.LANDSCAPE_CHANGES  "));
        const formatted = fs.readFileSync(output, "utf8");
        run(process.execPath, ["scripts/changes.js"]);
        assert.equal(fs.readFileSync(output, "utf8"), formatted);
    } finally {
        fs.rmSync(root, { recursive: true, force: true });
    }
});

test("При отсутствии Git сборка использует сохраненную историю и сообщает об этом", () => {
    const fs = require("node:fs");
    const os = require("node:os");
    const path = require("node:path");
    const { spawnSync } = require("node:child_process");
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "landscape-no-git-"));
    try {
        fs.mkdirSync(path.join(root, "scripts"));
        fs.mkdirSync(path.join(root, "app"));
        fs.copyFileSync(path.join(__dirname, "../scripts/changes.js"), path.join(root, "scripts/changes.js"));
        const output = path.join(root, "app/changes.js");
        fs.writeFileSync(output, "window.LANDSCAPE_CHANGES = [];\n");
        const result = spawnSync(process.execPath, ["scripts/changes.js", "--if-available"], { cwd: root, encoding: "utf8", env: { ...process.env, PATH: path.join(root, "missing") } });
        assert.equal(result.status, 0, result.stderr);
        assert.match(result.stderr, /используется сохраненная история/);
        assert.equal(fs.readFileSync(output, "utf8"), "window.LANDSCAPE_CHANGES = [];\n");
        fs.rmSync(output);
        const missing = spawnSync(process.execPath, ["scripts/changes.js", "--if-available"], { cwd: root, encoding: "utf8", env: { ...process.env, PATH: path.join(root, "missing") } });
        assert.notEqual(missing.status, 0);
        assert.match(missing.stderr, /Нет сохраненной истории/);
    } finally {
        fs.rmSync(root, { recursive: true, force: true });
    }
});

test("Причина прикрепляется к конкретному полю и не теряется при пересборке", () => {
    const { applyReasons } = require("../scripts/changes.js");
    const snapshots = [
        { date: "2026-06-01", items: [item("продвинутое")] },
        { date: "2026-10-15", items: [item("базовое")] },
    ];
    const reasons = [{ date: "2026-10-15", name: "git", field: "maturity", reason: "По итогам опроса", source: "docs/decisions/2026-survey.md" }];
    for (let i = 0; i < 2; i++) {
        const events = applyReasons(collect(snapshots), reasons);
        assert.equal(events[0].changes[0].reason, "По итогам опроса");
        assert.equal(events[1].changes.length, 0);
    }
    assert.throws(() => applyReasons(collect(snapshots), [reasons[0], reasons[0]]), /Повтор причины/);
    assert.throws(() => applyReasons(collect(snapshots), [{ ...reasons[0], field: "roles" }]), /Некорректная причина/);
    assert.throws(() => applyReasons(collect(snapshots), [{ ...reasons[0], source: "" }]), /Некорректная причина/);
});

test("Цифры опроса в причинах зрелости совпадают с опубликованным набором", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const vm = require("node:vm");
    const root = path.join(__dirname, "..");
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(root, "app/survey2026.js"), "utf8"), context);
    const reasons = JSON.parse(fs.readFileSync(path.join(root, "data/change-reasons.json"), "utf8"))
        .filter((r) => r.date === "2026-10-15" && r.field === "maturity");
    assert.equal(reasons.length, 12);
    for (const reason of reasons) {
        const tool = context.window.SURVEY.tools.find((t) => t.name === reason.name);
        assert.ok(tool, reason.name);
        const [used, heard, unknown] = tool.cells.reduce((sum, cell) => sum.map((n, i) => n + cell[i + 3]), [0, 0, 0]);
        const total = used + heard + unknown;
        const percent = (100 * used / total).toFixed(1).replace(".", ",");
        assert.ok(reason.reason.includes(`${used} из ${total} ответивших (${percent}%)`), reason.name);
    }
});
