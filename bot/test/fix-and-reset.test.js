"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { setupTestEnv } = require("./helpers/testEnv");
const { installFakeTelegram } = require("./helpers/fakeTransport");

setupTestEnv("fix-and-reset");
const fake = installFakeTelegram();
const { onMessage, onCallback } = require("../bot.js");
const { state, myAnswers, eraseAnswers } = require("../lib/store.js");

const CHAT = 222002;
let n = 0;
const msg = (text) => ({ chat: { id: CHAT }, message_id: 900000 + n++, text });
const cb = (data, messageId) => ({
    id: "cb" + n++,
    data,
    message: { chat: { id: CHAT }, message_id: messageId, photo: undefined },
});

async function toQuiz() {
    await onMessage(msg("/start"));
    await onCallback(cb("go:", 0));
    await onCallback(cb("role:разработчик", 0));
    await onCallback(cb("level:опытный", 0));
    await onCallback(cb("ctx:инхаус", 0));
    await onCallback(cb("ok:", 0));
}

test("исправление ответа по названию инструмента (текстовый поиск)", async () => {
    delete state[CHAT];
    eraseAnswers(CHAT);
    await toQuiz();
    const firstTool = state[CHAT].queue[0];

    // Отвечаем на первый вопрос: "слышал" → второй вопрос → "-" (пропуск)
    await onCallback(cb("a:слышал", state[CHAT].cardMsg));
    await onCallback(cb("s:-", state[CHAT].cardMsg));
    assert.equal(state[CHAT].pos, 1);
    assert.deepEqual(
        myAnswers(CHAT).map((r) => r.tool),
        [firstTool],
    );
    assert.equal(myAnswers(CHAT)[0].answer, "слышал");

    // Текстом — точное название уже отвеченного инструмента, посреди квиза
    await onMessage(msg(firstTool));
    assert.equal(state[CHAT].step, "fix");
    assert.equal(state[CHAT].fixTool, firstTool);
    assert.equal(state[CHAT].fixReturn, "quiz");

    // Исправляем на "работал" → сентимент "да"
    const cardMsg = state[CHAT].cardMsg;
    const before = fake.calls.length;
    await onCallback(cb("a:работал", cardMsg));

    // Контракт транспорта в ветке исправления: карточка правится тем же
    // editCard(chat, msgId, text, keyboard, isPhoto)
    const edit = fake.calls
        .slice(before)
        .find((c) => c.name === "editCard" && c.args[3]);
    assert.ok(edit, "второй вопрос исправления должен уйти через editCard");
    const [eChat, eMsgId, eText, eKeyboard, eIsPhoto] = edit.args;
    assert.equal(eChat, CHAT);
    assert.equal(eMsgId, cardMsg);
    assert.ok(
        eText.includes(firstTool),
        "правится карточка того же инструмента",
    );
    assert.ok(Array.isArray(eKeyboard) && Array.isArray(eKeyboard[0]));
    assert.equal(typeof eIsPhoto, "boolean");

    await onCallback(cb("s:да", cardMsg));

    // Возврат туда, откуда пришли — квиз, позиция не сдвинулась исправлением
    assert.equal(state[CHAT].step, "quiz");
    assert.equal(state[CHAT].pos, 1);
    assert.deepEqual(
        myAnswers(CHAT).map((r) => r.tool),
        [firstTool],
    );
    assert.equal(myAnswers(CHAT)[0].answer, "работал");
    assert.equal(myAnswers(CHAT)[0].sentiment, "да");
});

test("сброс стирает ответы и возвращает к интро", async () => {
    delete state[CHAT];
    eraseAnswers(CHAT);
    await toQuiz();
    await onCallback(cb("a:не знаю", state[CHAT].cardMsg));
    assert.equal(myAnswers(CHAT).length, 1);

    await onMessage(msg("сброс"));
    await onCallback(cb("reset:yes", 0));

    assert.equal(state[CHAT].step, "intro");
    assert.equal(myAnswers(CHAT).length, 0);
});
