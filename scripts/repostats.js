// Авто-метрики репозиториев карточек: звезды и дата последнего коммита.
// Читает repo из app/data.js (GitHub и GitLab; прочие хосты пропускает),
// пишет app/repostats.js (window.REPOSTATS) — модалка показывает бейджи.
// Запуск: node scripts/repostats.js (вручную, время от времени — как linkcheck).
// Токен GitHub: env GITHUB_TOKEN, иначе `gh auth token`; без токена лимит 60/час.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "app", "repostats.js");

global.window = {};
require(path.join(ROOT, "app", "data.js"));
const items = window.LANDSCAPE.items.filter((i) => i.repo);

function githubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch (e) {
    return null;
  }
}

// URL репозитория → параметры запроса к API хоста (null — хост не умеем
// или это страница организации без репозитория)
function apiOf(repo) {
  const u = new URL(repo);
  const parts = u.pathname.replace(/\.git$/, "").split("/").filter(Boolean);
  if (u.host === "github.com") {
    if (parts.length < 2) return null; // страница организации
    return { kind: "github", url: `https://api.github.com/repos/${parts[0]}/${parts[1]}` };
  }
  if (u.host === "gitlab.com") {
    if (parts.length < 2) return null;
    const proj = encodeURIComponent(parts.join("/"));
    return { kind: "gitlab", url: `https://gitlab.com/api/v4/projects/${proj}` };
  }
  return null;
}

async function fetchStat(repo, token) {
  const api = apiOf(repo);
  if (!api) return { skip: true };
  const headers = { "User-Agent": "landscape1c-repostats" };
  if (api.kind === "github" && token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(api.url, { headers });
  if (!res.ok) return { error: `${res.status} ${res.statusText}` };
  const j = await res.json();
  return api.kind === "github"
    ? { stars: j.stargazers_count, pushed: j.pushed_at.slice(0, 10) }
    : { stars: j.star_count, pushed: j.last_activity_at.slice(0, 10) };
}

(async () => {
  const token = githubToken();
  if (!token) console.warn("⚠ нет GITHUB_TOKEN и gh — анонимный лимит 60 запросов/час");
  const repos = {};
  let skipped = 0,
    failed = 0;
  // пачками по 8 — быстро и без душения API
  for (let i = 0; i < items.length; i += 8) {
    await Promise.all(
      items.slice(i, i + 8).map(async (it) => {
        const s = await fetchStat(it.repo, token);
        if (s.skip) {
          skipped++;
        } else if (s.error) {
          failed++;
          console.warn(`✗ ${it.name}: ${s.error} (${it.repo})`);
        } else {
          repos[it.repo] = { stars: s.stars, pushed: s.pushed };
        }
      }),
    );
  }
  const out = {
    generated: new Date().toISOString().slice(0, 10),
    repos: Object.fromEntries(Object.entries(repos).sort(([a], [b]) => a.localeCompare(b))),
  };
  fs.writeFileSync(
    OUT,
    "// Сгенерировано scripts/repostats.js — не править руками\n" +
      "window.REPOSTATS = " +
      JSON.stringify(out, null, 2) +
      ";\n",
  );
  console.log(
    `✓ repostats: ${Object.keys(repos).length} репозиториев (пропущено без API: ${skipped}, ошибок: ${failed}) → ${path.relative(ROOT, OUT)}`,
  );
})();
