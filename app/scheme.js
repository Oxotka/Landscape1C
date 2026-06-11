// Страница «Схема»: статичный постер ландшафта в одном инлайн-SVG.
// Блоки идут сверху вниз, внутри — категории и чипы инструментов.
// Тогглы фильтруют по роли; кнопки экспортируют SVG/PNG (самодостаточные —
// логотипы заранее инлайнятся data-URI, цвета берутся из темы).
(function () {
    "use strict";

    const D = window.LANDSCAPE;
    const wrap = document.getElementById("scheme-wrap");
    const togglesBox = document.getElementById("scheme-toggles");
    const ROLES = D.axes.role.values;

    // Сортировка карточек внутри категории — общая с главной (shared.js)
    const sortItems = window.LandscapeUI.sortItems;

    // ── Состояние ─────────────────────────────
    // Пусто = без ограничения по оси (как в графе). Между осями — И, внутри оси — ИЛИ.
    const selRole = new Set();
    const selMat = new Set();
    const hiddenBlocks = new Set(); // блоки, скрытые из схемы (чекбоксы «Блоки»)
    const logoCache = {}; // file -> dataURI | null
    let svgW = 0,
        svgH = 0;

    // Текущее дерево с учётом всех отборов: [{block, cats:[{cat, items}]}]
    const itemVisible = (it) =>
        (selRole.size === 0 ||
            (it.roles && it.roles.some((r) => selRole.has(r)))) &&
        (selMat.size === 0 || selMat.has(it.maturity));
    function currentTree() {
        const tree = [];
        D.blocks.forEach((block) => {
            if (hiddenBlocks.has(block.name)) return;
            const cats = block.categories
                .map((cat) => ({
                    cat,
                    items: D.items
                        .filter((it) => it.category === cat && itemVisible(it))
                        .sort(sortItems),
                }))
                .filter((c) => c.items.length);
            if (cats.length) tree.push({ block, cats });
        });
        return tree;
    }

    // ── Хелперы ───────────────────────────────
    const esc = (s) =>
        String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");

    const measureCanvas = document.createElement("canvas").getContext("2d");
    function measure(text, weight, size) {
        measureCanvas.font = weight + " " + size + "px Inter, sans-serif";
        return measureCanvas.measureText(text).width;
    }
    function truncate(text, maxW, weight, size) {
        if (measure(text, weight, size) <= maxW) return text;
        let s = text;
        while (s.length > 1 && measure(s + "…", weight, size) > maxW)
            s = s.slice(0, -1);
        return s + "…";
    }
    const cssVar = (name) =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();

    // Перенос строки по словам в заданную ширину (макс. maxLines, последняя — с «…»)
    function wrapText(text, maxW, weight, size, maxLines) {
        const words = text.split(/\s+/);
        const lines = [];
        let cur = "";
        let used = 0;
        for (let k = 0; k < words.length; k++) {
            const test = cur ? cur + " " + words[k] : words[k];
            if (measure(test, weight, size) <= maxW || !cur) {
                cur = test;
                used = k + 1;
            } else {
                lines.push(cur);
                cur = words[k];
                used = k + 1;
                if (lines.length === maxLines - 1) break;
            }
        }
        if (lines.length < maxLines && cur) {
            lines.push(cur);
        } else if (used < words.length) {
            // остались непоместившиеся слова — добиваем «…» в последнюю строку
            cur = (cur ? cur + " " : "") + "…";
            lines[lines.length] = cur;
        }
        // подрезаем строки, что всё равно шире колонки (длинные одиночные слова)
        return lines
            .slice(0, maxLines)
            .map((l) =>
                measure(l, weight, size) > maxW
                    ? truncate(l, maxW, weight, size)
                    : l,
            );
    }
    const chunk = (arr, n) => {
        const r = [];
        for (let i = 0; i < arr.length; i += n) r.push(arr.slice(i, i + n));
        return r;
    };

    // ── Предзагрузка логотипов ────────────────
    // SVG встраиваем инлайн (как вложенный <svg> — чтобы открывался в Illustrator),
    // растровые — data-URI в <image>. Возвращает {type:"svg",viewBox,inner} | {type:"img",uri} | null
    function processSVG(text, prefix) {
        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        const root = doc.querySelector("svg");
        if (!root || doc.querySelector("parsererror")) return null;
        let vb = root.getAttribute("viewBox");
        if (!vb) {
            const w = parseFloat(root.getAttribute("width")) || 24;
            const h = parseFloat(root.getAttribute("height")) || 24;
            vb = `0 0 ${w} ${h}`;
        }
        // Префиксуем id и ссылки на них, чтобы defs разных логотипов не конфликтовали
        root.querySelectorAll("[id]").forEach((el) => {
            el.id = prefix + el.id;
        });
        root.querySelectorAll("*").forEach((el) => {
            Array.from(el.attributes).forEach((a) => {
                let v = a.value;
                if (v.indexOf("url(#") !== -1)
                    v = v.replace(
                        /url\(#([^)]+)\)/g,
                        (m, id) => `url(#${prefix}${id})`,
                    );
                if (
                    (a.name === "href" || a.name.endsWith(":href")) &&
                    v.charAt(0) === "#"
                )
                    v = "#" + prefix + v.slice(1);
                if (v !== a.value) el.setAttribute(a.name, v);
            });
        });
        const ser = new XMLSerializer();
        let raw = "";
        root.childNodes.forEach((n) => (raw += ser.serializeToString(n)));
        // Обрезаем по viewBox, как браузер при <img> (часть логотипов рисует
        // надпись за границами viewBox — напр. gitflic.svg)
        const [vx, vy, vw, vh] = vb.split(/[\s,]+/).map(Number);
        const clipId = prefix + "clip";
        const inner =
            `<clipPath id="${clipId}"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}"/></clipPath>` +
            `<g clip-path="url(#${clipId})">${raw}</g>`;
        return { type: "svg", viewBox: vb, inner };
    }
    async function loadLogo(file, idx) {
        try {
            const res = await fetch("logos/" + file);
            if (!res.ok) return null;
            if (/\.svg$/i.test(file)) {
                const txt = await res.text();
                return processSVG(txt, "lg" + idx + "_");
            }
            const blob = await res.blob();
            const uri = await new Promise((r) => {
                const fr = new FileReader();
                fr.onload = () => r(fr.result);
                fr.onerror = () => r(null);
                fr.readAsDataURL(blob);
            });
            return uri ? { type: "img", uri } : null;
        } catch (e) {
            return null;
        }
    }
    async function preloadLogos() {
        const files = [...new Set(D.items.map((i) => i.logo).filter(Boolean))];
        const uris = await Promise.all(files.map((f, i) => loadLogo(f, i)));
        files.forEach((f, k) => (logoCache[f] = uris[k]));
    }

    // ── Отборы (как в графе: роль + зрелость, пусто = все) ──
    function buildGroup(labelText, values, set) {
        const group = document.createElement("div");
        group.className = "graph-fgroup";
        const label = document.createElement("span");
        label.className = "graph-flabel";
        label.textContent = labelText;
        const chips = document.createElement("div");
        chips.className = "scheme-chips";
        values.forEach((val) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "chip";
            b.textContent = val;
            b.setAttribute("aria-pressed", String(set.has(val)));
            b.addEventListener("click", () => {
                if (set.has(val)) set.delete(val);
                else set.add(val);
                b.setAttribute("aria-pressed", String(set.has(val)));
                render();
            });
            chips.appendChild(b);
        });
        group.append(label, chips);
        togglesBox.appendChild(group);
    }
    // Выпадающий список «Блоки» с чекбоксами — какие блоки печатать
    function buildBlocksControl() {
        const group = document.createElement("div");
        group.className = "graph-fgroup scheme-dd";
        const label = document.createElement("span");
        label.className = "graph-flabel";
        label.textContent = "Блоки";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chip scheme-dd__btn";
        btn.setAttribute("aria-expanded", "false");
        const panel = document.createElement("div");
        panel.className = "scheme-dd__panel";
        panel.hidden = true;

        const updateBtn = () => {
            btn.textContent =
                hiddenBlocks.size === 0
                    ? "все"
                    : D.blocks.length -
                      hiddenBlocks.size +
                      " из " +
                      D.blocks.length;
            btn.setAttribute("aria-pressed", String(hiddenBlocks.size > 0));
        };

        D.blocks.forEach((b) => {
            const row = document.createElement("label");
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.checked = !hiddenBlocks.has(b.name);
            cb.addEventListener("change", () => {
                if (cb.checked) hiddenBlocks.delete(b.name);
                else hiddenBlocks.add(b.name);
                updateBtn();
                render();
            });
            row.appendChild(cb);
            row.appendChild(document.createTextNode(" " + b.name));
            panel.appendChild(row);
        });

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const willOpen = panel.hidden;
            panel.hidden = !willOpen;
            btn.setAttribute("aria-expanded", String(willOpen));
        });
        document.addEventListener("click", (e) => {
            if (!group.contains(e.target)) {
                panel.hidden = true;
                btn.setAttribute("aria-expanded", "false");
            }
        });

        updateBtn();
        group.append(label, btn, panel);
        togglesBox.appendChild(group);
    }
    // Кнопка «Сбросить» — показать всё снова (как на главной)
    let resetBtn;
    function refreshReset() {
        const active = !!(selRole.size || selMat.size || hiddenBlocks.size);
        if (resetBtn) resetBtn.hidden = !active;
        const r2 = document.getElementById("reset2");
        if (r2) r2.hidden = !active;
    }
    function resetAll() {
        selRole.clear();
        selMat.clear();
        hiddenBlocks.clear();
        togglesBox
            .querySelectorAll(".chip")
            .forEach((c) => c.setAttribute("aria-pressed", "false"));
        const ddBtn = togglesBox.querySelector(".scheme-dd__btn");
        if (ddBtn) ddBtn.textContent = "все";
        togglesBox
            .querySelectorAll(".scheme-dd__panel input")
            .forEach((cb) => (cb.checked = true));
        render();
    }
    function renderToggles() {
        togglesBox.innerHTML = "";
        buildGroup("Роль", ROLES, selRole);
        buildGroup("Зрелость", D.axes.maturity.values, selMat);
        buildBlocksControl();
        resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "reset scheme-reset";
        resetBtn.textContent = "Сбросить ✕";
        resetBtn.hidden = true;
        resetBtn.addEventListener("click", resetAll);
        togglesBox.appendChild(resetBtn);
    }

    // ── Раскладка и построение SVG ────────────
    // Древовидная схема: блок → шина → категории → вертикальные ветки к карточкам.
    function buildSVG() {
        const C = {
            paper: cssVar("--paper"),
            card: cssVar("--card"),
            ink: cssVar("--ink"),
            inkSoft: cssVar("--ink-soft"),
            cardLine: cssVar("--card-line"),
            edge: cssVar("--edge"),
        };
        const dark = document.documentElement.dataset.theme === "dark";

        const W = 1200,
            M = 32,
            innerW = W - M * 2;
        // Колонка категории
        const colW = 176,
            colGap = 16;
        const perRow = Math.max(
            1,
            Math.floor((innerW + colGap) / (colW + colGap)),
        );
        // Карточка инструмента
        const logoSz = 20,
            cardPadX = 10,
            cardPadY = 8,
            logoGap = 8,
            lineH = 15,
            cardFont = 12.5,
            cardGap = 10;
        const textW = colW - cardPadX * 2 - logoSz - logoGap;
        // Заголовок блока / категории
        const blockBarH = 36,
            busGap = 16,
            headGap = 16,
            catLineH = 14,
            catPadY = 7;

        const out = [];
        const line = (x1, yy1, x2, yy2) =>
            out.push(
                `<line x1="${x1}" y1="${yy1}" x2="${x2}" y2="${yy2}" stroke="${C.edge}" stroke-width="1.5"/>`,
            );

        let y = M;

        // Заголовок постера
        out.push(
            `<text x="${M}" y="${y + 24}" font-family="Unbounded, sans-serif" font-weight="700" font-size="26" fill="${C.ink}">Ландшафт технологий 1С</text>`,
        );
        out.push(
            `<text x="${M}" y="${y + 46}" font-family="Inter, sans-serif" font-size="12" fill="${C.inkSoft}">Карта технологий экосистемы 1С${D.updated ? " · обновлено " + esc(D.updated) : ""}</text>`,
        );
        y += 78;

        // Рисует колонку категории, возвращает нижнюю границу
        function drawColumn(colX, topY, cat, items) {
            const cx = colX + colW / 2;
            // Заголовок категории (карточка, перенос до 2 строк)
            const catLines = wrapText(cat, colW - 20, "700", 11, 2);
            const catBoxH = catLines.length * catLineH + catPadY * 2;
            out.push(
                `<rect x="${colX}" y="${topY}" width="${colW}" height="${catBoxH}" rx="6" fill="${C.ink}"/>`,
            );
            catLines.forEach((ln, li) => {
                out.push(
                    `<text x="${cx}" y="${topY + catPadY + catLineH / 2 + li * catLineH}" text-anchor="middle" dominant-baseline="central" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="${C.paper}">${esc(ln)}</text>`,
                );
            });

            let cy = topY + catBoxH;
            let prevBottom = cy; // откуда тянуть вертикальную ветку
            items.forEach((it) => {
                const nameLines = wrapText(it.name, textW, "500", cardFont, 3);
                const cardH = Math.max(
                    logoSz,
                    nameLines.length * lineH + cardPadY * 2,
                );
                const cardY = cy + cardGap;
                // ветка: вертикаль от предыдущего низа к верху карточки
                line(cx, prevBottom, cx, cardY);
                // карточка (кликабельна → openDetail)
                out.push(
                    `<g class="scheme-card" data-i="${D.items.indexOf(it)}" style="cursor:pointer">`,
                );
                out.push(
                    `<rect x="${colX}" y="${cardY}" width="${colW}" height="${cardH}" rx="7" fill="${C.card}" stroke="${C.cardLine}" stroke-width="1"/>`,
                );
                const lg = it.logo ? logoCache[it.logo] : null;
                const lx = colX + cardPadX,
                    ly = cardY + (cardH - logoSz) / 2;
                const flt =
                    dark && it.logoInvert ? ` filter="url(#schInv)"` : "";
                if (lg && lg.type === "svg") {
                    out.push(
                        `<svg x="${lx}" y="${ly}" width="${logoSz}" height="${logoSz}" viewBox="${lg.viewBox}" preserveAspectRatio="xMidYMid meet"${flt}>${lg.inner}</svg>`,
                    );
                } else if (lg && lg.type === "img") {
                    out.push(
                        `<image x="${lx}" y="${ly}" width="${logoSz}" height="${logoSz}" xlink:href="${lg.uri}" preserveAspectRatio="xMidYMid meet"${flt}/>`,
                    );
                } else {
                    out.push(
                        `<text x="${lx + logoSz / 2}" y="${cardY + cardH / 2}" text-anchor="middle" dominant-baseline="central" font-family="Unbounded, sans-serif" font-weight="700" font-size="9" fill="${C.inkSoft}">1С</text>`,
                    );
                }
                const tx = lx + logoSz + logoGap;
                const ty0 =
                    cardY + cardH / 2 - ((nameLines.length - 1) * lineH) / 2;
                nameLines.forEach((ln, li) => {
                    out.push(
                        `<text x="${tx}" y="${ty0 + li * lineH}" dominant-baseline="central" font-family="Inter, sans-serif" font-weight="500" font-size="${cardFont}" fill="${C.ink}">${esc(ln)}</text>`,
                    );
                });
                out.push(`</g>`);
                cy = cardY + cardH;
                prevBottom = cy;
            });
            return { bottom: cy, headCenterX: cx };
        }

        currentTree().forEach(({ block, cats }) => {
            const rows = chunk(cats, perRow);
            // Заголовок-полоса блока над первым рядом (по ширине ряда)
            const firstN = rows[0].length;
            const span = firstN * colW + (firstN - 1) * colGap;
            const barW = Math.max(span, 220);
            const barX = M + (innerW - barW) / 2;
            const barY = y;
            out.push(
                `<rect x="${barX}" y="${barY}" width="${barW}" height="${blockBarH}" rx="4" fill="${C.ink}"/>`,
            );
            out.push(
                `<text x="${barX + barW / 2}" y="${barY + blockBarH / 2}" text-anchor="middle" dominant-baseline="central" font-family="Unbounded, sans-serif" font-weight="700" font-size="15" fill="${C.paper}">${esc(block.name)}</text>`,
            );

            const busY = barY + blockBarH + busGap;
            const headTopY = busY + headGap;
            // вертикаль от полосы блока вниз к шине
            line(M + innerW / 2, barY + blockBarH, M + innerW / 2, busY);

            let rowTop = headTopY;
            rows.forEach((row, ri) => {
                const n = row.length;
                const sp = n * colW + (n - 1) * colGap;
                const sx = M + (innerW - sp) / 2;
                const centers = [];
                let maxBottom = rowTop;
                row.forEach((c, ci) => {
                    const colX = sx + ci * (colW + colGap);
                    const r = drawColumn(colX, rowTop, c.cat, c.items);
                    centers.push(r.headCenterX);
                    if (r.bottom > maxBottom) maxBottom = r.bottom;
                });
                // шина блок→категории только для первого ряда
                if (ri === 0 && centers.length) {
                    const left = centers[0],
                        right = centers[centers.length - 1];
                    if (right > left) line(left, busY, right, busY);
                    centers.forEach((cx) => line(cx, busY, cx, headTopY));
                }
                rowTop = maxBottom + 34;
            });
            y = rowTop + 10;
        });

        if (out.length <= 2) return null; // только заголовок постера — нечего показывать

        const H = Math.round(y + M - 18);
        svgW = W;
        svgH = H;
        return (
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
            `<defs><filter id="schInv"><feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0"/></filter></defs>` +
            `<rect x="0" y="0" width="${W}" height="${H}" fill="${C.paper}"/>` +
            out.join("") +
            `</svg>`
        );
    }

    function render() {
        refreshReset();
        const svg = buildSVG();
        wrap.innerHTML = svg
            ? svg
            : '<div class="scheme-wrap__empty">Ничего не найдено</div>';
    }

    // ── Экспорт ───────────────────────────────
    function download(blob, name) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
    }
    function currentSVGString() {
        const el = wrap.querySelector("svg");
        return el ? new XMLSerializer().serializeToString(el) : null;
    }
    function exportSVG() {
        const str = currentSVGString();
        if (!str) return;
        download(
            new Blob([str], { type: "image/svg+xml;charset=utf-8" }),
            "landscape-scheme.svg",
        );
    }
    // Растеризация текущего SVG в canvas (scale×), затем колбэк
    function rasterize(scale, fillBg, cb) {
        const str = currentSVGString();
        if (!str) return;
        const url = URL.createObjectURL(
            new Blob([str], { type: "image/svg+xml;charset=utf-8" }),
        );
        const img = new Image();
        img.onload = function () {
            const c = document.createElement("canvas");
            c.width = svgW * scale;
            c.height = svgH * scale;
            const cx = c.getContext("2d");
            if (fillBg) {
                cx.fillStyle = fillBg;
                cx.fillRect(0, 0, c.width, c.height);
            }
            cx.scale(scale, scale);
            cx.drawImage(img, 0, 0, svgW, svgH);
            URL.revokeObjectURL(url);
            cb(c);
        };
        img.onerror = function () {
            URL.revokeObjectURL(url);
            alert("Не удалось сформировать изображение");
        };
        img.src = url;
    }
    function exportPNG() {
        rasterize(2, null, (c) =>
            c.toBlob((b) => download(b, "landscape-scheme.png"), "image/png"),
        );
    }
    // PDF: растровый (JPEG внутри PDF, /DCTDecode) — без зависимостей
    function exportPDF() {
        rasterize(2, cssVar("--paper") || "#ffffff", (c) =>
            c.toBlob(
                (blob) =>
                    blob
                        .arrayBuffer()
                        .then((buf) =>
                            buildPDF(
                                new Uint8Array(buf),
                                c.width,
                                c.height,
                                svgW,
                                svgH,
                            ),
                        ),
                "image/jpeg",
                0.92,
            ),
        );
    }
    function buildPDF(jpeg, pw, ph, W, H) {
        const enc = new TextEncoder();
        const parts = [];
        let len = 0;
        const push = (d) => {
            const u = typeof d === "string" ? enc.encode(d) : d;
            parts.push(u);
            len += u.length;
        };
        const off = [];
        const obj = (n, body) => {
            off[n] = len;
            push(n + " 0 obj\n" + body + "\nendobj\n");
        };
        push("%PDF-1.3\n");
        push(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));
        obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
        obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
        obj(
            3,
            `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
        );
        off[4] = len;
        push(
            `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pw} /Height ${ph} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
        );
        push(jpeg);
        push("\nendstream\nendobj\n");
        const content = `q ${W} 0 0 ${H} 0 0 cm /Im0 Do Q`;
        obj(
            5,
            `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
        );
        const xrefAt = len;
        let xref = "xref\n0 6\n0000000000 65535 f \n";
        for (let i = 1; i <= 5; i++)
            xref += String(off[i]).padStart(10, "0") + " 00000 n \n";
        push(xref);
        push(
            `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`,
        );
        const out = new Uint8Array(len);
        let p = 0;
        parts.forEach((u) => {
            out.set(u, p);
            p += u.length;
        });
        download(
            new Blob([out], { type: "application/pdf" }),
            "landscape-scheme.pdf",
        );
    }
    // Майндмап (FreeMind .mm) — иерархия блок → категория → инструмент
    function exportMindmap() {
        const tree = currentTree();
        if (!tree.length) return;
        let s = '<map version="1.0.1">\n<node TEXT="Ландшафт технологий 1С">\n';
        tree.forEach(({ block, cats }) => {
            s += `<node TEXT="${esc(block.name)}">\n`;
            cats.forEach(({ cat, items }) => {
                s += `<node TEXT="${esc(cat)}">\n`;
                items.forEach(
                    (it) => (s += `<node TEXT="${esc(it.name)}"/>\n`),
                );
                s += `</node>\n`;
            });
            s += `</node>\n`;
        });
        s += `</node>\n</map>\n`;
        download(
            new Blob([s], { type: "application/x-freemind" }),
            "landscape-scheme.mm",
        );
    }

    // Меню «Скачать» с выбором формата (в баре и в прилепленном заголовке)
    const FORMATS = [
        ["SVG", exportSVG],
        ["PNG", exportPNG],
        ["PDF", exportPDF],
        ["Mind map (.mm)", exportMindmap],
    ];
    // На мобильном в прилепленном заголовке — иконка «Поделиться» вместо текста
    const SHARE_ICON =
        '<svg class="i-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>';
    function buildDownloadMenu(container, btnClass, hover, withIcon) {
        if (!container) return;
        container.classList.add("scheme-dd");
        if (hover) container.classList.add("scheme-dd--hover"); // раскрытие по наведению на десктопе (CSS)
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = btnClass + " scheme-dd__btn scheme-dl-btn";
        btn.innerHTML =
            (withIcon ? SHARE_ICON : "") +
            '<span class="scheme-dl-text">Скачать</span>';
        btn.setAttribute("aria-expanded", "false");
        const panel = document.createElement("div");
        panel.className = "scheme-dd__panel scheme-dl__panel";
        panel.hidden = true;
        const close = () => {
            panel.hidden = true;
            btn.setAttribute("aria-expanded", "false");
        };
        FORMATS.forEach(([label, fn]) => {
            const o = document.createElement("button");
            o.type = "button";
            o.className = "scheme-dl__opt";
            o.textContent = label;
            o.addEventListener("click", () => {
                close();
                fn();
            });
            panel.appendChild(o);
        });
        // Клик/тап работает всегда (нужно для тача); hover — бонус через CSS
        btn.addEventListener("click", () => {
            const willOpen = panel.hidden;
            panel.hidden = !willOpen;
            btn.setAttribute("aria-expanded", String(willOpen));
        });
        document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) close();
        });
        container.append(btn, panel);
    }

    // ── Инициализация ─────────────────────────
    buildDownloadMenu(document.getElementById("bar-dl"), "scheme-btn", true);
    buildDownloadMenu(
        document.getElementById("topbar-dl"),
        "reset",
        false,
        true,
    );
    const reset2 = document.getElementById("reset2");
    if (reset2) reset2.addEventListener("click", resetAll);

    // Кнопки «Отборы» (в баре и в заголовке) → попап с отборами на мобильном
    const triggers = document.querySelectorAll(".scheme-ftrigger");
    const setFiltersOpen = (on) => {
        togglesBox.classList.toggle("is-open", on);
        triggers.forEach((t) => t.setAttribute("aria-expanded", String(on)));
    };
    triggers.forEach((t) =>
        t.addEventListener("click", (e) => {
            e.stopPropagation();
            setFiltersOpen(!togglesBox.classList.contains("is-open"));
        }),
    );
    NAV.dismissOnOutside(
        () => togglesBox.classList.contains("is-open"),
        [togglesBox, ".scheme-ftrigger"],
        () => setFiltersOpen(false),
    );
    // На десктопе при прокрутке наверх шапка прячется — закрываем попап отборов
    const topbarEl = document.getElementById("topbar");
    addEventListener(
        "scroll",
        () => {
            if (
                togglesBox.classList.contains("is-open") &&
                topbarEl &&
                !topbarEl.classList.contains("is-visible")
            )
                setFiltersOpen(false);
        },
        { passive: true },
    );

    // Дубль «Скачать» в самом верху бургера (запасной путь на узких экранах)
    (function injectBurgerActions() {
        const head = document.createElement("button");
        head.type = "button";
        head.className = "menu__pa-item menu__pa-head";
        head.setAttribute("aria-expanded", "false");
        head.innerHTML =
            '<span>Скачать</span><span aria-hidden="true">▾</span>';
        const list = document.createElement("div");
        list.className = "menu__pa-list";
        list.hidden = true;
        FORMATS.forEach(([label, fn]) => {
            const o = document.createElement("button");
            o.type = "button";
            o.className = "menu__pa-item menu__pa-sub";
            o.textContent = label;
            o.addEventListener("click", () => {
                NAV.closeMenu();
                fn();
            });
            list.appendChild(o);
        });
        head.addEventListener("click", () => {
            const open = list.hidden;
            list.hidden = !open;
            head.setAttribute("aria-expanded", String(open));
        });
        NAV.pageActions([head, list]);
    })();

    // Клик по карточке инструмента → детальная модалка (как в графе)
    wrap.addEventListener("click", (e) => {
        const g = e.target.closest(".scheme-card");
        if (g && window.openDetail) window.openDetail(D.items[+g.dataset.i]);
    });

    // Перерисовка при смене темы (инлайн-скрипт страницы меняет data-theme)
    new MutationObserver(render).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
    });

    renderToggles();
    wrap.innerHTML = '<div class="scheme-wrap__empty">Загрузка…</div>';
    preloadLogos().then(render);
})();
