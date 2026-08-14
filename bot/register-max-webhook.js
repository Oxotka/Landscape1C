// Разовая регистрация вебхука MAX (dev.max.ru/docs-api/methods/POST/subscriptions).
// Запуск: MAX_BOT_TOKEN=<токен> node bot/register-max-webhook.js
"use strict";
const { api } = require("./lib/max.js");

const URL = "https://max-bot.landscape1c.ru:8443/webhook";
const SECRET = process.env.MAX_WEBHOOK_SECRET;
if (!SECRET) {
    console.error("Нужен тот же секрет, что в MAX_WEBHOOK_SECRET у bot-max.js");
    process.exit(1);
}

api("POST", "/subscriptions", {
    url: URL,
    update_types: ["message_created", "message_callback", "bot_started"],
    secret: SECRET,
})
    .then((r) => console.log("Подписка:", JSON.stringify(r)))
    .catch((e) => {
        console.error("Ошибка подписки:", e.message);
        process.exit(1);
    });
