(() => {
    const D = window.LANDSCAPE;
    const $ = (s) => document.querySelector(s);

    // Оси разметки: multi — массив значений, single — одно значение.
    const AXES = [
        { key: "role", field: "roles", multi: true },
        { key: "context", field: "contexts", multi: true },
        { key: "maturity", field: "maturity", multi: false },
        { key: "origin", field: "origin", multi: false },
        { key: "license", field: "license", multi: false },
        { key: "availability", field: "availability", multi: false },
    ];

    // Дата актуализации в формате data.js, например «9 июня 2026». Без буквы «ё».
    const MONTHS = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    const ruDate = (d = new Date()) =>
        `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

    const escH = (s) =>
        String(s ?? "").replace(
            /[&<>]/g,
            (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c],
        );
    const wbr = (s) => escH(s).replace(/([.:/])/g, "$1<wbr>"); // точки переноса в длинных именах
    const escA = (s) =>
        String(s ?? "").replace(
            /[&<>"]/g,
            (c) =>
                ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
        );

    // ── Запись прямо в файл (POST /save → scripts/serve.py пишет app/data.js) ──
    let dirty = false;
    function markDirty() {
        dirty = true;
        const el = $("#saved");
        if (el) {
            el.textContent = "● не сохранено";
            el.classList.add("dirty");
        }
    }
    function markSaved(msg) {
        dirty = false;
        const el = $("#saved");
        if (el) {
            el.textContent =
                msg ||
                "✓ сохранено · " + new Date().toLocaleTimeString("ru-RU");
            el.classList.remove("dirty");
        }
    }
    const save = markDirty; // правки помечают «не сохранено»; запись — по кнопке «Сохранить»

    async function saveFile() {
        D.updated = ruDate(); // правка data.js = новая дата актуализации
        try {
            const res = await fetch("/save", {
                method: "POST",
                body: dataJS(),
            });
            if (!res.ok) throw new Error("HTTP " + res.status);
            markSaved();
            toast("Сохранено в data.js");
            return true;
        } catch (e) {
            toast(
                "Сервер записи недоступен (запустите start.command) — скачиваю копию",
            );
            downloadData();
            return false;
        }
    }

    // Сборка dist прямо из редактора (POST /build → cachebust + validate + dist)
    async function buildDist() {
        const btn = $("#build");
        if (dirty && !(await saveFile())) return; // сначала пишем правки на диск
        btn.disabled = true;
        toast("Собираю dist…");
        try {
            const res = await fetch("/build", { method: "POST" });
            const text = (await res.text()).trim();
            if (!res.ok) throw new Error(text);
            toast(text.split("\n").pop(), 3500); // последняя строка: «dist собран: N файлов»
        } catch (e) {
            toast(
                "Сборка не удалась: " + (e.message || "нужен serve.py"),
                5000,
            );
        } finally {
            btn.disabled = false;
        }
    }
    function downloadData() {
        const blob = new Blob([dataJS()], { type: "text/javascript" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "data.js";
        a.click();
        URL.revokeObjectURL(a.href);
        toast("Скачан data.js");
    }

    // Карточка размечена, если заполнены все обязательные метки.
    const isMarked = (i) =>
        i.maturity &&
        i.origin &&
        i.license &&
        i.availability &&
        i.roles.length &&
        i.contexts.length;

    let query = "";

    // ── Рендер доски ──────────────────────────
    function render() {
        const board = $("#board");
        board.innerHTML = "";
        const visible = D.items.filter((i) => {
            if (!query) return true;
            return (i.name + " " + i.description).toLowerCase().includes(query);
        });

        D.categories.forEach((catName) => {
            const items = visible.filter((i) => i.category === catName);
            if (!items.length) return;
            const cat = document.createElement("section");
            cat.className = "cat";
            cat.innerHTML = `<div class="cat__head"><h2 class="cat__name">${escH(catName)}</h2><span class="cat__num">${items.length}</span></div>`;
            const cards = document.createElement("div");
            cards.className = "cards";
            items.forEach((i) => cards.appendChild(card(i)));
            cat.appendChild(cards);
            board.appendChild(cat);
        });

        $("#empty").hidden = visible.length > 0;
        const marked = D.items.filter(isMarked).length;
        $("#progress").textContent = `Размечено ${marked} из ${D.items.length}`;
    }

    function badge(v, cls = "badge--ghost") {
        return v ? `<span class="badge ${cls}">${escH(v)}</span>` : "";
    }

    function card(i) {
        const el = document.createElement("button");
        el.className = "card";
        el.dataset.mat = i.maturity || "";
        el.dataset.marked = isMarked(i) ? "yes" : "no";
        const labels = [
            badge(i.maturity, "badge--mat"),
            badge(i.origin),
            badge(i.license),
            ...i.roles.map((r) => badge(r)),
            ...i.contexts.map((c) => badge(c)),
        ]
            .filter(Boolean)
            .join("");
        const logo = i.logo
            ? `<span class="card__logo"><img src="logos/${escA(i.logo)}" alt=""></span>`
            : `<span class="card__logo card__logo--ph">1С</span>`;
        el.innerHTML = `
      <div class="card__media">${logo}</div>
      <div class="card__body">
        <div class="card__name">${wbr(i.name)}</div>
        <div class="card__desc">${escH(i.description).slice(0, 120)}</div>
        <div class="card__meta">${labels || '<span class="badge badge--ghost">нет меток</span>'}</div>
        <div class="card__flags">
          ${isMarked(i) ? "" : '<span class="flag flag--todo">не размечено</span>'}
          ${i.umbrella ? '<span class="flag flag--umb">зонтик · раздробить</span>' : ""}
        </div>
      </div>`;
        el.addEventListener("click", () => openEdit(i));
        return el;
    }

    // ── Форма редактирования ──────────────────
    const textRow = (label, field, val) =>
        `<label class="edit__field"><span>${label}</span><input data-field="${field}" value="${escA(val)}"></label>`;
    const areaRow = (label, field, val) =>
        `<label class="edit__field"><span>${label}</span><textarea data-field="${field}" rows="2">${escH(val)}</textarea></label>`;
    const selectRow = (label, field, val, opts) =>
        `<label class="edit__field"><span>${label}</span><select data-field="${field}">${opts
            .map(
                (o) =>
                    `<option value="${escA(o)}"${o === val ? " selected" : ""}>${escH(o)}</option>`,
            )
            .join("")}</select></label>`;

    function openEdit(i) {
        const dlg = $("#edit");
        dlg.innerHTML = `
      <div class="detail__body edit__body">
        <button class="detail__close" aria-label="Закрыть">✕</button>
        <h2 class="edit__title">${escH(i.name) || "Карточка"}</h2>
        <div class="edit__cols">
          <div class="edit__col">
            ${textRow("Название", "name", i.name)}
            <div class="edit__grid2">
              ${selectRow("Категория", "category", i.category, D.categories)}
              ${textRow("Подкатегория", "subcategory", i.subcategory || "")}
            </div>
            <div class="edit__logo">
              ${textRow("Логотип (файл в logos/)", "logo", i.logo || "")}
              <span class="edit__logo-preview" id="logopreview"></span>
            </div>
            <label class="edit__check"><input type="checkbox" id="logoinvert" ${i.logoInvert ? "checked" : ""}> темный логотип — инвертировать в темной теме</label>
            ${areaRow("Описание", "description", i.description)}
            ${areaRow("Зачем нужно", "why", i.why)}
            <label class="edit__field"><span>Синонимы для поиска (через запятую, скрыто от пользователя)</span><textarea id="aliasesinput" rows="2">${escH((i.aliases || []).join(", "))}</textarea></label>
            <div class="edit__grid2">
              ${textRow("Сайт", "homepage", i.homepage || "")}
              ${textRow("Репозиторий", "repo", i.repo || "")}
            </div>
            <div class="edit__row">
              <h3>С чего начать</h3>
              <div id="startbox"></div>
              <button id="startadd" class="lnkbtn">+ ссылка</button>
            </div>
          </div>
          <div class="edit__col">
            <div id="axisbox"></div>
            <div class="edit__row"><h3>Аналоги</h3><div id="analogsbox" class="reledit"></div></div>
            <div class="edit__row"><h3>Зависимости</h3><div id="dependsbox" class="reledit"></div></div>
          </div>
        </div>
        <div class="edit__foot">
          <button id="del" class="lnkbtn lnkbtn--danger">Удалить карточку</button>
          <button id="done" class="btn btn--primary">Готово</button>
        </div>
      </div>`;

        // Текстовые поля → пишем сразу в объект. Пустую строку для homepage/repo/subcategory/logo храним как null.
        dlg.querySelectorAll("[data-field]").forEach((inp) => {
            inp.addEventListener("input", () => {
                const f = inp.dataset.field,
                    v = inp.value;
                i[f] =
                    v === "" &&
                    ["homepage", "repo", "subcategory", "logo"].includes(f)
                        ? null
                        : v;
                if (f === "name")
                    dlg.querySelector(".edit__title").textContent =
                        v || "Карточка";
                if (f === "logo") updateLogoPreview();
                save();
            });
        });

        // Превью логотипа рядом с полем
        function updateLogoPreview() {
            const box = dlg.querySelector("#logopreview");
            box.innerHTML = i.logo
                ? `<img src="logos/${escA(i.logo)}" alt="" onerror="this.replaceWith('?')">`
                : "1С";
        }
        updateLogoPreview();
        dlg.querySelector("#logoinvert").addEventListener("change", (e) => {
            if (e.target.checked) i.logoInvert = true;
            else delete i.logoInvert;
            save();
        });

        // Синонимы для поиска — строка через запятую → массив
        dlg.querySelector("#aliasesinput").addEventListener("input", (e) => {
            i.aliases = e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
            save();
        });

        const ax = dlg.querySelector("#axisbox");
        AXES.forEach((a) => ax.appendChild(axisGroup(a, i)));

        renderRel(i, "analogs");
        renderRel(i, "depends");

        renderStart(i);
        dlg.querySelector("#startadd").addEventListener("click", () => {
            i.start.push({ label: "", url: "" });
            renderStart(i);
            save();
        });

        dlg.querySelector(".detail__close").addEventListener("click", () =>
            dlg.close(),
        );
        dlg.querySelector("#done").addEventListener("click", () => dlg.close());
        dlg.querySelector("#del").addEventListener("click", () => {
            if (confirm(`Удалить «${i.name}»?`)) {
                D.items.forEach((o) => {
                    // чистим ссылки на удаляемую карточку
                    o.analogs = (o.analogs || []).filter((n) => n !== i.name);
                    o.depends = (o.depends || []).filter((n) => n !== i.name);
                });
                D.items.splice(D.items.indexOf(i), 1);
                dlg.close();
            }
        });
        dlg.addEventListener("close", render, { once: true });
        dlg.showModal();
    }

    // Группа чипов по оси. Значения берутся строго из axes.*.values (инвариант).
    function axisGroup(a, i) {
        const meta = D.axes[a.key];
        const wrap = document.createElement("div");
        wrap.className = "edit__row";
        wrap.innerHTML = `<h3>${meta.label}${a.multi ? "" : ' · <span class="req">одно</span>'}</h3>`;
        const chips = document.createElement("div");
        chips.className = "chips";
        meta.values.forEach((v) => {
            const c = document.createElement("button");
            c.className = "chip";
            c.textContent = v;
            c.setAttribute(
                "aria-pressed",
                a.multi ? i[a.field].includes(v) : i[a.field] === v,
            );
            c.addEventListener("click", () => {
                if (a.multi) {
                    const arr = i[a.field],
                        k = arr.indexOf(v);
                    if (k >= 0) arr.splice(k, 1);
                    else arr.push(v);
                    c.setAttribute("aria-pressed", arr.includes(v));
                } else {
                    i[a.field] = i[a.field] === v ? "" : v; // повторный клик снимает выбор
                    chips
                        .querySelectorAll(".chip")
                        .forEach((x) =>
                            x.setAttribute(
                                "aria-pressed",
                                x.textContent === i[a.field],
                            ),
                        );
                }
                save();
            });
            chips.appendChild(c);
        });
        wrap.appendChild(chips);
        return wrap;
    }

    // ── Связи: аналоги — взаимные (с обеих сторон), зависимости — односторонние ──
    function addRel(i, type, name) {
        const t = D.items.find((x) => x.name === name);
        if (!t) return;
        i[type] = i[type] || [];
        if (!i[type].includes(name)) i[type].push(name);
        if (type === "analogs") {
            t[type] = t[type] || [];
            if (!t[type].includes(i.name)) t[type].push(i.name);
        }
        save();
    }
    function removeRel(i, type, name) {
        const t = D.items.find((x) => x.name === name);
        i[type] = (i[type] || []).filter((n) => n !== name);
        if (type === "analogs" && t)
            t[type] = (t[type] || []).filter((n) => n !== i.name);
        save();
    }
    function renderRel(i, type) {
        const sel = type === "analogs" ? "#analogsbox" : "#dependsbox";
        const box = $(sel);
        const cur = (i[type] = i[type] || []);
        const tags = cur
            .map(
                (n) =>
                    `<span class="reltag">${escH(n)}<button data-rem="${escA(n)}" title="Убрать">✕</button></span>`,
            )
            .join("");
        const cand = D.items.filter((t) => t !== i && !cur.includes(t.name));
        const listId = "rellist-" + type;
        const opts = cand
            .map((t) => `<option value="${escA(t.name)}"></option>`)
            .join("");
        box.innerHTML = `<div class="reltags">${tags || '<span class="reltag reltag--empty">нет</span>'}</div>
      <input class="reladd" list="${listId}" placeholder="+ найти и добавить…" autocomplete="off">
      <datalist id="${listId}">${opts}</datalist>`;
        box.querySelectorAll("[data-rem]").forEach((btn) =>
            btn.addEventListener("click", () => {
                removeRel(i, type, btn.dataset.rem);
                renderRel(i, type);
            }),
        );
        const names = new Set(cand.map((t) => t.name));
        const inp = box.querySelector(".reladd");
        inp.addEventListener("input", () => {
            if (names.has(inp.value)) {
                // выбрано существующее имя — добавляем связь
                addRel(i, type, inp.value);
                renderRel(i, type);
                $(sel).querySelector(".reladd").focus(); // фокус на новое поле — можно добавлять дальше
            }
        });
    }

    function renderStart(i) {
        const box = $("#startbox");
        box.innerHTML = "";
        i.start.forEach((s, idx) => {
            const row = document.createElement("div");
            row.className = "startrow";
            row.innerHTML = `
        <input placeholder="подпись" value="${escA(s.label)}">
        <input placeholder="https://…" value="${escA(s.url)}">
        <button class="lnkbtn lnkbtn--danger" title="Удалить">✕</button>`;
            const [labelInp, urlInp] = row.querySelectorAll("input");
            labelInp.addEventListener("input", () => {
                s.label = labelInp.value;
                save();
            });
            urlInp.addEventListener("input", () => {
                s.url = urlInp.value;
                save();
            });
            row.querySelector("button").addEventListener("click", () => {
                i.start.splice(idx, 1);
                renderStart(i);
                save();
            });
            box.appendChild(row);
        });
    }

    // ── Экспорт / импорт ──────────────────────
    function buildData() {
        // umbrella — служебный флаг редактора; пустые analogs/depends не выгружаем.
        const items = D.items.map(({ umbrella, analogs, depends, ...rest }) => {
            const o = { ...rest };
            if (analogs && analogs.length) o.analogs = analogs;
            if (depends && depends.length) o.depends = depends;
            return o;
        });
        return {
            updated: D.updated,
            categories: D.categories,
            blocks: D.blocks,
            axes: D.axes,
            items,
        };
    }
    function dataJS() {
        return (
            "// Данные ландшафта (Вариант B). Сгенерировано редактором разметки (editor.html).\n" +
            "window.LANDSCAPE = " +
            JSON.stringify(buildData(), null, 2) +
            ";\n"
        );
    }

    let toastT;
    function toast(msg, ms = 1800) {
        const t = $("#toast");
        t.textContent = msg;
        t.hidden = false;
        clearTimeout(toastT);
        toastT = setTimeout(() => (t.hidden = true), ms);
    }

    function blankItem() {
        return {
            name: "Новый инструмент",
            added: new Date().toISOString().slice(0, 10), // дата добавления в ландшафт
            category: D.categories[0],
            subcategory: null,
            logo: null,
            description: "",
            why: "",
            homepage: null,
            repo: null,
            start: [],
            maturity: "",
            origin: "",
            license: "",
            availability: "",
            roles: [],
            contexts: [],
            analogs: [],
            depends: [],
            aliases: [],
            umbrella: false,
        };
    }

    // Гарантируем массивы у всех карточек (старые данные могут быть без полей связей)
    function normalize() {
        D.items.forEach((it) => {
            it.start = it.start || [];
            it.roles = it.roles || [];
            it.contexts = it.contexts || [];
            it.analogs = it.analogs || [];
            it.depends = it.depends || [];
            it.aliases = it.aliases || [];
        });
    }

    $("#add").addEventListener("click", () => {
        const it = blankItem();
        D.items.unshift(it);
        save();
        openEdit(it);
    });
    $("#search").addEventListener("input", (e) => {
        query = e.target.value.trim().toLowerCase();
        render();
    });

    $("#save").addEventListener("click", saveFile);
    $("#export").addEventListener("click", downloadData);
    $("#build").addEventListener("click", buildDist);

    // Клик по подложке закрывает форму (правки уже в объекте, ничего не теряется)
    $("#edit").addEventListener("click", (e) => {
        if (e.target.id === "edit") e.target.close();
    });

    // ── Старт ─────────────────────────────────
    normalize();
    render();
})();
