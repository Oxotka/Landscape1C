const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const vm = require("node:vm");
const { test } = require("node:test");

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "app/data.js"), "utf8"), context);
const original = JSON.parse(JSON.stringify(context.window.LANDSCAPE));

function validate(fields) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "landscape-hidden-"));
    try {
        fs.mkdirSync(path.join(tmp, "scripts"));
        fs.mkdirSync(path.join(tmp, "app"));
        fs.copyFileSync(path.join(root, "scripts/validate.js"), path.join(tmp, "scripts/validate.js"));
        const { analogs, depends, hidden, hiddenReason, ...first } = original.items[0];
        const item = { ...first, logo: null, ...fields };
        const data = {
            updated: original.updated,
            categories: [item.category],
            blocks: [{ name: "Блок", categories: [item.category] }],
            axes: original.axes,
            items: [item],
        };
        fs.writeFileSync(
            path.join(tmp, "app/data.js"),
            "// Данные ландшафта (Вариант B). Сгенерировано редактором разметки (editor.html).\n" +
            "window.LANDSCAPE = " + JSON.stringify(data, null, 2) + ";\n",
        );
        fs.writeFileSync(
            path.join(tmp, "app/survey2026.js"),
            "window.SURVEY = " + JSON.stringify({ tools: [{ name: item.name, july: false }] }) + ";\n",
        );
        return spawnSync(process.execPath, [path.join(tmp, "scripts/validate.js")], { encoding: "utf8" });
    } finally {
        fs.rmSync(tmp, { recursive: true, force: true });
    }
}

for (const [name, fields] of [
    ["видимая карточка без флага", {}],
    ["явно видимая карточка", { hidden: false }],
    ["скрытая карточка с причиной", { hidden: true, hiddenReason: "Низкая узнаваемость по опросу" }],
]) {
    test(name, () => {
        const result = validate(fields);
        assert.equal(result.status, 0, result.stderr);
    });
}

for (const [name, fields, message] of [
    ["строковый hidden", { hidden: "true" }, /hidden.*boolean/],
    ["числовой hidden", { hidden: 1 }, /hidden.*boolean/],
    ["null вместо флага", { hidden: null }, /hidden.*boolean/],
    ["причина отсутствует", { hidden: true }, /hiddenReason.*непустой строкой/],
    ["пустая причина", { hidden: true, hiddenReason: "" }, /hiddenReason.*непустой строкой/],
    ["причина из пробелов", { hidden: true, hiddenReason: " \t\n " }, /hiddenReason.*непустой строкой/],
    ["причина другого типа", { hidden: true, hiddenReason: 123 }, /hiddenReason.*непустой строкой/],
    ["причина у явно видимой карточки", { hidden: false, hiddenReason: "Причина" }, /hiddenReason.*hidden: true/],
    ["причина без флага скрытия", { hiddenReason: "Причина" }, /hiddenReason.*hidden: true/],
]) {
    test(`отклоняет: ${name}`, () => {
        const result = validate(fields);
        assert.equal(result.status, 1, result.stdout);
        assert.match(result.stderr, message);
    });
}
