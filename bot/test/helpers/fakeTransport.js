"use strict";
// Фейковый транспорт для регрессионных тестов bot.js: реализует контракт
// lib/telegram.js целиком (send/sendPhoto/hideCard/toast/editCard/
// answerCallback/setupCommands) и записывает все вызовы в calls — на них
// тесты проверяют, что bot.js зовёт транспорт по контракту. Ничего не шлёт
// по сети, но зовёт store.trackMsg как настоящий транспорт — иначе «сброс»
// (kind === "reset" в bot.js) не найдёт, что чистить с экрана.
const { trackMsg } = require("../../lib/store");

function createFakeTransport() {
    let nextId = 1;
    const calls = [];
    const record = (name, args, result) => {
        calls.push({ name, args });
        return result;
    };

    const send = async (chat, text, keyboard) =>
        trackMsg(
            chat,
            record("send", [chat, text, keyboard], { message_id: nextId++ }),
        );
    const sendPhoto = async (chat, file, caption, keyboard) =>
        trackMsg(
            chat,
            record("sendPhoto", [chat, file, caption, keyboard], {
                message_id: nextId++,
            }),
        );
    const hideCard = async (chat, msgId) =>
        record("hideCard", [chat, msgId], undefined);
    const toast = async (chat, text, ms) => {
        const m = await send(chat, text);
        record("toast", [chat, text, ms], m);
        return m;
    };
    const editCard = async (chat, msgId, text, keyboard, isPhoto) =>
        record("editCard", [chat, msgId, text, keyboard, isPhoto], {});
    const answerCallback = async (id) => record("answerCallback", [id], {});
    const setupCommands = async () => record("setupCommands", [], {});
    // Сырых вызовов api() в тестируемых путях bot.js больше нет: Task 6
    // перевёл editMessageText/editMessageCaption/answerCallbackQuery/
    // setMyCommands/setChatMenuButton на методы контракта (editCard/
    // answerCallback/setupCommands), а единственный оставшийся
    // api("getUpdates") живёт в цикле опроса под require.main === module
    // и в тестах не выполняется. Поэтому любой вызов api() здесь —
    // регрессия (обратно протащили платформенный вызов мимо контракта),
    // и падать он должен громко, а не эмулироваться заглушкой
    const api = async (method) => {
        throw new Error(
            `fakeTransport: bot.js не должен звать api(${method}) напрямую — только методы контракта транспорта`,
        );
    };

    return {
        calls,
        api,
        send,
        sendPhoto,
        hideCard,
        toast,
        editCard,
        answerCallback,
        setupCommands,
    };
}

// Подменяет require("./lib/telegram") внутри bot.js на фейк — вызывать
// до первого require("../bot.js") в тесте. Node кэширует модули по
// абсолютному пути в require.cache, поэтому один раз подложенный сюда
// фейк отдаётся на любой require("./lib/telegram") откуда угодно из bot/
function installFakeTelegram() {
    const telegramPath = require.resolve("../../lib/telegram.js");
    const fake = createFakeTransport();
    require.cache[telegramPath] = {
        id: telegramPath,
        filename: telegramPath,
        loaded: true,
        exports: fake,
    };
    return fake;
}

module.exports = { installFakeTelegram };
