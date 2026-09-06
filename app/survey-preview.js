// Локальный снимок заменяет опубликованный; получение данных не публикует их.
window.SURVEY_CARD_PREVIEW = ["127.0.0.1", "localhost", ""].includes(
    location.hostname,
);
if (window.SURVEY_CARD_PREVIEW) {
    window.SURVEY_CARD_PREVIOUS = window.SURVEY;
    window.SURVEY = null;
    document.write(
        '<script src="survey2026-live.js?t=' + Date.now() + '"><\/script>',
    );
    document.write(
        "<script>if (!window.SURVEY) window.SURVEY = window.SURVEY_CARD_PREVIOUS;<\/script>",
    );
}
