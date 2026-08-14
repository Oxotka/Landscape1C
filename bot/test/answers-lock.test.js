"use strict";
// Лок журнала ответов (store.withAnswersLock): дозапись saveAnswer и
// перезапись целиком eraseAnswers идут из двух процессов (телеграм и MAX)
// в один answers.jsonl. Проверяем, что критические секции не пересекаются,
// что лок-файл действительно занят на время секции (именно он и не пускает
// второй процесс) и что обычный, неконкурентный вызов ничего не ломает.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { setupTestEnv } = require("./helpers/testEnv");

setupTestEnv("answers-lock");
const ANSWERS = path.join(__dirname, "..", process.env.ANSWERS_FILE);
const LOCK = ANSWERS + ".lock";
fs.rmSync(LOCK, { force: true });

const {
    withAnswersLock,
    saveAnswer,
    myAnswers,
    eraseAnswers,
} = require("../lib/store.js");

const CHAT = 333003;
// Секции внутри лока синхронные, поэтому и пауза нужна синхронная
const sleepSync = (ms) =>
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

test("withAnswersLock не даёт критическим секциям пересечься", async () => {
    let inside = false;
    const overlaps = [];
    const section = (tag) =>
        withAnswersLock(() => {
            if (inside) overlaps.push(tag); // застали чужую секцию незакрытой
            inside = true;
            sleepSync(20);
            inside = false;
            return tag;
        });

    const results = await Promise.all([
        Promise.resolve().then(() => section("a")),
        Promise.resolve().then(() => section("b")),
    ]);

    assert.deepEqual(results, ["a", "b"]);
    assert.deepEqual(overlaps, [], "секции не должны пересекаться");
    assert.equal(inside, false);
});

test("лок-файл занят внутри секции и снимается после неё", () => {
    withAnswersLock(() => {
        assert.ok(fs.existsSync(LOCK), "внутри секции лок-файл существует");
        // Именно так лок видит второй процесс: эксклюзивное создание падает
        assert.throws(() => fs.openSync(LOCK, "wx"), { code: "EEXIST" });
    });
    assert.equal(fs.existsSync(LOCK), false, "после секции лок снят");
});

test("лок снимается и когда секция бросила исключение", () => {
    assert.throws(
        () =>
            withAnswersLock(() => {
                throw new Error("падение внутри секции");
            }),
        /падение внутри секции/,
    );
    assert.equal(fs.existsSync(LOCK), false);
    // и следующий захват проходит сразу, без ожидания
    assert.equal(
        withAnswersLock(() => "ок"),
        "ок",
    );
});

test("обычный проход: saveAnswer под локом, затем eraseAnswers стирает", () => {
    eraseAnswers(CHAT);
    saveAnswer({
        uid: require("../lib/store.js").uid(CHAT),
        tool: "Тестовый инструмент",
        answer: "работал",
        sentiment: "да",
    });
    assert.deepEqual(
        myAnswers(CHAT).map((r) => r.tool),
        ["Тестовый инструмент"],
    );
    assert.ok(fs.readFileSync(ANSWERS, "utf8").includes("Тестовый инструмент"));

    eraseAnswers(CHAT);
    assert.deepEqual(myAnswers(CHAT), []);
    assert.equal(
        fs.readFileSync(ANSWERS, "utf8").includes("Тестовый инструмент"),
        false,
        "запись должна исчезнуть и из файла, не только из индекса",
    );
    assert.equal(fs.existsSync(LOCK), false, "лок не остался висеть");
});
