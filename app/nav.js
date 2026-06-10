// Общая навигация для всех страниц: бургер-кнопка, панель меню и подвал
// генерируются здесь из одного конфига — править ссылки нужно только тут.
// Тему до отрисовки ставит инлайновый скрипт в <head>; здесь — переключение через меню.
(function () {
    // ── Единый источник ссылок ──
    var NAV = [
        ["index.html", "Ландшафт"],
        ["graph.html", "Граф"],
        ["methodology.html", "Методология"],
        ["council.html", "Экспертный совет"],
    ];
    var BOOSTY =
        "https://boosty.to/1cnik/purchase/3363092?ssource=DIRECT&share=subscription_link";
    var TG = "https://t.me/AriN1C";
    var THEME_LABEL = { light: "Светлая", dark: "Темная", system: "Системная" };

    var navLinks = NAV.map(function (l) {
        return '<a href="' + l[0] + '">' + l[1] + "</a>";
    }).join("");
    var ext = function (suffix) {
        return (
            '<a href="' +
            BOOSTY +
            '" target="_blank" rel="noopener">Поддержать' +
            suffix +
            "</a>" +
            '<a href="' +
            TG +
            '" target="_blank" rel="noopener">Telegram' +
            suffix +
            "</a>"
        );
    };

    // ── 1. Бургер-кнопка после каждой кнопки темы ──
    var burgerSvg =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    document.querySelectorAll(".theme-toggle").forEach(function (t) {
        var b = document.createElement("button");
        b.className = "menu-toggle";
        b.type = "button";
        b.setAttribute("aria-label", "Меню");
        b.setAttribute("aria-expanded", "false");
        b.innerHTML = burgerSvg;
        t.after(b);
    });

    // ── 2. Панель меню ──
    var menu = document.createElement("nav");
    menu.className = "menu";
    menu.id = "menu";
    menu.setAttribute("aria-label", "Меню");
    menu.innerHTML =
        '<div class="menu__panel">' +
        navLinks +
        '<div class="menu__sep"></div>' +
        ext(" ↗︎") +
        '<div class="menu__sep"></div>' +
        '<div class="menu__theme">' +
        '<button type="button" class="menu__theme-head" aria-expanded="false">' +
        '<span>Тема</span><span class="menu__theme-cur"></span>' +
        "</button>" +
        '<div class="menu__theme-list" hidden>' +
        '<button type="button" data-theme-set="light">Светлая</button>' +
        '<button type="button" data-theme-set="dark">Темная</button>' +
        '<button type="button" data-theme-set="system">Системная</button>' +
        "</div>" +
        "</div>" +
        "</div>";
    document.body.appendChild(menu);

    // ── 3. Подвал (если на странице есть контейнер) ──
    var footLinks = document.querySelector(".foot__links");
    if (footLinks) footLinks.innerHTML = navLinks + ext("");

    // ── Открытие/закрытие меню ──
    var toggles = document.querySelectorAll(".menu-toggle");
    var themeHead = menu.querySelector(".menu__theme-head");
    var themeList = menu.querySelector(".menu__theme-list");

    function isOpen() {
        return menu.classList.contains("is-open");
    }
    function collapseTheme() {
        themeList.hidden = true;
        themeHead.setAttribute("aria-expanded", "false");
    }
    function setOpen(open) {
        menu.classList.toggle("is-open", open);
        toggles.forEach(function (b) {
            b.setAttribute("aria-expanded", open);
        });
        if (open) {
            collapseTheme();
            syncTheme();
        }
    }

    toggles.forEach(function (b) {
        b.addEventListener("click", function (e) {
            e.stopPropagation();
            setOpen(!isOpen());
        });
    });
    menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
            setOpen(false);
        });
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isOpen()) setOpen(false);
    });
    // Клик вне меню — закрыть
    document.addEventListener("click", function (e) {
        if (
            !isOpen() ||
            menu.contains(e.target) ||
            (e.target.closest && e.target.closest(".menu-toggle"))
        )
            return;
        setOpen(false);
    });

    // ── На десктопе (есть наведение) — раскрытие по hover ──
    var hoverable = false;
    try {
        hoverable = matchMedia("(hover: hover)").matches;
    } catch (e) {}
    if (hoverable) {
        var timer;
        var cancel = function () {
            clearTimeout(timer);
        };
        var later = function () {
            cancel();
            timer = setTimeout(function () {
                setOpen(false);
            }, 180);
        };
        toggles.forEach(function (b) {
            b.addEventListener("mouseenter", function () {
                cancel();
                setOpen(true);
            });
            b.addEventListener("mouseleave", later);
        });
        menu.addEventListener("mouseenter", cancel);
        menu.addEventListener("mouseleave", later);
    }

    // ── Тема: поле раскрывается списком из 3 вариантов ──
    var themeCur = menu.querySelector(".menu__theme-cur");
    var themeBtns = menu.querySelectorAll("[data-theme-set]");

    themeHead.addEventListener("click", function () {
        var open = themeList.hidden;
        themeList.hidden = !open;
        themeHead.setAttribute("aria-expanded", open);
    });

    function choice() {
        try {
            return localStorage.getItem("theme") || "system";
        } catch (e) {
            return "system";
        }
    }
    function apply(c) {
        var t = c;
        if (c === "system") {
            try {
                localStorage.removeItem("theme");
            } catch (e) {}
            t = matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        } else {
            try {
                localStorage.setItem("theme", c);
            } catch (e) {}
        }
        document.documentElement.dataset.theme = t;
        syncTheme();
    }
    function syncTheme() {
        var c = choice();
        themeCur.textContent = THEME_LABEL[c];
        themeBtns.forEach(function (b) {
            b.setAttribute("aria-pressed", b.dataset.themeSet === c);
        });
    }
    themeBtns.forEach(function (b) {
        b.addEventListener("click", function () {
            apply(b.dataset.themeSet);
            collapseTheme();
        });
    });
    // Если выбрана «системная» — следим за сменой темы ОС на лету
    try {
        matchMedia("(prefers-color-scheme: dark)").addEventListener(
            "change",
            function (e) {
                if (choice() === "system")
                    document.documentElement.dataset.theme = e.matches
                        ? "dark"
                        : "light";
            },
        );
    } catch (e) {}

    syncTheme();
})();
