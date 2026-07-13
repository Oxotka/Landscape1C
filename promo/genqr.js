// Одноразовый генератор QR для https://landscape1c.ru/ в стиле ландшафта.
// Матрица — пакетом qrcode (EC=H), отрисовка SVG своя: квадратные модули,
// глаза с брендовым центром, вариант со знаком проекта на белой плашке.
const QRCode = require("qrcode");
const fs = require("fs");

const URL = "https://landscape1c.ru/";
const qr = QRCode.create(URL, { errorCorrectionLevel: "H" });
const size = qr.modules.size;
const data = qr.modules.data;
const at = (r, c) => data[r * size + c] === 1;

// Палитра сайта (светлая тема)
const PAPER = "#f7f5f0";
const INK = "#1a1a1a";
const BRAND = "#a83e18";
const CARD = "#ffffff";

const M = 10; // юнитов на модуль
const Q = 4; // quiet zone в модулях
const W = (size + Q * 2) * M;

// Зона глаза (7x7 в трех углах) — рисуем сами, модули там пропускаем
function inEye(r, c) {
    return (
        (r < 7 && c < 7) ||
        (r < 7 && c >= size - 7) ||
        (r >= size - 7 && c < 7)
    );
}

// Модули: сливаем горизонтальные прогоны в один rect, чтобы не было швов
function modulesSVG(skipCenter) {
    const rects = [];
    const cLo = Math.floor(size / 2) - 4.5,
        cHi = Math.floor(size / 2) + 4.5; // плашка 9x9 под знак
    const inPlate = (r, c) =>
        skipCenter && r >= cLo && r <= cHi && c >= cLo && c <= cHi;
    for (let r = 0; r < size; r++) {
        let run = -1;
        for (let c = 0; c <= size; c++) {
            const dark =
                c < size && at(r, c) && !inEye(r, c) && !inPlate(r, c);
            if (dark && run < 0) run = c;
            if (!dark && run >= 0) {
                rects.push(
                    `<rect x="${(Q + run) * M}" y="${(Q + r) * M}" width="${(c - run) * M}" height="${M}"/>`,
                );
                run = -1;
            }
        }
    }
    return `<g fill="${INK}" shape-rendering="crispEdges">${rects.join("")}</g>`;
}

// Глаз: внешний контур 7x7 со скруглением, дырка 5x5, центр 3x3 брендовым
function eyeSVG(rr, cc) {
    const x = (Q + cc) * M,
        y = (Q + rr) * M;
    const o = 7 * M,
        i = 5 * M,
        d = 3 * M;
    return (
        `<path fill="${INK}" fill-rule="evenodd" d="` +
        rounded(x, y, o, o, 18) +
        rounded(x + M, y + M, i, i, 10) +
        `"/>` +
        `<path fill="${BRAND}" d="${rounded(x + 2 * M, y + 2 * M, d, d, 7)}"/>`
    );
}
function rounded(x, y, w, h, r) {
    return (
        `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}` +
        `V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}` +
        `H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}` +
        `V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`
    );
}

// Знак проекта («рельеф на осях») на белой плашке в центре
function plateSVG() {
    const plate = 9 * M; // 9x9 модулей
    const px = W / 2 - plate / 2,
        py = W / 2 - plate / 2;
    // glyph занимает 4.25…21.45 x 2.55…19.75 своего viewBox (см. scheme.js)
    const gw = 21.45 - 4.25;
    const gsz = plate * 0.62;
    const k = gsz / gw;
    const gx = W / 2 - gsz / 2 - 4.25 * k;
    const gy = W / 2 - ((19.75 - 2.55) * k) / 2 - 2.55 * k;
    return (
        `<path fill="${CARD}" d="${rounded(px, py, plate, plate, 16)}"/>` +
        `<g transform="translate(${gx} ${gy}) scale(${k})" fill="none" stroke="${INK}" stroke-width="1.9">` +
        `<path d="M5.2 3.5 V18.8 H20.5"/>` +
        `<path d="M5.2 16.8 L9.6 9.8 L12.4 12.6 L16.6 5.8 L20.5 11.8" stroke-linejoin="round"/>` +
        `<circle cx="16.6" cy="5.8" r="1.9" fill="${BRAND}" stroke="none"/>` +
        `</g>`
    );
}

function build(withPlate, bg) {
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" width="${W}" height="${W}">` +
        (bg ? `<rect width="${W}" height="${W}" fill="${bg}"/>` : "") +
        modulesSVG(withPlate) +
        eyeSVG(0, 0) +
        eyeSVG(0, size - 7) +
        eyeSVG(size - 7, 0) +
        (withPlate ? plateSVG() : "") +
        `</svg>`
    );
}

fs.writeFileSync("qr-plain.svg", build(false, PAPER));
fs.writeFileSync("qr-mark.svg", build(true, PAPER));
console.log("size:", size, "modules; files: qr-plain.svg, qr-mark.svg");
