// Валидатор данных ландшафта. Запуск: node scripts/validate.js
// Ловит дрейф между app/data.js и инвариантами движка (см. CLAUDE.md).
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..", "app");
global.window = {};
require(path.join(APP, "data.js"));
const D = global.window.LANDSCAPE;

const errors = [];
const E = (msg) => errors.push(msg);

// 1. Значения осей у карточек должны быть из axes.<ось>.values
const scalarAxes = { maturity: "maturity", origin: "origin", license: "license", availability: "availability" };
const arrayAxes = { role: "roles", context: "contexts" };
D.items.forEach((i) => {
  for (const [axis, field] of Object.entries(scalarAxes)) {
    if (i[field] != null && !D.axes[axis].values.includes(i[field]))
      E(`«${i.name}»: ${field}="${i[field]}" нет в axes.${axis}`);
  }
  for (const [axis, field] of Object.entries(arrayAxes)) {
    (i[field] || []).forEach((v) => {
      if (!D.axes[axis].values.includes(v)) E(`«${i.name}»: ${field} содержит "${v}", которого нет в axes.${axis}`);
    });
  }
});

// 2. Категории и блоки: каждая категория ровно в одном блоке
const cats = new Set(D.categories);
D.items.forEach((i) => {
  if (!cats.has(i.category)) E(`«${i.name}»: категория "${i.category}" отсутствует в categories`);
});
if (D.blocks) {
  const inBlocks = D.blocks.flatMap((b) => b.categories);
  inBlocks.forEach((c) => {
    if (!cats.has(c)) E(`блок ссылается на несуществующую категорию "${c}"`);
  });
  D.categories.forEach((c) => {
    const n = inBlocks.filter((x) => x === c).length;
    if (n === 0) E(`категория "${c}" не входит ни в один блок`);
    if (n > 1) E(`категория "${c}" входит в блоки ${n} раз(а)`);
  });
}

// 3. Файлы логотипов существуют
D.items.forEach((i) => {
  if (i.logo && !fs.existsSync(path.join(APP, "logos", i.logo))) E(`«${i.name}»: нет файла logos/${i.logo}`);
});

// 4. Связи analogs/depends резолвятся в существующие карточки
const names = new Set(D.items.map((i) => i.name));
D.items.forEach((i) => {
  ["analogs", "depends"].forEach((rel) =>
    (i[rel] || []).forEach((n) => {
      if (!names.has(n)) E(`«${i.name}»: ${rel} ссылается на несуществующий "${n}"`);
    })
  );
});

// 5. Буква «ё» в видимом тексте (в интерфейсе её не используем)
const yo = (s) => typeof s === "string" && /[ёЁ]/.test(s);
D.items.forEach((i) => {
  ["name", "description", "why", "category", "subcategory"].forEach((f) => {
    if (yo(i[f])) E(`«${i.name}»: буква «ё» в поле ${f}`);
  });
});
D.categories.forEach((c) => {
  if (yo(c)) E(`буква «ё» в категории "${c}"`);
});
Object.entries(D.axes).forEach(([a, ax]) => {
  if (yo(ax.label)) E(`буква «ё» в метке оси ${a}`);
  ax.values.forEach((v) => {
    if (yo(v)) E(`буква «ё» в значении оси ${a}: "${v}"`);
  });
});

// 6. Краткое описание и «зачем» не заканчиваются точкой (последнее предложение — без точки)
D.items.forEach((i) => {
  ["description", "why"].forEach((f) => {
    if (typeof i[f] === "string" && /\.\s*$/.test(i[f]))
      E(`«${i.name}»: поле ${f} заканчивается точкой (последнее предложение — без точки)`);
  });
});

// 7. Ёмкость структуры: подкатегория ≤ 9 инструментов, раздел ≤ 6 категорий
//    (иначе колонка/раздел на схеме-постере смотрятся неудачно — см. METHODOLOGY.md)
const LIMIT_SUB = 9;
const LIMIT_CAT = 6;
const bucket = {};
D.items.forEach((i) => {
  const key = i.category + " :: " + (i.subcategory || "(без подкатегории)");
  bucket[key] = (bucket[key] || 0) + 1;
});
Object.entries(bucket).forEach(([k, n]) => {
  if (n > LIMIT_SUB) E(`подкатегория «${k}» — ${n} инстр. (>${LIMIT_SUB}), разбейте на подкатегории`);
});
if (D.blocks) {
  D.blocks.forEach((b) => {
    if (b.categories.length > LIMIT_CAT)
      E(`раздел «${b.name}» — ${b.categories.length} категорий (>${LIMIT_CAT}), заведите новый раздел`);
  });
}

// 8. Даты: у каждой карточки есть added и updated (ISO YYYY-MM-DD), updated не раньше added.
//    updated штампует редактор при правке — проверка ловит ручные правки data.js без даты.
const isISO = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
D.items.forEach((i) => {
  if (!isISO(i.added)) E(`«${i.name}»: added отсутствует или не в формате YYYY-MM-DD`);
  if (!isISO(i.updated)) E(`«${i.name}»: updated отсутствует или не в формате YYYY-MM-DD (проставьте дату правки)`);
  if (isISO(i.added) && isISO(i.updated) && i.updated < i.added)
    E(`«${i.name}»: updated (${i.updated}) раньше added (${i.added})`);
});

// 9. Имена карточек уникальны (дубль молча «съест» связи и дип-линки)
{
  const seen = new Set();
  D.items.forEach((i) => {
    if (seen.has(i.name)) E(`дубль карточки «${i.name}»`);
    seen.add(i.name);
  });
}

// 10. Связи: analogs симметричны (двусторонние), без самоссылок и дублей внутри массива
const byName = new Map(D.items.map((i) => [i.name, i]));
D.items.forEach((i) => {
  ["analogs", "depends"].forEach((rel) => {
    const arr = i[rel] || [];
    if (arr.includes(i.name)) E(`«${i.name}»: ${rel} ссылается сам на себя`);
    if (new Set(arr).size !== arr.length) E(`«${i.name}»: дубли в ${rel}`);
  });
  (i.analogs || []).forEach((a) => {
    const other = byName.get(a);
    if (other && !(other.analogs || []).includes(i.name))
      E(`аналоги несимметричны: «${i.name}» → «${a}», обратной связи нет`);
  });
});

// 11. Канон-форма файла: data.js должен байт-в-байт совпадать с тем, что пишет редактор
//     (editor.js: JSON.stringify(…, null, 2), без umbrella и пустых analogs/depends).
//     Ловит ручные правки, «уплывшие» от формата, — иначе первое же сохранение
//     в редакторе перезапишет весь файл и даст шумный дифф.
{
  const items = D.items.map(({ umbrella, analogs, depends, ...rest }) => {
    const o = { ...rest };
    if (analogs && analogs.length) o.analogs = analogs;
    if (depends && depends.length) o.depends = depends;
    return o;
  });
  const canon =
    "// Данные ландшафта (Вариант B). Сгенерировано редактором разметки (editor.html).\n" +
    "window.LANDSCAPE = " +
    JSON.stringify({ updated: D.updated, categories: D.categories, blocks: D.blocks, axes: D.axes, items }, null, 2) +
    ";\n";
  const real = fs.readFileSync(path.join(APP, "data.js"), "utf8");
  if (canon !== real) {
    const a = canon.split("\n"), b = real.split("\n");
    let line = 0;
    while (a[line] === b[line]) line++;
    E(`data.js не в канон-форме редактора (первое расхождение — строка ${line + 1}); пересохраните через редактор или приведите правку к формату JSON.stringify(…, null, 2)`);
  }
}

// 12. Опрос (app/survey2026.js) хранится отдельно и связан с карточками только
//     по имени инструмента: разъехавшееся имя молча спрячет полосу опроса на
//     сайте и проценты у аналогов. Ловим переименование карточки без обновления
//     данных опроса (и опечатки в списке инструментов бота).
{
  const surveyFile = path.join(APP, "survey2026.js");
  if (fs.existsSync(surveyFile)) {
    require(surveyFile);
    const S = global.window.SURVEY;
    ((S && S.tools) || []).forEach((t) => {
      if (!names.has(t.name))
        E(`опрос: инструмент «${t.name}» не найден среди карточек data.js (карточку переименовали или удалили?)`);
    });
  }
}

if (errors.length) {
  console.error(`✗ Найдено проблем: ${errors.length}`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(
  `✓ Данные валидны: ${D.items.length} карточек, ${D.categories.length} категорий, ${D.blocks ? D.blocks.length : 0} блоков`
);
