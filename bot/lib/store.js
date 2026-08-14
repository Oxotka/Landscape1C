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

// Журнал ответов общий для телеграма и MAX (в записи есть platform), а
// процессов теперь два — дозапись (saveAnswer) и перезапись целиком
// (eraseAnswers на «сбросе») могут прийтись на один момент, и перезапись
// молча потеряет чужую дозапись. Межпроцессный advisory-лок без
// зависимостей: файл рядом с журналом, создаваемый эксклюзивно ("wx"),
// снимается в finally. Ждём занятый лок синхронно (обе операции
// синхронные) и ограниченно — лучше громкая ошибка, чем зависший бот
const LOCK = ANSWERS + ".lock";
const LOCK_STEP_MS = 10;
const LOCK_TRIES = 200; // ~2 секунды ожидания
const sleepSync = (ms) =>
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const withAnswersLock = (fn) => {
    let fd = null;
    for (let i = 0; i < LOCK_TRIES && fd === null; i++) {
        try {
            fd = fs.openSync(LOCK, "wx");
        } catch (e) {
            if (e.code !== "EEXIST") throw e;
            sleepSync(LOCK_STEP_MS);
        }
    }
    if (fd === null)
        throw new Error(
            `Журнал ответов заблокирован дольше ${(LOCK_TRIES * LOCK_STEP_MS) / 1000} с: ${LOCK}. ` +
                "Если второй процесс бота не работает — лок остался от упавшего, удалите файл",
        );
    try {
        return fn();
    } finally {
        fs.closeSync(fd);
        try {
            fs.unlinkSync(LOCK);
        } catch (e) {}
    }
};

const saveAnswer = (rec) => {
    rec = { ...rec, platform: PLATFORM };
    withAnswersLock(() =>
        fs.appendFileSync(ANSWERS, JSON.stringify(rec) + "\n"),
    );
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

// «Сброс»: стираем все ответы пользователя из журнала и индекса.
// Чтение и перезапись журнала — под тем же локом, что и дозапись в
// saveAnswer: иначе дозапись соседнего процесса, пришедшая между
// readFileSync и writeFileSync, потеряется. Индекс в памяти локальный
// для процесса, межпроцессный лок ему не нужен
const eraseAnswers = (chat) => {
    index.delete(uid(chat));
    if (!fs.existsSync(ANSWERS)) return;
    withAnswersLock(() => {
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
    });
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
    withAnswersLock, // экспортируется ради теста лока (bot/test/answers-lock.test.js)
    saveAnswer,
    state,
    saveState,
    myAnswers,
    eraseAnswers,
    trackMsg,
};
