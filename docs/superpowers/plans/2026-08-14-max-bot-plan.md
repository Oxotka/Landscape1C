# Бот опроса в MAX — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Продублировать опросного телеграм-бота (`bot/`) в мессенджере MAX без изменения его поведения в телеграме, с регрессионным тестовым покрытием, страхующим боевой телеграм-бот от рефакторинга.

**Architecture:** Общая бизнес-логика (`bot.js`: `onMessage`/`onCallback`) остаётся одна на обе платформы — `bot-max.js` (новый вебхук-процесс) собирает из событий MAX тот же telegram-подобный конверт, который эти функции уже понимают, и вызывает их напрямую. Транспорт расширяется тремя именованными функциями (`editCard`/`answerCallback`/`setupCommands`), убирающими из `bot.js` сырые вызовы `api()` с telegram-специфичными именами методов, кроме одного — `api("getUpdates", …)` в блоке long polling остаётся: сам long polling telegram-специфичен по своей природе, MAX его не использует вовсе (вебхук), абстрагировать нечего. `lib/store.js` становится platform-aware (раздельные файлы состояния, безопасная соль uid) без изменения формулы для телеграма — в `answers.jsonl` уже боевые данные волны.

**Tech Stack:** Node.js (встроенные модули: `node:test`, `node:assert/strict`, `http`, `https`, `fs`, `path`, `crypto` — без npm-пакетов, в духе «ноль зависимостей» проекта).

## Global Constraints

- Ноль внешних зависимостей — только встроенные модули Node (проект использует системный Node, без `package.json`/`npm install`).
- uid для телеграма должен остаться **бит-в-бит** таким же, как сейчас (`sha256(SALT + id)`) — в `answers.jsonl` уже боевые данные волны (238 респондентов теста), их нельзя обесценить сменой формулы.
- Комментарии — только когда неочевидно «почему» (правило проекта, `CLAUDE.md`), без описания «что».
- Форматирование — Prettier, `tabWidth: 4` (`npx prettier --write <файл>` после правок `.js`).
- Не трогать `xray.service` на VPS (194.87.62.61) — личный VPN на порту 443, MAX-вебхук идёт на 8443 через уже настроенный nginx.
- Спека: `docs/superpowers/specs/2026-08-13-max-bot-design.md` — при расхождении плана со спекой ориентир — спека.

---

## Task 1: `lib/store.js` — platform-safe uid и тестовая изоляция файлов

**Files:**
- Modify: `bot/lib/store.js:1-19`
- Test: `bot/test/uid-stability.test.js` (new)
- Modify: `.gitignore` (добавить `bot/state-max.json`, `bot/test/tmp/`)

**Interfaces:**
- Produces: `uid(id)` — не меняется по значению для `PLATFORM=telegram`/по умолчанию; для `PLATFORM=max` — другая соль. `STATE_FILE`/`ANSWERS_FILE` (env) — переопределяют пути к файлам состояния/журнала, нужны всем последующим тестам (Task 3, 4).

- [ ] **Step 1: Заменить блок путей и uid в `bot/lib/store.js`**

Файл `bot/lib/store.js`, строки 1–19, сейчас:

```js
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ANSWERS = path.join(__dirname, "..", "answers.jsonl");
const STATE = path.join(__dirname, "..", "state.json");
const SALT = process.env.BOT_SALT || "landscape1c-proto"; // в проде задать свою

// Респондент в данных — только соленый хеш telegram-id
const uid = (id) =>
    crypto
        .createHash("sha256")
        .update(SALT + id)
        .digest("hex")
        .slice(0, 16);
```

Заменить на:

```js
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
```

- [ ] **Step 2: Проставлять `platform` в каждой записи ответа**

Спека (`docs/superpowers/specs/2026-08-13-max-bot-design.md`, раздел
«Хранилище») требует поле `platform` в каждой записи `answers.jsonl` —
`bot.js`-функция `record()` сама его не знает и не должна: добавить
прямо в `saveAnswer`, единственном месте записи журнала.

В `bot/lib/store.js` найти (после правок Step 1):

```js
const saveAnswer = (rec) => {
    fs.appendFileSync(ANSWERS, JSON.stringify(rec) + "\n");
    remember(rec);
};
```

Заменить на:

```js
const saveAnswer = (rec) => {
    rec = { ...rec, platform: PLATFORM };
    fs.appendFileSync(ANSWERS, JSON.stringify(rec) + "\n");
    remember(rec);
};
```

- [ ] **Step 3: Написать golden-тест на стабильность uid телеграма**

Создать `bot/test/uid-stability.test.js`:

```js
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");

process.env.BOT_SALT = "fixed-test-salt";
process.env.PLATFORM = "telegram";
process.env.STATE_FILE = "test/tmp/state-uid-stability.json";
process.env.ANSWERS_FILE = "test/tmp/answers-uid-stability.jsonl";

const { uid } = require("../lib/store.js");

test("uid телеграма — формула sha256(SALT + id), без префикса платформы", () => {
    const expected = crypto
        .createHash("sha256")
        .update("fixed-test-salt" + 123456789)
        .digest("hex")
        .slice(0, 16);
    assert.equal(uid(123456789), expected);
});

test("uid MAX отличается от uid телеграма для того же числового id", () => {
    // Явно пересчитываем с PLATFORM=max, не полагаясь на порядок require —
    // модуль уже закэширован с PLATFORM=telegram в этом файле
    const expectedMax = crypto
        .createHash("sha256")
        .update("fixed-test-salt" + "max" + 123456789)
        .digest("hex")
        .slice(0, 16);
    assert.notEqual(expectedMax, uid(123456789));
});

test("saveAnswer проставляет platform из окружения", () => {
    const { saveAnswer } = require("../lib/store.js");
    const chat = 987654321;
    saveAnswer({
        ts: new Date().toISOString(),
        wave: 2026,
        uid: uid(chat),
        role: "разработчик",
        level: "опытный",
        context: "инхаус",
        block: "разработчик",
        tool: "Тестовый инструмент",
        answer: "работал",
        sentiment: "да",
    });
    const fs = require("node:fs");
    const path = require("node:path");
    const raw = fs.readFileSync(
        path.join(__dirname, "tmp", "answers-uid-stability.jsonl"),
        "utf8",
    );
    const last = JSON.parse(raw.trim().split("\n").at(-1));
    assert.equal(last.platform, "telegram");
});
```

- [ ] **Step 4: Добавить `bot/test/tmp/` и `bot/state-max.json` в `.gitignore`**

В `.gitignore`, рядом со строкой `bot/state.json` (строка 21), добавить:

```
bot/state-max.json
bot/test/tmp/
```

- [ ] **Step 5: Прогнать тест**

Run: `cd /Users/nikitaaripov/Documents/Landscape1C && node --test bot/test/uid-stability.test.js`
Expected: `# pass 3`, `# fail 0`.

- [ ] **Step 6: Прогнать самопроверку данных, убедиться, что ничего не сломано**

Run: `node scripts/validate.js`
Expected: код выхода 0, без ошибок (эта проверка не трогает `bot/`, но это дешёвая страховка после правки `.gitignore`).

- [ ] **Step 7: Форматирование и коммит**

```bash
npx prettier --write bot/lib/store.js bot/test/uid-stability.test.js
git add bot/lib/store.js bot/test/uid-stability.test.js .gitignore
git commit -m "Бот: platform-aware uid и STATE_FILE/ANSWERS_FILE для тестовой изоляции"
```

---

## Task 2: Тестовые хелперы — фейковый транспорт и окружение

**Files:**
- Create: `bot/test/helpers/testEnv.js`
- Create: `bot/test/helpers/fakeTransport.js`

**Interfaces:**
- Consumes: `trackMsg` из `bot/lib/store.js` (Task 1).
- Produces: `setupTestEnv(name)` — выставляет env (`TEST_MODE`, `BOT_TOKEN`, `BOT_SALT`, `PLATFORM`, `STATE_FILE`, `ANSWERS_FILE`) и чистит временные файлы теста; `installFakeTelegram()` — подменяет `require("./lib/telegram")` внутри `bot.js` на фейк, возвращает объект `{ calls, api, send, sendPhoto, hideCard, toast, editCard, answerCallback, setupCommands }`, где `calls` — массив `{name, args}` всех вызовов. Оба хелпера использует Task 3 и Task 4.

- [ ] **Step 1: Написать `bot/test/helpers/testEnv.js`**

```js
"use strict";
// Изолирует регрессионные тесты bot.js от боевых файлов: TEST_MODE даёт
// детерминированную колоду (bot/test-set.json), STATE_FILE/ANSWERS_FILE
// уводят запись в bot/test/tmp/ вместо боевых state.json/answers.jsonl
const fs = require("fs");
const path = require("path");

const TMP_DIR = path.join(__dirname, "..", "tmp");

function setupTestEnv(name) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
    process.env.TEST_MODE = "1";
    process.env.BOT_TOKEN = "test-token";
    process.env.BOT_SALT = "test-salt";
    process.env.PLATFORM = "telegram";
    process.env.STATE_FILE = `test/tmp/state-${name}.json`;
    process.env.ANSWERS_FILE = `test/tmp/answers-${name}.jsonl`;
    cleanupTestEnv(name);
}

function cleanupTestEnv(name) {
    for (const f of [
        path.join(TMP_DIR, `state-${name}.json`),
        path.join(TMP_DIR, `answers-${name}.jsonl`),
    ])
        fs.rmSync(f, { force: true });
}

module.exports = { setupTestEnv, cleanupTestEnv, TMP_DIR };
```

- [ ] **Step 2: Написать `bot/test/helpers/fakeTransport.js`**

```js
"use strict";
// Фейковый транспорт для регрессионных тестов bot.js: реализует контракт
// lib/telegram.js целиком, включая editCard/answerCallback/setupCommands
// (Task 5) и «сырой» api() — нужен, пока bot.js ещё зовёт его напрямую
// для editMessageText/editMessageCaption/answerCallbackQuery/
// setMyCommands/setChatMenuButton (до Task 6). Ничего не шлёт по сети,
// но зовёт store.trackMsg как настоящий транспорт — иначе «сброс»
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
    // До Task 6 bot.js зовёт editMessageText/editMessageCaption/
    // answerCallbackQuery/setMyCommands/setChatMenuButton напрямую
    // через api() — эмулируем и это, чтобы тесты проходили и на
    // текущем (до рефакторинга) коде
    const api = async (method, params) => {
        if (
            [
                "editMessageText",
                "editMessageCaption",
                "answerCallbackQuery",
                "setMyCommands",
                "setChatMenuButton",
            ].includes(method)
        )
            return record("api:" + method, [params], {});
        throw new Error(`fakeTransport: неожиданный api(${method})`);
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
```

- [ ] **Step 3: Прогнать синтаксическую проверку (файлы пока ничем не используются)**

Run: `node -c bot/test/helpers/testEnv.js && node -c bot/test/helpers/fakeTransport.js`
Expected: без вывода (синтаксис ок), код выхода 0.

- [ ] **Step 4: Форматирование и коммит**

```bash
npx prettier --write bot/test/helpers/testEnv.js bot/test/helpers/fakeTransport.js
git add bot/test/helpers
git commit -m "Бот: хелперы регрессионных тестов — testEnv, fakeTransport"
```

---

## Task 3: Регрессионный тест — онбординг, квиз, чекпоинт, пауза/продолжить

**Files:**
- Test: `bot/test/onboarding-quiz.test.js` (new)

**Interfaces:**
- Consumes: `setupTestEnv` (Task 2), `installFakeTelegram` (Task 2), `onMessage`/`onCallback` из `bot.js` (пока не экспортированы явно — до этого таска они module-level функции; экспорт добавляет Step 1 ниже, это первое, что требует данный тест).

Важное уточнение по порядку задач: `bot.js` сейчас **не экспортирует** `onMessage`/`onCallback` (`module.exports` в файле нет вообще), и его нижний блок «── Long polling ──» выполняется **безусловно** при любом `require("./bot")`, не только при прямом запуске — включая long polling телеграма (`api("getUpdates", …)` в бесконечном цикле). Если просто добавить `module.exports` и ничего больше, то `require("../bot.js")` из этого теста (и из Task 4/5, которые тоже требуют `bot.js`) запустит настоящий telegram-polling внутри тестового процесса — с фейковым транспортом (Task 2) он будет падать на `api("getUpdates", …)` (этого метода нет в контракте фейка) и до бесконечности логировать ошибку каждые 3 секунды, не давая процессу теста завершиться.

Поэтому первый шаг этого таска — не только экспорт, но и обёртка long polling в `require.main === module` (проверка «запущен ли файл напрямую, а не через require») — обе правки минимальны, не трогают остальную логику `bot.js` и вместе делают файл безопасно требуемым как библиотеку. Это единственная правка `bot.js` до полноценного рефакторинга (Task 6).

- [ ] **Step 1: Добавить экспорт и `require.main`-guard в `bot.js` (единственная правка до рефакторинга)**

В конец `bot/bot.js`, сразу после закрывающей `}` функции `onCallback` (строка 768) и перед комментарием `// ── Long polling ──` (строка 770), добавить:

```js

module.exports = { onMessage, onCallback };
```

Затем — в том же файле, блок `// ── Long polling ──` в самом низу, сейчас:

```js
// ── Long polling ──
(async () => {
```

и в самом конце файла `})();`. Заменить так, чтобы блок выполнялся только при прямом запуске (`node bot.js`), не при `require("./bot")`:

```js
// ── Long polling ──
// require.main === module: блок ниже выполняется только при "node bot.js"
// напрямую, не при require("./bot") из тестов или из bot-max.js (иначе
// MAX-процесс тоже запустит telegram-polling тем же токеном)
if (require.main === module)
    (async () => {
```

и последнюю строку файла `})();` заменить на:

```js
    })();
```

(то есть добавляется отступ телу существующей IIFE и убирается один уровень — сама IIFE не меняется, меняется только условие запуска).

- [ ] **Step 2: Прогнать бота вручную, убедиться что он всё ещё стартует напрямую**

Run: `cd bot && TEST_MODE=1 BOT_TOKEN=dummy timeout 3 node bot.js; cd ..`
Expected: в выводе строка `Бот запущен. Волна 2026 (эпоха 2026-test)…`, затем через 3 секунды процесс завершается по таймауту (это нормально — `timeout` его останавливает; сама попытка long polling с `dummy`-токеном будет получать ошибки от Telegram API в консоли — это ожидаемо и не является провалом проверки, важно только что процесс стартовал и не упал на старте).

- [ ] **Step 3: Написать тест `bot/test/onboarding-quiz.test.js`**

```js
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { setupTestEnv } = require("./helpers/testEnv");
const { installFakeTelegram } = require("./helpers/fakeTransport");

setupTestEnv("onboarding-quiz");
installFakeTelegram();
const { onMessage, onCallback } = require("../bot.js");
const { state } = require("../lib/store.js");

const CHAT = 111001;
let n = 0;
const msg = (text) => ({ chat: { id: CHAT }, message_id: 900000 + n++, text });
const cb = (data, messageId) => ({
    id: "cb" + n++,
    data,
    message: { chat: { id: CHAT }, message_id: messageId, photo: undefined },
});

test("онбординг → квиз → чекпоинт → пауза → продолжить → ответ с сентиментом", async () => {
    await onMessage(msg("/start"));
    assert.equal(state[CHAT].step, "intro");

    await onCallback(cb("go:", 0));
    assert.equal(state[CHAT].step, "role");

    await onCallback(cb("role:разработчик", 0));
    assert.equal(state[CHAT].step, "level");
    assert.equal(state[CHAT].role, "разработчик");

    await onCallback(cb("level:опытный", 0));
    assert.equal(state[CHAT].step, "context");
    assert.equal(state[CHAT].level, "опытный");

    await onCallback(cb("ctx:инхаус", 0));
    assert.equal(state[CHAT].step, "confirm");
    assert.equal(state[CHAT].context, "инхаус");

    await onCallback(cb("ok:", 0));
    assert.equal(state[CHAT].step, "quiz");
    assert.equal(state[CHAT].pos, 0);
    const queueLen = state[CHAT].queue.length;
    assert.ok(queueLen >= 15, "test-set.json должен давать длинную колоду для роли «разработчик»");

    // 9 ответов "не знаю" — без второго вопроса, чекпоинт ещё не наступает
    for (let i = 0; i < 9; i++) {
        const tool = state[CHAT].queue[state[CHAT].pos];
        await onCallback(cb("a:не знаю", state[CHAT].cardMsg));
        assert.equal(state[CHAT].answered.at(-1), tool);
    }
    assert.equal(state[CHAT].pos, 9);
    assert.equal(state[CHAT].step, "quiz");

    // 10-й ответ — срабатывает чекпоинт (каждые 10 ответов)
    await onCallback(cb("a:не знаю", state[CHAT].cardMsg));
    assert.equal(state[CHAT].pos, 10);
    assert.equal(state[CHAT].step, "checkpoint");
    assert.equal(state[CHAT].cp.list.length, 10);

    // Пауза с чекпоинта, затем продолжить
    await onCallback(cb("pause:", 0));
    assert.equal(state[CHAT].step, "paused");

    await onCallback(cb("resume:", 0));
    assert.equal(state[CHAT].step, "quiz");
    assert.equal(state[CHAT].pos, 10);

    // Ответ с сентиментом: "работал" → второй вопрос → "да"
    const toolWithSentiment = state[CHAT].queue[state[CHAT].pos];
    await onCallback(cb("a:работал", state[CHAT].cardMsg));
    assert.ok(state[CHAT].pending);
    assert.equal(state[CHAT].pending.tool, toolWithSentiment);
    assert.equal(state[CHAT].pos, 10, "позиция не двигается до ответа на второй вопрос");

    await onCallback(cb("s:да", state[CHAT].cardMsg));
    assert.equal(state[CHAT].pending, null);
    assert.equal(state[CHAT].pos, 11);
    assert.equal(state[CHAT].answered.at(-1), toolWithSentiment);
});
```

- [ ] **Step 4: Прогнать тест**

Run: `cd /Users/nikitaaripov/Documents/Landscape1C && node --test bot/test/onboarding-quiz.test.js`
Expected: `# pass 1`, `# fail 0`. Если падает — читать первое несовпадение assert, не менять тест под текущее поведение вслепую: сверяться с `bot/bot.js`, логика теста построена по построчному чтению актуального кода (см. функции `onCallback`/`next`/`resumeSession`).

- [ ] **Step 5: Форматирование и коммит**

```bash
npx prettier --write bot/bot.js bot/test/onboarding-quiz.test.js
git add bot/bot.js bot/test/onboarding-quiz.test.js
git commit -m "Бот: регрессионный тест онбординга/квиза/чекпоинта/паузы + экспорт onMessage/onCallback"
```

---

## Task 4: Регрессионный тест — исправление ответа и сброс

**Files:**
- Test: `bot/test/fix-and-reset.test.js` (new)

**Interfaces:**
- Consumes: те же хелперы, что Task 3; `myAnswers` из `bot/lib/store.js`.

- [ ] **Step 1: Написать тест `bot/test/fix-and-reset.test.js`**

```js
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { setupTestEnv } = require("./helpers/testEnv");
const { installFakeTelegram } = require("./helpers/fakeTransport");

setupTestEnv("fix-and-reset");
installFakeTelegram();
const { onMessage, onCallback } = require("../bot.js");
const { state, myAnswers } = require("../lib/store.js");

const CHAT = 222002;
let n = 0;
const msg = (text) => ({ chat: { id: CHAT }, message_id: 900000 + n++, text });
const cb = (data, messageId) => ({
    id: "cb" + n++,
    data,
    message: { chat: { id: CHAT }, message_id: messageId, photo: undefined },
});

async function toQuiz() {
    await onMessage(msg("/start"));
    await onCallback(cb("go:", 0));
    await onCallback(cb("role:разработчик", 0));
    await onCallback(cb("level:опытный", 0));
    await onCallback(cb("ctx:инхаус", 0));
    await onCallback(cb("ok:", 0));
}

test("исправление ответа по названию инструмента (текстовый поиск)", async () => {
    await toQuiz();
    const firstTool = state[CHAT].queue[0];

    // Отвечаем на первый вопрос: "слышал" → второй вопрос → "-" (пропуск)
    await onCallback(cb("a:слышал", state[CHAT].cardMsg));
    await onCallback(cb("s:-", state[CHAT].cardMsg));
    assert.equal(state[CHAT].pos, 1);
    assert.deepEqual(myAnswers(CHAT).map((r) => r.tool), [firstTool]);
    assert.equal(myAnswers(CHAT)[0].answer, "слышал");

    // Текстом — точное название уже отвеченного инструмента, посреди квиза
    await onMessage(msg(firstTool));
    assert.equal(state[CHAT].step, "fix");
    assert.equal(state[CHAT].fixTool, firstTool);
    assert.equal(state[CHAT].fixReturn, "quiz");

    // Исправляем на "работал" → сентимент "да"
    await onCallback(cb("a:работал", state[CHAT].cardMsg));
    await onCallback(cb("s:да", state[CHAT].cardMsg));

    // Возврат туда, откуда пришли — квиз, позиция не сдвинулась исправлением
    assert.equal(state[CHAT].step, "quiz");
    assert.equal(state[CHAT].pos, 1);
    assert.deepEqual(myAnswers(CHAT).map((r) => r.tool), [firstTool]);
    assert.equal(myAnswers(CHAT)[0].answer, "работал");
    assert.equal(myAnswers(CHAT)[0].sentiment, "да");
});

test("сброс стирает ответы и возвращает к интро", async () => {
    await toQuiz();
    await onCallback(cb("a:не знаю", state[CHAT].cardMsg));
    assert.equal(myAnswers(CHAT).length, 1);

    await onMessage(msg("сброс"));
    await onCallback(cb("reset:yes", 0));

    assert.equal(state[CHAT].step, "intro");
    assert.equal(myAnswers(CHAT).length, 0);
});
```

- [ ] **Step 2: Прогнать тест**

Run: `cd /Users/nikitaaripov/Documents/Landscape1C && node --test bot/test/fix-and-reset.test.js`
Expected: `# pass 2`, `# fail 0`.

- [ ] **Step 3: Прогнать весь набор регрессионных тестов вместе**

Run: `node --test bot/test/*.test.js`
Expected: `# pass 6`, `# fail 0` (3 теста Task 1 + 1 Task 3 + 2 Task 4). Это базовая линия «до рефакторинга» — именно её должны продолжать проходить Task 5 и 6.

- [ ] **Step 4: Форматирование и коммит**

```bash
npx prettier --write bot/test/fix-and-reset.test.js
git add bot/test/fix-and-reset.test.js
git commit -m "Бот: регрессионный тест исправления ответа и сброса"
```

---

## Task 5: `lib/telegram.js` — добавить editCard/answerCallback/setupCommands

**Files:**
- Modify: `bot/lib/telegram.js` (добавить функции + расширить `module.exports`, строка 163)

**Interfaces:**
- Produces: `editCard(chat, msgId, text, keyboard, isPhoto)`, `answerCallback(id)`, `setupCommands()` — потребляются `bot.js` в Task 6 и фейком в Task 2 (контракт уже согласован).
- Это чисто аддитивная правка — `bot.js` её пока не использует, тесты Task 3/4 продолжают идти через фейковый `api()`.

- [ ] **Step 1: Дописать функции в конец `bot/lib/telegram.js`, перед `module.exports`**

Перед строкой `module.exports = { api, send, sendPhoto, hideCard, toast };` (строка 163) вставить:

```js
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
```

- [ ] **Step 2: Расширить `module.exports`**

Заменить строку 163:

```js
module.exports = { api, send, sendPhoto, hideCard, toast };
```

на:

```js
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
```

- [ ] **Step 3: Прогнать полный регрессионный набор — должен остаться зелёным**

Run: `node --test bot/test/*.test.js`
Expected: `# pass 6`, `# fail 0` (правка аддитивная, `bot.js` новые функции ещё не вызывает).

- [ ] **Step 4: Форматирование и коммит**

```bash
npx prettier --write bot/lib/telegram.js
git add bot/lib/telegram.js
git commit -m "Бот: транспорт — editCard/answerCallback/setupCommands (аддитивно)"
```

---

## Task 6: `bot.js` — убрать сырые telegram-вызовы

**Files:**
- Modify: `bot/bot.js:13` (импорт), `bot/bot.js:85-103` (`ensureAnchor`), `bot/bot.js:640-656` (ответ на "a"), `bot/bot.js:541` (`answerCallback`), `bot/bot.js:789-807` (замена на `setupCommands`)

**Interfaces:**
- Consumes: `editCard`/`answerCallback`/`setupCommands` из Task 5.
- Это единственный таск, ради которого писались тесты Task 1–4 — каждый шаг ниже проверяется прогоном `node --test bot/test/*.test.js`.
- `module.exports` и `require.main`-guard в `bot.js` уже добавлены в Task 3 Step 1 (иначе тесты Task 3/4 не смогли бы требовать `bot.js` без запуска polling) — здесь их трогать не нужно.

- [ ] **Step 1: Расширить импорт транспорта**

Строка 13, сейчас:

```js
const { api, send, sendPhoto, hideCard, toast } = require("./lib/telegram");
```

Заменить на (`api` остаётся — он всё ещё нужен низкоуровневому `getUpdates` в блоке long polling внизу файла, строка ~824; это единственное оставшееся использование `api()` в `bot.js` после этого таска, поэтому не убираем импорт, а добавляем к нему три новых имени):

```js
const {
    api,
    send,
    sendPhoto,
    hideCard,
    toast,
    editCard,
    answerCallback,
    setupCommands,
} = require("./lib/telegram");
```

- [ ] **Step 2: `ensureAnchor` — заменить прямой `api("editMessageText", …)`**

Строки 85–97, сейчас:

```js
async function ensureAnchor(chat, s, text) {
    if (s.anchorText === text) return;
    if (s.anchorMsg) {
        try {
            await api("editMessageText", {
                chat_id: chat,
                message_id: s.anchorMsg,
                text,
            });
            s.anchorText = text;
            saveState();
            return;
        } catch (e) {} // якорь удалили руками — пересоздаем
    }
```

Заменить на:

```js
async function ensureAnchor(chat, s, text) {
    if (s.anchorText === text) return;
    if (s.anchorMsg) {
        try {
            await editCard(chat, s.anchorMsg, text);
            s.anchorText = text;
            saveState();
            return;
        } catch (e) {} // якорь удалили руками — пересоздаем
    }
```

- [ ] **Step 3: `onCallback`, ветка "a" — заменить `api("editMessageText"/"editMessageCaption", …)`**

Найти (около строки 640–656):

```js
        const params = {
            chat_id: chat,
            message_id: q.message.message_id,
            parse_mode: "HTML",
            reply_markup: { inline_keyboard: K.sent[val] },
        };
        params[q.message.photo ? "caption" : "text"] = text;
        return api(
            q.message.photo ? "editMessageCaption" : "editMessageText",
            params,
        ).catch(() => send(chat, T.sentFallback(val), K.sent[val]));
```

Заменить на:

```js
        return editCard(
            chat,
            q.message.message_id,
            text,
            K.sent[val],
            !!q.message.photo,
        ).catch(() => send(chat, T.sentFallback(val), K.sent[val]));
```

- [ ] **Step 4: `onCallback` — заменить `api("answerCallbackQuery", …)`**

Строка 541, сейчас:

```js
    api("answerCallbackQuery", { callback_query_id: q.id }).catch(() => {});
```

Заменить на:

```js
    answerCallback(q.id).catch(() => {});
```

- [ ] **Step 5: Заменить блок `setMyCommands`/`setChatMenuButton` на `setupCommands()`**

Строки 789–807, сейчас:

```js
    // Меню команд в телеграме — чтобы команды были находимы без подсказок
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
            { command: "reset", description: "Стереть все и начать заново" },
        ],
    }).catch((e) => console.error("setMyCommands:", e.message));
    // Кнопка «Меню» у поля ввода — принудительно включаем показ команд
    // (иначе клиент решает сам и у части пользователей меню не видно)
    api("setChatMenuButton", { menu_button: { type: "commands" } }).catch((e) =>
        console.error("setChatMenuButton:", e.message),
    );
```

Заменить на:

```js
    // Меню команд + кнопка «Меню» у поля ввода — чтобы команды были
    // находимы без подсказок (детали — в lib/telegram.js)
    setupCommands().catch((e) => console.error("setupCommands:", e.message));
```

- [ ] **Step 6: Прогнать полный регрессионный набор — это и есть проверка «ничего не сломали»**

Run: `node --test bot/test/*.test.js`
Expected: `# pass 6`, `# fail 0`. Если что-то упало — не подгонять тест под новое поведение, разбираться в diff по шагам 1–5 (например: `editCard` при `isPhoto=false` должен ставить именно `params.text`, не `params.caption`).

- [ ] **Step 7: Ручная регресс-проверка на боевом коде (без реальной отправки)**

Run: `cd bot && TEST_MODE=1 BOT_TOKEN=dummy timeout 3 node bot.js; cd ..`
Expected: тот же старт, что в Task 3 Step 2 — `Бот запущен…`, без синтаксических ошибок и падений на старте (ошибки от Telegram API из-за `dummy`-токена в логе — норма).

- [ ] **Step 8: Форматирование и коммит**

```bash
npx prettier --write bot/bot.js
git add bot/bot.js
git commit -m "Бот: убрать сырые telegram-вызовы (editCard/answerCallback/setupCommands)"
```

- [ ] **Step 9: Деплой — отложен до слияния ветки**

Работа над всем планом идёт в изолированном git-worktree на отдельной ветке, которая нигде не запушена (по дизайну — см. `superpowers:using-git-worktrees`/`subagent-driven-development`). VPS обновляется через `git pull`, тянущий `origin/main` — коммит этого таска физически не может туда попасть, пока ветка не смержена в `main` и не запушена. Деплоить незавершённую фичу (MAX-часть до Task 7–9 ещё не существует) посреди плана — значит выкатить на прод код, который не прошёл финальное ревью всей ветки.

Поэтому реальный деплой этого коммита на VPS происходит **не в рамках Task 6**, а после того как весь план (Task 1–9) пройдёт финальное ревью и будет смёржен в `main` (`superpowers:finishing-a-development-branch`) — тогда же по команде `git -C /opt/landscape1c pull && systemctl restart stateof1c` обновится и телеграм-бот, и это будет первый реальный прод-деплой изменений из этого плана. Ручная проверка живого бота в телеграме (написать `/start`, пройти карточки, пауза/резюме) делается на этом финальном шаге, не раньше.

Для целей Task 6 достаточно локальной проверки (Step 6–7 выше, уже зелёные) — она и есть критерий готовности таска.

---

## Task 7: `lib/max.js` — исходящий транспорт MAX

**Files:**
- Create: `bot/lib/max.js`

**Interfaces:**
- Produces: тот же контракт, что `lib/telegram.js` — `{api, send, sendPhoto, hideCard, toast, editCard, answerCallback, setupCommands}`. `bot-max.js` (Task 8/9) требует этот модуль вместо `lib/telegram.js`.
- Основано на подтверждённой документации MAX Bot API (dev.max.ru, проверено 14.08.2026): `https://platform-api2.max.ru`, токен в заголовке `Authorization: <token>` (без `Bearer`/query), `chat_id`/`message_id` — query-параметры, не часть пути.

- [ ] **Step 1: Написать `bot/lib/max.js`**

```js
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
    }).then((r) => ({ message_id: r.message && r.message.body && r.message.body.mid }));

// Загрузка фото — двухшаговая (dev.max.ru/docs-api/methods/POST/uploads,
// проверено 14.08.2026): получить одноразовый URL загрузки, залить туда
// файл multipart-ом, получить token вложения, использовать в сообщении
const requestUploadUrl = () => api("POST", "/uploads?type=image");
const uploadFile = (uploadUrl, file) =>
    new Promise((resolve, reject) => {
        const b = "----landscape" + Date.now();
        const head =
            `--${b}\r\nContent-Disposition: form-data; name="data"; filename="${path.basename(file)}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
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
    return { message_id: r.message && r.message.body && r.message.body.mid };
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
    }).then((r) => ({ message_id: r.message && r.message.body && r.message.body.mid }));
// В MAX ответ на callback и правка карточки — один вызов (POST /answers);
// здесь просто подтверждение без правки текста, как и telegram-овский
// answerCallbackQuery — сама карточка правится отдельным editCard выше
const answerCallback = (id) =>
    api("POST", `/answers?callback_id=${id}`, {});
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
```

- [ ] **Step 2: Проверить синтаксис**

Run: `node -c bot/lib/max.js`
Expected: без вывода, код выхода 0.

- [ ] **Step 3: Явно отметить в коде места, требующие проверки по первому реальному вызову**

Оставить как есть — в `send`/`sendPhoto`/`editCard` путь `r.message.body.mid` — лучшее предположение по документации (точная схема `MessageBody` не публикуется, `dev.max.ru/docs-api/objects/MessageBody` отдаёт 404 на 14.08.2026). Это подтверждается или правится по факту первого реального ответа API в Task 9 Step 2 — не раньше, там будет реальный `Message`-объект в логе.

- [ ] **Step 4: Форматирование и коммит**

```bash
npx prettier --write bot/lib/max.js
git add bot/lib/max.js
git commit -m "Бот: транспорт MAX (lib/max.js) по документации Bot API"
```

---

## Task 8: `bot-max.js` — приём вебхука, проверка подписи, захват реального payload

**Files:**
- Create: `bot/bot-max.js`

**Interfaces:**
- Consumes: `onMessage`/`onCallback` из `bot.js` (Task 3/6), но **не вызывает их в этом таске** — сначала нужен реальный пример payload (Task 9).
- Produces: работающий HTTP-приёмник на `127.0.0.1:3001` (за ним — nginx на 8443, уже настроен на VPS), пишущий сырые входящие события в лог для последующего разбора.

- [ ] **Step 1: Написать `bot/bot-max.js` в режиме захвата**

```js
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
```

- [ ] **Step 2: Проверить синтаксис и локальный запуск**

Run: `MAX_WEBHOOK_SECRET=test node -c bot/bot-max.js && MAX_WEBHOOK_SECRET=test timeout 2 node bot/bot-max.js`
Expected: строка `bot-max.js: слушаю 127.0.0.1:3001, ждём вебхуки MAX`, без ошибок, завершение по таймауту.

- [ ] **Step 3: Проверить приём локальным curl (без секрета — должен отбить)**

```bash
MAX_WEBHOOK_SECRET=test node bot/bot-max.js &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://127.0.0.1:3001/ -d '{}'
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://127.0.0.1:3001/ -H "X-Max-Bot-Api-Secret: test" -d '{"update_type":"message_created"}'
kill %1
```

Expected: первая строка `401` (нет секрета), вторая `200` (секрет верный).

- [ ] **Step 4: Форматирование и коммит**

```bash
npx prettier --write bot/bot-max.js
git add bot/bot-max.js
git commit -m "Бот: bot-max.js — приём вебхука MAX, проверка секрета, захват сырых событий"
```

---

## Task 9: Регистрация вебхука, реальный payload, перевод в onMessage/onCallback, деплой

**Files:**
- Modify: `bot/bot-max.js` (добавить перевод события в вызов `onMessage`/`onCallback`)
- Create: `bot/deploy/stateof1c-max.service`
- Create: `bot/register-max-webhook.js` (разовый скрипт регистрации)

**Interfaces:**
- Consumes: `onMessage`/`onCallback` из `bot.js`, `lib/max.js` из Task 7.
- Это единственный таск с шагами, требующими реального аккаунта MAX (токен, живой чат) — не автоматизируется тестами, только ручная проверка.

- [ ] **Step 1: Написать разовый скрипт регистрации вебхука**

```js
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
```

- [ ] **Step 2: Задеплоить `bot-max.js` (в режиме захвата из Task 8) на VPS и зарегистрировать вебхук**

```bash
ssh root@194.87.62.61 'cd /opt/landscape1c && git pull'
ssh root@194.87.62.61 'MAX_WEBHOOK_SECRET=<секрет> nohup node /opt/landscape1c/bot/bot-max.js > /tmp/bot-max.log 2>&1 & echo $! > /tmp/bot-max.pid'
ssh root@194.87.62.61 'MAX_BOT_TOKEN=<токен> MAX_WEBHOOK_SECRET=<тот же секрет> node /opt/landscape1c/bot/register-max-webhook.js'
```

Дальше — руками, не автоматизируется: написать боту `StateOf1C_bot` в MAX любое сообщение, затем нажать любую inline-кнопку (если на этот момент бот ничего не отвечает — это ожидаемо, режим захвата ничего не шлёт в ответ). Забрать лог:

```bash
ssh root@194.87.62.61 'cat /tmp/bot-max.log'
```

Expected: строки `MAX update: {...}` с реальным JSON для `message_created` и `message_callback`. Это и есть тот самый пример payload, которого не было в документации.

- [ ] **Step 3: По реальному payload дописать перевод события в `bot/bot-max.js`**

Опираясь на JSON из Step 2 (структура `update.message`/`update.callback` — то, что не публикует документация), заменить в `bot/bot-max.js` блок `console.log("MAX update: ...")` на реальный вызов `onMessage`/`onCallback` с конвертацией в telegram-подобный конверт, который они ожидают (см. `docs/superpowers/specs/2026-08-13-max-bot-design.md`, раздел «Архитектура»):

```js
const { onMessage, onCallback } = require("./bot.js");

// ...внутри req.on("end", ...), вместо console.log("MAX update: ..."):
if (update.update_type === "message_created") {
    onMessage({
        chat: { id: update.chat_id },
        message_id: update.message.body.mid, // сверено с реальным payload на Step 2
        text: update.message.body.text,
    }).catch(console.error);
} else if (update.update_type === "message_callback") {
    onCallback({
        id: update.callback.callback_id,
        data: update.callback.payload,
        message: {
            chat: { id: update.chat_id },
            message_id: update.message_id,
            photo: undefined, // MAX не различает фото/текст в редактировании так же, как telegram caption/text — сверить на Step 2, при необходимости привести editCard к единой форме
        },
    }).catch(console.error);
}
res.writeHead(200);
res.end();
```

Здесь `update.message.body.mid`/`update.callback.callback_id`/`update.callback.payload` — по аналогии с уже подтверждёнными полями (`Message.body`, кнопка `{type, text, payload}` из документации) и общей схемой `Update` (`update_type`, `chat_id`, `message_id` на верхнем уровне для `message_callback`). Подставить точные имена полей по реальному JSON из Step 2, если они разойдутся с этим предположением — это ожидаемая часть шага, не пропускать сверку.

- [ ] **Step 4: Перезапустить `bot-max.js` под systemd вместо `nohup`**

Создать `bot/deploy/stateof1c-max.service` (по образцу `bot/deploy/stateof1c.service`):

```ini
# Юнит systemd для MAX-бота опроса (docs/superpowers/specs/2026-08-13-max-bot-design.md).
# Установка: скопировать в /etc/systemd/system/stateof1c-max.service,
# токен и секрет вебхука — в /etc/stateof1c.env (MAX_BOT_TOKEN=...,
# MAX_WEBHOOK_SECRET=...), рядом с BOT_TOKEN телеграм-бота.
[Unit]
Description=Бот опроса в MAX (StateOf1C_bot, landscape1c.ru)
After=network-online.target
Wants=network-online.target

[Service]
User=stateof1c
WorkingDirectory=/opt/landscape1c
ExecStart=/usr/bin/node bot/bot-max.js
EnvironmentFile=/etc/stateof1c.env
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
ssh root@194.87.62.61 'kill $(cat /tmp/bot-max.pid) 2>/dev/null'
ssh root@194.87.62.61 'cd /opt/landscape1c && git pull'
ssh root@194.87.62.61 'printf "MAX_BOT_TOKEN=<токен>\nMAX_WEBHOOK_SECRET=<секрет>\n" >> /etc/stateof1c.env'
ssh root@194.87.62.61 'cp /opt/landscape1c/bot/deploy/stateof1c-max.service /etc/systemd/system/ && systemctl daemon-reload && systemctl enable --now stateof1c-max && sleep 2 && systemctl status stateof1c-max --no-pager -l | head -15'
```

Expected: `active (running)`, без ошибок.

- [ ] **Step 5: Сквозной ручной прогон в MAX**

Не автоматизируется — написать боту в MAX, пройти `/start` → выбор роли/уровня/контекста → несколько карточек квиза (включая ответ с сентиментом и один чекпоинт) → `/pause` → `/resume`. Сверить, что карточки, кнопки и якорь ведут себя так же, как в телеграме. Если что-то не так с фото — проверить лог (`journalctl -u stateof1c-max -f`) на ошибку из `lib/max.js` (скорее всего в `r.message.body.mid`, отмеченном на Task 7 Step 3 как предположение).

- [ ] **Step 6: Форматирование и коммит**

```bash
npx prettier --write bot/bot-max.js bot/register-max-webhook.js bot/deploy/stateof1c-max.service
git add bot/bot-max.js bot/register-max-webhook.js bot/deploy/stateof1c-max.service
git commit -m "Бот: перевод события MAX в onMessage/onCallback, systemd-юнит, регистрация вебхука"
```

---

## Task 9, живые шаги — пройдены (14.08.2026)

Шаги 2/3/5 и ssh-команды шага 4, изначально отложенные до мержа ветки
(см. коммит `df66f2c`), выполнены вручную вместе с владельцем после
слияния в `main` и пуша. Находки, не предусмотренные планом:

- **Порт — жёстко 443**, не 8443 (документация MAX порт не
  регламентирует, но реально не доставляет вебхуки ни на какой другой
  порт). `xray` (личный VPN на 443) по решению владельца отключён
  насовсем — 443 теперь целиком под бота. Подробности и находки по
  реальной схеме payload — в спеке, раздел «Инфраструктура».
- Исходящие запросы к `platform-api2.max.ru` требовали
  `NODE_EXTRA_CA_CERTS` (сертификат MAX подписан российским CA,
  которого нет в наборе CA у Node.js) — см. спеку.
- `notify: false` не хватало в `editCard` (был только в `send`/
  `sendPhoto`) — карточки при правке слали push. Поправлено, но
  звуковой сигнал при **открытом** чате в веб/десктоп-клиенте MAX всё
  равно есть — похоже, это клиентское поведение для активного
  соединения, не то, что регулирует `notify` (он про push для
  отключённого клиента). Не наш баг, но стоит держать в уме.
- `editCard` при правке карточки с фото (переход к вопросу про
  сентимент) стирал фото — `PUT /messages` у MAX задаёт вложения
  целиком, а не патчит. Поправлено: перед правкой перечитываем
  сообщение (`GET /messages?message_ids=`) и прикладываем фото обратно.
- Ответ `POST /uploads` — не плоский `{token}`, а `{photos: {<id>:
  {token}}}` (в документации не расписано).
- У MAX нет **вообще никакого** аналога telegram-овского меню команд
  — ни через API, ни в кабинете business.max.ru (проверено). Не баг,
  ограничение платформы.

Сквозной ручной прогон (Step 5) пройден полностью: онбординг → квиз с
фото → чекпоинт → пауза/резюме → исправление ответа текстом — всё
отработало как в телеграме. `answers.jsonl` пишется с `platform:"max"`.

## После этого плана (не входит в задачи выше)

Из дорожной карты спеки (`docs/superpowers/specs/2026-08-13-max-bot-design.md`) вне этого плана остаются:

- `remind.js`/`notify.js` — флаг `--platform`, чтобы напоминания и рассылки работали для MAX так же, как для телеграма.
- Обновление `bot/README.md`/`RUNBOOK.local.md` разделами про MAX.
- Пилот на небольшой группе перед общим анонсом волны.
- Сверка самых длинных текстов `lib/texts.js` с лимитом MAX в 4000 символов (`bot/validate.js`, при необходимости).

Это отдельные, более лёгкие задачи — оформлять по мере готовности основного порта, не блокируют его.
