// Данные ландшафта (Вариант B). Сгенерировано редактором разметки (editor.html).
window.LANDSCAPE = {
  "updated": "12 июня 2026",
  "categories": [
    "Прототипирование и диаграммы",
    "Моделирование и архитектура",
    "База знаний",
    "Разработка",
    "Библиотеки и инструменты",
    "Плагины и расширения",
    "ИИ-ассистенты",
    "Системы хранения версий",
    "CI/CD",
    "Автоматизированное тестирование",
    "Статический анализ кода",
    "Код-ревью",
    "Администрирование 1С",
    "Сетевая инфраструктура и облако",
    "Безопасность",
    "Системы управления базами данных (СУБД)",
    "Мониторинг",
    "Производительность и нагрузочное тестирование",
    "Интеграции",
    "API и веб-сервисы",
    "BI-системы",
    "Задачи",
    "Сертификация"
  ],
  "blocks": [
    {
      "name": "Проектирование",
      "categories": [
        "Прототипирование и диаграммы",
        "Моделирование и архитектура",
        "База знаний"
      ]
    },
    {
      "name": "Разработка",
      "categories": [
        "Разработка",
        "Библиотеки и инструменты",
        "Плагины и расширения",
        "ИИ-ассистенты",
        "Системы хранения версий",
        "CI/CD"
      ]
    },
    {
      "name": "Качество",
      "categories": [
        "Автоматизированное тестирование",
        "Статический анализ кода",
        "Код-ревью"
      ]
    },
    {
      "name": "Инфраструктура и эксплуатация",
      "categories": [
        "Администрирование 1С",
        "Сетевая инфраструктура и облако",
        "Безопасность",
        "Системы управления базами данных (СУБД)",
        "Мониторинг",
        "Производительность и нагрузочное тестирование"
      ]
    },
    {
      "name": "Данные и интеграции",
      "categories": [
        "Интеграции",
        "API и веб-сервисы",
        "BI-системы"
      ]
    },
    {
      "name": "Управление и компетенции",
      "categories": [
        "Задачи",
        "Сертификация"
      ]
    }
  ],
  "axes": {
    "role": {
      "label": "Роль",
      "values": [
        "разработчик",
        "администратор",
        "тестировщик",
        "аналитик"
      ]
    },
    "context": {
      "label": "Контекст работы",
      "values": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ]
    },
    "maturity": {
      "label": "Зрелость",
      "values": [
        "базовое",
        "продвинутое",
        "нишевое"
      ]
    },
    "origin": {
      "label": "Происхождение",
      "values": [
        "отечественное",
        "зарубежное"
      ]
    },
    "license": {
      "label": "Лицензия",
      "values": [
        "open-source",
        "проприетарное",
        "бесплатное"
      ]
    },
    "availability": {
      "label": "Доступность",
      "values": [
        "доступен",
        "ограничен"
      ]
    }
  },
  "items": [
    {
      "name": "Встроенный язык программирования 1С:Предприятия",
      "added": "2026-06-08",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "1c.png",
      "description": "Основной язык разработки прикладных решений на платформе 1С",
      "why": "Это основной язык разработки программиста 1С. Львиную часть работы делаем именно с помощью этого языка",
      "homepage": "https://v8.1c.ru/platforma/",
      "repo": null,
      "start": [
        {
          "label": "М.Г. Радченко. - 1С:Программирование для начинающих",
          "url": "https://its.1c.ru/db/pubprogforbeginners"
        },
        {
          "label": "Учебный центр 1С",
          "url": "https://uc1.1c.ru"
        },
        {
          "label": "Курсы по 1С.рф",
          "url": "https://курсы-по-1с.рф"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "встроенный язык",
        "язык 1с",
        "1с язык",
        "bsl",
        "бсл",
        "код 1с"
      ]
    },
    {
      "name": "Язык запросов",
      "added": "2026-06-08",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "1c.png",
      "description": "Язык выборки данных из базы 1С на основе SQL, с учетом специфики 1С",
      "why": "Является составной частью платформы. Используется для запросов к базе данных",
      "homepage": "https://v8.1c.ru/platforma/mehanizm-zaprosov/",
      "repo": null,
      "start": [
        {
          "label": "Особенности языка запросов 1С",
          "url": "https://infostart.ru/1c/articles/204054/"
        },
        {
          "label": "Полезные сведения о языке запросов 1С 8.2",
          "url": "https://infostart.ru/1c/articles/165456/"
        },
        {
          "label": "Е. Ю. Хрусталева - Язык запросов 1С:Предприятия 8",
          "url": "https://its.1c.ru/db/pubqlang"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "запросы",
        "язык запросов",
        "sdbl",
        "сдбл",
        "query"
      ]
    },
    {
      "name": "Система компоновки данных (СКД)",
      "added": "2026-06-09",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "1c.png",
      "description": "Платформенный механизм для построения отчетов и сложной выборки данных без программирования",
      "why": "Стандартный механизм 1С для создания отчетов: запрос, настройки, группировки и оформление описываются декларативно. Знать СКД обязан каждый разработчик и аналитик 1С",
      "homepage": "https://v8.1c.ru/platforma/sistema-komponovki-dannykh/",
      "repo": null,
      "start": [
        {
          "label": "Е. Ю. Хрусталева - Разработка сложных отчетов в 1С:Предприятии 8. Система компоновки данных",
          "url": "https://its.1c.ru/db/pubcomplexreports"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "скд",
        "skd",
        "компоновка данных",
        "система компоновки"
      ],
      "depends": [
        "Язык запросов"
      ]
    },
    {
      "name": "1С:Предприятие.Элемент",
      "added": "2026-06-08",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "element.svg",
      "description": "Технология 1С для веб- и консьюмерских приложений",
      "why": "Используется для создания веб-приложений для пользователей (консьюмерские приложения)",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "1С:Предприятие.Элемент",
          "url": "https://1cmycloud.com/welcome/"
        },
        {
          "label": "Новая технология разработки приложений",
          "url": "https://wonderland.v8.1c.ru/blog/novaya-tekhnologiya-razrabotki-prilozheniy/"
        },
        {
          "label": "Технология 1С:Предприятие.Элемент",
          "url": "https://v8.1c.ru/platforma/1s-predpriyatie-element/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "элемент",
        "1c element",
        "element",
        "1с элемент"
      ]
    },
    {
      "name": "1C:Предприятие.Элемент Скрипт",
      "added": "2026-06-10",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "ispolnitel.png",
      "description": "Среда выполнения скриптов на языке 1С:Элемент (бывший 1С:Исполнитель)",
      "why": "Нужен для автоматизации рутинных задач и администрирования. Имеет преимущества перед традиционными командными интерпретаторами. Условный python или OneScript но с синтаксисом Элемента",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Что такое 1С:Предприятие.Элемент Скрипт",
          "url": "https://1cmycloud.com/console/help/lang/docs/topics/what-is-1c-element-script/"
        },
        {
          "label": "1С-Исполнитель",
          "url": "https://wonderland.v8.1c.ru/blog/1c-ispolnitel/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "продукты",
        "проекты"
      ],
      "aliases": [
        "элемент скрипт",
        "исполнитель",
        "element script",
        "1с исполнитель"
      ],
      "depends": [
        "1С:Предприятие.Элемент"
      ]
    },
    {
      "name": "OneScript",
      "added": "2026-06-08",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "onescript.png",
      "description": "Кроссплатформенный движок языка 1С для скриптов без установки платформы",
      "why": "Позволяет решать задачи автоматизации рутинных операций. Низкий порог входа, так как используется тот же синтаксис языка",
      "homepage": "https://oscript.io/",
      "repo": "https://github.com/EvilBeaver/OneScript",
      "start": [
        {
          "label": "Начало работы с OneScript",
          "url": "https://infostart.ru/1c/articles/687869/"
        },
        {
          "label": "Как решать повседневные задачи с помощью OneScript",
          "url": "http://infostart.ru/public/327581/"
        },
        {
          "label": "Обзор имеющихся библиотек OneScript",
          "url": "https://infostart.ru/1c/articles/699642/"
        },
        {
          "label": "Примеры скриптов на OneScript",
          "url": "https://infostart.ru/public/537028/"
        },
        {
          "label": "Исчерпывающее руководство по созданию библиотеки OneScript",
          "url": "https://infostart.ru/1c/articles/791568/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "онскрипт",
        "ванскрипт",
        "oscript",
        "one script"
      ]
    },
    {
      "name": "Конфигуратор",
      "added": "2026-06-07",
      "category": "Разработка",
      "subcategory": "IDE",
      "logo": "configurator.png",
      "description": "Классическая среда разработки в составе платформы 1С:Предприятие",
      "why": "Используется для разработки и доработки конфигураций",
      "homepage": "https://v8.1c.ru/platforma/sreda-bystroy-razrabotki/",
      "repo": null,
      "start": [
        {
          "label": "Основные приемы работы в конфигураторе",
          "url": "https://курсы-по-1с.рф/articles/приемы-работы-в-конфигураторе/"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "configurator",
        "конфа",
        "конфигуратор 1с"
      ],
      "analogs": [
        "1C:Enterprise Development Tools (EDT)",
        "Visual Studio Code (VSCode)"
      ],
      "depends": [
        "Хранилище",
        "Файловая СУБД"
      ]
    },
    {
      "name": "1C:Enterprise Development Tools (EDT)",
      "added": "2026-06-07",
      "category": "Разработка",
      "subcategory": "IDE",
      "logo": "edt.png",
      "description": "Современная среда разработки 1С на базе Eclipse",
      "why": "Используется для разработки и доработки конфигураций",
      "homepage": "https://edt.1c.ru/",
      "repo": "https://github.com/1C-Company/1c-edt-issues",
      "start": [
        {
          "label": "Знакомство на примерах",
          "url": "https://edt.1c.ru/docs/examples/"
        },
        {
          "label": "Постепенный процесс перехода на EDT",
          "url": "https://edt.1c.ru/upload/docs_git/topics/t000040.html"
        },
        {
          "label": "Курс по работе в EDT: от установки до командной разработки",
          "url": "https://uc1.1c.ru/course/kurs-po-rabote-v-edt-ot-ustanovki-do-komandnoj-razrabotki/"
        },
        {
          "label": "1С:EDT – работа с Git",
          "url": "https://youtu.be/kTSi25rrz4g"
        },
        {
          "label": "https://t.me/edt1c",
          "url": "https://t.me/edt1c"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "проекты",
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "едт",
        "edt",
        "1с едт",
        "enterprise development tools"
      ],
      "analogs": [
        "Конфигуратор",
        "Visual Studio Code (VSCode)"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Visual Studio Code (VSCode)",
      "added": "2026-06-07",
      "category": "Разработка",
      "subcategory": "IDE",
      "logo": "vscode.svg",
      "description": "Легкий кроссплатформенный редактор кода для около-1С разработки",
      "why": "Может использоваться как редактор кода для около 1Сных технологий (OneScript, Vanessa и другие)",
      "homepage": "https://code.visualstudio.com",
      "repo": null,
      "start": [
        {
          "label": "Подробный гайд для начинающих",
          "url": "https://habr.com/ru/post/490754/"
        },
        {
          "label": "Поддержка языка 1С:Предприятие 8 (BSL)",
          "url": "https://github.com/1c-syntax/vsc-language-1c-bsl"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор",
        "тестировщик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "вскод",
        "вс код",
        "вижуал студио код",
        "vs code",
        "вскоде"
      ],
      "analogs": [
        "Конфигуратор",
        "1C:Enterprise Development Tools (EDT)",
        "Cursor"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Библиотека стандартных подсистем (БСП)",
      "added": "2026-06-09",
      "category": "Библиотеки и инструменты",
      "subcategory": "Подсистемы и обработки",
      "logo": "1c.png",
      "description": "Набор готовых подсистем и стандартных механизмов от 1С — основа для разработки прикладных решений",
      "why": "Базовая библиотека, на которой строятся типовые конфигурации 1С. Дает готовые механизмы (права, печать, обмен данными, версионирование) и единые стандарты, экономя время разработки",
      "homepage": "https://its.1c.ru/db/bspdoc",
      "repo": null,
      "start": [
        {
          "label": "Библиотека стандартных подсистем на ИТС",
          "url": "https://its.1c.ru/db/bspdoc"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "бсп",
        "bsp",
        "ssl",
        "стандартные подсистемы"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия",
        "Стандарты разработки"
      ]
    },
    {
      "name": "TurboConf",
      "added": "2026-06-08",
      "category": "Плагины и расширения",
      "subcategory": "Для Конфигуратора",
      "logo": "turboconf.png",
      "description": "Расширение Конфигуратора, автоматизирующее рутину разработки",
      "why": "Улучшает работу в Конфигураторе 1С",
      "homepage": "https://turboconf.ru",
      "repo": null,
      "start": [
        {
          "label": "TurboConf:Cloud - облачные сервисы в Конфигураторе",
          "url": "https://infostart.ru/public/292440/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус"
      ],
      "aliases": [
        "турбоконф",
        "турбо конф",
        "turbo conf"
      ],
      "analogs": [
        "Плагин для конфигуратора PhoenixBSL"
      ],
      "depends": [
        "Конфигуратор"
      ]
    },
    {
      "name": "Подсистема \"Инструменты разработчика\"",
      "added": "2026-06-08",
      "category": "Библиотеки и инструменты",
      "subcategory": "Подсистемы и обработки",
      "logo": "devtools.png",
      "description": "Набор внутренних инструментов разработчика: консоли запросов, кода, СКД",
      "why": "Набор инструментов разработчика, который помогает в ежедневной работе",
      "homepage": "http://devtool1c.ucoz.ru",
      "repo": null,
      "start": [
        {
          "label": "https://infostart.ru/public/15126/",
          "url": "https://infostart.ru/public/15126/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "инструменты разработчика",
        "ир",
        "подсистема инструменты разработчика"
      ],
      "analogs": [
        "Подсистема \"Универсальные инструменты 1С для управляемых форм\"",
        "Infostart Toolkit"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия"
      ]
    },
    {
      "name": "Подсистема \"Универсальные инструменты 1С для управляемых форм\"",
      "added": "2026-06-08",
      "category": "Библиотеки и инструменты",
      "subcategory": "Подсистемы и обработки",
      "logo": "universal-tools.png",
      "description": "Набор инструментов разработчика для управляемых форм",
      "why": "Набор инструментов разработчика, который помогает в ежедневной работе (используется для управляемых форм)",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "https://github.com/cpr1c/tools_ui_1c/",
          "url": "https://github.com/cpr1c/tools_ui_1c/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "универсальные инструменты",
        "инструменты для управляемых форм"
      ],
      "analogs": [
        "Подсистема \"Инструменты разработчика\"",
        "Infostart Toolkit"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия"
      ]
    },
    {
      "name": "Infostart Toolkit",
      "added": "2026-06-08",
      "category": "Библиотеки и инструменты",
      "subcategory": "Подсистемы и обработки",
      "logo": "infostart-toolkit.png",
      "description": "Набор инструментов для анализа и обработки данных в базе 1С",
      "why": "Набор инструментов разработчика, который помогает в ежедневной работе",
      "homepage": "https://infostart.ru/public/1254364/",
      "repo": "https://github.com/infostart-hub/toolkit",
      "start": [
        {
          "label": "Infostart Toolkit - инструмент, в котором сделано то, что давно просят от 1С",
          "url": "https://www.youtube.com/watch?v=VMsRKL_KVMM"
        },
        {
          "label": "10 полезных, но малоизвестных возможностей IS Toolkit",
          "url": "https://infostart.ru/1c/articles/1431272/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "инфостарт тулкит",
        "infostart toolkit",
        "тулкит",
        "инфостарт"
      ],
      "analogs": [
        "Подсистема \"Инструменты разработчика\"",
        "Подсистема \"Универсальные инструменты 1С для управляемых форм\""
      ],
      "depends": [
        "Конфигуратор"
      ]
    },
    {
      "name": "Плагин для конфигуратора PhoenixBSL",
      "added": "2026-06-08",
      "category": "Плагины и расширения",
      "subcategory": "Для Конфигуратора",
      "logo": "phoenixbsl.png",
      "description": "Анализ и форматирование кода 1С в Конфигураторе на базе BSL LS",
      "why": "Быстрая проверка на соответствие стандарта кода в конфигураторе",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "https://github.com/otymko/phoenixbsl",
          "url": "https://github.com/otymko/phoenixbsl"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус"
      ],
      "aliases": [
        "феникс",
        "phoenix",
        "phoenixbsl",
        "феникс бсл"
      ],
      "analogs": [
        "TurboConf"
      ],
      "depends": [
        "Конфигуратор"
      ]
    },
    {
      "name": "Плагин 1С:Напарник",
      "added": "2026-06-08",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "1c.png",
      "description": "ИИ-ассистент разработчика 1С: подсказки, исправления, комментарии",
      "why": "- Повышение производительности Сокращает рутинные операции, освобождая время разработчиков для более сложных и интересных задач и повышая общую производительность разработки. - Улучшение качества кода Помогает разработчикам писать более качественный код, проверяя его на соответствие стандартам 1С и предлагая рекомендации по улучшению. - Интеграция в среду разработки Работает непосредственно в 1С:EDT, без необходимости переключения между окнами, что упрощает процесс разработки и экономит время. - Понимание контекста Напарник учитывает содержание конфигурации: метаданные, формы, пользовательские функции и процедуры, поэтому предоставляет более точные и полезные рекомендации",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "1С:Напарник",
          "url": "https://code.1c.ai"
        },
        {
          "label": "Небольшой обзор",
          "url": "https://t.me/AriN1C/231"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "проекты",
        "продукты"
      ],
      "aliases": [
        "напарник",
        "1с напарник",
        "naparnik",
        "копилот 1с"
      ],
      "analogs": [
        "GigaCode",
        "GitHub Copilot"
      ],
      "depends": [
        "1C:Enterprise Development Tools (EDT)"
      ]
    },
    {
      "name": "GigaCode",
      "added": "2026-06-09",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "gigacode.png",
      "description": "Российский ИИ-ассистент для написания кода от Сбера: автодополнение и генерация в IDE",
      "why": "Подсказывает и генерирует код прямо в редакторе. Доступен в РФ, встроен в отечественные среды (в том числе в GitFlame) — рабочая альтернатива западным копайлотам без проблем с доступом",
      "homepage": "https://gitverse.ru/features/gigacode/",
      "repo": null,
      "start": [
        {
          "label": "Документация GigaCode",
          "url": "https://gitverse.ru/docs/ai/ai-assistant-gigacode/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "гигакод",
        "гига код",
        "giga code",
        "сбер gigacode"
      ],
      "analogs": [
        "Плагин 1С:Напарник",
        "GitHub Copilot"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ]
    },
    {
      "name": "GitHub Copilot",
      "added": "2026-06-09",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "github-copilot.svg",
      "logoInvert": true,
      "description": "Самый массовый ИИ-ассистент для написания кода прямо в редакторе",
      "why": "Автодополнение и генерация кода в IDE на основе сильных моделей. С кодом на 1С и OneScript справляется уверенно, особенно когда видит контекст проекта. Доступ из РФ ограничен",
      "homepage": "https://github.com/features/copilot",
      "repo": null,
      "start": [
        {
          "label": "Copilot — твой парный ИИ-программист",
          "url": "https://infostart.ru/1c/articles/2175351/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "гитхаб копилот",
        "копилот",
        "copilot"
      ],
      "analogs": [
        "Плагин 1С:Напарник",
        "GigaCode"
      ],
      "depends": [
        "GitHub"
      ]
    },
    {
      "name": "Cursor",
      "added": "2026-06-09",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "cursor.svg",
      "logoInvert": true,
      "description": "Редактор кода с ИИ-агентом: генерация и рефакторинг по всему проекту в диалоге",
      "why": "Понимает проект целиком и вносит изменения по запросу на естественном языке. С задачами на 1С работает хорошо при достаточном контексте. Доступ из РФ ограничен",
      "homepage": "https://cursor.com",
      "repo": null,
      "start": [
        {
          "label": "[1С + ИИ] ИИ сделал внешнюю обработку за 19 минут. За сколько сделаешь ты?",
          "url": "https://infostart.ru/1c/articles/2708708/"
        },
        {
          "label": "[1С + ИИ] Вайбкодинг на 1С — Проще простого! Быстрый старт!",
          "url": "https://infostart.ru/1c/articles/2624937/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "курсор",
        "cursor ai",
        "курсор ии"
      ],
      "analogs": [
        "Visual Studio Code (VSCode)",
        "Claude Code",
        "Codex",
        "Kiro"
      ]
    },
    {
      "name": "Claude Code",
      "added": "2026-06-09",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "claude.svg",
      "description": "CLI-агент Anthropic: выполняет задачи разработки в терминале, читая и правя проект",
      "why": "Работает в терминале как агент: разбирается в кодовой базе и вносит правки по задаче. Сильные модели уверенно ориентируются и в коде на 1С. Доступ из РФ ограничен",
      "homepage": "https://www.anthropic.com/claude-code",
      "repo": null,
      "start": [
        {
          "label": "Вайб-кодинг в 1С: рутинные скиллы Claude Code",
          "url": "https://infostart.ru/1c/articles/2650687/"
        },
        {
          "label": "Практика разработки в 1С с AI-агентом: конфигурация с нуля",
          "url": "https://infostart.ru/1c/articles/2618356/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "клод код",
        "клауд код",
        "claude",
        "клод"
      ],
      "analogs": [
        "Cursor",
        "Codex"
      ]
    },
    {
      "name": "Codex",
      "added": "2026-06-09",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "openai.svg",
      "logoInvert": true,
      "description": "CLI-агент OpenAI для автоматизации задач разработки в терминале",
      "why": "Агент, который выполняет задачи разработки в терминале и в облаке. Применим и к проектам на 1С и OneScript. Доступ из РФ ограничен",
      "homepage": "https://openai.com/codex/",
      "repo": null,
      "start": [
        {
          "label": "[1С + ИИ] ИИ сделал внешнюю обработку за 19 минут. За сколько сделаешь ты?",
          "url": "https://infostart.ru/1c/articles/2708708/"
        },
        {
          "label": "[1С + ИИ] Вайбкодинг на 1С — Проще простого! Быстрый старт!",
          "url": "https://infostart.ru/1c/articles/2624937/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "кодекс",
        "openai codex",
        "кодекс openai"
      ],
      "analogs": [
        "Cursor",
        "Claude Code"
      ]
    },
    {
      "name": "Плагин для VSCode «1C:Platform Tools»",
      "added": "2026-06-10",
      "category": "Плагины и расширения",
      "subcategory": "Для VSCode",
      "logo": "vscode.svg",
      "description": "Расширение VSCode с инструментами разработки на платформе 1С",
      "why": "Позволяет работать с около-1Сными проектами прямо в VSCode: запуск команд `vanessa-runner`, навигация по проектам, дерево метаданных, ER-диаграммы, отладка 1С и интеграция с AI-агентами через MCP — в одной панели",
      "homepage": null,
      "repo": "https://github.com/yellow-hammer/vscode-1c-platform-tools",
      "start": [
        {
          "label": "Visual Studio Marketplace",
          "url": "https://marketplace.visualstudio.com/items?itemName=yellow-hammer.1c-platform-tools"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "platform tools",
        "платформ тулс",
        "1c platform tools"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ]
    },
    {
      "name": "Плагины для 1С:EDT",
      "added": "2026-06-08",
      "category": "Плагины и расширения",
      "subcategory": "Для EDT",
      "logo": "edt.png",
      "description": "Официальные и сторонние плагины, расширяющие 1С:EDT",
      "why": "Улучшают работу разработчика в 1C:EDT",
      "homepage": "https://edt.1c.ru/ext/",
      "repo": null,
      "start": [
        {
          "label": "Список плагинов, которые можно/нужно использовать в 1C:EDT",
          "url": "https://github.com/marmyshev/edt-plugins"
        },
        {
          "label": "Как сделать плагин для 1С:EDT для начинающего",
          "url": "https://infostart.ru/1c/articles/1311121/"
        },
        {
          "label": "12 плагинов для 1С:EDT, которые сделают работу разработчика удобнее и быстрее",
          "url": "https://курсы-по-1с.рф/news/2022-03-28-twelve-edt-plugins-for-ease-and-speed/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "плагины едт",
        "edt plugins",
        "плагины edt"
      ],
      "depends": [
        "1C:Enterprise Development Tools (EDT)"
      ]
    },
    {
      "name": "Библиотеки для OneScript",
      "added": "2026-06-08",
      "category": "Библиотеки и инструменты",
      "subcategory": "Для OneScript",
      "logo": "oscript-library.png",
      "description": "Готовые библиотеки сообщества для экосистемы OneScript",
      "why": "Не писать инфраструктуру с нуля: HTTP-клиенты, работа с JSON и архивами, CI-обвязка и тесты берутся готовыми пакетами",
      "homepage": null,
      "repo": "https://github.com/oscript-library",
      "start": [
        {
          "label": "Обзор имеющихся библиотек OneScript",
          "url": "https://infostart.ru/1c/articles/699642"
        },
        {
          "label": "https://oscript.io/learn/libraries",
          "url": "https://oscript.io/learn/libraries"
        },
        {
          "label": "Пакетный менеджер OneScript",
          "url": "https://github.com/oscript-library/opm"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "библиотеки онскрипт",
        "oscript library",
        "oscript-library",
        "библиотеки oscript"
      ],
      "depends": [
        "OneScript"
      ]
    },
    {
      "name": "Autumn (ОСень)",
      "added": "2026-06-08",
      "category": "Библиотеки и инструменты",
      "subcategory": "Для OneScript",
      "logo": "autumn.png",
      "description": "Фреймворк компонентных приложений для OneScript (DI/IoC)",
      "why": "Когда нужно быстро собрать приложение на OneScript, которое можно легко расширять и поддерживать. Особенно полезен, если проект состоит из множества взаимосвязанных модулей — Autumn сам организует их взаимодействие и избавит от лишней «склейки» кода",
      "homepage": "https://autumn-library.github.io/getting-started/about-autumn",
      "repo": "https://github.com/autumn-library",
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "осень",
        "autumn",
        "отумн"
      ],
      "depends": [
        "OneScript"
      ]
    },
    {
      "name": "BSL Language Server",
      "added": "2026-06-08",
      "category": "Плагины и расширения",
      "subcategory": null,
      "logo": "bsl-language-server.png",
      "description": "Языковой сервер для кода 1С (BSL): диагностики, автодополнение, форматирование",
      "why": "Подсвечивает ошибки и нарушения стандартов прямо в VSCode и 1С:EDT; лежит в основе многих проверок качества кода 1С",
      "homepage": "https://1c-syntax.github.io/bsl-language-server/",
      "repo": "https://github.com/1c-syntax/bsl-language-server",
      "start": [
        {
          "label": "Как проверять код на языке 1С с помощью BSL Language Server",
          "url": "https://infostart.ru/1c/articles/1789716/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "бсл лс",
        "bsl ls",
        "bsl language server",
        "бсл сервер",
        "лангуэдж сервер"
      ],
      "depends": [
        "Visual Studio Code (VSCode)",
        "1C:Enterprise Development Tools (EDT)"
      ]
    },
    {
      "name": "OneScript Debug (BSL)",
      "added": "2026-06-10",
      "category": "Плагины и расширения",
      "subcategory": "Для VSCode",
      "logo": "onescript-debug.png",
      "description": "Отладка скриптов OneScript прямо в VSCode",
      "why": "Дает точки останова и пошаговую отладку OneScript-скриптов в редакторе — без внешних средств",
      "homepage": "https://marketplace.visualstudio.com/items?itemName=EvilBeaver.oscript-debug",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "onescript debug",
        "ванскрипт дебаг",
        "отладчик onescript"
      ],
      "depends": [
        "Visual Studio Code (VSCode)",
        "OneScript"
      ]
    },
    {
      "name": "Language 1C (BSL)",
      "added": "2026-06-10",
      "category": "Плагины и расширения",
      "subcategory": "Для VSCode",
      "logo": "bsl-language-server.png",
      "description": "Подсветка синтаксиса, автодополнение и навигация по коду 1С (BSL) в VSCode",
      "why": "Превращает VSCode в полноценный редактор кода 1С: подсветка, автодополнение и переход к определению",
      "homepage": "https://marketplace.visualstudio.com/items?itemName=1c-syntax.language-1c-bsl",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "language 1c",
        "язык 1с bsl",
        "bsl vscode",
        "лэнгвич 1с"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ]
    },
    {
      "name": "Cucumber (Gherkin) Full Support",
      "added": "2026-06-10",
      "category": "Плагины и расширения",
      "subcategory": "Для VSCode",
      "logo": "cucumber.png",
      "description": "Автодополнение и подсветка Gherkin для feature-файлов (BDD, Vanessa-Automation)",
      "why": "Помогает писать BDD-сценарии: автодополнение шагов, подсветка и переход к определениям в feature-файлах",
      "homepage": "https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "cucumber",
        "gherkin",
        "геркин",
        "кукумбер"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ]
    },
    {
      "name": "Gherkin Table Align",
      "added": "2026-06-10",
      "category": "Плагины и расширения",
      "subcategory": "Для VSCode",
      "logo": "gherkin-table-align.png",
      "description": "Выравнивание таблиц в Gherkin-сценариях",
      "why": "Автоматически выравнивает столбцы таблиц в feature-файлах — сценарии читать и поддерживать проще",
      "homepage": "https://marketplace.visualstudio.com/items?itemName=AlanCole.gherkintablealign",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "gherkin table align",
        "выравнивание таблиц gherkin",
        "геркин"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ]
    },
    {
      "name": "Allure Support",
      "added": "2026-06-10",
      "category": "Плагины и расширения",
      "subcategory": "Для VSCode",
      "logo": "allure-support.png",
      "description": "Поддержка Allure в VSCode: подсказки и навигация по разметке тестов",
      "why": "Упрощает работу с Allure прямо в редакторе — подсказки и переходы по разметке отчетов",
      "homepage": "https://marketplace.visualstudio.com/items?itemName=qameta.allure-vscode",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "allure support",
        "аллюр vscode",
        "аллюр"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ]
    },
    {
      "name": "gitsync",
      "added": "2026-06-08",
      "category": "Системы хранения версий",
      "subcategory": "Синхронизация с 1С",
      "logo": "oscript-library.png",
      "description": "Выгрузка истории Хранилища конфигурации 1С в git (и Mercurial)",
      "why": "Переносит коммиты из Хранилища 1С в git с сохранением авторов и комментариев — мост к нормальному версионированию",
      "homepage": null,
      "repo": "https://github.com/oscript-library/gitsync",
      "start": [
        {
          "label": "Синхронизация хранилища 1С и git с OneScript и Gitsync",
          "url": "https://infostart.ru/1c/articles/903269/"
        },
        {
          "label": "GitSync 3.0. Шпаргалка по использованию",
          "url": "https://infostart.ru/1c/articles/1157400/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гитсинк",
        "гит синк",
        "git sync"
      ],
      "analogs": [
        "1С:ГитКонвертер"
      ],
      "depends": [
        "Хранилище",
        "git",
        "OneScript"
      ]
    },
    {
      "name": "1С:ГитКонвертер",
      "added": "2026-06-09",
      "category": "Системы хранения версий",
      "subcategory": "Синхронизация с 1С",
      "logo": "1c.png",
      "description": "Односторонняя синхронизация хранилища конфигурации 1С с репозиторием Git и переход на разработку в 1С:EDT с сохранением истории",
      "why": "Мост между классическим хранилищем 1С и git-процессом: переносит историю из хранилища в Git и позволяет перейти на разработку в 1С:EDT",
      "homepage": null,
      "repo": "https://github.com/1C-Company/GitConverter",
      "start": [
        {
          "label": "Документация 1С:ГитКонвертер",
          "url": "https://its.1c.ru/db/metod8dev#content:5937:hdoc"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "гитконвертер",
        "гит конвертер",
        "gitconverter",
        "git converter"
      ],
      "analogs": [
        "gitsync"
      ],
      "depends": [
        "git",
        "Хранилище"
      ]
    },
    {
      "name": "Консоль запросов",
      "added": "2026-06-08",
      "category": "Библиотеки и инструменты",
      "subcategory": "Подсистемы и обработки",
      "logo": "1c.png",
      "description": "Внешняя обработка для выполнения произвольных запросов на языке запросов 1С",
      "why": "Главный инструмент ad-hoc анализа данных: посмотреть содержимое таблиц, проверить гипотезу по данным и отладить запрос отчета без доработки конфигурации",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Все консоли запросов для 1С",
          "url": "https://infostart.ru/1c/articles/1828459/"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "консоль запросов",
        "query console"
      ],
      "depends": [
        "Язык запросов"
      ]
    },
    {
      "name": "Файловая СУБД",
      "added": "2026-06-08",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Встроенное в платформу файловое хранилище данных 1С",
      "why": "Позволяет начать работу сразу из коробки и не тратить время на развертывание и администрирование базы данных",
      "homepage": "https://v8.1c.ru/platforma/faylovaya-baza-dannykh/",
      "repo": null,
      "start": [],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "файловая база",
        "файловая бд",
        "file database",
        "файловый режим"
      ],
      "depends": [
        "Конфигуратор"
      ]
    },
    {
      "name": "PostgreSQL",
      "added": "2026-06-08",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": "Семейство PostgreSQL",
      "logo": "postgresql.svg",
      "description": "Свободная СУБД; «1С» выпускает и поддерживает свою сборку PostgreSQL",
      "why": "PostgreSQL - это бесплатная СУБД, которая в текущих реалиях является одной из самых рекомендуемых",
      "homepage": "https://v8.1c.ru/platforma/postgresql/",
      "repo": null,
      "start": [
        {
          "label": "Настройка PostgreSQL 11.5 и 1C: Предприятие 8.3.16 на Windows Server 2008R2",
          "url": "https://infostart.ru/1c/articles/1180438/"
        },
        {
          "label": "Настройка PostgreSQL для работы в связке с 1С 8.х на платформе Windows Server 2012, объем БД более 200 Гб",
          "url": "https://infostart.ru/1c/tools/554213/"
        },
        {
          "label": "1С Батл: PostgreSQL 9,10 vs MS SQL 2016",
          "url": "https://infostart.ru/1c/articles/962876/"
        },
        {
          "label": "Немного о конфигурировании PostgreSQL",
          "url": "https://infostart.ru/1c/articles/325482/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "проекты",
        "инхаус",
        "франчайзи"
      ],
      "aliases": [
        "постгрес",
        "постгрескл",
        "постгре",
        "postgres",
        "пг"
      ],
      "analogs": [
        "Microsoft SQLServer",
        "Postgres Pro",
        "Oracle Database",
        "IBM Db2",
        "Tantor SE 1C",
        "Platform V Pangolin"
      ]
    },
    {
      "name": "Microsoft SQLServer",
      "added": "2026-06-08",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": "Зарубежные коммерческие",
      "logo": "sqlserver.svg",
      "description": "Проприетарная СУБД Microsoft с языком запросов Transact-SQL",
      "why": "Исторически основная СУБД для серверных баз 1С на Windows; знание T-SQL помогает диагностировать и оптимизировать запросы под нагрузкой",
      "homepage": "https://1c.ru/rus/products/1c+microsoft.htm",
      "repo": null,
      "start": [
        {
          "label": "Как правильно настроить MS SQL сервер для работы с 1С",
          "url": "https://infostart.ru/1c/articles/65955/"
        },
        {
          "label": "1С Предприятие 8.3.23 и MS SQL 2022",
          "url": "https://youtu.be/FcAPsYfhaFs?si=tEgUfh8c6ziAIvz9"
        },
        {
          "label": "Курс «Администрирование и оптимизация MS SQL Server для поддержки системы 1С:Предприятие»",
          "url": "https://www.specialist.ru/course/1c82skvl"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "мс скуль",
        "ms sql",
        "sql server",
        "скуль сервер",
        "майкрософт sql"
      ],
      "analogs": [
        "PostgreSQL",
        "Postgres Pro",
        "Oracle Database",
        "IBM Db2"
      ]
    },
    {
      "name": "Postgres Pro",
      "added": "2026-06-08",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": "Семейство PostgreSQL",
      "logo": "postgrespro.svg",
      "description": "Российская СУБД на базе PostgreSQL с поддержкой и сертификацией для 1С",
      "why": "Отечественная замена PostgreSQL/MS SQL для продуктива 1С: входит в реестр ПО, оптимизирована под нагрузку 1С",
      "homepage": "https://postgrespro.ru/",
      "repo": null,
      "start": [
        {
          "label": "Postgres Pro для 1С — страница продукта",
          "url": "https://postgrespro.ru/products/1c"
        },
        {
          "label": "Инструкция по установке Postgres для OLTP-приложений и 1С",
          "url": "https://infostart.ru/1c/articles/2041886/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "постгрес про",
        "постгрес pro",
        "postgrespro"
      ],
      "analogs": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Oracle Database",
        "IBM Db2",
        "Tantor SE 1C",
        "Platform V Pangolin"
      ],
      "depends": [
        "PostgreSQL"
      ]
    },
    {
      "name": "Oracle Database",
      "added": "2026-06-08",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": "Зарубежные коммерческие",
      "logo": "oracle.svg",
      "description": "Промышленная СУБД Oracle, поддерживаемая платформой 1С:Предприятие",
      "why": "Используется как СУБД для крупных внедрений 1С, где исторически стоял Oracle",
      "homepage": "https://www.oracle.com/database/",
      "repo": null,
      "start": [
        {
          "label": "Особенности работы платформы 1С с СУБД Oracle Database",
          "url": "https://infostart.ru/1c/articles/340996/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "оракл",
        "oracle",
        "оракл бд",
        "оракле"
      ],
      "analogs": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Postgres Pro",
        "IBM Db2"
      ]
    },
    {
      "name": "IBM Db2",
      "added": "2026-06-08",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": "Зарубежные коммерческие",
      "logo": "ibm-db2.svg",
      "description": "СУБД IBM Db2, входящая в список поддерживаемых платформой 1С",
      "why": "Один из поддерживаемых 1С серверов БД; встречается в редких корпоративных ландшафтах",
      "homepage": "https://www.ibm.com/products/db2",
      "repo": null,
      "start": [
        {
          "label": "Рекомендации по настройке IBM DB2 в конфигурациях 1С",
          "url": "https://infostart.ru/1c/articles/353790/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "дб2",
        "db2",
        "ибм db2",
        "айбиэм db2"
      ],
      "analogs": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Postgres Pro",
        "Oracle Database"
      ]
    },
    {
      "name": "Хранилище",
      "added": "2026-06-08",
      "category": "Системы хранения версий",
      "subcategory": "Системы контроля версий",
      "logo": "1c.png",
      "description": "Штатный механизм платформы для коллективной разработки конфигураций",
      "why": "Используется для командной разработки, чтобы отслеживать версии кода. Используется при разработке в Конфигураторе",
      "homepage": "https://its.1c.ru/db/metod8dev#content:2287:hdoc",
      "repo": null,
      "start": [
        {
          "label": "Работа с хранилищем конфигурации в 1С",
          "url": "https://programmist1s.ru/hranilishhe-konfiguratsii-1s/"
        },
        {
          "label": "Важные вопросы про хранилище конфигурации",
          "url": "https://курсы-по-1с.рф/articles/статьи-хранилище-конфигурации/"
        },
        {
          "label": "Технология разветвленной разработки конфигураций",
          "url": "https://its.1c.ru/db/v8std/content/709/hdoc"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "хранилище конфигурации",
        "storage",
        "репозиторий 1с"
      ],
      "analogs": [
        "git"
      ]
    },
    {
      "name": "git",
      "added": "2026-06-07",
      "category": "Системы хранения версий",
      "subcategory": "Системы контроля версий",
      "logo": "git.svg",
      "description": "Распределенная система контроля версий — индустриальный стандарт",
      "why": "Используется для командной разработки, чтобы отслеживать версии кода. Используется при разработке в 1C:EDT",
      "homepage": "https://git-scm.com/book/ru/v2",
      "repo": "https://github.com/1C-Company/GitConverter?ysclid=lse94qtufp676076754",
      "start": [
        {
          "label": "1С:EDT о git",
          "url": "https://edt.1c.ru/upload/docs_git/topics/t000001.html"
        },
        {
          "label": "Github и 1С. Пошаговая инструкция на примере",
          "url": "https://infostart.ru/1c/articles/691382/"
        },
        {
          "label": "Git-flow в 1С",
          "url": "https://infostart.ru/1c/articles/310640/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гит"
      ],
      "analogs": [
        "Хранилище"
      ]
    },
    {
      "name": "GitLab",
      "added": "2026-06-08",
      "category": "Системы хранения версий",
      "subcategory": "Git-хостинги",
      "logo": "gitlab.svg",
      "description": "Платформа хостинга git-репозиториев с код-ревью и встроенным CI/CD",
      "why": "Хранит репозитории проектов 1С, ведет merge request'ы и запускает пайплайны Gitlab CI",
      "homepage": "https://about.gitlab.com/",
      "repo": null,
      "start": [
        {
          "label": "Git + 1С. Как подключиться к команде разработки",
          "url": "https://infostart.ru/1c/articles/864097/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гитлаб",
        "гит лаб",
        "git lab"
      ],
      "analogs": [
        "GitHub",
        "GitVerse",
        "Bitbucket"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "GitHub",
      "added": "2026-06-08",
      "category": "Системы хранения версий",
      "subcategory": "Git-хостинги",
      "logo": "github.svg",
      "logoInvert": true,
      "description": "Крупнейший хостинг git-репозиториев с pull request'ами и Actions",
      "why": "Здесь живет большинство open-source проектов экосистемы 1С (OneScript, Vanessa, BSL LS)",
      "homepage": "https://github.com/",
      "repo": null,
      "start": [
        {
          "label": "Github и 1С. Пошаговая инструкция на конкретном примере",
          "url": "https://infostart.ru/1c/articles/691382/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гитхаб",
        "гит хаб",
        "git hub"
      ],
      "analogs": [
        "GitLab",
        "GitVerse",
        "Bitbucket"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "GitVerse",
      "added": "2026-06-08",
      "category": "Системы хранения версий",
      "subcategory": "Git-хостинги",
      "logo": "gitverse.png",
      "description": "Отечественная платформа хостинга git-репозиториев от SberTech",
      "why": "Российская замена GitHub/GitLab для команд 1С: репозитории, код-ревью, CI и ИИ-ассистент GigaCode",
      "homepage": "https://gitverse.ru/",
      "repo": null,
      "start": [
        {
          "label": "Тест двух российских git-платформ: GitFlic и GitVerse",
          "url": "https://habr.com/ru/articles/886192/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гитверс",
        "гит верс",
        "git verse",
        "сбер гитверс"
      ],
      "analogs": [
        "GitLab",
        "GitHub",
        "Bitbucket"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Bitbucket",
      "added": "2026-06-08",
      "category": "Системы хранения версий",
      "subcategory": "Git-хостинги",
      "logo": "bitbucket.svg",
      "description": "Хостинг git-репозиториев от Atlassian с pull request'ами и интеграцией с Jira",
      "why": "Хранит репозитории проектов 1С и связывает коммиты с задачами Jira; есть встроенный CI (Bitbucket Pipelines)",
      "homepage": "https://bitbucket.org/",
      "repo": null,
      "start": [
        {
          "label": "Учебные материалы по Git от Atlassian (на русском)",
          "url": "https://www.atlassian.com/ru/git/tutorials"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "битбакет",
        "битбэкет",
        "bit bucket"
      ],
      "analogs": [
        "GitLab",
        "GitHub",
        "GitVerse"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Figma",
      "added": "2026-06-08",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Прототипы",
      "logo": "figma.svg",
      "description": "Облачный редактор интерфейсов и кликабельных прототипов с совместной работой",
      "why": "Проектирование макетов форм и пользовательских сценариев до реализации в 1С; аналитики и разработчики работают над прототипом совместно",
      "homepage": "https://www.figma.com/",
      "repo": null,
      "start": [
        {
          "label": "Справочный центр Figma (на русском)",
          "url": "https://help.figma.com/hc/ru"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "фигма"
      ],
      "analogs": [
        "Mockplus"
      ]
    },
    {
      "name": "Mockplus",
      "added": "2026-06-08",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Прототипы",
      "logo": "mockplus.png",
      "description": "Инструмент быстрого прототипирования интерфейсов и кликабельных макетов",
      "why": "Сборка прототипов экранов из готовых компонентов для согласования с заказчиком до разработки в 1С",
      "homepage": "https://www.mockplus.com/",
      "repo": null,
      "start": [
        {
          "label": "Справка Mockplus",
          "url": "https://help.mockplus.com/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "мокплюс",
        "мок плюс",
        "mock plus"
      ],
      "analogs": [
        "Figma"
      ]
    },
    {
      "name": "Balsamiq",
      "added": "2026-06-08",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Прототипы",
      "logo": "balsamiq.svg",
      "description": "Создание схематичных wireframe-макетов (mockups) интерфейсов",
      "why": "Быстрые черновые наброски форм и экранов для обсуждения логики интерфейса будущего решения 1С",
      "homepage": "https://balsamiq.com/",
      "repo": null,
      "start": [
        {
          "label": "Balsamiq Wireframing Academy",
          "url": "https://balsamiq.com/learn/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "балзамик",
        "бальзамик",
        "балсамик"
      ],
      "analogs": [
        "MAKER-STUDIO",
        "Накидка"
      ]
    },
    {
      "name": "MAKER-STUDIO",
      "added": "2026-06-08",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Прототипы",
      "logo": "maker.webp",
      "description": "Онлайн-сервис прототипирования форм и моделирования бизнес-процессов",
      "why": "Позволяет быстро создавать формы, организовать между ними связи и сделать кликабельный прототип. Проект можно дополнить наглядными диаграммами и текстовым описанием с поддержкой ролевых моделей GPT. В пару кликов генерирует готовое ТЗ из выбранных элементов",
      "homepage": "https://maker-studio.pro/",
      "repo": null,
      "start": [
        {
          "label": "Все функции Maker Studio",
          "url": "https://vk.com/video-199230936_456239039"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "мейкер студио",
        "макер студио",
        "maker studio"
      ],
      "analogs": [
        "Balsamiq",
        "Накидка"
      ]
    },
    {
      "name": "Накидка",
      "added": "2026-06-08",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Прототипы",
      "logo": "nakidka.png",
      "description": "Быстрое создание форм 1С по текстовому описанию (Markdown-синтаксис)",
      "why": "📌 Разработчикам Создание форм, соответствующих стандартам 1С и рекомендациям сообщества. Можно взять готовый код формы у аналитика. Автоматическая генерация кода программного создания реквизитов 📌 Аналитикам Быстрое создание прототипов с помощью Искусственного интеллекта. Привычный синтаксис Markdown. Наглядная визуализация будущего интерфейса на ранних этапах для согласования с заказчиком",
      "homepage": "https://crimsongoldteam.github.io/md_design/#/",
      "repo": "https://github.com/crimsongoldteam/md_design",
      "start": [
        {
          "label": "Быстрый старт",
          "url": "https://crimsongoldteam.github.io/md_design/#/БыстрыйСтарт"
        },
        {
          "label": "Мастерим формы с искусственным интеллектом",
          "url": "https://infostart.ru/1c/articles/2331345/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "накидка",
        "nakidka"
      ],
      "analogs": [
        "Balsamiq",
        "MAKER-STUDIO"
      ]
    },
    {
      "name": "1С:Тестировщик",
      "added": "2026-06-08",
      "category": "Автоматизированное тестирование",
      "subcategory": "Функциональные тесты",
      "logo": "1c.png",
      "description": "Инструмент 1С для автоматизации функционального тестирования",
      "why": "Автоматизирует функциональное тестирование конфигураций при обновлениях",
      "homepage": "https://v8.1c.ru/tekhnologii/tekhnologii-krupnykh-vnedreniy/korporativnyy-instrumentalnyy-paket/",
      "repo": null,
      "start": [
        {
          "label": "Создание и модификация тестов в 1С:Тестировщик",
          "url": "https://infostart.ru/1c/articles/2022869/"
        },
        {
          "label": "Курс «Знакомство с 1С:Тестировщиком»",
          "url": "https://uc1.1c.ru/course/znakomstvo-s-1s-testirovschikom/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "тестировщик",
        "1с тестировщик"
      ],
      "analogs": [
        "1С:Сценарное тестирование",
        "Vanessa-Automation",
        "Тестер"
      ]
    },
    {
      "name": "1С:Сценарное тестирование",
      "added": "2026-06-08",
      "category": "Автоматизированное тестирование",
      "subcategory": "Функциональные тесты",
      "logo": "1c.png",
      "description": "Проверка функциональности через сценарии без программирования",
      "why": "Позволяет описывать и прогонять сценарные тесты решений 1С",
      "homepage": "https://v8.1c.ru/tekhnologii/tekhnologii-krupnykh-vnedreniy/korporativnyy-instrumentalnyy-paket/1c-stsenarnoe-testirovanie/",
      "repo": null,
      "start": [
        {
          "label": "1С:Сценарное тестирование",
          "url": "https://www.youtube.com/channel/UCbdRui0PGMp9lqhvnVJcRzA"
        },
        {
          "label": "1С:Сценарное тестирование 3.0. Примеры",
          "url": "https://www.youtube.com/watch?v=9LppwC6gQTA"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "сценарное тестирование",
        "сценарные тесты"
      ],
      "analogs": [
        "1С:Тестировщик",
        "Vanessa-Automation",
        "Тестер"
      ],
      "depends": [
        "Allure"
      ]
    },
    {
      "name": "Vanessa-Automation",
      "added": "2026-06-08",
      "category": "Автоматизированное тестирование",
      "subcategory": "Функциональные тесты",
      "logo": "vanessa.png",
      "description": "BDD-тестирование решений 1С на языке Gherkin",
      "why": "Описывает и запускает сценарии на Gherkin, готовит инструкции и документацию",
      "homepage": "https://pr-mex.github.io/vanessa-automation/",
      "repo": "https://github.com/Pr-Mex/vanessa-automation",
      "start": [
        {
          "label": "Инструмент тестирования прикладных решений на платформе 1С",
          "url": "https://habr.com/ru/post/418303/"
        },
        {
          "label": "Разработка и сценарное тестирование с Vanessa",
          "url": "https://infostart.ru/1c/articles/969637/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "ванесса",
        "ванесса автоматион",
        "ванесса автомейшн",
        "vanessa automation"
      ],
      "analogs": [
        "1С:Тестировщик",
        "1С:Сценарное тестирование",
        "Vanessa-ADD",
        "Тестер"
      ],
      "depends": [
        "Visual Studio Code (VSCode)",
        "Allure"
      ]
    },
    {
      "name": "Vanessa-ADD",
      "added": "2026-06-08",
      "category": "Автоматизированное тестирование",
      "subcategory": "Функциональные тесты",
      "logo": "vanessa-add.png",
      "description": "Набор инструментов автотестирования (предшественник Vanessa-Automation)",
      "why": "Ранний набор инструментов сценарного и поведенческого тестирования 1С",
      "homepage": null,
      "repo": "https://github.com/vanessa-opensource/add",
      "start": [
        {
          "label": "Инструмент тестирования прикладных решений на платформе 1С",
          "url": "https://habr.com/ru/post/418303/"
        },
        {
          "label": "Разработка и сценарное тестирование с Vanessa",
          "url": "https://infostart.ru/1c/articles/969637/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "ванесса адд",
        "vanessa add",
        "ванесса add"
      ],
      "analogs": [
        "Vanessa-Automation"
      ],
      "depends": [
        "OneScript"
      ]
    },
    {
      "name": "Тестер",
      "added": "2026-06-08",
      "category": "Автоматизированное тестирование",
      "subcategory": "Функциональные тесты",
      "logo": null,
      "description": "Бесплатный инструмент сценарного тестирования решений 1С 8.3",
      "why": "Позволяет разрабатывать и запускать тесты, автоматизировать рутинные операции",
      "homepage": "http://tester.help",
      "repo": "https://github.com/grumagargler/tester",
      "start": [
        {
          "label": "Создание теста путем записи сценария",
          "url": "https://youtu.be/ZyqQ-YjKB3A"
        },
        {
          "label": "Создание теста кодированием",
          "url": "https://youtu.be/IqiwrzD5pWg"
        },
        {
          "label": "Полтора часа жизни программиста со сценарным тестированием",
          "url": "https://youtu.be/Lr6ew_Nu1aE"
        },
        {
          "label": "https://t.me/testspro1c",
          "url": "https://t.me/testspro1c"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "тестер",
        "tester"
      ],
      "analogs": [
        "1С:Тестировщик",
        "1С:Сценарное тестирование",
        "Vanessa-Automation"
      ]
    },
    {
      "name": "YAxUnit",
      "added": "2026-06-08",
      "category": "Автоматизированное тестирование",
      "subcategory": "Юнит-тесты",
      "logo": "yaxunit.svg",
      "description": "Фреймворк юнит-тестирования решений на 1С:Предприятие 8.3",
      "why": "Когда начинаете использовать тестирование, даже если не следуете TDD, то все равно начнете задаваться вопросом: \"а как я это буду тестировать?\". И как следствие, будете стараться следовать принципам SOLID, чтобы уменьшить зависимости, упростить методы, что облегчит тестирование. И это приводит к повышению качества кода. Также использую тесты, вы получаете возможность быстро проверить, что изменения кода, не ломают его. На YAxUnit возможно писать юнит, интеграционные и сценарные тесты",
      "homepage": "https://bia-technologies.github.io/yaxunit/",
      "repo": "https://github.com/bia-technologies/yaxunit",
      "start": [
        {
          "label": "https://bia-technologies.github.io/yaxunit/docs/getting-started/install/",
          "url": "https://bia-technologies.github.io/yaxunit/docs/getting-started/install/"
        },
        {
          "label": "https://github.com/bia-technologies/edt-test-runner",
          "url": "https://github.com/bia-technologies/edt-test-runner"
        },
        {
          "label": "https://github.com/bia-technologies/edt-test-runner/blob/develop/docs/Установка.md",
          "url": "https://github.com/bia-technologies/edt-test-runner/blob/develop/docs/Установка.md"
        },
        {
          "label": "https://bia-technologies.github.io/yaxunit/docs/getting-started/first-test",
          "url": "https://bia-technologies.github.io/yaxunit/docs/getting-started/first-test"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "яксюнит",
        "яаксюнит",
        "yaxunit",
        "юнит тесты 1с"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия",
        "Allure"
      ]
    },
    {
      "name": "Coverage41C",
      "added": "2026-06-09",
      "category": "Автоматизированное тестирование",
      "subcategory": "Юнит-тесты",
      "logo": "coverage41c.png",
      "description": "Измерение покрытия кода 1С автотестами через протокол отладчика",
      "why": "Показывает, какие строки кода реально проверяются тестами, а какие нет, — помогает находить непокрытые участки и оценивать качество тестовой базы. Результат выгружается в SonarQube",
      "homepage": null,
      "repo": "https://github.com/1c-syntax/Coverage41C",
      "start": [
        {
          "label": "Расчет покрытия кода 1С тестами",
          "url": "https://42clouds.com/ru-ru/techdocs/raschyot-pokrytiya-koda-1c-testami/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "кавередж",
        "ковередж",
        "coverage",
        "покрытие кода",
        "coverage41c"
      ],
      "depends": [
        "SonarQube"
      ]
    },
    {
      "name": "ibcmdrunner",
      "added": "2026-06-09",
      "category": "CI/CD",
      "subcategory": "Сборка 1С",
      "logo": "oscript-library.png",
      "description": "OneScript-обертка над утилитой ibcmd для управления информационной базой из скриптов",
      "why": "Автоматизирует операции с базой (создание, выгрузка, загрузка, обновление) в CI и тестовых сценариях — без ручного запуска ibcmd",
      "homepage": null,
      "repo": "https://github.com/oscript-library/ibcmdrunner",
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "ибсмд раннер",
        "ibcmd runner",
        "ибцмд раннер"
      ],
      "analogs": [
        "vanessa-runner"
      ],
      "depends": [
        "OneScript"
      ]
    },
    {
      "name": "1testrunner",
      "added": "2026-06-09",
      "category": "Автоматизированное тестирование",
      "subcategory": "Юнит-тесты",
      "logo": "oscript-library.png",
      "description": "Среда запуска юнит-тестов на OneScript",
      "why": "Находит и прогоняет тесты, написанные на OneScript, и формирует отчет — основа автотестов для скриптовой части проектов 1С",
      "homepage": null,
      "repo": "https://github.com/oscript-library/1testrunner",
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "тест раннер",
        "test runner",
        "1 test runner"
      ],
      "analogs": [
        "vanessa-runner"
      ],
      "depends": [
        "OneScript"
      ]
    },
    {
      "name": "Синтаксическая проверка конфигурации",
      "added": "2026-06-08",
      "category": "Статический анализ кода",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Встроенная в Конфигуратор и EDT проверка конфигурации",
      "why": "Механизм проверки конфигурации позволяет выявить ошибки, которые не являются критичными для функционирования прикладного решения в принципе, но наличие которых может существенно снизить скорость работы прикладного решения или даже привести к возникновению ошибок при работе в некоторых специальных режимах",
      "homepage": "https://its.1c.ru/db/metod8dev/content/2290/hdoc",
      "repo": null,
      "start": [],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "синтаксическая проверка",
        "проверка конфигурации",
        "syntax check"
      ],
      "analogs": [
        "1С:Автоматизированная проверка конфигураций (АПК)",
        "SonarQube"
      ],
      "depends": [
        "Конфигуратор",
        "1C:Enterprise Development Tools (EDT)"
      ]
    },
    {
      "name": "1С:Автоматизированная проверка конфигураций (АПК)",
      "added": "2026-06-08",
      "category": "Статический анализ кода",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Проверка конфигураций 1С на соответствие стандартам разработки",
      "why": "Используется для проверки решений на соответствие стандартам. Обязательно применяется при сертификации 1С:Совместимо",
      "homepage": "http://v8.1c.ru/acc/",
      "repo": null,
      "start": [
        {
          "label": "Автоматизированная проверка конфигураций…",
          "url": "https://infostart.ru/1c/articles/574829/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "апк",
        "apk",
        "автоматизированная проверка"
      ],
      "analogs": [
        "Синтаксическая проверка конфигурации",
        "SonarQube"
      ],
      "depends": [
        "Стандарты разработки"
      ]
    },
    {
      "name": "SonarQube",
      "added": "2026-06-08",
      "category": "Статический анализ кода",
      "subcategory": null,
      "logo": "sonarqube.svg",
      "description": "Поддержка языка 1С и OneScript в платформе анализа качества SonarQube",
      "why": "Используется для непрерывной оценки качества кода и управления техническим долгом",
      "homepage": "https://1c-syntax.github.io/sonar-bsl-plugin-community/",
      "repo": "https://github.com/1c-syntax/sonar-bsl-plugin-community",
      "start": [
        {
          "label": "Управляй качеством кода 1С с помощью SonarQube",
          "url": "https://infostart.ru/1c/articles/1089670/"
        },
        {
          "label": "Как управлять качеством кода 1С, используя платформу SonarQube",
          "url": "https://infostart.ru/1c/articles/1175305/"
        },
        {
          "label": "Управление качеством кода",
          "url": "https://infostart.ru/1c/articles/1096770/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "сонаркуб",
        "сонар",
        "сонаркьюб",
        "sonar",
        "сонар куб"
      ],
      "analogs": [
        "Синтаксическая проверка конфигурации",
        "1С:Автоматизированная проверка конфигураций (АПК)"
      ],
      "depends": [
        "git",
        "Coverage41C"
      ]
    },
    {
      "name": "1С:СППР",
      "added": "2026-06-08",
      "category": "Моделирование и архитектура",
      "subcategory": "Архитектура",
      "logo": "1c.png",
      "description": "Проектирование прикладных решений: требования, архитектура и проектная документация",
      "why": "Единая система вокруг модели метаданных: требования, проектные решения, ошибки тестирования и задачи разработки — ALM-инструмент фирмы 1С для управляемой разработки крупных решений",
      "homepage": "https://v8.1c.ru/tekhnologii/sistema-proektirovaniya-prikladnykh-resheniy/",
      "repo": null,
      "start": [
        {
          "label": "1С СППР, как инструмент по внедрению, разработке и сопровождению информационных систем",
          "url": "https://infostart.ru/1c/articles/1177144/"
        },
        {
          "label": "1С СППР и оценка сроков и стоимости проектов методом COCOMO II",
          "url": "https://habr.com/ru/post/482946/"
        },
        {
          "label": "https://t.me/s/SPPR1c",
          "url": "https://t.me/s/SPPR1c"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "сппр",
        "sppr",
        "система проектирования",
        "alm"
      ],
      "analogs": [
        "Jira",
        "Redmine"
      ]
    },
    {
      "name": "Стандарты разработки",
      "added": "2026-06-08",
      "category": "Статический анализ кода",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Система стандартов и методик разработки конфигураций 1С",
      "why": "Система стандартов описывает как правильно писать код, чтобы он был качественный и производительный",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Система стандартов",
          "url": "https://its.1c.ru/db/v8std"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "стандарты разработки",
        "стандарты кода",
        "coding standards"
      ]
    },
    {
      "name": "Crucible",
      "added": "2026-06-09",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "crucible.svg",
      "description": "Инструмент рецензирования кода от Atlassian с интеграцией в репозитории",
      "why": "Позволяет проводить структурированное ревью изменений: комментарии к строкам, обсуждения и отслеживание замечаний до их закрытия",
      "homepage": "https://www.atlassian.com/software/crucible",
      "repo": null,
      "start": [
        {
          "label": "Документация Crucible",
          "url": "https://confluence.atlassian.com/crucible/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "крусибл",
        "crucible"
      ],
      "analogs": [
        "Review Board",
        "Collaborator",
        "Git Code Review"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Review Board",
      "added": "2026-06-09",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "reviewboard.png",
      "description": "Open-source платформа для код-ревью с поддержкой pre-commit и post-commit проверок",
      "why": "Дает командное рецензирование изменений без привязки к конкретному хостингу репозиториев — обзоры можно вести и до коммита",
      "homepage": "https://www.reviewboard.org",
      "repo": null,
      "start": [
        {
          "label": "Документация Review Board",
          "url": "https://www.reviewboard.org/docs/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "ревью борд",
        "review board"
      ],
      "analogs": [
        "Crucible",
        "Collaborator",
        "Git Code Review"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Collaborator",
      "added": "2026-06-09",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "collaborator.png",
      "description": "Инструмент рецензирования кода и документов от SmartBear для распределенных команд",
      "why": "Поддерживает ревью не только кода, но и проектных документов, с настраиваемыми регламентами проверки и отчетностью",
      "homepage": "https://smartbear.com/product/collaborator/",
      "repo": null,
      "start": [
        {
          "label": "Документация Collaborator",
          "url": "https://support.smartbear.com/collaborator/docs/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "коллаборатор",
        "collaborator"
      ],
      "analogs": [
        "Crucible",
        "Review Board",
        "Git Code Review"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "CodeRabbit",
      "added": "2026-06-09",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "coderabbit.svg",
      "description": "ИИ-ревьюер пул-реквестов: автоматические замечания и резюме изменений",
      "why": "Автоматически просматривает pull request'ы, оставляет осмысленные замечания по строкам и сводку изменений — ускоряет ревью и снимает рутину с рецензентов. Интегрируется с GitHub/GitLab. Доступ из РФ ограничен",
      "homepage": "https://www.coderabbit.ai",
      "repo": null,
      "start": [
        {
          "label": "Документация CodeRabbit",
          "url": "https://docs.coderabbit.ai/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "кодрэббит",
        "код рэббит",
        "code rabbit",
        "кодребит"
      ],
      "analogs": [
        "ai-review"
      ],
      "depends": [
        "Gitlab CI",
        "GitHub Actions"
      ]
    },
    {
      "name": "ai-review",
      "added": "2026-06-09",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "ai-review.png",
      "description": "Открытый ИИ-ревьюер кода: запускается в любой CI/CD с любым LLM-провайдером",
      "why": "Гоняет ревью кода в любом пайплайне (GitHub Actions, GitLab CI, Jenkins) с любой моделью, включая локальные через Ollama/LM Studio — то есть работает и в закрытом контуре. Промпты — обычные markdown-файлы, поэтому правила легко адаптировать под стек 1С-команды",
      "homepage": null,
      "repo": "https://github.com/Nikita-Filonov/ai-review",
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "аи ревью",
        "ии ревью",
        "ai review"
      ],
      "analogs": [
        "CodeRabbit"
      ],
      "depends": [
        "GitHub Actions",
        "Gitlab CI"
      ]
    },
    {
      "name": "Jenkins",
      "added": "2026-06-07",
      "category": "CI/CD",
      "subcategory": "CI-серверы",
      "logo": "jenkins.svg",
      "description": "Сервер автоматизации сборок и CI/CD-пайплайнов",
      "why": "Нужен для разворачивания системы непрерывной интеграции",
      "homepage": "https://www.jenkins.io",
      "repo": null,
      "start": [
        {
          "label": "Сборочная линия с нуля",
          "url": "https://youtu.be/86wJ-ldntAo"
        },
        {
          "label": "Переводим рутину ручного тестирования 1C на рельсы Jenkins-а",
          "url": "https://infostart.ru/public/1070720/"
        },
        {
          "label": "Конвеер проверки качества кода",
          "url": "https://infostart.ru/public/1117485/"
        },
        {
          "label": "Библиотека Jenkins для 1С",
          "url": "https://github.com/firstBitSemenovskaya/jenkins-lib"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "дженкинс",
        "женкинс",
        "jenkins"
      ],
      "analogs": [
        "Gitlab CI",
        "GitHub Actions",
        "Travis CI",
        "TeamCity"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Gitlab CI",
      "added": "2026-06-08",
      "category": "CI/CD",
      "subcategory": "CI-серверы",
      "logo": "gitlab.svg",
      "description": "Встроенная в GitLab система непрерывной интеграции",
      "why": "Для запуска тестов при каждой закладке в хранилище или репозиторий",
      "homepage": "https://gitlab.com",
      "repo": null,
      "start": [
        {
          "label": "Введение в GitLab CI",
          "url": "https://habr.com/ru/company/softmart/blog/309380/"
        },
        {
          "label": "Как Gitlab-CI и OneScript могут отсортировать массив (Часть 1)",
          "url": "https://infostart.ru/1c/articles/1552117/"
        },
        {
          "label": "Руководство по CI/CD в GitLab для новичка",
          "url": "https://habr.com/ru/post/498436/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гитлаб ci",
        "гитлаб сиай",
        "gitlab ci"
      ],
      "analogs": [
        "Jenkins",
        "GitHub Actions",
        "Travis CI",
        "TeamCity"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "GitHub Actions",
      "added": "2026-06-08",
      "category": "CI/CD",
      "subcategory": "CI-серверы",
      "logo": "github-actions.svg",
      "description": "Встроенная в GitHub система CI/CD на основе workflow-файлов",
      "why": "Запускает сборку, тесты и проверки кода 1С при каждом пуше в репозиторий на GitHub",
      "homepage": "https://github.com/features/actions",
      "repo": null,
      "start": [
        {
          "label": "Особенности национального Workflow: Github Actions и OneScript",
          "url": "https://infostart.ru/1c/articles/2068854/"
        },
        {
          "label": "Секреты, кэш и артефакты в Github Actions",
          "url": "https://infostart.ru/1c/articles/2075473/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "администратор",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гитхаб экшнс",
        "github actions",
        "гитхаб actions"
      ],
      "analogs": [
        "Jenkins",
        "Gitlab CI",
        "Travis CI",
        "TeamCity"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Travis CI",
      "added": "2026-06-08",
      "category": "CI/CD",
      "subcategory": "CI-серверы",
      "logo": "travis-ci.svg",
      "description": "Облачный сервис непрерывной интеграции с конфигом в .travis.yml",
      "why": "Исторически популярный облачный CI; для 1С-проектов сейчас вытесняется GitHub Actions и GitLab CI",
      "homepage": "https://www.travis-ci.com/",
      "repo": null,
      "start": [
        {
          "label": "Документация Travis CI",
          "url": "https://docs.travis-ci.com/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "администратор",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты"
      ],
      "aliases": [
        "трэвис",
        "травис",
        "travis"
      ],
      "analogs": [
        "Jenkins",
        "Gitlab CI",
        "GitHub Actions",
        "TeamCity"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "vanessa-runner",
      "added": "2026-06-08",
      "category": "CI/CD",
      "subcategory": "Сборка 1С",
      "logo": "vanessa.png",
      "description": "OneScript-оркестратор сборки, тестов и проверок 1С в CI",
      "why": "Стандартный инструмент CI для 1С: создает и обновляет базы, запускает Vanessa-Automation, замеряет покрытие и выгружает конфигурацию — одной командой в пайплайне",
      "homepage": null,
      "repo": "https://github.com/vanessa-opensource/vanessa-runner",
      "start": [
        {
          "label": "Использование vanessa-runner/deployka в сборочных линиях",
          "url": "https://infostart.ru/1c/articles/1211686/"
        },
        {
          "label": "Как начать разработку проекта 1С с прицелом на DevOps",
          "url": "https://infostart.ru/1c/articles/1463154/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "ванесса раннер",
        "vanessa runner",
        "ванесса runner"
      ],
      "analogs": [
        "ibcmdrunner",
        "1testrunner"
      ],
      "depends": [
        "OneScript",
        "Vanessa-Automation"
      ]
    },
    {
      "name": "TeamCity",
      "added": "2026-06-08",
      "category": "CI/CD",
      "subcategory": "CI-серверы",
      "logo": "teamcity.svg",
      "description": "CI/CD-сервер JetBrains для сборок и автотестов",
      "why": "Альтернатива Jenkins для пайплайнов 1С с удобным UI и готовыми раннерами",
      "homepage": "https://www.jetbrains.com/teamcity/",
      "repo": null,
      "start": [
        {
          "label": "Getting Started with TeamCity — официальный гайд",
          "url": "https://www.jetbrains.com/help/teamcity/getting-started-with-teamcity.html"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "администратор",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "тимсити",
        "тим сити",
        "team city"
      ],
      "analogs": [
        "Jenkins",
        "Gitlab CI",
        "GitHub Actions",
        "Travis CI"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "Ansible",
      "added": "2026-06-08",
      "category": "CI/CD",
      "subcategory": "Инфраструктура как код",
      "logo": "ansible.svg",
      "description": "Система управления конфигурацией и автоматического развертывания",
      "why": "Автоматизирует развертывание серверов 1С, СУБД и окружений без ручной настройки",
      "homepage": "https://www.ansible.com/",
      "repo": null,
      "start": [
        {
          "label": "Настройка сервера 1С на Linux через Ansible — опыт Magnit Tech",
          "url": "https://infostart.ru/1c/articles/2438899/"
        },
        {
          "label": "Установка 1С используя Ansible",
          "url": "https://infostart.ru/1c/articles/1124819/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "ансибл",
        "энсибл",
        "ansible"
      ],
      "analogs": [
        "Vagrant",
        "Terraform"
      ]
    },
    {
      "name": "Vagrant",
      "added": "2026-06-07",
      "category": "CI/CD",
      "subcategory": "Инфраструктура как код",
      "logo": "vagrant.svg",
      "description": "Создание воспроизводимых виртуальных окружений для разработки",
      "why": "Позволяет на локальной машине создавать легко управляемые виртуальные среды. То есть можно легко в них установить необходимые инструменты",
      "homepage": "https://www.vagrantup.com",
      "repo": null,
      "start": [
        {
          "label": "Использование Vagrant и Ansible для разворачивания тестовой инфраструктуры",
          "url": "https://infostart.ru/1c/articles/1531329/"
        },
        {
          "label": "Многопоточный CI-контур для 1С",
          "url": "https://infostart.ru/1c/articles/1198035/"
        },
        {
          "label": "Что такое Vagrant",
          "url": "https://guides.hexlet.io/vagrant/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "ограничен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "вагрант",
        "vagrant"
      ],
      "analogs": [
        "Ansible"
      ]
    },
    {
      "name": "Docker",
      "added": "2026-06-07",
      "category": "CI/CD",
      "subcategory": "Контейнеризация",
      "logo": "docker.svg",
      "description": "Контейнеризация приложений и окружений",
      "why": "Позволяет разработчикам подготовить и запустить изолированные приложения со всеми зависимостями. Один раз подготовили контейнер со всем необходимым и дальше можете его использовать сколько угодно раз",
      "homepage": "https://www.docker.com",
      "repo": null,
      "start": [
        {
          "label": "Полное практическое руководство по Docker",
          "url": "https://habr.com/ru/post/310460/"
        },
        {
          "label": "Создаем Docker-контейнер с 1С",
          "url": "https://infostart.ru/1c/articles/548179/"
        },
        {
          "label": "Тестируем в Docker",
          "url": "https://infostart.ru/1c/articles/1412427/"
        },
        {
          "label": "Образы контейнеров для 1С",
          "url": "https://github.com/firstBitSemenovskaya/onec-docker"
        },
        {
          "label": "Образы 1С:Предприятие",
          "url": "https://github.com/thedemoncat/onec-images-docs"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "докер",
        "доккер",
        "doker"
      ]
    },
    {
      "name": "Allure",
      "added": "2026-06-07",
      "category": "Автоматизированное тестирование",
      "subcategory": "Отчеты о тестах",
      "logo": "allure.png",
      "description": "Наглядные отчеты о результатах автотестов",
      "why": "Может показывать результаты тестов и различных проверок в красивом и аккуратном виде. Приятно посмотреть",
      "homepage": "https://docs.qameta.io/allure/",
      "repo": "https://github.com/allure-framework/allure2/releases",
      "start": [
        {
          "label": "Разработка и сценарное тестирование с Vanessa-ADD. Отчетность Allure",
          "url": "https://infostart.ru/1c/articles/1010127/"
        },
        {
          "label": "Allure 2: тест-репорты нового поколения",
          "url": "https://habr.com/ru/company/jugru/blog/337386/"
        },
        {
          "label": "Allure-Framework. Работа с кодом",
          "url": "https://habr.com/ru/company/sberbank/blog/359302/"
        },
        {
          "label": "Русскоязычное сообщество Allure (Telegram)",
          "url": "https://t.me/allure_ru"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты"
      ],
      "aliases": [
        "аллюр",
        "алюр",
        "allure"
      ],
      "analogs": [
        "Grafana",
        "ТестОпс"
      ],
      "depends": [
        "Vanessa-Automation",
        "1С:Сценарное тестирование",
        "YAxUnit"
      ]
    },
    {
      "name": "ТестОпс",
      "added": "2026-06-10",
      "category": "Автоматизированное тестирование",
      "subcategory": "Отчеты о тестах",
      "logo": "testops.png",
      "description": "Платформа управления тестированием поверх Allure: запуск автотестов, аналитика и живые отчеты",
      "why": "Объединяет ручные и автоматические тесты, хранит историю прогонов и показывает аналитику качества — единый центр тест-менеджмента поверх отчетов Allure",
      "homepage": "https://qatools.ru",
      "repo": null,
      "start": [
        {
          "label": "Документация и быстрый старт",
          "url": "https://docs.qatools.ru"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "тестопс",
        "тест опс",
        "testops",
        "allure testops",
        "qatools"
      ],
      "analogs": [
        "Allure"
      ],
      "depends": [
        "Jenkins"
      ]
    },
    {
      "name": "1С:Конвертация данных",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Обмен между 1С",
      "logo": "1c.png",
      "description": "Создание правил обмена между конфигурациями 1С",
      "why": "Визуально описывает правила конвертации и обмена данными между системами",
      "homepage": "https://its.1c.ru/db/metod8dev/content/5846/hdoc",
      "repo": null,
      "start": [
        {
          "label": "1С:Конвертация данных 3. Инструкции и примеры.",
          "url": "https://infostart.ru/1c/articles/695523/"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "конвертация данных",
        "кд",
        "data conversion"
      ],
      "depends": [
        "EnterpriseData"
      ]
    },
    {
      "name": "EnterpriseData",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Обмен между 1С",
      "logo": "1c.png",
      "description": "Универсальный формат обмена данными между системами",
      "why": "Бизнес-ориентированный формат для обменов между 1С и внешними системами",
      "homepage": "https://its.1c.ru/db/metod8dev/content/5846/hdoc",
      "repo": null,
      "start": [
        {
          "label": "Новый подход к обмену данными EnterpriseData",
          "url": "https://infostart.ru/1c/articles/963164/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "энтерпрайз дата",
        "enterprise data",
        "эд"
      ]
    },
    {
      "name": "1С:Шина",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Брокеры и шины",
      "logo": "1c.png",
      "description": "Интеграционная шина предприятия (ESB) для обмена между системами",
      "why": "Позволяет настраивать обмены сообщений между разными системами, причем по содержимому сообщений можно определить кто будет получателем",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "1С Шина. Шина данных 1С. Установка",
          "url": "https://www.youtube.com/watch?v=Q2SeCpi_McA"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "шина",
        "1с шина",
        "esb",
        "сервисная шина"
      ],
      "analogs": [
        "RabbitMQ",
        "Kafka"
      ]
    },
    {
      "name": "Открытый пакет интеграций",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Внешние API",
      "logo": "openintegration.svg",
      "description": "Набор модулей для интеграции 1С с популярными API",
      "why": "Предназначено для легкой интеграции с существующими сервисами. Поставляется в виде расширения, проекта EDT, файлов конфигурации или других вариантов. После установки в конфигурации можем легко вызывать методы API сервисов не разрабатывая их самостоятельно",
      "homepage": "https://openintegrations.dev",
      "repo": "https://github.com/Bayselonarrend/OpenIntegrations",
      "start": [
        {
          "label": "Открытый пакет интеграций для популярных API",
          "url": "https://infostart.ru/1c/articles/2016164/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус"
      ],
      "aliases": [
        "опи",
        "открытый пакет интеграций",
        "opi"
      ],
      "analogs": [
        "Telegram бот"
      ]
    },
    {
      "name": "Telegram бот",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Внешние API",
      "logo": "telegram.png",
      "description": "Автоматизация обмена сообщениями через ботов Telegram",
      "why": "Для выполнения различных операций с помощью Telegram, начиная с интеграции с мессенджером или информированием о текущем состоянии фирмы и заканчивая ведением CRM",
      "homepage": "https://tlgrm.ru/docs/bots",
      "repo": null,
      "start": [
        {
          "label": "Пример связи 1С и мессенджера Telegram",
          "url": "https://infostart.ru/public/419846/"
        },
        {
          "label": "Создание телеграм бота в 1С",
          "url": "https://infostart.ru/1c/articles/932874/"
        },
        {
          "label": "Telemonitor - объединяем Telegram и 1С",
          "url": "https://infostart.ru/public/387433/"
        },
        {
          "label": "Опыт интеграции мессенджера Telegram c 1C",
          "url": "https://infostart.ru/1c/articles/819087/"
        },
        {
          "label": "Все, о чем должен знать разработчик Телеграм-ботов",
          "url": "https://habr.com/ru/post/543676/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "телеграм бот",
        "тг бот",
        "telegram bot",
        "бот телеграм"
      ],
      "analogs": [
        "Открытый пакет интеграций"
      ]
    },
    {
      "name": "Curlone",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Внешние API",
      "logo": "curl.svg",
      "logoInvert": true,
      "description": "Конвертер команд curl в код на языке 1С",
      "why": "При разработке интеграций с внешними сервисами часто встречаешь в документации к `API` примеры запросов на `curl`. Данный сервис помогает конвертировать такой запрос в код 1С. Приложение написано на `OneScript`",
      "homepage": "https://curlone.ru/",
      "repo": "https://github.com/alei1180/curlone",
      "start": [
        {
          "label": "Curlone — конвертер команды curl в код на языке 1С",
          "url": "https://infostart.ru/1c/articles/2319069/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "курлван",
        "curl one",
        "курлоне"
      ]
    },
    {
      "name": "RabbitMQ",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Брокеры и шины",
      "logo": "rabbitmq.svg",
      "description": "Брокер сообщений для асинхронного обмена",
      "why": "Очереди и маршрутизация сообщений между 1С и внешними системами по AMQP",
      "homepage": "https://www.rabbitmq.com",
      "repo": "https://github.com/rabbitmq/rabbitmq-server",
      "start": [
        {
          "label": "Учимся готовить кроликов с редиской",
          "url": "https://infostart.ru/1c/articles/1234830/"
        },
        {
          "label": "RabbitMQ + Конвертация Данных 3.0",
          "url": "https://infostart.ru/1c/articles/692798/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "рэббитмкью",
        "реббит",
        "кролик",
        "rabbit",
        "рэббит"
      ],
      "analogs": [
        "1С:Шина",
        "Kafka"
      ]
    },
    {
      "name": "Kafka",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": "Брокеры и шины",
      "logo": "kafka.svg",
      "logoInvert": true,
      "description": "Потоковая платформа обмена сообщениями",
      "why": "Высоконагруженный поток событий и интеграций для 1С и внешних систем",
      "homepage": "https://kafka.apache.org",
      "repo": "https://github.com/apache/kafka",
      "start": [
        {
          "label": "1c + kafka.apache",
          "url": "https://infostart.ru/1c/articles/990211/"
        },
        {
          "label": "Apache Kafka: Основы технологии",
          "url": "https://habr.com/ru/company/southbridge/blog/550934/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "кафка"
      ],
      "analogs": [
        "1С:Шина",
        "RabbitMQ"
      ]
    },
    {
      "name": "Объектное хранилище S3",
      "added": "2026-06-08",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "s3.png",
      "description": "Стандарт API объектных хранилищ для выноса файлов из базы 1С",
      "why": "Позволяет выносить присоединенные файлы и вложения из базы 1С во внешнее масштабируемое и отказоустойчивое хранилище. Это разгружает базу, упрощает резервное копирование и дает единую точку хранения файлов для разных систем",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Из 1С в S3 и обратно. Работа с объектным хранилищем",
          "url": "https://infostart.ru/1c/articles/2033497/"
        },
        {
          "label": "Как мы учили «1С:Предприятие» работать с объектным хранилищем S3",
          "url": "https://habr.com/ru/companies/vk/articles/892824/"
        },
        {
          "label": "1c-s3connector",
          "url": "https://github.com/ValentinKozlov/1c-s3connector"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "с3",
        "s3",
        "объектное хранилище",
        "эс три"
      ]
    },
    {
      "name": "Fiddler",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "fiddler.png",
      "description": "Прокси-сниффер HTTP/HTTPS-трафика для отладки интеграций",
      "why": "Показывает реальный HTTP/HTTPS-трафик между 1С и внешними сервисами — незаменим при разборе сбоев интеграций и веб-сервисов",
      "homepage": "https://www.telerik.com/download/fiddler",
      "repo": null,
      "start": [
        {
          "label": "Создание и отладка HTTP-сервисов",
          "url": "https://its.1c.ru/db/metod8dev/content/5756/hdoc"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "фиддлер",
        "фидлер",
        "fiddler"
      ]
    },
    {
      "name": "Bruno",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "bruno.svg",
      "description": "Локальный (offline-first) клиент API: запросы и секреты хранятся в файлах, а не в облаке",
      "why": "Тестирование HTTP/REST-сервисов 1С с хранением коллекций в git рядом с кодом — без облачного аккаунта и синхронизации",
      "homepage": "https://www.usebruno.com/",
      "repo": "https://github.com/usebruno/bruno",
      "start": [
        {
          "label": "Документация Bruno",
          "url": "https://docs.usebruno.com/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "бруно",
        "bruno"
      ],
      "analogs": [
        "Insomnia",
        "SoapUI",
        "Karate",
        "Postman"
      ]
    },
    {
      "name": "Insomnia",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "insomnia.svg",
      "description": "Десктоп-клиент для проектирования и тестирования REST/GraphQL/gRPC API",
      "why": "Альтернатива Postman для ручного тестирования веб-сервисов 1С с удобным минималистичным UI",
      "homepage": "https://insomnia.rest/",
      "repo": "https://github.com/Kong/insomnia",
      "start": [
        {
          "label": "Документация Insomnia",
          "url": "https://docs.insomnia.rest/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "инсомния",
        "insomnia"
      ],
      "analogs": [
        "Bruno",
        "SoapUI",
        "Karate",
        "Postman"
      ]
    },
    {
      "name": "SoapUI",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "soapui.png",
      "description": "Инструмент функционального и нагрузочного тестирования веб-сервисов (SOAP/REST)",
      "why": "Тестирование SOAP- и REST-сервисов 1С, включая сложные сценарии, проверки ответов и нагрузочные прогоны",
      "homepage": "https://www.soapui.org/",
      "repo": null,
      "start": [
        {
          "label": "SoapUI Getting Started",
          "url": "https://www.soapui.org/getting-started/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "соап юай",
        "soap ui",
        "соапюай"
      ],
      "analogs": [
        "Bruno",
        "Insomnia",
        "Karate",
        "Postman"
      ]
    },
    {
      "name": "Karate",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "karate.svg",
      "description": "Фреймворк автотестов API с человекочитаемым синтаксисом на базе Gherkin",
      "why": "Автоматизация тестирования HTTP-сервисов 1С декларативными сценариями — без написания кода на Java",
      "homepage": null,
      "repo": "https://github.com/karatelabs/karate",
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "карате",
        "karate"
      ],
      "analogs": [
        "Bruno",
        "Insomnia",
        "SoapUI",
        "Postman"
      ]
    },
    {
      "name": "Postman",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "postman.svg",
      "description": "Инструмент ручного тестирования HTTP-запросов к API",
      "why": "Быстрая ручная проверка HTTP- и REST-сервисов 1С: запросы, заголовки, авторизация и коллекции для регрессии без написания кода",
      "homepage": "https://www.postman.com",
      "repo": null,
      "start": [
        {
          "label": "Тестирование API 1C Postman",
          "url": "https://infostart.ru/1c/articles/1400564/"
        },
        {
          "label": "Postman: Основы тестирования API и первые шаги с инструментом",
          "url": "https://habr.com/ru/companies/vk/articles/750096/"
        },
        {
          "label": "Postman - основы в 5 минут",
          "url": "https://rutube.ru/video/bc84eb7eaca894e3de6264ce8d47d61f/?utm_source=embed&utm_medium=referral&utm_campaign=logo&utm_content=bc84eb7eaca894e3de6264ce8d47d61f&utm_term=yastatic.net&t=1"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "постман",
        "postman"
      ],
      "analogs": [
        "Bruno",
        "Insomnia",
        "SoapUI",
        "Karate"
      ]
    },
    {
      "name": "OpenAPI UI (ex. Swagger)",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "swagger.svg",
      "description": "Интерактивная документация к REST API (бывший Swagger)",
      "why": "Наглядно описывает контракты REST-сервисов 1С и позволяет интеграторам пробовать запросы прямо из браузера",
      "homepage": null,
      "repo": "https://github.com/swagger-api/swagger-ui",
      "start": [
        {
          "label": "OpenAPI/Swagger для начинающих",
          "url": "https://habr.com/ru/articles/776538/"
        },
        {
          "label": "Swagger для 1С",
          "url": "https://infostart.ru/1c/articles/1136245/"
        },
        {
          "label": "Swagger в 1С: от настройки до публикации",
          "url": "https://infostart.ru/1c/tools/2380948/"
        },
        {
          "label": "Как спецификация OpenAPI помогает писать тесты http-сервисов",
          "url": "https://infostart.ru/1c/articles/2257293/"
        },
        {
          "label": "Swagger для 1С:Предприятия 8",
          "url": "https://github.com/zerobig/swagger-1c"
        },
        {
          "label": "Формирование swagger спецификации на основании метаданных конфигурации 1С",
          "url": "https://github.com/botokash/swagger"
        },
        {
          "label": "Swagger Editor — зеркало ETSI, открывается без VPN",
          "url": "https://forge.etsi.org/swagger/editor/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "сваггер",
        "свагер",
        "swagger",
        "опенапи",
        "openapi",
        "open api"
      ]
    },
    {
      "name": "Ngrok",
      "added": "2026-06-08",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "ngrok.svg",
      "logoInvert": true,
      "description": "Временный публичный URL к локальному серверу для отладки webhook-ов",
      "why": "Открывает локальную базу 1С наружу по временному HTTPS-адресу — удобно тестировать вебхуки и интеграции без публикации на белый IP",
      "homepage": "https://ngrok.com",
      "repo": null,
      "start": [
        {
          "label": "Ngrokking. Организация удаленного доступа без белого IP",
          "url": "https://habr.com/ru/articles/674070/"
        },
        {
          "label": "Как пользоваться Ngrok",
          "url": "https://losst.pro/kak-polzovatsya-ngrok"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "нгрок",
        "энгрок",
        "ngrok"
      ]
    },
    {
      "name": "1С:Аналитика",
      "added": "2026-06-08",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "1c.png",
      "description": "BI-система 1С для работы с аналитическими данными",
      "why": "Простой и удобный интерфейс для бизнес-пользователей, который не требует специальных навыков или опыта работы с 1С",
      "homepage": "https://v8.1c.ru/platforma/1s-analitika/",
      "repo": null,
      "start": [
        {
          "label": "стенд 1С:Аналитика",
          "url": "https://analytics.demo.1c.ru/analytics/ans"
        },
        {
          "label": "видео по 1С:Аналитика",
          "url": "https://www.youtube.com/playlist?list=PLY7ViBfWFBOn-n7Bs4NRbc12h2bwKYLy1"
        },
        {
          "label": "Е. Ю. Хрусталева - 1С:Аналитика. BI-система в 1С:Предприятии 8",
          "url": "https://v8.1c.ru/metod/books/176017.htm"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "аналитика 1с",
        "1с аналитика"
      ],
      "analogs": [
        "Microsoft Power BI",
        "Yandex DataLens",
        "Visiology"
      ]
    },
    {
      "name": "Microsoft Power BI",
      "added": "2026-06-08",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "powerbi.svg",
      "description": "BI-платформа Microsoft для визуализации и анализа данных",
      "why": "Позволяет собрать данные из 1C, Excel и других источников и построить красивые и понятные отчеты",
      "homepage": "https://powerbi.microsoft.com/ru-ru/",
      "repo": null,
      "start": [
        {
          "label": "Microsoft Power BI + 1С. Зачем и как?",
          "url": "https://infostart.ru/public/360077/"
        },
        {
          "label": "Как подружить 1С и Power BI",
          "url": "https://infostart.ru/1c/articles/914689/"
        },
        {
          "label": "Бизнес-аналитика с помощью Power BI",
          "url": "https://infostart.ru/1c/articles/1091360/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "пауэр би",
        "повер би",
        "power bi",
        "пауэрби"
      ],
      "analogs": [
        "1С:Аналитика",
        "Yandex DataLens",
        "Visiology"
      ]
    },
    {
      "name": "Yandex DataLens",
      "added": "2026-06-08",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "datalens.svg",
      "description": "Отечественная BI-платформа Яндекса для дашбордов и аналитики",
      "why": "Строит дашборды поверх данных 1С (через выгрузку или витрину) — российская замена Power BI",
      "homepage": "https://datalens.yandex.ru/",
      "repo": null,
      "start": [
        {
          "label": "Создание дашборда в DataLens из отчета 1С",
          "url": "https://infostart.ru/pm/1978248/"
        },
        {
          "label": "Выгрузка из 1С в BI-системы: DataLens, Power BI, Visiology",
          "url": "https://infostart.ru/public/1755776/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "яндекс даталенс",
        "даталенс",
        "datalens",
        "data lens"
      ],
      "analogs": [
        "1С:Аналитика",
        "Microsoft Power BI",
        "Visiology"
      ]
    },
    {
      "name": "Visiology",
      "added": "2026-06-08",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "visiology.svg",
      "description": "Российская BI-платформа для корпоративной аналитики и дашбордов",
      "why": "Отечественная BI из реестра ПО — визуализация показателей поверх данных 1С",
      "homepage": "https://visiology.su/",
      "repo": null,
      "start": [
        {
          "label": "Выгрузка из 1С в BI-системы: DataLens, Power BI, Visiology",
          "url": "https://infostart.ru/public/1755776/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "визиолоджи",
        "визиология",
        "visiology"
      ],
      "analogs": [
        "1С:Аналитика",
        "Microsoft Power BI",
        "Yandex DataLens"
      ]
    },
    {
      "name": "RAC/RAS",
      "added": "2026-06-08",
      "category": "Администрирование 1С",
      "subcategory": "Штатные инструменты",
      "logo": "1c.png",
      "description": "Серверная утилита (ras) и консольный клиент (rac) администрирования кластера 1С",
      "why": "Управление кластером, сеансами и информационными базами из командной строки — основа автоматизации администрирования и скриптов обслуживания",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000484",
      "repo": null,
      "start": [
        {
          "label": "Сервер администрирования кластера серверов 1С и deployka",
          "url": "https://infostart.ru/1c/articles/810752/"
        },
        {
          "label": "Полный список команд RAS/RAC",
          "url": "https://infostart.ru/public/1038528/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "рак рас",
        "rac ras",
        "рак/рас"
      ],
      "analogs": [
        "ibcmd",
        "Консоль администрирования серверов 1С"
      ],
      "depends": [
        "Кластер серверов 1С:Предприятие"
      ]
    },
    {
      "name": "ibcmd",
      "added": "2026-06-08",
      "category": "Администрирование 1С",
      "subcategory": "Штатные инструменты",
      "logo": "1c.png",
      "description": "Консольная утилита управления информационными базами 1С (создание, обновление, выгрузка)",
      "why": "Позволяет работать с ИБ без кластера: разворачивать, обновлять конфигурацию и выгружать/загружать данные из CLI в пайплайнах",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000559",
      "repo": null,
      "start": [
        {
          "label": "Примеры работы с утилитой администрирования ibcmd",
          "url": "https://infostart.ru/1c/articles/2500569/"
        },
        {
          "label": "Автономный сервер. Часть 2 — утилита управления",
          "url": "https://infostart.ru/1c/articles/1168516/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "ибсмд",
        "ibcmd",
        "ибцмд"
      ],
      "analogs": [
        "RAC/RAS"
      ],
      "depends": [
        "Кластер серверов 1С:Предприятие"
      ]
    },
    {
      "name": "Консоль администрирования серверов 1С",
      "added": "2026-06-08",
      "category": "Администрирование 1С",
      "subcategory": "Штатные инструменты",
      "logo": "1c.png",
      "description": "Графическая консоль (MMC) управления кластером серверов 1С:Предприятие",
      "why": "Привычный GUI для администрирования кластера: рабочие серверы, сеансы, информационные базы, регламентные задания",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000186",
      "repo": null,
      "start": [
        {
          "label": "Особенности использования консоли администрирования разных версий",
          "url": "https://rarus.ru/publications/20160321-osobennosti-ispolzovaniya-konsoli-administrirovaniya-serverov-1c-predpriyatie-raznykh-versiy-644584/"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "консоль администрирования",
        "консоль кластера",
        "admin console"
      ],
      "analogs": [
        "RAC/RAS"
      ],
      "depends": [
        "Кластер серверов 1С:Предприятие",
        "1С:Эксперт по технологическим вопросам"
      ]
    },
    {
      "name": "Apache HTTP Server",
      "added": "2026-06-08",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Веб-серверы и прокси",
      "logo": "apache.svg",
      "description": "Веб-сервер для публикации веб-клиента и HTTP/REST-сервисов 1С",
      "why": "Классический вариант публикации базы 1С: веб-клиент, веб-сервисы и HTTP-сервисы доступны по сети",
      "homepage": "https://httpd.apache.org/",
      "repo": null,
      "start": [
        {
          "label": "Пошаговая установка веб-сервера Apache и завязка с 1С",
          "url": "https://infostart.ru/1c/articles/1207548/"
        },
        {
          "label": "Публикация конфигурации на веб-сервере Apache (в картинках)",
          "url": "https://infostart.ru/1c/articles/95950/"
        }
      ],
      "maturity": "базовое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "продукты",
        "франчайзи"
      ],
      "aliases": [
        "апач",
        "apache",
        "апаче",
        "httpd"
      ],
      "analogs": [
        "nginx",
        "Caddy",
        "HAProxy",
        "Angie",
        "IIS"
      ]
    },
    {
      "name": "IIS",
      "added": "2026-06-11",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Веб-серверы и прокси",
      "logo": "iis.png",
      "logoInvert": true,
      "description": "Веб-сервер Microsoft для публикации баз 1С на Windows Server",
      "why": "Штатный вариант публикации 1С в Windows-инфраструктуре: веб-клиент и HTTP-сервисы без стороннего ПО, доменная аутентификация из коробки",
      "homepage": "https://www.iis.net/",
      "repo": null,
      "start": [
        {
          "label": "Пошаговая настройка web-сервисов для 1С и IIS",
          "url": "https://infostart.ru/1c/articles/275820/"
        },
        {
          "label": "Под капотом IIS: веб-публикация базы 1С без конфигуратора",
          "url": "https://infostart.ru/1c/articles/1434014/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "ограничен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "продукты",
        "франчайзи"
      ],
      "aliases": [
        "иис",
        "internet information services"
      ],
      "analogs": [
        "Apache HTTP Server"
      ]
    },
    {
      "name": "nginx",
      "added": "2026-06-08",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Веб-серверы и прокси",
      "logo": "nginx.svg",
      "description": "Высокопроизводительный веб-сервер и обратный прокси для публикации 1С",
      "why": "Обратный прокси и балансировщик перед серверами 1С: HTTPS, кэширование статики, маршрутизация веб- и HTTP-сервисов",
      "homepage": "https://nginx.org/",
      "repo": null,
      "start": [
        {
          "label": "Настройка веб-сервера Nginx — методическая поддержка 1С",
          "url": "https://its.1c.ru/db/content/metod8dev/src/developers/scalability/instructions/i8105980.htm"
        },
        {
          "label": "Ограничение доступа к HTTP-публикациям 1С через NGINX",
          "url": "https://infostart.ru/1c/articles/1258813/"
        }
      ],
      "maturity": "базовое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "продукты"
      ],
      "aliases": [
        "нгинкс",
        "энджиникс",
        "нжинкс",
        "nginx"
      ],
      "analogs": [
        "Apache HTTP Server",
        "Caddy",
        "HAProxy",
        "Angie"
      ]
    },
    {
      "name": "Кластер серверов 1С:Предприятие",
      "added": "2026-06-08",
      "category": "Администрирование 1С",
      "subcategory": "Штатные инструменты",
      "logo": "1c.png",
      "description": "Объединение рабочих серверов 1С для обслуживания нагрузки",
      "why": "Обеспечивает масштабируемость (наращивание оборудования под нагрузку), отказоустойчивость и балансировку нагрузки между серверами. Понимание устройства кластера важно при работе с серверным вариантом 1С и при администрировании крупных внедрений",
      "homepage": "https://habr.com/ru/companies/1c/articles/493008/",
      "repo": null,
      "start": [
        {
          "label": "О кластере серверов 1С:Предприятия",
          "url": "https://habr.com/ru/companies/1c/articles/493008/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "кластер серверов",
        "кластер 1с",
        "сервер 1с",
        "server cluster"
      ],
      "depends": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Postgres Pro",
        "Oracle Database",
        "IBM Db2"
      ]
    },
    {
      "name": "OneSwiss",
      "added": "2026-06-08",
      "category": "Администрирование 1С",
      "subcategory": "Управление парком баз",
      "logo": "oneswiss.png",
      "description": "Кроссплатформенный комплекс обслуживания и мониторинга баз 1С",
      "why": "Автоматизирует регламентное обслуживание баз и упрощает работу администратора: блокировка соединений, загрузка конфигураций и расширений, запуск внешних обработок и скриптов по шаблонам в виде блок-схем",
      "homepage": "https://infostart.ru/1c/tools/2433900/",
      "repo": "https://github.com/akpaevj/oneswiss",
      "start": [
        {
          "label": "Еще раз о мониторинге и обслуживании — OneSwiss",
          "url": "https://infostart.ru/1c/tools/2433900/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "вансвисс",
        "уан свисс",
        "one swiss",
        "онсвисс"
      ],
      "analogs": [
        "Elasticsearch",
        "ClickHouse"
      ]
    },
    {
      "name": "draw.io (diagrams.net)",
      "added": "2026-06-08",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Диаграммы",
      "logo": "drawio.svg",
      "description": "Бесплатный редактор диаграмм и схем: блок-схемы, BPMN, ER, архитектура",
      "why": "Моделирование бизнес-процессов и схем интеграций для ТЗ и согласований; работает в браузере и десктопе, экспорт в проектную документацию",
      "homepage": "https://www.drawio.com/",
      "repo": "https://github.com/jgraph/drawio",
      "start": [
        {
          "label": "Как быстро нарисовать блок-схему или бизнес-процесс",
          "url": "https://infostart.ru/1c/articles/1556675/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "драв ио",
        "дроу ио",
        "draw io",
        "diagrams",
        "диаграммс"
      ]
    },
    {
      "name": "Confluence",
      "added": "2026-06-08",
      "category": "База знаний",
      "subcategory": null,
      "logo": "confluence.svg",
      "description": "Корпоративная база знаний и пространство проектной документации от Atlassian",
      "why": "Хранит ТЗ, регламенты, протоколы встреч и базу знаний проекта 1С; тесно связан с задачами Jira",
      "homepage": "https://www.atlassian.com/software/confluence",
      "repo": null,
      "start": [
        {
          "label": "Официальные гайды по Confluence",
          "url": "https://www.atlassian.com/ru/software/confluence/guides"
        },
        {
          "label": "Расширение 1С для работы с базой знаний Confluence",
          "url": "https://infostart.ru/1c/tools/1131241/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "аналитик",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "конфлюенс",
        "конфлюэнс",
        "confluence"
      ],
      "analogs": [
        "Teamly",
        "Wiki репозитория",
        "Gramax"
      ]
    },
    {
      "name": "Teamly",
      "added": "2026-06-08",
      "category": "База знаний",
      "subcategory": null,
      "logo": "teamly.svg",
      "description": "Отечественная платформа базы знаний и совместной работы с документами",
      "why": "Российская замена Confluence: ТЗ, регламенты и база знаний команды 1С в ПО из реестра",
      "homepage": "https://teamly.ru/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик",
        "тестировщик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "тимли",
        "teamly"
      ],
      "analogs": [
        "Confluence",
        "Wiki репозитория",
        "Gramax"
      ]
    },
    {
      "name": "Wiki репозитория",
      "added": "2026-06-09",
      "category": "База знаний",
      "subcategory": null,
      "logo": "wiki.svg",
      "logoInvert": true,
      "description": "Встроенная вики git-хостинга: статьи в Markdown рядом с кодом, без отдельного сервиса",
      "why": "Базовый способ вести проектную документацию команды, когда не нужен отдельный Confluence: вики GitLab/GitHub/GitVerse хранится в git и правится в Markdown",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Документирование проекта с помощью вики на GitHub",
          "url": "https://docs.github.com/ru/communities/documenting-your-project-with-wikis"
        }
      ],
      "maturity": "базовое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "вики",
        "wiki",
        "вики репозитория",
        "репозиторий вики"
      ],
      "analogs": [
        "Confluence",
        "Teamly",
        "Gramax"
      ],
      "depends": [
        "git"
      ]
    },
    {
      "name": "1С:Профессионал",
      "added": "2026-06-08",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Базовый экзамен на знание платформы и типовых конфигураций 1С",
      "why": "Подтверждает базовый уровень владения платформой — стартовая ступень для разработчика и консультанта 1С, частое требование вакансий",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Описание экзамена от 1С",
          "url": "https://1c.ru/prof/prof.htm"
        },
        {
          "label": "1С:Учебное тестирование",
          "url": "https://uc1.1c.ru/uchebnoe-testirovanie/"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор",
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "профессионал",
        "проф",
        "сертификат профессионал"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия"
      ]
    },
    {
      "name": "1С:Специалист‑консультант",
      "added": "2026-06-08",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамены по внедрению и сопровождению прикладных решений",
      "why": "Подтверждает компетенции по внедрению и сопровождению типовых решений — ценится у франчайзи и на проектах внедрения",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Об экзамене 1С:Специалист-консультант",
          "url": "https://uc1.1c.ru/ekzameny-1s/spec-konsultant/"
        },
        {
          "label": "Подготовка к аттестации — подборка Инфостарта",
          "url": "https://infostart.ru/public/all/priemy_i_metody_razrabotki/podgotovka_k_attestacii/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "франчайзи",
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "специалист консультант",
        "спец консультант"
      ],
      "analogs": [
        "1С:Специалист",
        "1С:Эксперт по технологическим вопросам",
        "1С:Эксплуататор"
      ],
      "depends": [
        "1С:Профессионал"
      ]
    },
    {
      "name": "1С:Специалист",
      "added": "2026-06-08",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамен на умение решать практические задачи в конфигурациях",
      "why": "Подтверждает умение дорабатывать конфигурации под задачи бизнеса — ключевая сертификация для разработчика 1С",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Как получить сертификат 1С:Специалист",
          "url": "https://1c.ru/spec/texts/how_to_get.htm"
        },
        {
          "label": "Подготовка к аттестации — подборка Инфостарта",
          "url": "https://infostart.ru/public/all/priemy_i_metody_razrabotki/podgotovka_k_attestacii/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "франчайзи",
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "специалист",
        "сертификат специалист"
      ],
      "analogs": [
        "1С:Специалист‑консультант",
        "1С:Эксперт по технологическим вопросам",
        "1С:Эксплуататор"
      ],
      "depends": [
        "1С:Профессионал"
      ]
    },
    {
      "name": "1С:Эксперт по технологическим вопросам",
      "added": "2026-06-08",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамен по оптимизации и нестандартным техническим решениям",
      "why": "Высшая техническая сертификация: оптимизация производительности и решение сложных нагрузочных задач в крупных системах",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "Настольная книга 1С:Эксперта по технологическим вопросам",
          "url": "https://online.1c.ru/books/book/20752408/"
        },
        {
          "label": "База знаний «Технологические вопросы крупных внедрений»",
          "url": "https://kb.1c.ru"
        },
        {
          "label": "Как я стал Экспертом по технологическим вопросам за 3 месяца",
          "url": "https://infostart.ru/1c/articles/2027654/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "продукты"
      ],
      "aliases": [
        "эксперт",
        "эксперт по технологическим вопросам",
        "1с эксперт"
      ],
      "analogs": [
        "1С:Специалист‑консультант",
        "1С:Специалист"
      ],
      "depends": [
        "Консоль администрирования серверов 1С",
        "1С:Профессионал"
      ]
    },
    {
      "name": "1С:Эксплуататор",
      "added": "2026-06-08",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамен по настройке и поддержке крупных систем на базе 1С",
      "why": "Подтверждает навыки администрирования и поддержки высоконагруженных систем 1С — для админов и DevOps крупных внедрений",
      "homepage": null,
      "repo": null,
      "start": [
        {
          "label": "технологической базы знаний",
          "url": "http://kb.1c.ru"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "продукты"
      ],
      "aliases": [
        "эксплуататор",
        "1с эксплуататор"
      ],
      "analogs": [
        "1С:Специалист‑консультант",
        "1С:Специалист"
      ],
      "depends": [
        "1С:Профессионал"
      ]
    },
    {
      "name": "Сертификация от 1С-ТестЦентр",
      "added": "2026-06-08",
      "category": "Сертификация",
      "subcategory": "Независимая сертификация",
      "logo": "1c.png",
      "description": "Онлайн-тестирование знаний и навыков специалистов 1С",
      "why": "Независимая онлайн-проверка знаний 1С-разработчиков для соискателей и сотрудников. После прохождения теста сервис подготовит относительно подробное заключение о квалификации претендента, и на основании этого присвоит ему соответствующий грейд в зависимости от набранных баллов",
      "homepage": "https://1c-tc.ru",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "тестцентр",
        "тест центр",
        "сертификация 1с"
      ],
      "analogs": [
        "Сертификация от Госуслуг"
      ]
    },
    {
      "name": "Сертификация от Госуслуг",
      "added": "2026-06-08",
      "category": "Сертификация",
      "subcategory": "Независимая сертификация",
      "logo": "gosuslugi.svg",
      "description": "Подтверждение ИТ-компетенций сертификатом на Госуслугах",
      "why": "Независимая онлайн-проверка знаний IT-компетенций, с сертификатом от Минцифры. Привлечение внимания к резюме. Выше шансы на трудоустройство. Хранение в одном месте и постоянный доступ",
      "homepage": "https://www.gosuslugi.ru/itskills",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "франчайзи",
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "госуслуги",
        "сертификация госуслуги",
        "gosuslugi"
      ],
      "analogs": [
        "Сертификация от 1С-ТестЦентр"
      ]
    },
    {
      "name": "Zabbix",
      "added": "2026-06-08",
      "category": "Мониторинг",
      "subcategory": "Мониторинг инфраструктуры",
      "logo": "zabbix.svg",
      "description": "Мониторинг серверов, сервисов и инфраструктуры 1С",
      "why": "Следит за доступностью и нагрузкой серверов 1С, шлет алерты при проблемах",
      "homepage": "https://www.zabbix.com/",
      "repo": "https://github.com/zabbix/zabbix",
      "start": [
        {
          "label": "Мониторинг кластера 1С 8.3 в Zabbix",
          "url": "https://infostart.ru/1c/articles/1632627/"
        },
        {
          "label": "Мониторинг сервера 1С на GNU/Linux с помощью Zabbix",
          "url": "https://infostart.ru/1c/articles/1529299/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "заббикс",
        "забикс",
        "zabbix"
      ],
      "analogs": [
        "Prometheus"
      ]
    },
    {
      "name": "Grafana",
      "added": "2026-06-08",
      "category": "Мониторинг",
      "subcategory": "Мониторинг инфраструктуры",
      "logo": "grafana.svg",
      "description": "Дашборды и визуализация метрик из разных источников",
      "why": "Собирает метрики 1С и инфраструктуры в наглядные дашборды",
      "homepage": "https://grafana.com/",
      "repo": "https://github.com/grafana/grafana",
      "start": [
        {
          "label": "Метрики, графики, статистика = Prometheus + Grafana",
          "url": "https://infostart.ru/1c/articles/811821/"
        },
        {
          "label": "Как и чем мониторить 1С:Предприятие: просто о важном",
          "url": "https://infostart.ru/1c/articles/2543624/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "графана",
        "grafana"
      ],
      "analogs": [
        "Allure"
      ],
      "depends": [
        "Prometheus",
        "ClickHouse"
      ]
    },
    {
      "name": "Prometheus",
      "added": "2026-06-08",
      "category": "Мониторинг",
      "subcategory": "Мониторинг инфраструктуры",
      "logo": "prometheus.svg",
      "description": "Сбор и хранение метрик с алертингом",
      "why": "Собирает метрики серверов и сервисов 1С, питает Grafana и алерты",
      "homepage": "https://prometheus.io/",
      "repo": "https://github.com/prometheus/prometheus",
      "start": [
        {
          "label": "Prometheus и Grafana. Все, что вы хотели знать о мониторинге",
          "url": "https://infostart.ru/1c/articles/2629748/"
        },
        {
          "label": "Как я мониторинг разворачивал",
          "url": "https://infostart.ru/1c/articles/1859181/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "прометей",
        "прометеус",
        "prometheus"
      ],
      "analogs": [
        "Zabbix"
      ]
    },
    {
      "name": "1С:КИП (Корпоративный инструментальный пакет)",
      "added": "2026-06-08",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Пакет инструментов 1С для контроля и оптимизации производительности крупных внедрений",
      "why": "Включает Центр контроля качества, Тест-центр и инструменты анализа — основа методики мониторинга и нагрузочного тестирования по стандартам 1С",
      "homepage": "https://its.1c.ru/db/kip",
      "repo": null,
      "start": [
        {
          "label": "Документация 1С:КИП на ИТС",
          "url": "https://its.1c.ru/db/kip"
        },
        {
          "label": "Обзор 1С:КИП на Инфостарте",
          "url": "https://infostart.ru/soft1c/1c-kip/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "кип",
        "kip",
        "корпоративный инструментальный пакет"
      ]
    },
    {
      "name": "1С:ЦКК (Центр контроля качества)",
      "added": "2026-06-08",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Система автоматического мониторинга производительности и качества работы баз 1С",
      "why": "Регулярно собирает показатели (APDEX, ошибки, регламент) и сигнализирует о деградации производительности продуктивных систем",
      "homepage": "https://its.1c.ru/db/kip#content:171:hdoc",
      "repo": null,
      "start": [
        {
          "label": "Глава «Центр контроля качества» в документации КИП",
          "url": "https://its.1c.ru/db/kip/content/47/hdoc"
        },
        {
          "label": "Сценарии обслуживания SQL в Центре контроля качества",
          "url": "https://infostart.ru/1c/articles/2068868/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "цкк",
        "ckk",
        "центр контроля качества"
      ],
      "depends": [
        "1С:КИП (Корпоративный инструментальный пакет)",
        "APDEX"
      ]
    },
    {
      "name": "1С:Тест-центр",
      "added": "2026-06-08",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Инструмент автоматизации многопользовательского нагрузочного тестирования 1С",
      "why": "Эмулирует работу сотен пользователей для оценки производительности системы под нагрузкой до вывода в продуктив",
      "homepage": "https://its.1c.ru/db/kip#content:151:hdoc",
      "repo": null,
      "start": [
        {
          "label": "Оптимизируем и удешевляем нагрузочное тестирование 1С",
          "url": "https://infostart.ru/1c/articles/2444773/"
        },
        {
          "label": "Скрещиваем 1С:Тест-центр и Vanessa Automation",
          "url": "https://infostart.ru/video/w1182050/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "тест центр",
        "тест-центр",
        "test center"
      ],
      "depends": [
        "1С:КИП (Корпоративный инструментальный пакет)"
      ]
    },
    {
      "name": "APDEX",
      "added": "2026-06-08",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "apdex.png",
      "description": "Методика числовой оценки удовлетворенности пользователей временем отклика",
      "why": "Единая метрика производительности ключевых операций (0..1) — на ней строится мониторинг и SLA по скорости работы 1С",
      "homepage": "https://its.1c.ru/db/metod8dev#content:5847:hdoc",
      "repo": null,
      "start": [
        {
          "label": "Оценка интегральной производительности по методике APDEX",
          "url": "https://its.1c.ru/db/metod8dev/content/5807/hdoc"
        },
        {
          "label": "Другой взгляд на APDEX и подсистему «Оценка производительности»",
          "url": "https://infostart.ru/1c/articles/1006853/"
        },
        {
          "label": "Оценка производительности с помощью БСП",
          "url": "https://infostart.ru/1c/articles/1686856/"
        }
      ],
      "maturity": "базовое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "апдекс",
        "apdex"
      ]
    },
    {
      "name": "Анализ технологического журнала",
      "added": "2026-06-08",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Сбор и разбор технологического журнала платформы для поиска проблем производительности",
      "why": "Техжурнал фиксирует события платформы (блокировки, длительные запросы, ошибки); его анализ — ключ к расследованию инцидентов производительности",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000437",
      "repo": null,
      "start": [
        {
          "label": "Примеры настроек технологического журнала",
          "url": "https://infostart.ru/1c/articles/2020498/"
        },
        {
          "label": "Описание почти всех событий технологического журнала",
          "url": "https://infostart.ru/1c/articles/1195695/"
        },
        {
          "label": "5 шагов к мониторингу проблем производительности базы 1С",
          "url": "https://infostart.ru/1c/articles/1040073/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "технологический журнал",
        "тж",
        "анализ тж",
        "techlog"
      ]
    },
    {
      "name": "Elasticsearch",
      "added": "2026-06-08",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "elasticsearch.svg",
      "description": "Поисковый движок для хранения и анализа логов",
      "why": "Хранит и индексирует логи 1С для быстрого поиска и анализа",
      "homepage": "https://www.elastic.co/elasticsearch",
      "repo": "https://github.com/elastic/elasticsearch",
      "start": [
        {
          "label": "OpenSearch для 1Сников: бесплатный ElasticSearch без потерь",
          "url": "https://infostart.ru/1c/articles/2440231/"
        },
        {
          "label": "Перенос всех логов в Elasticsearch",
          "url": "https://infostart.ru/1c/articles/1257666/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "эластик",
        "эластиксерч",
        "elastic",
        "эластик серч"
      ],
      "analogs": [
        "OneSwiss",
        "ClickHouse"
      ]
    },
    {
      "name": "Kibana",
      "added": "2026-06-08",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "kibana.svg",
      "description": "Визуализация и поиск по логам из Elasticsearch",
      "why": "Веб-интерфейс для анализа логов 1С, хранящихся в Elasticsearch",
      "homepage": "https://www.elastic.co/kibana",
      "repo": "https://github.com/elastic/kibana",
      "start": [
        {
          "label": "Загрузка логов журнала регистрации 1С в ElasticSearch и Kibana",
          "url": "https://infostart.ru/1c/articles/545895/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "кибана",
        "kibana"
      ],
      "depends": [
        "Elasticsearch"
      ]
    },
    {
      "name": "Logstash",
      "added": "2026-06-08",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "logstash.svg",
      "description": "Сбор, преобразование и доставка логов",
      "why": "Собирает логи 1С из разных источников и нормализует перед отправкой",
      "homepage": "https://www.elastic.co/logstash",
      "repo": "https://github.com/elastic/logstash",
      "start": [
        {
          "label": "Экспорт технологического журнала 1С в Elastic с помощью Logstash",
          "url": "https://infostart.ru/1c/articles/1933637/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "логсташ",
        "лог сташ",
        "logstash"
      ],
      "depends": [
        "Elasticsearch"
      ]
    },
    {
      "name": "ClickHouse",
      "added": "2026-06-08",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "clickhouse.svg",
      "description": "Колоночная СУБД для аналитики больших логов",
      "why": "Быстро хранит и агрегирует огромные объемы логов и событий 1С",
      "homepage": "https://clickhouse.com/",
      "repo": "https://github.com/ClickHouse/ClickHouse",
      "start": [
        {
          "label": "Библиотека ClickHouse для 1С",
          "url": "https://infostart.ru/1c/articles/2639974/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "кликхаус",
        "клик хаус",
        "click house"
      ],
      "analogs": [
        "OneSwiss",
        "Elasticsearch"
      ]
    },
    {
      "name": "Jira",
      "added": "2026-06-08",
      "category": "Задачи",
      "subcategory": null,
      "logo": "jira.svg",
      "description": "Трекер задач и управление разработкой",
      "why": "Ведет задачи, баги и спринты команды 1С-разработки",
      "homepage": "https://www.atlassian.com/software/jira",
      "repo": null,
      "start": [
        {
          "label": "Официальные гайды по Jira (на русском)",
          "url": "https://www.atlassian.com/ru/software/jira/guides"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "джира",
        "жира",
        "jira"
      ],
      "analogs": [
        "1С:СППР",
        "Яндекс Трекер",
        "YouTrack",
        "Redmine",
        "Битрикс24"
      ]
    },
    {
      "name": "Trello",
      "added": "2026-06-08",
      "category": "Задачи",
      "subcategory": null,
      "logo": "trello.svg",
      "description": "Канбан-доски для простого ведения задач",
      "why": "Легкое управление задачами небольших команд и проектов на 1С",
      "homepage": "https://trello.com/",
      "repo": null,
      "start": [
        {
          "label": "Официальный гайд по Trello",
          "url": "https://trello.com/guide"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "франчайзи",
        "инхаус"
      ],
      "aliases": [
        "трелло",
        "trello"
      ],
      "analogs": [
        "Kaiten",
        "WEEEK"
      ]
    },
    {
      "name": "Яндекс Трекер",
      "added": "2026-06-08",
      "category": "Задачи",
      "subcategory": null,
      "logo": "yandex-tracker.svg",
      "description": "Облачный трекер задач и управление разработкой от Яндекса",
      "why": "Ведет задачи, спринты и процессы команды 1С в отечественном облаке — импортозамещение Jira",
      "homepage": "https://yandex.ru/tracker/",
      "repo": null,
      "start": [
        {
          "label": "Документация Яндекс Трекера",
          "url": "https://yandex.cloud/ru/docs/tracker/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "яндекс трекер",
        "трекер",
        "yandex tracker"
      ],
      "analogs": [
        "Jira",
        "YouTrack",
        "Redmine",
        "Битрикс24"
      ]
    },
    {
      "name": "YouTrack",
      "added": "2026-06-08",
      "category": "Задачи",
      "subcategory": null,
      "logo": "youtrack.png",
      "description": "Трекер задач и Agile-доски от JetBrains",
      "why": "Ведет задачи и спринты команды 1С с гибкими запросами и автоматизацией",
      "homepage": "https://www.jetbrains.com/youtrack/",
      "repo": null,
      "start": [
        {
          "label": "Документация YouTrack",
          "url": "https://www.jetbrains.com/help/youtrack/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "ютрек",
        "ю трек",
        "youtrack",
        "ютрэк"
      ],
      "analogs": [
        "Jira",
        "Яндекс Трекер",
        "Redmine",
        "Битрикс24"
      ]
    },
    {
      "name": "Redmine",
      "added": "2026-06-08",
      "category": "Задачи",
      "subcategory": null,
      "logo": "redmine.svg",
      "description": "Open-source система ведения задач и проектов",
      "why": "Бесплатный трекер задач и багов для небольших команд и франчайзи на 1С",
      "homepage": "https://www.redmine.org/",
      "repo": null,
      "start": [
        {
          "label": "Официальное руководство Redmine",
          "url": "https://www.redmine.org/projects/redmine/wiki/Guide"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "редмайн",
        "редмине",
        "redmine"
      ],
      "analogs": [
        "1С:СППР",
        "Jira",
        "Яндекс Трекер",
        "YouTrack",
        "Битрикс24"
      ]
    },
    {
      "name": "Kaiten",
      "added": "2026-06-08",
      "category": "Задачи",
      "subcategory": null,
      "logo": "kaiten.jpeg",
      "description": "Отечественный сервис канбан-досок и управления задачами",
      "why": "Российская замена Trello/Jira для ведения задач команд 1С",
      "homepage": "https://kaiten.ru/",
      "repo": null,
      "start": [
        {
          "label": "База знаний Kaiten",
          "url": "https://support.kaiten.ru/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "франчайзи",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "кайтен",
        "kaiten"
      ],
      "analogs": [
        "Trello",
        "WEEEK"
      ]
    },
    {
      "name": "WEEEK",
      "added": "2026-06-08",
      "category": "Задачи",
      "subcategory": null,
      "logo": "weeek.svg",
      "description": "Отечественный таск-менеджер с досками, спринтами и базой знаний",
      "why": "Российский сервис управления задачами и проектами для команд 1С",
      "homepage": "https://weeek.net/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "франчайзи",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "уик",
        "виик",
        "weeek"
      ],
      "analogs": [
        "Trello",
        "Kaiten"
      ]
    },
    {
      "name": "Битрикс24",
      "added": "2026-06-09",
      "category": "Задачи",
      "subcategory": null,
      "logo": "bitrix24.svg",
      "description": "Отечественная платформа для совместной работы: задачи, проекты, CRM и коммуникации",
      "why": "Российский корпоративный портал для ведения задач, проектов и общения команд 1С — часто внедряется вместе с 1С во франчайзи и инхаус",
      "homepage": "https://www.bitrix24.ru/",
      "repo": null,
      "start": [
        {
          "label": "Справка Битрикс24",
          "url": "https://helpdesk.bitrix24.ru/"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "аналитик",
        "тестировщик",
        "администратор"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "битрикс",
        "bitrix",
        "битрикс24",
        "bitrix24",
        "б24"
      ],
      "analogs": [
        "Jira",
        "Яндекс Трекер",
        "YouTrack",
        "Redmine"
      ]
    },
    {
      "name": "Kubernetes",
      "added": "2026-06-08",
      "category": "CI/CD",
      "subcategory": "Контейнеризация",
      "logo": "kubernetes.svg",
      "description": "Оркестрация контейнеров для развертывания сервисов",
      "why": "Управляет контейнерами вокруг 1С: масштабирование, обновления, отказоустойчивость",
      "homepage": "https://kubernetes.io/",
      "repo": "https://github.com/kubernetes/kubernetes",
      "start": [
        {
          "label": "Жизнь платформы 1C:Предприятие в кластере Kubernetes",
          "url": "https://infostart.ru/1c/articles/1795989/"
        },
        {
          "label": "Ферма приложений на Kubernetes",
          "url": "https://infostart.ru/1c/articles/1283329/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "кубернетес",
        "кубер",
        "к8с",
        "k8s",
        "kubernetes",
        "кубернетис"
      ],
      "depends": [
        "Docker"
      ]
    },
    {
      "name": "Caddy",
      "added": "2026-06-10",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Веб-серверы и прокси",
      "logo": "caddy.svg",
      "description": "Современный веб-сервер и обратный прокси с автоматическим HTTPS для публикации 1С",
      "why": "Простая публикация веб-клиента и сервисов 1С: обратный прокси с автоматическим выпуском TLS-сертификатов и лаконичным конфигом",
      "homepage": "https://caddyserver.com/",
      "repo": "https://github.com/caddyserver/caddy",
      "start": [
        {
          "label": "Документация Caddy",
          "url": "https://caddyserver.com/docs/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "кэдди",
        "кади",
        "кеди",
        "caddy"
      ],
      "analogs": [
        "nginx",
        "Apache HTTP Server",
        "HAProxy",
        "Angie"
      ]
    },
    {
      "name": "ПУСК (Панель управления сервисами и компонентами)",
      "added": "2026-06-10",
      "category": "Администрирование 1С",
      "subcategory": "Управление парком баз",
      "logo": "pusk.svg",
      "description": "Кроссплатформенная веб-панель управления кластером серверов 1С через графический интерфейс",
      "why": "Администрирование инфраструктуры 1С без командной строки: базы, сеансы, блокировки и рабочие процессы кластера в одном браузерном интерфейсе. Работает на Linux и Windows",
      "homepage": "https://it-expertise.ru/pusk/",
      "repo": null,
      "start": [
        {
          "label": "Устанавливаем и настраиваем ПУСК",
          "url": "https://interface31.ru/tech_it/2025/01/ustanavlivaem-i-nastraivaem-pusk---panel-upravleniya-servisami-i-komponentami-dlya-1spredpriyatie.html"
        },
        {
          "label": "ПУСК на Инфостарте",
          "url": "https://infostart.ru/1c/tools/1713088/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "пуск",
        "панель управления 1с",
        "pusk",
        "ит-экспертиза"
      ],
      "analogs": [
        "RAC/RAS",
        "Консоль администрирования серверов 1С"
      ]
    },
    {
      "name": "Tantor SE 1C",
      "added": "2026-06-10",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": "Семейство PostgreSQL",
      "logo": "tantor.svg",
      "description": "Российская СУБД на базе PostgreSQL, оптимизированная и одобренная для продуктов 1С",
      "why": "Отечественная СУБД из реестра ПО для продуктива 1С: ядро PostgreSQL с собственными оптимизациями и встроенными средствами администрирования, тестируется на конфигурациях 1С",
      "homepage": "https://tantorlabs.ru/tantor-se-1c",
      "repo": null,
      "start": [
        {
          "label": "1С и СУБД Tantor: история одного внедрения",
          "url": "https://infostart.ru/1c/articles/2142833/"
        },
        {
          "label": "СУБД Tantor Postgres 17.5: обзор улучшений для 1С",
          "url": "https://infostart.ru/1c/articles/2432864/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "тантор",
        "tantor",
        "тантор постгрес",
        "тантор лабс"
      ],
      "analogs": [
        "PostgreSQL",
        "Postgres Pro",
        "Microsoft SQLServer",
        "Platform V Pangolin"
      ],
      "depends": [
        "PostgreSQL"
      ]
    },
    {
      "name": "Монитор (1smonitor)",
      "added": "2026-06-10",
      "category": "Мониторинг",
      "subcategory": "Мониторинг 1С",
      "logo": "1smonitor.png",
      "description": "Инструмент мониторинга производительности баз и серверов 1С: запросы, блокировки, взаимоблокировки",
      "why": "Анализ всех баз и серверов 1С одним инструментом: медленные запросы, ожидания на блокировках, взаимоблокировки и системные счетчики. Помогает администратору находить узкие места производительности",
      "homepage": "https://1smonitor.ru/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "монитор",
        "1смонитор",
        "1smonitor",
        "бурмистров"
      ],
      "logoInvert": true,
      "analogs": [
        "PerfExpert",
        "PerfDog",
        "Умный мониторинг",
        "Оркестратор 1С",
        "Алькир"
      ]
    },
    {
      "name": "PerfDog",
      "added": "2026-06-10",
      "category": "Мониторинг",
      "subcategory": "Мониторинг 1С",
      "logo": null,
      "description": "Онлайн-мониторинг и диагностика производительности высоконагруженных систем 1С",
      "why": "Выделяет ресурсоемкие запросы и контролирует нагрузку на уровне СУБД, серверов 1С и контекста кода: расшифровка блокировок и взаимоблокировок, разбор технологического журнала в одном интерфейсе",
      "homepage": "https://bia-tech.ru/solutions/perfdog-monitoring-1c",
      "repo": null,
      "start": [
        {
          "label": "Сторожевой пес нагруженности: зачем мы создали PerfDog",
          "url": "https://vc.ru/services/698847-storozhevoy-pes-nagruzhennosti-zachem-my-sozdali-svoy-instrument-dlya-monitoringa-raboty-1s"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "перфдог",
        "perfdog",
        "биатех",
        "bia technologies"
      ],
      "analogs": [
        "PerfExpert",
        "Монитор (1smonitor)",
        "Умный мониторинг"
      ]
    },
    {
      "name": "PerfExpert",
      "added": "2026-06-10",
      "category": "Мониторинг",
      "subcategory": "Мониторинг 1С",
      "logo": "perfexpert.png",
      "description": "Платформа мониторинга производительности высоконагруженных систем 1С и СУБД от SoftPoint",
      "why": "Непрерывный контроль метрик производительности 1С и MS SQL/PostgreSQL: сбор трасс запросов, анализ блокировок и рекомендации по оптимизации индексов",
      "homepage": "https://perfexpert.ru/",
      "repo": null,
      "start": [
        {
          "label": "Система мониторинга PerfExpert — обзор на Хабре",
          "url": "https://habr.com/ru/companies/stss/articles/334638/"
        },
        {
          "label": "ЖР и ТЖ 1С в решении вопросов производительности",
          "url": "https://softpoint.ru/articles/1c-journal-perfomance/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "перфэксперт",
        "перфексперт",
        "perfexpert",
        "софтпоинт",
        "softpoint"
      ],
      "analogs": [
        "PerfDog",
        "Монитор (1smonitor)",
        "Умный мониторинг",
        "Оркестратор 1С",
        "Алькир"
      ]
    },
    {
      "name": "Умный мониторинг",
      "added": "2026-06-10",
      "category": "Мониторинг",
      "subcategory": "Мониторинг 1С",
      "logo": "it-expertise.svg",
      "description": "Программный комплекс сбора и анализа технологических данных ИТ-инфраструктуры 1С",
      "why": "Собирает и анализирует технологические данные, помогает оперативно реагировать на инциденты и прогнозировать производительность с применением ML. От разработчиков ПУСК (ИТ-Экспертиза)",
      "homepage": "https://it-expertise.ru/monitoring/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "умный мониторинг",
        "ит-экспертиза мониторинг",
        "it-expertise"
      ],
      "analogs": [
        "PerfDog",
        "PerfExpert",
        "Монитор (1smonitor)"
      ]
    },
    {
      "name": "PlantUML",
      "added": "2026-06-10",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Диаграммы",
      "logo": "plantuml.svg",
      "description": "Инструмент для создания UML- и других диаграмм из текстового описания",
      "why": "Диаграммы как код: последовательности, классы, компоненты и схемы процессов описываются текстом, хранятся рядом с проектом и удобно версионируются. Периодически встречается в материалах сообщества 1С",
      "homepage": "https://plantuml.com/",
      "repo": "https://github.com/plantuml/plantuml",
      "start": [
        {
          "label": "1С + PlantUML + JavaScript: интерактивные диаграммы",
          "url": "https://infostart.ru/1c/articles/2356036/"
        },
        {
          "label": "Диаграмма объектов 1С на PlantUML",
          "url": "https://infostart.ru/1c/tools/1714797/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "плантюмл",
        "плант юмл",
        "plantuml",
        "юмл диаграммы",
        "uml",
        "плант умл",
        "умл"
      ],
      "analogs": [
        "draw.io (diagrams.net)",
        "Mermaid",
        "Graphviz"
      ]
    },
    {
      "name": "GitFlic",
      "added": "2026-06-10",
      "category": "Системы хранения версий",
      "subcategory": "Git-хостинги",
      "logo": "gitflic.svg",
      "description": "Российская платформа для хранения git-репозиториев и совместной разработки",
      "why": "Отечественная замена GitHub/GitLab: хостинг git-репозиториев, код-ревью, CI и реестр пакетов. Входит в реестр российского ПО",
      "homepage": "https://gitflic.ru/",
      "repo": null,
      "start": [
        {
          "label": "Автоматизация процесса разработки с помощью GitFlic",
          "url": "https://infostart.ru/1c/articles/2058025/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "гитфлик",
        "гит флик",
        "gitflic"
      ],
      "logoInvert": true,
      "analogs": [
        "GitVerse",
        "MosHub"
      ]
    },
    {
      "name": "MosHub",
      "added": "2026-06-10",
      "category": "Системы хранения версий",
      "subcategory": "Git-хостинги",
      "logo": "moshub.png",
      "description": "Российская платформа для хранения git-репозиториев и командной разработки",
      "why": "Отечественный сервис git-хостинга: репозитории, код-ревью и совместная работа над кодом как альтернатива зарубежным GitHub/GitLab",
      "homepage": "https://hub.mos.ru",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "мосхаб",
        "мос хаб",
        "moshub"
      ],
      "analogs": [
        "GitVerse",
        "GitFlic"
      ]
    },
    {
      "name": "PAPI",
      "added": "2026-06-10",
      "category": "Интеграции",
      "subcategory": "Внешние API",
      "logo": null,
      "description": "Открытая подсистема интеграционных инструментов для 1С: универсальный http-сервис и сопутствующие механизмы",
      "why": "Готовый каркас для интеграций на 1С: универсальный HTTP-сервис, логирование, подсистема «Алгоритмы» для выполнения кода, регламентные задания, роли и история данных. Развивается с открытым кодом, инструменты ранее обкатывались в отдельном репозитории PAPI-tools",
      "homepage": null,
      "repo": "https://github.com/dsdred/PAPI",
      "start": [
        {
          "label": "Подсистема PAPI — обзор возможностей",
          "url": "https://infostart.ru/1c/articles/2216535/"
        },
        {
          "label": "Сервисы интеграции без Шины и интеграции",
          "url": "https://infostart.ru/1c/articles/2059507/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "папи",
        "papi",
        "pretty api",
        "папи тулс",
        "papi tools"
      ]
    },
    {
      "name": "HAProxy",
      "added": "2026-06-11",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Веб-серверы и прокси",
      "logo": "haproxy.png",
      "description": "Высокопроизводительный балансировщик нагрузки и обратный прокси TCP/HTTP",
      "why": "Распределение нагрузки между серверами 1С и отказоустойчивая публикация: надежный балансировщик уровня L4/L7, который любят в крупных инсталляциях",
      "homepage": "https://www.haproxy.org/",
      "repo": "https://github.com/haproxy/haproxy",
      "start": [
        {
          "label": "Документация HAProxy",
          "url": "https://docs.haproxy.org/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "хапрокси",
        "ха-прокси",
        "haproxy"
      ],
      "analogs": [
        "nginx",
        "Caddy",
        "Angie",
        "Apache HTTP Server"
      ]
    },
    {
      "name": "Angie",
      "added": "2026-06-11",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Веб-серверы и прокси",
      "logo": "angie.svg",
      "description": "Отечественный форк nginx с расширенными возможностями и совместимостью с его конфигами",
      "why": "Замена nginx там, где нужны российское решение и совместимость с требованиями регуляторов: тот же конфиг плюс дополнительные модули",
      "homepage": "https://angie.software/",
      "repo": "https://github.com/webserver-llc/angie",
      "start": [
        {
          "label": "Документация Angie",
          "url": "https://angie.software/angie/docs/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "ангье",
        "анжи",
        "энджи",
        "angie"
      ],
      "analogs": [
        "nginx",
        "Caddy",
        "HAProxy",
        "Apache HTTP Server"
      ]
    },
    {
      "name": "Terraform",
      "added": "2026-06-11",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Облачная инфраструктура",
      "logo": "terraform.svg",
      "description": "Инструмент декларативного управления инфраструктурой как кодом (IaC)",
      "why": "Воспроизводимое разворачивание серверов и окружений 1С в облаках и на железе: инфраструктура описывается кодом и применяется одной командой",
      "homepage": "https://www.terraform.io/",
      "repo": "https://github.com/hashicorp/terraform",
      "start": [
        {
          "label": "Infrastructure as code: кнопка «Сделать все»",
          "url": "https://infostart.ru/1c/articles/1966784/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "терраформ",
        "терра",
        "terraform",
        "iac"
      ],
      "analogs": [
        "Ansible"
      ]
    },
    {
      "name": "HashiCorp Vault",
      "added": "2026-06-11",
      "category": "Безопасность",
      "subcategory": "Доступ и секреты",
      "logo": "vault.svg",
      "description": "Хранилище секретов и централизованное управление доступом к чувствительным данным",
      "why": "Безопасное хранение паролей, токенов и ключей вместо конфигов и переменных окружения: централизованная выдача и ротация секретов для сервисов и пайплайнов",
      "homepage": "https://www.vaultproject.io/",
      "repo": "https://github.com/hashicorp/vault",
      "start": [
        {
          "label": "Документация Vault",
          "url": "https://developer.hashicorp.com/vault/docs"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "волт",
        "хашикорп волт",
        "vault",
        "hashicorp vault",
        "секреты"
      ],
      "analogs": [
        "Vaultwarden"
      ]
    },
    {
      "name": "КриптоПро",
      "added": "2026-06-11",
      "category": "Безопасность",
      "subcategory": "Криптография и VPN",
      "logo": "cryptopro.svg",
      "description": "Криптопровайдер и средства электронной подписи под российские стандарты (ГОСТ)",
      "why": "Без него не работают электронная подпись, защищенные соединения и обмен с госсистемами в 1С: реализует российскую криптографию на сервере и рабочих местах",
      "homepage": "https://www.cryptopro.ru/",
      "repo": null,
      "start": [
        {
          "label": "Криптография и электронная подпись в решениях на 1С",
          "url": "https://infostart.ru/1c/articles/809967/"
        },
        {
          "label": "Интеграция КриптоПро CSP в платформе 1С:Предприятие",
          "url": "https://infostart.ru/1c/articles/2194709/"
        }
      ],
      "maturity": "базовое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "франчайзи",
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "криптопро",
        "крипто про",
        "cryptopro",
        "скзи",
        "эцп"
      ],
      "analogs": [
        "ViPNet",
        "Континент"
      ]
    },
    {
      "name": "1С:Управление ландшафтом",
      "added": "2026-06-11",
      "category": "Администрирование 1С",
      "subcategory": "Управление парком баз",
      "logo": "1c.png",
      "description": "Продукт 1С для централизованного управления корпоративным ландшафтом информационных систем на платформе 1С:Предприятие",
      "why": "Управление множеством баз и серверов 1С из одной точки: контроль состояния, права доступа пользователей и доставка обновлений конфигураций по всему ландшафту",
      "homepage": "https://v8.1c.ru/tekhnologii/tekhnologii-krupnykh-vnedreniy/korporativnye-instrumenty/upravlenie-landshaftom/",
      "repo": null,
      "start": [
        {
          "label": "Руководство по использованию на ИТС",
          "url": "https://its.1c.ru/db/landscapedoc"
        },
        {
          "label": "От хаоса к порядку: «1С:Управление ландшафтом»",
          "url": "https://infostart.ru/1c/articles/2511397/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "управление ландшафтом",
        "1с ул",
        "landscape management",
        "ул"
      ]
    },
    {
      "name": "1С:Облачная подсистема Фреш",
      "added": "2026-06-11",
      "category": "Администрирование 1С",
      "subcategory": "Управление парком баз",
      "logo": "1c.png",
      "description": "Технология 1С для развертывания облачных сервисов на базе 1С:Предприятия по модели SaaS",
      "why": "Провайдер размещает приложения 1С у себя и отдает их множеству изолированных абонентов: мультиарендность, разделение данных и централизованные обновления",
      "homepage": "https://v8.1c.ru/tekhnologii/1cfresh/",
      "repo": null,
      "start": [
        {
          "label": "Документация «1С:Облачная подсистема Фреш» на ИТС",
          "url": "https://its.1c.ru/db/freshpub"
        },
        {
          "label": "docker_fresh — развертывание Фреш в контейнерах",
          "url": "https://github.com/1C-Company/docker_fresh"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "продукты",
        "проекты"
      ],
      "aliases": [
        "фреш",
        "1сфреш",
        "1cfresh",
        "fresh",
        "облачная подсистема фреш",
        "1с фреш"
      ],
      "analogs": [
        "Selectel"
      ]
    },
    {
      "name": "Selectel",
      "added": "2026-06-11",
      "category": "Сетевая инфраструктура и облако",
      "subcategory": "Облачная инфраструктура",
      "logo": "selectel.svg",
      "description": "Облачный провайдер с готовой инфраструктурой и сервисами для размещения 1С",
      "why": "Быстрый запуск 1С без своего железа: аренда готового облака с настроенным окружением и оплата по использованным ресурсам",
      "homepage": "https://selectel.ru/services/1c-leasing/1c-cloud/",
      "repo": null,
      "start": [
        {
          "label": "Готовое облако 1С от Selectel",
          "url": "https://infostart.ru/soft1c/2115676/"
        },
        {
          "label": "1С в облаке: возможности и риски, решения и кейсы",
          "url": "https://selectel.ru/blog/1c-in-cloud/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "франчайзи"
      ],
      "aliases": [
        "селектел",
        "selectel",
        "облако 1с"
      ],
      "analogs": [
        "1С:Облачная подсистема Фреш"
      ]
    },
    {
      "name": "Platform V Pangolin",
      "added": "2026-06-11",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": "Семейство PostgreSQL",
      "logo": "platform-v.png",
      "description": "СУБД Сбера на базе PostgreSQL — отечественная альтернатива для баз 1С",
      "why": "PostgreSQL-совместимая российская СУБД под нагрузки 1С: корпоративная поддержка и доработки как замена зарубежным базам данных",
      "homepage": "https://platformv.sbertech.ru/products/rabota-s-dannymi/pangolin",
      "repo": null,
      "start": [
        {
          "label": "1С на Pangolin: еще одна сборка PostgreSQL для 1С:Предприятие",
          "url": "https://infostart.ru/journal/news/mir-1s/1s-na-pangolin-eshche-odna-sborka-postgresql-dlya-1s-predpriyatie_2121406/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "платформа в",
        "platform v",
        "панголин",
        "pangolin",
        "platform v pangolin",
        "субд сбера"
      ],
      "analogs": [
        "PostgreSQL",
        "Postgres Pro",
        "Tantor SE 1C"
      ]
    },
    {
      "name": "Оркестратор 1С",
      "added": "2026-06-11",
      "category": "Мониторинг",
      "subcategory": "Мониторинг 1С",
      "logo": "orchestrator1c.svg",
      "description": "Отечественный сервис мониторинга и управления системами на платформе 1С:Предприятие",
      "why": "Наблюдение за здоровьем и производительностью 1С в реальном времени: анализ журнала регистрации и техжурнала, управление сеансами и оповещения в Telegram",
      "homepage": "https://proapdex.ru/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "оркестратор1с",
        "оркестратор 1с",
        "orchestrator",
        "proapdex",
        "проапдекс",
        "апдекс"
      ],
      "analogs": [
        "Алькир",
        "PerfExpert",
        "Монитор (1smonitor)"
      ]
    },
    {
      "name": "Алькир",
      "added": "2026-06-11",
      "category": "Мониторинг",
      "subcategory": "Мониторинг 1С",
      "logo": "alkir.png",
      "description": "Отечественный инструмент мониторинга и оптимизации производительности систем 1С",
      "why": "Углубленный анализ работы 1С в одном месте: управление сервером приложений, разбор блокировок и запросов к базе, APDEX и диагностика ошибок",
      "homepage": "https://digilabs.ru/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "алькир",
        "alkir",
        "digilabs",
        "диджилабс"
      ],
      "analogs": [
        "Оркестратор 1С",
        "PerfExpert",
        "Монитор (1smonitor)"
      ]
    },
    {
      "name": "Harbor",
      "added": "2026-06-11",
      "category": "CI/CD",
      "subcategory": "Контейнеризация",
      "logo": "harbor.svg",
      "description": "Реестр контейнерных образов с управлением доступом и сканированием уязвимостей",
      "why": "Свое хранилище Docker-образов для сборки и поставки 1С-сервисов: контроль доступа, подпись и проверка образов на уязвимости",
      "homepage": "https://goharbor.io/",
      "repo": "https://github.com/goharbor/harbor",
      "start": [
        {
          "label": "Документация Harbor",
          "url": "https://goharbor.io/docs/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "проекты",
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "харбор",
        "harbor",
        "реестр образов",
        "docker registry",
        "реестр docker"
      ],
      "analogs": [
        "Docker"
      ]
    },
    {
      "name": "Gramax",
      "added": "2026-06-11",
      "category": "База знаний",
      "subcategory": null,
      "logo": "gramax.svg",
      "description": "Инструмент ведения технической документации по принципу docs-as-code",
      "why": "Командная работа над документацией как с вики, но с хранением в git: удобный редактор, версионирование и совместное ведение",
      "homepage": "https://gram.ax/",
      "repo": "https://github.com/Gram-ax/gramax",
      "start": [
        {
          "label": "Документация Gramax",
          "url": "https://gram.ax/resources/docs"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты",
        "продукты"
      ],
      "aliases": [
        "грамакс",
        "gramax",
        "грамэкс",
        "докс эс код"
      ],
      "analogs": [
        "Wiki репозитория",
        "Confluence",
        "Teamly"
      ]
    },
    {
      "name": "Keycloak",
      "added": "2026-06-11",
      "category": "Безопасность",
      "subcategory": "Доступ и секреты",
      "logo": "keycloak.svg",
      "description": "Открытая система управления доступом, единого входа (SSO) и федерации учетных записей",
      "why": "Единый вход и централизованная аутентификация для сервисов вокруг 1С: SSO, OIDC/SAML, многофакторность и управление пользователями в одном месте",
      "homepage": "https://www.keycloak.org/",
      "repo": "https://github.com/keycloak/keycloak",
      "start": [
        {
          "label": "Настройка OpenID Connect через Keycloak при подключении к 1С",
          "url": "https://infostart.ru/1c/articles/1538390/"
        },
        {
          "label": "Все об аутентификации в 1С",
          "url": "https://infostart.ru/1c/articles/2480616/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "кейклоак",
        "кейклок",
        "keycloak",
        "sso",
        "единый вход",
        "oidc"
      ],
      "analogs": [
        "Multifactor"
      ]
    },
    {
      "name": "Multifactor",
      "added": "2026-06-11",
      "category": "Безопасность",
      "subcategory": "Доступ и секреты",
      "logo": "multifactor.svg",
      "description": "Российский сервис двухфакторной аутентификации (MFA) и контроля доступа",
      "why": "Второй фактор при входе в инфраструктуру и сервисы вокруг 1С (VPN, RDP, порталы): подтверждение через приложение, OTP или биометрию против кражи паролей",
      "homepage": "https://multifactor.ru/",
      "repo": null,
      "start": [
        {
          "label": "Документация Multifactor",
          "url": "https://multifactor.ru/docs/"
        }
      ],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "мультифактор",
        "multifactor",
        "мфа",
        "mfa",
        "двухфакторная",
        "2fa",
        "многофакторная"
      ],
      "logoInvert": true,
      "analogs": [
        "Keycloak"
      ]
    },
    {
      "name": "ViPNet",
      "added": "2026-06-11",
      "category": "Безопасность",
      "subcategory": "Криптография и VPN",
      "logo": "vipnet.svg",
      "description": "Российский комплекс защищенной сети и криптографии: ГОСТ-VPN и межсетевое экранирование",
      "why": "Защищенные каналы и сертифицированная криптография для обмена 1С с госсистемами и между офисами: ГОСТ-VPN под требования регуляторов",
      "homepage": "https://infotecs.ru/",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "випнет",
        "vipnet",
        "инфотекс",
        "infotecs",
        "гост vpn"
      ],
      "analogs": [
        "Континент",
        "КриптоПро"
      ]
    },
    {
      "name": "Континент",
      "added": "2026-06-11",
      "category": "Безопасность",
      "subcategory": "Криптография и VPN",
      "logo": "kontinent.svg",
      "description": "Российский программно-аппаратный комплекс сетевой безопасности и ГОСТ-VPN",
      "why": "Сертифицированная защита периметра и каналов до 1С: межсетевой экран, криптошлюз и VPN по ГОСТ для инфраструктур с требованиями ФСТЭК и ФСБ",
      "homepage": "https://www.securitycode.ru/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "континент",
        "continent",
        "код безопасности",
        "security code",
        "криптошлюз"
      ],
      "analogs": [
        "ViPNet",
        "КриптоПро"
      ]
    },
    {
      "name": "Mermaid",
      "added": "2026-06-11",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Диаграммы",
      "logo": "mermaid.svg",
      "description": "Диаграммы как код: блок-схемы, последовательности и Ганты из текста в Markdown",
      "why": "Стандарт де-факто для диаграмм в Markdown: рендерится в git-хостингах и базах знаний, версионируется рядом с кодом; библиотеку можно встраивать в свои решения, включая 1С",
      "homepage": "https://mermaid.live",
      "repo": "https://github.com/mermaid-js/mermaid",
      "start": [
        {
          "label": "Введение в Mermaid — официальная документация",
          "url": "https://mermaid.js.org/intro/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "мермейд",
        "мермаид",
        "mermaid live"
      ],
      "analogs": [
        "PlantUML",
        "Graphviz"
      ]
    },
    {
      "name": "StormBPMN",
      "added": "2026-06-11",
      "category": "Моделирование и архитектура",
      "subcategory": "Моделирование процессов",
      "logo": "stormbpmn.svg",
      "description": "Онлайн-моделирование бизнес-процессов в нотации BPMN",
      "why": "Российский онлайн-редактор BPMN: совместная работа над схемами процессов без VPN и установки ПО",
      "homepage": "https://stormbpmn.com/",
      "repo": null,
      "start": [
        {
          "label": "Справка StormBPMN",
          "url": "https://stormbpmn.com/help"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "шторм",
        "штормбпмн",
        "сторм бпмн"
      ],
      "analogs": [
        "bpmn.io",
        "Camunda Modeler"
      ]
    },
    {
      "name": "bpmn.io",
      "added": "2026-06-11",
      "category": "Моделирование и архитектура",
      "subcategory": "Моделирование процессов",
      "logo": "bpmn-io.svg",
      "description": "Открытая библиотека и онлайн-редактор BPMN-диаграмм",
      "why": "Моделирование процессов прямо в браузере, выгрузка в .bpmn/.png/.svg; редактор можно встраивать в свои решения, включая 1С",
      "homepage": "https://bpmn.io/",
      "repo": "https://github.com/bpmn-io/bpmn-js",
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "бпмн",
        "бпмн ио",
        "bpmn js"
      ],
      "analogs": [
        "StormBPMN",
        "Camunda Modeler"
      ]
    },
    {
      "name": "Camunda Modeler",
      "added": "2026-06-11",
      "category": "Моделирование и архитектура",
      "subcategory": "Моделирование процессов",
      "logo": "camunda-modeler.svg",
      "description": "Десктопный редактор схем процессов в нотации BPMN",
      "why": "Кросс-платформенное моделирование и правка BPMN-схем офлайн, без привязки к онлайн-сервисам",
      "homepage": "https://camunda.com/download/modeler/",
      "repo": "https://github.com/camunda/camunda-modeler",
      "start": [
        {
          "label": "Документация Desktop Modeler",
          "url": "https://docs.camunda.io/docs/components/modeler/desktop-modeler/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "камунда"
      ],
      "analogs": [
        "StormBPMN",
        "bpmn.io"
      ]
    },
    {
      "name": "Structurizr",
      "added": "2026-06-11",
      "category": "Моделирование и архитектура",
      "subcategory": "Архитектура",
      "logo": "structurizr.png",
      "description": "Документирование архитектуры ПО по модели C4",
      "why": "Архитектура как код: модель системы описывается DSL, диаграммы C4 генерируются из нее и не расходятся между собой",
      "homepage": "https://structurizr.com/",
      "repo": null,
      "start": [
        {
          "label": "Документация Structurizr",
          "url": "https://docs.structurizr.com/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "структуризр",
        "c4",
        "си4"
      ],
      "analogs": [
        "Archi",
        "Modelio"
      ]
    },
    {
      "name": "Archi",
      "added": "2026-06-11",
      "category": "Моделирование и архитектура",
      "subcategory": "Архитектура",
      "logo": "archi.png",
      "description": "Моделирование корпоративной архитектуры в нотации ArchiMate",
      "why": "Когда нужно описать взаимодействие нескольких систем и сквозные процессы корпоративного ландшафта, а не одну конфигурацию",
      "homepage": "https://www.archimatetool.com/",
      "repo": "https://github.com/archimatetool/archi",
      "start": [
        {
          "label": "Учебные материалы Archi",
          "url": "https://www.archimatetool.com/resources/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "арчи",
        "архимейт",
        "archimate"
      ],
      "analogs": [
        "Structurizr",
        "Modelio"
      ]
    },
    {
      "name": "Modelio",
      "added": "2026-06-11",
      "category": "Моделирование и архитектура",
      "subcategory": "Архитектура",
      "logo": "modelio.png",
      "description": "Десктопный инструмент моделирования в нотациях UML, BPMN, ArchiMate, SysML",
      "why": "Офлайн-средство моделирования, когда нужно несколько нотаций в одном инструменте",
      "homepage": "https://www.modelio.org/",
      "repo": "https://github.com/ModelioOpenSource/Modelio",
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "моделио",
        "uml"
      ],
      "analogs": [
        "Structurizr",
        "Archi"
      ]
    },
    {
      "name": "Graphviz",
      "added": "2026-06-11",
      "category": "Прототипирование и диаграммы",
      "subcategory": "Диаграммы",
      "logo": "graphviz.png",
      "description": "Визуализация графов из текстового описания на языке DOT",
      "why": "Программная генерация схем связей и зависимостей: описал граф текстом — получил картинку",
      "homepage": "https://graphviz.org/",
      "repo": "https://gitlab.com/graphviz/graphviz",
      "start": [
        {
          "label": "Документация Graphviz",
          "url": "https://graphviz.org/documentation/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "графвиз",
        "дот",
        "dot"
      ],
      "analogs": [
        "PlantUML",
        "Mermaid"
      ]
    },
    {
      "name": "Miro",
      "added": "2026-06-11",
      "category": "База знаний",
      "subcategory": "Совместные доски",
      "logo": "miro.svg",
      "description": "Онлайн-доска для совместного моделирования и воркшопов",
      "why": "Совместные сессии с командой: от Event Storming до карт процессов — все рисуют на одной доске",
      "homepage": "https://miro.com/",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "миро",
        "мира"
      ],
      "analogs": [
        "Excalidraw"
      ]
    },
    {
      "name": "Excalidraw",
      "added": "2026-06-11",
      "category": "База знаний",
      "subcategory": "Совместные доски",
      "logo": "excalidraw.svg",
      "description": "Открытая онлайн-доска для набросков и схем в рисованном стиле",
      "why": "Быстрые наброски схем и совместные доски без регистрации; работает в браузере и доступен из РФ",
      "homepage": "https://excalidraw.com/",
      "repo": "https://github.com/excalidraw/excalidraw",
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик",
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "экскалидро",
        "эксалидро"
      ],
      "analogs": [
        "Miro"
      ]
    },
    {
      "name": "Markdown Editor",
      "added": "2026-06-11",
      "category": "База знаний",
      "subcategory": null,
      "logo": "markdown-editor.svg",
      "logoInvert": true,
      "description": "Онлайн-редактор Markdown с мгновенным предпросмотром",
      "why": "Быстрый рендер и точечные правки md-файлов без установки редактора",
      "homepage": "https://markdown-editor.github.io/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "маркдаун",
        "мд редактор"
      ]
    },
    {
      "name": "JSON Editor Online",
      "added": "2026-06-11",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "json-editor-online.png",
      "logoInvert": true,
      "description": "Визуальный редактор и сравнение JSON-документов",
      "why": "Разбор больших JSON из обменов и API: дерево, поиск, сравнение двух документов",
      "homepage": "https://jsoneditoronline.org/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "джейсон редактор",
        "json редактор"
      ],
      "analogs": [
        "JSONLint"
      ]
    },
    {
      "name": "JSONLint",
      "added": "2026-06-11",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "jsonlint.svg",
      "logoInvert": true,
      "description": "Онлайн-валидатор JSON",
      "why": "Быстро проверить корректность JSON из обмена или спецификации и найти ошибку в синтаксисе",
      "homepage": "https://jsonlint.com/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "тестировщик",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты",
        "франчайзи"
      ],
      "aliases": [
        "джейсонлинт",
        "json линт"
      ],
      "analogs": [
        "JSON Editor Online"
      ]
    },
    {
      "name": "Kiro",
      "added": "2026-06-11",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "kiro.svg",
      "description": "ИИ-среда разработки Amazon со spec-driven подходом (IDE и CLI)",
      "why": "Сначала спецификация — потом код: ИИ ведет разработку от требований и задач к реализации",
      "homepage": "https://kiro.dev/",
      "repo": null,
      "start": [
        {
          "label": "Документация Kiro",
          "url": "https://kiro.dev/docs/"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "разработчик",
        "аналитик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "киро",
        "spec driven",
        "sdd"
      ],
      "analogs": [
        "Cursor"
      ]
    },
    {
      "name": "DBeaver",
      "added": "2026-06-11",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "dbeaver.svg",
      "logoInvert": true,
      "description": "Универсальный клиент СУБД: запросы, данные, ER-диаграммы",
      "why": "Один инструмент для всех СУБД: выполнить запрос, посмотреть данные, построить ER-модель в IDEF1X или Crow's Foot",
      "homepage": "https://dbeaver.io/",
      "repo": "https://github.com/dbeaver/dbeaver",
      "start": [
        {
          "label": "Документация DBeaver",
          "url": "https://dbeaver.com/docs/dbeaver/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор",
        "разработчик",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "дибивер",
        "дбивер"
      ]
    },
    {
      "name": "Vaultwarden",
      "added": "2026-06-11",
      "category": "Безопасность",
      "subcategory": "Доступ и секреты",
      "logo": "vaultwarden.svg",
      "logoInvert": true,
      "description": "Легковесный self-hosted сервер паролей, совместимый с клиентами Bitwarden",
      "why": "Командное хранилище паролей у себя: доступы к базам, серверам и сервисам не разъезжаются по чатам и файлам",
      "homepage": null,
      "repo": "https://github.com/dani-garcia/vaultwarden",
      "start": [
        {
          "label": "Wiki по установке и настройке",
          "url": "https://github.com/dani-garcia/vaultwarden/wiki"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "волтварден",
        "вольтварден",
        "битварден",
        "bitwarden"
      ],
      "analogs": [
        "HashiCorp Vault"
      ]
    },
    {
      "name": "NotebookLM",
      "added": "2026-06-11",
      "category": "База знаний",
      "subcategory": null,
      "logo": "notebooklm.svg",
      "logoInvert": true,
      "description": "ИИ-блокнот Google: ответы, конспекты и аудиообзоры по загруженным источникам",
      "why": "Быстро разобраться в корпусе проектной документации: загружаешь требования, регламенты и статьи — и получаешь ответы строго по своим источникам, со ссылками на них",
      "homepage": "https://notebooklm.google.com",
      "repo": null,
      "start": [
        {
          "label": "Справка NotebookLM",
          "url": "https://support.google.com/notebooklm"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "бесплатное",
      "availability": "ограничен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "aliases": [
        "ноутбуклм",
        "ноутбук лм",
        "notebookllm"
      ]
    },
    {
      "name": "Git Code Review",
      "added": "2026-06-11",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "git-code-review.png",
      "description": "Рецензирование изменений из git-репозитория прямо в 1С (обработка и расширение)",
      "why": "Код-ревью в привычной для 1С-ника среде: открываешь различия коммитов и веток в форме 1С, без облачных платформ хостинга кода",
      "homepage": "https://infostart.ru/1c/tools/2002067/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "инхаус"
      ],
      "aliases": [
        "gitcodereview",
        "гит код ревью",
        "гиткодревью"
      ],
      "analogs": [
        "Crucible",
        "Review Board",
        "Collaborator"
      ]
    },
    {
      "name": "KOT for 1C",
      "added": "2026-06-11",
      "category": "Плагины и расширения",
      "subcategory": "Для VSCode",
      "logo": "kot-for-1c.png",
      "description": "Расширение VS Code для разработки и поддержки автотестов 1С в YAML-формате (СППР / Vanessa Automation)",
      "why": "Единый контур автотестирования в VS Code: IntelliSense шагов Gherkin, менеджер тестов и тестовых баз, сборка и запуск Vanessa Automation, AI-ревью сценариев — без переключения между инструментами",
      "homepage": null,
      "repo": "https://github.com/kakoytochelik/KOTfor1C",
      "start": [],
      "maturity": "нишевое",
      "origin": "отечественное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "aliases": [
        "кот",
        "keep on testing",
        "кот фор 1с",
        "kotfor1c"
      ],
      "depends": [
        "Vanessa-Automation",
        "1С:СППР"
      ]
    },
    {
      "name": "Kafka UI",
      "added": "2026-06-12",
      "category": "Интеграции",
      "subcategory": "Брокеры и шины",
      "logo": "kafka-ui.svg",
      "logoInvert": true,
      "description": "Веб-интерфейс для управления кластерами Apache Kafka",
      "why": "Наглядная консоль для Kafka: топики, сообщения, консьюмер-группы и брокеры в браузере — удобно смотреть и отлаживать обмен 1С с шиной без консольных утилит. Развивается сообществом Kafbat (форк provectus/kafka-ui)",
      "homepage": "https://kafbat.io",
      "repo": "https://github.com/kafbat/kafka-ui",
      "start": [
        {
          "label": "Документация Kafbat UI",
          "url": "https://ui.docs.kafbat.io"
        }
      ],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "разработчик",
        "администратор",
        "аналитик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "кафка юай",
        "кафка уи",
        "kafka-ui",
        "кафбат",
        "kafbat"
      ],
      "depends": [
        "Kafka"
      ]
    },
    {
      "name": "Внешние источники данных",
      "added": "2026-06-12",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Механизм платформы для работы с внешними СУБД как с объектами конфигурации",
      "why": "Подключает таблицы Microsoft SQL Server, PostgreSQL, Oracle и других СУБД через ODBC — внешние данные доступны в запросах, отчетах на СКД и формах, как будто это справочники 1С",
      "homepage": "https://v8.1c.ru/platforma/vneshniy-istochnik-dannyh/",
      "repo": null,
      "start": [
        {
          "label": "Трюки с внешними источниками данных",
          "url": "https://infostart.ru/1c/articles/1019947/"
        },
        {
          "label": "База знаний Инфостарта по теме",
          "url": "https://infostart.ru/1c/integraciya_i_obmen_dannymi/vneshnie_istochniki_dannyh/"
        }
      ],
      "maturity": "продвинутое",
      "origin": "отечественное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "разработчик"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "aliases": [
        "вид",
        "внешние источники",
        "odbc",
        "одбц"
      ]
    }
  ]
};
