(() => {
  const D = window.LANDSCAPE;
  const AXES = ["role", "context", "maturity", "origin", "license"];
  // Поля элемента, по которым фильтруем (role/context — массивы)
  const FIELD = { role: "roles", context: "contexts", maturity: "maturity", origin: "origin", license: "license" };

  // Состояние фильтров: для каждой оси — Set выбранных значений
  const state = {};
  AXES.forEach(a => state[a] = new Set());
  let query = "";

  const $ = sel => document.querySelector(sel);
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  // Точки переноса в длинных именах без пробелов: «1С:Предприятие.Элемент».
  const wbr = s => s.replace(/([.:/])/g, "$1<wbr>");

  // ── Рендер фильтров ───────────────────────
  function renderFilters() {
    const box = $("#filters");
    box.innerHTML = "";
    AXES.forEach(axis => {
      const { label, values } = D.axes[axis];
      const group = document.createElement("div");
      group.className = "fgroup" + (axis === "role" || axis === "context" ? " fgroup--axis" : "");
      group.innerHTML = `<p class="fgroup__head">${label}</p>`;
      const chips = document.createElement("div");
      chips.className = "chips";
      values.forEach(val => {
        const chip = document.createElement("button");
        chip.className = "chip";
        chip.textContent = val;
        chip.setAttribute("aria-pressed", "false");
        chip.addEventListener("click", () => toggle(axis, val, chip));
        chips.appendChild(chip);
      });
      group.appendChild(chips);
      box.appendChild(group);
    });
  }

  // ── Стартовые наборы по контексту ─────────
  function renderKits() {
    const row = $("#kits");
    D.axes.context.values.forEach(ctx => {
      const b = document.createElement("button");
      b.className = "kit";
      b.textContent = ctx;
      b.setAttribute("aria-pressed", "false");
      b.dataset.ctx = ctx;
      b.addEventListener("click", () => selectKit(ctx));
      row.appendChild(b);
    });
  }

  function selectKit(ctx) {
    // Набор = выбрать только этот контекст, прочие оси сбросить
    AXES.forEach(a => state[a].clear());
    state.context.add(ctx);
    syncControls();
    apply();
  }

  function toggle(axis, val, el) {
    const set = state[axis];
    if (set.has(val)) set.delete(val); else set.add(val);
    el.setAttribute("aria-pressed", set.has(val));
    syncKits();
    apply();
  }

  // Привести чипы/наборы в соответствие состоянию
  function syncControls() {
    document.querySelectorAll(".chip").forEach(c => {
      const axis = c.closest(".fgroup").querySelector(".fgroup__head").textContent;
      const a = AXES.find(x => D.axes[x].label === axis);
      c.setAttribute("aria-pressed", state[a].has(c.textContent));
    });
    syncKits();
  }
  function syncKits() {
    document.querySelectorAll(".kit").forEach(k => {
      const onlyThis = state.context.has(k.dataset.ctx) && state.context.size === 1;
      k.setAttribute("aria-pressed", String(onlyThis));
    });
  }

  // ── Фильтрация ────────────────────────────
  function matches(item) {
    if (query) {
      const hay = (item.name + " " + item.description).toLowerCase();
      if (!hay.includes(query)) return false;
    }
    for (const axis of AXES) {
      const set = state[axis];
      if (!set.size) continue;
      const field = item[FIELD[axis]];
      const ok = Array.isArray(field)
        ? [...set].some(v => field.includes(v))
        : set.has(field);
      if (!ok) return false;
    }
    return true;
  }

  // ── Рендер доски ──────────────────────────
  function apply() {
    const board = $("#board");
    board.innerHTML = "";
    const visible = D.items.filter(matches);

    D.categories.forEach(catName => {
      const items = visible.filter(i => i.category === catName);
      if (!items.length) return;
      const cat = document.createElement("section");
      cat.className = "cat";
      cat.innerHTML = `<div class="cat__head"><h2 class="cat__name">${catName}</h2><span class="cat__num">${items.length}</span></div>`;
      const cards = document.createElement("div");
      cards.className = "cards";
      items.forEach(i => cards.appendChild(card(i)));
      cat.appendChild(cards);
      board.appendChild(cat);
    });

    $("#empty").hidden = visible.length > 0;
    $("#count").textContent = `${visible.length} из ${D.items.length} инструментов`;
    const active = AXES.some(a => state[a].size) || query;
    $("#reset").hidden = !active;
    writeUrl();
  }

  // ── Состояние в URL (шаринг) ──────────────
  function writeUrl() {
    const params = new URLSearchParams();
    AXES.forEach(a => { if (state[a].size) params.set(a, [...state[a]].join(",")); });
    if (query) params.set("q", query);
    const qs = params.toString();
    history.replaceState(null, "", qs ? "?" + qs : location.pathname);
  }
  function readUrl() {
    const params = new URLSearchParams(location.search);
    AXES.forEach(a => {
      const raw = params.get(a);
      if (!raw) return;
      const allowed = D.axes[a].values;
      raw.split(",").forEach(v => { if (allowed.includes(v)) state[a].add(v); });
    });
    const q = params.get("q");
    if (q) { query = q.toLowerCase(); $("#search").value = q; }
  }

  function logoMarkup(i, cls) {
    return i.logo
      ? `<span class="${cls}"><img src="logos/${i.logo}" alt="" loading="lazy"></span>`
      : `<span class="${cls} ${cls}--ph">1С</span>`;
  }

  function card(i) {
    const el = document.createElement("button");
    el.className = "card";
    el.dataset.mat = i.maturity;
    el.innerHTML = `
      <div class="card__top">
        ${logoMarkup(i, "card__logo")}
        <div class="card__name">${wbr(i.name)}</div>
      </div>
      <div class="card__desc">${i.description}</div>
      <div class="card__meta">
        <span class="badge badge--mat">${i.maturity}</span>
        <span class="badge badge--ghost">${i.origin}</span>
        <span class="badge badge--ghost">${i.license}</span>
      </div>`;
    el.addEventListener("click", () => openDetail(i));
    return el;
  }

  // ── Детальная карточка ────────────────────
  function openDetail(i) {
    const dlg = $("#detail");
    const links = [
      i.homepage ? `<a href="${i.homepage}" target="_blank" rel="noopener">Сайт ↗</a>` : "",
      i.repo ? `<a href="${i.repo}" target="_blank" rel="noopener">Репозиторий ↗</a>` : ""
    ].filter(Boolean).join("");
    const tags = arr => arr.map(v => `<span class="badge badge--ghost">${v}</span>`).join("");
    const startBlock = (i.start && i.start.length)
      ? `<div class="detail__row"><h3>С чего начать</h3><ul class="detail__list">${
          i.start.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a></li>`).join("")
        }</ul></div>`
      : "";
    dlg.querySelector(".detail__body").innerHTML = `
      <button class="detail__close" aria-label="Закрыть">✕</button>
      <div class="detail__head">
        ${logoMarkup(i, "detail__logo")}
        <div>
          <h2>${wbr(i.name)}</h2>
          <p class="detail__sub">${i.subcategory ? `${i.category} · ${i.subcategory}` : i.category}</p>
        </div>
      </div>
      <div class="detail__meta">
        <span class="badge badge--mat" data-mat="${i.maturity}" style="--mat:var(--m-${matKey(i.maturity)})">${i.maturity}</span>
        ${tags([i.origin, i.license])}
      </div>
      <div class="detail__row"><h3>Зачем нужно</h3><p>${i.why}</p></div>
      ${startBlock}
      <div class="detail__row"><h3>Роль</h3><div class="detail__meta">${tags(i.roles)}</div></div>
      <div class="detail__row"><h3>Контекст работы</h3><div class="detail__meta">${tags(i.contexts)}</div></div>
      <div class="detail__row"><h3>Подробнее</h3><div class="detail__links">${links || "—"}</div></div>`;
    dlg.querySelector(".detail__close").addEventListener("click", () => dlg.close());
    dlg.showModal();
  }
  function matKey(m) {
    return { "базовое": "base", "продвинутое": "adv", "нишевое": "niche", "устаревает": "legacy" }[m];
  }

  // ── Сброс / поиск ─────────────────────────
  $("#reset").addEventListener("click", () => {
    AXES.forEach(a => state[a].clear());
    query = ""; $("#search").value = "";
    syncControls(); apply();
  });
  $("#search").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); apply(); });
  $("#detail").addEventListener("click", e => { if (e.target.id === "detail") e.target.close(); });

  // ── Старт ─────────────────────────────────
  renderFilters();
  renderKits();
  readUrl();
  syncControls();
  apply();
})();
