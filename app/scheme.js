// Страница «Схема»: статичный постер ландшафта в одном инлайн-SVG.
// Блоки идут сверху вниз, внутри — категории и чипы инструментов.
// Тогглы фильтруют по роли; кнопки экспортируют SVG/PNG (самодостаточные —
// логотипы заранее инлайнятся data-URI, цвета берутся из темы).
(function () {
    "use strict";

    const D = window.LANDSCAPE;
    const wrap = document.getElementById("scheme-wrap");
    const togglesBox = document.getElementById("scheme-toggles");
    const ROLES = D.axes.role.values;

    // Сортировка карточек внутри категории — общая с главной (shared.js)
    const sortItems = window.LandscapeUI.sortItems;

    // ── Состояние ─────────────────────────────
    // Пусто = без ограничения по оси (как в графе). Между осями — И, внутри оси — ИЛИ.
    const selRole = new Set();
    const selMat = new Set();
    // Перенесенные с других страниц отборы (общий стор shared.js)
    (function hydrate() {
        const f = window.LandscapeFilters.read();
        f.role.forEach((r) => ROLES.includes(r) && selRole.add(r));
        f.maturity.forEach(
            (m) => D.axes.maturity.values.includes(m) && selMat.add(m),
        );
    })();
    const hiddenBlocks = new Set(); // блоки, скрытые из схемы (чекбоксы «Блоки»)
    const logoCache = {}; // file -> dataURI | null
    let qrCode = null; // инлайн-QR для шапки постера (грузится с логотипами)
    let landscape = true; // ориентация постера: ландшафт / портрет
    let placed = []; // позиции блоков последнего рендера (для перетаскивания)
    let placedCats = []; // позиции колонок-категорий последнего рендера
    let placedBands = []; // зазоры между полками (слоты «новая полка»)
    let lastShelves = []; // текущее разбиение по полкам (имена блоков)
    // Ручная раскладка полок ландшафта (перетаскивание блоков): массив полок
    // с именами блоков; null — автоподбор. Портрет всегда стопкой. localStorage
    let shelvesMan = null;
    try {
        const saved = JSON.parse(localStorage.getItem("schemeShelves"));
        if (Array.isArray(saved)) shelvesMan = saved;
        else if (saved && Array.isArray(saved.land)) shelvesMan = saved.land;
    } catch (e) {}
    const saveShelves = () =>
        localStorage.setItem("schemeShelves", JSON.stringify(shelvesMan));
    let catOrder = {}; // имя блока -> порядок его категорий
    try {
        const saved = JSON.parse(localStorage.getItem("schemeCatOrder"));
        if (saved && typeof saved === "object" && !Array.isArray(saved))
            catOrder = saved;
    } catch (e) {}
    const saveCatOrder = () =>
        localStorage.setItem("schemeCatOrder", JSON.stringify(catOrder));
    let svgW = 0,
        svgH = 0;
    let logosReady = false; // логотипы догрузились; до этого на их местах — плейсхолдеры

    // «Выбраны все значения оси» = всё равно что ничего не выбрано (ось не активна)
    const roleActive = () => selRole.size > 0 && selRole.size < ROLES.length;
    const matActive = () =>
        selMat.size > 0 && selMat.size < D.axes.maturity.values.length;

    // Текущее дерево с учётом всех отборов: [{block, cats:[{cat, items}]}]
    const itemVisible = (it) =>
        (!roleActive() || (it.roles && it.roles.some((r) => selRole.has(r)))) &&
        (!matActive() || selMat.has(it.maturity));
    function currentTree() {
        const tree = [];
        D.blocks.forEach((block) => {
            if (hiddenBlocks.has(block.name)) return;
            // Порядок категорий: сохраненный пользователем, новые — в конец
            let names = block.categories;
            const savedCats = catOrder[block.name];
            if (Array.isArray(savedCats)) {
                const valid = savedCats.filter((c) => names.includes(c));
                names = valid.concat(names.filter((c) => !valid.includes(c)));
            }
            const cats = names
                .map((cat) => ({
                    cat,
                    items: D.items
                        .filter((it) => it.category === cat && itemVisible(it))
                        .sort(sortItems),
                }))
                .filter((c) => c.items.length);
            if (cats.length) tree.push({ block, cats });
        });
        return tree;
    }
    // Карточки колонки, сгруппированные по подкатегории (общий хелпер): порядок
    // групп — по первому вхождению, карточки без подкатегории — первыми (сверху,
    // без подзаголовка). Категории целиком без подкатегорий рисуются как раньше.
    const groupBySub = window.LandscapeUI.groupBySub;

    // ── Хелперы ───────────────────────────────
    const esc = (s) =>
        String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");

    // Склонение по числу: 1 инструмент, 2 инструмента, 5 инструментов
    const plural = (n, one, few, many) => {
        const d10 = n % 10,
            d100 = n % 100;
        if (d100 >= 11 && d100 <= 14) return many;
        if (d10 === 1) return one;
        if (d10 >= 2 && d10 <= 4) return few;
        return many;
    };
    // Подзаголовок постера: текущий отбор + число показанных инструментов.
    // Без отбора — «N инструментов в M разделах»; с отбором — перечисление осей.
    function posterCaption(tree) {
        const count = tree.reduce(
            (s, b) => s + b.cats.reduce((c, x) => c + x.items.length, 0),
            0,
        );
        const tools =
            count +
            " " +
            plural(count, "инструмент", "инструмента", "инструментов");
        if (!roleActive() && !matActive()) {
            const n = tree.length;
            return tools + " в " + n + (n === 1 ? " разделе" : " разделах");
        }
        const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        const parts = [];
        if (roleActive()) parts.push([...selRole].map(cap).join(", "));
        if (matActive()) parts.push([...selMat].map(cap).join(", "));
        return parts.join(" · ") + " · " + tools;
    }

    const measureCanvas = document.createElement("canvas").getContext("2d");
    function measure(text, weight, size) {
        measureCanvas.font = weight + " " + size + "px Inter, sans-serif";
        return measureCanvas.measureText(text).width;
    }
    function truncate(text, maxW, weight, size) {
        if (measure(text, weight, size) <= maxW) return text;
        let s = text;
        while (s.length > 1 && measure(s + "…", weight, size) > maxW)
            s = s.slice(0, -1);
        return s + "…";
    }
    const cssVar = (name) =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();

    // Перенос строки по словам в заданную ширину (макс. maxLines, последняя — с «…»).
    // Внутри слова переносим после . : / - («1С:Предприятие.Элемент»,
    // «Специалист-Консультант») — как wbr на главной (shared.js)
    function wrapText(text, maxW, weight, size, maxLines) {
        const units = [];
        text.split(/\s+/).forEach((word, wi) => {
            const parts = word.match(/[^.:/-]*[.:/-]+|[^.:/-]+/g) || [word];
            parts.forEach((p, pi) =>
                units.push({ t: p, sp: pi === 0 && wi > 0 }),
            );
        });
        const lines = [];
        let cur = "";
        let used = 0;
        for (let k = 0; k < units.length; k++) {
            const u = units[k];
            const test = cur ? cur + (u.sp ? " " : "") + u.t : u.t;
            if (measure(test, weight, size) <= maxW || !cur) {
                cur = test;
                used = k + 1;
            } else {
                lines.push(cur);
                cur = u.t;
                used = k + 1;
                if (lines.length === maxLines - 1) break;
            }
        }
        if (lines.length < maxLines && cur) {
            lines.push(cur);
        } else if (used < units.length) {
            // остались непоместившиеся куски — добиваем «…» в последнюю строку
            cur = (cur ? cur + " " : "") + "…";
            lines[lines.length] = cur;
        }
        // подрезаем строки, что всё равно шире колонки (длинные одиночные слова)
        return lines
            .slice(0, maxLines)
            .map((l) =>
                measure(l, weight, size) > maxW
                    ? truncate(l, maxW, weight, size)
                    : l,
            );
    }
    const chunk = (arr, n) => {
        const r = [];
        for (let i = 0; i < arr.length; i += n) r.push(arr.slice(i, i + n));
        return r;
    };

    // ── Предзагрузка логотипов ────────────────
    // SVG встраиваем инлайн (как вложенный <svg> — чтобы открывался в Illustrator),
    // растровые — data-URI в <image>. Возвращает {type:"svg",viewBox,inner} | {type:"img",uri} | null
    function processSVG(text, prefix) {
        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        const root = doc.querySelector("svg");
        if (!root || doc.querySelector("parsererror")) return null;
        let vb = root.getAttribute("viewBox");
        if (!vb) {
            const w = parseFloat(root.getAttribute("width")) || 24;
            const h = parseFloat(root.getAttribute("height")) || 24;
            vb = `0 0 ${w} ${h}`;
        }
        // Чистим редакторский мусор (Inkscape/Affinity/RDF-метаданные): служебные
        // узлы и атрибуты с чужими namespace-префиксами. При инлайне логотипа в общий
        // постер объявления xmlns с его корня теряются, а необъявленный префикс
        // (inkscape:, sodipodi:, serif:, rdf:…) делает итоговый SVG невалидным XML —
        // из-за этого падал экспорт в PNG/PDF и файл не открывался в Illustrator.
        root.querySelectorAll("*").forEach((el) => {
            const local = el.localName.toLowerCase();
            if (
                local === "metadata" ||
                local === "namedview" ||
                (el.prefix && el.prefix !== "svg" && el.prefix !== "xlink")
            ) {
                el.remove();
                return;
            }
            Array.from(el.attributes).forEach((a) => {
                const p = a.name.includes(":") ? a.name.split(":")[0] : "";
                if (p && p !== "xml" && p !== "xlink" && p !== "xmlns")
                    el.removeAttribute(a.name);
            });
        });
        // Префиксуем id и ссылки на них, чтобы defs разных логотипов не конфликтовали
        root.querySelectorAll("[id]").forEach((el) => {
            el.id = prefix + el.id;
        });
        root.querySelectorAll("*").forEach((el) => {
            Array.from(el.attributes).forEach((a) => {
                let v = a.value;
                if (v.indexOf("url(#") !== -1)
                    v = v.replace(
                        /url\(#([^)]+)\)/g,
                        (m, id) => `url(#${prefix}${id})`,
                    );
                if (
                    (a.name === "href" || a.name.endsWith(":href")) &&
                    v.charAt(0) === "#"
                )
                    v = "#" + prefix + v.slice(1);
                if (v !== a.value) el.setAttribute(a.name, v);
            });
        });
        const ser = new XMLSerializer();
        let raw = "";
        root.childNodes.forEach((n) => (raw += ser.serializeToString(n)));
        // Презентационные атрибуты корня (fill="…" у simpleicons, style, class)
        // переносим на обертку <g> — вложенный <svg> их теряет, и иконка чернеет
        const structural = new Set([
            "viewBox",
            "width",
            "height",
            "preserveAspectRatio",
            "version",
            "baseProfile",
            "role",
            "id",
            "x",
            "y",
        ]);
        let rootAttrs = "";
        Array.from(root.attributes).forEach((a) => {
            // Атрибут с чужим namespace-префиксом (inkscape:version,
            // sodipodi:docname, serif:id…) — корень логотипа в чистку
            // querySelectorAll("*") не попадает, а эти атрибуты копируются на
            // обертку <g>: без объявления xmlns они ломают XML. Пропускаем.
            const ns = a.name.includes(":") ? a.name.split(":")[0] : "";
            if (ns && ns !== "xlink") return;
            if (structural.has(a.name) || /^(xmlns|aria-|data-)/.test(a.name))
                return;
            const v = a.value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
            rootAttrs += ` ${a.name}="${v}"`;
        });
        // Обрезаем по viewBox, как браузер при <img> (часть логотипов рисует
        // надпись за границами viewBox — напр. gitflic.svg)
        const [vx, vy, vw, vh] = vb.split(/[\s,]+/).map(Number);
        const clipId = prefix + "clip";
        const inner =
            `<clipPath id="${clipId}"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}"/></clipPath>` +
            `<g clip-path="url(#${clipId})"${rootAttrs}>${raw}</g>`;
        return { type: "svg", viewBox: vb, inner };
    }
    async function loadLogo(file, idx) {
        try {
            const res = await fetch("logos/" + file);
            if (!res.ok) return null;
            if (/\.svg$/i.test(file)) {
                const txt = await res.text();
                return processSVG(txt, "lg" + idx + "_");
            }
            const blob = await res.blob();
            const uri = await new Promise((r) => {
                const fr = new FileReader();
                fr.onload = () => r(fr.result);
                fr.onerror = () => r(null);
                fr.readAsDataURL(blob);
            });
            return uri ? { type: "img", uri } : null;
        } catch (e) {
            return null;
        }
    }
    async function preloadLogos() {
        const files = [...new Set(D.items.map((i) => i.logo).filter(Boolean))];
        const uris = await Promise.all(files.map((f, i) => loadLogo(f, i)));
        files.forEach((f, k) => (logoCache[f] = uris[k]));
        // QR-код на сайт для шапки постера — готовый app/qr.svg
        // (копия promo/qr-landscape1c-mark.svg), инлайнится как логотипы
        try {
            const res = await fetch("qr.svg");
            if (res.ok) qrCode = processSVG(await res.text(), "qr_");
        } catch (e) {}
    }

    // ── Отборы (как в графе: роль + зрелость, пусто = все) ──
    function buildGroup(labelText, values, set, axis) {
        const group = document.createElement("div");
        group.className = "graph-fgroup";
        const label = document.createElement("span");
        label.className = "graph-flabel";
        label.textContent = labelText;
        const chips = document.createElement("div");
        chips.className = "scheme-chips";
        values.forEach((val) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "chip";
            b.textContent = val;
            b.setAttribute("aria-pressed", String(set.has(val)));
            b.addEventListener("click", () => {
                if (set.has(val)) set.delete(val);
                else set.add(val);
                b.setAttribute("aria-pressed", String(set.has(val)));
                window.LandscapeFilters.patch({ [axis]: [...set] }); // унести
                render();
            });
            chips.appendChild(b);
        });
        group.append(label, chips);
        togglesBox.appendChild(group);
    }
    // Выпадающий список «Блоки» с чекбоксами — какие блоки печатать
    function buildBlocksControl() {
        const group = document.createElement("div");
        group.className = "graph-fgroup scheme-dd";
        const label = document.createElement("span");
        label.className = "graph-flabel";
        label.textContent = "Блоки";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chip scheme-dd__btn";
        btn.setAttribute("aria-expanded", "false");
        const panel = document.createElement("div");
        panel.className = "scheme-dd__panel";
        panel.hidden = true;

        const updateBtn = () => {
            btn.textContent =
                hiddenBlocks.size === 0
                    ? "все"
                    : D.blocks.length -
                      hiddenBlocks.size +
                      " из " +
                      D.blocks.length;
            btn.setAttribute("aria-pressed", String(hiddenBlocks.size > 0));
        };

        D.blocks.forEach((b) => {
            const row = document.createElement("label");
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.checked = !hiddenBlocks.has(b.name);
            cb.addEventListener("change", () => {
                if (cb.checked) hiddenBlocks.delete(b.name);
                else hiddenBlocks.add(b.name);
                updateBtn();
                render();
            });
            row.appendChild(cb);
            row.appendChild(document.createTextNode(" " + b.name));
            panel.appendChild(row);
        });

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const willOpen = panel.hidden;
            panel.hidden = !willOpen;
            btn.setAttribute("aria-expanded", String(willOpen));
        });
        document.addEventListener("click", (e) => {
            if (!group.contains(e.target)) {
                panel.hidden = true;
                btn.setAttribute("aria-expanded", "false");
            }
        });

        updateBtn();
        group.append(label, btn, panel);
        togglesBox.appendChild(group);
    }
    // Тумблер ориентации листа: ландшафт (по умолчанию) или портрет.
    // Не отбор — кнопка «Сбросить» его не трогает
    function buildLayoutControl() {
        const group = document.createElement("div");
        group.className = "graph-fgroup scheme-lay";
        const label = document.createElement("span");
        label.className = "graph-flabel";
        label.textContent = "Лист";
        const chips = document.createElement("div");
        chips.className = "scheme-chips";
        [
            ["ландшафт", true],
            ["портрет", false],
        ].forEach(([name, val]) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "chip";
            b.textContent = name;
            b.setAttribute("aria-pressed", String(landscape === val));
            b.addEventListener("click", () => {
                if (landscape === val) return;
                landscape = val;
                chips
                    .querySelectorAll(".chip")
                    .forEach((c) =>
                        c.setAttribute("aria-pressed", String(c === b)),
                    );
                render();
            });
            chips.appendChild(b);
        });
        group.append(label, chips);
        togglesBox.appendChild(group);
    }
    // Кнопка «Сбросить» — показать всё снова (как на главной)
    let resetBtn;
    function refreshReset() {
        const active = !!(selRole.size || selMat.size || hiddenBlocks.size);
        if (resetBtn) resetBtn.hidden = !active;
        const r2 = document.getElementById("reset2");
        if (r2) r2.hidden = !active;
    }
    function resetAll() {
        selRole.clear();
        selMat.clear();
        window.LandscapeFilters.patch({ role: [], maturity: [] }); // снять и в сторе
        hiddenBlocks.clear();
        togglesBox.querySelectorAll(".chip").forEach((c) => {
            if (!c.closest(".scheme-lay"))
                c.setAttribute("aria-pressed", "false");
        });
        const ddBtn = togglesBox.querySelector(".scheme-dd__btn");
        if (ddBtn) ddBtn.textContent = "все";
        togglesBox
            .querySelectorAll(".scheme-dd__panel input")
            .forEach((cb) => (cb.checked = true));
        render();
    }
    function renderToggles() {
        togglesBox.innerHTML = "";
        buildGroup("Роль", ROLES, selRole, "role");
        buildGroup("Зрелость", D.axes.maturity.values, selMat, "maturity");
        buildBlocksControl();
        buildLayoutControl();
        resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "reset scheme-reset";
        resetBtn.textContent = "Сбросить ✕";
        resetBtn.hidden = true;
        resetBtn.addEventListener("click", resetAll);
        togglesBox.appendChild(resetBtn);
    }

    // ── Раскладка и построение SVG ────────────
    // Древовидная схема: блок → шина → категории → вертикальные ветки к карточкам.
    // Блоки рисуются в локальных координатах (renderBlock) и раскладываются
    // полками: лента — каждый блок на своей полке (6 колонок, W = 1200),
    // постер — перебор всех разбиений на полки, аспект ближе всего к листу (√2).
    function buildSVG() {
        const C = {
            paper: cssVar("--paper"),
            card: cssVar("--card"),
            ink: cssVar("--ink"),
            inkSoft: cssVar("--ink-soft"),
            cardLine: cssVar("--card-line"),
            edge: cssVar("--edge"),
            brand: cssVar("--brand"),
        };
        const dark = document.documentElement.dataset.theme === "dark";
        const tree = currentTree();
        if (!tree.length) return null; // нечего показывать

        // Колонка категории
        const colW = 176,
            colGap = 16;
        const M = 32;
        // Карточка инструмента
        const logoSz = 20,
            cardPadX = 10,
            cardPadY = 8,
            logoGap = 8,
            lineH = 15,
            cardFont = 12.5,
            cardGap = 10;
        const textW = colW - cardPadX * 2 - logoSz - logoGap;
        // Заголовок блока / категории
        const blockBarH = 36,
            busGap = 16,
            headGap = 16,
            catLineH = 14,
            catPadY = 7;
        const hGap = 48, // зазор между блоками на полке
            vGap = 44; // зазор между полками

        const line = (o, x1, yy1, x2, yy2) =>
            o.push(
                `<line x1="${x1}" y1="${yy1}" x2="${x2}" y2="${yy2}" stroke="${C.edge}" stroke-width="1.5"/>`,
            );

        // Рендер блоков (drawColumn/renderBlock объявлены ниже, hoisting)
        const blocks = tree.map(({ block, cats }) => renderBlock(block, cats));
        const shelfW = (s) =>
            s.reduce((a, b) => a + b.w, 0) + hGap * (s.length - 1);
        const headH = 92; // шапка: заголовок, подзаголовок, QR
        // Полки: ручная раскладка (если пользователь перетаскивал) или
        // автоподбор — перебор всех 2^(n-1) разбиений с сохранением порядка;
        // высота полки — самый высокий из ее блоков. Критерий автоподбора —
        // аспект листа: ландшафт √2, портрет 1/√2
        let shelves;
        if (!landscape) {
            // Портрет: каждый блок на своей полке, сверху вниз (как лента);
            // перетаскиваются только категории внутри блоков
            shelves = blocks.map((b) => [b]);
        } else if (shelvesMan) {
            const byName = {};
            blocks.forEach((b) => (byName[b.name] = b));
            shelves = shelvesMan
                .map((row) => row.map((n) => byName[n]).filter(Boolean))
                .filter((row) => row.length);
            const seen = new Set(shelvesMan.flat());
            blocks.forEach((b) => {
                if (!seen.has(b.name)) shelves.push([b]); // новые блоки — вниз
            });
            if (!shelves.length) shelves = blocks.map((b) => [b]);
        } else {
            const target = Math.SQRT2;
            let best = null,
                best2 = null;
            for (let mask = 0; mask < 1 << (blocks.length - 1); mask++) {
                const sh = [[blocks[0]]];
                for (let i = 1; i < blocks.length; i++) {
                    if (mask & (1 << (i - 1))) sh.push([]);
                    sh[sh.length - 1].push(blocks[i]);
                }
                const w = Math.max(...sh.map(shelfW)) + M * 2;
                const h =
                    M +
                    headH +
                    sh.reduce((a, s) => a + Math.max(...s.map((b) => b.h)), 0) +
                    vGap * sh.length +
                    M -
                    18;
                const d = Math.abs(w / h - target);
                if (!best || d < best.d) best = { sh, d };
                if (sh.length === 2 && (!best2 || d < best2.d))
                    best2 = { sh, d };
            }
            // По умолчанию — две полки (предсказуемый постер, ближе к листу);
            // больше полок пользователь добавляет сам перетаскиванием
            shelves = (best2 || best).sh;
        }
        lastShelves = shelves.map((s) => s.map((b) => b.name));
        // Не уже шапки (заголовок + QR), даже если остался один узкий блок
        const W = Math.max(Math.max(...shelves.map(shelfW)) + M * 2, 720);
        const innerW = W - M * 2;

        const out = [];
        let y = M;

        // Знак проекта («рельеф на осях», как в nav.js) слева от заголовка;
        // glyph занимает 4.25…21.45 × 2.55…19.75 своего viewBox
        const mk = 64 / 17.2;
        out.push(
            `<g transform="translate(${M - 4.25 * mk} ${y - 2.55 * mk}) scale(${mk})" fill="none" stroke="${C.ink}" stroke-width="1.9">` +
                `<path d="M5.2 3.5 V18.8 H20.5"/>` +
                `<path d="M5.2 16.8 L9.6 9.8 L12.4 12.6 L16.6 5.8 L20.5 11.8" stroke-linejoin="round"/>` +
                `<circle cx="16.6" cy="5.8" r="1.9" fill="${C.brand}" stroke="none"/>` +
                `</g>`,
        );
        // Заголовок постера; под подзаголовком — адрес сайта
        const hx = M + 64 + 18;
        out.push(
            `<text x="${hx}" y="${y + 24}" font-family="Unbounded, sans-serif" font-weight="700" font-size="26" fill="${C.ink}">Ландшафт технологий 1С</text>`,
        );
        out.push(
            `<text x="${hx}" y="${y + 46}" font-family="Inter, sans-serif" font-size="12" fill="${C.inkSoft}">${esc(posterCaption(tree) + (D.updated ? " · обновлено " + D.updated : ""))}</text>`,
        );
        out.push(
            `<text x="${hx}" y="${y + 64}" font-family="Inter, sans-serif" font-weight="600" font-size="11" letter-spacing="1" fill="${C.inkSoft}">landscape1c.ru</text>`,
        );
        // QR на сайт в правом углу шапки (появляется со вторым проходом).
        // В темной теме не фильтр-инверсия, а подмена палитры файла на цвета
        // темы — брендовый акцент остается терракотовым (сканеры читают и
        // инвертированный QR, проверено)
        if (qrCode) {
            let qrInner = qrCode.inner;
            if (dark)
                qrInner = qrInner
                    .replace(/#f7f5f0/gi, C.paper)
                    .replace(/#ffffff/gi, C.card)
                    .replace(/#1a1a1a/gi, C.ink)
                    .replace(/#a83e18/gi, C.brand);
            out.push(
                `<svg x="${W - M - 88}" y="${y - 10}" width="88" height="88" viewBox="${qrCode.viewBox}">${qrInner}</svg>`,
            );
        }
        y += 92;

        // Рисует колонку категории в массив o, возвращает нижнюю границу
        function drawColumn(o, colX, topY, cat, items) {
            const cx = colX + colW / 2;
            // Заголовок категории (карточка, перенос до 2 строк) — за него
            // колонка перетаскивается внутри блока
            const catLines = wrapText(cat, colW - 20, "700", 11, 2);
            const catBoxH = catLines.length * catLineH + catPadY * 2;
            o.push(
                `<g class="scheme-cat-bar" style="cursor:grab;touch-action:none">`,
            );
            o.push(
                `<rect x="${colX}" y="${topY}" width="${colW}" height="${catBoxH}" rx="6" fill="${C.ink}"/>`,
            );
            catLines.forEach((ln, li) => {
                o.push(
                    `<text x="${cx}" y="${topY + catPadY + catLineH / 2 + li * catLineH}" text-anchor="middle" dominant-baseline="central" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="${C.paper}">${esc(ln)}</text>`,
                );
            });
            o.push(`</g>`);

            let cy = topY + catBoxH;
            let prevBottom = cy; // откуда тянуть вертикальную ветку
            // Подзаголовок подкатегории: текст капсом с черточками по бокам
            const drawSub = (sub) => {
                const subFont = 8.5;
                const label = truncate(
                    sub.toUpperCase(),
                    colW - 16,
                    "700",
                    subFont,
                );
                const dMid = cy + cardGap + 8; // линия текста разделителя
                line(o, cx, prevBottom, cx, dMid - 8); // ветка до разделителя
                const half =
                    (measure(label, "700", subFont) + label.length * 0.8) / 2 +
                    8;
                o.push(
                    `<text x="${cx}" y="${dMid}" text-anchor="middle" dominant-baseline="central" font-family="Inter, sans-serif" font-weight="700" font-size="${subFont}" letter-spacing="0.8" fill="${C.inkSoft}">${esc(label)}</text>`,
                );
                if (cx - half > colX) {
                    o.push(
                        `<line x1="${colX}" y1="${dMid}" x2="${cx - half}" y2="${dMid}" stroke="${C.cardLine}" stroke-width="1"/>`,
                    );
                    o.push(
                        `<line x1="${cx + half}" y1="${dMid}" x2="${colX + colW}" y2="${dMid}" stroke="${C.cardLine}" stroke-width="1"/>`,
                    );
                }
                prevBottom = dMid + 8;
                cy = prevBottom - cardGap + 2;
            };
            const drawItem = (it) => {
                const nameLines = wrapText(it.name, textW, "500", cardFont, 3);
                const cardH = Math.max(
                    logoSz,
                    nameLines.length * lineH + cardPadY * 2,
                );
                const cardY = cy + cardGap;
                // ветка: вертикаль от предыдущего низа к верху карточки
                line(o, cx, prevBottom, cx, cardY);
                // карточка (кликабельна → openDetail)
                o.push(
                    `<g class="scheme-card" data-i="${D.items.indexOf(it)}" style="cursor:pointer">`,
                );
                o.push(
                    `<rect x="${colX}" y="${cardY}" width="${colW}" height="${cardH}" rx="7" fill="${C.card}" stroke="${C.cardLine}" stroke-width="1"/>`,
                );
                const lg = it.logo ? logoCache[it.logo] : null;
                const lx = colX + cardPadX,
                    ly = cardY + (cardH - logoSz) / 2;
                const flt =
                    dark && it.logoInvert ? ` filter="url(#schInv)"` : "";
                if (lg && lg.type === "svg") {
                    o.push(
                        `<svg x="${lx}" y="${ly}" width="${logoSz}" height="${logoSz}" viewBox="${lg.viewBox}" preserveAspectRatio="xMidYMid meet"${flt}>${lg.inner}</svg>`,
                    );
                } else if (lg && lg.type === "img") {
                    o.push(
                        `<image x="${lx}" y="${ly}" width="${logoSz}" height="${logoSz}" xlink:href="${lg.uri}" preserveAspectRatio="xMidYMid meet"${flt}/>`,
                    );
                } else if (it.logo && !logosReady) {
                    // лого еще грузится — пульсирующий плейсхолдер на его месте
                    o.push(
                        `<circle class="sch-logo-skel" cx="${lx + logoSz / 2}" cy="${cardY + cardH / 2}" r="${logoSz / 2}" fill="${C.cardLine}"/>`,
                    );
                } else {
                    o.push(
                        `<text x="${lx + logoSz / 2}" y="${cardY + cardH / 2}" text-anchor="middle" dominant-baseline="central" font-family="Unbounded, sans-serif" font-weight="700" font-size="9" fill="${C.inkSoft}">1С</text>`,
                    );
                }
                const tx = lx + logoSz + logoGap;
                const ty0 =
                    cardY + cardH / 2 - ((nameLines.length - 1) * lineH) / 2;
                nameLines.forEach((ln, li) => {
                    o.push(
                        `<text x="${tx}" y="${ty0 + li * lineH}" dominant-baseline="central" font-family="Inter, sans-serif" font-weight="500" font-size="${cardFont}" fill="${C.ink}">${esc(ln)}</text>`,
                    );
                });
                o.push(`</g>`);
                cy = cardY + cardH;
                prevBottom = cy;
            };
            groupBySub(items).forEach((g) => {
                if (g.sub) drawSub(g.sub);
                g.items.forEach(drawItem);
            });
            return { bottom: cy, headCenterX: cx };
        }

        // Блок в локальных координатах (0,0 — левый верх полосы блока):
        // полоса-заголовок (за нее блок перетаскивается), шина, ряды категорий
        function renderBlock(block, cats) {
            const o = [];
            const rows = chunk(cats, 8); // ряд не шире 8 колонок
            // первый ряд всегда самый широкий — он задает ширину бокса
            const firstN = rows[0].length;
            const span = firstN * colW + (firstN - 1) * colGap;
            const bw = Math.max(span, 220);
            const cx0 = bw / 2;
            // Полоса — ручка перетаскивания блока (только в ландшафте)
            o.push(
                `<g class="scheme-blk-bar" style="${landscape ? "cursor:grab;touch-action:none" : ""}">` +
                    `<rect x="0" y="0" width="${bw}" height="${blockBarH}" rx="4" fill="${C.ink}"/>` +
                    `<text x="${cx0}" y="${blockBarH / 2}" text-anchor="middle" dominant-baseline="central" font-family="Unbounded, sans-serif" font-weight="700" font-size="15" fill="${C.paper}">${esc(block.name)}</text>` +
                    `</g>`,
            );
            const busY = blockBarH + busGap;
            const headTopY = busY + headGap;
            // вертикаль от полосы блока вниз к шине
            line(o, cx0, blockBarH, cx0, busY);
            let rowTop = headTopY;
            const catBoxes = []; // позиции колонок внутри блока (для слотов)
            rows.forEach((row, ri) => {
                const n = row.length;
                const sp = n * colW + (n - 1) * colGap;
                const sx = cx0 - sp / 2;
                const centers = [];
                let maxBottom = rowTop;
                row.forEach((c, ci) => {
                    const colX = sx + ci * (colW + colGap);
                    o.push(`<g class="scheme-cat" data-cat="${esc(c.cat)}">`);
                    const r = drawColumn(o, colX, rowTop, c.cat, c.items);
                    o.push(`</g>`);
                    centers.push(r.headCenterX);
                    catBoxes.push({
                        cat: c.cat,
                        x: colX,
                        y: rowTop,
                        w: colW,
                        h: r.bottom - rowTop,
                    });
                    if (r.bottom > maxBottom) maxBottom = r.bottom;
                });
                // шина блок→категории только для первого ряда
                if (ri === 0 && centers.length) {
                    const left = centers[0],
                        right = centers[centers.length - 1];
                    if (right > left) line(o, left, busY, right, busY);
                    centers.forEach((cx) => line(o, cx, busY, cx, headTopY));
                }
                rowTop = maxBottom + 34;
            });
            return {
                name: block.name,
                svg: o.join(""),
                w: bw,
                h: rowTop - 34,
                cats: catBoxes,
            };
        }

        // Полки: блоки слева направо, полка по центру, следующая — под самой
        // высокой из блоков полки. Позиции запоминаем для перетаскивания
        placed = [];
        placedCats = [];
        placedBands = [];
        shelves.forEach((shelf) => {
            let x = M + (innerW - shelfW(shelf)) / 2;
            let maxH = 0;
            shelf.forEach((b) => {
                out.push(
                    `<g class="scheme-blk" data-b="${esc(b.name)}" transform="translate(${x} ${y})">${b.svg}</g>`,
                );
                placed.push({ name: b.name, x, y, w: b.w, h: b.h });
                b.cats.forEach((c) =>
                    placedCats.push({
                        block: b.name,
                        cat: c.cat,
                        x: x + c.x,
                        y: y + c.y,
                        w: c.w,
                        h: c.h,
                    }),
                );
                x += b.w + hGap;
                if (b.h > maxH) maxH = b.h;
            });
            y += maxH + vGap;
        });
        // Единственный слот «новая полка» — зона под последней полкой
        // (подсвечивается только при перетаскивании блока)
        placedBands.push({
            index: shelves.length,
            x: M,
            y: y - vGap,
            w: innerW,
            h: vGap,
        });

        const H = Math.round(y + M - 18);
        svgW = W;
        svgH = H;
        return (
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
            `<defs><filter id="schInv"><feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0"/></filter></defs>` +
            `<rect x="0" y="0" width="${W}" height="${H}" fill="${C.paper}"/>` +
            out.join("") +
            `</svg>`
        );
    }

    function render() {
        refreshReset();
        const svg = buildSVG();
        wrap.innerHTML = svg
            ? svg
            : '<div class="scheme-wrap__empty">Ничего не найдено</div>';
        // Дублируем позицию блока в style.transform: CSS-переход при
        // перетаскивании стартует от нее, а не от identity (иначе первый
        // разъезд «слетался» из левого верхнего угла). Атрибут transform
        // остается для экспорта (Illustrator не читает CSS)
        placed.forEach((b) => {
            const g = wrap.querySelector(`.scheme-blk[data-b="${b.name}"]`);
            if (g) g.style.transform = `translate(${b.x}px, ${b.y}px)`;
        });
    }

    // ── Экспорт ───────────────────────────────
    function download(blob, name) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
    }
    function currentSVGString() {
        const el = wrap.querySelector("svg");
        return el ? new XMLSerializer().serializeToString(el) : null;
    }
    function exportSVG() {
        const str = currentSVGString();
        if (!str) return;
        download(
            new Blob([str], { type: "image/svg+xml;charset=utf-8" }),
            "landscape-scheme.svg",
        );
    }
    // Растеризация текущего SVG в canvas (scale×), затем колбэк
    function rasterize(scale, fillBg, cb) {
        const str = currentSVGString();
        if (!str) return;
        const url = URL.createObjectURL(
            new Blob([str], { type: "image/svg+xml;charset=utf-8" }),
        );
        const img = new Image();
        img.onload = function () {
            const c = document.createElement("canvas");
            c.width = svgW * scale;
            c.height = svgH * scale;
            const cx = c.getContext("2d");
            if (fillBg) {
                cx.fillStyle = fillBg;
                cx.fillRect(0, 0, c.width, c.height);
            }
            cx.scale(scale, scale);
            cx.drawImage(img, 0, 0, svgW, svgH);
            URL.revokeObjectURL(url);
            cb(c);
        };
        img.onerror = function () {
            URL.revokeObjectURL(url);
            alert("Не удалось сформировать изображение");
        };
        img.src = url;
    }
    function exportPNG() {
        rasterize(2, null, (c) =>
            c.toBlob((b) => download(b, "landscape-scheme.png"), "image/png"),
        );
    }
    // PDF: растровый (JPEG внутри PDF, /DCTDecode) — без зависимостей.
    // Растр покрупнее, чтобы годился и в печать (~300 dpi на А1)
    function exportPDF() {
        const scale = Math.min(3, 16000 / Math.max(svgW, svgH)); // лимит стороны canvas у Safari
        rasterize(scale, cssVar("--paper") || "#ffffff", (c) =>
            c.toBlob(
                (blob) =>
                    blob
                        .arrayBuffer()
                        .then((buf) =>
                            buildPDF(
                                new Uint8Array(buf),
                                c.width,
                                c.height,
                                svgW,
                                svgH,
                            ),
                        ),
                "image/jpeg",
                0.92,
            ),
        );
    }
    function buildPDF(jpeg, pw, ph, W, H) {
        const enc = new TextEncoder();
        const parts = [];
        let len = 0;
        const push = (d) => {
            const u = typeof d === "string" ? enc.encode(d) : d;
            parts.push(u);
            len += u.length;
        };
        const off = [];
        const obj = (n, body) => {
            off[n] = len;
            push(n + " 0 obj\n" + body + "\nendobj\n");
        };
        push("%PDF-1.3\n");
        push(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));
        obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
        obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
        obj(
            3,
            `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
        );
        off[4] = len;
        push(
            `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pw} /Height ${ph} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
        );
        push(jpeg);
        push("\nendstream\nendobj\n");
        const content = `q ${W} 0 0 ${H} 0 0 cm /Im0 Do Q`;
        obj(
            5,
            `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
        );
        const xrefAt = len;
        let xref = "xref\n0 6\n0000000000 65535 f \n";
        for (let i = 1; i <= 5; i++)
            xref += String(off[i]).padStart(10, "0") + " 00000 n \n";
        push(xref);
        push(
            `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`,
        );
        const out = new Uint8Array(len);
        let p = 0;
        parts.forEach((u) => {
            out.set(u, p);
            p += u.length;
        });
        download(
            new Blob([out], { type: "application/pdf" }),
            "landscape-scheme.pdf",
        );
    }
    // Майндмап (FreeMind .mm) — иерархия блок → категория → [подкатегория] → инструмент
    function exportMindmap() {
        const tree = currentTree();
        if (!tree.length) return;
        // У FreeMind-узлов уникальный ID и XML-декларация: без них XMind при
        // импорте показывает диалог восстановления (хоть и открывает потом верно)
        let id = 0;
        const open = (t) => `<node ID="ID_${++id}" TEXT="${esc(t)}">\n`;
        const leaf = (t) => `<node ID="ID_${++id}" TEXT="${esc(t)}"/>\n`;
        let s =
            '<?xml version="1.0" encoding="UTF-8"?>\n<map version="1.0.1">\n' +
            open("Ландшафт технологий 1С");
        tree.forEach(({ block, cats }) => {
            s += open(block.name);
            cats.forEach(({ cat, items }) => {
                s += open(cat);
                groupBySub(items).forEach((g) => {
                    if (g.sub) s += open(g.sub);
                    g.items.forEach((it) => (s += leaf(it.name)));
                    if (g.sub) s += `</node>\n`;
                });
                s += `</node>\n`;
            });
            s += `</node>\n`;
        });
        s += `</node>\n</map>\n`;
        download(
            new Blob([s], { type: "application/x-freemind" }),
            "landscape-scheme.mm",
        );
    }

    // Меню «Скачать» с выбором формата (в баре и в прилепленном заголовке)
    const FORMATS = [
        ["SVG", exportSVG],
        ["PNG", exportPNG],
        ["PDF", exportPDF],
        ["Mind map (.mm)", exportMindmap],
    ];
    // На мобильном в прилепленном заголовке — иконка «Поделиться» вместо текста
    const SHARE_ICON =
        '<svg class="i-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>';
    function buildDownloadMenu(container, btnClass, hover, withIcon) {
        if (!container) return;
        container.classList.add("scheme-dd");
        if (hover) container.classList.add("scheme-dd--hover"); // раскрытие по наведению на десктопе (CSS)
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = btnClass + " scheme-dd__btn scheme-dl-btn";
        btn.innerHTML =
            (withIcon ? SHARE_ICON : "") +
            '<span class="scheme-dl-text">Скачать</span>';
        btn.setAttribute("aria-expanded", "false");
        const panel = document.createElement("div");
        panel.className = "scheme-dd__panel scheme-dl__panel";
        panel.hidden = true;
        const close = () => {
            panel.hidden = true;
            btn.setAttribute("aria-expanded", "false");
        };
        FORMATS.forEach(([label, fn]) => {
            const o = document.createElement("button");
            o.type = "button";
            o.className = "scheme-dl__opt";
            o.textContent = label;
            o.addEventListener("click", () => {
                close();
                fn();
            });
            panel.appendChild(o);
        });
        // Клик/тап работает всегда (нужно для тача); hover — бонус через CSS
        btn.addEventListener("click", () => {
            const willOpen = panel.hidden;
            panel.hidden = !willOpen;
            btn.setAttribute("aria-expanded", String(willOpen));
        });
        document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) close();
        });
        container.append(btn, panel);
    }

    // ── Инициализация ─────────────────────────
    buildDownloadMenu(document.getElementById("bar-dl"), "scheme-btn", true);
    buildDownloadMenu(
        document.getElementById("topbar-dl"),
        "reset",
        false,
        true,
    );
    const reset2 = document.getElementById("reset2");
    if (reset2) reset2.addEventListener("click", resetAll);

    // Кнопки «Отборы» (в баре и в заголовке) → попап с отборами на мобильном
    const triggers = document.querySelectorAll(".scheme-ftrigger");
    const setFiltersOpen = (on) => {
        togglesBox.classList.toggle("is-open", on);
        triggers.forEach((t) => t.setAttribute("aria-expanded", String(on)));
    };
    triggers.forEach((t) =>
        t.addEventListener("click", (e) => {
            e.stopPropagation();
            setFiltersOpen(!togglesBox.classList.contains("is-open"));
        }),
    );
    NAV.dismissOnOutside(
        () => togglesBox.classList.contains("is-open"),
        [togglesBox, ".scheme-ftrigger"],
        () => setFiltersOpen(false),
    );
    // На десктопе при прокрутке наверх шапка прячется — закрываем попап отборов
    const topbarEl = document.getElementById("topbar");
    addEventListener(
        "scroll",
        () => {
            if (
                togglesBox.classList.contains("is-open") &&
                topbarEl &&
                !topbarEl.classList.contains("is-visible")
            )
                setFiltersOpen(false);
        },
        { passive: true },
    );

    // «Отборы» и «Скачать» живут в бургере на всех ширинах (из прилепленной
    // шапки отборы убраны: настроил наверху — дальше только смотришь и качаешь)
    (function injectBurgerActions() {
        const filters = document.createElement("button");
        filters.type = "button";
        filters.className = "menu__pa-item";
        filters.textContent = "Отборы";
        filters.addEventListener("click", () => {
            NAV.closeMenu();
            setFiltersOpen(true);
        });
        const head = document.createElement("button");
        head.type = "button";
        head.className = "menu__pa-item menu__pa-head";
        head.setAttribute("aria-expanded", "false");
        head.innerHTML =
            '<span>Скачать</span><span aria-hidden="true">▾</span>';
        const list = document.createElement("div");
        list.className = "menu__pa-list";
        list.hidden = true;
        FORMATS.forEach(([label, fn]) => {
            const o = document.createElement("button");
            o.type = "button";
            o.className = "menu__pa-item menu__pa-sub";
            o.textContent = label;
            o.addEventListener("click", () => {
                NAV.closeMenu();
                fn();
            });
            list.appendChild(o);
        });
        head.addEventListener("click", () => {
            const open = list.hidden;
            list.hidden = !open;
            head.setAttribute("aria-expanded", String(open));
        });
        NAV.pageActions([filters, head, list], true);
    })();

    // Клик по карточке инструмента → детальная модалка (как в графе)
    wrap.addEventListener("click", (e) => {
        const g = e.target.closest(".scheme-card");
        if (g && window.openDetail) window.openDetail(D.items[+g.dataset.i]);
    });

    // ── Перетаскивание блоков и категорий ─────
    // Блок тянется за свою полосу-заголовок, колонка категории — за темную
    // шапку (только внутри своего блока). Слоты дискретные: место другого
    // блока (левая половина — перед ним, правая — после) или зазор между
    // полками — выделить в новую полку. Превью живое: остальные блоки
    // анимированно разъезжаются (CSS transition), пунктир показывает слот
    // перетаскиваемого. Раскладка фиксируется на отпускании; до этого
    // ничего не мутируется, так что pointercancel — просто перерисовка
    (function initDrag() {
        let drag = null; // {kind, name, block?, offX, offY, moved, preview, hintBox}
        const svgPoint = (e) => {
            const svg = wrap.querySelector("svg");
            if (!svg) return null;
            const p = svg.createSVGPoint();
            p.x = e.clientX;
            p.y = e.clientY;
            return p.matrixTransform(svg.getScreenCTM().inverse());
        };
        const inBox = (pt, b) =>
            pt.x >= b.x &&
            pt.x <= b.x + b.w &&
            pt.y >= b.y &&
            pt.y <= b.y + b.h;
        // Слот под указателем — по геометрии исходной раскладки (placed*
        // во время перетаскивания не пересчитываются, поэтому стабильно)
        function slotAt(d, pt) {
            if (!pt) return null;
            if (d.kind === "block") {
                const b = placed.find((b) => b.name !== d.name && inBox(pt, b));
                if (b) return { target: b.name, after: pt.x > b.x + b.w / 2 };
                const band = placedBands.find((b) => inBox(pt, b));
                return band ? { band: band.index } : null;
            }
            const c = placedCats.find(
                (c) => c.block === d.block && c.cat !== d.name && inBox(pt, c),
            );
            return c ? { target: c.cat, after: pt.x > c.x + c.w / 2 } : null;
        }
        // Пунктирная рамка на слоте, куда встанет перетаскиваемый
        function showHint(s) {
            const svg = wrap.querySelector("svg");
            if (!svg) return;
            let r = svg.querySelector("#schemeDropHint");
            if (!r) {
                r = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect",
                );
                r.id = "schemeDropHint";
                r.setAttribute("fill", "none");
                r.setAttribute("stroke", cssVar("--brand") || "#a83e18");
                r.setAttribute("stroke-width", "2.5");
                r.setAttribute("stroke-dasharray", "8 6");
                r.setAttribute("rx", "8");
                r.setAttribute("pointer-events", "none");
                svg.appendChild(r);
            }
            r.setAttribute("x", s.x - 5);
            r.setAttribute("y", s.y - 5);
            r.setAttribute("width", s.w + 10);
            r.setAttribute("height", s.h + 10);
        }
        const hideHint = () => {
            const r = wrap.querySelector("#schemeDropHint");
            if (r) r.remove();
        };
        // Зона «+ новая полка» под постером: появляется только пока тянешь
        // блок — полка добавляется осознанно, а не случайным зазором.
        // Холст на время растягивается, чтобы превью новой полки было видно
        function showZone() {
            const svg = wrap.querySelector("svg");
            const b = placedBands[0];
            if (!svg || !b || svg.querySelector("#schemeShelfZone")) return;
            const extra = (placedOf(drag) || { h: 0 }).h;
            svg.setAttribute("height", svgH + extra);
            svg.setAttribute("viewBox", `0 0 ${svgW} ${svgH + extra}`);
            const g = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g",
            );
            g.id = "schemeShelfZone";
            g.setAttribute("pointer-events", "none");
            g.innerHTML =
                `<rect x="${b.x}" y="${b.y + 6}" width="${b.w}" height="${b.h - 10}" rx="8" fill="none" stroke="${cssVar("--edge") || "#c8c3bb"}" stroke-width="1.5" stroke-dasharray="6 6"/>` +
                `<text x="${b.x + b.w / 2}" y="${b.y + b.h / 2 + 1}" text-anchor="middle" dominant-baseline="central" font-family="Inter, sans-serif" font-size="11" fill="${cssVar("--ink-soft") || "#666666"}">+ новая полка</text>`;
            svg.appendChild(g);
        }
        const hideZone = () => {
            const z = wrap.querySelector("#schemeShelfZone");
            if (z) z.remove();
        };
        const placedOf = (d) =>
            d.kind === "block"
                ? placed.find((b) => b.name === d.name)
                : placedCats.find(
                      (c) => c.block === d.block && c.cat === d.name,
                  );
        const gOf = (d) =>
            d.kind === "block"
                ? wrap.querySelector(`.scheme-blk[data-b="${d.name}"]`)
                : wrap.querySelector(
                      `.scheme-blk[data-b="${d.block}"] .scheme-cat[data-cat="${d.name}"]`,
                  );
        // Новое разбиение полок после переноса блока в слот
        function moveBlockTo(rows0, name, slot) {
            const stripped = rows0.map((r) => r.filter((n) => n !== name));
            let rows;
            if (slot.band !== undefined) {
                rows = [];
                stripped.forEach((r, i) => {
                    if (i === slot.band) rows.push([name]);
                    if (r.length) rows.push(r);
                });
                if (slot.band >= stripped.length) rows.push([name]);
            } else {
                rows = stripped.map((r) => r.slice());
                for (const r of rows) {
                    const i = r.indexOf(slot.target);
                    if (i !== -1) {
                        r.splice(i + (slot.after ? 1 : 0), 0, name);
                        break;
                    }
                }
                rows = rows.filter((r) => r.length);
            }
            return rows;
        }
        // Позиции блоков для разбиения — та же математика, что раскладка
        // полок в buildSVG (константы держать в согласии с ней)
        function blockPositions(rows) {
            const M = 32,
                hGap = 48,
                vGap = 44;
            const dims = {};
            placed.forEach((b) => (dims[b.name] = b));
            const innerW = svgW - M * 2;
            const pos = {};
            let y = M + 92;
            rows.forEach((row) => {
                const sw =
                    row.reduce((a, n) => a + dims[n].w, 0) +
                    hGap * (row.length - 1);
                let x = M + (innerW - sw) / 2;
                let maxH = 0;
                row.forEach((n) => {
                    pos[n] = { x, y, w: dims[n].w, h: dims[n].h };
                    x += dims[n].w + hGap;
                    if (dims[n].h > maxH) maxH = dims[n].h;
                });
                y += maxH + vGap;
            });
            return pos;
        }
        // Превью: разъезд существующих узлов CSS-трансформами (анимируется
        // через transition в styles.css), без перерисовки SVG.
        // Возвращает бокс слота перетаскиваемого — для пунктира
        function previewBlocks(rows) {
            const pos = blockPositions(rows);
            placed.forEach((b) => {
                if (b.name === drag.name) return;
                const p = pos[b.name];
                const g = wrap.querySelector(`.scheme-blk[data-b="${b.name}"]`);
                if (g && p) g.style.transform = `translate(${p.x}px, ${p.y}px)`;
            });
            return pos[drag.name];
        }
        function previewCats(list) {
            // колонки одного блока одинаковой ширины: боксы-слоты неподвижны,
            // по ним раскладываются колонки в новом порядке
            const boxes = placedCats.filter((c) => c.block === drag.block);
            const slotOf = {};
            list.forEach((cat, i) => (slotOf[cat] = boxes[i]));
            boxes.forEach((c) => {
                if (c.cat === drag.name) return;
                const t = slotOf[c.cat];
                const g = wrap.querySelector(
                    `.scheme-blk[data-b="${drag.block}"] .scheme-cat[data-cat="${c.cat}"]`,
                );
                if (g && t)
                    g.style.transform = `translate(${t.x - c.x}px, ${t.y - c.y}px)`;
            });
            return slotOf[drag.name];
        }
        const moveInList = (list, name, slotName, after) => {
            const l = list.filter((n) => n !== name);
            l.splice(l.indexOf(slotName) + (after ? 1 : 0), 0, name);
            return l;
        };
        wrap.addEventListener("pointerdown", (e) => {
            const catBar = e.target.closest(".scheme-cat-bar");
            const blkBar = catBar ? null : e.target.closest(".scheme-blk-bar");
            if (!catBar && !blkBar) return;
            if (blkBar && !landscape) return; // в портрете блоки не двигаются
            const pt = svgPoint(e);
            if (!pt) return;
            let d;
            if (catBar) {
                const cg = catBar.closest(".scheme-cat");
                const bg = catBar.closest(".scheme-blk");
                if (!cg || !bg) return;
                d = { kind: "cat", name: cg.dataset.cat, block: bg.dataset.b };
            } else {
                const g = blkBar.closest(".scheme-blk");
                if (!g) return;
                d = { kind: "block", name: g.dataset.b };
            }
            const p = placedOf(d);
            if (!p) return;
            drag = Object.assign(d, {
                offX: pt.x - p.x, // хват: смещение указателя от угла элемента
                offY: pt.y - p.y,
                x0: pt.x,
                y0: pt.y,
                moved: false,
                preview: null, // последняя показанная раскладка (фиксируется на drop)
                hintBox: null,
            });
            e.preventDefault();
        });
        window.addEventListener("pointermove", (e) => {
            if (!drag) return;
            const pt = svgPoint(e);
            if (!pt) return;
            if (!drag.moved && Math.hypot(pt.x - drag.x0, pt.y - drag.y0) < 6)
                return; // порог от случайных кликов
            if (!drag.moved) {
                drag.moved = true;
                if (drag.kind === "block") showZone();
            }
            // Навели на слот — соседи разъезжаются, показывая будущее место
            const s = slotAt(drag, pt);
            if (s) {
                if (drag.kind === "block") {
                    drag.preview = moveBlockTo(lastShelves, drag.name, s);
                    drag.hintBox = previewBlocks(drag.preview);
                } else {
                    const cur = placedCats
                        .filter((c) => c.block === drag.block)
                        .map((c) => c.cat);
                    drag.preview = moveInList(
                        cur,
                        drag.name,
                        s.target,
                        s.after,
                    );
                    drag.hintBox = previewCats(drag.preview);
                }
            }
            if (drag.hintBox) showHint(drag.hintBox);
            // Перетаскиваемый следует за указателем поверх превью
            const g = gOf(drag);
            const p = placedOf(drag);
            if (!g || !p) return;
            g.style.transition = "none"; // за указателем — без анимации
            const dx = pt.x - drag.offX,
                dy = pt.y - drag.offY;
            g.style.transform =
                drag.kind === "block"
                    ? `translate(${dx}px, ${dy}px)`
                    : `translate(${dx - p.x}px, ${dy - p.y}px)`;
            g.style.opacity = "0.75";
        });
        window.addEventListener("pointerup", () => {
            if (!drag) return;
            const d = drag;
            drag = null;
            if (!d.moved) return;
            hideHint();
            hideZone();
            // Фиксируем последнее показанное превью
            if (d.preview && d.kind === "block") {
                shelvesMan = d.preview;
                saveShelves();
            } else if (d.preview) {
                catOrder[d.block] = d.preview;
                saveCatOrder();
            }
            render(); // снап: чистая перерисовка без временных трансформов
        });
        // Браузер прервал перетаскивание (например, системный жест).
        // Раскладка не мутировалась — достаточно перерисовать
        window.addEventListener("pointercancel", () => {
            if (!drag) return;
            drag = null;
            hideHint();
            hideZone();
            render();
        });
    })();

    // Перерисовка при смене темы (инлайн-скрипт страницы меняет data-theme)
    new MutationObserver(render).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
    });

    renderToggles();
    // Первый проход — структура постера с плейсхолдерами на местах лого. Ждем
    // шрифты (грузятся быстрее ~150 логотипов), иначе замеры текста и раскладка
    // разойдутся со вторым проходом и постер дернется. render() всегда читает
    // актуальный logosReady, поэтому порядок этих двух .then не важен.
    if (document.fonts && document.fonts.ready)
        document.fonts.ready.then(render);
    else render();
    preloadLogos().then(() => {
        logosReady = true;
        render(); // логотипы догрузились — заполняем их места
    });
})();
