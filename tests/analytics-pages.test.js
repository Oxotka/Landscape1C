const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const test = require("node:test");

const root = path.join(__dirname, "..");
const pages = [
    "index.html",
    "path.html",
    "scheme.html",
    "graph.html",
    "survey2026.html",
    "council.html",
    "methodology.html",
    "404.html",
];

test("публичные страницы не запускают встроенный счетчик", () => {
    pages.forEach((name) => {
        const html = fs.readFileSync(path.join(root, "app", name), "utf8");
        assert.doesNotMatch(html, /mc\.yandex\.ru/, name);
        assert.match(html, /<script src="\/?analytics\.js\?v=/, name);
    });
});

test("главная подключает согласие после карточек и онбординга", () => {
    const html = fs.readFileSync(path.join(root, "app/index.html"), "utf8");

    assert.ok(
        html.indexOf("detail.js") < html.indexOf("analytics.js"),
        "analytics.js должен идти после detail.js",
    );
    assert.ok(
        html.indexOf("onboarding.js") < html.indexOf("analytics.js"),
        "analytics.js должен идти после onboarding.js",
    );
});

test("генератор создает страницы инструментов с согласием без пикселя", () => {
    execFileSync(process.execPath, ["scripts/sitegen.js"], { cwd: root });
    const generatedName = fs
        .readdirSync(path.join(root, "app/tools"))
        .find((name) => name.endsWith(".html"));
    const generated = fs.readFileSync(
        path.join(root, "app/tools", generatedName),
        "utf8",
    );

    assert.doesNotMatch(generated, /mc\.yandex\.ru/);
    assert.match(generated, /<script src="\.\.\/analytics\.js\?v=/);
    assert.doesNotMatch(
        fs.readFileSync(path.join(root, "app/llms.txt"), "utf8"),
        /undefined/,
    );

    const surveyPage = fs.readFileSync(
        path.join(root, "app/tools/simple-kafka-adapter.html"),
        "utf8",
    );
    assert.doesNotMatch(surveyPage, />Результаты опроса</);
    assert.match(surveyPage, /class="srange tp__srange"/);
    assert.match(surveyPage, /class="sr-known" style="width:45%"/);
    assert.match(surveyPage, /class="sr-used" style="width:8%"/);
    assert.match(surveyPage, /class="sr-tick" style="left:8%"/);
    assert.match(surveyPage, /data-known="45" data-used="8" data-loyal="100"/);
    assert.match(surveyPage, /data-k="used"/);
    assert.match(surveyPage, /data-k="loyal"/);
    assert.match(surveyPage, /addEventListener\("mousemove"/);
    assert.match(surveyPage, /classList\.toggle\("is-hi"/);
    assert.match(
        surveyPage,
        /aria-label="Слышали или работали 45%, работали 8%, взяли бы снова 100%"/,
    );
    assert.match(surveyPage, />Работали<\/span><b>8%<\/b>/);
    assert.match(surveyPage, />Взяли бы снова .*<\/span><b>100%<\/b>/);
    assert.doesNotMatch(surveyPage, /tp__survey-metric/);
    assert.match(surveyPage, /71 ответ в опросе/);
    assert.doesNotMatch(surveyPage, /tp__survey-note/);

    const pageWithoutSurvey = fs.readFileSync(
        path.join(root, "app/tools/bash.html"),
        "utf8",
    );
    assert.doesNotMatch(pageWithoutSurvey, />Результаты опроса</);
});

test("политика доступна отдельной публичной страницей", () => {
    const html = fs.readFileSync(path.join(root, "app/privacy.html"), "utf8");
    const nav = fs.readFileSync(path.join(root, "app/nav.js"), "utf8");
    const styles = fs.readFileSync(path.join(root, "app/styles.css"), "utf8");

    assert.match(html, /Никита Арипов/);
    assert.match(html, /aripovn@yandex\.ru/);
    assert.match(html, /Яндекс Метрик/);
    assert.match(html, /<h1 class="title">Конфиденциальность<\/h1>/);
    assert.match(nav, /href="privacy\.html">Конфиденциальность<\/a>/);
    assert.match(
        styles,
        /\.analytics-consent \.analytics-consent__deny\s*{[^}]*border-color:\s*transparent/s,
    );
    assert.match(
        styles,
        /\.analytics-consent \.analytics-consent__deny:hover\s*{[^}]*border-color:\s*var\(--ink\)/s,
    );
});
