#!/bin/zsh
# Локальный запуск ландшафта одним действием: двойной клик в Finder
# или ./start.command в терминале.
#
# Поднимает scripts/serve.py (сайт + редактор с записью в app/data.js)
# и открывает редактор в браузере. «Собрать dist» — кнопка в самом редакторе.
# Остановить сервер: Ctrl+C в этом окне.
cd "$(dirname "$0")"

URL="http://127.0.0.1:8123/editor.html"

if lsof -i :8123 >/dev/null 2>&1; then
    echo "Сервер уже запущен — открываю $URL"
    open "$URL"
    exit 0
fi

( sleep 1 && open "$URL" ) &
exec python3 scripts/serve.py
