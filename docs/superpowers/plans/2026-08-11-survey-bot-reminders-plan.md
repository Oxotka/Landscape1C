# Напоминания брошенным сессиям опроса — Implementation Plan

> **Архив реализации; статус на 05.09.2026.** Напоминания реализованы; `remind.js` поддерживает Telegram и MAX через `--platform`. Фактические отправки и расписание проверяются на сервере. Ниже сохранён исходный план: его чекбоксы и формулировки описывают ход реализации, а не текущий список задач. Актуальные планы — в [ТЗ](../../TZ.md), §13 и §15.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Добавить в `@stateOf1c_bot` автоматические напоминания тем, кто ответил хотя бы на один вопрос опроса, но давно не возвращался — до двух напоминаний на человека, без гонки с работающим ботом.

**Architecture:** `bot.js` начинает штамповать `s.lastActive` на каждое действие пользователя и получает общий хелпер `resumeSession()` для «вернуться туда, где остановился» (переиспользуется текстовой командой `/resume` и кнопкой). Отдельный скрипт `bot/remind.js` (по образцу `bot/notify.js`) раз в сутки по cron читает `state.json` **только на чтение** и шлёт напоминания через `api()` из `lib/telegram.js`; счётчик отправленного держит в своём файле `bot/reminders.json`, чтобы не конфликтовать с работающим ботом, который сам перезаписывает `state.json` каждую секунду.

**Tech Stack:** Node.js (только stdlib, без зависимостей), Telegram Bot API напрямую через `https`.

Спека: [`docs/superpowers/specs/2026-08-11-survey-bot-reminders-design.md`](../specs/2026-08-11-survey-bot-reminders-design.md).

## Global Constraints

- Ноль внешних зависимостей — весь `bot/` только на Node.js stdlib, `npm install` не нужен.
- В проекте нет юнит-тестов; самопроверка — `node bot/validate.js`, синтаксис после правки — `node --check <файл>`, форматирование — `npx prettier --write <файл>` (`.prettierrc`: `tabWidth: 4`).
- Тексты бота — без буквы «ё» (как везде в проекте); формулировки в `lib/texts.js` — черновые, автор бота (пользователь) их сам вычитает и поправит перед боевой волной.
- Стиль кода лаконичный: короткие хелперы, секции под `// ── … ──` комментариями — держаться стиля уже существующего `bot.js`/`notify.js`.
- Коммитить каждую задачу отдельным коммитом сразу после проверки, без общих `git add -A`.
- Ничего не деплоить на VPS и не пушить без отдельного явного запроса — этот план только про изменения в рабочей копии репозитория.

---

### Task 1: `bot.js` — метка активности сессии и общий путь «продолжить»

**Files:**
- Modify: `bot/bot.js`

**Interfaces:**
- Produces: `async function resumeSession(chat, s)` — внутренняя функция `bot.js` (не экспортируется), решает по `s.step`, куда вернуть пользователя (`paused`/`checkpoint`/`quiz`/`fix`/`offer`/`done`/иначе).
- Produces: поле `s.lastActive` (число, `Date.now()`) в объекте сессии — читает `bot/remind.js` (Task 2).
- Consumes: уже существующие в `bot.js` `sendCard`, `sendFixCard`, `offerMore`, `clearAux`, `hideCard`, `toast`, `T`, `K`, `saveState`.

**Важно:** сейчас кнопка «▶️ Продолжить» (`callback_data: "resume:"`) обрабатывается только при `s.step === "paused"`; в остальных случаях нажатие молча проглатывается (`answerCallbackQuery` без действия). Это ограничение снимается — после рефакторинга кнопка (в том числе на будущих напоминаниях из Task 2) работает при любом «зависшем» шаге, а не только на паузе. Заодно нажатие кнопки на паузе начинает вызывать `clearAux` и тост `T.welcomeBack`, как уже делает текстовая команда `/resume` — раньше кнопка их пропускала, это мелкое расхождение устраняется как побочный эффект переиспользования одной функции для обоих путей.

- [x] **Step 1: Добавить хелпер `resumeSession`**

Открыть `bot/bot.js`. Найти функцию `next` (заканчивается на строке 371 закрывающей `}`) и следующую за ней секцию:

```js
// ── Роутинг входящих сообщений ──
```

Вставить новую функцию между ними:

```js
// ── Продолжение брошенной сессии ──
// Общий путь для "/resume"/кнопки "Продолжить" (на паузе, на чекпоинте)
// и для напоминаний remind.js — везде ведет туда же, куда обычное
// продолжение с того шага, на котором сессия остановилась
async function resumeSession(chat, s) {
    if (s.step === "paused") {
        if (s.pauseMsg) hideCard(chat, s.pauseMsg);
        clearAux(chat, s);
        s.pauseMsg = null;
        s.step = "quiz";
        saveState();
        await toast(chat, T.welcomeBack);
        return sendCard(chat, s);
    }
    if (s.step === "checkpoint") {
        if (s.cpMsg) hideCard(chat, s.cpMsg);
        clearAux(chat, s);
        s.cpMsg = null;
        s.step = "quiz";
        saveState();
        return sendCard(chat, s);
    }
    if (s.step === "quiz") return sendCard(chat, s);
    if (s.step === "fix" && s.fixTool) return sendFixCard(chat, s, s.fixTool);
    if (s.step === "offer") return offerMore(chat, s);
    if (s.step === "done") return toast(chat, T.nothingToResume, 6000);
    return toast(chat, T.pickButton, 4000);
}
```

- [x] **Step 2: Переиспользовать хелпер в текстовой команде `/resume`**

Найти в `onMessage` блок (текущие строки ~431-454):

```js
    // Продолжить: снять паузу, двинуться с чекпоинта или вернуть карточку
    if (RESUME_WORDS.includes(cmd) && s) {
        if (s.step === "paused") {
            if (s.pauseMsg) hideCard(chat, s.pauseMsg);
            clearAux(chat, s);
            s.pauseMsg = null;
            s.step = "quiz";
            saveState();
            await toast(chat, T.welcomeBack);
            return sendCard(chat, s);
        }
        if (s.step === "checkpoint") {
            if (s.cpMsg) hideCard(chat, s.cpMsg);
            clearAux(chat, s);
            s.cpMsg = null;
            s.step = "quiz";
            saveState();
            return sendCard(chat, s);
        }
        if (s.step === "quiz") return sendCard(chat, s);
        if (s.step === "fix" && s.fixTool)
            return sendFixCard(chat, s, s.fixTool);
        if (s.step === "done") return toast(chat, T.nothingToResume, 6000);
        return toast(chat, T.pickButton, 4000);
    }
```

Заменить на:

```js
    // Продолжить: снять паузу, двинуться с чекпоинта или вернуть карточку
    if (RESUME_WORDS.includes(cmd) && s) return resumeSession(chat, s);
```

- [x] **Step 3: Переиспользовать хелпер в кнопке `resume`**

Найти в `onCallback` блок (текущие строки ~705-711):

```js
    if (kind === "resume" && s.step === "paused") {
        hideCard(chat, q.message.message_id);
        s.pauseMsg = null;
        s.step = "quiz";
        saveState();
        return sendCard(chat, s);
    }
```

Заменить на:

```js
    if (kind === "resume") {
        hideCard(chat, q.message.message_id);
        return resumeSession(chat, s);
    }
```

- [x] **Step 4: Штамповать `lastActive` в `onMessage`**

Найти начало `onMessage`:

```js
async function onMessage(m) {
    const chat = m.chat.id;
    const s = state[chat];
    // Сообщения пользователя тоже убираем — чат держим максимально чистым
    hideCard(chat, m.message_id);
```

Заменить на:

```js
async function onMessage(m) {
    const chat = m.chat.id;
    const s = state[chat];
    // Метка активности — на ней держатся напоминания remind.js
    if (s) {
        s.lastActive = Date.now();
        saveState();
    }
    // Сообщения пользователя тоже убираем — чат держим максимально чистым
    hideCard(chat, m.message_id);
```

- [x] **Step 5: Штамповать `lastActive` в `onCallback`**

Найти начало `onCallback`:

```js
async function onCallback(q) {
    const chat = q.message.chat.id;
    const s = state[chat];
    // Не ждем подтверждение нажатия — экономим круг до сервера на каждом тапе
    api("answerCallbackQuery", { callback_query_id: q.id }).catch(() => {});
```

Заменить на:

```js
async function onCallback(q) {
    const chat = q.message.chat.id;
    const s = state[chat];
    // Метка активности — на ней держатся напоминания remind.js
    if (s) {
        s.lastActive = Date.now();
        saveState();
    }
    // Не ждем подтверждение нажатия — экономим круг до сервера на каждом тапе
    api("answerCallbackQuery", { callback_query_id: q.id }).catch(() => {});
```

- [x] **Step 6: Проверить синтаксис**

Run: `node --check bot/bot.js`
Expected: без вывода (успех).

- [x] **Step 7: Прогнать Prettier**

Run: `npx prettier --write bot/bot.js`

- [x] **Step 8: Повторно проверить синтаксис после форматирования**

Run: `node --check bot/bot.js`
Expected: без вывода.

- [x] **Step 9: Ручная сверка (нет живого токена/процесса для end-to-end прогона в этой задаче)**

Открыть `bot/bot.js` и убедиться:
- `RESUME_WORDS` в `onMessage` и `kind === "resume"` в `onCallback` оба вызывают `resumeSession(chat, s)`, дублирующей логики не осталось;
- `resumeSession` покрывает все шаги, которые понадобятся `remind.js` (Task 2): `paused`, `checkpoint`, `quiz`, `fix`, `offer`;
- `s.lastActive = Date.now()` стоит в начале обеих функций-роутеров и обёрнут в `if (s)`.

Живой прогон на реальном боте — на проде силами пользователя, вне этого плана (см. `bot/RUNBOOK.local.md`).

- [x] **Step 10: Commit**

```bash
git add bot/bot.js
git commit -m "Бот: метка активности сессии + общий путь продолжения (resumeSession)"
```

---

### Task 2: `bot/remind.js` — рассылка напоминаний

**Files:**
- Create: `bot/remind.js`
- Modify: `bot/lib/texts.js`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `s.lastActive`, `s.step`, `s.answered` из объектов сессий в `state.json` (произведено Task 1); `api` из `bot/lib/telegram.js`; `T`, `K` из `bot/lib/texts.js` (`K.resume` уже существует).
- Produces: `T.remindPaused(n)`, `T.remindGhost(n)` — текстовые функции, принимают число отвеченных инструментов, возвращают HTML-строку.
- Produces: файл `bot/reminders.json` формата `{ "<chatId>": { "count": 1|2, "lastSentTs": <мс> } }` — не читается больше никем, кроме самого `remind.js` при следующем запуске.

**Test:** ручной прогон на файле-фикстуре (создаётся во время проверки, не коммитится) — dry-run должен показать ровно ожидаемых кандидатов с ожидаемым текстом; прогон с `--yes` на фиктивном chat_id должен завершиться без падения и не записать в `reminders.json` неудачные попытки.

- [x] **Step 1: Добавить тексты напоминаний**

Открыть `bot/lib/texts.js`. Найти строку:

```js
    erased: "Все стерто 🧹",
```

Добавить сразу после неё (внутри объекта `T`, перед `// Якорное сообщение...`):

```js
    // Напоминания брошенным сессиям (bot/remind.js) — два варианта: тем,
    // кто сам поставил на паузу, и тем, кто просто заглох без нее
    remindPaused: (n) =>
        `Как и обещал — напоминаю про опрос 👋\n\nТы уже ответил на <b>${n}</b> ${plural(n, "инструмент", "инструмента", "инструментов")} и поставил на паузу. Возвращайся, когда будет пара минут:`,
    remindGhost: (n) =>
        `Заметил, что прогресс в опросе завис 👀\n\nТы уже ответил на <b>${n}</b> ${plural(n, "инструмент", "инструмента", "инструментов")} — жалко бросать на середине. Продолжим?`,
```

- [x] **Step 2: Проверить синтаксис**

Run: `node --check bot/lib/texts.js`
Expected: без вывода.

- [x] **Step 3: Создать `bot/remind.js`**

Создать файл `bot/remind.js` со следующим содержимым:

```js
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
    if (!s.lastActive) continue; // сессия старше этого деплоя — наверстает сама
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
```

- [x] **Step 4: Добавить `bot/reminders.json` в `.gitignore`**

Открыть `.gitignore`, найти блок:

```
bot/answers.jsonl
bot/state.json
bot/file-ids.json
```

Заменить на:

```
bot/answers.jsonl
bot/state.json
bot/file-ids.json
bot/reminders.json
```

- [x] **Step 5: Проверить синтаксис и прогнать Prettier**

Run: `node --check bot/remind.js`
Expected: без вывода.

Run: `npx prettier --write bot/lib/texts.js bot/remind.js`

Run: `node --check bot/remind.js && node --check bot/lib/texts.js`
Expected: без вывода на оба вызова.

- [x] **Step 6: Собрать фикстуру `state.json` для проверки**

Создать файл в скретчпаде (не в репозитории), например
`/private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-state.json`, время подставить реальное (`now` = момент проверки в мс, `Date.now()` в консоли Node):

```json
{
  "111": {
    "step": "quiz",
    "answered": ["Git", "GitHub", "1С:EDT"],
    "lastActive": 0,
    "queue": ["Git", "GitHub", "1С:EDT", "SonarQube"],
    "pos": 3
  },
  "222": {
    "step": "paused",
    "answered": ["Git", "GitHub", "1С:EDT", "SonarQube", "Jenkins"],
    "lastActive": 1000000000000
  },
  "333": {
    "step": "done",
    "answered": ["Git"],
    "lastActive": 0
  },
  "444": {
    "step": "quiz",
    "answered": [],
    "lastActive": 0,
    "queue": ["Git"],
    "pos": 0
  },
  "555": {
    "step": "quiz",
    "answered": ["Git"]
  }
}
```

Сессия `111` и `222` — старая активность (кандидаты на напоминание #1); `333` — уже пройден; `444` — не ответил ни на один вопрос; `555` — без `lastActive` (как будто из-до этого деплоя). `lastActive: 0` означает «очень давно» — заведомо больше 3 дней от текущего момента.

- [x] **Step 7: Прогнать dry-run на фикстуре**

Run:
```bash
BOT_TOKEN=test node bot/remind.js --state /private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-state.json --reminders /private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-reminders.json
```

Expected: `Кандидатов: 2`, дальше две строки — `111` с текстом от `T.remindGhost` (не на паузе) и `222` с текстом от `T.remindPaused`, оба содержат «напоминание #1»; `333`, `444`, `555` в списке нет. В конце — «Репетиция — ничего не отправлено».

- [x] **Step 8: Прогнать `--yes` на фикстуре и проверить, что ошибка не портит `reminders.json`**

Run:
```bash
BOT_TOKEN=test node bot/remind.js --state /private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-state.json --reminders /private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-reminders.json --yes
cat /private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-reminders.json
```

Expected: скрипт не падает (токен `test` невалиден — Telegram ответит ошибкой авторизации, попадёт в ветку `failed`, не в `blocked/deactivated`); итоговая строка вида `Отправлено: 0, недоступны (блок/удален): 0, ошибки: 2`; `fixture-reminders.json` пуст (`{}`) — неудачные попытки не засчитываются, кандидаты останутся кандидатами на завтра.

- [x] **Step 9: Удалить фикстуры**

```bash
rm -f /private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-state.json /private/tmp/claude-503/-Users-nikitaaripov-Documents-Landscape1C/04f52642-3f75-47df-bf39-c7b592edb4fd/scratchpad/fixture-reminders.json
```

- [x] **Step 10: Commit**

```bash
git add bot/remind.js bot/lib/texts.js .gitignore
git commit -m "Бот: скрипт напоминаний зависшим сессиям (remind.js)"
```

---

### Task 3: Документация — `bot/README.md`

**Files:**
- Modify: `bot/README.md`

**Interfaces:**
- Consumes: ничего из кода — только описывает Task 1/2 для будущего читателя (в т.ч. будущей сессии Claude без памяти этого разговора).

**Test:** визуальная проверка — раздел читается связно, команды копипастятся без правок.

- [x] **Step 1: Добавить раздел про напоминания**

Открыть `bot/README.md`. Найти конец раздела «Между волнами: заморозка и рассылка» — последний абзац:

```
Шлет с паузой 100 мс (лимит телеграма ~30 сообщений/сек) и с пушем —
в отличие от беззвучных сообщений самого опроса; заблокировавшие бота
просто пропускаются.

## Развертывание (VPS, systemd)
```

Вставить новый раздел между ними:

```
Шлет с паузой 100 мс (лимит телеграма ~30 сообщений/сек) и с пушем —
в отличие от беззвучных сообщений самого опроса; заблокировавшие бота
просто пропускаются.

## Напоминания зависшим сессиям

Кто ответил хотя бы на один вопрос, но давно не возвращается (`quiz`,
`paused`, `checkpoint`, `offer`, `fix` — не `done`), получает до двух
напоминаний с прогрессом и кнопкой «▶️ Продолжить». Первое — через 3 дня
бездействия (`s.lastActive`, штампуется на каждое сообщение/нажатие).
Второе, финальное — в окне за неделю до отсечки волны (`CUTOFF_DATE` в
окружении, например `2026-10-01`; без этой переменной уходит только
первое). Счетчик отправленного — в `bot/reminders.json` (в `.gitignore`,
не в `state.json`: бот перезаписывает `state.json` каждую секунду сам,
писать туда из другого процесса было бы гонкой):

```bash
BOT_TOKEN=<токен> node bot/remind.js                              # репетиция
BOT_TOKEN=<токен> CUTOFF_DATE=2026-10-01 node bot/remind.js --yes # рассылка
```

По cron раз в сутки — вхолостую, если сегодня некому напоминать:

```bash
( crontab -l 2>/dev/null; echo "0 10 * * * cd /opt/landscape1c/bot && BOT_TOKEN=<токен> CUTOFF_DATE=2026-10-01 node remind.js --yes >> /var/log/remind.log 2>&1" ) | crontab -
```

## Развертывание (VPS, systemd)
```

- [x] **Step 2: Добавить `reminders.json` в раздел «Данные»**

Найти в конце файла:

```
- `excluded.json` (коммитится) — универсальные инструменты, о которых не
  спрашиваем: их использовали все, в итогах пойдут как «не применимо».
  Имена сверяются с `data.js` при старте и в `validate.js`.
```

Добавить после этого пункта:

```
- `reminders.json` (в `.gitignore`) — счетчик отправленных напоминаний
  `bot/remind.js`: `{chatId: {count, lastSentTs}}`, максимум `count: 2`.
```

- [x] **Step 3: Уточнить описание `state.json`**

Найти:

```
- `state.json` (в `.gitignore`) — состояние сессий: прогресс, очередь,
  реестр сообщений.
```

Заменить на:

```
- `state.json` (в `.gitignore`) — состояние сессий: прогресс, очередь,
  реестр сообщений, `lastActive` (метка последней активности — на ней
  `bot/remind.js` считает, кому пора напомнить).
```

- [x] **Step 4: Commit**

```bash
git add bot/README.md
git commit -m "Доки: напоминания зависшим сессиям в bot/README.md"
```

---

## После выполнения плана

Живая проверка на проде (перевыпуск токена, `CUTOFF_DATE` в `/etc/stateof1c.env`, включение cron) — часть чек-листа боевого запуска волны, не входит в этот план по коду. Делать вместе с остальными шагами запуска (см. память `landscape-survey-launch-plan` / `bot/RUNBOOK.local.md`).
