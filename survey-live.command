#!/bin/zsh
set -euo pipefail

cd "${0:A:h}"

if [[ -f .survey-live.env ]]; then
    source .survey-live.env
fi
: "${SURVEY_SSH:?Укажите SURVEY_SSH в .survey-live.env}"
LIVE_DATA="app/survey2026-live.js"
LIVE_TMP="${LIVE_DATA}.tmp"
trap 'rm -f "$LIVE_TMP"' EXIT

ssh -o BatchMode=yes -o ConnectTimeout=15 "$SURVEY_SSH" \
    "cat /opt/landscape1c/bot/answers.jsonl" \
    | node bot/aggregate.js - --out "$LIVE_TMP"
mv "$LIVE_TMP" "$LIVE_DATA"

if ! curl -fsS http://127.0.0.1:8123/survey2026.html >/dev/null 2>&1; then
    nohup python3 scripts/serve.py \
        </dev/null >/private/tmp/landscape1c-survey-live.log 2>&1 &
    for _ in {1..20}; do
        curl -fsS http://127.0.0.1:8123/survey2026.html >/dev/null 2>&1 && break
        sleep 0.2
    done
fi

open "http://127.0.0.1:8123/survey2026.html?data=live#results" >/dev/null 2>&1
