const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const merge = require("../scripts/lib/survey-merge.js");
const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const july = JSON.parse(read("data/surveys/2026/july.json"));
const september = JSON.parse(read("data/surveys/2026/september.json"));
const context = { window: {} };
vm.runInNewContext(read("app/survey2026.js"), context);
const survey = JSON.parse(JSON.stringify(context.window.SURVEY));
assert.deepEqual(survey, merge(september, july));
assert.equal(survey.tools.length, 215);
assert.equal(survey.respondents.total, 316);
assert.equal(survey.tools.filter((t) => t.july).length, 13);
assert.equal(new Set(survey.tools.map((t) => t.name)).size, 215);
vm.runInNewContext(read("app/shared.js"), context);
for (const [name, n] of [["KOT for 1C", 94], ["Умный мониторинг", 42]]) {
    const tool = survey.tools.find((t) => t.name === name);
    assert.equal(tool.july, false);
    assert.equal(context.window.LandscapeUI.surveyOf(name).source, "Опрос 2026");
    assert.equal(context.window.LandscapeUI.surveyOf(name).n, n);
    assert.equal(tool.cells.reduce((sum, c) => sum + c[3] + c[4] + c[5], 0), n);
    assert.equal(tool.cells.reduce((sum, c) => sum + c[3], 0), 0);
}
for (const name of ["index", "graph", "scheme", "path", "survey2026"]) {
    const page = read(`app/${name}.html`);
    assert.equal((page.match(/src="survey2026\.js\?/g) || []).length, 1);
    assert.doesNotMatch(page, /survey2026-current|survey-merge|survey-preview|SURVEY_JULY/);
    for (const match of page.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
        if (match[1].includes("application/ld+json")) continue;
        new vm.Script(match[2], { filename: `${name}.html` });
    }
}
// Локальные файлы подхватываются только по явному запросу, а не при каждом визите.
const preview = read("app/survey2026.html").match(/<script>\s*(window\.SURVEY_PUBLISHED[\s\S]*?)<\/script>/)[1];
for (const [hostname, search, loads] of [
    ["localhost", "", 0],
    ["localhost", "?data=live", 1],
    ["localhost", "?preview=1", 1],
    ["landscape1c.ru", "?data=live", 0],
]) {
    const writes = [];
    const window = { SURVEY: survey };
    vm.runInNewContext(preview, {
        window, location: { hostname, search }, URLSearchParams,
        document: { write: (s) => writes.push(s) },
    });
    assert.equal(writes.length, loads);
    if (!loads) assert.equal(window.SURVEY, survey);
    assert.equal(window.SURVEY_PUBLISHED, survey);
}
console.log("survey published data: ok");
