// Страница «Путь»: маршрут освоения инструментов для роли — от базы к
// специализации. Ступени — шкала зрелости (базовое → продвинутое → нишевое),
// внутри ступени группировка по блокам ландшафта. Отметки «знаю» хранятся
// в localStorage (общие для всех ролей), роль — в URL (?role=…).
(function () {
    "use strict";

    const D = window.LANDSCAPE;
    const $ = (s) => document.querySelector(s);
    const { wbr, logoMarkup, sortItems } = window.LandscapeUI;

    const ROLES = D.axes.role.values;
    const DEFAULT_ROLE = "тестировщик";
    const STAGES = [
        {
            mat: "базовое",
            name: "База",
            desc: "Основа профессии — это знает каждый. Незнакомое здесь — первый кандидат на изучение",
        },
        {
            mat: "продвинутое",
            name: "Мейнстрим",
            desc: "Профессиональный мейнстрим: инструменты, которые отличают уверенного специалиста",
        },
        {
            mat: "нишевое",
            name: "Специализация",
            desc: "Нишевые инструменты под конкретные задачи — выбирайте по своей траектории",
        },
    ];

    // ── Отметки «знаю» (localStorage, по именам карточек) ──
    const KEY = "pathKnown";
    let known;
    try {
        known = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch (e) {
        known = new Set();
    }
    const saveKnown = () => {
        try {
            localStorage.setItem(KEY, JSON.stringify([...known]));
        } catch (e) {}
    };

    // ── Роль в URL — ссылкой можно делиться; ?tool= не затираем (detail.js) ──
    let role = new URLSearchParams(location.search).get("role") || DEFAULT_ROLE;
    if (ROLES.indexOf(role) === -1) role = DEFAULT_ROLE;
    function writeUrl() {
        const p = new URLSearchParams(location.search);
        p.set("role", role);
        history.replaceState(null, "", "?" + p.toString());
    }

    const roleItems = () =>
        D.items.filter((i) => (i.roles || []).includes(role));

    // ── Слоты: аналоги внутри ступени — один пункт «на выбор» ──
    // Знаешь GitLab CI — GitHub Actions осваивать не обязательно. Компоненты
    // связности по analogs в пределах ступени; слот закрыт, если знаешь любой.
    // Через ступени не объединяем: EDT — следующий шаг после Конфигуратора,
    // а не его замена в маршруте.
    function slotsOf(stage) {
        const inStage = new Map(stage.map((i) => [i.name, i]));
        const seen = new Set();
        const slots = [];
        stage.forEach((i) => {
            if (seen.has(i.name)) return;
            const comp = [];
            const queue = [i.name];
            seen.add(i.name);
            while (queue.length) {
                const it = inStage.get(queue.shift());
                comp.push(it);
                (it.analogs || []).forEach((n) => {
                    if (inStage.has(n) && !seen.has(n)) {
                        seen.add(n);
                        queue.push(n);
                    }
                });
            }
            comp.sort(sortItems);
            slots.push(comp);
        });
        return slots;
    }
    const slotKnown = (comp) => comp.some((i) => known.has(i.name));

    // ── Рендер ────────────────────────────────
    function renderTabs() {
        const box = $("#path-tabs");
        box.innerHTML = "";
        ROLES.forEach((r) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "path-tab";
            b.textContent = r;
            b.setAttribute("aria-pressed", r === role);
            b.addEventListener("click", () => {
                role = r;
                writeUrl();
                render();
            });
            box.appendChild(b);
        });
    }

    // Карточка — как на главной (те же классы .card/.cards), плюс чекбокс
    // «знаю» в углу; клик по любому месту карточки открывает модалку
    function card(i) {
        const isKnown = known.has(i.name);
        return `
      <div class="card path-card${isKnown ? " is-known" : ""}" data-mat="${i.maturity}" data-i="${D.items.indexOf(i)}" role="button" tabindex="0">
        <label class="path-check" title="Знаю этот инструмент">
          <input type="checkbox" data-name="${i.name.replace(/"/g, "&quot;")}" ${isKnown ? "checked" : ""}>
          <span class="path-check__box"></span>
        </label>
        <div class="card__media">${logoMarkup(i, "card__logo")}</div>
        <div class="card__body">
          <div class="card__name">${wbr(i.name)}</div>
          <div class="card__desc">${i.description}</div>
          <div class="card__meta">
            <span class="badge badge--mat">${i.maturity}</span>
            <span class="badge badge--ghost">${i.origin}</span>
            <span class="badge badge--ghost">${i.license}</span>
            ${i.availability === "ограничен" ? `<span class="badge badge--ghost">ограничен</span>` : ""}
          </div>
        </div>
      </div>`;
    }

    // Блок ступени: липкий подзаголовок (.subcat__head, как на главной),
    // одиночные слоты сливаются в общую сетку, группа аналогов — своя сетка
    // под строкой «На выбор». Отдельные сетки нужны и для рамок nth-child(3n).
    const blockHtml = (g) => {
        let html = `<p class="subcat__head">${g.name}</p>`;
        let singles = [];
        const flush = () => {
            if (!singles.length) return;
            html += `<div class="cards">${singles.join("")}</div>`;
            singles = [];
        };
        g.slots.forEach((comp) => {
            if (comp.length === 1) {
                singles.push(card(comp[0]));
            } else {
                flush();
                // Группа аналогов — в общей «скобке» (левая линейка на всю группу)
                html += `<div class="path-choicegrp${slotKnown(comp) ? " is-done" : ""}">
                    <p class="path-choice">На выбор</p>
                    <div class="cards">${comp.map(card).join("")}</div>
                </div>`;
            }
        });
        flush();
        return html;
    };

    function render() {
        const items = roleItems();
        let total = 0;
        let done = 0;

        const box = $("#path-stages");
        box.innerHTML = STAGES.map((st) => {
            const stage = items
                .filter((i) => i.maturity === st.mat)
                .sort(sortItems);
            if (!stage.length) return "";
            const slots = slotsOf(stage);
            const stDone = slots.filter(slotKnown).length;
            total += slots.length;
            done += stDone;
            // Группы — по блокам ландшафта, в их порядке; слот живет в блоке
            // своей первой карточки (аналоги почти всегда из одной категории)
            const groups = D.blocks
                .map((b) => ({
                    name: b.name,
                    slots: slots.filter((c) =>
                        b.categories.includes(c[0].category),
                    ),
                }))
                .filter((g) => g.slots.length);
            return `
      <section class="cat">
        <div class="cat__head">
          <div class="cat__title">
            <span class="cat__block">${st.mat}</span>
            <h2 class="cat__name">${st.name}</h2>
          </div>
          <span class="cat__num">${stDone} из ${slots.length}</span>
        </div>
        <p class="path-stage__desc">${st.desc}</p>
        ${groups.map(blockHtml).join("")}
      </section>`;
        }).join("");

        $("#path-done").textContent = `${done} из ${total}`;
        const fill = total ? (100 * done) / total + "%" : "0";
        $("#path-fill").style.width = fill;
        // Дубль прогресса в прилепленной шапке
        $("#path-fill2").style.width = fill;
        $("#path-done2").textContent = `${done} из ${total}`;
        $("#path-reset").hidden = known.size === 0;

        renderTabs();
        syncSubTops();
    }

    // Липкие подзаголовки блоков — тот же прием, что на главной (app.js):
    // высота шапки ступени плавает, офсет меряем и кладем в --subtop на .cat
    function syncSubTops() {
        document.querySelectorAll(".cat").forEach((cat) => {
            if (!cat.querySelector(".subcat__head")) return;
            const h = cat.querySelector(".cat__head").offsetHeight;
            cat.style.setProperty("--subtop", 52 + h + "px");
        });
    }
    let subTopsTimer;
    addEventListener("resize", () => {
        clearTimeout(subTopsTimer);
        subTopsTimer = setTimeout(syncSubTops, 150);
    });

    // ── События (делегирование: список перерисовывается целиком) ──
    $("#path-stages").addEventListener("change", (e) => {
        const cb = e.target.closest("input[type=checkbox]");
        if (!cb) return;
        if (cb.checked) known.add(cb.dataset.name);
        else known.delete(cb.dataset.name);
        saveKnown();
        render();
    });
    $("#path-stages").addEventListener("click", (e) => {
        if (e.target.closest(".path-check")) return; // чекбокс — не модалка
        const c = e.target.closest(".path-card");
        if (c) window.openDetail(D.items[+c.dataset.i]);
    });
    $("#path-stages").addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const c = e.target.closest(".path-card");
        if (!c || e.target.closest(".path-check")) return;
        e.preventDefault();
        window.openDetail(D.items[+c.dataset.i]);
    });

    // Сбросить все отметки (для всех ролей — отметки общие)
    $("#path-reset").addEventListener("click", () => {
        if (!confirm("Снять все отметки «знаю»?")) return;
        known = new Set();
        saveKnown();
        render();
    });

    writeUrl();
    render();
})();
