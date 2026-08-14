"use strict";
// Изолирует регрессионные тесты bot.js от боевых файлов: TEST_MODE даёт
// детерминированную колоду (bot/test-set.json), STATE_FILE/ANSWERS_FILE
// уводят запись в bot/test/tmp/ вместо боевых state.json/answers.jsonl
const fs = require("fs");
const path = require("path");

const TMP_DIR = path.join(__dirname, "..", "tmp");

function setupTestEnv(name) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
    process.env.TEST_MODE = "1";
    process.env.BOT_TOKEN = "test-token";
    process.env.BOT_SALT = "test-salt";
    process.env.PLATFORM = "telegram";
    process.env.STATE_FILE = `test/tmp/state-${name}.json`;
    process.env.ANSWERS_FILE = `test/tmp/answers-${name}.jsonl`;
    cleanupTestEnv(name);
}

function cleanupTestEnv(name) {
    for (const f of [
        path.join(TMP_DIR, `state-${name}.json`),
        path.join(TMP_DIR, `answers-${name}.jsonl`),
    ])
        fs.rmSync(f, { force: true });
}

module.exports = { setupTestEnv, cleanupTestEnv, TMP_DIR };
