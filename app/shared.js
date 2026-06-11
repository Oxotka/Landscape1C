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

    window.LandscapeUI = { wbr, logoMarkup, sortItems, groupBySub };
})();
