// Лента событий из сохраненной истории карточек.
(function () {
    "use strict";
    const list = document.querySelector("#updates-list");
    const items = new Map(window.LANDSCAPE.items.map((i) => [i.name, i]));
    const labels = {
        maturity: "Зрелость",
        roles: "Роли",
        contexts: "Контексты",
        category: "Категория",
        subcategory: "Подкатегория",
        license: "Лицензия",
        origin: "Происхождение",
        availability: "Доступность",
        description: "Описание",
        why: "Зачем нужен",
        start: "С чего начать",
        homepage: "Сайт",
        repo: "Репозиторий",
        analogs: "Аналоги",
        depends: "Зависимости",
        hidden: "Видимость",
        hiddenReason: "Причина скрытия",
        logo: "Логотип",
        logoInvert: "Инверсия логотипа в темной теме",
    };
    const clean = (text) => String(text).replace(/ё/g, "е").replace(/Ё/g, "Е");
    function value(v, field) {
        if (field === "hidden") return v ? "скрыт с карты" : "виден на карте";
        if (typeof v === "boolean") return v ? "да" : "нет";
        if (v == null || v === "" || (Array.isArray(v) && !v.length))
            return "не указано";
        if (Array.isArray(v))
            return v
                .map((x) =>
                    typeof x === "object" ? `${x.label}: ${x.url}` : x,
                )
                .join(", ");
        return String(v);
    }
    function group(date) {
        return new Date(date + "T12:00:00").toLocaleDateString("ru-RU", {
            month: "long",
            year: "numeric",
        });
    }
    function span(className, text) {
        const el = document.createElement("span");
        el.className = className;
        el.textContent = clean(text);
        return el;
    }
    const tagFields = new Set([
        "maturity",
        "roles",
        "contexts",
        "category",
        "subcategory",
        "license",
        "origin",
        "availability",
        "analogs",
        "depends",
    ]);
    const infoFields = {
        description: "описание",
        why: "зачем нужен",
        start: "с чего начать",
        homepage: "сайт",
        repo: "репозиторий",
    };
    function tag(text, field, added) {
        const wrap = span(
            "update-diff" +
                (added === null ? "" : added ? " is-added" : " is-removed"),
            "",
        );
        if (added !== null) {
            wrap.append(span("update-sign", added ? "+" : "−"));
            wrap.setAttribute(
                "aria-label",
                (added ? "Добавлено: " : "Убрано: ") + clean(text),
            );
        }
        const chip = span(
            "badge " + (field === "maturity" ? "badge--mat" : "badge--ghost"),
            text,
        );
        if (field === "maturity") chip.dataset.mat = text;
        wrap.append(chip);
        return wrap;
    }
    function changeLine(change) {
        const line = span("update-change", "");
        line.append(span("update-field", `${labels[change.field]}: `));
        const values = (v) => (Array.isArray(v) ? v : v ? [v] : []);
        if (change.field === "maturity") {
            if (change.before)
                line.append(tag(change.before, change.field, null));
            if (change.before && change.after)
                line.append(span("update-arrow", "→"));
            if (change.after)
                line.append(tag(change.after, change.field, null));
        } else if (change.field === "hidden") {
            line.append(
                change.after
                    ? span("badge badge--hidden", "Скрыт с карты")
                    : span("update-text", value(change.after, change.field)),
            );
        } else if (change.field === "hiddenReason") {
            line.append(span("update-text", change.after || "убрана"));
        } else if (tagFields.has(change.field)) {
            const before = values(change.before);
            const after = values(change.after);
            if (
                ["roles", "contexts", "analogs", "depends"].includes(
                    change.field,
                )
            ) {
                after.forEach((v) =>
                    line.append(
                        tag(v, change.field, before.includes(v) ? null : true),
                    ),
                );
                before
                    .filter((v) => !after.includes(v))
                    .forEach((v) => line.append(tag(v, change.field, false)));
                return line;
            }
            before
                .filter((v) => !after.includes(v))
                .forEach((v) => line.append(tag(v, change.field, false)));
            after
                .filter((v) => !before.includes(v))
                .forEach((v) => line.append(tag(v, change.field, true)));
        } else {
            if (change.before != null && change.before !== "") {
                line.append(
                    span(
                        "update-text is-removed",
                        "− " + value(change.before, change.field),
                    ),
                );
            }
            if (change.after != null && change.after !== "") {
                line.append(
                    span(
                        "update-text is-added",
                        "+ " + value(change.after, change.field),
                    ),
                );
            }
        }
        return line;
    }
    function eventKind(event) {
        return event.changes.some(
            (change) => change.field === "hidden" && change.after === true,
        )
            ? "hidden"
            : event.type;
    }
    function eventRow(event) {
        const kind = eventKind(event);
        const item = items.get(event.name);
        const row = document.createElement("div");
        const main = document.createElement(item ? "button" : "div");
        if (item) {
            main.type = "button";
            main.addEventListener("click", () => window.openDetail(item));
        }
        row.className = "update-row";
        main.className = "update-main";
        const logo = document.createElement("span");
        logo.innerHTML = window.LandscapeUI.logoMarkup(
            item || { logo: null },
            "update-logo",
        );
        const content = span("update-content", "");
        const name = document.createElement("strong");
        name.textContent = clean(event.name);
        content.append(name);
        if (!item) {
            content.append(
                span(
                    "update-missing",
                    "Карточка под этим названием недоступна",
                ),
            );
        }
        if (event.type === "added") {
            content.append(
                span(
                    "update-change",
                    item ? item.description : "Инструмент добавлен в ландшафт",
                ),
            );
            content.append(span("update-added-note", "Добавлен в ландшафт"));
        } else {
            let infoShown = false;
            const reasons = new Set();
            for (const change of event.changes) {
                if (change.field === "hiddenReason" && change.after) {
                    reasons.add(change.after);
                } else if (infoFields[change.field]) {
                    if (!infoShown) {
                        const fields = event.changes
                            .filter((c) => infoFields[c.field])
                            .map((c) => infoFields[c.field]);
                        const info = span("update-change update-links", "");
                        info.append(
                            span(
                                "update-info-label",
                                "Актуализация информации:",
                            ),
                        );
                        const sections = document.createElement("strong");
                        sections.textContent = fields.join(", ");
                        info.append(sections);
                        content.append(info);
                    }
                    infoShown = true;
                } else {
                    content.append(changeLine(change));
                }
                if (change.reason) reasons.add(change.reason);
            }
            reasons.forEach((reason) => {
                const line = span("update-reason", "");
                line.append(span("update-reason__label", "Причина: "));
                line.append(document.createTextNode(clean(reason)));
                content.append(line);
            });
        }
        const meta = span("update-meta", "");
        const badge = span(
            "update-badge" +
                (kind === "added"
                    ? " is-added"
                    : kind === "hidden"
                      ? " badge badge--hidden"
                      : ""),
            kind === "added"
                ? "Добавлен"
                : kind === "hidden"
                  ? "Скрыт с карты"
                  : "Обновлен",
        );
        const date = document.createElement("time");
        date.dateTime = event.date;
        date.textContent = new Date(
            event.date + "T12:00:00",
        ).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className =
            "update-meta__toggle" +
            (kind === "added"
                ? " is-added"
                : kind === "hidden"
                  ? " is-hidden"
                  : "");
        toggle.setAttribute(
            "aria-label",
            "Сведения об изменении: " + event.name,
        );
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML =
            kind === "added"
                ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
                : kind === "hidden"
                  ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.5 5.4A10.6 10.6 0 0 1 12 5c5 0 8.5 4.3 9.5 7a12.6 12.6 0 0 1-2.3 3.3M6.2 6.4A13.3 13.3 0 0 0 2.5 12c1 2.7 4.5 7 9.5 7a10.6 10.6 0 0 0 4.3-.9"/></svg>'
                  : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-.8L19 8.4a2.4 2.4 0 0 0-3.4-3.4L4.8 15.8 4 20ZM13.8 6.8l3.4 3.4"/></svg>';
        const details = span("update-meta__details", "");
        details.append(badge, date);
        toggle.addEventListener("click", () => {
            const opened = toggle.getAttribute("aria-expanded") === "true";
            closeMeta();
            toggle.setAttribute("aria-expanded", String(!opened));
        });
        meta.append(toggle, details);
        main.append(logo, content);
        row.append(main, meta);
        return row;
    }
    function closeMeta() {
        list.querySelectorAll(
            '.update-meta__toggle[aria-expanded="true"]',
        ).forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
    }
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".update-meta")) closeMeta();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const open = list.querySelector(
                '.update-meta__toggle[aria-expanded="true"]',
            );
            if (open) {
                closeMeta();
                open.focus();
            }
        }
    });
    const allEvents = window.LANDSCAPE_CHANGES;
    const more = document.querySelector("#updates-more");
    const search = document.querySelector("#updates-search");
    const searchTop = document.querySelector("#updates-search-top");
    const searchMedia = matchMedia("(max-width: 720px)");
    const updateSearchPlaceholder = () => {
        searchTop.placeholder = searchMedia.matches
            ? "Поиск"
            : "Поиск инструмента…";
    };
    updateSearchPlaceholder();
    searchMedia.addEventListener("change", updateSearchPlaceholder);
    const filters = document.querySelectorAll("[data-update-filter]");
    const selected = new Set();
    let events = allEvents;
    let shown = 0;
    let lastGroup;
    function showMore(end = events.length) {
        for (const event of events.slice(shown, end)) {
            const heading = group(event.date);
            if (heading !== lastGroup) {
                const h = document.createElement("h2");
                h.className = "updates-heading";
                h.textContent = heading;
                list.append(h);
                lastGroup = heading;
            }
            list.append(eventRow(event));
        }
        shown = end;
        more.hidden = shown === events.length;
        document.querySelector("#updates-count").textContent = events.length
            ? `Показано ${shown} из ${events.length}`
            : "Изменений не найдено. Попробуйте другой запрос или отбор.";
    }
    function render() {
        const query = clean(search.value.trim().toLocaleLowerCase("ru"));
        events = allEvents.filter((event) => {
            const item = items.get(event.name);
            const names = [event.name, ...(item?.aliases || [])];
            const found =
                !query ||
                names.some((name) =>
                    clean(name.toLocaleLowerCase("ru")).includes(query),
                );
            const kinds = ["added", "updated", "hidden"].filter((kind) =>
                selected.has(kind),
            );
            const fields = [...selected].filter(
                (filter) => !["added", "updated", "hidden"].includes(filter),
            );
            const matchesKind =
                !kinds.length || kinds.includes(eventKind(event));
            const matchesField =
                !fields.length ||
                event.changes.some((change) => fields.includes(change.field));
            return found && matchesKind && matchesField;
        });
        list.replaceChildren();
        shown = 0;
        lastGroup = undefined;
        showMore(Math.min(40, events.length));
    }
    search.addEventListener("input", () => {
        searchTop.value = search.value;
        render();
    });
    searchTop.addEventListener("input", () => {
        search.value = searchTop.value;
        render();
    });
    filters.forEach((button) =>
        button.addEventListener("click", () => {
            const filter = button.dataset.updateFilter;
            if (selected.has(filter)) selected.delete(filter);
            else selected.add(filter);
            button.setAttribute("aria-pressed", String(selected.has(filter)));
            render();
        }),
    );
    more.addEventListener("click", () => showMore());
    render();
})();
