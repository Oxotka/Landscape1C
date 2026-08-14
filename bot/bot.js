// Телеграм-бот опроса популярности инструментов ландшафта (docs/TZ.md, п.13).
// Здесь только машина состояний и роутинг апдейтов, остальное по модулям:
//   lib/telegram.js — транспорт Bot API, кэш file_id, гигиена чата
//   lib/quiz.js     — данные ландшафта, исключения, построение очередей
//   lib/texts.js    — все тексты и кнопки
//   lib/logos.js    — пререндеренные логотипы (готовит bot/render-logos.js)
//   lib/store.js    — журнал ответов, состояние сессий, обезличивание
// Запуск: BOT_TOKEN=<токен от @BotFather> node bot/bot.js
// Шаги сессии: intro → role → level → context → confirm → quiz
// (каждые 10 ответов checkpoint, из него paused) → offer → done;
// fix — исправление ответа по названию (с чекпоинта или финала).
"use strict";
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
const { T, K, CHEERS, ansRow, btnRows } = require("./lib/texts");
const {
    ROLES,
    CONTEXTS,
    LEVELS,
    L,
    EXCLUDED,
    badExcluded,
    TEST_MODE,
    badTestSet,
    byName,
    buildQueue,
    nichePool,
    promoteMainstream,
} = require("./lib/quiz");
const { logoFile } = require("./lib/logos");
const {
    state,
    saveState,
    uid,
    saveAnswer,
    myAnswers,
    eraseAnswers,
} = require("./lib/store");

const WAVE = 2026; // волна сбора; данные публикуются после отсечки
// Идентификатор «эпохи» сбора: штампуется в каждую сессию. Сменился —
// незавершенные сессии прошлой эпохи считаются недействительными и
// сбрасываются в начало (тест → боевая волна, или ручной сброс через env
// EPOCH). Так брошенный посреди теста опрос не «продолжится» в волне
const EPOCH = process.env.EPOCH || (TEST_MODE ? "2026-test" : String(WAVE));
// Сессия из прошлой эпохи недействительна — удаляем, дальше пойдет новый intro
function staleEpoch(chat, s) {
    if (!s || s.epoch === EPOCH) return false;
    delete state[chat];
    saveState();
    return true;
}

// ── Закрытый сбор ──
// env CLOSED=1: волна завершена, бот не опрашивает — на любое действие
// отвечает одной заглушкой «большая волна в сентябре». Сессии и ответы
// не трогаются: по чатам из state.json в новую волну уйдет приглашение
// (bot/notify.js), поэтому новичок здесь тоже получает запись в state
const CLOSED = !!process.env.CLOSED;
// Секретный вход (env UNLOCK_WORD, работает только при CLOSED): написавший
// это слово проходит опрос при закрытом сборе — проверить боевую волну до
// открытия. Повторное слово закрывает обратно. В меню и справке слова нет;
// слово живет в env на сервере, не в коде — репозиторий публичный. Ответы
// проверяющего пишутся в общий журнал — он обнуляется перед волной
const UNLOCK = (process.env.UNLOCK_WORD || "").trim().toLowerCase();
async function closedNotice(chat) {
    let s = state[chat];
    if (!s) {
        // Эпоха заведомо чужая: когда сбор откроется, staleEpoch сбросит
        // такую сессию в свежее интро с первого же сообщения
        s = state[chat] = { step: "closed", epoch: "closed" };
        saveState();
    }
    await anchorUpdate(chat, s, T.anchor.closed);
    // Заглушка в чате одна: старую убираем, свежая всегда внизу
    if (s.closedMsg) hideCard(chat, s.closedMsg);
    const msg = await send(chat, T.closed).catch(() => null);
    s.closedMsg = msg && msg.message_id;
    saveState();
}

// ── Якорь ──
// Несмываемое сообщение вверху чата: пока оно есть, чат не бывает пустым
// (иначе между удалением старой карточки и приходом новой телеграм успевает
// показать кнопку «Старт»). Заодно живой прогресс. Обновляется редактированием
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
    const msg = await send(chat, text).catch(() => null);
    s.anchorMsg = msg && msg.message_id;
    s.anchorText = text;
    saveState();
}
// Обновление якоря без ожидания; ждем только первичное создание,
// чтобы якорь гарантированно встал выше следующего сообщения
const anchorUpdate = (chat, s, text) => {
    const p = ensureAnchor(chat, s, text).catch(() => {});
    return s.anchorMsg ? Promise.resolve() : p;
};

// ── Карточки ──
// s.role — роль респондента (из онбординга, не меняется);
// s.block — чей блок сейчас показываем: роль (ядро = своя, дальше опт-ин)
// или «редкие инструменты» — сводный пул нишевых по пройденным ролям
// Отправка карточки: фото с фолбэком на текст; прошлая неотвеченная
// карточка убирается — повторная отправка не плодит дубли
async function postCard(chat, s, i, text, kb = K.exp) {
    if (s.cardMsg) hideCard(chat, s.cardMsg);
    const logo = logoFile(i);
    const msg = logo
        ? await sendPhoto(chat, logo, text, kb).catch(() =>
              send(chat, text, kb),
          )
        : await send(chat, text, kb);
    s.cardMsg = msg && msg.message_id;
    saveState();
}
async function sendCard(chat, s) {
    if (s.pos >= s.queue.length) return offerMore(chat, s);
    const i = byName(s.queue[s.pos]);
    await anchorUpdate(
        chat,
        s,
        T.anchor.quiz(s.block, s.pos + 1, s.queue.length),
    );
    return postCard(chat, s, i, T.card(i, s.pos, s.queue.length));
}
// Карточка исправления: тот же вопрос, но вне очереди опроса.
// В пометке показываем прошлый ответ — понятно, что именно исправляешь.
// Запоминаем, откуда пришли (финал или чекпоинт), чтобы вернуться туда же
const prevAnswer = (chat, name) => myAnswers(chat).find((r) => r.tool === name);
async function sendFixCard(chat, s, name) {
    if (s.step !== "fix") s.fixReturn = s.step;
    // Длинные чекпоинт и сводку на время исправления убираем — карточка
    // не должна требовать промотки; чекпоинт потом вернется обновленным
    if (s.cpMsg) {
        hideCard(chat, s.cpMsg);
        s.cpMsg = null;
    }
    clearAux(chat, s);
    s.step = "fix";
    s.fixTool = name;
    saveState();
    const i = byName(name);
    return postCard(chat, s, i, T.fixCard(i, prevAnswer(chat, name)), K.fix);
}

// ── Конец блока: предложение продолжить и финал ──
async function offerMore(chat, s) {
    // Блок «редкие инструменты» — не роль, в doneRoles ему не место
    if (ROLES.includes(s.block) && !s.doneRoles.includes(s.block))
        s.doneRoles.push(s.block);
    const rest = ROLES.filter((r) => !s.doneRoles.includes(r));
    const counts = rest
        .map((r) => ({ r, n: buildQueue(r, s.answered).length }))
        .filter((x) => x.n > 0);
    // Первой — добивка редких (оставшиеся нишевые пройденных ролей; без слова
    // «нишевые»: для пользователя это просто инструменты), ниже — чужие роли
    const rows = [];
    const niche = nichePool(s).length;
    if (niche) rows.push([K.nicheBtn(niche)]);
    counts.forEach((x) => rows.push([K.roleBtn(x.r, x.n)]));
    if (!rows.length) return finish(chat, s);
    s.step = "offer";
    saveState();
    await anchorUpdate(chat, s, T.anchor.offer(s.answered.length));
    if (s.offerMsg) hideCard(chat, s.offerMsg);
    const msg = await send(
        chat,
        T.offer(s.answered.length),
        rows.concat([[K.finishBtn]]),
    );
    s.offerMsg = msg && msg.message_id;
    saveState();
}

async function finish(chat, s) {
    s.step = "done";
    saveState();
    await anchorUpdate(chat, s, T.anchor.done(s.answered.length));
    await send(chat, T.finish(s.answered.length, WAVE), K.myAnswers);
}

// ── Итоговый список и исправление ответов ──
// Вспомогательные сообщения (сводка, справка, «какой из них?») живут до
// продолжения опроса: работаем с одним постом — карточка всегда одна на экране
function clearAux(chat, s) {
    for (const f of ["sumMsg", "helpMsg", "pickMsg"]) {
        if (s[f]) {
            hideCard(chat, s[f]);
            s[f] = null;
        }
    }
}
// Поиск по названию и синонимам среди уже отвеченных — для исправления
const searchAnswered = (chat, query) =>
    myAnswers(chat)
        .map((r) => r.tool)
        .filter((n) => {
            const i = byName(n);
            const hay = [n, ...((i && i.aliases) || [])]
                .join(" ")
                .toLowerCase();
            return hay.includes(query);
        });
// Уточнение при неоднозначном названии
async function askWhichOne(chat, s, cand) {
    s.fixList = cand;
    if (s.pickMsg) hideCard(chat, s.pickMsg);
    const msg = await send(
        chat,
        T.whichOne,
        cand.map((n, i) => [{ text: n, callback_data: `fixpick:${i}` }]),
    ).catch(() => null);
    s.pickMsg = msg && msg.message_id;
    saveState();
}

const ANS_ORDER = { работал: 0, слышал: 1, "не знаю": 2 };
const PAGE = 40;
async function sendSummary(chat, page) {
    const rows = myAnswers(chat);
    if (!rows.length) return toast(chat, T.noAnswers);
    rows.sort(
        (a, b) =>
            ANS_ORDER[a.answer] - ANS_ORDER[b.answer] ||
            a.tool.localeCompare(b.tool, "ru"),
    );
    const pages = Math.ceil(rows.length / PAGE);
    const p = Math.min(Math.max(page, 0), pages - 1);
    const lines = rows.slice(p * PAGE, p * PAGE + PAGE).map(ansRow);
    const nav = [];
    if (p > 0) nav.push({ text: "⬅️", callback_data: `sum:${p - 1}` });
    if (p < pages - 1) nav.push({ text: "➡️", callback_data: `sum:${p + 1}` });
    // Листание заменяет прошлую страницу, а не копит их
    const s = state[chat];
    if (s && s.sumMsg) hideCard(chat, s.sumMsg);
    const msg = await send(
        chat,
        T.summary(
            lines,
            p,
            pages,
            rows.length,
            s && s.step === "quiz" && s.queue
                ? { pos: s.pos, total: s.queue.length }
                : null,
        ),
        nav.length ? [nav] : undefined,
    ).catch(() => null);
    if (s) {
        s.sumMsg = msg && msg.message_id;
        saveState();
    }
}
// Исправление записано — возвращаемся, откуда пришли
// (финал, чекпоинт или прямо из опроса)
async function fixDone(chat, s, what) {
    const back = s.fixReturn || "done";
    s.step = back;
    s.fixReturn = null;
    saveState();
    if (back === "quiz") {
        await toast(chat, T.fixed(what));
        return sendCard(chat, s);
    }
    if (back === "checkpoint") {
        // Старый чекпоинт заменяем свежим — сводка уже с исправлением,
        // вдруг нужно поправить что-то еще
        if (s.cpMsg) hideCard(chat, s.cpMsg);
        const msg = await send(
            chat,
            T.fixedAtCheckpoint(what, s.cp),
            K.checkpoint,
        ).catch(() => null);
        s.cpMsg = msg && msg.message_id;
        saveState();
        return;
    }
    return toast(chat, T.fixed(what));
}

// ── Онбординг ──
async function startIntro(chat, keepAnswered) {
    // Якорь и реестр сообщений переживают перезапуск онбординга —
    // иначе старый якорь останется висеть навсегда
    const prev = state[chat] || {};
    const s = (state[chat] = {
        step: "intro",
        epoch: EPOCH,
        answered: keepAnswered || [],
        doneRoles: [],
        anchorMsg: prev.anchorMsg,
        anchorText: prev.anchorText,
        msgs: prev.msgs,
        unlocked: prev.unlocked, // секретный вход переживает «заново»
    });
    saveState();
    await anchorUpdate(chat, s, T.anchor.intro);
    await send(chat, T.intro, K.intro);
}
const askRole = (chat) => send(chat, T.role, btnRows(ROLES, "role"));

// ── Запись ответа и продвижение по очереди ──
function record(s, chat, tool, answer, sentiment) {
    saveAnswer({
        ts: new Date().toISOString(),
        wave: WAVE,
        uid: uid(chat),
        role: s.role,
        level: s.level,
        context: s.context,
        block: s.block,
        tool,
        answer,
        sentiment,
    });
    // При исправлении инструмент уже в answered — не дублируем
    if (!s.answered.includes(tool)) s.answered.push(tool);
    if (s.step === "fix") {
        // Исправление: правим строку в сводке чекпоинта и в текущей
        // десятке (если инструмент там), серию «не знаю» не трогаем
        [s.cp && s.cp.list, s.recent].forEach((list) => {
            const row = list && list.find((r) => r.tool === tool);
            if (row) {
                row.answer = answer;
                row.sentiment = sentiment;
            }
        });
        return;
    }
    // Серия «не знаю» подряд — для адаптивного порядка очереди
    s.streak = answer === "не знаю" ? (s.streak || 0) + 1 : 0;
    // Последняя десятка — для сводки на чекпоинте
    s.recent = s.recent || [];
    s.recent.push({ tool, answer, sentiment });
    if (s.recent.length > 10) s.recent.shift();
}

async function next(chat, s) {
    s.pos++;
    promoteMainstream(s);
    saveState();
    // Чекпоинт каждые 10 ответов: прогресс + поощрялка + продолжить/пауза,
    // следующая карточка не шлется, пока не нажали «Продолжаем»
    if (s.pos % 10 === 0 && s.pos < s.queue.length) {
        const p = s.pos / s.queue.length;
        const tier = CHEERS[p < 0.4 ? 0 : p < 0.75 ? 1 : 2];
        s.cheered = s.cheered || [];
        let pool = tier.filter((c) => !s.cheered.includes(c));
        if (!pool.length) pool = tier; // пул исчерпан — идем по второму кругу
        const cheer = pool[Math.floor(Math.random() * pool.length)];
        s.cheered.push(cheer);
        s.step = "checkpoint";
        // Сводку держим в s.cp — после исправления перерисуем ее заново
        s.cp = { list: s.recent || [], pos: s.pos, total: s.queue.length };
        s.recent = [];
        const msg = await send(
            chat,
            T.checkpoint(s.cp, cheer),
            K.checkpoint,
        ).catch(() => null);
        s.cpMsg = msg && msg.message_id; // уберем, каким бы путем ни ушли
        saveState();
        return;
    }
    await sendCard(chat, s);
}

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

// ── Роутинг входящих сообщений ──
const RESET_WORDS = ["/reset", "сброс", "сбросить", "заново"];
const PROGRESS_WORDS = [
    "/progress",
    "прогресс",
    "мой прогресс",
    "мои ответы",
    "результаты",
];
const HELP_WORDS = ["/help", "помощь", "справка", "хелп", "?"];
const PAUSE_WORDS = ["/pause", "пауза", "стоп", "потом"];
const RESUME_WORDS = ["/resume", "продолжить", "продолжаем", "дальше"];
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
    const cmd = (m.text || "").trim().toLowerCase();
    if (CLOSED && UNLOCK && cmd === UNLOCK) {
        if (s && s.unlocked) {
            s.unlocked = false;
            saveState();
            await toast(chat, T.unlockOff);
            return closedNotice(chat);
        }
        // Чистая проверка: свежий онбординг (старая сессия любой эпохи
        // не нужна), якорь и реестр сообщений startIntro сохранит сам
        await toast(chat, T.unlockOn, 6000);
        await startIntro(chat);
        state[chat].unlocked = true;
        saveState();
        return;
    }
    if (CLOSED && !(s && s.unlocked)) return closedNotice(chat);
    // Сессия прошлой эпохи (сменилась волна) — начинаем заново с интро
    if (staleEpoch(chat, s)) return startIntro(chat);
    // Сброс: стираем ответы и прогресс пользователя (с подтверждением)
    if (RESET_WORDS.includes(cmd) && s) {
        return send(chat, T.resetConfirm, K.reset);
    }
    // Прогресс: сводка ответов в любой момент; посреди опроса
    // текущая карточка переотправляется, чтобы остаться внизу чата
    if (PROGRESS_WORDS.includes(cmd) && s) {
        await sendSummary(chat, 0);
        if (s.step === "quiz") await sendCard(chat, s);
        return;
    }
    // Справка: как устроено, команды, приватность; убирается кнопкой
    // или сама — при продолжении опроса
    if (HELP_WORDS.includes(cmd) && s) {
        if (s.helpMsg) hideCard(chat, s.helpMsg);
        const msg = await send(chat, T.help, K.gotIt).catch(() => null);
        s.helpMsg = msg && msg.message_id;
        saveState();
        if (s.step === "quiz") await sendCard(chat, s);
        return;
    }
    // Продолжить: снять паузу, двинуться с чекпоинта или вернуть карточку
    if (RESUME_WORDS.includes(cmd) && s) return resumeSession(chat, s);
    // Пауза в любой момент опроса (кнопкой она есть только на чекпоинтах)
    if (PAUSE_WORDS.includes(cmd) && s) {
        if (s.step === "paused") return toast(chat, T.alreadyPaused, 5000);
        if (s.step !== "quiz" && s.step !== "checkpoint")
            return toast(chat, T.noPause, 5000);
        if (s.cardMsg) hideCard(chat, s.cardMsg);
        if (s.cpMsg) hideCard(chat, s.cpMsg);
        clearAux(chat, s);
        s.cardMsg = null;
        s.cpMsg = null;
        s.step = "paused";
        const note = await send(chat, T.paused, K.resume).catch(() => null);
        s.pauseMsg = note && note.message_id;
        saveState();
        return;
    }
    if (m.text === "/start" || !s) {
        // Случайный /start из меню посреди опроса не должен молча
        // сбрасывать онбординг — сначала спрашиваем
        if (s && ["quiz", "checkpoint", "paused", "fix"].includes(s.step))
            return send(chat, T.startConfirm, K.startConfirm);
        return startIntro(chat, s && s.answered);
    }
    // Посреди опроса: название уже отвеченного инструмента — исправление,
    // любой другой текст просто возвращает текущую карточку
    if (s.step === "quiz") {
        const cand = cmd ? searchAnswered(chat, cmd) : [];
        if (cand.length === 1) return sendFixCard(chat, s, cand[0]);
        if (cand.length >= 2 && cand.length <= 6)
            return askWhichOne(chat, s, cand);
        await sendCard(chat, s);
    } else if (s.step === "paused") {
        if (s.pauseMsg) hideCard(chat, s.pauseMsg);
        clearAux(chat, s);
        s.pauseMsg = null;
        s.step = "quiz";
        saveState();
        await toast(chat, T.welcomeBack);
        await sendCard(chat, s);
    } else if (
        s.step === "done" ||
        s.step === "fix" ||
        s.step === "checkpoint"
    ) {
        // После финиша и на чекпоинте текст — поиск инструмента для исправления
        if (!cmd) return;
        const cand = searchAnswered(chat, cmd);
        if (!cand.length) return toast(chat, T.notFound, 6000);
        if (cand.length === 1) return sendFixCard(chat, s, cand[0]);
        if (cand.length > 6) return toast(chat, T.tooMany(cand.length), 5000);
        return askWhichOne(chat, s, cand);
    } else {
        // Онбординг и экран продолжения: молчать нельзя — молчание
        // выглядит как «бот завис», подсказываем нажать кнопку
        await toast(chat, T.pickButton, 4000);
    }
}

// ── Роутинг нажатий кнопок ──
async function onCallback(q) {
    const chat = q.message.chat.id;
    const s = state[chat];
    // Метка активности — на ней держатся напоминания remind.js
    if (s) {
        s.lastActive = Date.now();
        saveState();
    }
    // Не ждем подтверждение нажатия — экономим круг до сервера на каждом тапе
    answerCallback(q.id).catch(() => {});
    if (CLOSED && !(s && s.unlocked)) {
        // Кнопки закрытой волны больше не работают — убираем их носителя
        hideCard(chat, q.message.message_id);
        return closedNotice(chat);
    }
    // «Понятно» под справкой — просто убрать сообщение, сессия не нужна
    if (q.data === "hide:") return hideCard(chat, q.message.message_id);
    if (!s) return;
    // Сессия прошлой эпохи (сменилась волна) — сбрасываем и начинаем заново
    if (staleEpoch(chat, s)) return startIntro(chat);
    const [kind, val] = q.data.split(/:(.*)/);

    if (kind === "reset") {
        // Служебные сообщения сброса в чате не задерживаются
        hideCard(chat, q.message.message_id);
        if (val === "no") return;
        eraseAnswers(chat);
        // Вычищаем с экрана все, что бот присылал (реестр s.msgs),
        // с разбежкой по времени — чтобы не упереться в лимиты API
        (s.msgs || []).forEach((id, i) =>
            setTimeout(() => hideCard(chat, id), i * 40),
        );
        const unlocked = s.unlocked; // сброс не запирает секретный вход
        delete state[chat];
        saveState();
        await toast(chat, T.erased);
        await startIntro(chat);
        if (unlocked) {
            state[chat].unlocked = true;
            saveState();
        }
        return;
    }
    if (kind === "go" && s.step === "intro") {
        hideCard(chat, q.message.message_id); // онбординг не захламляет чат
        s.step = "role";
        saveState();
        return askRole(chat);
    }
    if (kind === "role" && s.step === "role") {
        hideCard(chat, q.message.message_id);
        s.role = val;
        s.step = "level";
        saveState();
        return send(chat, T.level, btnRows(LEVELS, "level", 3));
    }
    if (kind === "level" && s.step === "level") {
        hideCard(chat, q.message.message_id);
        s.level = val;
        s.step = "context";
        saveState();
        return send(chat, T.context, btnRows(CONTEXTS, "ctx"));
    }
    if (kind === "ctx" && s.step === "context") {
        hideCard(chat, q.message.message_id);
        s.context = val;
        s.step = "confirm";
        saveState();
        const n = buildQueue(s.role, s.answered).length;
        return send(chat, T.confirm(s, n), K.confirm);
    }
    if (kind === "ok" && s.step === "confirm") {
        hideCard(chat, q.message.message_id);
        s.block = s.role;
        s.queue = buildQueue(s.block, s.answered);
        s.pos = 0;
        s.step = "quiz";
        saveState();
        return sendCard(chat, s);
    }
    if (kind === "redo" && s.step === "confirm") {
        hideCard(chat, q.message.message_id);
        s.step = "role";
        saveState();
        return askRole(chat);
    }
    if (kind === "a" && (s.step === "quiz" || s.step === "fix")) {
        // Нажатие на устаревшей карточке (не текущей) — просто убираем ее,
        // иначе ответ записался бы не тому инструменту
        if (s.cardMsg && q.message.message_id !== s.cardMsg)
            return hideCard(chat, q.message.message_id);
        clearAux(chat, s); // ответили — сводка/справка больше не нужны
        // Висящий сентимент прошлой карточки — дозаписываем без него
        if (s.pending) {
            record(s, chat, s.pending.tool, s.pending.answer, null);
            s.pending = null;
        }
        const isFix = s.step === "fix";
        const tool = isFix ? s.fixTool : s.queue[s.pos];
        if (val === "не знаю") {
            record(s, chat, tool, val, null);
            hideCard(chat, q.message.message_id); // не ждем — следующая карточка уходит сразу
            if (isFix) return fixDone(chat, s, T.fixedUnknown(tool));
            return next(chat, s);
        }
        s.pending = { tool, answer: val, fix: isFix };
        saveState();
        // Второй вопрос дописываем в саму карточку, а не только меняем
        // кнопки — иначе его легко не заметить
        const i = byName(tool);
        const text =
            (isFix
                ? T.fixCard(i, prevAnswer(chat, tool))
                : T.card(i, s.pos, s.queue.length)) + T.sentPrompt(val);
        return editCard(
            chat,
            q.message.message_id,
            text,
            K.sent[val],
            !!q.message.photo,
        ).catch(() => send(chat, T.sentFallback(val), K.sent[val]));
    }
    if (kind === "s" && s.pending) {
        if (s.cardMsg && q.message.message_id !== s.cardMsg)
            return hideCard(chat, q.message.message_id);
        const { tool, answer, fix } = s.pending;
        record(s, chat, tool, answer, val === "-" ? null : val);
        s.pending = null;
        hideCard(chat, q.message.message_id);
        if (fix) return fixDone(chat, s, T.fixedMark(tool));
        return next(chat, s);
    }
    if (kind === "sum") return sendSummary(chat, +val || 0);
    if (kind === "fixcancel" && s.step === "fix") {
        // «Оставить как есть»: выходим из исправления без записи;
        // на чекпоинт возвращаемся с той же сводкой
        hideCard(chat, q.message.message_id);
        const back = s.fixReturn || "done";
        s.step = back;
        s.fixReturn = null;
        s.fixTool = null;
        saveState();
        if (back === "quiz") {
            await toast(chat, T.fixCanceled);
            return sendCard(chat, s);
        }
        if (back === "checkpoint") {
            const msg = await send(
                chat,
                T.checkpointBack(s.cp),
                K.checkpoint,
            ).catch(() => null);
            s.cpMsg = msg && msg.message_id;
            saveState();
            return;
        }
        return toast(chat, T.fixCanceled);
    }
    if (kind === "fixpick" && s.fixList && s.fixList[+val]) {
        hideCard(chat, q.message.message_id); // «Какой из них?» больше не нужен
        const name = s.fixList[+val];
        s.fixList = null;
        s.pickMsg = null;
        return sendFixCard(chat, s, name);
    }
    if (kind === "restart") {
        // Подтверждение /start посреди опроса
        hideCard(chat, q.message.message_id);
        if (val === "new") return startIntro(chat, s.answered);
        // «Продолжить» — возвращаем текущий шаг на экран
        if (s.step === "paused") {
            if (s.pauseMsg) hideCard(chat, s.pauseMsg);
            s.pauseMsg = null;
            s.step = "quiz";
            saveState();
            return sendCard(chat, s);
        }
        if (s.step === "fix" && s.fixTool)
            return sendFixCard(chat, s, s.fixTool);
        if (s.step === "checkpoint") {
            if (s.cpMsg) hideCard(chat, s.cpMsg);
            const msg = await send(
                chat,
                T.checkpointBack(s.cp),
                K.checkpoint,
            ).catch(() => null);
            s.cpMsg = msg && msg.message_id;
            saveState();
            return;
        }
        return sendCard(chat, s);
    }
    if (kind === "resume") {
        hideCard(chat, q.message.message_id);
        return resumeSession(chat, s);
    }
    if (kind === "cont" && s.step === "checkpoint") {
        hideCard(chat, q.message.message_id); // чекпоинт с итогами тоже убираем
        clearAux(chat, s);
        s.cpMsg = null;
        s.step = "quiz";
        saveState();
        return sendCard(chat, s);
    }
    if (kind === "pause" && s.step === "checkpoint") {
        hideCard(chat, q.message.message_id);
        clearAux(chat, s);
        s.cpMsg = null;
        s.step = "paused";
        const note = await send(chat, T.paused, K.resume).catch(() => null);
        s.pauseMsg = note && note.message_id; // удалим при возвращении
        saveState();
        return;
    }
    if (kind === "more" && s.step === "offer") {
        hideCard(chat, q.message.message_id);
        clearAux(chat, s);
        if (val === "-") return finish(chat, s);
        if (val === "~niche") {
            // Отложенные нишевые всех пройденных ролей — свой сводный блок
            // (не роль: пул шире своей роли, якорь и журнал не должны врать)
            s.block = "редкие инструменты";
            s.queue = nichePool(s);
        } else {
            s.block = val;
            s.queue = buildQueue(val, s.answered);
        }
        s.pos = 0;
        s.step = "quiz";
        saveState();
        return sendCard(chat, s);
    }
}

module.exports = { onMessage, onCallback };

// ── Long polling ──
// require.main === module: блок ниже выполняется только при "node bot.js"
// напрямую, не при require("./bot") из тестов или из bot-max.js (иначе
// MAX-процесс тоже запустит telegram-polling тем же токеном)
if (require.main === module)
    (async () => {
        badExcluded().forEach((n) =>
            console.error(`⚠ excluded.json: «${n}» не найден в data.js`),
        );
        if (TEST_MODE)
            badTestSet().forEach((n) =>
                console.error(`⚠ test-set.json: «${n}» не найден в data.js`),
            );
        console.log(
            `Бот запущен. Волна ${WAVE} (эпоха ${EPOCH}). Инструментов: ${L.items.length}, исключено из опроса: ${EXCLUDED.length}.` +
                (TEST_MODE
                    ? " ⚠ ТЕСТОВЫЙ РЕЖИМ: фиксированный набор из test-set.json."
                    : "") +
                (CLOSED
                    ? " 🔒 СБОР ЗАКРЫТ: бот отвечает заглушкой." +
                      (UNLOCK ? " Секретный вход включен." : "")
                    : ""),
        );
        // Меню команд + кнопка «Меню» у поля ввода — чтобы команды были
        // находимы без подсказок (детали — в lib/telegram.js)
        setupCommands().catch((e) =>
            console.error("setupCommands:", e.message),
        );
        // Чаты обрабатываются параллельно, внутри чата — строго по очереди
        // (цепочка промисов на чат): медленный чат не тормозит остальных,
        // а два быстрых тапа одного пользователя не гоняются друг с другом
        const chains = new Map();
        const dispatch = (chat, fn) => {
            const tail = (chains.get(chat) || Promise.resolve())
                .then(fn)
                .catch(console.error);
            chains.set(chat, tail);
            tail.finally(() => {
                if (chains.get(chat) === tail) chains.delete(chat);
            });
        };
        let offset = 0;
        for (;;) {
            try {
                const updates = await api("getUpdates", {
                    offset,
                    timeout: 50,
                });
                for (const u of updates) {
                    offset = u.update_id + 1;
                    if (u.message)
                        dispatch(u.message.chat.id, () => onMessage(u.message));
                    if (u.callback_query && u.callback_query.message)
                        dispatch(u.callback_query.message.chat.id, () =>
                            onCallback(u.callback_query),
                        );
                }
            } catch (e) {
                console.error("poll:", e.message);
                await new Promise((r) => setTimeout(r, 3000));
            }
        }
    })();
