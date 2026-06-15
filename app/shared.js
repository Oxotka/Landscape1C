// Общие хелперы страниц с данными (главная, граф, схема).
// Подключается до detail.js — тот тоже ими пользуется.
(() => {
    // Точки переноса в длинных именах без пробелов: «1С:Предприятие.Элемент»
    const wbr = (s) => s.replace(/([.:/])/g, "$1<wbr>");
    const logoMarkup = (i, cls) =>
        i.logo
            ? `<span class="${cls}"><img class="${i.logoInvert ? "is-invert" : ""}" src="logos/${i.logo}" alt="" loading="lazy"></span>`
            : `<span class="${cls} ${cls}--ph">1С</span>`;
    // Порядок карточек внутри категории (главная и схема сортируют одинаково):
    // доступные в РФ раньше → по зрелости → происхождению → лицензии
    const MAT_ORDER = { базовое: 0, продвинутое: 1, нишевое: 2 };
    const ORIGIN_ORDER = { отечественное: 0, зарубежное: 1 };
    const LICENSE_ORDER = { "open-source": 0, проприетарное: 1, бесплатное: 2 };
    const sortItems = (a, b) =>
        (a.availability === "ограничен") - (b.availability === "ограничен") ||
        (MAT_ORDER[a.maturity] ?? 99) - (MAT_ORDER[b.maturity] ?? 99) ||
        (ORIGIN_ORDER[a.origin] ?? 99) - (ORIGIN_ORDER[b.origin] ?? 99) ||
        (LICENSE_ORDER[a.license] ?? 99) - (LICENSE_ORDER[b.license] ?? 99);

    // Группировка карточек по подкатегории; без подкатегории («») — первой группой.
    // Главная и схема выводят подкатегории одинаково.
    const groupBySub = (items) => {
        const order = [];
        const map = new Map();
        items.forEach((it) => {
            const k = it.subcategory || "";
            if (!map.has(k)) {
                map.set(k, []);
                order.push(k);
            }
            map.get(k).push(it);
        });
        order.sort((a, b) => (b === "") - (a === ""));
        return order.map((k) => ({ sub: k, items: map.get(k) }));
    };

    // Склонение существительного по числу: 1 инструмент, 2 инструмента, 5 инструментов
    const plural = (n, one, few, many) => {
        const d10 = n % 10,
            d100 = n % 100;
        if (d100 >= 11 && d100 <= 14) return many;
        if (d10 === 1) return one;
        if (d10 >= 2 && d10 <= 4) return few;
        return many;
    };

    window.LandscapeUI = { wbr, logoMarkup, sortItems, groupBySub, plural };

    // ── Общие отборы между страницами (localStorage) ──
    // Роль/контекст/зрелость/… переносятся между главной, путем, схемой и
    // графом: выбрал на одной — увидишь на другой, и наоборот. Каждая страница
    // читает оси, которые умеет, и пишет только их (остальные сохраняются).
    // Пустой набор оси = «все» (ось не активна) — единая семантика везде.
    const FKEY = "landscapeFilters";
    const FAXES = [
        "role",
        "context",
        "maturity",
        "origin",
        "license",
        "availability",
    ];
    const readFilters = () => {
        let o = {};
        try {
            o = JSON.parse(localStorage.getItem(FKEY) || "{}") || {};
        } catch (e) {}
        const out = {};
        FAXES.forEach((a) => (out[a] = Array.isArray(o[a]) ? o[a] : []));
        out.q = typeof o.q === "string" ? o.q : "";
        return out;
    };
    const patchFilters = (partial) => {
        const cur = readFilters();
        Object.assign(cur, partial);
        try {
            localStorage.setItem(FKEY, JSON.stringify(cur));
        } catch (e) {}
    };
    window.LandscapeFilters = {
        read: readFilters,
        patch: patchFilters,
        AXES: FAXES,
    };
})();
