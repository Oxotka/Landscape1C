const assert = require('node:assert/strict');
global.window = { SURVEY: { generated: '2026-09-06T07:42:34Z', tools: [
    {name: 'Свежий', july: false, cells: [[0,0,0,3,2,1,2,1,1,1]]},
    {name: 'Июльский', july: true, cells: [[0,0,0,3,0,0,3,0,0,0]]},
] }};
require('../app/shared.js');
const current = window.LandscapeUI.surveyOf('Свежий');
assert.equal(current.used, 50);
assert.equal(current.loyal, 67);
assert.equal(current.loyalN, 3);
assert.equal(current.want, null);
assert.match(current.source, /Опрос продолжается/);
assert.equal(window.LandscapeUI.surveyOf('Июльский').source, 'Июль 2026');
assert.equal(window.LandscapeUI.surveyOf('Нет'), null);
console.log('survey cards: ok');
