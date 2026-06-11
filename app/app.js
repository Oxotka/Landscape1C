(() => {
    const D = window.LANDSCAPE;
    const AXES = [
        "role",
        "context",
        "maturity",
        "origin",
        "license",
        "availability",
    ];
    // Поля элемента, по которым фильтруем (role/context — массивы)
    const FIELD = {
        role: "roles",
        context: "contexts",
        maturity: "maturity",
        origin: "origin",
        license: "license",
        availability: "availability",
    };

    // Состояние фильтров: для каждой оси — Set выбранных значений
    const state = {};
    AXES.forEach((a) => (state[a] = new Set()));
    let query = "";

    const $ = (sel) => document.querySelector(sel);
    const { wbr, logoMarkup, sortItems } = window.LandscapeUI; // shared.js

    // ── Рендер фильтров ───────────────────────
    function renderFilters() {
        const box = $("#filters");
        box.innerHTML = "";
        AXES.forEach((axis) => {
            const { label, values } = D.axes[axis];
            const group = document.createElement("div");
            group.className =
                "fgroup" +
                (axis === "role" || axis === "context" ? " fgroup--axis" : "");
            group.innerHTML = `<p class="fgroup__head">${label}</p>`;
            const chips = document.createElement("div");
            chips.className = "chips";
            values.forEach((val) => {
                const chip = document.createElement("button");
                chip.className = "chip";
                chip.textContent = val;
                chip.setAttribute("aria-pressed", "false");
                chip.addEventListener("click", () => toggle(axis, val, chip));
                chips.appendChild(chip);
            });
            group.appendChild(chips);
            box.appendChild(group);
        });
        // Кнопка сброса — видна только в мобильном попапе «Отборы» (CSS)
        const r = document.createElement("button");
        r.type = "button";
        r.className = "reset filters__reset";
        r.textContent = "Сбросить ✕";
        r.addEventListener("click", reset);
        box.appendChild(r);
    }

    // ── Стартовые наборы по контексту ─────────
    function toggle(axis, val, el) {
        const set = state[axis];
        if (set.has(val)) set.delete(val);
        else set.add(val);
        el.setAttribute("aria-pressed", set.has(val));
        apply();
    }

    // Привести чипы в соответствие состоянию
    function syncControls() {
        document.querySelectorAll(".chip").forEach((c) => {
            const axis = c
                .closest(".fgroup")
                .querySelector(".fgroup__head").textContent;
            const a = AXES.find((x) => D.axes[x].label === axis);
            c.setAttribute("aria-pressed", state[a].has(c.textContent));
        });
    }

    // ── Фильтрация ────────────────────────────
    // Совпадение по тексту поиска (имя, описание, раздел, метки, «зачем»
    // и скрытые синонимы aliases — русские транслитерации англ. названий и пр.)
    function matchesQuery(item) {
        if (!query) return true;
        const hay = [
            item.name,
            item.description,
            item.category,
            item.subcategory,
            item.why,
            (item.roles || []).join(" "),
            (item.contexts || []).join(" "),
            (item.aliases || []).join(" "),
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
        return hay.includes(query);
    }
    // Совпадение по выбранным отборам (внутри оси — ИЛИ, между осями — И)
    function matchesAxes(item) {
        for (const axis of AXES) {
            const set = state[axis];
            if (!set.size) continue;
            const field = item[FIELD[axis]];
            const ok = Array.isArray(field)
                ? [...set].some((v) => field.includes(v))
                : set.has(field);
            if (!ok) return false;
        }
        return true;
    }
    const matches = (item) => matchesQuery(item) && matchesAxes(item);

    // ── Рендер доски ──────────────────────────
    function apply() {
        const board = $("#board");
        board.innerHTML = "";
        const matched = D.items.filter(matches);
        const axisActive = AXES.some((a) => state[a].size);
        // Поиск с отборами ничего не дал, но без отборов совпадения есть —
        // показываем их и поясняем строкой сверху (отборы при этом не сбрасываем).
        const fallback =
            matched.length === 0 &&
            !!query &&
            axisActive &&
            D.items.some(matchesQuery);
        const visible = fallback ? D.items.filter(matchesQuery) : matched;

        const renderCat = (catName, blockName) => {
            const items = visible
                .filter((i) => i.category === catName)
                .sort(sortItems);
            if (!items.length) return;
            const cat = document.createElement("section");
            cat.className = "cat";
            cat.innerHTML = `<div class="cat__head"><div class="cat__title">${blockName ? `<span class="cat__block">${blockName}</span>` : ""}<h2 class="cat__name">${catName}</h2></div><span class="cat__num">${items.length}</span></div>`;
            const cards = document.createElement("div");
            cards.className = "cards";
            items.forEach((i) => cards.appendChild(card(i)));
            cat.appendChild(cards);
            board.appendChild(cat);
        };

        // Блоки группируют категории; если блоков нет — плоский список (запасной путь)
        if (D.blocks) {
            D.blocks.forEach((block) => {
                const visCats = block.categories.filter((c) =>
                    visible.some((i) => i.category === c),
                );
                if (!visCats.length) return;
                const head = document.createElement("div");
                head.className = "block__head";
                head.innerHTML = `<span class="block__name">${block.name}</span>`;
                board.appendChild(head);
                visCats.forEach((c) => renderCat(c, block.name));
            });
        } else {
            D.categories.forEach(renderCat);
        }

        // Пояснение над доской, когда показываем результаты без отборов
        const note = $("#fallback-note");
        if (note) note.hidden = !fallback;

        const noResults = visible.length === 0;
        $("#empty").hidden = !noResults;
        if (noResults) updateEmptyMail();
        $("#count").textContent =
            `${visible.length} из ${D.items.length} инструментов`;
        const active = axisActive || query;
        $("#reset").hidden = !active;
        // Дубль счётчика/сброса в прилипающей верхней строке — только при активном отборе
        const c2 = $("#count2"),
            r2 = $("#reset2");
        if (c2) {
            c2.textContent = `${visible.length} из ${D.items.length}`;
            c2.hidden = !active;
        }
        if (r2) r2.hidden = !active;
        writeUrl();
        // Высота доски изменилась — пусть фиксированный футер пересчитает «раскрытие»
        dispatchEvent(new Event("scroll"));
    }

    // Письмо «не нашел инструмент» — с подставленными фильтрами
    function updateEmptyMail() {
        const lines = [];
        AXES.forEach((a) => {
            if (state[a].size)
                lines.push(`— ${D.axes[a].label}: ${[...state[a]].join(", ")}`);
        });
        if (query) lines.push(`— Поиск: ${query}`);
        const filters = lines.length
            ? lines.join("\n")
            : "— (фильтры не выбраны)";
        const subject = "Ландшафт технологий 1С: не нашел нужный инструмент";
        const body =
            "Здравствуйте!\n\n" +
            "Я выбрал такие фильтры на «Ландшафте технологий 1С», но ничего не нашлось:\n" +
            filters +
            "\n\n" +
            "А на самом деле я использую:\n— \n\n" +
            "Спасибо!";
        $("#empty-mail").href =
            `mailto:aripovn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    // ── Состояние в URL (шаринг) ──────────────
    function writeUrl() {
        const params = new URLSearchParams();
        AXES.forEach((a) => {
            if (state[a].size) params.set(a, [...state[a]].join(","));
        });
        if (query) params.set("q", query);
        const qs = params.toString();
        history.replaceState(null, "", qs ? "?" + qs : location.pathname);
    }
    function readUrl() {
        const params = new URLSearchParams(location.search);
        AXES.forEach((a) => {
            const raw = params.get(a);
            if (!raw) return;
            const allowed = D.axes[a].values;
            raw.split(",").forEach((v) => {
                if (allowed.includes(v)) state[a].add(v);
            });
        });
        const q = params.get("q");
        if (q) {
            query = q.toLowerCase();
            $("#search").value = q;
        }
    }

    function card(i) {
        const el = document.createElement("button");
        el.className = "card";
        el.dataset.mat = i.maturity;
        el.innerHTML = `
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
      </div>`;
        el.addEventListener("click", () => openDetail(i));
        return el;
    }

    // ── Детальная карточка ────────────────────
    const openDetail = (i) => window.openDetail(i); // модалка вынесена в detail.js

    // ── Сброс / поиск ─────────────────────────
    const reset = () => {
        AXES.forEach((a) => state[a].clear());
        query = "";
        $("#search").value = "";
        $("#search2").value = "";
        syncControls();
        apply();
    };
    $("#reset").addEventListener("click", reset);
    $("#reset2").addEventListener("click", reset);
    $("#search").addEventListener("input", (e) => {
        query = e.target.value.trim().toLowerCase();
        apply();
    });

    // ── Мобильный: «Отборы» в бургере открывают попап с фильтрами ──
    const filtersEl = $("#filters");
    const openFilters = (on) => filtersEl.classList.toggle("is-open", on);
    (function injectBurgerFilters() {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "menu__pa-item";
        btn.textContent = "Отборы";
        btn.addEventListener("click", () => {
            NAV.closeMenu();
            openFilters(true);
        });
        NAV.pageActions([btn]);
    })();
    NAV.dismissOnOutside(
        () => filtersEl.classList.contains("is-open"),
        [filtersEl, ".menu__pa-item"],
        () => openFilters(false),
    );

    // ── Старт ─────────────────────────────────
    const numEl = $(".masthead__num");
    if (numEl) numEl.textContent = D.items.length; // живое число инструментов
    renderFilters();
    readUrl();
    syncControls();
    apply();
})();
