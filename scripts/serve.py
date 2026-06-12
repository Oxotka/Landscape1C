#!/usr/bin/env python3
# Локальный сервер редактора: отдает app/ и принимает:
#   POST /save  -> пишет app/data.js, прогоняет cachebust и sitegen;
#   POST /build -> cachebust + validate + сборка dist/ (кнопка «Собрать dist»).
# Запуск: ./start.command или python3 scripts/serve.py  →  http://127.0.0.1:8123/editor.html
import http.server
import os
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, "app")
DATA = os.path.join(APP, "data.js")
PORT = 8123


def run_node(script):
    """Запускает scripts/<script>, возвращает (код, объединенный вывод)."""
    r = subprocess.run(
        ["node", os.path.join(ROOT, "scripts", script)],
        capture_output=True,
        text=True,
    )
    return r.returncode, (r.stdout + r.stderr).strip()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=APP, **kw)

    def _respond(self, code, text):
        self.send_response(code)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(text.encode("utf-8"))

    def do_POST(self):
        path = self.path.rstrip("/")
        if path == "/save":
            n = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(n)
            with open(DATA, "wb") as f:
                f.write(body)
            # data.js изменился — обновляем ?v= на страницах и sitemap/llms.txt
            # (не критично при сбое)
            run_node("cachebust.js")
            run_node("sitegen.js")
            self._respond(200, "saved")
        elif path == "/build":
            out = []
            for script in ("cachebust.js", "build.js"):  # build сам гоняет validate
                code, text = run_node(script)
                out.append(text)
                if code != 0:
                    self._respond(500, "\n".join(out))
                    return
            self._respond(200, "\n".join(out))
        else:
            self.send_error(404)


if __name__ == "__main__":
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Ландшафт: http://127.0.0.1:{PORT}/")
    print(f"Редактор: http://127.0.0.1:{PORT}/editor.html  →  пишет в {DATA}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
