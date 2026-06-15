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

    // Иконки кнопки «Поделиться»: значок share и галочка-подтверждение
    const shareSvg =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>';
    const checkSvg =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

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
        <button class="detail__share" type="button" aria-label="Поделиться" title="Поделиться · скопировать ссылку">${shareSvg}</button>
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
        // «Поделиться»: системный share на тач-устройствах, иначе копируем ссылку
        const shareBtn = dlg.querySelector(".detail__share");
        shareBtn.addEventListener("click", async () => {
            const url =
                location.origin +
                location.pathname +
                "?tool=" +
                encodeURIComponent(i.name);
            if (navigator.share && matchMedia("(pointer: coarse)").matches) {
                try {
                    await navigator.share({ title: i.name, url });
                } catch (e) {}
                return;
            }
            try {
                await navigator.clipboard.writeText(url);
                shareBtn.innerHTML = checkSvg;
                shareBtn.classList.add("is-done");
                setTimeout(() => {
                    shareBtn.innerHTML = shareSvg;
                    shareBtn.classList.remove("is-done");
                }, 1600);
            } catch (e) {}
        });
        dlg.querySelectorAll(".detail__rel").forEach((btn) =>
            btn.addEventListener("click", () =>
                openDetail(D.items[+btn.dataset.i]),
            ),
        );
        // Шапка схлопывается при прокрутке. Гистерезис (24/4) + запас по
        // переполнению, иначе схлопывание само убирает скролл и шапка дергается
        const scroll = dlg.querySelector(".detail__scroll");
        const head = dlg.querySelector(".detail__head");
        let compact = false;
        scroll.addEventListener("scroll", () => {
            if (!compact) {
                const overflow = scroll.scrollHeight - scroll.clientHeight;
                if (scroll.scrollTop > 24 && overflow > 140)
                    (head.classList.add("is-compact"), (compact = true));
            } else if (scroll.scrollTop <= 4) {
                head.classList.remove("is-compact");
                compact = false;
            }
        });
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
