const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const page = fs.readFileSync(path.join(root, "app/survey2026.html"), "utf8");
const nav = fs.readFileSync(path.join(root, "app/nav.js"), "utf8");
const tz = fs.readFileSync(path.join(root, "docs/TZ.md"), "utf8");
const runbook = fs.readFileSync(
    path.join(root, "bot/RUNBOOK.local.md"),
    "utf8",
);

assert.match(page, /Состояние ландшафта 1С 2026/);
assert.match(page, /Какими инструментами 1С пользуются на самом деле/);
assert.match(page, /https:\/\/t\.me\/stateOf1c_bot/);
assert.match(page, /https:\/\/max\.ru\/se13951546_bot/);
assert.match(page, /https:\/\/landscape1c\.ru\/og-survey2026\.png/);
assert.match(page, /Предварительный этап/);
assert.doesNotMatch(page, /sv-landing__facts/);
assert.doesNotMatch(page, /<aside class="filters"/);
assert.match(page, /предварительный этап/i);
assert.match(page, /\$\("#who"\)\.addEventListener\("click"/);
assert.doesNotMatch(page, /stateof1c-test-/);

const landing = page.match(/<section class="sv-landing"[\s\S]+?<\/section>/)[0];
assert.doesNotMatch(landing, /ё/i);
assert.match(page, /@media \(hover: hover\)/);
assert.match(page, /\.sv-answer:hover/);
assert.match(page, /prefers-reduced-motion: reduce/);
assert.match(page, /\.sv-landing__actions\s*\{[^}]*justify-content:\s*center/s);
assert.match(page, /\.sv-landing__action\s*\{[^}]*min-height:\s*58px/s);
assert.match(nav, /\["survey2026\.html", "Опрос 2026"\]/);

assert.match(tz, /MAX[^\n]+реализован/i);
assert.doesNotMatch(tz, /Бот в MAX[^\n]+отложен до волны 2027/i);

assert.match(runbook, /systemctl stop stateof1c stateof1c-max/);
assert.match(runbook, /systemctl start stateof1c stateof1c-max/);
assert.match(runbook, /printf[^\n]+>> \/etc\/stateof1c\.env/);

console.log("survey landing: ok");
