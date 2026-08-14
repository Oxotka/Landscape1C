// Вебхук-приёмник MAX. За nginx (TLS-терминатор на 8443, см.
// docs/superpowers/specs/2026-08-13-max-bot-design.md) — сам процесс
// слушает голый HTTP на 127.0.0.1:3001. Проверяет секрет вебхука
// (X-Max-Bot-Api-Secret, см. POST /subscriptions), логирует сырые
// события — на этом этапе (Task 8) ещё не переводит их в вызовы
// onMessage/onCallback, это Task 9, когда есть реальный пример payload.
"use strict";
const http = require("http");

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
        // Захват сырого события — на этом этапе только логируем, разбор
        // и вызов onMessage/onCallback добавляет Task 9 по реальному
        // примеру (в документации точная схема Update не публикуется)
        console.log(
            "MAX update:",
            JSON.stringify({ update_type: update.update_type, update }),
        );
        res.writeHead(200);
        res.end();
    });
});

server.listen(PORT, "127.0.0.1", () =>
    console.log(`bot-max.js: слушаю 127.0.0.1:${PORT}, ждём вебхуки MAX`),
);
