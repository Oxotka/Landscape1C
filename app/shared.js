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

    // Слаг карточки (транслит имени) — общий для дип-линков (?tool=слаг),
    // «Поделиться» и статических страниц tools/<слаг>.html (sitegen.js).
    // prettier-ignore
    const TR = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
        з: "z", и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o",
        п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
        ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
        я: "ya",
    };
    const slugOf = (name) =>
        name
            .toLowerCase()
            .replace(/[а-яё]/g, (ch) => TR[ch])
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    // ── Опрос State of 1C: агрегаты по инструменту (survey2026.js) ──
    // Считаются лениво из window.SURVEY (если скрипт подключен на странице)
    // и кэшируются. Метрика видна от SURVEY_MIN оценок, иначе null — малые
    // выборки не показываем. Имена инструментов совпадают с data.js.
    const SURVEY_MIN = 3;
    let surveyCache = null;
    const surveyOf = (name) => {
        const S = window.SURVEY;
        if (!S) return null;
        if (!surveyCache) {
            surveyCache = new Map();
            const pct = (a, b) =>
                b >= SURVEY_MIN ? Math.round((100 * a) / b) : null;
            S.tools.forEach((t) => {
                // Ячейка: [роль, уровень, контекст, работал, слышал, не знаю,
                // взял бы снова, не взял бы, хочу попробовать, не хочу]
                let u = 0, h = 0, x = 0, ag = 0, no = 0, w = 0, nw = 0; // prettier-ignore
                t.cells.forEach((c) => {
                    u += c[3];
                    h += c[4];
                    x += c[5];
                    ag += c[6];
                    no += c[7];
                    w += c[8];
                    nw += c[9];
                });
                const n = u + h + x;
                surveyCache.set(t.name, {
                    n, // всего ответивших по инструменту
                    source:
                        t.july === false
                            ? "Опрос продолжается · " +
                              new Date(S.generated).toLocaleDateString("ru-RU")
                            : "Июль 2026",
                    known: pct(u + h, n), // узнаваемость: слышали или работали
                    used: pct(u, n), // доля работавших
                    loyal: pct(ag, ag + no), // «взял бы снова» среди работавших
                    loyalN: ag + no,
                    want: pct(w, w + nw), // «хочу попробовать» среди слышавших
                    wantN: w + nw,
                });
            });
        }
        return surveyCache.get(name) || null;
    };

    window.LandscapeUI = {
        wbr,
        logoMarkup,
        sortItems,
        groupBySub,
        plural,
        slugOf,
        surveyOf,
    };

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
