// Данные ландшафта (Вариант B). Конвертированы из data/landscape.yml.
// Глобальный объект, чтобы работать и через file://, и на GitHub Pages без fetch.
// logo — имя файла в app/logos/ (если нет — карточка покажет заглушку).
// start — «с чего начать» (ссылки иллюстративные, при наполнении реальными данными сверять).
window.LANDSCAPE = {
  categories: ["IDE", "CI/CD", "Системы хранения версий"],
  axes: {
    role: { label: "Роль", values: ["разработчик", "devops", "тестировщик", "аналитик", "администратор"] },
    context: { label: "Контекст работы", values: ["франчайзи", "инхаус", "продукты", "проекты", "фриланс"] },
    maturity: { label: "Зрелость", values: ["базовое", "продвинутое", "нишевое", "устаревает"] },
    origin: { label: "Происхождение", values: ["отечественное", "зарубежное"] },
    license: { label: "Лицензия", values: ["open-source", "проприетарное", "бесплатное"] }
  },
  items: [
    {
      name: "Конфигуратор", category: "IDE", subcategory: "Среды разработки", logo: null,
      description: "Классическая среда разработки, входящая в состав платформы 1С:Предприятие.",
      why: "Базовая среда, с которой начинает почти каждый разработчик 1С.",
      homepage: "https://v8.1c.ru/platforma/",
      start: [{ label: "Учебный центр 1С", url: "https://uc1.1c.ru" }],
      maturity: "базовое", origin: "отечественное", license: "проприетарное",
      roles: ["разработчик"], contexts: ["франчайзи", "инхаус", "продукты", "проекты", "фриланс"]
    },
    {
      name: "1C:Enterprise Development Tools (EDT)", category: "IDE", subcategory: "Среды разработки", logo: null,
      description: "Современная среда разработки 1С на базе Eclipse.",
      why: "Современный инструментарий, git-ориентированная разработка, рефакторинг.",
      homepage: "https://edt.1c.ru",
      start: [{ label: "Документация 1C:EDT", url: "https://its.1c.ru/db/edtdoc" }],
      maturity: "продвинутое", origin: "отечественное", license: "проприетарное",
      roles: ["разработчик"], contexts: ["инхаус", "продукты", "проекты"]
    },
    {
      name: "Visual Studio Code (VSCode)", category: "IDE", subcategory: "Среды разработки", logo: null,
      description: "Лёгкий кроссплатформенный редактор кода для около-1С технологий.",
      why: "Удобен для OneScript, Vanessa и просмотра модулей; много расширений.",
      homepage: "https://code.visualstudio.com",
      start: [{ label: "Документация VS Code", url: "https://code.visualstudio.com/docs" }],
      maturity: "продвинутое", origin: "зарубежное", license: "open-source",
      roles: ["разработчик", "devops"], contexts: ["продукты", "инхаус", "фриланс"]
    },
    {
      name: "Jenkins", category: "CI/CD", subcategory: "Сборка и доставка", logo: "jenkins.svg",
      description: "Сервер автоматизации сборок и пайплайнов.",
      why: "Классика CI для сборки и прогона тестов 1С.",
      homepage: "https://www.jenkins.io", repo: "https://github.com/jenkinsci/jenkins",
      start: [{ label: "Документация Jenkins", url: "https://www.jenkins.io/doc/" }],
      maturity: "продвинутое", origin: "зарубежное", license: "open-source",
      roles: ["devops"], contexts: ["продукты", "инхаус"]
    },
    {
      name: "GitLab CI", category: "CI/CD", subcategory: "Сборка и доставка", logo: "gitlab.svg",
      description: "Встроенная в GitLab система непрерывной интеграции.",
      why: "CI/CD рядом с репозиторием, без отдельного сервера сборки.",
      homepage: "https://docs.gitlab.com/ee/ci/",
      start: [{ label: "GitLab CI — Quick start", url: "https://docs.gitlab.com/ee/ci/" }],
      maturity: "продвинутое", origin: "зарубежное", license: "open-source",
      roles: ["devops"], contexts: ["продукты", "инхаус"]
    },
    {
      name: "Vagrant", category: "CI/CD", subcategory: "Сборка и доставка", logo: "vagrant.svg",
      description: "Инструмент управления воспроизводимыми виртуальными окружениями.",
      why: "Быстрое поднятие одинаковых тестовых стендов 1С.",
      homepage: "https://www.vagrantup.com", repo: "https://github.com/hashicorp/vagrant",
      start: [{ label: "Vagrant — Tutorials", url: "https://developer.hashicorp.com/vagrant/tutorials" }],
      maturity: "нишевое", origin: "зарубежное", license: "open-source",
      roles: ["devops"], contexts: ["продукты", "инхаус"]
    },
    {
      name: "Docker", category: "CI/CD", subcategory: "Сборка и доставка", logo: "docker.svg",
      description: "Платформа контейнеризации приложений и окружений.",
      why: "Изолированные окружения для сборки, тестов и сервисов вокруг 1С.",
      homepage: "https://www.docker.com", repo: "https://github.com/moby/moby",
      start: [{ label: "Docker — Get started", url: "https://docs.docker.com/get-started/" }],
      maturity: "продвинутое", origin: "зарубежное", license: "open-source",
      roles: ["devops"], contexts: ["продукты", "инхаус"]
    },
    {
      name: "Allure", category: "CI/CD", subcategory: "Сборка и доставка", logo: null,
      description: "Фреймворк формирования наглядных отчётов о тестировании.",
      why: "Читаемые отчёты по результатам автотестов в пайплайне.",
      homepage: "https://allurereport.org", repo: "https://github.com/allure-framework/allure2",
      start: [{ label: "Документация Allure", url: "https://allurereport.org/docs/" }],
      maturity: "нишевое", origin: "зарубежное", license: "open-source",
      roles: ["devops", "тестировщик"], contexts: ["продукты"]
    },
    {
      name: "git", category: "Системы хранения версий", subcategory: "Версионирование", logo: "git.svg",
      description: "Распределённая система контроля версий — индустриальный стандарт.",
      why: "Стандарт версионирования; основа CI/CD и командной работы.",
      homepage: "https://git-scm.com",
      start: [{ label: "Книга Pro Git (рус.)", url: "https://git-scm.com/book/ru/v2" }],
      maturity: "базовое", origin: "зарубежное", license: "open-source",
      roles: ["разработчик", "devops"], contexts: ["продукты", "инхаус", "проекты", "фриланс"]
    },
    {
      name: "Хранилище конфигурации", category: "Системы хранения версий", subcategory: "Версионирование", logo: null,
      description: "Штатный механизм платформы для совместной разработки.",
      why: "Постепенно вытесняется связкой git + выгрузка конфигурации в файлы.",
      homepage: "https://its.1c.ru",
      start: [{ label: "ИТС — документация", url: "https://its.1c.ru" }],
      maturity: "устаревает", origin: "отечественное", license: "проприетарное",
      roles: ["разработчик"], contexts: ["франчайзи", "инхаус"]
    }
  ]
};
