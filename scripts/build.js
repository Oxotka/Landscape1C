// Сборка папки dist/ для ручной выгрузки на хостинг.
// Берёт публичную статику из app/ и выкидывает инструменты разработки.
// Запуск: node scripts/build.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "app");
const DIST = path.join(ROOT, "dist");

// Не нужно на публичном хостинге (только локальная разработка / артефакты).
const EXCLUDE = new Set([
  "editor.html", "editor.js", "editor.css",   // редактор разметки — пишет в data.js, только локально
  ".DS_Store",
]);

// 1. Целостность данных — мусор на хостинг не выкладываем.
execFileSync("node", [path.join(__dirname, "validate.js")], { stdio: "inherit" });

// 2. Освежаем sitemap.xml и llms.txt из данных — в dist уходят актуальные.
execFileSync("node", [path.join(__dirname, "sitegen.js")], { stdio: "inherit" });

// 3. Чистим и копируем app/ → dist/ с фильтром.
fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(APP, DIST, { recursive: true, filter: (src) => !EXCLUDE.has(path.basename(src)) });

// 4. Сводка.
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else files.push(path.relative(DIST, p));
  }
})(DIST);
console.log(`✓ dist/ собран: ${files.length} файлов → ${DIST}`);
