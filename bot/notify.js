// Рассылка объявления по чатам бота (например, приглашения в новую волну).
// Список адресатов — ключи state.json: это телеграм chat_id (журнал ответов
// обезличен, а сессии — нет, на этом и держится возможность позвать людей
// снова). Перед обнулением state.json под новую волну сохрани снимок —
// он и есть список для рассылки.
// Запуск: BOT_TOKEN=<токен> node bot/notify.js [--state <файл>] [--yes] "<текст>"
//   --state  какой state.json брать (по умолчанию bot/state.json)
//   --yes    реально разослать; без него — репетиция: кому и что уйдет
// Текст — HTML, как все сообщения бота. Шлем по одному с паузой 100 мс
// (лимит телеграма ~30 сообщений/сек, 429 ретраится в lib/telegram);
// «бот заблокирован» — не ошибка, просто пользователь ушел.
"use strict";
const fs = require("fs");
const path = require("path");
const { api } = require("./lib/telegram");

const args = process.argv.slice(2);
const yes = args.includes("--yes");
const si = args.indexOf("--state");
const stateFile = si >= 0 ? args[si + 1] : path.join(__dirname, "state.json");
const rest = [];
for (let i = 0; i < args.length; i++) {
    if (args[i] === "--yes") continue;
    if (args[i] === "--state") {
        i++;
        continue;
    }
    rest.push(args[i]);
}
const text = rest.join(" ").trim();
if (!text) {
    console.error(
        'Нужен текст: BOT_TOKEN=<токен> node bot/notify.js [--state <файл>] [--yes] "<текст>"',
    );
    process.exit(1);
}

const chats = Object.keys(JSON.parse(fs.readFileSync(stateFile, "utf8")))
    .filter((c) => /^-?\d+$/.test(c))
    .map(Number);
console.log(`Адресатов в ${stateFile}: ${chats.length}`);
if (!yes) {
    console.log(`\nРепетиция — ничего не отправлено. Текст:\n\n${text}\n`);
    console.log("Разослать по-настоящему: добавь --yes");
    process.exit(0);
}

(async () => {
    let ok = 0,
        gone = 0,
        failed = 0;
    for (const chat of chats) {
        try {
            // Не как send() из lib/telegram: рассылка — с пушем
            // (disable_notification не ставим) и без реестра сообщений
            await api("sendMessage", {
                chat_id: chat,
                text,
                parse_mode: "HTML",
            });
            ok++;
        } catch (e) {
            if (/blocked|deactivated|chat not found/i.test(e.message)) gone++;
            else {
                failed++;
                console.error(`✗ ${chat}: ${e.message}`);
            }
        }
        await new Promise((r) => setTimeout(r, 100));
    }
    console.log(
        `Отправлено: ${ok}, недоступны (блок/удален): ${gone}, ошибки: ${failed}`,
    );
    process.exit(0);
})();
