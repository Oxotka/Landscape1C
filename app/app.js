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
    const { wbr, logoMarkup, sortItems, groupBySub, plural } =
        window.LandscapeUI; // shared.js

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
        // Кнопка сброса — видна только в мобильной шторке «Отборы» (CSS)
        const r = document.createElement("button");
        r.type = "button";
        r.className = "reset filters__reset";
        r.textContent = "Сбросить ✕";
        r.addEventListener("click", reset);
        box.appendChild(r);
        // Кнопка-итог шторки: показывает счет и закрывает (текст ставит apply)
        const a = document.createElement("button");
        a.type = "button";
        a.id = "filters-apply";
        a.className = "filters__apply";
        a.textContent = "Показать";
        a.addEventListener("click", () => openFilters(false));
        box.appendChild(a);
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

        // Сетка карточек одной (под)группы — отдельная, чтобы рамки nth-child(3n) считались внутри неё
        const cardsGrid = (items) => {
            const cards = document.createElement("div");
            cards.className = "cards";
            items.forEach((i) => cards.appendChild(card(i)));
            return cards;
        };

        const renderCat = (catName, blockName) => {
            const items = visible
                .filter((i) => i.category === catName)
                .sort(sortItems);
            if (!items.length) return;
            const cat = document.createElement("section");
            cat.className = "cat";
            cat.innerHTML = `<div class="cat__head"><div class="cat__title">${blockName ? `<span class="cat__block">${blockName}</span>` : ""}<h2 class="cat__name">${catName}</h2></div><span class="cat__num">${items.length}</span></div>`;
            const groups = groupBySub(items);
            // Категория без подкатегорий — одна плоская сетка (как раньше)
            if (groups.length === 1 && groups[0].sub === "") {
                cat.appendChild(cardsGrid(items));
            } else {
                groups.forEach(({ sub, items }) => {
                    if (sub) {
                        const head = document.createElement("p");
                        head.className = "subcat__head";
                        head.textContent = sub;
                        cat.appendChild(head);
                    }
                    cat.appendChild(cardsGrid(items));
                });
            }
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
            `${visible.length} из ${D.items.length} ${plural(visible.length, "инструмент", "инструмента", "инструментов")}`;
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
        const fa = $("#filters-apply");
        if (fa)
            fa.textContent = `Показать ${visible.length} из ${D.items.length}`;
        renderActiveChips();
        writeUrl();
        syncSubTops();
        // Высота доски изменилась — пусть фиксированный футер пересчитает «раскрытие»
        dispatchEvent(new Event("scroll"));
    }

    // Сводка активных отборов над доской (видна только на мобильном — CSS):
    // что отфильтровано, не открывая шторку; тап по значению снимает его
    function renderActiveChips() {
        const box = $("#active-chips");
        if (!box) return;
        box.innerHTML = "";
        const entries = [];
        AXES.forEach((a) => state[a].forEach((v) => entries.push([a, v])));
        box.hidden = entries.length === 0;
        entries.forEach(([axis, val]) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "active-chip";
            b.innerHTML = `${val} <span>✕</span>`;
            b.addEventListener("click", () => {
                state[axis].delete(val);
                syncControls();
                apply();
            });
            box.appendChild(b);
        });
    }

    // Липкий подзаголовок подкатегории встает под шапку категории, чья высота
    // плавает (имя в 1-2 строки) — меряем и кладем офсет в --subtop на .cat
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

    // Кнопки «не нашел инструмент»: issue-форма и письмо — с подставленным запросом
    function updateEmptyMail() {
        const issue =
            "https://github.com/Oxotka/Landscape1C/issues/new?template=add-tool.yml" +
            (query
                ? `&title=${encodeURIComponent("Инструмент: " + query)}&name=${encodeURIComponent(query)}`
                : "");
        $("#empty-issue").href = issue;
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

    // ── Состояние в URL (шаринг) + общий стор (перенос между страницами) ──
    function writeUrl() {
        const params = new URLSearchParams();
        AXES.forEach((a) => {
            if (state[a].size) params.set(a, [...state[a]].join(","));
        });
        if (query) params.set("q", query);
        // Открытая карточка живет в том же URL (?tool=…, пишет detail.js) — не затираем
        const tool = new URLSearchParams(location.search).get("tool");
        if (tool) params.set("tool", tool);
        const qs = params.toString();
        history.replaceState(null, "", qs ? "?" + qs : location.pathname);
        // Те же отборы — в общий стор, чтобы унести их в путь/схему/граф
        const snap = { q: query };
        AXES.forEach((a) => (snap[a] = [...state[a]]));
        window.LandscapeFilters.patch(snap);
    }
    // URL (ссылка-шаринг) важнее; без параметров берем перенесенные отборы из стора
    function readUrl() {
        const params = new URLSearchParams(location.search);
        const fromUrl = AXES.some((a) => params.get(a)) || !!params.get("q");
        const store = fromUrl ? null : window.LandscapeFilters.read();
        AXES.forEach((a) => {
            const allowed = D.axes[a].values;
            const raw = fromUrl ? params.get(a) : (store[a] || []).join(",");
            if (!raw) return;
            raw.split(",").forEach((v) => {
                if (allowed.includes(v)) state[a].add(v);
            });
        });
        const q = fromUrl ? params.get("q") : store.q;
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
