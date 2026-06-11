// Общая навигация для всех страниц: бургер-кнопка, панель меню и подвал
// генерируются здесь из одного конфига — править ссылки нужно только тут.
// Тему до отрисовки ставит инлайновый скрипт в <head>; здесь — переключение через меню.
(function () {
    // ── Единый источник ссылок ──
    var NAV = [
        ["index.html", "Ландшафт"],
        ["scheme.html", "Схема"],
        ["graph.html", "Граф"],
        ["methodology.html", "Методология"],
        ["council.html", "Эксперты"],
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

    // ── 0. Знак проекта («рельеф на осях») в обеих шапках ──
    // Цвета из темы: линии — currentColor (--ink), пик — --m-niche (CSS).
    // На мобильной прилепленной шапке знак скрыт (media в styles.css).
    var markSvg = function (cls) {
        return (
            '<svg class="logo-mark' +
            (cls ? " " + cls : "") +
            '" viewBox="4.25 2.55 17.2 17.2" aria-hidden="true">' +
            '<path d="M5.2 3.5 V18.8 H20.5" fill="none" stroke="currentColor" stroke-width="1.9"/>' +
            '<path d="M5.2 16.8 L9.6 9.8 L12.4 12.6 L16.6 5.8 L20.5 11.8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>' +
            '<circle class="logo-mark__acc" cx="16.6" cy="5.8" r="1.9"/>' +
            "</svg>"
        );
    };
    var brandEl = document.querySelector(".topbar__brand");
    if (brandEl) brandEl.insertAdjacentHTML("afterbegin", markSvg(""));
    var mastEl = document.querySelector(".masthead");
    if (mastEl) {
        mastEl.insertAdjacentHTML("afterbegin", markSvg("logo-mark--mast"));
        mastEl.classList.add("has-mark");
    }
    // Клик по знаку: на главной — наверх, с остальных страниц — на главную
    var onMain = document.body.classList.contains("page-main");
    document.querySelectorAll(".logo-mark").forEach(function (m) {
        m.addEventListener("click", function () {
            if (onMain) window.scrollTo({ top: 0, behavior: "smooth" });
            else location.href = "index.html";
        });
    });

    // ── 1. Бургер-кнопка в обеих шапках (большой и прилепленной) ──
    var burgerSvg =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    document.querySelectorAll(".topbar, .masthead").forEach(function (host) {
        var b = document.createElement("button");
        b.className = "menu-toggle";
        b.type = "button";
        b.setAttribute("aria-label", "Меню");
        b.setAttribute("aria-expanded", "false");
        b.innerHTML = burgerSvg;
        host.appendChild(b);
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

    // ── Прилепленная шапка и подвал (общие для всех страниц) ──
    var topbar = document.getElementById("topbar");
    var mast = document.querySelector(".masthead");
    var foot = document.querySelector(".foot");
    if (topbar && mast) {
        var onScroll = function () {
            topbar.classList.toggle(
                "is-visible",
                window.scrollY > mast.offsetHeight - 10,
            );
            if (foot)
                foot.classList.toggle(
                    "is-full",
                    window.innerHeight + window.scrollY >=
                        document.documentElement.scrollHeight - 2,
                );
        };
        addEventListener("scroll", onScroll, { passive: true });
        addEventListener("resize", onScroll);
        onScroll();
        // Клик по бренду/названию страницы в прилепленной строке — плавно наверх.
        // Элементы со ссылкой или полем поиска внутри пропускаем (у них своя роль).
        [".topbar__brand", ".topbar__search"].forEach(function (sel) {
            var el = topbar.querySelector(sel);
            if (el && !el.querySelector("a, input"))
                el.addEventListener("click", function () {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });
        });
    }

    // ── API для страничных скриптов (app.js, scheme.js, graph.js) ──
    window.NAV = {
        // Закрыть бургер-меню (после выбора страничного пункта)
        closeMenu: function () {
            setOpen(false);
        },
        // Вставить пункты текущей страницы в начало панели бургера (+ разделитель)
        pageActions: function (nodes) {
            var panel = menu.querySelector(".menu__panel");
            var box = document.createElement("div");
            box.className = "menu__page-actions";
            nodes.forEach(function (n) {
                box.appendChild(n);
            });
            var sep = document.createElement("div");
            sep.className = "menu__sep";
            box.appendChild(sep);
            panel.insertBefore(box, panel.firstChild);
        },
        // Закрытие попапа по нажатию вне него. keep — элементы/селекторы,
        // нажатие по которым не закрывает (сам попап и его триггер).
        // Pointerdown в фазе перехвата — срабатывает и поверх canvas; следующий
        // click глушится, чтобы не сработала карточка под попапом.
        dismissOnOutside: function (isOpen, keep, close) {
            document.addEventListener(
                "pointerdown",
                function (e) {
                    if (!isOpen()) return;
                    var inside = keep.some(function (k) {
                        return typeof k === "string"
                            ? e.target.closest && e.target.closest(k)
                            : k.contains(e.target);
                    });
                    if (inside) return;
                    close();
                    var swallow = function (ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    };
                    document.addEventListener("click", swallow, {
                        capture: true,
                        once: true,
                    });
                    setTimeout(function () {
                        document.removeEventListener("click", swallow, true);
                    }, 400);
                },
                true,
            );
        },
    };
})();
