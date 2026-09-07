const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "app/analytics.js"), "utf8");

function runAnalytics({ choice = null, onboarding = false } = {}) {
    const values = new Map();
    if (choice) values.set("landscapeAnalytics", choice);

    const listeners = new Map();
    const nodes = [];
    const makeNode = (tagName) => ({
        tagName: tagName.toUpperCase(),
        children: [],
        className: "",
        dataset: {},
        attributes: {},
        removed: false,
        append(...children) {
            this.children.push(...children);
        },
        appendChild(child) {
            this.children.push(child);
            return child;
        },
        setAttribute(name, value) {
            this.attributes[name] = String(value);
        },
        addEventListener(type, fn) {
            this[`on${type}`] = fn;
        },
        click() {
            this.onclick?.();
        },
        remove() {
            this.removed = true;
        },
    });

    const body = makeNode("body");
    body.append = (...children) => nodes.push(...children);
    const head = makeNode("head");
    head.append = (...children) => nodes.push(...children);
    const document = {
        body,
        head,
        createElement: makeNode,
        querySelector(selector) {
            return selector === ".onb" && onboarding ? {} : null;
        },
        addEventListener(type, fn) {
            listeners.set(type, fn);
        },
    };
    const localStorage = {
        getItem: (key) => values.get(key) || null,
        setItem: (key, value) => values.set(key, value),
    };
    const context = { document, localStorage, window: null };
    context.window = context;

    vm.runInNewContext(source, context, { filename: "analytics.js" });

    return {
        values,
        nodes,
        dispatch(type) {
            listeners.get(type)?.();
        },
        banner() {
            return nodes.find((node) => node.className === "analytics-consent");
        },
        metrikaScript() {
            return nodes.find(
                (node) =>
                    node.tagName === "SCRIPT" &&
                    node.src?.startsWith("https://mc.yandex.ru/metrika/tag.js"),
            );
        },
    };
}

test("не загружает Метрику после отказа", () => {
    const page = runAnalytics({ choice: "deny" });

    assert.equal(page.metrikaScript(), undefined);
    assert.equal(page.banner(), undefined);
});

test("загружает Метрику при сохраненном разрешении", () => {
    const page = runAnalytics({ choice: "allow" });

    assert.ok(page.metrikaScript());
});

test("первый выбор разрешает или запрещает аналитику", () => {
    const denied = runAnalytics();
    const denyButton = denied
        .banner()
        .children.find((node) => node.dataset.analytics === "deny");
    denyButton.click();
    assert.equal(denied.values.get("landscapeAnalytics"), "deny");
    assert.equal(denied.metrikaScript(), undefined);
    assert.equal(denied.banner().removed, true);

    const allowed = runAnalytics();
    const allowButton = allowed
        .banner()
        .children.find((node) => node.dataset.analytics === "allow");
    allowButton.click();
    assert.equal(allowed.values.get("landscapeAnalytics"), "allow");
    assert.ok(allowed.metrikaScript());
    assert.equal(allowed.banner().removed, true);
});

test("показывает разрешение перед отказом", () => {
    const buttons = runAnalytics()
        .banner()
        .children.filter((node) => node.tagName === "BUTTON");

    assert.deepEqual(
        buttons.map((node) => node.dataset.analytics),
        ["allow", "deny"],
    );
});

test("ждет завершения онбординга перед показом плашки", () => {
    const page = runAnalytics({ onboarding: true });

    assert.equal(page.banner(), undefined);
    page.dispatch("landscape:onboarding-finished");
    assert.ok(page.banner());
});
