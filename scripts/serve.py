#!/usr/bin/env python3
# Локальный сервер редактора: отдает app/ и принимает POST /save -> пишет app/data.js.
# Нужен, чтобы кнопка «Сохранить» в editor.html писала прямо в файл без диалога.
# Запуск: python3 scripts/serve.py  →  http://127.0.0.1:8123/editor.html
import http.server
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, "app")
DATA = os.path.join(APP, "data.js")
PORT = 8123


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=APP, **kw)

    def do_POST(self):
        if self.path.rstrip("/") != "/save":
            self.send_error(404)
            return
        n = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(n)
        with open(DATA, "wb") as f:
            f.write(body)
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"saved")


if __name__ == "__main__":
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Ландшафт: http://127.0.0.1:{PORT}/")
    print(f"Редактор: http://127.0.0.1:{PORT}/editor.html  →  пишет в {DATA}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
