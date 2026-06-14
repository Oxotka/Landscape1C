// Онбординг главной: цепочка из 4 тултипов при первом визите.
// Подсвечивает целевой элемент «дыркой» в затемнении и показывает яркий бабл.
// Фильтры применяет кликом по реальным чипам сайдбара — app.js сам обновит URL/доску.
(() => {
    const KEY = "onboarding_done";

    if (localStorage.getItem(KEY)) return;
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
    }
    function finish() {
        try {
            localStorage.setItem(KEY, "true");
        } catch (e) {}
        cleanup();
    }
    function show(html, placer, cls) {
        clearExtra(); // снять слушатели прошлого шага
        if (!tip) {
            hole = document.createElement("div");
            hole.className = "onb-hole";
            tip = document.createElement("div");
            document.body.append(hole, tip);
            addEventListener("scroll", reposition, true);
            addEventListener("resize", reposition);
        }
        tip.className = "onb" + (cls ? " " + cls : ""); // is-left/up/down (+ is-wide)
        tip.innerHTML = html;
        place = placer;
        placeHole();
        place();
    }

    // Низ тултипа: счетчик N/4 + «Пропустить» + основная кнопка
    const foot = (n, btn) =>
        `<div class="onb__foot"><span class="onb__count">${n}/4</span>` +
        `<span class="onb__foot-r">` +
        `<button class="onb__skip" data-skip>Пропустить</button>` +
        `<button class="onb__next" data-next>${btn}</button>` +
        `</span></div>`;
    function wireFoot(next) {
        tip.querySelector("[data-skip]").addEventListener("click", finish);
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
            `<p class="onb__q">${q}</p>` +
                `<p class="onb__text">${text}</p>` +
                `<div class="onb__opts">${axisButtons(axis)}</div>${foot(n, "Дальше →")}`,
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
        wireFoot(next);
    }

    // ── Шаг 1: роль ───────────────────────────
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
            step3,
            "Где работаешь?",
            "Франчайзи, инхаус, продукт или проект - набор инструментов заметно отличается",
        );
    }

    // ── Шаг 3: открыть карточку ────────────────
    function step3() {
        target = document.querySelector("#board .card");
        const t = target;
        show(
            `<p class="onb__q">Открой карточку инструмента</p>` +
                `<p class="onb__text">Кликни по любой карточке - внутри подробное описание, ссылки «с чего начать», аналоги и зависимости инструмента</p>` +
                foot(3, "Дальше →"),
            () => {
                const r = (
                    t || document.getElementById("board")
                ).getBoundingClientRect();
                tip.style.right = tip.style.bottom = "";
                tip.style.left = clampLeft(r.left) + "px";
                tip.style.top = r.bottom + 14 + "px";
            },
            "is-up",
        );
        // Открытие карточки (клик по любой) тоже выполняет шаг
        const onCard = (e) => {
            if (e.target.closest("#board .card")) step4();
        };
        document.addEventListener("click", onCard, true);
        extraOff.push(() =>
            document.removeEventListener("click", onCard, true),
        );
        wireFoot(step4);
    }

    // ── Шаг 4: подвал — другие представления ───
    function step4() {
        target = document.querySelector(".foot");
        const t = target;
        show(
            `<p class="onb__q">Это не единственный вид</p>` +
                `<p class="onb__text">Еще есть «Путь», «Схема» и «Граф»: те же инструменты в другом представлении. Загляни при желании</p>` +
                foot(4, "Понятно!"),
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
        tip.querySelector("[data-skip]").addEventListener("click", finish);
        tip.querySelector("[data-next]").addEventListener("click", finish);
    }

    step1();
})();
