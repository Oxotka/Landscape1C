// Детальная модалка инструмента. Общая для index.html и graph.html.
// Открывается через window.openDetail(item); разметка диалога — <dialog id="detail"> в HTML.
(() => {
    const D = window.LANDSCAPE;
    const $ = (sel) => document.querySelector(sel);
    const { wbr, logoMarkup } = window.LandscapeUI; // shared.js
    const byName = (n) => D.items.find((x) => x.name === n);

    // ── Дип-линки: открытая карточка отражается в URL (?tool=имя) ──
    // Остальные параметры (фильтры главной) не трогаем; app.js, в свою
    // очередь, сохраняет tool при перезаписи своих параметров.
    const writeTool = (name) => {
        const p = new URLSearchParams(location.search);
        if (name) p.set("tool", name);
        else p.delete("tool");
        const qs = p.toString();
        history.replaceState(null, "", qs ? "?" + qs : location.pathname);
    };

    // «Заметили неточность?» — issue-форма правки с подставленным именем карточки
    const report = (i) =>
        `<a class="detail__report" target="_blank" rel="noopener" href="https://github.com/Oxotka/Landscape1C/issues/new?template=fix-card.yml&title=${encodeURIComponent("Карточка: " + i.name)}&tool=${encodeURIComponent(i.name)}">Заметили неточность? ↗︎</a>`;
    const matKey = (m) =>
        ({ базовое: "base", продвинутое: "adv", нишевое: "niche" })[m];

    function openDetail(i) {
        const dlg = $("#detail");
        const links = [
            i.homepage
                ? `<a href="${i.homepage}" target="_blank" rel="noopener">Сайт ↗︎</a>`
                : "",
            i.repo
                ? `<a href="${i.repo}" target="_blank" rel="noopener">Репозиторий ↗︎</a>`
                : "",
        ]
            .filter(Boolean)
            .join("");
        const tags = (arr) =>
            (arr || [])
                .filter(Boolean)
                .map((v) => `<span class="badge badge--ghost">${v}</span>`)
                .join("");
        // Блок раздела рендерится только если есть содержимое
        const row = (title, inner) =>
            inner
                ? `<div class="detail__row"><h3>${title}</h3>${inner}</div>`
                : "";

        const badges = [
            i.maturity
                ? `<span class="badge badge--mat" data-mat="${i.maturity}" style="--mat:var(--m-${matKey(i.maturity)})">${i.maturity}</span>`
                : "",
            tags([
                i.origin,
                i.license,
                i.availability === "ограничен" ? "ограничен" : "",
            ]),
        ].join("");
        const startInner =
            i.start && i.start.length
                ? `<ul class="detail__list">${i.start
                      .map(
                          (s) =>
                              `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗︎</a></li>`,
                      )
                      .join("")}</ul>`
                : "";
        // Связанные карточки — квадратные кнопки с лого, открывают свою модалку
        const relLinks = (names) =>
            (names || [])
                .map((n) => {
                    const t = byName(n);
                    if (!t) return "";
                    const logo = t.logo
                        ? `<img class="detail__rel-logo${t.logoInvert ? " is-invert" : ""}" src="logos/${t.logo}" alt="">`
                        : `<span class="detail__rel-logo detail__rel-logo--ph">1С</span>`;
                    return `<button type="button" class="detail__rel" data-i="${D.items.indexOf(t)}">${logo}<span>${t.name}</span></button>`;
                })
                .filter(Boolean)
                .join("");
        const analogsInner = relLinks(i.analogs);
        const dependsInner = relLinks(i.depends);

        dlg.querySelector(".detail__body").innerHTML = `
      <button class="detail__close" aria-label="Закрыть">✕</button>
      <header class="detail__head">
        ${logoMarkup(i, "detail__logo")}
        <div class="detail__headtext">
          <h2 class="detail__title">${wbr(i.name)}</h2>
          <p class="detail__sub">${i.subcategory ? `${i.category} · ${i.subcategory}` : i.category}</p>
          ${badges.trim() ? `<div class="detail__badges">${badges}</div>` : ""}
        </div>
      </header>
      <div class="detail__scroll">
        <div class="detail__content">
          ${row("Зачем нужно", i.why ? `<p>${i.why}</p>` : "")}
          ${row("С чего начать", startInner)}
          ${row("Аналоги", analogsInner ? `<div class="detail__rels">${analogsInner}</div>` : "")}
          ${row("Зависимости", dependsInner ? `<div class="detail__rels">${dependsInner}</div>` : "")}
          ${row("Роль", i.roles && i.roles.length ? `<div class="detail__tags">${tags(i.roles)}</div>` : "")}
          ${row("Контекст", i.contexts && i.contexts.length ? `<div class="detail__tags">${tags(i.contexts)}</div>` : "")}
        </div>
        <footer class="detail__foot">${links}${report(i)}</footer>
      </div>`;
        dlg.querySelector(".detail__close").addEventListener("click", () =>
            dlg.close(),
        );
        dlg.querySelectorAll(".detail__rel").forEach((btn) =>
            btn.addEventListener("click", () =>
                openDetail(D.items[+btn.dataset.i]),
            ),
        );
        // Шапка схлопывается, как только середина прокручена
        const scroll = dlg.querySelector(".detail__scroll");
        const head = dlg.querySelector(".detail__head");
        scroll.addEventListener("scroll", () =>
            head.classList.toggle("is-compact", scroll.scrollTop > 4),
        );
        if (!dlg.open) dlg.showModal();
        writeTool(i.name);
    }

    window.openDetail = openDetail;

    // Закрытие по клику на подложку
    const dlg = $("#detail");
    if (dlg) {
        dlg.addEventListener("click", (e) => {
            if (e.target.id === "detail") dlg.close();
        });
        // «close» ловит все пути закрытия (крестик, подложка, Esc)
        dlg.addEventListener("close", () => writeTool(null));
        // Пришли по дип-линку — сразу открываем карточку
        const wanted = new URLSearchParams(location.search).get("tool");
        if (wanted) {
            const it = D.items.find(
                (x) => x.name.toLowerCase() === wanted.toLowerCase(),
            );
            if (it) openDetail(it);
        }
    }
})();
