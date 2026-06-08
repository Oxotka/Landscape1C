(() => {
  const D = window.LANDSCAPE;
  const $ = s => document.querySelector(s);

  // Оси разметки: multi — массив значений, single — одно значение.
  const AXES = [
    { key: "role",     field: "roles",    multi: true },
    { key: "context",  field: "contexts", multi: true },
    { key: "maturity", field: "maturity", multi: false },
    { key: "origin",   field: "origin",   multi: false },
    { key: "license",  field: "license",  multi: false },
  ];

  const escH = s => String(s ?? "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const wbr = s => escH(s).replace(/([.:/])/g, "$1<wbr>");   // точки переноса в длинных именах
  const escA = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ── Автосохранение в браузере ─────────────
  const KEY = "landscape-editor-data";
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ categories: D.categories, axes: D.axes, items: D.items }));
      const el = $("#saved");
      if (el) el.textContent = "автосохранено · " + new Date().toLocaleTimeString("ru-RU");
    } catch { /* приватный режим / нет места — молча игнорируем */ }
  }
  function loadSaved() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const o = JSON.parse(raw);
      D.categories = o.categories;
      D.axes = o.axes;
      D.items = o.items.map(it => ({ umbrella: false, ...it }));
      return true;
    } catch { return false; }
  }

  // Карточка размечена, если заполнены все обязательные метки.
  const isMarked = i => i.maturity && i.origin && i.license && i.roles.length && i.contexts.length;

  let query = "";

  // ── Рендер доски ──────────────────────────
  function render() {
    const board = $("#board");
    board.innerHTML = "";
    const visible = D.items.filter(i => {
      if (!query) return true;
      return (i.name + " " + i.description).toLowerCase().includes(query);
    });

    D.categories.forEach(catName => {
      const items = visible.filter(i => i.category === catName);
      if (!items.length) return;
      const cat = document.createElement("section");
      cat.className = "cat";
      cat.innerHTML = `<div class="cat__head"><h2 class="cat__name">${escH(catName)}</h2><span class="cat__num">${items.length}</span></div>`;
      const cards = document.createElement("div");
      cards.className = "cards";
      items.forEach(i => cards.appendChild(card(i)));
      cat.appendChild(cards);
      board.appendChild(cat);
    });

    $("#empty").hidden = visible.length > 0;
    const marked = D.items.filter(isMarked).length;
    $("#progress").textContent = `Размечено ${marked} из ${D.items.length}`;
    save();
  }

  function badge(v, cls = "badge--ghost") {
    return v ? `<span class="badge ${cls}">${escH(v)}</span>` : "";
  }

  function card(i) {
    const el = document.createElement("button");
    el.className = "card";
    el.dataset.mat = i.maturity || "";
    el.dataset.marked = isMarked(i) ? "yes" : "no";
    const labels = [
      badge(i.maturity, "badge--mat"), badge(i.origin), badge(i.license),
      ...i.roles.map(r => badge(r)), ...i.contexts.map(c => badge(c)),
    ].filter(Boolean).join("");
    el.innerHTML = `
      <div class="card__top">
        <span class="card__logo card__logo--ph">1С</span>
        <div class="card__name">${wbr(i.name)}</div>
      </div>
      <div class="card__desc">${escH(i.description).slice(0, 120)}</div>
      <div class="card__meta">${labels || '<span class="badge badge--ghost">нет меток</span>'}</div>
      <div class="card__flags">
        ${isMarked(i) ? "" : '<span class="flag flag--todo">не размечено</span>'}
        ${i.umbrella ? '<span class="flag flag--umb">зонтик · раздробить</span>' : ""}
      </div>`;
    el.addEventListener("click", () => openEdit(i));
    return el;
  }

  // ── Форма редактирования ──────────────────
  const textRow = (label, field, val) =>
    `<label class="edit__field"><span>${label}</span><input data-field="${field}" value="${escA(val)}"></label>`;
  const areaRow = (label, field, val) =>
    `<label class="edit__field"><span>${label}</span><textarea data-field="${field}" rows="2">${escH(val)}</textarea></label>`;
  const selectRow = (label, field, val, opts) =>
    `<label class="edit__field"><span>${label}</span><select data-field="${field}">${
      opts.map(o => `<option value="${escA(o)}"${o === val ? " selected" : ""}>${escH(o)}</option>`).join("")
    }</select></label>`;

  function openEdit(i) {
    const dlg = $("#edit");
    dlg.innerHTML = `
      <div class="detail__body edit__body">
        <button class="detail__close" aria-label="Закрыть">✕</button>
        <h2 class="edit__title">Карточка</h2>
        ${textRow("Название", "name", i.name)}
        <div class="edit__grid2">
          ${selectRow("Категория", "category", i.category, D.categories)}
          ${textRow("Подкатегория", "subcategory", i.subcategory || "")}
        </div>
        ${areaRow("Описание", "description", i.description)}
        ${areaRow("Зачем нужно", "why", i.why)}
        <div class="edit__grid2">
          ${textRow("Сайт", "homepage", i.homepage || "")}
          ${textRow("Репозиторий", "repo", i.repo || "")}
        </div>
        <div id="axisbox"></div>
        <div class="edit__row">
          <h3>С чего начать</h3>
          <div id="startbox"></div>
          <button id="startadd" class="lnkbtn">+ ссылка</button>
        </div>
        <div class="edit__foot">
          <button id="del" class="lnkbtn lnkbtn--danger">Удалить карточку</button>
          <button id="done" class="btn btn--primary">Готово</button>
        </div>
      </div>`;

    // Текстовые поля → пишем сразу в объект. Пустую строку для homepage/repo/subcategory храним как null.
    dlg.querySelectorAll("[data-field]").forEach(inp => {
      inp.addEventListener("input", () => {
        const f = inp.dataset.field, v = inp.value;
        i[f] = (v === "" && ["homepage", "repo", "subcategory"].includes(f)) ? null : v;
        save();
      });
    });

    const ax = dlg.querySelector("#axisbox");
    AXES.forEach(a => ax.appendChild(axisGroup(a, i)));

    renderStart(i);
    dlg.querySelector("#startadd").addEventListener("click", () => {
      i.start.push({ label: "", url: "" });
      renderStart(i);
      save();
    });

    dlg.querySelector(".detail__close").addEventListener("click", () => dlg.close());
    dlg.querySelector("#done").addEventListener("click", () => dlg.close());
    dlg.querySelector("#del").addEventListener("click", () => {
      if (confirm(`Удалить «${i.name}»?`)) { D.items.splice(D.items.indexOf(i), 1); dlg.close(); }
    });
    dlg.addEventListener("close", render, { once: true });
    dlg.showModal();
  }

  // Группа чипов по оси. Значения берутся строго из axes.*.values (инвариант).
  function axisGroup(a, i) {
    const meta = D.axes[a.key];
    const wrap = document.createElement("div");
    wrap.className = "edit__row";
    wrap.innerHTML = `<h3>${meta.label}${a.multi ? "" : ' · <span class="req">одно</span>'}</h3>`;
    const chips = document.createElement("div");
    chips.className = "chips";
    meta.values.forEach(v => {
      const c = document.createElement("button");
      c.className = "chip";
      c.textContent = v;
      c.setAttribute("aria-pressed", a.multi ? i[a.field].includes(v) : i[a.field] === v);
      c.addEventListener("click", () => {
        if (a.multi) {
          const arr = i[a.field], k = arr.indexOf(v);
          if (k >= 0) arr.splice(k, 1); else arr.push(v);
          c.setAttribute("aria-pressed", arr.includes(v));
        } else {
          i[a.field] = i[a.field] === v ? "" : v;          // повторный клик снимает выбор
          chips.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x.textContent === i[a.field]));
        }
        save();
      });
      chips.appendChild(c);
    });
    wrap.appendChild(chips);
    return wrap;
  }

  function renderStart(i) {
    const box = $("#startbox");
    box.innerHTML = "";
    i.start.forEach((s, idx) => {
      const row = document.createElement("div");
      row.className = "startrow";
      row.innerHTML = `
        <input placeholder="подпись" value="${escA(s.label)}">
        <input placeholder="https://…" value="${escA(s.url)}">
        <button class="lnkbtn lnkbtn--danger" title="Удалить">✕</button>`;
      const [labelInp, urlInp] = row.querySelectorAll("input");
      labelInp.addEventListener("input", () => { s.label = labelInp.value; save(); });
      urlInp.addEventListener("input", () => { s.url = urlInp.value; save(); });
      row.querySelector("button").addEventListener("click", () => { i.start.splice(idx, 1); renderStart(i); save(); });
      box.appendChild(row);
    });
  }

  // ── Экспорт / импорт ──────────────────────
  function buildData() {
    // umbrella — служебный флаг редактора, в data.js не выгружаем.
    const items = D.items.map(({ umbrella, ...rest }) => rest);
    return { categories: D.categories, axes: D.axes, items };
  }
  function dataJS() {
    return "// Данные ландшафта (Вариант B). Сгенерировано редактором разметки (editor.html).\n"
      + "window.LANDSCAPE = " + JSON.stringify(buildData(), null, 2) + ";\n";
  }

  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => t.hidden = true, 1800);
  }

  function blankItem() {
    return {
      name: "Новый инструмент", category: D.categories[0], subcategory: null, logo: null,
      description: "", why: "", homepage: null, repo: null, start: [],
      maturity: "", origin: "", license: "", roles: [], contexts: [], umbrella: false,
    };
  }

  $("#add").addEventListener("click", () => { const it = blankItem(); D.items.unshift(it); save(); openEdit(it); });
  $("#search").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });

  $("#reset").addEventListener("click", () => {
    if (confirm("Очистить автосохранение и вернуть исходные данные? Текущая разметка в браузере будет потеряна.")) {
      try { localStorage.removeItem(KEY); } catch {}
      location.reload();
    }
  });

  $("#export").addEventListener("click", () => {
    const blob = new Blob([dataJS()], { type: "text/javascript" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.js";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Скачан data.js");
  });
  $("#copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(dataJS()); toast("Скопировано в буфер"); }
    catch { toast("Не удалось скопировать"); }
  });

  $("#import").addEventListener("change", e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const t = String(r.result);
        const obj = JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1));
        D.categories = obj.categories;
        D.axes = obj.axes;
        D.items = obj.items.map(it => ({ umbrella: false, ...it }));
        query = ""; $("#search").value = "";
        render();
        toast(`Загружено: ${D.items.length} карточек`);
      } catch { toast("Не удалось разобрать файл"); }
    };
    r.readAsText(f);
    e.target.value = "";
  });

  // ── Старт ─────────────────────────────────
  if (loadSaved()) toast("Восстановлен сохранённый прогресс");
  render();
})();
