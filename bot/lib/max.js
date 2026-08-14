// MAX-транспорт: тот же контракт, что lib/telegram.js (api, send,
// sendPhoto, hideCard, toast, editCard, answerCallback, setupCommands).
// REST MAX Bot API, https://platform-api2.max.ru, токен в заголовке
// Authorization (dev.max.ru/docs-api, проверено 14.08.2026).
"use strict";
const https = require("https");
const fs = require("fs");
const path = require("path");

const TOKEN = process.env.MAX_BOT_TOKEN;
if (!TOKEN) {
    console.error("Нужен токен: MAX_BOT_TOKEN=<токен> node bot/bot-max.js");
    process.exit(1);
}
const HOST = "platform-api2.max.ru";

const parseReply = (data, resolve, reject) => {
    try {
        const j = data ? JSON.parse(data) : {};
        resolve(j);
    } catch (e) {
        reject(e);
    }
};
const rawRequest = (method, urlPath, body) =>
    new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : "";
        const req = https.request(
            {
                hostname: HOST,
                path: urlPath,
                method,
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(payload),
                },
            },
            (res) => {
                let data = "";
                res.on("data", (c) => (data += c));
                res.on("end", () => {
                    if (res.statusCode >= 400) {
                        const err = new Error(
                            `MAX API ${method} ${urlPath}: ${res.statusCode} ${data}`,
                        );
                        err.status = res.statusCode;
                        return reject(err);
                    }
                    parseReply(data, resolve, reject);
                });
            },
        );
        req.on("error", reject);
        req.end(payload);
    });
// 429: формат retry-after у MAX не документирован (открытый вопрос
// спеки) — фиксированная пауза с ограниченным числом попыток, без
// попытки распарсить retry_after
const withRetry = (fn, attempt = 0) =>
    fn().catch((e) =>
        e.status === 429 && attempt < 3
            ? new Promise((r) => setTimeout(r, 1000)).then(() =>
                  withRetry(fn, attempt + 1),
              )
            : Promise.reject(e),
    );
// Универсальный вызов методом+путём — аналог telegram-овского api(method,
// params), но у MAX не RPC по имени метода, а обычный REST; сохраняем
// то же имя ради единообразия с lib/telegram.js для api() в тестах
const api = (method, urlPath, body) =>
    withRetry(() => rawRequest(method, urlPath, body));

const kbAttachment = (keyboard) =>
    keyboard
        ? [{ type: "inline_keyboard", payload: { buttons: keyboard } }]
        : undefined;

const send = (chat, text, keyboard) =>
    api("POST", `/messages?chat_id=${chat}`, {
        text,
        attachments: kbAttachment(keyboard),
        notify: false,
    }).then((r) => ({
        message_id: r.message && r.message.body && r.message.body.mid,
    }));

// Загрузка фото — двухшаговая (dev.max.ru/docs-api/methods/POST/uploads,
// проверено 14.08.2026): получить одноразовый URL загрузки, залить туда
// файл multipart-ом, получить token вложения, использовать в сообщении
const requestUploadUrl = () => api("POST", "/uploads?type=image");
const uploadFile = (uploadUrl, file) =>
    new Promise((resolve, reject) => {
        const b = "----landscape" + Date.now();
        const head = `--${b}\r\nContent-Disposition: form-data; name="data"; filename="${path.basename(file)}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
        const body = Buffer.concat([
            Buffer.from(head),
            fs.readFileSync(file),
            Buffer.from(`\r\n--${b}--\r\n`),
        ]);
        const u = new URL(uploadUrl);
        const req = https.request(
            {
                hostname: u.hostname,
                path: u.pathname + u.search,
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
const sendPhoto = async (chat, file, caption, keyboard) => {
    const { url } = await withRetry(requestUploadUrl);
    const { token } = await uploadFile(url, file);
    const attachments = [{ type: "image", payload: { token } }];
    if (keyboard)
        attachments.push({
            type: "inline_keyboard",
            payload: { buttons: keyboard },
        });
    const r = await api("POST", `/messages?chat_id=${chat}`, {
        text: caption,
        attachments,
        notify: false,
    });
    return {
        message_id: r.message && r.message.body && r.message.body.mid,
    };
};

const hideCard = (chat, msgId) =>
    api("DELETE", `/messages?message_id=${msgId}`).catch(() => {});
const toast = async (chat, text, ms = 3000) => {
    const m = await send(chat, text).catch(() => null);
    if (m) setTimeout(() => hideCard(chat, m.message_id), ms);
};

// keyboard не передаём, если пусто — как и в lib/telegram.js, чтобы не
// трогать текущую клавиатуру карточки. isPhoto в контракте есть (bot.js
// зовёт editCard одинаково для обеих платформ, 5 позиционных аргументов),
// но MAX не различает text/caption как отдельные поля — не используется
const editCard = (chat, msgId, text, keyboard, isPhoto) =>
    api("PUT", `/messages?message_id=${msgId}`, {
        text,
        attachments: kbAttachment(keyboard),
    }).then((r) => ({
        message_id: r.message && r.message.body && r.message.body.mid,
    }));
// В MAX ответ на callback и правка карточки — один вызов (POST /answers);
// здесь просто подтверждение без правки текста, как и telegram-овский
// answerCallbackQuery — сама карточка правится отдельным editCard выше
const answerCallback = (id) => api("POST", `/answers?callback_id=${id}`, {});
// У MAX нет API-аналога setMyCommands/setChatMenuButton — команды и
// описание бота настраиваются в кабинете business.max.ru, не кодом
const setupCommands = () => Promise.resolve();

module.exports = {
    api,
    send,
    sendPhoto,
    hideCard,
    toast,
    editCard,
    answerCallback,
    setupCommands,
};
