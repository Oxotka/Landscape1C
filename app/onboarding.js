// Онбординг главной: роль и контекст при первом визите, другие виды — при следующем.
// Подсвечивает целевой элемент «дыркой» в затемнении и показывает яркий бабл.
// Фильтры применяет кликом по реальным чипам сайдбара — app.js сам обновит URL/доску.
(() => {
    const LEGACY_KEY = "onboarding_done";
    const STAGE_KEY = "onboarding_stage";
    const stage = localStorage.getItem(STAGE_KEY);

    if (localStorage.getItem(LEGACY_KEY) || stage === "done") return;
    // Только десктоп: на мобильном сайдбар скрыт (фильтры открываются попапом)
    if (window.matchMedia("(max-width: 720px)").matches) return;

    const D = window.LANDSCAPE;
    const filters = document.getElementById("filters");
    if (!D || !filters) return;

    const fgroups = [...filters.querySelectorAll(".fgroup")];
    const groupFor = (label) =>
        fgroups.find(
            (g) =>
                g.querySelector(".fgroup__head")?.textContent.trim() === label,
        );

    // Применить значение оси кликом по чипу сайдбара; вернуть состояние «нажат»
    function toggleAxis(axis, value) {
        const g = groupFor(D.axes[axis].label);
        const chip =
            g &&
            [...g.querySelectorAll(".chip")].find(
                (c) => c.textContent.trim() === value,
            );
        if (chip) chip.click();
        return !!(chip && chip.getAttribute("aria-pressed") === "true");
    }

    // ── Жизненный цикл ──
    let tip = null;
    let hole = null; // затемнение с «дыркой» над целью (box-shadow) — яркость ведет фокус
    let place = null;
    let target = null; // подсвечиваемый элемент текущего шага
    let extraOff = []; // снятие слушателей (чипы сайдбара/документ) между шагами
    const clearExtra = () => {
        extraOff.forEach((f) => f());
        extraOff = [];
    };
    let escFn = null; // действие Escape на текущем шаге (= «Пропустить»)
    const prevFocus = document.activeElement; // куда вернуть фокус после завершения
    function placeHole() {
        if (!hole) return;
        const r = target && target.getBoundingClientRect();
        if (r && r.width) {
            const pad = 2;
            hole.style.left = r.left - pad + "px";
            hole.style.top = r.top - pad + "px";
            hole.style.width = r.width + pad * 2 + "px";
            hole.style.height = r.height + pad * 2 + "px";
            hole.classList.add("is-ring");
        } else {
            // нет цели — затемняем всё (дырка нулевая, за экраном)
            hole.style.left = hole.style.top = "-9999px";
            hole.style.width = hole.style.height = "0";
            hole.classList.remove("is-ring");
        }
    }
    const reposition = () => {
        placeHole();
        place && place();
    };
    function cleanup() {
        clearExtra();
        tip?.remove();
        hole?.remove();
        tip = hole = place = target = null;
        removeEventListener("scroll", reposition, true);
        removeEventListener("resize", reposition);
        document.removeEventListener("keydown", onKey, true);
        restoreFocus();
    }
    function finish(nextStage) {
        try {
            localStorage.setItem(STAGE_KEY, nextStage);
        } catch (e) {}
        cleanup();
        document.dispatchEvent(new Event("landscape:onboarding-finished"));
    }
    function show(html, placer, cls) {
        clearExtra(); // снять слушатели прошлого шага
        if (!tip) {
            hole = document.createElement("div");
            hole.className = "onb-hole";
            tip = document.createElement("div");
            // role=dialog без aria-modal: фон под «дыркой» осознанно кликабелен
            // (чипы сайдбара — часть сценария), поэтому диалог не-модальный
            tip.setAttribute("role", "dialog");
            tip.setAttribute("aria-labelledby", "onb-title");
            document.body.append(hole, tip);
            addEventListener("scroll", reposition, true);
            addEventListener("resize", reposition);
            document.addEventListener("keydown", onKey, true);
        }
        tip.className = "onb" + (cls ? " " + cls : ""); // is-left/up/down (+ is-wide)
        tip.innerHTML = html;
        place = placer;
        placeHole();
        place();
        // фокус на первый вариант (или на кнопку «Дальше» на финальном шаге)
        const first =
            tip.querySelector("[data-val]") || tip.querySelector("[data-next]");
        if (first && typeof first.focus === "function")
            first.focus({ preventScroll: true });
    }

    // Подсказка немодальная. Между вариантами и подсвеченными чипами есть
    // короткий путь по Tab; остальные элементы страницы остаются доступны.
    // Escape работает как «Пропустить» только при фокусе внутри подсказки.
    function onKey(e) {
        if (e.key === "Tab" && tip && target) {
            const chips = [...target.querySelectorAll(".chip")];
            const lastChip = chips[chips.length - 1];
            const firstOpt = tip.querySelector("[data-val]");
            if (lastChip && firstOpt) {
                if (e.shiftKey && e.target === firstOpt) {
                    e.preventDefault();
                    lastChip.focus();
                } else if (!e.shiftKey && e.target === lastChip) {
                    e.preventDefault();
                    firstOpt.focus();
                }
            }
            return;
        }
        if (e.key !== "Escape" || !tip?.contains(e.target)) return;
        e.preventDefault();
        e.stopPropagation();
        escFn && escFn();
    }
    // После завершения — фокус туда, где был до онбординга; на первой загрузке
    // (фокус на body) — на первый чип роли: это ближайший к только настроенным
    // отборам интерактивный элемент.
    function restoreFocus() {
        const el =
            prevFocus &&
            prevFocus !== document.body &&
            document.contains?.(prevFocus)
                ? prevFocus
                : chipsOf("role")[0];
        if (el && typeof el.focus === "function")
            el.focus({ preventScroll: true });
    }

    // Низ тултипа: счетчик шага + «Пропустить» + основная кнопка
    const foot = (n, total, btn) =>
        `<div class="onb__foot"><span class="onb__count">${n}/${total}</span>` +
        `<span class="onb__foot-r">` +
        `<button class="onb__skip" data-skip>Пропустить</button>` +
        `<button class="onb__next" data-next>${btn}</button>` +
        `</span></div>`;
    function wireFoot(next, skip = next) {
        escFn = skip; // Escape на шаге = «Пропустить»
        tip.querySelector("[data-skip]").addEventListener("click", skip);
        tip.querySelector("[data-next]").addEventListener("click", next);
    }

    const clampLeft = (x) =>
        Math.max(8, Math.min(x, window.innerWidth - tip.offsetWidth - 8));

    // Тултип справа от сайдбара, по верху подсвеченного блока
    const placeRightOf = (el) => () => {
        const fr = filters.getBoundingClientRect();
        const r = (el || filters).getBoundingClientRect();
        tip.style.right = tip.style.bottom = "";
        tip.style.left = fr.right + 8 + "px";
        tip.style.top = Math.max(8, r.top) + "px";
    };

    const axisButtons = (axis) =>
        D.axes[axis].values
            .map(
                (v) => `<button class="onb__opt" data-val="${v}">${v}</button>`,
            )
            .join("");
    const chipsOf = (axis) => {
        const g = groupFor(D.axes[axis].label);
        return g ? [...g.querySelectorAll(".chip")] : [];
    };

    // Шаг выбора по оси: клик по чипу в бабле — применить и сразу к следующему шагу
    // (по умолчанию одна роль/контекст). Клик по чипу слева — только синхронизируем
    // бабл, шаг не двигаем (там можно выбрать и несколько).
    function optStep(n, axis, next, q, text) {
        const g = groupFor(D.axes[axis].label);
        target = g;
        show(
            `<p class="onb__q" id="onb-title">${q}</p>` +
                `<p class="onb__text">${text}</p>` +
                `<div class="onb__opts">${axisButtons(axis)}</div>${foot(n, 2, n === 2 ? "Готово" : "Дальше →")}`,
            placeRightOf(g),
            "is-left is-wide",
        );
        const opts = [...tip.querySelectorAll("[data-val]")];
        const chips = chipsOf(axis);
        const syncOpts = () =>
            opts.forEach((b, i) =>
                b.setAttribute(
                    "aria-pressed",
                    !!(
                        chips[i] &&
                        chips[i].getAttribute("aria-pressed") === "true"
                    ),
                ),
            );
        opts.forEach((b) =>
            b.addEventListener("click", () => {
                toggleAxis(axis, b.dataset.val);
                next();
            }),
        );
        chips.forEach((c) => {
            c.addEventListener("click", syncOpts);
            extraOff.push(() => c.removeEventListener("click", syncOpts));
        });
        syncOpts(); // отразить уже выбранное (например, из URL)
        wireFoot(next, finishBase);
    }

    const finishBase = () => finish("base");

    // ── Первый визит: роль и контекст ─────────
    function step1() {
        optStep(
            1,
            "role",
            step2,
            "Какая у тебя роль?",
            "Отметь свою роль - на карте останутся инструменты, которые нужны именно тебе",
        );
    }

    // ── Шаг 2: контекст ───────────────────────
    function step2() {
        optStep(
            2,
            "context",
            finishBase,
            "Где работаешь?",
            "Франчайзи, инхаус, продукт или проект - набор инструментов заметно отличается",
        );
    }

    // ── Следующий визит: другие представления ──
    function viewsStep() {
        target = document.querySelector(".foot");
        const t = target;
        show(
            `<p class="onb__q" id="onb-title">Это не единственный вид</p>` +
                `<p class="onb__text">Еще есть «Путь», «Схема» и «Граф»: те же инструменты в другом представлении. Загляни при желании</p>` +
                foot(1, 1, "Понятно!"),
            () => {
                const r = (t || document.body).getBoundingClientRect();
                tip.style.top = tip.style.right = "";
                // привязка к центру подвала
                tip.style.left =
                    clampLeft(r.left + r.width / 2 - tip.offsetWidth / 2) +
                    "px";
                tip.style.bottom =
                    Math.max(8, window.innerHeight - r.top + 14) + "px";
            },
            "is-down",
        );
        wireFoot(() => finish("done"));
    }

    if (stage === "base") viewsStep();
    else step1();
})();
