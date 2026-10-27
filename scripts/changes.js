// Восстановить публичную историю карточек из полной истории Git.
// Запуск после правок каталога: node scripts/changes.js
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");
const ROOT = path.join(__dirname, "..");
const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
const fields = ["maturity", "roles", "contexts", "category", "subcategory", "license", "origin", "availability", "description", "why", "start", "homepage", "repo", "analogs", "depends", "hidden", "hiddenReason", "logo", "logoInvert"];
function read(source) {
    const context = { window: {} };
    vm.runInNewContext(source, context, { timeout: 1000 });
    return context.window.LANDSCAPE.items;
}
function equal(a, b) {
    const normalize = (v) => Array.isArray(v) && v.every((x) => typeof x === "string") ? [...v].sort() : v ?? null;
    return JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));
}
function collect(snapshots) {
    const events = new Map();
    let previous = new Map();
    for (const { date, items } of snapshots) {
        const current = new Map(items.map((item) => [item.name, item]));
        for (const [name, item] of current) {
            const old = previous.get(name);
            const eventDate = old ? date : item.added || date;
            const changes = old ? fields.filter((field) => !equal(old[field], item[field])).map((field) => ({ field, before: old[field] ?? null, after: item[field] ?? null })) : [];
            if (old && !changes.length) continue;
            const key = eventDate + "\n" + name;
            let event = events.get(key);
            if (!event) {
                event = { date: eventDate, name, type: old ? "updated" : "added", changes: [] };
                events.set(key, event);
            }
            if (event.type === "added") continue;
            for (const change of changes) {
                const existing = event.changes.find((c) => c.field === change.field);
                if (existing) existing.after = change.after;
                else event.changes.push(change);
            }
            event.changes = event.changes.filter((c) => !equal(c.before, c.after));
        }
        previous = current;
    }
    return [...events.values()].filter((e) => e.type === "added" || e.changes.length)
        .sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name, "ru", { numeric: true }));
}
function applyReasons(events, reasons) {
    const indexed = new Map(events.map((event) => [event.date + "\n" + event.name, event]));
    const seen = new Set();
    const omitted = new Set();
    for (const entry of reasons) {
        const key = [entry.date, entry.name, entry.field].join("\n");
        if (seen.has(key)) throw new Error(`Повтор причины: ${entry.date} / ${entry.name} / ${entry.field}`);
        seen.add(key);
        const event = indexed.get(entry.date + "\n" + entry.name);
        const change = event?.changes.find((item) => item.field === entry.field);
        if (entry.omit === true) {
            if (!change || typeof entry.source !== "string" || !entry.source.trim()) {
                throw new Error(`Некорректное исключение: ${entry.date} / ${entry.name} / ${entry.field}`);
            }
            omitted.add(entry.date + "\n" + entry.name);
            continue;
        }
        if (!change || typeof entry.reason !== "string" || !entry.reason.trim() || typeof entry.source !== "string" || !entry.source.trim()) {
            throw new Error(`Некорректная причина: ${entry.date} / ${entry.name} / ${entry.field}`);
        }
        change.reason = entry.reason.trim();
    }
    return events.filter((event) => !omitted.has(event.date + "\n" + event.name));
}
if (require.main === module) {
    let inRepository = false;
    try {
        inRepository = git("rev-parse", "--is-inside-work-tree").trim() === "true";
    } catch (error) {
        if (!process.argv.includes("--if-available")) throw error;
    }
    if (!inRepository && process.argv.includes("--if-available")) {
        if (!fs.existsSync(path.join(ROOT, "app/changes.js"))) throw new Error("Нет сохраненной истории изменений");
        console.warn("Git недоступен: используется сохраненная история изменений");
        process.exit(0);
    }
    if (git("rev-parse", "--is-shallow-repository").trim() === "true") throw new Error("Нужна полная история Git: выполните git fetch --unshallow");
    const commits = git("log", "--reverse", "--first-parent", "--format=%H %cs", "--", "app/data.js").trim().split("\n");
    const snapshots = commits.map((line) => {
        const [hash, date] = line.split(" ");
        return { date, items: read(git("show", `${hash}:app/data.js`)) };
    });
    // Незакоммиченные содержательные правки также видны в локальном прототипе.
    const current = read(fs.readFileSync(path.join(ROOT, "app/data.js"), "utf8"));
    if (JSON.stringify(current) !== JSON.stringify(snapshots.at(-1).items)) {
        const now = new Date();
        const date = now.toLocaleDateString("sv-SE", { timeZone: "Europe/Moscow" });
        snapshots.push({ date, items: current });
    }
    const reasonsPath = path.join(ROOT, "data/change-reasons.json");
    const reasons = fs.existsSync(reasonsPath) ? JSON.parse(fs.readFileSync(reasonsPath, "utf8")) : [];
    const events = applyReasons(collect(snapshots), reasons);
    const output = path.join(ROOT, "app/changes.js");
    let saved;
    if (fs.existsSync(output)) {
        const context = { window: {} };
        vm.runInNewContext(fs.readFileSync(output, "utf8"), context, { timeout: 1000 });
        saved = context.window.LANDSCAPE_CHANGES;
    }
    if (JSON.stringify(saved) !== JSON.stringify(events)) {
        fs.writeFileSync(output, "// История карточек. Генератор: node scripts/changes.js\nwindow.LANDSCAPE_CHANGES = " + JSON.stringify(events, null, 2) + ";\n");
    }
    console.log(`История: ${events.length} событий из ${commits.length} версий каталога`);
}
module.exports = { collect, applyReasons };
