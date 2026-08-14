// Вебхук-приёмник MAX. За nginx (TLS-терминатор на 443 — вопреки
// документации MAX, вебхуки реально доставляются только на 443, порт
// 8443 не сработал на живом прогоне 14.08.2026; см.
// docs/superpowers/specs/2026-08-13-max-bot-design.md) — сам процесс
// слушает голый HTTP на 127.0.0.1:3001. Проверяет секрет вебхука
// (X-Max-Bot-Api-Secret, см. POST /subscriptions), переводит событие в
// telegram-подобный конверт и зовёт общие onMessage/onCallback из bot.js.
//
// Ставим PLATFORM=max здесь же, до require("./bot.js") — не полагаемся
// только на Environment=PLATFORM=max в systemd-юните: если этот файл
// когда-нибудь запустят в обход юнита (вручную, другим юнитом), защита
// от порчи телеграм-данных (лог/uid-соль/state.json) не должна зависеть
// от того, кто и как его запустил
"use strict";
process.env.PLATFORM = "max";
const http = require("http");
const { onMessage, onCallback } = require("./bot.js");

const PORT = process.env.MAX_WEBHOOK_PORT || 3001;
const SECRET = process.env.MAX_WEBHOOK_SECRET;
if (!SECRET) {
    console.error(
        "Нужен секрет: MAX_WEBHOOK_SECRET=<секрет> node bot/bot-max.js",
    );
    process.exit(1);
}

const server = http.createServer((req, res) => {
    if (req.method !== "POST") {
        res.writeHead(404);
        return res.end();
    }
    if (req.headers["x-max-bot-api-secret"] !== SECRET) {
        res.writeHead(401);
        return res.end();
    }
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
        let update;
        try {
            update = JSON.parse(body);
        } catch (e) {
            res.writeHead(400);
            return res.end();
        }
        // Реальная схема (сверена по живому прогону 14.08.2026, не по
        // документации — точная схема Update у MAX не публикуется):
        // chat_id и mid лежат не на верхнем уровне, а в message.recipient/
        // message.body что для message_created, что для message_callback
        if (update.update_type === "message_created") {
            const m = update.message;
            onMessage({
                chat: { id: m.recipient.chat_id },
                message_id: m.body.mid,
                text: m.body.text,
            }).catch(console.error);
        } else if (update.update_type === "message_callback") {
            const cb = update.callback;
            const m = update.message;
            onCallback({
                id: cb.callback_id,
                data: cb.payload,
                message: {
                    chat: { id: m.recipient.chat_id },
                    message_id: m.body.mid,
                    photo: undefined, // MAX не различает фото/текст при редактировании — editCard в lib/max.js это уже учитывает
                },
            }).catch(console.error);
        }
        res.writeHead(200);
        res.end();
    });
});

server.listen(PORT, "127.0.0.1", () =>
    console.log(`bot-max.js: слушаю 127.0.0.1:${PORT}, ждём вебхуки MAX`),
);
