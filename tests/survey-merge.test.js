const assert = require("node:assert/strict");
const merge = require("../app/survey-merge.js");
const current = {
    dims: { role: ["разработчик", "аналитик"], level: ["эксперт"], context: ["инхаус"] },
    respondents: { total: 8, cells: [[0, 0, 0, 8]] },
    tools: [{ name: "Общий", cells: [[0, 0, 0, 3, 2, 1, 2, 1, 0, 0]] }],
};
const previous = {
    dims: { role: ["аналитик", "разработчик"], level: ["начинающий", "эксперт"], context: ["проекты", "инхаус"] },
    respondents: { total: 100, cells: [[1, 1, 1, 100]] },
    tools: [
        { name: "Общий", cells: [[1, 1, 1, 99, 0, 0, 99, 0, 0, 0]] },
        { name: "Базовый", cells: [[1, 1, 1, 5, 4, 3, 2, 1, 0, 0], [0, 0, 0, 1, 0, 0, 1, 0, 0, 0]] },
    ],
};
const before = JSON.stringify([current, previous]);
const result = merge(current, previous);
assert.equal(result.respondents.total, 8);
assert.deepEqual(result.respondents.cells, current.respondents.cells);
assert.equal(result.tools.length, 2);
assert.deepEqual(result.tools[0].cells, current.tools[0].cells);
assert.equal(result.tools[0].july, false);
assert.equal(result.tools[1].july, true);
assert.deepEqual(result.tools[1].cells[0], [0, 0, 0, 5, 4, 3, 2, 1, 0, 0]);
const analystCell = result.tools[1].cells[1];
assert.equal(result.dims.role[analystCell[0]], "аналитик");
assert.equal(result.dims.level[analystCell[1]], "начинающий");
assert.equal(result.dims.context[analystCell[2]], "проекты");
assert.equal(JSON.stringify([current, previous]), before);
console.log("survey merge: ok");
