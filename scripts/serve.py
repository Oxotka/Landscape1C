#!/usr/bin/env python3
# Локальный сервер редактора: отдает app/ и принимает:
#   POST /save  -> пишет app/data.js, прогоняет cachebust и sitegen;
#   POST /build -> сборка dist/ кнопкой «Собрать dist» (build.js сам гоняет validate, sitegen и cachebust).
# Запуск: ./start.command или python3 scripts/serve.py  →  http://127.0.0.1:8123/editor.html
import http.server
import os
import shutil
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, "app")
DATA = os.path.join(APP, "data.js")
PORT = 8123

NO_NODE = "Node.js не найден — установите с nodejs.org (нужен для cachebust/validate/сборки; пакеты ставить не нужно)"


def run_node(script):
    """Запускает scripts/<script>, возвращает (код, объединенный вывод)."""
    try:
        r = subprocess.run(
            ["node", os.path.join(ROOT, "scripts", script)],
            capture_output=True,
            text=True,
        )
    except FileNotFoundError:
        return 127, NO_NODE
    return r.returncode, (r.stdout + r.stderr).strip()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=APP, **kw)

    # Как GitHub Pages: /survey2026 отдает survey2026.html
    def translate_path(self, path):
        p = super().translate_path(path)
        if not os.path.exists(p) and not os.path.splitext(p)[1]:
            html = p.rstrip("/") + ".html"
            if os.path.isfile(html):
                return html
        return p

    # Как GitHub Pages: вместо стандартной 404 — наша app/404.html
    # (стили там подключены абсолютным путем, работает с любого адреса)
    def send_error(self, code, message=None, explain=None):
        page = os.path.join(APP, "404.html")
        if code == 404 and self.command == "GET" and os.path.isfile(page):
            with open(page, "rb") as f:
                body = f.read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().send_error(code, message, explain)

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
            # После записи каталога обновляем историю до пересчета версий ассетов.
            history_code, _ = run_node("changes.js")
            # data.js изменился — обновляем ?v= на страницах и sitemap/llms.txt
            # (не критично при сбое)
            run_node("cachebust.js")
            run_node("sitegen.js")
            self._respond(200, "saved" if history_code == 0 else "history-warning")
        elif path == "/build":
            # build.js сам гоняет validate, sitegen и cachebust
            code, text = run_node("build.js")
            self._respond(200 if code == 0 else 500, text)
        else:
            self.send_error(404)


if __name__ == "__main__":
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Ландшафт: http://127.0.0.1:{PORT}/")
    print(f"Редактор: http://127.0.0.1:{PORT}/editor.html  →  пишет в {DATA}")
    if not shutil.which("node"):
        print(f"⚠ {NO_NODE}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
