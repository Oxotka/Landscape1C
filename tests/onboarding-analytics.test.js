const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const onboardingSource = fs.readFileSync(
    path.join(root, "app/onboarding.js"),
    "utf8",
);
const analyticsSource = fs.readFileSync(
    path.join(root, "app/analytics.js"),
    "utf8",
);

function page() {
    const documentListeners = new Map();
    const nodes = [];
    const values = new Map();
    const skip = node("button");
    const next = node("button");

    function node(tagName) {
        const listeners = new Map();
        return {
            tagName: tagName.toUpperCase(),
            children: [],
            className: "",
            dataset: {},
            style: {},
            removed: false,
            classList: { add() {}, remove() {} },
            append(...children) {
                this.children.push(...children);
            },
            setAttribute() {},
            getAttribute() {
                return "false";
            },
            addEventListener(type, fn) {
                listeners.set(type, fn);
            },
            removeEventListener() {},
            click() {
                listeners.get("click")?.({ target: this });
            },
            remove() {
                this.removed = true;
            },
            querySelector(selector) {
                if (selector === "[data-skip]") return skip;
                if (selector === "[data-next]") return next;
                return null;
            },
            querySelectorAll(selector) {
                if (selector === "[data-val]") return [node("button")];
                return [];
            },
            getBoundingClientRect() {
                return { left: 0, right: 200, top: 0, bottom: 40, width: 200 };
            },
        };
    }

    const roleChip = node("button");
    roleChip.textContent = "разработчик";
    const contextChip = node("button");
    contextChip.textContent = "инхаус";
    const group = (label, chip) => ({
        querySelector: () => ({ textContent: label }),
        querySelectorAll: () => [chip],
        getBoundingClientRect: () => ({
            left: 0,
            right: 200,
            top: 0,
            bottom: 40,
            width: 200,
        }),
    });
    const filters = node("aside");
    filters.querySelectorAll = () => [
        group("Роль", roleChip),
        group("Контекст", contextChip),
    ];

    const body = node("body");
    body.append = (...children) => nodes.push(...children);
    const head = node("head");
    head.append = (...children) => nodes.push(...children);
    const document = {
        body,
        head,
        createElement: node,
        getElementById: (id) => (id === "filters" ? filters : null),
        querySelector(selector) {
            if (selector === ".onb")
                return nodes.find(
                    (item) => item.className.startsWith("onb") && !item.removed,
                );
            return null;
        },
        addEventListener(type, fn) {
            const list = documentListeners.get(type) || [];
            list.push(fn);
            documentListeners.set(type, list);
        },
        removeEventListener() {},
        dispatchEvent(event) {
            (documentListeners.get(event.type) || []).forEach((fn) =>
                fn(event),
            );
        },
    };
    const context = {
        document,
        localStorage: {
            getItem: (key) => values.get(key) || null,
            setItem: (key, value) => values.set(key, value),
        },
        matchMedia: () => ({ matches: false }),
        addEventListener() {},
        removeEventListener() {},
        innerWidth: 1200,
        innerHeight: 800,
        Event: class Event {
            constructor(type) {
                this.type = type;
            }
        },
        LANDSCAPE: {
            axes: {
                role: { label: "Роль", values: ["разработчик"] },
                context: { label: "Контекст", values: ["инхаус"] },
            },
        },
        window: null,
    };
    context.window = context;

    return { context, nodes, skip };
}

test("после пропуска онбординга появляется выбор аналитики", () => {
    const current = page();
    vm.runInNewContext(onboardingSource, current.context, {
        filename: "onboarding.js",
    });
    vm.runInNewContext(analyticsSource, current.context, {
        filename: "analytics.js",
    });

    assert.equal(
        current.nodes.some((node) => node.className === "analytics-consent"),
        false,
    );
    current.skip.click();
    assert.equal(
        current.nodes.some((node) => node.className === "analytics-consent"),
        true,
    );
});
