"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { setupTestEnv } = require("./helpers/testEnv");
const { installFakeTelegram } = require("./helpers/fakeTransport");

setupTestEnv("onboarding-quiz");
const fake = installFakeTelegram();
const { onMessage, onCallback } = require("../bot.js");
const { state } = require("../lib/store.js");

const CHAT = 111001;
let n = 0;
const msg = (text) => ({ chat: { id: CHAT }, message_id: 900000 + n++, text });
const cb = (data, messageId) => ({
    id: "cb" + n++,
    data,
    message: { chat: { id: CHAT }, message_id: messageId, photo: undefined },
});

test("онбординг → квиз → чекпоинт → пауза → продолжить → ответ с сентиментом", async () => {
    // Очистить состояние от предыдущих запусков (если были в одном процессе)
    delete state[CHAT];

    await onMessage(msg("/start"));
    assert.equal(state[CHAT].step, "intro");

    await onCallback(cb("go:", 0));
    assert.equal(state[CHAT].step, "role");

    await onCallback(cb("role:разработчик", 0));
    assert.equal(state[CHAT].step, "level");
    assert.equal(state[CHAT].role, "разработчик");

    await onCallback(cb("level:опытный", 0));
    assert.equal(state[CHAT].step, "context");
    assert.equal(state[CHAT].level, "опытный");

    await onCallback(cb("ctx:инхаус", 0));
    assert.equal(state[CHAT].step, "confirm");
    assert.equal(state[CHAT].context, "инхаус");

    await onCallback(cb("ok:", 0));
    assert.equal(state[CHAT].step, "quiz");
    assert.equal(state[CHAT].pos, 0);
    const queueLen = state[CHAT].queue.length;
    assert.ok(
        queueLen >= 15,
        "test-set.json должен давать длинную колоду для роли «разработчик»",
    );

    // 9 ответов "не знаю" — без второго вопроса, чекпоинт ещё не наступает
    for (let i = 0; i < 9; i++) {
        const tool = state[CHAT].queue[state[CHAT].pos];
        await onCallback(cb("a:не знаю", state[CHAT].cardMsg));
        assert.equal(state[CHAT].answered.at(-1), tool);
    }
    assert.equal(state[CHAT].pos, 9);
    assert.equal(state[CHAT].step, "quiz");

    // 10-й ответ — срабатывает чекпоинт (каждые 10 ответов)
    await onCallback(cb("a:не знаю", state[CHAT].cardMsg));
    assert.equal(state[CHAT].pos, 10);
    assert.equal(state[CHAT].step, "checkpoint");
    assert.equal(state[CHAT].cp.list.length, 10);

    // Пауза с чекпоинта, затем продолжить
    await onCallback(cb("pause:", 0));
    assert.equal(state[CHAT].step, "paused");

    await onCallback(cb("resume:", 0));
    assert.equal(state[CHAT].step, "quiz");
    assert.equal(state[CHAT].pos, 10);

    // Ответ с сентиментом: "работал" → второй вопрос → "да"
    const toolWithSentiment = state[CHAT].queue[state[CHAT].pos];
    const cardMsg = state[CHAT].cardMsg;
    const before = fake.calls.length;
    await onCallback(cb("a:работал", cardMsg));

    // Контракт транспорта: второй вопрос дописывается в ту же карточку
    // именно через editCard(chat, msgId, text, keyboard, isPhoto) —
    // порядок аргументов ловится только здесь (в bot.js вызов один)
    const edit = fake.calls
        .slice(before)
        .find((c) => c.name === "editCard" && c.args[3]);
    assert.ok(edit, "второй вопрос должен уйти через editCard");
    const [eChat, eMsgId, eText, eKeyboard, eIsPhoto] = edit.args;
    assert.equal(eChat, CHAT);
    assert.equal(eMsgId, cardMsg);
    assert.equal(typeof eText, "string");
    assert.ok(
        eText.includes(toolWithSentiment),
        "в тексте — тот же инструмент",
    );
    assert.ok(Array.isArray(eKeyboard) && Array.isArray(eKeyboard[0]));
    assert.equal(typeof eIsPhoto, "boolean");

    assert.ok(state[CHAT].pending);
    assert.equal(state[CHAT].pending.tool, toolWithSentiment);
    assert.equal(
        state[CHAT].pos,
        10,
        "позиция не двигается до ответа на второй вопрос",
    );

    await onCallback(cb("s:да", state[CHAT].cardMsg));
    assert.equal(state[CHAT].pending, null);
    assert.equal(state[CHAT].pos, 11);
    assert.equal(state[CHAT].answered.at(-1), toolWithSentiment);
});
