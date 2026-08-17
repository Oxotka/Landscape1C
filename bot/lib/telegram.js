// Телеграм-транспорт: Bot API голым https (ноль зависимостей), фото
// с кэшем file_id и гигиена чата (удаление сообщений, тосты).
// Все отправленное регистрируется в реестре чата (store.trackMsg) —
// на этом держится полная очистка экрана по «сбросу».
"use strict";
const https = require("https");
const fs = require("fs");
const path = require("path");
const { trackMsg } = require("./store");

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
    console.error("Нужен токен: BOT_TOKEN=<токен> node bot/bot.js");
    process.exit(1);
}

// Разбор ответа Bot API; на 429 (flood limit) в ошибку кладется retry_after
const parseReply = (data, resolve, reject) => {
    try {
        const j = JSON.parse(data);
        if (j.ok) return resolve(j.result);
        const err = new Error(j.description);
        if (j.parameters && j.parameters.retry_after)
            err.retryAfter = j.parameters.retry_after;
        reject(err);
    } catch (e) {
        reject(e);
    }
};
// 429: Телеграм просит подождать retry_after секунд — ждем и повторяем,
// иначе сообщение в пиковую нагрузку просто теряется
const withRetry = (fn, attempt = 0) =>
    fn().catch((e) =>
        e.retryAfter && attempt < 3
            ? new Promise((r) => setTimeout(r, e.retryAfter * 1000 + 250)).then(
                  () => withRetry(fn, attempt + 1),
              )
            : Promise.reject(e),
    );

const rawApi = (method, params) =>
    new Promise((resolve, reject) => {
        const body = JSON.stringify(params || {});
        const req = https.request(
            {
                hostname: "api.telegram.org",
                path: `/bot${TOKEN}/${method}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(body),
                },
            },
            (res) => {
                let data = "";
                res.on("data", (c) => (data += c));
                res.on("end", () => parseReply(data, resolve, reject));
            },
        );
        req.on("error", reject);
        req.end(body);
    });
const api = (method, params) => withRetry(() => rawApi(method, params));

// Все сообщения — беззвучные (disable_notification): бот отвечает только
// на действия пользователя, тот и так в чате — пуш с вибрацией на каждую
// карточку раздражает
const send = (chat, text, keyboard) =>
    api("sendMessage", {
        chat_id: chat,
        text,
        parse_mode: "HTML",
        disable_notification: true,
        reply_markup: keyboard ? { inline_keyboard: keyboard } : undefined,
    }).then((r) => trackMsg(chat, r));

// Рассылка (notify.js/remind.js): в отличие от send() — с пушем (без
// disable_notification) и без реестра сообщений чата, это не диалог бота
const broadcast = (chat, text, keyboard) =>
    api("sendMessage", {
        chat_id: chat,
        text,
        parse_mode: "HTML",
        reply_markup: keyboard ? { inline_keyboard: keyboard } : undefined,
    });

// Кэш telegram file_id по файлу логотипа: первый показ грузит файл,
// дальше фото уходит мгновенно по идентификатору — в этом вся скорость
const FILEIDS = path.join(__dirname, "..", "file-ids.json");
let fileIds = {};
try {
    fileIds = JSON.parse(fs.readFileSync(FILEIDS, "utf8"));
} catch (e) {}
const sendPhoto = async (chat, file, caption, keyboard) => {
    if (fileIds[file]) {
        try {
            return trackMsg(
                chat,
                await api("sendPhoto", {
                    chat_id: chat,
                    photo: fileIds[file],
                    caption,
                    parse_mode: "HTML",
                    disable_notification: true,
                    reply_markup: keyboard
                        ? { inline_keyboard: keyboard }
                        : undefined,
                }),
            );
        } catch (e) {} // file_id протух — перезаливаем файлом
    }
    const res = trackMsg(
        chat,
        await withRetry(() => uploadPhoto(chat, file, caption, keyboard)),
    );
    const ph = res.photo && res.photo[res.photo.length - 1];
    if (ph) {
        fileIds[file] = ph.file_id;
        fs.writeFileSync(FILEIDS, JSON.stringify(fileIds));
    }
    return res;
};
// Загрузка фото файлом — multipart руками (зависимостей нет)
const uploadPhoto = (chat, file, caption, keyboard) =>
    new Promise((resolve, reject) => {
        const b = "----landscape" + Date.now();
        const fields = {
            chat_id: String(chat),
            caption,
            parse_mode: "HTML",
            disable_notification: "true",
        };
        if (keyboard)
            fields.reply_markup = JSON.stringify({ inline_keyboard: keyboard });
        let head = "";
        for (const [k, v] of Object.entries(fields))
            head += `--${b}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`;
        head += `--${b}\r\nContent-Disposition: form-data; name="photo"; filename="${path.basename(file)}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
        const body = Buffer.concat([
            Buffer.from(head),
            fs.readFileSync(file),
            Buffer.from(`\r\n--${b}--\r\n`),
        ]);
        const req = https.request(
            {
                hostname: "api.telegram.org",
                path: `/bot${TOKEN}/sendPhoto`,
                method: "POST",
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${b}`,
                    "Content-Length": body.length,
                },
            },
            (res) => {
                let data = "";
                res.on("data", (c) => (data += c));
                res.on("end", () => parseReply(data, resolve, reject));
            },
        );
        req.on("error", reject);
        req.end(body);
    });

// Сообщение убирается из чата — не копим простыню
const hideCard = (chat, msgId) =>
    api("deleteMessage", { chat_id: chat, message_id: msgId }).catch(() => {});
// Служебный текст тостом: показали и через пару секунд убрали
const toast = async (chat, text, ms = 3000) => {
    const m = await send(chat, text).catch(() => null);
    if (m) setTimeout(() => hideCard(chat, m.message_id), ms);
};

// Редактирование карточки: текст или подпись под фото (isPhoto=true).
// keyboard не передаём, если пусто, — Telegram тогда не трогает текущую
// клавиатуру (нужно для якоря, у которого клавиатуры вообще нет)
const editCard = (chat, msgId, text, keyboard, isPhoto) => {
    const params = { chat_id: chat, message_id: msgId, parse_mode: "HTML" };
    params[isPhoto ? "caption" : "text"] = text;
    if (keyboard) params.reply_markup = { inline_keyboard: keyboard };
    return api(isPhoto ? "editMessageCaption" : "editMessageText", params);
};
// Подтверждение нажатия кнопки — вызывающий код не ждёт (fire-and-forget),
// экономим круг до сервера на каждом тапе
const answerCallback = (id) =>
    api("answerCallbackQuery", { callback_query_id: id });
// Меню команд + принудительный показ кнопки «Меню» у поля ввода.
// Оба вызова независимы — падение одного не должно блокировать другой
const setupCommands = () =>
    Promise.all([
        api("setMyCommands", {
            commands: [
                { command: "progress", description: "Мои ответы и прогресс" },
                {
                    command: "pause",
                    description: "Прерваться — прогресс сохранится",
                },
                { command: "resume", description: "Продолжить опрос" },
                { command: "help", description: "Как все устроено" },
                { command: "start", description: "Начать опрос" },
                {
                    command: "reset",
                    description: "Стереть все и начать заново",
                },
            ],
        }),
        api("setChatMenuButton", { menu_button: { type: "commands" } }),
    ]);

module.exports = {
    api,
    send,
    broadcast,
    sendPhoto,
    hideCard,
    toast,
    editCard,
    answerCallback,
    setupCommands,
};
