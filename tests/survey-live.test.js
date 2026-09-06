const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.join(__dirname, "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "survey-live-"));
fs.mkdirSync(path.join(tmp, "app"));
fs.mkdirSync(path.join(tmp, "bot", "lib"), { recursive: true });
fs.copyFileSync(
    path.join(root, "app", "data.js"),
    path.join(tmp, "app", "data.js"),
);
fs.copyFileSync(
    path.join(root, "bot", "aggregate.js"),
    path.join(tmp, "bot", "aggregate.js"),
);
fs.copyFileSync(
    path.join(root, "bot", "lib", "quiz.js"),
    path.join(tmp, "bot", "lib", "quiz.js"),
);

const answers = path.join(tmp, "answers.jsonl");
fs.writeFileSync(
    answers,
    JSON.stringify({
        uid: "private-user-hash",
        tool: "Vanessa Automation",
        answer: "работал",
        sentiment: "да",
        role: "тестировщик",
        level: "опытный",
        context: "проекты",
        wave: 2026,
    }) + "\n",
);
const out = path.join(tmp, "survey-live.js");
const run = spawnSync(
    process.execPath,
    [path.join(tmp, "bot", "aggregate.js"), answers, "--out", out],
    { encoding: "utf8" },
);

assert.equal(run.status, 0, run.stderr || run.stdout);
assert.equal(fs.existsSync(out), true, "--out должен задавать файл агрегатов");
const generated = fs.readFileSync(out, "utf8");
assert.match(generated, /window\.SURVEY =/);
assert.match(generated, /"total": 1/);
assert.doesNotMatch(generated, /private-user-hash/);

const stdinOut = path.join(tmp, "survey-live-stdin.js");
const stdinRun = spawnSync(
    process.execPath,
    [path.join(tmp, "bot", "aggregate.js"), "-", "--out", stdinOut],
    { encoding: "utf8", input: fs.readFileSync(answers) },
);
assert.equal(stdinRun.status, 0, stdinRun.stderr || stdinRun.stdout);
assert.equal(
    fs.existsSync(stdinOut),
    true,
    "дефис должен читать журнал из stdin",
);

const page = fs.readFileSync(path.join(root, "app", "survey2026.html"), "utf8");
const build = fs.readFileSync(path.join(root, "scripts", "build.js"), "utf8");
const ignore = fs.readFileSync(path.join(root, ".gitignore"), "utf8");
const commandFile = path.join(root, "survey-live.command");
assert.equal(
    fs.existsSync(commandFile),
    true,
    "нужна команда обновления витрины",
);
const command = fs.readFileSync(commandFile, "utf8");
assert.match(page, /survey2026-live\.js/);
assert.match(page, /get\("data"\) === "live"/);
assert.match(page, /id="surveyStage"/);
assert.match(page, /<main class="survey" id="results">/);
assert.match(page, /Кто участвует сейчас/);
assert.match(page, /stateof1c-live-/);
assert.match(build, /"survey2026-live\.js"/);
assert.match(ignore, /^app\/survey2026-live\.js$/m);
assert.match(ignore, /^\.survey-live\.env$/m);
assert.match(
    command,
    /ssh[\s\S]+answers\.jsonl[\s\S]+\|[\s\S]+aggregate\.js - --out/,
);
assert.match(command, /source \.survey-live\.env/);
assert.doesNotMatch(command, /194\.87\.62\.61/);
assert.match(command, /nohup python3 scripts\/serve\.py/);
assert.doesNotMatch(command, />[^|\n]*answers[^|\n]*\.jsonl/);

console.log("survey live aggregate: ok");
