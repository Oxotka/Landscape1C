# Баннер опроса на главной — Implementation Plan

> **Архив реализации; статус на 05.09.2026.** Баннер реализован и включён (`SURVEY_BANNER_ENABLED = true`); основная волна уже идёт. Ниже сохранён исходный план: его чекбоксы и формулировки описывают ход реализации, а не текущий список задач. Актуальные планы — в [ТЗ](../../TZ.md), §13 и §15.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Показать на главной странице ландшафта тёмную плашку-баннер со ссылками на боты опроса (Telegram, MAX), включаемую одним флагом в день открытия боевой волны сентября 2026.

**Architecture:** Баннер целиком собирается на клиенте функцией `initSurveyBanner()` в `app/app.js` (по образцу того, как `renderFilters()`/`apply()` уже строят DOM из JS) — при выключенном флаге элемент не создаётся вообще, никакой статичной разметки в `index.html` не добавляется. Стили — новый CSS-блок `.survey-banner` в `app/styles.css`, повторяющий уже существующий в проекте паттерн инверсии `background: var(--ink); color: var(--paper)` (см. `.empty__btn:hover`).

**Tech Stack:** Ванильный JS/CSS без сборки (проектная база — `app/` статика), `localStorage` для запоминания закрытия, без зависимостей.

## Global Constraints

- Баннер добавляется **только** на `app/index.html` — граф/схема/путь/методология не трогаем.
- UI только на русском, без эмодзи в тексте (на сайте эмодзи в видимом UI не используются нигде).
- Стиль — Swiss Grid проекта: острые углы (`border-radius` не задаём/0), без теней, кнопки — только рамкой (`border`), как `.empty__btn`.
- `const SURVEY_BANNER_ENABLED` по умолчанию **`false`** — в закоммиченном виде баннер должен быть выключен; включение (`true`) произойдёт отдельным будущим коммитом в день анонса, за рамками этой задачи.
- Ссылки: Telegram — `https://t.me/stateOf1c_bot`, MAX — `https://max.ru/se13951546_bot`, оба `target="_blank" rel="noopener"`.
- Ключ localStorage — `survey_banner_dismissed` (по аналогии с `onboarding_done` в `app/onboarding.js`).
- Форматирование — Prettier (`tabWidth: 4`, см. `.prettierrc`); после правок прогнать `npx prettier --write app/app.js app/styles.css`. `app/data.js` не трогаем.
- После правок CSS/JS обязательно прогнать `node scripts/cachebust.js`, чтобы `?v=` у `styles.css`/`app.js` в `app/*.html` обновились — вручную версии не трогать.
- В этом проекте нет юнит-тестов; проверка — визуально через локальный предпросмотр (`cd app && python3 -m http.server 8123`). Скриншоты для самопроверки не делать — финальную визуальную проверку выполняет пользователь.

---

### Task 1: Баннер опроса — стили и логика показа

**Files:**

- Modify: `app/styles.css` — новый блок правил `.survey-banner*`, вставить перед комментарием `/* ── Кнопка меню (бургер) ─────────────────── */` (сразу после блока `.masthead { ... }`, который сейчас заканчивается закрывающей `}` на строке 91).
- Modify: `app/app.js` — добавить константу флага, функцию `initSurveyBanner()` и её вызов в блоке «Старт».

**Interfaces:**

- Produces: CSS-класс `.survey-banner` с потомками `.survey-banner__text`, `.survey-banner__actions`, `.survey-banner__close`; JS-функция `initSurveyBanner()` (без параметров, без возврата) — создаёт и вставляет баннер в DOM при выполнении условий показа, иначе не делает ничего.
- Consumes: глобальный `document`, `localStorage`; helper `$` уже определён в `app/app.js:26` (`const $ = (sel) => document.querySelector(sel);`) — можно использовать вместо `document.querySelector`, если удобно.

- [ ] **Step 1: Добавить стили баннера в `app/styles.css`**

Открыть `app/styles.css`, найти конец блока `.masthead` (строка 91, одиночная `}`) и следующую за ним пустую строку с комментарием `/* ── Кнопка меню (бургер) ─────────────────── */` (строка 93). Вставить между ними новый блок:

```css
/* ── Баннер опроса (флаг SURVEY_BANNER_ENABLED в app.js) ── */
.survey-banner {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 24px;
    padding: 14px clamp(20px, 4vw, 40px);
    padding-right: 56px;
    background: var(--ink);
    color: var(--paper);
    border-bottom: 2px solid var(--ink);
}
.survey-banner__text {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
}
.survey-banner__actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
.survey-banner__actions a {
    display: inline-block;
    padding: 7px 14px;
    border: 1.5px solid var(--paper);
    color: var(--paper);
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    transition:
        background 0.12s ease,
        color 0.12s ease;
}
.survey-banner__actions a:hover {
    background: var(--paper);
    color: var(--ink);
}
.survey-banner__close {
    position: absolute;
    top: 14px;
    right: clamp(20px, 4vw, 40px);
    background: none;
    border: none;
    color: var(--paper);
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    padding: 0;
}
@media (max-width: 720px) {
    .survey-banner {
        flex-direction: column;
        align-items: flex-start;
    }
}
```

- [ ] **Step 2: Добавить флаг и функцию баннера в `app/app.js`**

Найти в `app/app.js` конец объекта `FIELD` (заканчивается `};` перед комментарием `// Состояние фильтров: для каждой оси — Set выбранных значений`) и вставить между ними:

```js

    // Баннер опроса «Состояние ландшафта 1С 2026» — включаем одним флагом
    // в день анонса боевой волны (см. docs/superpowers/specs/2026-08-22-survey-banner-design.md)
    const SURVEY_BANNER_ENABLED = false;
```

Затем найти в конце файла блок `NAV.dismissOnOutside(...)` (перед комментарием `// ── Старт ─────────────────────────────────`) и вставить между ними функцию:

```js

    // ── Баннер опроса ──────────────────────────
    function initSurveyBanner() {
        if (!SURVEY_BANNER_ENABLED) return;
        const DISMISS_KEY = "survey_banner_dismissed";
        if (localStorage.getItem(DISMISS_KEY)) return;
        const masthead = document.querySelector(".masthead");
        if (!masthead) return;
        const banner = document.createElement("div");
        banner.className = "survey-banner";
        banner.innerHTML = `
      <p class="survey-banner__text">Большой опрос «Состояние ландшафта 1С 2026» — расскажите, какими инструментами пользуетесь</p>
      <div class="survey-banner__actions">
        <a href="https://t.me/stateOf1c_bot" target="_blank" rel="noopener">Ответить в Telegram →</a>
        <a href="https://max.ru/se13951546_bot" target="_blank" rel="noopener">Ответить в MAX →</a>
      </div>
      <button type="button" class="survey-banner__close" aria-label="Закрыть">✕</button>`;
        banner
            .querySelector(".survey-banner__close")
            .addEventListener("click", () => {
                banner.remove();
                localStorage.setItem(DISMISS_KEY, "true");
            });
        masthead.after(banner);
    }
```

- [ ] **Step 3: Вызвать `initSurveyBanner()` при старте страницы**

В блоке «Старт» в конце `app/app.js` (после `apply();`, перед закрывающей `})();`) добавить строку:

```js
    initSurveyBanner();
```

Итоговый порядок блока «Старт» должен быть:

```js
    // ── Старт ─────────────────────────────────
    const numEl = $(".masthead__num");
    if (numEl) numEl.textContent = D.items.length; // живое число инструментов
    renderFilters();
    readUrl();
    syncControls();
    apply();
    initSurveyBanner();
})();
```

- [ ] **Step 4: Локально проверить поведение с включённым флагом (временно, не коммитить)**

Временно поменять в `app/app.js` `SURVEY_BANNER_ENABLED = false;` на `SURVEY_BANNER_ENABLED = true;`. Запустить локальный сервер:

```bash
cd app && python3 -m http.server 8123
```

Открыть `http://127.0.0.1:8123/` в браузере и проверить:
- баннер отрисовался тёмной плашкой сразу под шапкой, до доски карточек;
- текст, обе кнопки-ссылки (с корректными `href` — `https://t.me/stateOf1c_bot` и `https://max.ru/se13951546_bot`, обе открываются в новой вкладке) и крестик на месте;
- клик по крестику убирает баннер, обновление страницы (F5) баннер не возвращает (сработал `localStorage`);
- в devtools → Application → Local Storage появился ключ `survey_banner_dismissed`;
- удалить ключ `survey_banner_dismissed` через devtools, обновить страницу — баннер снова появляется;
- на ширине ≤720px (девтулза мобильной эмуляции) текст и кнопки уходят в столбик, крестик остаётся в правом верхнем углу;
- переключить тему (бургер-меню → тема) — баннер остаётся контрастным и читаемым в обеих темах (светлой и тёмной), поскольку `--ink`/`--paper` инвертируются вместе с темой.

Это визуальная проверка — финальное подтверждение внешнего вида делает пользователь, самостоятельные скриншоты для самопроверки не делать.

Остановить локальный сервер (`Ctrl+C`). Вернуть `SURVEY_BANNER_ENABLED` обратно в `false` — в закоммиченном коде флаг должен остаться выключенным.

- [ ] **Step 5: Прогнать Prettier**

```bash
npx prettier --write app/app.js app/styles.css
```

- [ ] **Step 6: Обновить кэш-бастинг версий ассетов**

```bash
node scripts/cachebust.js
```

Проверить, что версии `?v=` у `styles.css`/`app.js` обновились в затронутых `app/*.html` (`git diff` должен показать изменённые хеши только у этих ассетов).

- [ ] **Step 7: Проверить, что флаг в финальном виде выключен, и закоммитить**

```bash
grep -n "SURVEY_BANNER_ENABLED" app/app.js
```

Убедиться, что вывод — `const SURVEY_BANNER_ENABLED = false;`. Затем:

```bash
git add app/app.js app/styles.css app/index.html app/graph.html app/scheme.html app/path.html app/survey2026.html app/methodology.html app/council.html app/editor.html app/404.html
git commit -m "Баннер опроса на главной (флаг выключен, issue #28)"
```

(Список файлов в `git add` — те, что реально изменил `cachebust.js`; если он тронул не все перечисленные, добавить только реально изменённые — свериться по выводу `git status` перед коммитом.)

---

## Self-Review

**Покрытие спеки:** размещение (баннер собирается JS и вставляется сразу после `.masthead`, что даёт то же визуальное место «между шапкой и доской», что и в спеке) — Step 2/3; флаг `SURVEY_BANNER_ENABLED` и полное отсутствие в DOM при `false` — Step 2 (`if (!SURVEY_BANNER_ENABLED) return;` до всякого `createElement`); закрытие с запоминанием — Step 2 (`localStorage`); текст без эмодзи и точный текст из утверждённой правки — Step 2; ссылки Telegram/MAX — Step 2; стиль (тёмная плашка, обводные кнопки, острые углы, без теней, мобильная раскладка в столбик) — Step 1; только главная страница — нужно было проверить, не подключён ли `app.js` ещё где-то. **Проверено при самопроверке — см. правку ниже.**

**Правка после самопроверки:** `app.js` — общий скрипт **только для главной страницы** (`app/index.html`; граф/схема/путь используют свои `graph.js`/`scheme.js`/`path.js` — см. `CLAUDE.md`: «app.js — главная страница»). Значит `initSurveyBanner()`, вызываемая из `app.js`, физически не может выполниться ни на одной другой странице — `app.js` туда не подключён. Ограничение «только главная» соблюдается автоматически самой структурой проекта, дополнительных проверок не требуется. Оставляю это уточнение в скобках здесь, чтобы будущий исполнитель не тратил время на тот же вопрос.

**Плейсхолдеры:** не найдены — все шаги содержат готовый код и точные команды.

**Согласованность типов/имён:** `SURVEY_BANNER_ENABLED`, `initSurveyBanner`, `survey_banner_dismissed`, классы `.survey-banner*` — используются одинаково во всех шагах Task 1 (единственная задача плана).
