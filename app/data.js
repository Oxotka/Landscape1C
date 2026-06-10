// Данные ландшафта (Вариант B). Сгенерировано редактором разметки (editor.html).
window.LANDSCAPE = {
  "updated": "10 июня 2026",
  "categories": [
    "Прототипирование",
    "Моделирование и документация",
    "Разработка",
    "Плагины и библиотеки",
    "ИИ-ассистенты",
    "Системы хранения версий",
    "CI/CD",
    "Повышение качества",
    "Код-ревью",
    "Администрирование и инфраструктура",
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
        "Прототипирование",
        "Моделирование и документация"
      ]
    },
    {
      "name": "Разработка",
      "categories": [
        "Разработка",
        "Плагины и библиотеки",
        "ИИ-ассистенты",
        "Системы хранения версий",
        "CI/CD"
      ]
    },
    {
      "name": "Качество",
      "categories": [
        "Повышение качества",
        "Код-ревью"
      ]
    },
    {
      "name": "Инфраструктура и эксплуатация",
      "categories": [
        "Администрирование и инфраструктура",
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
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "1c.png",
      "description": "Основной язык разработки прикладных решений на платформе 1С.",
      "why": "Это основной язык разработки программиста 1С. Львиную часть работы делаем именно с помощью этого языка.",
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
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "1c.png",
      "description": "Язык выборки данных из базы 1С на основе SQL, с учетом специфики 1С.",
      "why": "Является составной частью платформы. Используется для запросов к базе данных.",
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
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "1c.png",
      "description": "Платформенный механизм для построения отчетов и сложной выборки данных без программирования.",
      "why": "Стандартный механизм 1С для создания отчетов: запрос, настройки, группировки и оформление описываются декларативно. Знать СКД обязан каждый разработчик и аналитик 1С.",
      "homepage": "https://v8.1c.ru/platforma/sistema-komponovki-dannyh-skd/",
      "repo": null,
      "start": [
        {
          "label": "Е. Ю. Хрусталева - Разработка сложных отчетов в 1С:Предприятии 8. Система компоновки данных",
          "url": "https://its.1c.ru/db/pubskd"
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
      "depends": [
        "Язык запросов"
      ],
      "aliases": [
        "скд",
        "skd",
        "компоновка данных",
        "система компоновки"
      ]
    },
    {
      "name": "Платформа для мобильных устройств",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "1c.png",
      "description": "Разработка мобильных приложений на языке 1С под iOS и Android.",
      "why": "Используется для разработки мобильных приложений на языке 1С. На выходе мы получаем полноценное приложение в AppStore или GooglePlay, используя только знания платформы 1С. Дополнительных знаний практически не требуется.",
      "homepage": "https://mobile.1c.ru",
      "repo": null,
      "start": [
        {
          "label": "Е. Ю. Хрусталева - Знакомство с разработкой мобильных приложений на платформе 1С:Предприятие 8",
          "url": "https://v8.1c.ru/metod/books/42725.htm"
        },
        {
          "label": "О мобильной платформе 1С",
          "url": "https://habr.com/ru/company/1c/blog/283198/"
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
        "проекты"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия"
      ],
      "aliases": [
        "мобильная платформа",
        "мобильное приложение 1с",
        "мобильный клиент"
      ]
    },
    {
      "name": "1С:Предприятие.Элемент",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "element.svg",
      "description": "Технология 1С для веб- и консьюмерских приложений.",
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
      "name": "1C:Предприятие.Элемент Скрипт. (бывший 1С:Исполнитель)",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "ispolnitel.png",
      "description": "Среда выполнения скриптов на языке 1С:Элемент (бывший 1С:Исполнитель).",
      "why": "Нужен для автоматизации рутинных задач и администрирования. Имеет преимущества перед традиционными командными интерпретаторами. Условный python или OneScript но с синтаксисом Элемента.",
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
      "depends": [
        "1С:Предприятие.Элемент"
      ],
      "aliases": [
        "элемент скрипт",
        "исполнитель",
        "element script",
        "1с исполнитель"
      ]
    },
    {
      "name": "OneScript",
      "category": "Разработка",
      "subcategory": "Языки программирования",
      "logo": "onescript.png",
      "description": "Кроссплатформенный движок языка 1С для скриптов без установки платформы.",
      "why": "Позволяет решать задачи автоматизации рутинных операций. Низкий порог входа, так как используется тот же синтаксис языка.",
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
      "category": "Разработка",
      "subcategory": "IDE",
      "logo": "1c.png",
      "description": "Классическая среда разработки в составе платформы 1С:Предприятие.",
      "why": "Используется для разработки и доработки конфигураций.",
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
      "analogs": [
        "1C:Enterprise Development Tools (EDT)",
        "Visual Studio Code (VSCode)"
      ],
      "depends": [
        "Хранилище"
      ],
      "aliases": [
        "configurator",
        "конфа",
        "конфигуратор 1с"
      ]
    },
    {
      "name": "1C:Enterprise Development Tools (EDT)",
      "category": "Разработка",
      "subcategory": "IDE",
      "logo": "1c.png",
      "description": "Современная среда разработки 1С на базе Eclipse.",
      "why": "Используется для разработки и доработки конфигураций.",
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
          "label": "Профессиональная разработка в 1С:EDT",
          "url": "https://курсы-по-1с.рф/courses/dev-edt-and-git/"
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
      "analogs": [
        "Конфигуратор",
        "Visual Studio Code (VSCode)"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "едт",
        "edt",
        "1с едт",
        "enterprise development tools"
      ]
    },
    {
      "name": "Visual Studio Code (VSCode)",
      "category": "Разработка",
      "subcategory": "IDE",
      "logo": "vscode.svg",
      "description": "Легкий кроссплатформенный редактор кода для около-1С разработки.",
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
      "analogs": [
        "Конфигуратор",
        "1C:Enterprise Development Tools (EDT)",
        "Cursor"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "вскод",
        "вс код",
        "вижуал студио код",
        "vs code",
        "вскоде"
      ]
    },
    {
      "name": "Библиотека стандартных подсистем (БСП)",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Набор готовых подсистем и стандартных механизмов от 1С — основа для разработки прикладных решений.",
      "why": "Базовая библиотека, на которой строятся типовые конфигурации 1С. Дает готовые механизмы (права, печать, обмен данными, версионирование) и единые стандарты, экономя время разработки.",
      "homepage": "https://its.1c.ru/db/bsp",
      "repo": null,
      "start": [
        {
          "label": "Библиотека стандартных подсистем на ИТС",
          "url": "https://its.1c.ru/db/bsp"
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
      "depends": [
        "Встроенный язык программирования 1С:Предприятия",
        "Стандарты разработки"
      ],
      "aliases": [
        "бсп",
        "bsp",
        "ssl",
        "стандартные подсистемы"
      ]
    },
    {
      "name": "TurboConf",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "turboconf.png",
      "description": "Расширение Конфигуратора, автоматизирующее рутину разработки.",
      "why": "Улучшает работу в Конфигураторе 1С.",
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
      "analogs": [
        "Плагин для конфигуратора PhoenixBSL"
      ],
      "depends": [
        "Конфигуратор"
      ],
      "aliases": [
        "турбоконф",
        "турбо конф",
        "turbo conf"
      ]
    },
    {
      "name": "Подсистема \"Инструменты разработчика\"",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "devtools.png",
      "description": "Набор внутренних инструментов разработчика: консоли запросов, кода, СКД.",
      "why": "Набор инструментов разработчика, который помогает в ежедневной работе.",
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
      "analogs": [
        "Подсистема \"Универсальные инструменты 1С для управляемых форм\"",
        "Infostart Toolkit"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия"
      ],
      "aliases": [
        "инструменты разработчика",
        "ир",
        "подсистема инструменты разработчика"
      ]
    },
    {
      "name": "Подсистема \"Универсальные инструменты 1С для управляемых форм\"",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "universal-tools.png",
      "description": "Набор инструментов разработчика для управляемых форм.",
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
      "analogs": [
        "Подсистема \"Инструменты разработчика\"",
        "Infostart Toolkit"
      ],
      "depends": [
        "Встроенный язык программирования 1С:Предприятия"
      ],
      "aliases": [
        "универсальные инструменты",
        "инструменты для управляемых форм"
      ]
    },
    {
      "name": "Infostart Toolkit",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "infostart-toolkit.png",
      "description": "Набор инструментов для анализа и обработки данных в базе 1С.",
      "why": "Набор инструментов разработчика, который помогает в ежедневной работе.",
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
      "analogs": [
        "Подсистема \"Инструменты разработчика\"",
        "Подсистема \"Универсальные инструменты 1С для управляемых форм\""
      ],
      "depends": [
        "Конфигуратор"
      ],
      "aliases": [
        "инфостарт тулкит",
        "infostart toolkit",
        "тулкит",
        "инфостарт"
      ]
    },
    {
      "name": "Плагин для конфигуратора PhoenixBSL",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "phoenixbsl.png",
      "description": "Анализ и форматирование кода 1С в Конфигураторе на базе BSL LS.",
      "why": "Быстрая проверка на соответствие стандарта кода в конфигураторе.",
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
      "analogs": [
        "TurboConf"
      ],
      "depends": [
        "Конфигуратор"
      ],
      "aliases": [
        "феникс",
        "phoenix",
        "phoenixbsl",
        "феникс бсл"
      ]
    },
    {
      "name": "Плагин 1С:Напарник",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "1c.png",
      "description": "ИИ-ассистент разработчика 1С: подсказки, исправления, комментарии.",
      "why": "- Повышение производительности Сокращает рутинные операции, освобождая время разработчиков для более сложных и интересных задач и повышая общую производительность разработки. - Улучшение качества кода Помогает разработчикам писать более качественный код, проверяя его на соответствие стандартам 1С и предлагая рекомендации по улучшению. - Интеграция в среду разработки Работает непосредственно в 1С:EDT, без необходимости переключения между окнами, что упрощает процесс разработки и экономит время. - Понимание контекста Напарник учитывает содержание конфигурации: метаданные, формы, пользовательские функции и процедуры, поэтому предоставляет более точные и полезные рекомендации.",
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
      "analogs": [
        "GigaCode",
        "GitHub Copilot"
      ],
      "depends": [
        "1C:Enterprise Development Tools (EDT)"
      ],
      "aliases": [
        "напарник",
        "1с напарник",
        "naparnik",
        "копилот 1с"
      ]
    },
    {
      "name": "GigaCode",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "gigacode.png",
      "description": "Российский ИИ-ассистент для написания кода от Сбера: автодополнение и генерация в IDE.",
      "why": "Подсказывает и генерирует код прямо в редакторе. Доступен в РФ, встроен в отечественные среды (в том числе в GitFlame) — рабочая альтернатива западным копайлотам без проблем с доступом.",
      "homepage": "https://gitverse.ru/features/gigacode/",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
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
      "analogs": [
        "Плагин 1С:Напарник",
        "GitHub Copilot"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ],
      "aliases": [
        "гигакод",
        "гига код",
        "giga code",
        "сбер gigacode"
      ]
    },
    {
      "name": "GitHub Copilot",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "github-copilot.svg",
      "logoInvert": true,
      "description": "Самый массовый ИИ-ассистент для написания кода прямо в редакторе.",
      "why": "Автодополнение и генерация кода в IDE на основе сильных моделей. С кодом на 1С и OneScript справляется уверенно, особенно когда видит контекст проекта. Доступ из РФ ограничен.",
      "homepage": "https://github.com/features/copilot",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
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
      "analogs": [
        "Плагин 1С:Напарник",
        "GigaCode"
      ],
      "depends": [
        "GitHub"
      ],
      "aliases": [
        "гитхаб копилот",
        "копилот",
        "copilot"
      ]
    },
    {
      "name": "Cursor",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "cursor.svg",
      "logoInvert": true,
      "description": "Редактор кода с ИИ-агентом: генерация и рефакторинг по всему проекту в диалоге.",
      "why": "Понимает проект целиком и вносит изменения по запросу на естественном языке. С задачами на 1С работает хорошо при достаточном контексте. Доступ из РФ ограничен.",
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
      "analogs": [
        "Visual Studio Code (VSCode)",
        "Claude Code",
        "Codex"
      ],
      "aliases": [
        "курсор",
        "cursor ai",
        "курсор ии"
      ]
    },
    {
      "name": "Claude Code",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "claude.svg",
      "description": "CLI-агент Anthropic: выполняет задачи разработки в терминале, читая и правя проект.",
      "why": "Работает в терминале как агент: разбирается в кодовой базе и вносит правки по задаче. Сильные модели уверенно ориентируются и в коде на 1С. Доступ из РФ ограничен.",
      "homepage": "https://www.anthropic.com/claude-code",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Cursor",
        "Codex"
      ],
      "aliases": [
        "клод код",
        "клауд код",
        "claude",
        "клод"
      ]
    },
    {
      "name": "Codex",
      "category": "ИИ-ассистенты",
      "subcategory": null,
      "logo": "openai.svg",
      "logoInvert": true,
      "description": "CLI-агент OpenAI для автоматизации задач разработки в терминале.",
      "why": "Агент, который выполняет задачи разработки в терминале и в облаке. Применим и к проектам на 1С и OneScript. Доступ из РФ ограничен.",
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
      "analogs": [
        "Cursor",
        "Claude Code"
      ],
      "aliases": [
        "кодекс",
        "openai codex",
        "кодекс openai"
      ]
    },
    {
      "name": "Плагин для VSCode «1C: Platform Tools»",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "vscode.svg",
      "description": "Расширение VSCode с инструментами разработки на платформе 1С.",
      "why": "Позволяет работать с около-1Сными проектами прямо в VSCode: запуск команд `vanessa-runner`, навигация по проектам, дерево метаданных, ER-диаграммы, отладка 1С и интеграция с AI-агентами через MCP — в одной панели.",
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
      "depends": [
        "Visual Studio Code (VSCode)"
      ],
      "aliases": [
        "platform tools",
        "платформ тулс",
        "1c platform tools"
      ]
    },
    {
      "name": "Плагины для 1С:EDT",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Официальные и сторонние плагины, расширяющие 1С:EDT.",
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
      "depends": [
        "1C:Enterprise Development Tools (EDT)"
      ],
      "aliases": [
        "плагины едт",
        "edt plugins",
        "плагины edt"
      ]
    },
    {
      "name": "Библиотеки для OneScript",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "oscript-library.png",
      "description": "Готовые библиотеки сообщества для экосистемы OneScript.",
      "why": "Не писать инфраструктуру с нуля: HTTP-клиенты, работа с JSON и архивами, CI-обвязка и тесты берутся готовыми пакетами.",
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
      "depends": [
        "OneScript"
      ],
      "aliases": [
        "библиотеки онскрипт",
        "oscript library",
        "oscript-library",
        "библиотеки oscript"
      ]
    },
    {
      "name": "Autumn (ОСень)",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "autumn.png",
      "description": "Фреймворк компонентных приложений для OneScript (DI/IoC).",
      "why": "Когда нужно быстро собрать приложение на OneScript, которое можно легко расширять и поддерживать. Особенно полезен, если проект состоит из множества взаимосвязанных модулей — Autumn сам организует их взаимодействие и избавит от лишней «склейки» кода.",
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
      "depends": [
        "OneScript"
      ],
      "aliases": [
        "осень",
        "autumn",
        "отумн"
      ]
    },
    {
      "name": "BSL Language Server",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "bsl-language-server.png",
      "description": "Языковой сервер для кода 1С (BSL): диагностики, автодополнение, форматирование.",
      "why": "Подсвечивает ошибки и нарушения стандартов прямо в VSCode и 1С:EDT; лежит в основе многих проверок качества кода 1С.",
      "homepage": "https://1c-syntax.github.io/bsl-language-server/",
      "repo": "https://github.com/1c-syntax/bsl-language-server",
      "start": [],
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
      "depends": [
        "Visual Studio Code (VSCode)",
        "1C:Enterprise Development Tools (EDT)"
      ],
      "aliases": [
        "бсл лс",
        "bsl ls",
        "bsl language server",
        "бсл сервер",
        "лангуэдж сервер"
      ]
    },
    {
      "name": "gitsync",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "oscript-library.png",
      "description": "Выгрузка истории Хранилища конфигурации 1С в git (и Mercurial).",
      "why": "Переносит коммиты из Хранилища 1С в git с сохранением авторов и комментариев — мост к нормальному версионированию.",
      "homepage": null,
      "repo": "https://github.com/oscript-library/gitsync",
      "start": [],
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
      "analogs": [
        "1С:ГитКонвертер"
      ],
      "depends": [
        "Хранилище",
        "git",
        "OneScript"
      ],
      "aliases": [
        "гитсинк",
        "гит синк",
        "git sync"
      ]
    },
    {
      "name": "1С:ГитКонвертер",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Односторонняя синхронизация хранилища конфигурации 1С с репозиторием Git и переход на разработку в 1С:EDT с сохранением истории.",
      "why": "Мост между классическим хранилищем 1С и git-процессом: переносит историю из хранилища в Git и позволяет перейти на разработку в 1С:EDT.",
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
        "инхаус"
      ],
      "analogs": [
        "gitsync"
      ],
      "depends": [
        "git",
        "Хранилище"
      ],
      "aliases": [
        "гитконвертер",
        "гит конвертер",
        "gitconverter",
        "git converter"
      ]
    },
    {
      "name": "Консоль запросов",
      "category": "Плагины и библиотеки",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Внешняя обработка для выполнения произвольных запросов на языке запросов 1С.",
      "why": "Главный инструмент ad-hoc анализа данных: посмотреть содержимое таблиц, проверить гипотезу по данным и отладить запрос отчета без доработки конфигурации.",
      "homepage": null,
      "repo": null,
      "start": [],
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
      "depends": [
        "Язык запросов"
      ],
      "aliases": [
        "консоль запросов",
        "query console"
      ]
    },
    {
      "name": "Файловая СУБД",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Встроенное в платформу файловое хранилище данных 1С.",
      "why": "Позволяет начать работу сразу из коробки и не тратить время на развертывание и администрирование базы данных.",
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
      ]
    },
    {
      "name": "PostgreSQL",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "postgresql.svg",
      "description": "Свободная СУБД; «1С» выпускает и поддерживает свою сборку PostgreSQL.",
      "why": "PostgreSQL - это бесплатная СУБД, которая в текущих реалиях является одной из самых рекомендуемых.",
      "homepage": "https://v8.1c.ru/platforma/postgresql/?",
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
        "инхаус"
      ],
      "analogs": [
        "Microsoft SQLServer",
        "Postgres Pro",
        "Oracle Database",
        "IBM Db2"
      ],
      "aliases": [
        "постгрес",
        "постгрескл",
        "постгре",
        "postgres",
        "пг"
      ]
    },
    {
      "name": "Microsoft SQLServer",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "sqlserver.svg",
      "description": "Проприетарная СУБД Microsoft с языком запросов Transact-SQL.",
      "why": "Исторически основная СУБД для серверных баз 1С на Windows; знание T-SQL помогает диагностировать и оптимизировать запросы под нагрузкой.",
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
          "label": "Microsoft SQL Server 2019 для поддержки системы \"1С:Предприятие 8\": администрирование, оптимизация, обеспечение безопасности",
          "url": "https://www.1c-uc3.ru/our-courses/all-courses/dlya-administratorov/ms/"
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
      "analogs": [
        "PostgreSQL",
        "Postgres Pro",
        "Oracle Database",
        "IBM Db2"
      ],
      "aliases": [
        "мс скуль",
        "ms sql",
        "sql server",
        "скуль сервер",
        "майкрософт sql"
      ]
    },
    {
      "name": "Postgres Pro",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "postgrespro.svg",
      "description": "Российская СУБД на базе PostgreSQL с поддержкой и сертификацией для 1С.",
      "why": "Отечественная замена PostgreSQL/MS SQL для продуктива 1С: входит в реестр ПО, оптимизирована под нагрузку 1С.",
      "homepage": "https://postgrespro.ru/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Oracle Database",
        "IBM Db2"
      ],
      "depends": [
        "PostgreSQL"
      ],
      "aliases": [
        "постгрес про",
        "постгрес pro",
        "postgrespro"
      ]
    },
    {
      "name": "Oracle Database",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "oracle.svg",
      "description": "Промышленная СУБД Oracle, поддерживаемая платформой 1С:Предприятие.",
      "why": "Используется как СУБД для крупных внедрений 1С, где исторически стоял Oracle.",
      "homepage": "https://www.oracle.com/database/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Postgres Pro",
        "IBM Db2"
      ],
      "aliases": [
        "оракл",
        "oracle",
        "оракл бд",
        "оракле"
      ]
    },
    {
      "name": "IBM Db2",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "ibm-db2.svg",
      "description": "СУБД IBM Db2, входящая в список поддерживаемых платформой 1С.",
      "why": "Один из поддерживаемых 1С серверов БД; встречается в редких корпоративных ландшафтах.",
      "homepage": "https://www.ibm.com/products/db2",
      "repo": null,
      "start": [],
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
      "analogs": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Postgres Pro",
        "Oracle Database"
      ],
      "aliases": [
        "дб2",
        "db2",
        "ибм db2",
        "айбиэм db2"
      ]
    },
    {
      "name": "Хранилище",
      "category": "Системы хранения версий",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Штатный механизм платформы для коллективной разработки конфигураций.",
      "why": "Используется для командной разработки, чтобы отслеживать версии кода. Используется при разработке в Конфигураторе.",
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
      "analogs": [
        "git"
      ],
      "aliases": [
        "хранилище конфигурации",
        "storage",
        "репозиторий 1с"
      ]
    },
    {
      "name": "git",
      "category": "Системы хранения версий",
      "subcategory": null,
      "logo": "git.svg",
      "description": "Распределенная система контроля версий — индустриальный стандарт.",
      "why": "Используется для командной разработки, чтобы отслеживать версии кода. Используется при разработке в 1C:EDT.",
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
      "analogs": [
        "Хранилище"
      ],
      "aliases": [
        "гит"
      ]
    },
    {
      "name": "GitLab",
      "category": "Системы хранения версий",
      "subcategory": null,
      "logo": "gitlab.svg",
      "description": "Платформа хостинга git-репозиториев с код-ревью и встроенным CI/CD.",
      "why": "Хранит репозитории проектов 1С, ведет merge request'ы и запускает пайплайны Gitlab CI.",
      "homepage": "https://about.gitlab.com/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "GitHub",
        "GitVerse",
        "Bitbucket"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "гитлаб",
        "гит лаб",
        "git lab"
      ]
    },
    {
      "name": "GitHub",
      "category": "Системы хранения версий",
      "subcategory": null,
      "logo": "github.svg",
      "logoInvert": true,
      "description": "Крупнейший хостинг git-репозиториев с pull request'ами и Actions.",
      "why": "Здесь живет большинство open-source проектов экосистемы 1С (OneScript, Vanessa, BSL LS).",
      "homepage": "https://github.com/",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "GitLab",
        "GitVerse",
        "Bitbucket"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "гитхаб",
        "гит хаб",
        "git hub"
      ]
    },
    {
      "name": "GitVerse",
      "category": "Системы хранения версий",
      "subcategory": null,
      "logo": "gitverse.png",
      "description": "Отечественная платформа хостинга git-репозиториев от SberTech.",
      "why": "Российская замена GitHub/GitLab для команд 1С: репозитории, код-ревью, CI и ИИ-ассистент GigaCode.",
      "homepage": "https://gitverse.ru/",
      "repo": null,
      "start": [],
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
        "продукты",
        "проекты"
      ],
      "analogs": [
        "GitLab",
        "GitHub",
        "Bitbucket"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "гитверс",
        "гит верс",
        "git verse",
        "сбер гитверс"
      ]
    },
    {
      "name": "Bitbucket",
      "category": "Системы хранения версий",
      "subcategory": null,
      "logo": "bitbucket.svg",
      "description": "Хостинг git-репозиториев от Atlassian с pull request'ами и интеграцией с Jira.",
      "why": "Хранит репозитории проектов 1С и связывает коммиты с задачами Jira; есть встроенный CI (Bitbucket Pipelines).",
      "homepage": "https://bitbucket.org/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "GitLab",
        "GitHub",
        "GitVerse"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "битбакет",
        "битбэкет",
        "bit bucket"
      ]
    },
    {
      "name": "Figma",
      "category": "Прототипирование",
      "subcategory": null,
      "logo": "figma.svg",
      "description": "Облачный редактор интерфейсов и кликабельных прототипов с совместной работой.",
      "why": "Проектирование макетов форм и пользовательских сценариев до реализации в 1С; аналитики и разработчики работают над прототипом совместно.",
      "homepage": "https://www.figma.com/",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
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
      "analogs": [
        "Mockplus"
      ],
      "aliases": [
        "фигма"
      ]
    },
    {
      "name": "Mockplus",
      "category": "Прототипирование",
      "subcategory": null,
      "logo": "mockplus.png",
      "description": "Инструмент быстрого прототипирования интерфейсов и кликабельных макетов.",
      "why": "Сборка прототипов экранов из готовых компонентов для согласования с заказчиком до разработки в 1С.",
      "homepage": "https://www.mockplus.com/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "analogs": [
        "Figma"
      ],
      "aliases": [
        "мокплюс",
        "мок плюс",
        "mock plus"
      ]
    },
    {
      "name": "Balsamiq",
      "category": "Прототипирование",
      "subcategory": null,
      "logo": "balsamiq.svg",
      "description": "Создание схематичных wireframe-макетов (mockups) интерфейсов.",
      "why": "Быстрые черновые наброски форм и экранов для обсуждения логики интерфейса будущего решения 1С.",
      "homepage": "https://balsamiq.com/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "аналитик"
      ],
      "contexts": [
        "продукты",
        "инхаус",
        "проекты"
      ],
      "analogs": [
        "MAKER-STUDIO",
        "Накидка"
      ],
      "aliases": [
        "балзамик",
        "бальзамик",
        "балсамик"
      ]
    },
    {
      "name": "MAKER-STUDIO",
      "category": "Прототипирование",
      "subcategory": null,
      "logo": "maker.webp",
      "description": "Онлайн-сервис прототипирования форм и моделирования бизнес-процессов.",
      "why": "Позволяет быстро создавать формы, организовать между ними связи и сделать кликабельный прототип. Проект можно дополнить наглядными диаграммами и текстовым описанием с поддержкой ролевых моделей GPT. В пару кликов генерирует готовое ТЗ из выбранных элементов.",
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
      "analogs": [
        "Balsamiq",
        "Накидка"
      ],
      "aliases": [
        "мейкер студио",
        "макер студио",
        "maker studio"
      ]
    },
    {
      "name": "Накидка",
      "category": "Прототипирование",
      "subcategory": null,
      "logo": "nakidka.png",
      "description": "Быстрое создание форм 1С по текстовому описанию (Markdown-синтаксис).",
      "why": "📌 Разработчикам Создание форм, соответствующих стандартам 1С и рекомендациям сообщества. Можно взять готовый код формы у аналитика. Автоматическая генерация кода программного создания реквизитов 📌 Аналитикам Быстрое создание прототипов с помощью Искусственного интеллекта. Привычный синтаксис Markdown. Наглядная визуализация будущего интерфейса на ранних этапах для согласования с заказчиком.",
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
      "analogs": [
        "Balsamiq",
        "MAKER-STUDIO"
      ],
      "aliases": [
        "накидка",
        "nakidka"
      ]
    },
    {
      "name": "1С:Тестировщик",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "1c.png",
      "description": "Инструмент 1С для автоматизации функционального тестирования.",
      "why": "Автоматизирует функциональное тестирование конфигураций при обновлениях.",
      "homepage": "https://v8.1c.ru/tekhnologii/tekhnologii-krupnykh-vnedreniy/korporativnyy-instrumentalnyy-paket/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "1С:Сценарное тестирование",
        "Vanessa-Automation",
        "Тестер"
      ],
      "aliases": [
        "тестировщик",
        "1с тестировщик"
      ]
    },
    {
      "name": "1С:Сценарное тестирование",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "1c.png",
      "description": "Проверка функциональности через сценарии без программирования.",
      "why": "Позволяет описывать и прогонять сценарные тесты решений 1С.",
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
      "analogs": [
        "1С:Тестировщик",
        "Vanessa-Automation",
        "Тестер"
      ],
      "aliases": [
        "сценарное тестирование",
        "сценарные тесты"
      ]
    },
    {
      "name": "Vanessa-Automation",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "vanessa.png",
      "description": "BDD-тестирование решений 1С на языке Gherkin.",
      "why": "Описывает и запускает сценарии на Gherkin, готовит инструкции и документацию.",
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
      "analogs": [
        "1С:Тестировщик",
        "1С:Сценарное тестирование",
        "Vanessa-ADD",
        "Тестер"
      ],
      "depends": [
        "Visual Studio Code (VSCode)"
      ],
      "aliases": [
        "ванесса",
        "ванесса автоматион",
        "ванесса автомейшн",
        "vanessa automation"
      ]
    },
    {
      "name": "Vanessa-ADD",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "vanessa.png",
      "description": "Набор инструментов автотестирования (предшественник Vanessa-Automation).",
      "why": "Ранний набор инструментов сценарного и поведенческого тестирования 1С.",
      "homepage": null,
      "repo": "https://github.com/vanessa-opensource/add",
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
        "инхаус",
        "продукты"
      ],
      "analogs": [
        "Vanessa-Automation"
      ],
      "depends": [
        "OneScript"
      ],
      "aliases": [
        "ванесса адд",
        "vanessa add",
        "ванесса add"
      ]
    },
    {
      "name": "Тестер",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": null,
      "description": "Бесплатный инструмент сценарного тестирования решений 1С 8.3.",
      "why": "Позволяет разрабатывать и запускать тесты, автоматизировать рутинные операции.",
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
      "analogs": [
        "1С:Тестировщик",
        "1С:Сценарное тестирование",
        "Vanessa-Automation"
      ],
      "aliases": [
        "тестер",
        "tester"
      ]
    },
    {
      "name": "YAxUnit",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "yaxunit.svg",
      "description": "Фреймворк юнит-тестирования решений на 1С:Предприятие 8.3.",
      "why": "Когда начинаете использовать тестирование, даже если не следуете TDD, то все равно начнете задаваться вопросом: \"а как я это буду тестировать?\". И как следствие, будете стараться следовать принципам SOLID, чтобы уменьшить зависимости, упростить методы, что облегчит тестирование. И это приводит к повышению качества кода. Также использую тесты, вы получаете возможность быстро проверить, что изменения кода, не ломают его. На YAxUnit возможно писать юнит, интеграционные и сценарные тесты.",
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
      "depends": [
        "Встроенный язык программирования 1С:Предприятия"
      ],
      "aliases": [
        "яксюнит",
        "яаксюнит",
        "yaxunit",
        "юнит тесты 1с"
      ]
    },
    {
      "name": "Coverage41C",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "coverage41c.png",
      "description": "Измерение покрытия кода 1С автотестами через протокол отладчика.",
      "why": "Показывает, какие строки кода реально проверяются тестами, а какие нет, — помогает находить непокрытые участки и оценивать качество тестовой базы. Результат выгружается в SonarQube.",
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
      "depends": [
        "SonarQube"
      ],
      "aliases": [
        "кавередж",
        "ковередж",
        "coverage",
        "покрытие кода",
        "coverage41c"
      ]
    },
    {
      "name": "ibcmdrunner",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "oscript-library.png",
      "description": "OneScript-обертка над утилитой ibcmd для управления информационной базой из скриптов.",
      "why": "Автоматизирует операции с базой (создание, выгрузка, загрузка, обновление) в CI и тестовых сценариях — без ручного запуска ibcmd.",
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
      "analogs": [
        "vanessa-runner"
      ],
      "depends": [
        "OneScript"
      ],
      "aliases": [
        "ибсмд раннер",
        "ibcmd runner",
        "ибцмд раннер"
      ]
    },
    {
      "name": "1testrunner",
      "category": "Повышение качества",
      "subcategory": "Автоматизированное тестирование",
      "logo": "oscript-library.png",
      "description": "Среда запуска юнит-тестов на OneScript.",
      "why": "Находит и прогоняет тесты, написанные на OneScript, и формирует отчет — основа автотестов для скриптовой части проектов 1С.",
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
      "analogs": [
        "vanessa-runner"
      ],
      "depends": [
        "OneScript"
      ],
      "aliases": [
        "тест раннер",
        "test runner",
        "1 test runner"
      ]
    },
    {
      "name": "Синтаксическая проверка конфигурации",
      "category": "Повышение качества",
      "subcategory": "Статический анализ кода",
      "logo": "1c.png",
      "description": "Встроенная в Конфигуратор и EDT проверка конфигурации.",
      "why": "Механизм проверки конфигурации позволяет выявить ошибки, которые не являются критичными для функционирования прикладного решения в принципе, но наличие которых может существенно снизить скорость работы прикладного решения или даже привести к возникновению ошибок при работе в некоторых специальных режимах.",
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
      "analogs": [
        "1С:Автоматизированная проверка конфигураций (АПК)",
        "SonarQube"
      ],
      "depends": [
        "Конфигуратор",
        "1C:Enterprise Development Tools (EDT)"
      ],
      "aliases": [
        "синтаксическая проверка",
        "проверка конфигурации",
        "syntax check"
      ]
    },
    {
      "name": "1С:Автоматизированная проверка конфигураций (АПК)",
      "category": "Повышение качества",
      "subcategory": "Статический анализ кода",
      "logo": "1c.png",
      "description": "Проверка конфигураций 1С на соответствие стандартам разработки.",
      "why": "Используется для проверки решений на соответствие стандартам. Обязательно применяется при сертификации 1С:Совместимо.",
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
      "analogs": [
        "Синтаксическая проверка конфигурации",
        "SonarQube"
      ],
      "depends": [
        "Стандарты разработки"
      ],
      "aliases": [
        "апк",
        "apk",
        "автоматизированная проверка"
      ]
    },
    {
      "name": "SonarQube",
      "category": "Повышение качества",
      "subcategory": "Статический анализ кода",
      "logo": "sonarqube.svg",
      "description": "Поддержка языка 1С и OneScript в платформе анализа качества SonarQube.",
      "why": "Используется для непрерывной оценки качества кода и управления техническим долгом.",
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
      "analogs": [
        "Синтаксическая проверка конфигурации",
        "1С:Автоматизированная проверка конфигураций (АПК)"
      ],
      "depends": [
        "git",
        "Coverage41C"
      ],
      "aliases": [
        "сонаркуб",
        "сонар",
        "сонаркьюб",
        "sonar",
        "сонар куб"
      ]
    },
    {
      "name": "1С:СППР",
      "category": "Задачи",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Проектирование прикладных решений и ведение проектной документации.",
      "why": "Ведет требования, архитектуру и проектную документацию решения в единой системе — основа управляемой разработки крупных внедрений.",
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
        "тестировщик"
      ],
      "contexts": [
        "продукты",
        "проекты",
        "инхаус"
      ],
      "analogs": [
        "Jira",
        "Яндекс Трекер",
        "YouTrack",
        "Redmine",
        "Битрикс24"
      ],
      "aliases": [
        "сппр",
        "sppr",
        "система проектирования"
      ]
    },
    {
      "name": "Стандарты разработки",
      "category": "Повышение качества",
      "subcategory": "Прочее",
      "logo": "1c.png",
      "description": "Система стандартов и методик разработки конфигураций 1С.",
      "why": "Система стандартов описывает как правильно писать код, чтобы он был качественный и производительный.",
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
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "crucible.svg",
      "description": "Инструмент рецензирования кода от Atlassian с интеграцией в репозитории.",
      "why": "Позволяет проводить структурированное ревью изменений: комментарии к строкам, обсуждения и отслеживание замечаний до их закрытия.",
      "homepage": "https://www.atlassian.com/software/crucible",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Review Board",
        "Collaborator"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "крусибл",
        "crucible"
      ]
    },
    {
      "name": "Review Board",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "reviewboard.png",
      "description": "Open-source платформа для код-ревью с поддержкой pre-commit и post-commit проверок.",
      "why": "Дает командное рецензирование изменений без привязки к конкретному хостингу репозиториев — обзоры можно вести и до коммита.",
      "homepage": "https://www.reviewboard.org",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Crucible",
        "Collaborator"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "ревью борд",
        "review board"
      ]
    },
    {
      "name": "Collaborator",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "collaborator.png",
      "description": "Инструмент рецензирования кода и документов от SmartBear для распределенных команд.",
      "why": "Поддерживает ревью не только кода, но и проектных документов, с настраиваемыми регламентами проверки и отчетностью.",
      "homepage": "https://smartbear.com/product/collaborator/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Crucible",
        "Review Board"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "коллаборатор",
        "collaborator"
      ]
    },
    {
      "name": "CodeRabbit",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "coderabbit.svg",
      "description": "ИИ-ревьюер пул-реквестов: автоматические замечания и резюме изменений.",
      "why": "Автоматически просматривает pull request'ы, оставляет осмысленные замечания по строкам и сводку изменений — ускоряет ревью и снимает рутину с рецензентов. Интегрируется с GitHub/GitLab. Доступ из РФ ограничен.",
      "homepage": "https://www.coderabbit.ai",
      "repo": null,
      "start": [],
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
      "analogs": [
        "ai-review"
      ],
      "depends": [
        "Gitlab CI",
        "GitHub Actions"
      ],
      "aliases": [
        "кодрэббит",
        "код рэббит",
        "code rabbit",
        "кодребит"
      ]
    },
    {
      "name": "ai-review",
      "category": "Код-ревью",
      "subcategory": null,
      "logo": "ai-review.png",
      "description": "Открытый ИИ-ревьюер кода: запускается в любой CI/CD с любым LLM-провайдером.",
      "why": "Гоняет ревью кода в любом пайплайне (GitHub Actions, GitLab CI, Jenkins) с любой моделью, включая локальные через Ollama/LM Studio — то есть работает и в закрытом контуре. Промпты — обычные markdown-файлы, поэтому правила легко адаптировать под стек 1С-команды.",
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
      "analogs": [
        "CodeRabbit"
      ],
      "depends": [
        "GitHub Actions",
        "Gitlab CI"
      ],
      "aliases": [
        "аи ревью",
        "ии ревью",
        "ai review"
      ]
    },
    {
      "name": "Jenkins",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "jenkins.svg",
      "description": "Сервер автоматизации сборок и CI/CD-пайплайнов.",
      "why": "Нужен для разворачивания системы непрерывной интеграции.",
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
      "analogs": [
        "Gitlab CI",
        "GitHub Actions",
        "Travis CI",
        "TeamCity"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "дженкинс",
        "женкинс",
        "jenkins"
      ]
    },
    {
      "name": "Gitlab CI",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "gitlab.svg",
      "description": "Встроенная в GitLab система непрерывной интеграции.",
      "why": "Для запуска тестов при каждой закладке в хранилище или репозиторий.",
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
      "analogs": [
        "Jenkins",
        "GitHub Actions",
        "Travis CI",
        "TeamCity"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "гитлаб ci",
        "гитлаб сиай",
        "gitlab ci"
      ]
    },
    {
      "name": "GitHub Actions",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "github-actions.svg",
      "description": "Встроенная в GitHub система CI/CD на основе workflow-файлов.",
      "why": "Запускает сборку, тесты и проверки кода 1С при каждом пуше в репозиторий на GitHub.",
      "homepage": "https://github.com/features/actions",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "Jenkins",
        "Gitlab CI",
        "Travis CI",
        "TeamCity"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "гитхаб экшнс",
        "github actions",
        "гитхаб actions"
      ]
    },
    {
      "name": "Travis CI",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "travis-ci.svg",
      "description": "Облачный сервис непрерывной интеграции с конфигом в .travis.yml.",
      "why": "Исторически популярный облачный CI; для 1С-проектов сейчас вытесняется GitHub Actions и GitLab CI.",
      "homepage": "https://www.travis-ci.com/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
      "availability": "доступен",
      "roles": [
        "администратор",
        "тестировщик",
        "разработчик"
      ],
      "contexts": [
        "продукты",
        "проекты"
      ],
      "analogs": [
        "Jenkins",
        "Gitlab CI",
        "GitHub Actions",
        "TeamCity"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "трэвис",
        "травис",
        "travis"
      ]
    },
    {
      "name": "vanessa-runner",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "vanessa.png",
      "description": "OneScript-оркестратор сборки, тестов и проверок 1С в CI.",
      "why": "Стандартный инструмент CI для 1С: создает и обновляет базы, запускает Vanessa-Automation, замеряет покрытие и выгружает конфигурацию — одной командой в пайплайне.",
      "homepage": null,
      "repo": "https://github.com/vanessa-opensource/vanessa-runner",
      "start": [],
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
      "analogs": [
        "ibcmdrunner",
        "1testrunner"
      ],
      "depends": [
        "OneScript",
        "Vanessa-Automation"
      ],
      "aliases": [
        "ванесса раннер",
        "vanessa runner",
        "ванесса runner"
      ]
    },
    {
      "name": "TeamCity",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "teamcity.svg",
      "description": "CI/CD-сервер JetBrains для сборок и автотестов.",
      "why": "Альтернатива Jenkins для пайплайнов 1С с удобным UI и готовыми раннерами.",
      "homepage": "https://www.jetbrains.com/teamcity/",
      "repo": null,
      "start": [],
      "maturity": "нишевое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "Jenkins",
        "Gitlab CI",
        "GitHub Actions",
        "Travis CI"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "тимсити",
        "тим сити",
        "team city"
      ]
    },
    {
      "name": "Ansible",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "ansible.svg",
      "description": "Система управления конфигурацией и автоматического развертывания.",
      "why": "Автоматизирует развертывание серверов 1С, СУБД и окружений без ручной настройки.",
      "homepage": "https://www.ansible.com/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Vagrant"
      ],
      "aliases": [
        "ансибл",
        "энсибл",
        "ansible"
      ]
    },
    {
      "name": "Vagrant",
      "category": "CI/CD",
      "subcategory": null,
      "logo": "vagrant.svg",
      "description": "Создание воспроизводимых виртуальных окружений для разработки.",
      "why": "Позволяет на локальной машине создавать легко управляемые виртуальные среды. То есть можно легко в них установить необходимые инструменты.",
      "homepage": "https://www.vagrantup.com",
      "repo": null,
      "start": [
        {
          "label": "Использование Vagrant и Ansible для разворачивания тестовой инфраструктуры",
          "url": "https://infostart.ru/1c/articles/1531329/"
        },
        {
          "label": "Использование Vagrant и Docker при разработке в 1С",
          "url": "https://infostart.ru/1c/articles/542836/"
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
      "availability": "доступен",
      "roles": [
        "администратор"
      ],
      "contexts": [
        "инхаус",
        "проекты"
      ],
      "analogs": [
        "Ansible"
      ],
      "aliases": [
        "вагрант",
        "vagrant"
      ]
    },
    {
      "name": "Docker",
      "category": "CI/CD",
      "subcategory": "Контейнеризация",
      "logo": "docker.svg",
      "description": "Контейнеризация приложений и окружений.",
      "why": "Позволяет разработчикам подготовить и запустить изолированные приложения со всеми зависимостями. Один раз подготовили контейнер со всем необходимым и дальше можете его использовать сколько угодно раз.",
      "homepage": "https://www.docker.com",
      "repo": null,
      "start": [
        {
          "label": "Полное практическое руководство по Docker",
          "url": "https://habr.com/ru/post/310460/"
        },
        {
          "label": "Использование Vagrant и Docker при разработке в 1С",
          "url": "https://infostart.ru/1c/articles/542836/"
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
        "продукты"
      ],
      "aliases": [
        "докер",
        "доккер",
        "doker"
      ]
    },
    {
      "name": "Allure",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": "allure.png",
      "description": "Наглядные отчеты о результатах автотестов.",
      "why": "Может показывать результаты тестов и различных проверок в красивом и аккуратном виде. Приятно посмотреть.",
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
      "analogs": [
        "Grafana"
      ],
      "aliases": [
        "аллюр",
        "алюр",
        "allure"
      ]
    },
    {
      "name": "1С:Конвертация данных",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Создание правил обмена между конфигурациями 1С.",
      "why": "Визуально описывает правила конвертации и обмена данными между системами.",
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
      "depends": [
        "EnterpriseData"
      ],
      "aliases": [
        "конвертация данных",
        "кд",
        "data conversion"
      ]
    },
    {
      "name": "EnterpriseData",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Универсальный формат обмена данными между системами.",
      "why": "Бизнес-ориентированный формат для обменов между 1С и внешними системами.",
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
      "category": "Интеграции",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Интеграционная шина предприятия (ESB) для обмена между системами.",
      "why": "Позволяет настраивать обмены сообщений между разными системами, причем по содержимому сообщений можно определить кто будет получателем.",
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
      "analogs": [
        "RabbitMQ",
        "Kafka"
      ],
      "aliases": [
        "шина",
        "1с шина",
        "esb",
        "сервисная шина"
      ]
    },
    {
      "name": "Открытый пакет интеграций",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "openintegration.svg",
      "description": "Набор модулей для интеграции 1С с популярными API.",
      "why": "Предназначено для легкой интеграции с существующими сервисами. Поставляется в виде расширения, проекта EDT, файлов конфигурации или других вариантов. После установки в конфигурации можем легко вызывать методы API сервисов не разрабатывая их самостоятельно",
      "homepage": "https://openintegrations.dev",
      "repo": "https://github.com/Bayselonarrend/OpenIntegrations",
      "start": [],
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
      ]
    },
    {
      "name": "Telegram бот",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "telegram.png",
      "description": "Автоматизация обмена сообщениями через ботов Telegram.",
      "why": "Для выполнения различных операций с помощью Telegram, начиная с интеграции с мессенджером или информированием о текущем состоянии фирмы и заканчивая ведением CRM.",
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
      ]
    },
    {
      "name": "Curlone",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "curl.svg",
      "logoInvert": true,
      "description": "Конвертер команд curl в код на языке 1С.",
      "why": "При разработке интеграций с внешними сервисами часто встречаешь в документации к `API` примеры запросов на `curl`. Данный сервис помогает конвертировать такой запрос в код 1С. Приложение написано на `OneScript`.",
      "homepage": "https://curlone.ru/",
      "repo": "https://github.com/alei1180/curlone",
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
      "category": "Интеграции",
      "subcategory": null,
      "logo": "rabbitmq.svg",
      "description": "Брокер сообщений для асинхронного обмена.",
      "why": "Очереди и маршрутизация сообщений между 1С и внешними системами по AMQP.",
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
      "analogs": [
        "1С:Шина",
        "Kafka"
      ],
      "aliases": [
        "рэббитмкью",
        "реббит",
        "кролик",
        "rabbit",
        "рэббит"
      ]
    },
    {
      "name": "Kafka",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "kafka.svg",
      "logoInvert": true,
      "description": "Потоковая платформа обмена сообщениями.",
      "why": "Высоконагруженный поток событий и интеграций для 1С и внешних систем.",
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
      "analogs": [
        "1С:Шина",
        "RabbitMQ"
      ],
      "aliases": [
        "кафка"
      ]
    },
    {
      "name": "Объектное хранилище S3",
      "category": "Интеграции",
      "subcategory": null,
      "logo": "s3.png",
      "description": "Стандарт API объектных хранилищ для выноса файлов из базы 1С.",
      "why": "Позволяет выносить присоединенные файлы и вложения из базы 1С во внешнее масштабируемое и отказоустойчивое хранилище. Это разгружает базу, упрощает резервное копирование и дает единую точку хранения файлов для разных систем.",
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
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "fiddler.png",
      "description": "Прокси-сниффер HTTP/HTTPS-трафика для отладки интеграций.",
      "why": "Показывает реальный HTTP/HTTPS-трафик между 1С и внешними сервисами — незаменим при разборе сбоев интеграций и веб-сервисов.",
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
        "проекты"
      ],
      "aliases": [
        "фиддлер",
        "фидлер",
        "fiddler"
      ]
    },
    {
      "name": "Bruno",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "bruno.svg",
      "description": "Локальный (offline-first) клиент API: запросы и секреты хранятся в файлах, а не в облаке.",
      "why": "Тестирование HTTP/REST-сервисов 1С с хранением коллекций в git рядом с кодом — без облачного аккаунта и синхронизации.",
      "homepage": "https://www.usebruno.com/",
      "repo": "https://github.com/usebruno/bruno",
      "start": [],
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
        "проекты"
      ],
      "analogs": [
        "Insomnia",
        "SoapUI",
        "Karate",
        "Postman"
      ],
      "aliases": [
        "бруно",
        "bruno"
      ]
    },
    {
      "name": "Insomnia",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "insomnia.svg",
      "description": "Десктоп-клиент для проектирования и тестирования REST/GraphQL/gRPC API.",
      "why": "Альтернатива Postman для ручного тестирования веб-сервисов 1С с удобным минималистичным UI.",
      "homepage": "https://insomnia.rest/",
      "repo": "https://github.com/Kong/insomnia",
      "start": [],
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
        "проекты"
      ],
      "analogs": [
        "Bruno",
        "SoapUI",
        "Karate",
        "Postman"
      ],
      "aliases": [
        "инсомния",
        "insomnia"
      ]
    },
    {
      "name": "SoapUI",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "soapui.png",
      "description": "Инструмент функционального и нагрузочного тестирования веб-сервисов (SOAP/REST).",
      "why": "Тестирование SOAP- и REST-сервисов 1С, включая сложные сценарии, проверки ответов и нагрузочные прогоны.",
      "homepage": "https://www.soapui.org/",
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
        "инхаус",
        "продукты",
        "проекты"
      ],
      "analogs": [
        "Bruno",
        "Insomnia",
        "Karate",
        "Postman"
      ],
      "aliases": [
        "соап юай",
        "soap ui",
        "соапюай"
      ]
    },
    {
      "name": "Karate",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "karate.svg",
      "description": "Фреймворк автотестов API с человекочитаемым синтаксисом на базе Gherkin.",
      "why": "Автоматизация тестирования HTTP-сервисов 1С декларативными сценариями — без написания кода на Java.",
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
        "проекты"
      ],
      "analogs": [
        "Bruno",
        "Insomnia",
        "SoapUI",
        "Postman"
      ],
      "aliases": [
        "карате",
        "karate"
      ]
    },
    {
      "name": "Postman",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "postman.svg",
      "description": "Инструмент ручного тестирования HTTP-запросов к API.",
      "why": "Быстрая ручная проверка HTTP- и REST-сервисов 1С: запросы, заголовки, авторизация и коллекции для регрессии без написания кода.",
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
        "тестировщик"
      ],
      "contexts": [
        "инхаус",
        "продукты",
        "проекты"
      ],
      "analogs": [
        "Bruno",
        "Insomnia",
        "SoapUI",
        "Karate"
      ],
      "aliases": [
        "постман",
        "postman"
      ]
    },
    {
      "name": "OpenAPI UI (ex. Swagger)",
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "swagger.svg",
      "description": "Интерактивная документация к REST API (бывший Swagger).",
      "why": "Наглядно описывает контракты REST-сервисов 1С и позволяет интеграторам пробовать запросы прямо из браузера.",
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
        }
      ],
      "maturity": "продвинутое",
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
        "проекты"
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
      "category": "API и веб-сервисы",
      "subcategory": null,
      "logo": "ngrok.svg",
      "logoInvert": true,
      "description": "Временный публичный URL к локальному серверу для отладки webhook-ов.",
      "why": "Открывает локальную базу 1С наружу по временному HTTPS-адресу — удобно тестировать вебхуки и интеграции без публикации на белый IP.",
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
        "проекты"
      ],
      "aliases": [
        "нгрок",
        "энгрок",
        "ngrok"
      ]
    },
    {
      "name": "1С:Аналитика",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "1c.png",
      "description": "BI-система 1С для работы с аналитическими данными.",
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
          "url": "https://v8.1c.ru/metod/books/135703.htm"
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
      "analogs": [
        "Microsoft Power BI",
        "Yandex DataLens",
        "Visiology"
      ],
      "aliases": [
        "аналитика 1с",
        "1с аналитика"
      ]
    },
    {
      "name": "Microsoft Power BI",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "powerbi.svg",
      "description": "BI-платформа Microsoft для визуализации и анализа данных.",
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
      "analogs": [
        "1С:Аналитика",
        "Yandex DataLens",
        "Visiology"
      ],
      "aliases": [
        "пауэр би",
        "повер би",
        "power bi",
        "пауэрби"
      ]
    },
    {
      "name": "Yandex DataLens",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "datalens.svg",
      "description": "Отечественная BI-платформа Яндекса для дашбордов и аналитики.",
      "why": "Строит дашборды поверх данных 1С (через выгрузку или витрину) — российская замена Power BI.",
      "homepage": "https://datalens.yandex.ru/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "1С:Аналитика",
        "Microsoft Power BI",
        "Visiology"
      ],
      "aliases": [
        "яндекс даталенс",
        "даталенс",
        "datalens",
        "data lens"
      ]
    },
    {
      "name": "Visiology",
      "category": "BI-системы",
      "subcategory": null,
      "logo": "visiology.svg",
      "description": "Российская BI-платформа для корпоративной аналитики и дашбордов.",
      "why": "Отечественная BI из реестра ПО — визуализация показателей поверх данных 1С.",
      "homepage": "https://visiology.su/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "1С:Аналитика",
        "Microsoft Power BI",
        "Yandex DataLens"
      ],
      "aliases": [
        "визиолоджи",
        "визиология",
        "visiology"
      ]
    },
    {
      "name": "RAC/RAS",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Серверная утилита (ras) и консольный клиент (rac) администрирования кластера 1С.",
      "why": "Управление кластером, сеансами и информационными базами из командной строки — основа автоматизации администрирования и скриптов обслуживания.",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000484",
      "repo": null,
      "start": [],
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
      "analogs": [
        "ibcmd",
        "Консоль администрирования серверов 1С"
      ],
      "depends": [
        "Кластер серверов 1С:Предприятие"
      ],
      "aliases": [
        "рак рас",
        "rac ras",
        "рак/рас"
      ]
    },
    {
      "name": "ibcmd",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Консольная утилита управления информационными базами 1С (создание, обновление, выгрузка).",
      "why": "Позволяет работать с ИБ без кластера: разворачивать, обновлять конфигурацию и выгружать/загружать данные из CLI в пайплайнах.",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000559",
      "repo": null,
      "start": [],
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
      "analogs": [
        "RAC/RAS"
      ],
      "depends": [
        "Кластер серверов 1С:Предприятие"
      ],
      "aliases": [
        "ибсмд",
        "ibcmd",
        "ибцмд"
      ]
    },
    {
      "name": "Консоль администрирования серверов 1С",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Графическая консоль (MMC) управления кластером серверов 1С:Предприятие.",
      "why": "Привычный GUI для администрирования кластера: рабочие серверы, сеансы, информационные базы, регламентные задания.",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000186",
      "repo": null,
      "start": [],
      "maturity": "базовое",
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
      "analogs": [
        "RAC/RAS"
      ],
      "depends": [
        "Кластер серверов 1С:Предприятие",
        "1С:Эксперт по технологическим вопросам"
      ],
      "aliases": [
        "консоль администрирования",
        "консоль кластера",
        "admin console"
      ]
    },
    {
      "name": "Apache HTTP Server",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "apache.svg",
      "description": "Веб-сервер для публикации веб-клиента и HTTP/REST-сервисов 1С.",
      "why": "Классический вариант публикации базы 1С: веб-клиент, веб-сервисы и HTTP-сервисы доступны по сети.",
      "homepage": "https://httpd.apache.org/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "nginx"
      ],
      "aliases": [
        "апач",
        "apache",
        "апаче",
        "httpd"
      ]
    },
    {
      "name": "nginx",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "nginx.svg",
      "description": "Высокопроизводительный веб-сервер и обратный прокси для публикации 1С.",
      "why": "Обратный прокси и балансировщик перед серверами 1С: HTTPS, кэширование статики, маршрутизация веб- и HTTP-сервисов.",
      "homepage": "https://nginx.org/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Apache HTTP Server"
      ],
      "aliases": [
        "нгинкс",
        "энджиникс",
        "нжинкс",
        "nginx"
      ]
    },
    {
      "name": "Кластер серверов 1С:Предприятие",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Объединение рабочих серверов 1С для обслуживания нагрузки.",
      "why": "Обеспечивает масштабируемость (наращивание оборудования под нагрузку), отказоустойчивость и балансировку нагрузки между серверами. Понимание устройства кластера важно при работе с серверным вариантом 1С и при администрировании крупных внедрений.",
      "homepage": "https://habr.com/ru/companies/1c/articles/493008/",
      "repo": null,
      "start": [],
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
      "depends": [
        "PostgreSQL",
        "Microsoft SQLServer",
        "Postgres Pro",
        "Oracle Database",
        "IBM Db2"
      ],
      "aliases": [
        "кластер серверов",
        "кластер 1с",
        "сервер 1с",
        "server cluster"
      ]
    },
    {
      "name": "OneSwiss",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "oneswiss.png",
      "description": "Кроссплатформенный комплекс обслуживания и мониторинга баз 1С.",
      "why": "Автоматизирует регламентное обслуживание баз и упрощает работу администратора: блокировка соединений, загрузка конфигураций и расширений, запуск внешних обработок и скриптов по шаблонам в виде блок-схем.",
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
      "analogs": [
        "Elasticsearch",
        "ClickHouse"
      ],
      "aliases": [
        "вансвисс",
        "уан свисс",
        "one swiss",
        "онсвисс"
      ]
    },
    {
      "name": "draw.io (diagrams.net)",
      "category": "Моделирование и документация",
      "subcategory": null,
      "logo": "drawio.svg",
      "description": "Бесплатный редактор диаграмм и схем: блок-схемы, BPMN, ER, архитектура.",
      "why": "Моделирование бизнес-процессов и схем интеграций для ТЗ и согласований; работает в браузере и десктопе, экспорт в проектную документацию.",
      "homepage": "https://www.drawio.com/",
      "repo": "https://github.com/jgraph/drawio",
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "open-source",
      "availability": "доступен",
      "roles": [
        "аналитик"
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
      "category": "Моделирование и документация",
      "subcategory": null,
      "logo": "confluence.svg",
      "description": "Корпоративная база знаний и пространство проектной документации от Atlassian.",
      "why": "Хранит ТЗ, регламенты, протоколы встреч и базу знаний проекта 1С; тесно связан с задачами Jira.",
      "homepage": "https://www.atlassian.com/software/confluence",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "Teamly",
        "Wiki репозитория"
      ],
      "aliases": [
        "конфлюенс",
        "конфлюэнс",
        "confluence"
      ]
    },
    {
      "name": "Teamly",
      "category": "Моделирование и документация",
      "subcategory": null,
      "logo": "teamly.svg",
      "description": "Отечественная платформа базы знаний и совместной работы с документами.",
      "why": "Российская замена Confluence: ТЗ, регламенты и база знаний команды 1С в ПО из реестра.",
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
      "analogs": [
        "Confluence",
        "Wiki репозитория"
      ],
      "aliases": [
        "тимли",
        "teamly"
      ]
    },
    {
      "name": "Wiki репозитория",
      "category": "Моделирование и документация",
      "subcategory": null,
      "logo": "wiki.svg",
      "logoInvert": true,
      "description": "Встроенная вики git-хостинга: статьи в Markdown рядом с кодом, без отдельного сервиса.",
      "why": "Базовый способ вести проектную документацию команды, когда не нужен отдельный Confluence: вики GitLab/GitHub/GitVerse хранится в git и правится в Markdown.",
      "homepage": null,
      "repo": null,
      "start": [],
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
      "analogs": [
        "Confluence",
        "Teamly"
      ],
      "depends": [
        "git"
      ],
      "aliases": [
        "вики",
        "wiki",
        "вики репозитория",
        "репозиторий вики"
      ]
    },
    {
      "name": "1С:Профессионал",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Базовый экзамен на знание платформы и типовых конфигураций 1С.",
      "why": "Подтверждает базовый уровень владения платформой — стартовая ступень для разработчика и консультанта 1С, частое требование вакансий.",
      "homepage": null,
      "repo": null,
      "start": [],
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
      "analogs": [
        "1С:Специалист‑консультант",
        "1С:Специалист",
        "1С:Эксперт по технологическим вопросам",
        "1С:Эксплуататор"
      ],
      "aliases": [
        "профессионал",
        "проф",
        "сертификат профессионал"
      ]
    },
    {
      "name": "1С:Специалист‑консультант",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамены по внедрению и сопровождению прикладных решений.",
      "why": "Подтверждает компетенции по внедрению и сопровождению типовых решений — ценится у франчайзи и на проектах внедрения.",
      "homepage": null,
      "repo": null,
      "start": [],
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
        "продукты",
        "проекты"
      ],
      "analogs": [
        "1С:Профессионал",
        "1С:Специалист",
        "1С:Эксперт по технологическим вопросам",
        "1С:Эксплуататор"
      ],
      "aliases": [
        "специалист консультант",
        "спец консультант"
      ]
    },
    {
      "name": "1С:Специалист",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамен на умение решать практические задачи в конфигурациях.",
      "why": "Подтверждает умение дорабатывать конфигурации под задачи бизнеса — ключевая сертификация для разработчика 1С.",
      "homepage": null,
      "repo": null,
      "start": [],
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
        "проекты"
      ],
      "analogs": [
        "1С:Профессионал",
        "1С:Специалист‑консультант",
        "1С:Эксперт по технологическим вопросам",
        "1С:Эксплуататор"
      ],
      "aliases": [
        "специалист",
        "сертификат специалист"
      ]
    },
    {
      "name": "1С:Эксперт по технологическим вопросам",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамен по оптимизации и нестандартным техническим решениям.",
      "why": "Высшая техническая сертификация: оптимизация производительности и решение сложных нагрузочных задач в крупных системах.",
      "homepage": null,
      "repo": null,
      "start": [],
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
      "analogs": [
        "1С:Профессионал",
        "1С:Специалист‑консультант",
        "1С:Специалист",
        "1С:Эксплуататор"
      ],
      "depends": [
        "1С:Эксплуататор",
        "Консоль администрирования серверов 1С"
      ],
      "aliases": [
        "эксперт",
        "эксперт по технологическим вопросам",
        "1с эксперт"
      ]
    },
    {
      "name": "1С:Эксплуататор",
      "category": "Сертификация",
      "subcategory": "Сертификация от 1С",
      "logo": "1c.png",
      "description": "Экзамен по настройке и поддержке крупных систем на базе 1С.",
      "why": "Подтверждает навыки администрирования и поддержки высоконагруженных систем 1С — для админов и DevOps крупных внедрений.",
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
      "analogs": [
        "1С:Профессионал",
        "1С:Специалист‑консультант",
        "1С:Специалист",
        "1С:Эксперт по технологическим вопросам"
      ],
      "depends": [
        "1С:Эксперт по технологическим вопросам"
      ],
      "aliases": [
        "эксплуататор",
        "1с эксплуататор"
      ]
    },
    {
      "name": "Сертификация от 1С-ТестЦентр",
      "category": "Сертификация",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Онлайн-тестирование знаний и навыков специалистов 1С.",
      "why": "Независимая онлайн-проверка знаний 1С-разработчиков для соискателей и сотрудников. После прохождения теста сервис подготовит относительно подробное заключение о квалификации претендента, и на основании этого присвоит ему соответствующий грейд в зависимости от набранных баллов.",
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
        "проекты"
      ],
      "analogs": [
        "Сертификация от Госуслуг"
      ],
      "aliases": [
        "тестцентр",
        "тест центр",
        "сертификация 1с"
      ]
    },
    {
      "name": "Сертификация от Госуслуг",
      "category": "Сертификация",
      "subcategory": null,
      "logo": "gosuslugi.svg",
      "description": "Подтверждение ИТ-компетенций сертификатом на Госуслугах.",
      "why": "Независимая онлайн-проверка знаний IT-компетенций, с сертификатом от Минцифры. Привлечение внимания к резюме. Выше шансы на трудоустройство. Хранение в одном месте и постоянный доступ.",
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
        "проекты"
      ],
      "analogs": [
        "Сертификация от 1С-ТестЦентр"
      ],
      "aliases": [
        "госуслуги",
        "сертификация госуслуги",
        "gosuslugi"
      ]
    },
    {
      "name": "Zabbix",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": "zabbix.svg",
      "description": "Мониторинг серверов, сервисов и инфраструктуры 1С.",
      "why": "Следит за доступностью и нагрузкой серверов 1С, шлет алерты при проблемах.",
      "homepage": "https://www.zabbix.com/",
      "repo": "https://github.com/zabbix/zabbix",
      "start": [],
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
      "analogs": [
        "Prometheus"
      ],
      "aliases": [
        "заббикс",
        "забикс",
        "zabbix"
      ]
    },
    {
      "name": "Grafana",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": "grafana.svg",
      "description": "Дашборды и визуализация метрик из разных источников.",
      "why": "Собирает метрики 1С и инфраструктуры в наглядные дашборды.",
      "homepage": "https://grafana.com/",
      "repo": "https://github.com/grafana/grafana",
      "start": [],
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
      "analogs": [
        "Allure"
      ],
      "depends": [
        "Prometheus",
        "ClickHouse"
      ],
      "aliases": [
        "графана",
        "grafana"
      ]
    },
    {
      "name": "Prometheus",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": "prometheus.svg",
      "description": "Сбор и хранение метрик с алертингом.",
      "why": "Собирает метрики серверов и сервисов 1С, питает Grafana и алерты.",
      "homepage": "https://prometheus.io/",
      "repo": "https://github.com/prometheus/prometheus",
      "start": [],
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
      "analogs": [
        "Zabbix"
      ],
      "aliases": [
        "прометей",
        "прометеус",
        "prometheus"
      ]
    },
    {
      "name": "1С:КИП (Корпоративный инструментальный пакет)",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Пакет инструментов 1С для контроля и оптимизации производительности крупных внедрений.",
      "why": "Включает Центр контроля качества, Тест-центр и инструменты анализа — основа методики мониторинга и нагрузочного тестирования по стандартам 1С.",
      "homepage": "https://its.1c.ru/db/kip",
      "repo": null,
      "start": [],
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
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Система автоматического мониторинга производительности и качества работы баз 1С.",
      "why": "Регулярно собирает показатели (APDEX, ошибки, регламент) и сигнализирует о деградации производительности продуктивных систем.",
      "homepage": "https://its.1c.ru/db/kip#content:171:hdoc",
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
      "analogs": [
        "1С:Анализатор"
      ],
      "depends": [
        "1С:КИП (Корпоративный инструментальный пакет)",
        "APDEX"
      ],
      "aliases": [
        "цкк",
        "ckk",
        "центр контроля качества"
      ]
    },
    {
      "name": "1С:Тест-центр",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Инструмент автоматизации многопользовательского нагрузочного тестирования 1С.",
      "why": "Эмулирует работу сотен пользователей для оценки производительности системы под нагрузкой до вывода в продуктив.",
      "homepage": "https://its.1c.ru/db/kip#content:151:hdoc",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Тест Гилева (TPC-1C)"
      ],
      "depends": [
        "1С:КИП (Корпоративный инструментальный пакет)"
      ],
      "aliases": [
        "тест центр",
        "тест-центр",
        "test center"
      ]
    },
    {
      "name": "1С:Анализатор",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Инструмент анализа нагрузки и технологического журнала 1С.",
      "why": "Автоматически разбирает техжурнал и счетчики, находит узкие места и проблемные запросы без ручного парсинга логов.",
      "homepage": "https://analyzer.1c.ru/",
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
      "analogs": [
        "1С:ЦКК (Центр контроля качества)",
        "Анализ технологического журнала"
      ],
      "depends": [
        "Анализ технологического журнала"
      ],
      "aliases": [
        "анализатор",
        "1с анализатор"
      ]
    },
    {
      "name": "APDEX",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "apdex.png",
      "description": "Методика числовой оценки удовлетворенности пользователей временем отклика.",
      "why": "Единая метрика производительности ключевых операций (0..1) — на ней строится мониторинг и SLA по скорости работы 1С.",
      "homepage": "https://its.1c.ru/db/metod8dev#content:5847:hdoc",
      "repo": null,
      "start": [],
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
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": "1c.png",
      "description": "Сбор и разбор технологического журнала платформы для поиска проблем производительности.",
      "why": "Техжурнал фиксирует события платформы (блокировки, длительные запросы, ошибки); его анализ — ключ к расследованию инцидентов производительности.",
      "homepage": "https://its.1c.ru/db/v8323doc#bookmark:adm:TI000000437",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
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
      "analogs": [
        "1С:Анализатор"
      ],
      "aliases": [
        "технологический журнал",
        "тж",
        "анализ тж",
        "techlog"
      ]
    },
    {
      "name": "Тест Гилева (TPC-1C)",
      "category": "Производительность и нагрузочное тестирование",
      "subcategory": null,
      "logo": null,
      "description": "Нагрузочный тест производительности связки «1С + СУБД + железо».",
      "why": "Быстрая оценка производительности системы в «попугаях» TPC-1C — точка отсчета при оптимизации.",
      "homepage": "https://gilev.ru/tpc1c/",
      "repo": null,
      "start": [],
      "maturity": "базовое",
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
      "analogs": [
        "1С:Тест-центр"
      ],
      "aliases": [
        "тест гилева",
        "гилев",
        "tpc-1c",
        "gilev"
      ]
    },
    {
      "name": "Elasticsearch",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "elasticsearch.svg",
      "description": "Поисковый движок для хранения и анализа логов.",
      "why": "Хранит и индексирует логи 1С для быстрого поиска и анализа.",
      "homepage": "https://www.elastic.co/elasticsearch",
      "repo": "https://github.com/elastic/elasticsearch",
      "start": [],
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
      "analogs": [
        "OneSwiss",
        "ClickHouse"
      ],
      "aliases": [
        "эластик",
        "эластиксерч",
        "elastic",
        "эластик серч"
      ]
    },
    {
      "name": "Kibana",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "kibana.svg",
      "description": "Визуализация и поиск по логам из Elasticsearch.",
      "why": "Веб-интерфейс для анализа логов 1С, хранящихся в Elasticsearch.",
      "homepage": "https://www.elastic.co/kibana",
      "repo": "https://github.com/elastic/kibana",
      "start": [],
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
      "depends": [
        "Elasticsearch"
      ],
      "aliases": [
        "кибана",
        "kibana"
      ]
    },
    {
      "name": "Logstash",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "logstash.svg",
      "description": "Сбор, преобразование и доставка логов.",
      "why": "Собирает логи 1С из разных источников и нормализует перед отправкой.",
      "homepage": "https://www.elastic.co/logstash",
      "repo": "https://github.com/elastic/logstash",
      "start": [],
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
      "depends": [
        "Elasticsearch"
      ],
      "aliases": [
        "логсташ",
        "лог сташ",
        "logstash"
      ]
    },
    {
      "name": "ClickHouse",
      "category": "Мониторинг",
      "subcategory": "Анализ логов",
      "logo": "clickhouse.svg",
      "description": "Колоночная СУБД для аналитики больших логов.",
      "why": "Быстро хранит и агрегирует огромные объемы логов и событий 1С.",
      "homepage": "https://clickhouse.com/",
      "repo": "https://github.com/ClickHouse/ClickHouse",
      "start": [],
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
      "analogs": [
        "OneSwiss",
        "Elasticsearch"
      ],
      "aliases": [
        "кликхаус",
        "клик хаус",
        "click house"
      ]
    },
    {
      "name": "Jira",
      "category": "Задачи",
      "subcategory": null,
      "logo": "jira.svg",
      "description": "Трекер задач и управление разработкой.",
      "why": "Ведет задачи, баги и спринты команды 1С-разработки.",
      "homepage": "https://www.atlassian.com/software/jira",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "1С:СППР",
        "Яндекс Трекер",
        "YouTrack",
        "Redmine",
        "Битрикс24"
      ],
      "aliases": [
        "джира",
        "жира",
        "jira"
      ]
    },
    {
      "name": "Trello",
      "category": "Задачи",
      "subcategory": null,
      "logo": "trello.svg",
      "description": "Канбан-доски для простого ведения задач.",
      "why": "Легкое управление задачами небольших команд и проектов на 1С.",
      "homepage": "https://trello.com/",
      "repo": null,
      "start": [],
      "maturity": "базовое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "Kaiten",
        "WEEEK"
      ],
      "aliases": [
        "трелло",
        "trello"
      ]
    },
    {
      "name": "Яндекс Трекер",
      "category": "Задачи",
      "subcategory": null,
      "logo": "yandex-tracker.svg",
      "description": "Облачный трекер задач и управление разработкой от Яндекса.",
      "why": "Ведет задачи, спринты и процессы команды 1С в отечественном облаке — импортозамещение Jira.",
      "homepage": "https://yandex.ru/tracker/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "1С:СППР",
        "Jira",
        "YouTrack",
        "Redmine",
        "Битрикс24"
      ],
      "aliases": [
        "яндекс трекер",
        "трекер",
        "yandex tracker"
      ]
    },
    {
      "name": "YouTrack",
      "category": "Задачи",
      "subcategory": null,
      "logo": "youtrack.png",
      "description": "Трекер задач и Agile-доски от JetBrains.",
      "why": "Ведет задачи и спринты команды 1С с гибкими запросами и автоматизацией.",
      "homepage": "https://www.jetbrains.com/youtrack/",
      "repo": null,
      "start": [],
      "maturity": "продвинутое",
      "origin": "зарубежное",
      "license": "проприетарное",
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
      "analogs": [
        "1С:СППР",
        "Jira",
        "Яндекс Трекер",
        "Redmine",
        "Битрикс24"
      ],
      "aliases": [
        "ютрек",
        "ю трек",
        "youtrack",
        "ютрэк"
      ]
    },
    {
      "name": "Redmine",
      "category": "Задачи",
      "subcategory": null,
      "logo": "redmine.svg",
      "description": "Open-source система ведения задач и проектов.",
      "why": "Бесплатный трекер задач и багов для небольших команд и франчайзи на 1С.",
      "homepage": "https://www.redmine.org/",
      "repo": null,
      "start": [],
      "maturity": "базовое",
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
      "analogs": [
        "1С:СППР",
        "Jira",
        "Яндекс Трекер",
        "YouTrack",
        "Битрикс24"
      ],
      "aliases": [
        "редмайн",
        "редмине",
        "redmine"
      ]
    },
    {
      "name": "Kaiten",
      "category": "Задачи",
      "subcategory": null,
      "logo": "kaiten.jpeg",
      "description": "Отечественный сервис канбан-досок и управления задачами.",
      "why": "Российская замена Trello/Jira для ведения задач команд 1С.",
      "homepage": "https://kaiten.ru/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Trello",
        "WEEEK"
      ],
      "aliases": [
        "кайтен",
        "kaiten"
      ]
    },
    {
      "name": "WEEEK",
      "category": "Задачи",
      "subcategory": null,
      "logo": "weeek.svg",
      "description": "Отечественный таск-менеджер с досками, спринтами и базой знаний.",
      "why": "Российский сервис управления задачами и проектами для команд 1С.",
      "homepage": "https://weeek.net/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "Trello",
        "Kaiten"
      ],
      "aliases": [
        "уик",
        "виик",
        "weeek"
      ]
    },
    {
      "name": "Битрикс24",
      "category": "Задачи",
      "subcategory": null,
      "logo": "bitrix24.svg",
      "description": "Отечественная платформа для совместной работы: задачи, проекты, CRM и коммуникации.",
      "why": "Российский корпоративный портал для ведения задач, проектов и общения команд 1С — часто внедряется вместе с 1С во франчайзи и инхаус.",
      "homepage": "https://www.bitrix24.ru/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "1С:СППР",
        "Jira",
        "Яндекс Трекер",
        "YouTrack",
        "Redmine"
      ],
      "aliases": [
        "битрикс",
        "bitrix",
        "битрикс24",
        "bitrix24",
        "б24"
      ]
    },
    {
      "name": "Kubernetes",
      "category": "CI/CD",
      "subcategory": "Контейнеризация",
      "logo": "kubernetes.svg",
      "description": "Оркестрация контейнеров для развертывания сервисов.",
      "why": "Управляет контейнерами вокруг 1С: масштабирование, обновления, отказоустойчивость.",
      "homepage": "https://kubernetes.io/",
      "repo": "https://github.com/kubernetes/kubernetes",
      "start": [],
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
      "depends": [
        "Docker"
      ],
      "aliases": [
        "кубернетес",
        "кубер",
        "к8с",
        "k8s",
        "kubernetes",
        "кубернетис"
      ]
    },
    {
      "name": "Caddy",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "caddy.svg",
      "description": "Современный веб-сервер и обратный прокси с автоматическим HTTPS для публикации 1С.",
      "why": "Простая публикация веб-клиента и сервисов 1С: обратный прокси с автоматическим выпуском TLS-сертификатов и лаконичным конфигом.",
      "homepage": "https://caddyserver.com/",
      "repo": "https://github.com/caddyserver/caddy",
      "start": [],
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
      "analogs": [
        "nginx",
        "Apache HTTP Server"
      ],
      "aliases": [
        "кэдди",
        "кади",
        "кеди",
        "caddy"
      ]
    },
    {
      "name": "ПУСК (Панель управления сервисами и компонентами)",
      "category": "Администрирование и инфраструктура",
      "subcategory": null,
      "logo": "pusk.svg",
      "description": "Кроссплатформенная веб-панель управления кластером серверов 1С через графический интерфейс.",
      "why": "Администрирование инфраструктуры 1С без командной строки: базы, сеансы, блокировки и рабочие процессы кластера в одном браузерном интерфейсе. Работает на Linux и Windows.",
      "homepage": "https://it-expertise.ru/pusk/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "RAC/RAS",
        "Консоль администрирования серверов 1С"
      ],
      "aliases": [
        "пуск",
        "панель управления 1с",
        "pusk",
        "ит-экспертиза"
      ]
    },
    {
      "name": "Tantor SE 1C",
      "category": "Системы управления базами данных (СУБД)",
      "subcategory": null,
      "logo": "tantor.svg",
      "description": "Российская СУБД на базе PostgreSQL, оптимизированная и одобренная для продуктов 1С.",
      "why": "Отечественная СУБД из реестра ПО для продуктива 1С: ядро PostgreSQL с собственными оптимизациями и встроенными средствами администрирования, тестируется на конфигурациях 1С.",
      "homepage": "https://tantorlabs.ru/tantor-se-1c",
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
      "analogs": [
        "PostgreSQL",
        "Postgres Pro",
        "Microsoft SQLServer"
      ],
      "depends": [
        "PostgreSQL"
      ],
      "aliases": [
        "тантор",
        "tantor",
        "тантор постгрес",
        "тантор лабс"
      ]
    },
    {
      "name": "Монитор (1smonitor)",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": "1smonitor.png",
      "description": "Инструмент мониторинга производительности баз и серверов 1С: запросы, блокировки, взаимоблокировки.",
      "why": "Анализ всех баз и серверов 1С одним инструментом: медленные запросы, ожидания на блокировках, взаимоблокировки и системные счетчики. Помогает администратору находить узкие места производительности.",
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
      "analogs": [
        "PerfExpert",
        "PerfDog",
        "Умный мониторинг"
      ],
      "aliases": [
        "монитор",
        "1смонитор",
        "1smonitor",
        "бурмистров"
      ],
      "logoInvert": true
    },
    {
      "name": "PerfDog",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": null,
      "description": "Онлайн-мониторинг и диагностика производительности высоконагруженных систем 1С.",
      "why": "Выделяет ресурсоемкие запросы и контролирует нагрузку на уровне СУБД, серверов 1С и контекста кода: расшифровка блокировок и взаимоблокировок, разбор технологического журнала в одном интерфейсе.",
      "homepage": "https://bia-tech.ru/solutions/perfdog-monitoring-1c",
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
      "analogs": [
        "PerfExpert",
        "Монитор (1smonitor)",
        "Умный мониторинг"
      ],
      "aliases": [
        "перфдог",
        "perfdog",
        "биатех",
        "bia technologies"
      ]
    },
    {
      "name": "PerfExpert",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": "perfexpert.png",
      "description": "Платформа мониторинга производительности высоконагруженных систем 1С и СУБД от SoftPoint.",
      "why": "Непрерывный контроль метрик производительности 1С и MS SQL/PostgreSQL: сбор трасс запросов, анализ блокировок и рекомендации по оптимизации индексов.",
      "homepage": "https://perfexpert.ru/",
      "repo": null,
      "start": [],
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
      "analogs": [
        "PerfDog",
        "Монитор (1smonitor)",
        "Умный мониторинг"
      ],
      "aliases": [
        "перфэксперт",
        "перфексперт",
        "perfexpert",
        "софтпоинт",
        "softpoint"
      ]
    },
    {
      "name": "Умный мониторинг",
      "category": "Мониторинг",
      "subcategory": null,
      "logo": "it-expertise.svg",
      "description": "Программный комплекс сбора и анализа технологических данных ИТ-инфраструктуры 1С.",
      "why": "Собирает и анализирует технологические данные, помогает оперативно реагировать на инциденты и прогнозировать производительность с применением ML. От разработчиков ПУСК (ИТ-Экспертиза).",
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
      "analogs": [
        "PerfDog",
        "PerfExpert",
        "Монитор (1smonitor)"
      ],
      "aliases": [
        "умный мониторинг",
        "ит-экспертиза мониторинг",
        "it-expertise"
      ]
    }
  ]
};
