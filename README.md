# Ландшафт технологий 1С

Интерактивная карта экосистемы технологий для разработчика на 1С и около 1С — наследник линейного каталога [StackTechnologies1C](https://github.com/Oxotka/StackTechnologies1C).

Цель — дать не просто список, а **навигацию** по двум осям: функциональной роли (разработчик / администратор / DevOps / аналитик / тестировщик) и контексту работы (франчайзи / инхаус / продукты / проекты / фриланс), плюс фильтры по зрелости (`базовое` / `продвинутое` / `нишевое` / `устаревает`), лицензии и происхождению (важно для импортозамещения), с карточками технологий и автоматическими метриками open-source проектов.

## Статус

🚧 Ранняя стадия. Сейчас в репозитории — техническое задание и стартовая структура под движок [landscape2](https://github.com/cncf/landscape2). См. **[docs/TZ.md](docs/TZ.md)**.

## Подход

Не пишем движок с нуля — переиспользуем открытый генератор **landscape2** (тот же, что у [CNCF Landscape](https://landscape.cncf.io)): на входе YAML-данные, на выходе статический интерактивный сайт. Деплой на GitHub Pages.

## Структура репозитория

- `docs/TZ.md` — техническое задание
- `data/landscape.yml` — данные ландшафта (категории, подкатегории, элементы)
- `data/settings.yml` — настройки сайта (фильтры, оформление)
- `logos/` — логотипы технологий (SVG)
- `.github/workflows/deploy.yml` — сборка и публикация (черновик)

## Локальная сборка

Требуется установленный [landscape2](https://github.com/cncf/landscape2#installation).

```bash
landscape2 build \
  --data-file data/landscape.yml \
  --settings-file data/settings.yml \
  --logos-path logos \
  --output-dir build
```

Результат — статический сайт в `build/`.

## Источники данных

- Каталог [StackTechnologies1C](https://github.com/Oxotka/StackTechnologies1C) (миграция парсером)
- [OpenYellow](https://openyellow.org) — агрегатор open-source проектов 1С

## Лицензия

[MIT](LICENSE)
