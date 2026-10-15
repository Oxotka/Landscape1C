// Готовит единый опубликованный набор опроса из архивных агрегатов.
// Запуск: node scripts/survey-publish.js
"use strict";
const fs = require("fs");
const path = require("path");
const mergeSurvey = require("./lib/survey-merge.js");
const root = path.join(__dirname, "..");
const archive = path.join(root, "data", "surveys", "2026");
const july = JSON.parse(fs.readFileSync(path.join(archive, "july.json"), "utf8"));
const september = JSON.parse(fs.readFileSync(path.join(archive, "september.json"), "utf8"));
const survey = mergeSurvey(september, july);
const json = JSON.stringify(survey, null, 2)
    .replace(/\[[\d\s,]+\]/g, (cell) => cell.replace(/\s+/g, ""));
fs.writeFileSync(
    path.join(root, "app", "survey2026.js"),
    "// Итоговые данные опроса сообщества 2026. Единственный опубликованный набор.\n" +
    "// Сгенерировано scripts/survey-publish.js из data/surveys/2026/ — не править руками.\n" +
    `window.SURVEY = ${json};\n`,
);
console.log(`✓ Опрос 2026: ${survey.tools.length} инструментов; ${survey.respondents.total} участников сентябрьского сбора`);
