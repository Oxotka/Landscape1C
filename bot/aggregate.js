// Агрегация ответов опроса в статические данные для витрины:
//   node bot/aggregate.js [путь к answers.jsonl] [--out файл]
//   По умолчанию результат пишется в app/survey2026.js
// Формат вывода — window.SURVEY (тот же паттерн, что app/data.js: подключается
// тегом <script>, работает через file://). Смотреть — app/survey2026.html
// (до публикации итогов страница и данные исключены из dist/гита).
// Никакой персоналки в выводе нет: только агрегаты по инструментам и срезам.
//
// Счетчики лежат по ячейкам роль×уровень×контекст (cells): витрина складывает
// ячейки под текущий отбор с семантикой фильтров сайта — ИЛИ внутри оси,
// И между осями. Ячейка инструмента: [роль, уровень, контекст, работал,
// слышал, впервые, снова, не снова, хочу, не хочу] (оси — индексы в dims).
"use strict";
const fs = require("fs");
const path = require("path");
const { byName } = require("./lib/quiz");

const FILE = process.argv[2] || path.join(__dirname, "answers.jsonl");
const outArg = process.argv.indexOf("--out");
const OUT =
    outArg >= 0 && process.argv[outArg + 1]
        ? path.resolve(process.argv[outArg + 1])
        : path.join(__dirname, "..", "app", "survey2026.js");
if (FILE !== "-" && !fs.existsSync(FILE)) {
    console.error(`Не найден журнал ответов: ${FILE}`);
    process.exit(1);
}
const source =
    FILE === "-" ? fs.readFileSync(0, "utf8") : fs.readFileSync(FILE, "utf8");
const rows = source
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l));

// Последний ответ респондента по инструменту побеждает (как в report.js);
// профиль респондента — из его последней записи (переонбординг меняет роль)
const last = new Map();
const profile = new Map();
rows.forEach((r) => {
    last.set(`${r.uid}|${r.tool}`, r);
    profile.set(r.uid, r);
});

// Значения осей: порядок — по убыванию респондентов (в таком идут чипы витрины).
// Профиль в ячейке инструмента — из самого ответа (каким был респондент в
// момент ответа), поэтому подмешиваем и значения из старых ответов: после
// переонбординга их может не быть ни у одного текущего профиля
const count = (map, key) => map.set(key, (map.get(key) || 0) + 1);
const DIMS = ["role", "level", "context"];
const vals = { role: new Map(), level: new Map(), context: new Map() };
rows.forEach((r) =>
    DIMS.forEach((d) => vals[d].has(r[d]) || vals[d].set(r[d], 0)),
);
for (const p of profile.values()) DIMS.forEach((d) => count(vals[d], p[d]));
const dims = {};
const ix = {};
for (const d of DIMS) {
    dims[d] = [...vals[d].entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([v]) => v);
    ix[d] = new Map(dims[d].map((v, i) => [v, i]));
}
const keyOf = (r) => DIMS.map((d) => ix[d].get(r[d])).join("|");

// Респонденты по ячейкам
const respCells = new Map();
for (const p of profile.values()) count(respCells, keyOf(p));

// Счетчики инструмента в ячейке
const blank = () => ({
    used: 0,
    heard: 0,
    unknown: 0,
    again: 0,
    notAgain: 0,
    want: 0,
    notWant: 0,
});
const add = (t, r) => {
    if (r.answer === "работал") {
        t.used++;
        if (r.sentiment === "да") t.again++;
        if (r.sentiment === "нет") t.notAgain++;
    } else if (r.answer === "слышал") {
        t.heard++;
        if (r.sentiment === "да") t.want++;
        if (r.sentiment === "нет") t.notWant++;
    } else t.unknown++;
};
const tools = new Map();
for (const r of last.values()) {
    const t = tools.get(r.tool) || new Map();
    const k = keyOf(r);
    if (!t.has(k)) t.set(k, blank());
    add(t.get(k), r);
    tools.set(r.tool, t);
}

const toCells = (m, tail) =>
    [...m.entries()].map(([k, c]) => [...k.split("|").map(Number), ...tail(c)]);
const sumAt = (t, i) => t.cells.reduce((s, c) => s + c[i], 0);
const totalOf = (t) => sumAt(t, 3) + sumAt(t, 4) + sumAt(t, 5);

const out = {
    wave: rows[0] ? rows[0].wave : null,
    generated: new Date().toISOString(),
    dims,
    respondents: {
        total: profile.size,
        cells: toCells(respCells, (n) => [n]),
    },
    tools: [...tools.entries()]
        .map(([name, m]) => {
            const i = byName(name) || {};
            return {
                name,
                category: i.category || null,
                maturity: i.maturity || null,
                cells: toCells(m, (c) => [
                    c.used,
                    c.heard,
                    c.unknown,
                    c.again,
                    c.notAgain,
                    c.want,
                    c.notWant,
                ]),
            };
        })
        .sort((a, b) => sumAt(b, 3) - sumAt(a, 3) || totalOf(b) - totalOf(a)),
};

fs.writeFileSync(
    OUT,
    "// Сгенерировано bot/aggregate.js — не править руками\n" +
        `window.SURVEY = ${JSON.stringify(out, null, 2)
            // числовые массивы (ячейки) — в одну строку, иначе файл разбухает
            .replace(/\[[\d\s,]+\]/g, (m) => m.replace(/\s+/g, ""))};\n`,
);
console.log(
    `${OUT}: респондентов ${out.respondents.total}, инструментов ${out.tools.length}, уникальных ответов ${last.size}`,
);
