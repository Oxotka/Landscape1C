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

function page(initialValues = {}) {
    const documentListeners = new Map();
    const nodes = [];
    const values = new Map(Object.entries(initialValues));
    const skip = node("button");
    const next = node("button");
    const opt = node("button");
    let document;

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
            focus() {
                document.activeElement = this;
            },
            contains(target) {
                return target === this || target.parent === this;
            },
            remove() {
                this.removed = true;
            },
            querySelector(selector) {
                const found =
                    selector === "[data-skip]"
                        ? skip
                        : selector === "[data-next]"
                          ? next
                          : selector === "[data-val]"
                            ? opt
                            : null;
                if (found) found.parent = this;
                return found;
            },
            querySelectorAll(selector) {
                if (selector === "[data-val]") return [opt];
                if (selector === "button") return [opt, skip, next];
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
    document = {
        body,
        head,
        activeElement: body,
        contains: (item) => !item.removed,
        createElement: node,
        getElementById: (id) => (id === "filters" ? filters : null),
        querySelector(selector) {
            if (selector === ".onb")
                return nodes.find(
                    (item) =>
                        (item.className === "onb" ||
                            item.className.startsWith("onb ")) &&
                        !item.removed,
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

    return { context, nodes, skip, next, opt, roleChip, values };
}

test("первый онбординг заканчивается после роли и контекста", () => {
    const current = page();
    vm.runInNewContext(onboardingSource, current.context, {
        filename: "onboarding.js",
    });

    current.next.click();
    current.next.click();

    assert.equal(current.values.get("onboarding_stage"), "base");
    assert.equal(current.values.get("onboarding_done"), undefined);
    assert.equal(
        current.nodes.filter(
            (item) =>
                (item.className === "onb" ||
                    item.className.startsWith("onb ")) &&
                !item.removed,
        ).length,
        0,
    );
});

test("повторный заход знакомит с другими представлениями", () => {
    const current = page({ onboarding_stage: "base" });
    vm.runInNewContext(onboardingSource, current.context, {
        filename: "onboarding.js",
    });

    const tip = current.nodes.find(
        (item) =>
            (item.className === "onb" || item.className.startsWith("onb ")) &&
            !item.removed,
    );
    assert.match(tip.innerHTML, /Путь/);
    assert.match(tip.innerHTML, /Схема/);
    assert.match(tip.innerHTML, /Граф/);

    current.next.click();
    assert.equal(current.values.get("onboarding_stage"), "done");
});

test("старый завершенный онбординг не запускается повторно", () => {
    const current = page({ onboarding_done: "true" });
    vm.runInNewContext(onboardingSource, current.context, {
        filename: "onboarding.js",
    });

    assert.equal(
        current.nodes.some(
            (item) =>
                item.className === "onb" || item.className.startsWith("onb "),
        ),
        false,
    );
});

test("аналитика ждет закрытия карточки независимо от онбординга", () => {
    const current = page();
    vm.runInNewContext(onboardingSource, current.context, {
        filename: "onboarding.js",
    });
    vm.runInNewContext(analyticsSource, current.context, {
        filename: "analytics.js",
    });

    current.skip.click();
    assert.equal(
        current.nodes.some((node) => node.className === "analytics-consent"),
        false,
    );
    current.context.document.dispatchEvent(
        new current.context.Event("landscape:detail-closed"),
    );
    assert.equal(
        current.nodes.some((node) => node.className === "analytics-consent"),
        true,
    );
});

test("запрос аналитики ждет завершения открытого онбординга", () => {
    const current = page();
    vm.runInNewContext(onboardingSource, current.context, {
        filename: "onboarding.js",
    });
    vm.runInNewContext(analyticsSource, current.context, {
        filename: "analytics.js",
    });

    current.context.document.dispatchEvent(
        new current.context.Event("landscape:detail-closed"),
    );
    assert.equal(
        current.nodes.some((node) => node.className === "analytics-consent"),
        false,
    );

    current.skip.click();
    assert.equal(
        current.nodes.filter((node) => node.className === "analytics-consent")
            .length,
        1,
    );
    assert.equal(current.context.document.activeElement.tagName, "A");
    current.nodes
        .find((node) => node.className === "analytics-consent")
        .children.find((node) => node.dataset.analytics === "deny")
        .click();
    assert.equal(current.context.document.activeElement, current.roleChip);
});

test("немодальная подсказка пропускает Tab и не перехватывает чужой Escape", () => {
    const current = page();
    vm.runInNewContext(onboardingSource, current.context, {
        filename: "onboarding.js",
    });
    const key = (key, target, shiftKey = false) => {
        let prevented = false;
        current.context.document.dispatchEvent({
            type: "keydown",
            key,
            target,
            shiftKey,
            preventDefault() {
                prevented = true;
            },
            stopPropagation() {},
        });
        return prevented;
    };

    assert.equal(current.context.document.activeElement, current.opt);
    assert.equal(key("Tab", current.opt, true), true);
    assert.equal(current.context.document.activeElement, current.roleChip);
    assert.equal(key("Tab", current.roleChip), true);
    assert.equal(current.context.document.activeElement, current.opt);
    assert.equal(key("Tab", current.next), false);
    assert.equal(key("Escape", current.roleChip), false);
    assert.equal(current.values.get("onboarding_stage"), undefined);
    assert.equal(key("Escape", current.opt), true);
    assert.equal(current.values.get("onboarding_stage"), "base");
});
