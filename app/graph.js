// Граф связей ландшафта: force-directed на canvas, без зависимостей.
// Узлы — инструменты (логотипы), ребра — analogs/depends, цвет — по блоку.
(() => {
    const D = window.LANDSCAPE;
    const canvas = document.getElementById("graph");
    const wrap = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    // ── Цвета блоков ──────────────────────────
    const BLOCK_COLORS = {
        Проектирование: "#3a7ca5",
        Разработка: "#2d7d3a",
        Качество: "#b5471f",
        "Инфраструктура и эксплуатация": "#c08a1e",
        "Данные и интеграции": "#6a4ca3",
        "Управление и компетенции": "#c2466b",
    };
    const catBlock = {};
    (D.blocks || []).forEach((b) =>
        b.categories.forEach((c) => (catBlock[c] = b.name)),
    );
    const blockOf = (it) => catBlock[it.category] || "—";
    const colorOf = (it) => BLOCK_COLORS[blockOf(it)] || "#888";

    // Якорь блока — точка на круге; к нему притягиваются узлы блока (кластеры расходятся)
    const blockNames = (D.blocks || []).map((b) => b.name);
    const BLOCK_R = 340;
    const blockAnchor = {};
    blockNames.forEach((name, i) => {
        const a =
            (i / Math.max(1, blockNames.length)) * Math.PI * 2 - Math.PI / 2;
        blockAnchor[name] = {
            x: Math.cos(a) * BLOCK_R,
            y: Math.sin(a) * BLOCK_R,
        };
    });
    const anchorOf = (it) => blockAnchor[blockOf(it)] || { x: 0, y: 0 };

    // ── Узлы и связи ──────────────────────────
    // Радиус растет со степенью (числом связей), но с потолком — чтобы хабы
    // вроде git становились заметнее, но не разрастались и не глушили схему
    const R_BASE = 17,
        R_MAX = 30;
    const nodeR = (deg) => Math.min(R_MAX, R_BASE + 3 * Math.sqrt(deg));
    // Инвертированная версия лого для темной темы. Делаем настоящую инверсию
    // цвета (как CSS filter:invert(1) на доске) — тогда и монохромные знаки на
    // прозрачном фоне, и цветные тайлы (JSON Editor, IIS) в графе выглядят так
    // же, как в ландшафте. Если canvas «запачкан» (открытие через file://) и
    // getImageData недоступен — откатываемся на светлый силуэт по форме.
    function invertedLogo(img) {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const x = c.getContext("2d");
        x.drawImage(img, 0, 0);
        try {
            const d = x.getImageData(0, 0, c.width, c.height);
            const p = d.data;
            for (let i = 0; i < p.length; i += 4) {
                p[i] = 255 - p[i];
                p[i + 1] = 255 - p[i + 1];
                p[i + 2] = 255 - p[i + 2]; // альфу не трогаем
            }
            x.putImageData(d, 0, 0);
        } catch (e) {
            x.globalCompositeOperation = "source-in";
            x.fillStyle = "#fff";
            x.fillRect(0, 0, c.width, c.height);
        }
        return c;
    }
    const nodes = D.items.map((it) => {
        const an = anchorOf(it); // стартуем рядом с якорем блока — кластеры сразу разнесены
        const n = {
            id: it.name,
            item: it,
            ax: an.x,
            ay: an.y,
            x: an.x + (Math.random() - 0.5) * 100,
            y: an.y + (Math.random() - 0.5) * 100,
            vx: 0,
            vy: 0,
            r: R_BASE,
            deg: 0,
        };
        if (it.logo) {
            const img = new Image();
            img.src = "logos/" + it.logo;
            n.img = img;
            // Инвертированную версию печем заранее (см. invertedLogo)
            if (it.logoInvert) {
                const bake = () => (n.imgInv = invertedLogo(img));
                if (img.complete && img.naturalWidth) bake();
                else img.addEventListener("load", bake);
            }
        }
        return n;
    });
    const byName = {};
    nodes.forEach((n) => (byName[n.id] = n));

    const links = [];
    const seen = new Set();
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = new Set()));
    const addLink = (aName, bName, type) => {
        const a = byName[aName],
            b = byName[bName];
        if (!a || !b || a === b) return;
        const key = [a.id, b.id].sort().join("∞");
        if (seen.has(key)) return;
        seen.add(key);
        links.push({ a, b, type });
        a.deg++;
        b.deg++;
        adj[a.id].add(b.id);
        adj[b.id].add(a.id);
    };
    D.items.forEach((it) => {
        (it.analogs || []).forEach((n) => addLink(it.name, n, "analog"));
        (it.depends || []).forEach((n) => addLink(it.name, n, "depends"));
    });
    nodes.forEach((n) => {
        n.vdeg = n.deg; // степень среди видимых (с учётом фильтров)
        n.r = nodeR(n.vdeg);
    });
    let live = nodes.slice(); // видимые узлы (участвуют в физике и отрисовке)

    // ── Фильтры: роль и зрелость ──────────────
    const fRole = new Set(),
        fMat = new Set();
    // Перенесенные с других страниц отборы (общий стор shared.js)
    (function hydrate() {
        const f = window.LandscapeFilters.read();
        f.role.forEach((r) => D.axes.role.values.includes(r) && fRole.add(r));
        f.maturity.forEach(
            (m) => D.axes.maturity.values.includes(m) && fMat.add(m),
        );
    })();
    const nodeVisible = (it) => {
        if (fRole.size && !(it.roles || []).some((r) => fRole.has(r)))
            return false;
        if (fMat.size && !fMat.has(it.maturity)) return false;
        return true;
    };
    function applyFilter() {
        nodes.forEach((n) => (n.hidden = !nodeVisible(n.item)));
        live = nodes.filter((n) => !n.hidden);
        const vd = {};
        live.forEach((n) => (vd[n.id] = 0));
        links.forEach((l) => {
            if (!l.a.hidden && !l.b.hidden) {
                vd[l.a.id]++;
                vd[l.b.id]++;
            }
        });
        live.forEach((n) => {
            n.vdeg = vd[n.id];
            n.r = nodeR(n.vdeg); // размер по видимым связям — обновляем при фильтрах
        });
        updateHint();
        alpha = Math.max(alpha, 0.6);
    }

    // ── Камера ────────────────────────────────
    const view = { x: 0, y: 0, scale: 0.78 };
    let W = 0,
        H = 0,
        dpr = 1,
        fitted = false;
    function resize() {
        dpr = window.devicePixelRatio || 1;
        W = wrap.clientWidth;
        H = wrap.clientHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        if (!fitted) {
            // на узких экранах сразу вписываем весь граф
            fitted = true;
            if (W < 640) view.scale = Math.min(0.6, Math.max(0.32, W / 760));
        }
    }

    // ── Физика ────────────────────────────────
    const REP = 3200,
        SPRING = 0.03,
        LINK_LEN = 72,
        CLUSTER = 0.025,
        GRAV = 0.0015,
        DAMP = 0.9;
    let alpha = 1;
    function tick() {
        for (let i = 0; i < live.length; i++) {
            const a = live[i];
            for (let j = i + 1; j < live.length; j++) {
                const b = live[j];
                let dx = a.x - b.x,
                    dy = a.y - b.y,
                    d2 = dx * dx + dy * dy;
                if (d2 < 0.01) {
                    d2 = 0.01;
                    dx = Math.random() - 0.5;
                    dy = Math.random() - 0.5;
                }
                const d = Math.sqrt(d2),
                    f = REP / d2;
                const fx = (dx / d) * f,
                    fy = (dy / d) * f;
                a.vx += fx;
                a.vy += fy;
                b.vx -= fx;
                b.vy -= fy;
                // Разведение при пересечении дисков (по сумме радиусов) — иначе
                // крупные узлы налезают; перетаскиваемый узел не сдвигаем
                const minD = a.r + b.r + 6;
                if (d < minD) {
                    const p = ((minD - d) / d) * 0.5;
                    const mx = dx * p,
                        my = dy * p;
                    if (a !== drag.node) {
                        a.x += mx;
                        a.y += my;
                    }
                    if (b !== drag.node) {
                        b.x -= mx;
                        b.y -= my;
                    }
                }
            }
        }
        links.forEach((l) => {
            if (l.a.hidden || l.b.hidden) return;
            let dx = l.b.x - l.a.x,
                dy = l.b.y - l.a.y;
            const d = Math.hypot(dx, dy) || 0.01,
                f = (d - LINK_LEN) * SPRING;
            const fx = (dx / d) * f,
                fy = (dy / d) * f;
            l.a.vx += fx;
            l.a.vy += fy;
            l.b.vx -= fx;
            l.b.vy -= fy;
        });
        live.forEach((n) => {
            n.vx += (n.ax - n.x) * CLUSTER;
            n.vy += (n.ay - n.y) * CLUSTER; // к якорю блока
            n.vx += -n.x * GRAV;
            n.vy += -n.y * GRAV; // лёгкое общее центрирование
            if (n === drag.node) {
                n.vx = 0;
                n.vy = 0;
                return;
            }
            n.vx *= DAMP;
            n.vy *= DAMP;
            const sp = Math.hypot(n.vx, n.vy);
            if (sp > 30) {
                n.vx = (n.vx / sp) * 30;
                n.vy = (n.vy / sp) * 30;
            }
            n.x += n.vx * alpha;
            n.y += n.vy * alpha;
        });
        if (alpha > 0.04) alpha *= 0.992;
    }

    // ── Цвета темы ────────────────────────────
    function theme() {
        const dark = document.documentElement.dataset.theme === "dark";
        return {
            dark,
            edge: dark ? "rgba(200,184,154,0.32)" : "rgba(26,26,26,0.12)",
            edgeHot: dark ? "rgba(220,208,188,0.78)" : "rgba(26,26,26,0.55)",
            label: dark ? "#dcd0bc" : "#1a1a1a",
            nodeFill: dark ? "#28211e" : "#f5f2ec",
            placeholder: "#a89e90",
        };
    }

    // ── Отрисовка ─────────────────────────────
    let hover = null;
    function draw() {
        const t = theme();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        ctx.setTransform(
            view.scale * dpr,
            0,
            0,
            view.scale * dpr,
            (W / 2 + view.x) * dpr,
            (H / 2 + view.y) * dpr,
        );

        links.forEach((l) => {
            if (l.a.hidden || l.b.hidden) return;
            const hot = hover && (l.a === hover || l.b === hover);
            ctx.strokeStyle = hot ? t.edgeHot : t.edge;
            ctx.lineWidth = (hot ? 1.6 : 0.7) / view.scale;
            if (l.type === "depends")
                ctx.setLineDash([4 / view.scale, 3 / view.scale]);
            else ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(l.a.x, l.a.y);
            ctx.lineTo(l.b.x, l.b.y);
            ctx.stroke();
        });
        ctx.setLineDash([]);

        live.forEach((n) => {
            const dim = hover && n !== hover && !adj[hover.id].has(n.id);
            ctx.globalAlpha = dim ? 0.18 : 1;
            const col = colorOf(n.item);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, 7);
            ctx.fillStyle = t.nodeFill;
            ctx.fill();
            ctx.lineWidth =
                (n === hover ? 3.5 : n.vdeg ? 2.2 : 1.2) / view.scale;
            if (!n.vdeg) ctx.setLineDash([3 / view.scale, 2 / view.scale]); // одиночки — пунктир
            ctx.strokeStyle = col;
            ctx.stroke();
            ctx.setLineDash([]);
            if (n.img && n.img.complete && n.img.naturalWidth) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r - 3.5, 0, 7);
                ctx.clip();
                // На темной теме монохромные лого — светлый силуэт (imgInv)
                const src =
                    t.dark && n.item.logoInvert && n.imgInv ? n.imgInv : n.img;
                const s = (n.r - 3.5) * 2 * 0.82;
                const w = s,
                    h = s * (n.img.naturalHeight / n.img.naturalWidth); // ширина — s, высота пропорционально (лого не всегда квадратные)
                ctx.drawImage(src, n.x - w / 2, n.y - h / 2, w, h);
                ctx.restore();
            } else {
                ctx.fillStyle = t.placeholder;
                ctx.font = `700 ${n.r * 0.62}px Inter, sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("1С", n.x, n.y);
            }
            const showLabel =
                view.scale > 1.5 ||
                n === hover ||
                (hover && adj[hover.id].has(n.id));
            if (showLabel) {
                ctx.fillStyle = t.label;
                ctx.font = `${(n === hover ? 13 : 11) / view.scale}px Inter, sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(n.id, n.x, n.y + n.r + 3 / view.scale);
            }
            ctx.globalAlpha = 1;
        });
    }

    function frame() {
        tick();
        draw();
        requestAnimationFrame(frame);
    }

    // ── Взаимодействие ────────────────────────
    const toWorld = (mx, my) => ({
        x: (mx - W / 2 - view.x) / view.scale,
        y: (my - H / 2 - view.y) / view.scale,
    });
    function nodeAt(mx, my) {
        const w = toWorld(mx, my);
        let best = null,
            bd = Infinity;
        live.forEach((n) => {
            const d = Math.hypot(n.x - w.x, n.y - w.y);
            if (d < n.r && d < bd) {
                bd = d;
                best = n;
            }
        });
        return best;
    }
    const drag = { node: null, panning: false, lx: 0, ly: 0, moved: 0 };
    function pos(e) {
        const r = canvas.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    canvas.addEventListener("mousemove", (e) => {
        const p = pos(e);
        if (drag.node) {
            const w = toWorld(p.x, p.y);
            drag.node.x = w.x;
            drag.node.y = w.y;
            alpha = Math.max(alpha, 0.4);
            drag.moved++;
        } else if (drag.panning) {
            view.x += p.x - drag.lx;
            view.y += p.y - drag.ly;
            drag.lx = p.x;
            drag.ly = p.y;
            drag.moved++;
        } else {
            hover = nodeAt(p.x, p.y);
            canvas.style.cursor = hover ? "pointer" : "grab";
        }
    });
    canvas.addEventListener("mousedown", (e) => {
        const p = pos(e);
        drag.moved = 0;
        const n = nodeAt(p.x, p.y);
        if (n) {
            drag.node = n;
            hover = n;
        } else {
            drag.panning = true;
            drag.lx = p.x;
            drag.ly = p.y;
        }
    });
    window.addEventListener("mouseup", (e) => {
        if (drag.node && drag.moved < 4 && window.openDetail) {
            window.openDetail(drag.node.item);
        }
        drag.node = null;
        drag.panning = false;
    });
    canvas.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            const p = pos(e),
                w = toWorld(p.x, p.y);
            const k = Math.exp(-e.deltaY * 0.0012);
            view.scale = Math.min(5, Math.max(0.3, view.scale * k));
            // зум к курсору: держим мировую точку под курсором
            view.x = p.x - W / 2 - w.x * view.scale;
            view.y = p.y - H / 2 - w.y * view.scale;
        },
        { passive: false },
    );

    // ── Тач: один палец — драг узла / пан / тап; два пальца — пинч-зум ──
    let pinch = null;
    const tpos = (t) => {
        const r = canvas.getBoundingClientRect();
        return { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    canvas.addEventListener(
        "touchstart",
        (e) => {
            if (e.touches.length === 1) {
                pinch = null;
                const p = tpos(e.touches[0]);
                drag.moved = 0;
                const n = nodeAt(p.x, p.y);
                if (n) {
                    drag.node = n;
                    hover = n;
                } else {
                    drag.panning = true;
                    drag.lx = p.x;
                    drag.ly = p.y;
                }
            } else if (e.touches.length === 2) {
                drag.node = null;
                drag.panning = false;
                const a = tpos(e.touches[0]),
                    b = tpos(e.touches[1]);
                pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) };
            }
            e.preventDefault();
        },
        { passive: false },
    );
    canvas.addEventListener(
        "touchmove",
        (e) => {
            if (pinch && e.touches.length === 2) {
                const a = tpos(e.touches[0]),
                    b = tpos(e.touches[1]);
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                const cx = (a.x + b.x) / 2,
                    cy = (a.y + b.y) / 2,
                    w = toWorld(cx, cy);
                view.scale = Math.min(
                    5,
                    Math.max(0.3, (view.scale * dist) / (pinch.dist || dist)),
                );
                view.x = cx - W / 2 - w.x * view.scale;
                view.y = cy - H / 2 - w.y * view.scale;
                pinch.dist = dist;
            } else if (e.touches.length === 1) {
                const p = tpos(e.touches[0]);
                if (drag.node) {
                    const w = toWorld(p.x, p.y);
                    drag.node.x = w.x;
                    drag.node.y = w.y;
                    alpha = Math.max(alpha, 0.4);
                    drag.moved++;
                } else if (drag.panning) {
                    view.x += p.x - drag.lx;
                    view.y += p.y - drag.ly;
                    drag.lx = p.x;
                    drag.ly = p.y;
                    drag.moved++;
                }
            }
            e.preventDefault();
        },
        { passive: false },
    );
    canvas.addEventListener("touchend", (e) => {
        if (drag.node && drag.moved < 4 && window.openDetail)
            window.openDetail(drag.node.item);
        drag.node = null;
        drag.panning = false;
        if (e.touches.length === 0) {
            pinch = null;
            hover = null;
        }
    });

    // Кнопки зума: масштабируем вокруг центра холста
    function zoomBy(k) {
        const w = toWorld(W / 2, H / 2);
        view.scale = Math.min(5, Math.max(0.3, view.scale * k));
        view.x = -w.x * view.scale;
        view.y = -w.y * view.scale;
    }
    const zi = document.getElementById("zoom-in"),
        zo = document.getElementById("zoom-out");
    if (zi) zi.addEventListener("click", () => zoomBy(1.25));
    if (zo) zo.addEventListener("click", () => zoomBy(0.8));

    // ── Легенда ───────────────────────────────
    const legend = document.getElementById("legend");
    if (legend) {
        legend.innerHTML = Object.entries(BLOCK_COLORS)
            .map(
                ([name, col]) =>
                    `<li><span class="graph__dot" style="background:${col}"></span>${name}</li>`,
            )
            .join("");
    }
    const hint = document.getElementById("graph-hint");
    function updateHint() {
        const vlinks = links.filter((l) => !l.a.hidden && !l.b.hidden).length;
        const iso = live.filter((n) => !n.vdeg).length;
        const pl = window.LandscapeUI.plural;
        if (hint)
            hint.textContent = `${live.length} ${pl(live.length, "инструмент", "инструмента", "инструментов")} · ${vlinks} ${pl(vlinks, "связь", "связи", "связей")} · ${iso} без связей`;
    }

    // ── Чипы фильтров: роль и зрелость ────────
    function buildChips(boxId, values, set, axis) {
        const box = document.getElementById(boxId);
        if (!box) return;
        values.forEach((val) => {
            const chip = document.createElement("button");
            chip.className = "chip";
            chip.type = "button";
            chip.textContent = val;
            chip.setAttribute("aria-pressed", String(set.has(val)));
            chip.addEventListener("click", () => {
                if (set.has(val)) set.delete(val);
                else set.add(val);
                chip.setAttribute("aria-pressed", set.has(val));
                window.LandscapeFilters.patch({ [axis]: [...set] }); // унести
                applyFilter();
            });
            box.appendChild(chip);
        });
    }
    buildChips("f-role", D.axes.role.values, fRole, "role");
    buildChips("f-maturity", D.axes.maturity.values, fMat, "maturity");

    // ── Кнопка сброса отборов (видимость — через CSS :has) ──
    (function addReset() {
        const fbox = document.getElementById("graph-filters");
        if (!fbox) return;
        const r = document.createElement("button");
        r.type = "button";
        r.className = "reset graph-reset";
        r.textContent = "Сбросить ✕";
        r.addEventListener("click", () => {
            fRole.clear();
            fMat.clear();
            window.LandscapeFilters.patch({ role: [], maturity: [] }); // и в сторе
            fbox.querySelectorAll(".chip").forEach((c) =>
                c.setAttribute("aria-pressed", "false"),
            );
            applyFilter();
        });
        fbox.appendChild(r);
    })();

    // ── Попап отборов: открывается из бургера (мобильный и распахнутый режим) ──
    const fbox = document.getElementById("graph-filters");
    if (fbox) {
        const setOpen = (on) => fbox.classList.toggle("is-open", on);
        // Любое нажатие вне списка — закрыть (работает и поверх canvas)
        NAV.dismissOnOutside(
            () => fbox.classList.contains("is-open"),
            [fbox],
            () => setOpen(false),
        );
        const burgerBtn = document.createElement("button");
        burgerBtn.type = "button";
        burgerBtn.className = "menu__pa-item";
        burgerBtn.textContent = "Отборы";
        burgerBtn.addEventListener("click", () => {
            NAV.closeMenu();
            setOpen(true);
        });
        NAV.pageActions([burgerBtn]);
    }

    // ── Полноэкранный режим (кнопка в углу графа, десктоп) ──
    const expandBtn = document.getElementById("graph-expand");
    if (expandBtn) {
        expandBtn.addEventListener("click", () => {
            const on = document.body.classList.toggle("is-immersive");
            expandBtn.setAttribute(
                "aria-label",
                on ? "Свернуть" : "Развернуть на весь экран",
            );
            resize(); // холст сменил размер
            window.dispatchEvent(new Event("scroll")); // пересчитать видимость верхней строки
        });
    }

    // ── Старт ─────────────────────────────────
    window.addEventListener("resize", resize);
    resize();
    applyFilter();
    frame();
})();
