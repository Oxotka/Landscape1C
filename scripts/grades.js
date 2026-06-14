// Разметка грейдов «инструмент → грейд» в разрезе роли (слой компетенций).
// Источник правил — карта ниже (см. docs/competencies/draft-grades.md).
// Проставляет item.grade = { разработчик: "junior|middle|senior|senior+" }
// всем инструментам с ролью «разработчик».
//
//   node scripts/grades.js            # dry-run: покажет раскладку, файл не тронет
//   node scripts/grades.js --apply    # запишет app/data.js (тем же форматом, что редактор)
//
// Перед записью прогоняет round-trip самопроверку: пересборка без изменений
// обязана совпасть с файлом байт-в-байт — иначе дифф был бы шумным.
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "app", "data.js");
const APPLY = process.argv.includes("--apply");

const src = fs.readFileSync(DATA, "utf8");
const m = src.match(/window\.LANDSCAPE\s*=\s*(\{[\s\S]*\});?\s*$/);
const D = eval("(" + m[1] + ")");

// ── точная копия сериализации редактора (editor.js buildData/dataJS) ──
function buildData(D) {
    const items = D.items.map((it) => {
        const { umbrella, analogs, depends, ...rest } = it;
        const o = { ...rest };
        if (analogs && analogs.length) o.analogs = analogs;
        if (depends && depends.length) o.depends = depends;
        return o;
    });
    return {
        updated: D.updated,
        categories: D.categories,
        blocks: D.blocks,
        axes: D.axes,
        items,
    };
}
function dataJS(D) {
    return (
        "// Данные ландшафта (Вариант B). Сгенерировано редактором разметки (editor.html).\n" +
        "window.LANDSCAPE = " +
        JSON.stringify(buildData(D), null, 2) +
        ";\n"
    );
}

// ── round-trip: без изменений должно совпасть байт-в-байт ──
if (dataJS(D) !== src) {
    const rt = dataJS(D);
    let i = 0;
    while (i < src.length && src[i] === rt[i]) i++;
    console.error("ROUND-TRIP РАЗЛИЧАЕТСЯ ✗ на позиции", i);
    console.error("ориг :", JSON.stringify(src.slice(i - 40, i + 40)));
    console.error("новый:", JSON.stringify(rt.slice(i - 40, i + 40)));
    process.exit(1);
}
console.log("round-trip ✓");

// ── карта грейдов (роль: разработчик) ──
// значения: junior | middle | senior | senior+
const J = "junior",
    M = "middle",
    S = "senior",
    SP = "senior+";

// грейд по категории (грубо: категория ≈ компетенция)
const byCategory = {
    Прототипирование: S,
    Диаграммы: M,
    "Моделирование и архитектура": S,
    "База знаний": J,
    Разработка: J,
    "Библиотеки и инструменты": J,
    "Плагины и расширения": S,
    "ИИ-ассистенты": M,
    "Системы хранения версий": J,
    "CI/CD": S,
    "Автоматизированное тестирование": S,
    "Статический анализ кода": M,
    "Код-ревью": S,
    "Сетевая инфраструктура и облако": M,
    Безопасность: M,
    "Системы управления базами данных (СУБД)": S,
    Мониторинг: SP,
    "Производительность и нагрузочное тестирование": S,
    Интеграции: M,
    "API и веб-сервисы": M,
    Задачи: M, // дефолт Middle (продвинутые трекеры + канбан); базовые → J по имени
    Сертификация: M, // переопределяется по имени ниже
};

// исключения по имени карточки (важнее категории)
const byName = {
    // Разработка
    "1C:Enterprise Development Tools (EDT)": S,
    "Visual Studio Code (VSCode)": M,
    "1С:Предприятие.Элемент": SP,
    "1C:Предприятие.Элемент Скрипт": SP,
    OneScript: M,
    // Библиотеки и инструменты
    "Infostart Toolkit": M,
    'Подсистема "Инструменты разработчика"': M,
    'Подсистема "Универсальные инструменты 1С для управляемых форм"': M,
    "Библиотеки для OneScript": M,
    "Autumn (ОСень)": SP,
    // Плагины и расширения — по родителю (плагины конфигуратора → Middle)
    TurboConf: M,
    "Плагин для конфигуратора PhoenixBSL": M,
    "Плагин для VSCode «1C:Platform Tools»": M,
    "OneScript Debug (BSL)": M,
    "Language 1C (BSL)": M,
    // База знаний — личное/локальное = J (дефолт), корп-платформы = S, доски = M
    Confluence: S,
    Teamly: S,
    Gramax: S,
    VitePress: S,
    Miro: M,
    Holst: M,
    // Системы хранения версий — Хранилище = J (дефолт); git, хостинги/мосты = M
    git: M,
    GitLab: M,
    GitHub: M,
    GitVerse: M,
    Bitbucket: M,
    GitFlic: M,
    MosHub: M,
    gitsync: M,
    "1С:ГитКонвертер": M,
    // Задачи — базовый трекер остаётся J
    Битрикс24: J,
    // Статический анализ
    "Синтаксическая проверка конфигурации": J,
    "Стандарты разработки": J,
    // СУБД
    "Файловая СУБД": J,
    // Интеграции — продвинутые брокеры/хранилища
    "1С:Шина": S,
    Kafka: S,
    RabbitMQ: S,
    "Объектное хранилище S3": S,
    // Сертификация = подтверждение грейда
    "1С:Профессионал": J,
    "1С:Специалист": S,
    "1С:Эксперт по технологическим вопросам": SP,
    "Сертификация от 1С-ТестЦентр": S,
    "Сертификация от Госуслуг": M,
};

let count = 0;
const missing = [];
for (const it of D.items) {
    if (!(it.roles || []).includes("разработчик")) continue;
    const g = byName[it.name] || byCategory[it.category];
    if (!g) {
        missing.push(it.category + " / " + it.name);
        continue;
    }
    it.grade = { разработчик: g };
    count++;
}
console.log("размечено инструментов разработчика:", count);
if (missing.length) {
    console.log("\n⚠ без грейда (категория не в карте):");
    missing.forEach((x) => console.log("   - " + x));
}

// ── Инвариант: в Junior не должно быть нишевых инструментов → поднимаем в Middle ──
const raised = [];
for (const it of D.items) {
    if (!(it.roles || []).includes("разработчик")) continue;
    if (it.maturity === "нишевое" && it.grade.разработчик === "junior") {
        it.grade.разработчик = "middle";
        raised.push(it.name);
    }
}
if (raised.length)
    console.log("\nподняты нишевые из Junior в Middle:", raised.join(", "));

// ── распределение ──
const dist = {};
for (const it of D.items)
    if (it.grade && it.grade.разработчик)
        dist[it.grade.разработчик] = (dist[it.grade.разработчик] || 0) + 1;
console.log("\nраспределение:", JSON.stringify(dist));

if (!APPLY) {
    console.log("\n(dry-run: --apply не указан, файл не изменён)");
    process.exit(0);
}

fs.writeFileSync(DATA, dataJS(D), "utf8");
console.log("\nзаписано в app/data.js ✓");
