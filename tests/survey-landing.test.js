const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const page = fs.readFileSync(path.join(root, "app/survey2026.html"), "utf8");
const nav = fs.readFileSync(path.join(root, "app/nav.js"), "utf8");
const app = fs.readFileSync(path.join(root, "app/app.js"), "utf8");
const tz = fs.readFileSync(path.join(root, "docs/TZ.md"), "utf8");
const runbookPath = path.join(root, "bot/RUNBOOK.local.md");
const runbook = fs.existsSync(runbookPath)
    ? fs.readFileSync(runbookPath, "utf8")
    : null;

assert.match(page, /Итоги опроса 2026/);
assert.match(page, /https:\/\/landscape1c\.ru\/og-survey2026\.png/);
assert.match(page, /Итоги опроса 2026/);
assert.doesNotMatch(page, /Финальные результаты опроса 2026<\/span>/);
assert.match(page, /Опрос 2026/);
assert.match(page, /ITEM\.get\(r\.name\).*aliases/);
assert.match(page, /rng-empty/);
assert.match(page, /rng-empty__title/);
assert.match(page, /Попробуйте изменить запрос/);
assert.match(page, /Не нашлось таких инструментов/);
assert.doesNotMatch(page, /Опрос продолжается/);
assert.doesNotMatch(page, /sv-landing/);
assert.doesNotMatch(page, /<aside class="filters"/);
assert.match(page, /src="survey2026\.js\?v=/);
assert.doesNotMatch(page, /survey2026-current|survey-merge/);
assert.match(page, /\$\("#who"\)\.addEventListener\("click"/);
assert.doesNotMatch(page, /stateof1c-test-/);
assert.match(nav, /\["survey2026\.html", "Опрос 2026"\]/);
assert.match(app, /const SURVEY_BANNER_ENABLED = false;/);
assert.match(app, /href="survey2026\.html"[^>]*>Смотреть результаты →/);
assert.match(app, /https:\/\/t\.me\/stateOf1c_bot/);
assert.match(app, /https:\/\/max\.ru\/se13951546_bot/);

assert.match(tz, /MAX[^\n]+реализован/i);
assert.doesNotMatch(tz, /Бот в MAX[^\n]+отложен до волны 2027/i);

if (runbook) {
    assert.match(runbook, /systemctl stop stateof1c stateof1c-max/);
    assert.match(runbook, /systemctl start stateof1c stateof1c-max/);
    assert.match(runbook, /printf[^\n]+>> \/etc\/stateof1c\.env/);
}

console.log("survey landing: ok");
