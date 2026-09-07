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

test("главная подключает согласие после онбординга", () => {
    const html = fs.readFileSync(path.join(root, "app/index.html"), "utf8");

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
