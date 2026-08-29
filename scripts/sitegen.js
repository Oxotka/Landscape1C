// Генерирует из app/data.js: app/sitemap.xml, app/llms.txt и статические
// страницы карточек app/tools/<слаг>.html (посадочные для поисковиков;
// каталог tools/ в git не хранится — пересоздается здесь с нуля).
// Прогонять после содержательных правок данных (вместе с cachebust).
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SITE = "https://landscape1c.ru/";
const APP = path.join(__dirname, "..", "app");

global.window = {};
require(path.join(APP, "data.js"));
require(path.join(APP, "shared.js")); // slugOf — общий с дип-линками сайта
const D = global.window.LANDSCAPE;

const PAGES = [
    [
        "",
        "Ландшафт — интерактивная доска инструментов с фильтрами по шести осям",
    ],
    [
        "path.html",
        "Путь — маршрут освоения инструментов по роли, от базы к специализации",
    ],
    ["scheme.html", "Схема — постер-древо ландшафта с экспортом в SVG/PNG/PDF"],
    ["graph.html", "Граф — связи инструментов: аналоги и зависимости"],
    [
        "survey2026.html",
        "Большой опрос — инструменты 1С и итоги предварительного этапа",
    ],
    ["council.html", "Эксперты — кураторы, выверяющие разметку"],
    ["methodology.html", "Методология — правила разметки осей"],
];

// ── Слаги карточек (транслит имени, уникальность обязательна) ──
const { slugOf } = global.window.LandscapeUI;
const slugs = new Map(); // name → slug
D.items.forEach((i) => {
    const s = slugOf(i.name);
    if ([...slugs.values()].includes(s))
        throw new Error(`слаг «${s}» не уникален (${i.name})`);
    slugs.set(i.name, s);
});

// ── sitemap.xml (страницы сайта + страницы карточек) ──
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.map(([p]) => [SITE + p, today]).concat(
    D.items.map((i) => [`${SITE}tools/${slugs.get(i.name)}.html`, i.updated]),
);
const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
        .map(([u, d]) => `  <url><loc>${u}</loc><lastmod>${d}</lastmod></url>`)
        .join("\n") +
    "\n</urlset>\n";
fs.writeFileSync(path.join(APP, "sitemap.xml"), sitemap);

// ── llms.txt (https://llmstxt.org) ────────────
const esc = (s) => String(s).replace(/\s+/g, " ").trim();
const toolUrl = (name) => `${SITE}tools/${slugs.get(name)}.html`;
// «191 инструмент», «192 инструмента», «195 инструментов»
const tools = (n) =>
    `${n} инструмент` +
    (n % 100 >= 11 && n % 100 <= 14
        ? "ов"
        : n % 10 === 1
          ? ""
          : n % 10 >= 2 && n % 10 <= 4
            ? "а"
            : "ов");

let md = `# Ландшафт технологий 1С

> Интерактивная карта инструментов экосистемы 1С: ${tools(D.items.length)} с разметкой по роли (разработчик/администратор/тестировщик/аналитик), контексту работы, зрелости, происхождению, лицензии и доступности в РФ. Связи «аналоги» и «зависимости», маршруты освоения по ролям, экспертная выверка разметки. UI на русском языке.

Данные актуальны на: ${D.updated || today}

## Страницы

${PAGES.map(([p, d]) => `- [${d.split(" — ")[0]}](${SITE}${p}): ${d.split(" — ")[1]}`).join("\n")}

## Инструменты

Ссылка каждого инструмента ведет на его статическую страницу: описание, «зачем», «с чего начать», аналоги и зависимости (без JS; наверху страницы — переход к живой карточке на карте).
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

// ── Страницы карточек app/tools/<слаг>.html ──────────
// Посадочные для поисковиков: контент карточки + CTA на живую карточку.
// Каталог пересоздается целиком (в .gitignore, генерится при сборке).
const h = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
const cssHash = crypto
    .createHash("md5")
    .update(fs.readFileSync(path.join(APP, "styles.css")))
    .digest("hex")
    .slice(0, 8);

const METRIKA = `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js?id=109810369","ym");ym(109810369,"init",{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});</script>`;

const relLinks = (names) =>
    (names || [])
        .filter((n) => slugs.has(n))
        .map((n) => `<a href="${slugs.get(n)}.html">${h(n)}</a>`)
        .join(", ");

function toolPage(i) {
    const url = `${SITE}tools/${slugs.get(i.name)}.html`;
    const desc = esc(i.description);

    // Заголовок и описание для выдачи. По имени инструмента официальный сайт
    // всегда выигрывает, поэтому целимся в хвост: «<имя> аналоги», «чем
    // заменить», «<имя> обзор» — то, на что у ландшафта есть свой ответ.
    // На саму страницу это не влияет: h1 и og-теги остаются прежними.
    const analogs3 = (i.analogs || []).slice(0, 3);
    const hook = analogs3.length ? "аналоги и обзор" : "обзор и применение";
    // Яндекс режет заголовок примерно на 70 знаках. Если бренд туда не
    // влезает, жертвуем им: ключевые слова в начале строки важнее.
    const titled = `${i.name} — ${hook} · Ландшафт 1С`;
    const seoTitle = titled.length > 70 ? `${i.name} — ${hook}` : titled;
    const seoDesc = [
        `${desc}.`,
        analogs3.length ? `Аналоги: ${analogs3.join(", ")}.` : "",
        `${i.category} в ландшафте технологий 1С`,
    ]
        .filter(Boolean)
        .join(" ");

    const ld = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: i.name,
        description: desc,
        url,
        applicationCategory: "DeveloperApplication",
    };
    const sameAs = [i.homepage, i.repo].filter(Boolean);
    if (sameAs.length) ld.sameAs = sameAs;

    const meta = [i.category, i.subcategory].filter(Boolean).join(" · ");
    const badges = [i.maturity, i.origin, i.license]
        .filter(Boolean)
        .map((b) => `<span class="tp__badge">${h(b)}</span>`)
        .join("");
    const starts = (i.start || [])
        .map(
            (s) =>
                `<li><a href="${h(s.url)}" rel="noopener">${h(s.label)}</a></li>`,
        )
        .join("");
    const links = [
        i.homepage &&
            `<li><a href="${h(i.homepage)}" rel="noopener">Сайт</a></li>`,
        i.repo &&
            `<li><a href="${h(i.repo)}" rel="noopener">Репозиторий</a></li>`,
    ]
        .filter(Boolean)
        .join("");
    const analogs = relLinks(i.analogs);
    const depends = relLinks(i.depends);
    const section = (title, body) =>
        body ? `<h2 class="tp__h">${title}</h2>\n${body}` : "";

    return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${h(seoTitle)}</title>
<meta name="description" content="${h(seoDesc)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Ландшафт технологий 1С" />
<meta property="og:title" content="${h(i.name)}" />
<meta property="og:description" content="${h(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${SITE}og-image.png" />
<script>(function(){try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../styles.css?v=${cssHash}" />
<link rel="icon" href="../favicon.svg" type="image/svg+xml" />
<style>
.tp { max-width: 720px; margin: 0 auto; padding: clamp(24px, 5vw, 56px) clamp(20px, 4vw, 40px); }
.tp__card { background: var(--card); border: 1px solid var(--card-line); padding: clamp(22px, 4vw, 40px); }
.tp__kicker { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; }
.tp__kicker a { color: var(--ink-soft); text-decoration: none; }
.tp__kicker a:hover { color: var(--brand); }
.tp__name { font-family: var(--display); font-weight: 900; font-size: clamp(24px, 5vw, 40px); line-height: 1.15; margin: 14px 0 6px; }
.tp__meta { color: var(--ink-soft); font-size: 13px; margin: 0 0 14px; }
.tp__badges { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 22px; }
.tp__badge { border: 1px solid var(--line, currentColor); padding: 3px 8px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.tp__lead { font-size: 16px; margin: 0 0 8px; }
.tp__h { font-family: var(--display); font-weight: 700; font-size: 15px; margin: 26px 0 8px; }
.tp p, .tp li { font-size: 14px; line-height: 1.55; }
.tp ul { margin: 0; padding-left: 18px; }
.tp__cta { margin-top: 30px; }
</style>
${METRIKA}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<main class="tp">
<div class="tp__card">
<p class="tp__kicker"><a href="../">← Ландшафт технологий 1С</a></p>
<h1 class="tp__name">${h(i.name)}</h1>
<p class="tp__meta">${h(meta)}</p>
<div class="tp__badges">${badges}</div>
<p class="tp__lead">${h(desc)}</p>
${section("Зачем", i.why ? `<p>${h(esc(i.why))}</p>` : "")}
${section("С чего начать", starts ? `<ul>${starts}</ul>` : "")}
${section("Ссылки", links ? `<ul>${links}</ul>` : "")}
${section("Аналоги", analogs ? `<p>${analogs}</p>` : "")}
${section("Зависимости", depends ? `<p>${depends}</p>` : "")}
<p class="tp__cta"><a class="empty__btn" href="../?tool=${slugs.get(i.name)}">Открыть на карте →</a></p>
</div>
</main>
</body>
</html>
`;
}

const TOOLS_DIR = path.join(APP, "tools");
fs.rmSync(TOOLS_DIR, { recursive: true, force: true });
fs.mkdirSync(TOOLS_DIR);
D.items.forEach((i) =>
    fs.writeFileSync(
        path.join(TOOLS_DIR, `${slugs.get(i.name)}.html`),
        toolPage(i),
    ),
);

console.log(
    `✓ sitemap.xml (${urls.length} url), llms.txt и ${D.items.length} страниц карточек (app/tools/) обновлены`,
);
