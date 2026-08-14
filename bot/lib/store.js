// Хранилище бота: журнал ответов (JSONL, append-only), состояние сессий
// и обезличивание респондентов. Единственный модуль, знающий про файлы, —
// при переезде на БД меняется только он.
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// PLATFORM различает телеграм и MAX: раздельные файлы состояния (два
// процесса не должны драться за один state.json) и соль uid — только
// для MAX добавляем префикс платформы, чтобы не столкнуться с
// telegram-id случайно; для телеграма (по умолчанию) формула хеша не
// меняется — в answers.jsonl уже боевые данные волны, ломать их нельзя
const PLATFORM = process.env.PLATFORM || "telegram";
// STATE_FILE/ANSWERS_FILE — переопределение путей для тестов
// (регрессионные тесты bot.js не должны трогать боевые
// bot/state.json и bot/answers.jsonl)
const ANSWERS = path.join(
    __dirname,
    "..",
    process.env.ANSWERS_FILE || "answers.jsonl",
);
const STATE = path.join(
    __dirname,
    "..",
    process.env.STATE_FILE ||
        (PLATFORM === "max" ? "state-max.json" : "state.json"),
);
const SALT = process.env.BOT_SALT || "landscape1c-proto"; // в проде задать свою

// Респондент в данных — только соленый хеш id (для MAX — с префиксом
// платформы, для телеграма формула прежняя, см. комментарий выше)
const uid = (id) =>
    crypto
        .createHash("sha256")
        .update(SALT + (PLATFORM === "max" ? "max" : "") + id)
        .digest("hex")
        .slice(0, 16);

// Индекс ответов в памяти: uid → (tool → {tool, answer, sentiment}).
// Журнал на диске — источник истины, целиком читается один раз при старте,
// дальше только дозапись; храним лишь поля, нужные сводке и исправлению
const index = new Map();
const remember = (r) => {
    if (!r.uid || !r.tool) return;
    let m = index.get(r.uid);
    if (!m) index.set(r.uid, (m = new Map()));
    m.set(r.tool, { tool: r.tool, answer: r.answer, sentiment: r.sentiment });
};
if (fs.existsSync(ANSWERS))
    fs.readFileSync(ANSWERS, "utf8")
        .split("\n")
        .filter(Boolean)
        .forEach((l) => {
            try {
                remember(JSON.parse(l));
            } catch (e) {}
        });

const saveAnswer = (rec) => {
    rec = { ...rec, platform: PLATFORM };
    fs.appendFileSync(ANSWERS, JSON.stringify(rec) + "\n");
    remember(rec);
};

let state = {};
try {
    state = JSON.parse(fs.readFileSync(STATE, "utf8"));
} catch (e) {}
// Состояние пишется не на каждое действие (saveState дергается по несколько
// раз на тап, а файл на тысячах сессий большой), а раз в секунду при наличии
// изменений: сначала во временный файл, потом атомарный rename. Ответы при
// падении не теряются — они в журнале; рискует максимум секунда прогресса
let dirty = false;
let writing = false;
const saveState = () => {
    dirty = true;
};
const flushState = () => {
    if (!dirty || writing) return;
    dirty = false;
    writing = true;
    fs.writeFile(STATE + ".tmp", JSON.stringify(state), (e) => {
        if (e) {
            writing = false;
            dirty = true;
            return console.error("state:", e.message);
        }
        fs.rename(STATE + ".tmp", STATE, (e2) => {
            writing = false;
            if (e2) {
                dirty = true;
                console.error("state:", e2.message);
            }
        });
    });
};
setInterval(flushState, 1000).unref();
// При остановке процесса несохраненное досохраняется синхронно
process.on("exit", () => {
    if (dirty) {
        try {
            fs.writeFileSync(STATE, JSON.stringify(state));
        } catch (e) {}
    }
});
["SIGINT", "SIGTERM"].forEach((sig) => process.on(sig, () => process.exit(0)));

// Последний ответ пользователя по каждому инструменту
const myAnswers = (chat) => {
    const m = index.get(uid(chat));
    return m ? [...m.values()] : [];
};

// «Сброс»: стираем все ответы пользователя из журнала и индекса
const eraseAnswers = (chat) => {
    index.delete(uid(chat));
    if (!fs.existsSync(ANSWERS)) return;
    const keep = fs
        .readFileSync(ANSWERS, "utf8")
        .split("\n")
        .filter(Boolean)
        .filter((l) => {
            try {
                return JSON.parse(l).uid !== uid(chat);
            } catch (e) {
                return true;
            }
        });
    fs.writeFileSync(ANSWERS, keep.length ? keep.join("\n") + "\n" : "");
};

// Реестр отправленных ботом сообщений (живет в состоянии чата) —
// чтобы «сброс» мог вычистить с экрана вообще все
const trackMsg = (chat, res) => {
    const s = state[chat];
    if (s && res && res.message_id) {
        (s.msgs = s.msgs || []).push(res.message_id);
        if (s.msgs.length > 300) s.msgs.splice(0, s.msgs.length - 300);
        saveState();
    }
    return res;
};

module.exports = {
    uid,
    saveAnswer,
    state,
    saveState,
    myAnswers,
    eraseAnswers,
    trackMsg,
};
