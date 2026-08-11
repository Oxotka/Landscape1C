// Напоминания зависшим сессиям опроса: кто ответил хотя бы на один вопрос,
// но давно не возвращался. Паттерн — как notify.js: читает state.json
// работающего бота ТОЛЬКО на чтение (бот сам перезаписывает его каждую
// секунду — дописывать туда из другого процесса было бы гонкой), а
// счетчик отправленных напоминаний держит в своем файле reminders.json.
// Запуск: BOT_TOKEN=<токен> node bot/remind.js [--state <файл>]
//   [--reminders <файл>] [--yes]
//   --state       какой state.json читать (по умолчанию bot/state.json)
//   --reminders   файл счетчика напоминаний (по умолчанию bot/reminders.json)
//   --yes         реально разослать; без него — репетиция, ничего не уходит
// Первое напоминание — через 3 дня бездействия. Второе (финальное) —
// в окне за неделю до отсечки волны; дата отсечки берется из env
// CUTOFF_DATE (например 2026-10-01), без нее уходит только первое.
"use strict";
const fs = require("fs");
const path = require("path");
const { api } = require("./lib/telegram");
const { T, K } = require("./lib/texts");

const args = process.argv.slice(2);
const yes = args.includes("--yes");
const opt = (name, def) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : def;
};
const stateFile = opt("--state", path.join(__dirname, "state.json"));
const remindersFile = opt(
    "--reminders",
    path.join(__dirname, "reminders.json"),
);

const RESUMABLE = ["quiz", "paused", "checkpoint", "offer", "fix"];
const FIRST_AFTER_MS = 3 * 24 * 60 * 60 * 1000; // 3 дня бездействия
const FINAL_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // окно финального призыва

const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
let reminders = {};
try {
    reminders = JSON.parse(fs.readFileSync(remindersFile, "utf8"));
} catch (e) {}

const now = Date.now();
const cutoffTs = process.env.CUTOFF_DATE
    ? Date.parse(process.env.CUTOFF_DATE)
    : null;
const finalWindowOpen = !!cutoffTs && now >= cutoffTs - FINAL_WINDOW_MS;

const targets = [];
for (const [chatStr, s] of Object.entries(state)) {
    if (!/^-?\d+$/.test(chatStr)) continue;
    if (!s || !RESUMABLE.includes(s.step)) continue;
    if (!s.answered || s.answered.length < 1) continue;
    if (s.lastActive == null) continue; // сессия старше этого деплоя — наверстает сама
    const rem = reminders[chatStr] || { count: 0, lastSentTs: 0 };
    if (rem.count >= 2) continue;
    const idle = now - s.lastActive;
    let attempt = 0;
    if (rem.count === 0 && idle >= FIRST_AFTER_MS) attempt = 1;
    else if (rem.count === 1 && finalWindowOpen) attempt = 2;
    if (!attempt) continue;
    const n = s.answered.length;
    const text = s.step === "paused" ? T.remindPaused(n) : T.remindGhost(n);
    targets.push({ chat: Number(chatStr), chatStr, text, attempt });
}

console.log(`Кандидатов: ${targets.length}`);
if (!yes) {
    targets.forEach((t) =>
        console.log(
            `  ${t.chatStr}: напоминание #${t.attempt} — ${t.text.replace(/\n+/g, " ")}`,
        ),
    );
    console.log(
        "\nРепетиция — ничего не отправлено. Разослать по-настоящему: добавь --yes",
    );
    process.exit(0);
}

(async () => {
    let ok = 0,
        gone = 0,
        failed = 0;
    for (const t of targets) {
        try {
            await api("sendMessage", {
                chat_id: t.chat,
                text: t.text,
                parse_mode: "HTML",
                reply_markup: { inline_keyboard: K.resume },
            });
            reminders[t.chatStr] = { count: t.attempt, lastSentTs: now };
            ok++;
        } catch (e) {
            if (/blocked|deactivated|chat not found/i.test(e.message)) {
                reminders[t.chatStr] = { count: t.attempt, lastSentTs: now };
                gone++;
            } else {
                failed++;
                console.error(`✗ ${t.chatStr}: ${e.message}`);
            }
        }
        await new Promise((r) => setTimeout(r, 100));
    }
    fs.writeFileSync(remindersFile, JSON.stringify(reminders));
    console.log(
        `Отправлено: ${ok}, недоступны (блок/удален): ${gone}, ошибки: ${failed}`,
    );
    process.exit(0);
})();
