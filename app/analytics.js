// Яндекс Метрика загружается только после явного разрешения посетителя.
(() => {
    const KEY = "landscapeAnalytics";
    const COUNTER = 109810369;
    const scriptPath = document.currentScript?.src;
    let loaded = false;

    function loadMetrika() {
        if (loaded) return;
        loaded = true;

        window.ym =
            window.ym ||
            function () {
                (window.ym.a = window.ym.a || []).push(arguments);
            };
        window.ym.l = Date.now();

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER}`;
        document.head.append(script);

        window.ym(COUNTER, "init", {
            ssr: true,
            webvisor: false,
            clickmap: false,
            accurateTrackBounce: true,
            trackLinks: true,
        });
    }

    function choice() {
        try {
            return localStorage.getItem(KEY);
        } catch (e) {
            return null;
        }
    }

    function remember(value) {
        try {
            localStorage.setItem(KEY, value);
        } catch (e) {}
    }

    function showBanner() {
        const banner = document.createElement("section");
        banner.className = "analytics-consent";
        banner.setAttribute("aria-label", "Настройка аналитики");

        const copy = document.createElement("div");
        copy.className = "analytics-consent__copy";

        const title = document.createElement("strong");
        title.className = "analytics-consent__title";
        title.textContent = "Помогите сделать Ландшафт лучше";

        const text = document.createElement("span");
        text.textContent =
            "Яндекс Метрика покажет, какие разделы полезны. Она сохраняет cookie и обрабатывает технические данные. ";

        const more = document.createElement("a");
        more.href = scriptPath
            ? scriptPath.replace(/[^/]*$/, "privacy.html")
            : "privacy.html";
        more.textContent = "Подробнее";
        copy.append(title, text, more);

        const deny = document.createElement("button");
        deny.type = "button";
        deny.className = "analytics-consent__deny";
        deny.dataset.analytics = "deny";
        deny.textContent = "Без аналитики";

        const allow = document.createElement("button");
        allow.type = "button";
        allow.className = "analytics-consent__allow";
        allow.dataset.analytics = "allow";
        allow.textContent = "Разрешить";

        deny.addEventListener("click", () => {
            remember("deny");
            banner.remove();
        });
        allow.addEventListener("click", () => {
            remember("allow");
            banner.remove();
            loadMetrika();
        });

        banner.append(copy, allow, deny);
        document.body.append(banner);
    }

    const saved = choice();
    if (saved === "allow") {
        loadMetrika();
    } else if (saved !== "deny") {
        if (document.querySelector(".onb")) {
            document.addEventListener(
                "landscape:onboarding-finished",
                showBanner,
                { once: true },
            );
        } else {
            showBanner();
        }
    }
})();
