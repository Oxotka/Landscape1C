// Генерирует app/sitemap.xml и app/llms.txt из app/data.js.
// Прогонять после содержательных правок данных (вместе с cachebust).
"use strict";
const fs = require("fs");
const path = require("path");

const SITE = "https://landscape1c.ru/";
const APP = path.join(__dirname, "..", "app");

global.window = {};
require(path.join(APP, "data.js"));
const D = global.window.LANDSCAPE;

const PAGES = [
    ["", "Ландшафт — интерактивная доска инструментов с фильтрами по шести осям"],
    ["path.html", "Путь — маршрут освоения инструментов по роли, от базы к специализации"],
    ["scheme.html", "Схема — постер-древо ландшафта с экспортом в SVG/PNG/PDF"],
    ["graph.html", "Граф — связи инструментов: аналоги и зависимости"],
    ["council.html", "Эксперты — кураторы, выверяющие разметку"],
    ["methodology.html", "Методология — правила разметки осей"],
];

// ── sitemap.xml ───────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    PAGES.map(
        ([p]) =>
            `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`,
    ).join("\n") +
    "\n</urlset>\n";
fs.writeFileSync(path.join(APP, "sitemap.xml"), sitemap);

// ── llms.txt (https://llmstxt.org) ────────────
const esc = (s) => String(s).replace(/\s+/g, " ").trim();
const toolUrl = (name) => `${SITE}?tool=${encodeURIComponent(name)}`;

let md = `# Ландшафт технологий 1С

> Интерактивная карта инструментов экосистемы 1С: ${D.items.length} инструментов, размеченных по роли (разработчик/администратор/тестировщик/аналитик), контексту работы, зрелости, происхождению, лицензии и доступности в РФ. Связи «аналоги» и «зависимости», маршруты освоения по ролям, экспертная выверка разметки. UI на русском языке.

Данные актуальны на: ${D.updated || today}

## Страницы

${PAGES.map(([p, d]) => `- [${d.split(" — ")[0]}](${SITE}${p}): ${d.split(" — ")[1]}`).join("\n")}

## Инструменты

Ссылка каждого инструмента открывает его карточку (описание, «зачем», «с чего начать», аналоги и зависимости).
`;

D.blocks.forEach((block) => {
    md += `\n### ${block.name}\n\n`;
    block.categories.forEach((cat) => {
        const items = D.items.filter((i) => i.category === cat);
        if (!items.length) return;
        md += `**${cat}**\n\n`;
        items.forEach((i) => {
            md += `- [${i.name}](${toolUrl(i.name)}): ${esc(i.description)}\n`;
        });
        md += "\n";
    });
});

fs.writeFileSync(path.join(APP, "llms.txt"), md);
console.log(
    `✓ sitemap.xml (${PAGES.length} страниц) и llms.txt (${D.items.length} инструментов) обновлены`,
);
