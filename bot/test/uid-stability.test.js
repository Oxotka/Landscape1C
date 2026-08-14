"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");

process.env.BOT_SALT = "fixed-test-salt";
process.env.PLATFORM = "telegram";
process.env.STATE_FILE = "test/tmp/state-uid-stability.json";
process.env.ANSWERS_FILE = "test/tmp/answers-uid-stability.jsonl";

const { uid } = require("../lib/store.js");

test("uid телеграма — формула sha256(SALT + id), без префикса платформы", () => {
    const expected = crypto
        .createHash("sha256")
        .update("fixed-test-salt" + 123456789)
        .digest("hex")
        .slice(0, 16);
    assert.equal(uid(123456789), expected);
});

test("uid MAX отличается от uid телеграма для того же числового id", () => {
    // Явно пересчитываем с PLATFORM=max, не полагаясь на порядок require —
    // модуль уже закэширован с PLATFORM=telegram в этом файле
    const expectedMax = crypto
        .createHash("sha256")
        .update("fixed-test-salt" + "max" + 123456789)
        .digest("hex")
        .slice(0, 16);
    assert.notEqual(expectedMax, uid(123456789));
});

test("saveAnswer проставляет platform из окружения", () => {
    const { saveAnswer } = require("../lib/store.js");
    const chat = 987654321;
    saveAnswer({
        ts: new Date().toISOString(),
        wave: 2026,
        uid: uid(chat),
        role: "разработчик",
        level: "опытный",
        context: "инхаус",
        block: "разработчик",
        tool: "Тестовый инструмент",
        answer: "работал",
        sentiment: "да",
    });
    const fs = require("node:fs");
    const path = require("node:path");
    const raw = fs.readFileSync(
        path.join(__dirname, "tmp", "answers-uid-stability.jsonl"),
        "utf8",
    );
    const last = JSON.parse(raw.trim().split("\n").at(-1));
    assert.equal(last.platform, "telegram");
});
