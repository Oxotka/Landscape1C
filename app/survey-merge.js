// Единая витрина: текущие ответы имеют приоритет, июль дополняет инструменты.
function mergeSurvey(current, previous) {
    const keys = ["role", "level", "context"];
    const dims = Object.fromEntries(
        keys.map((key) => [
            key,
            [...new Set([...current.dims[key], ...previous.dims[key]])],
        ]),
    );
    const remap = (cells, source) =>
        cells.map((cell) => [
            ...keys.map((key, i) =>
                dims[key].indexOf(source.dims[key][cell[i]]),
            ),
            ...cell.slice(3),
        ]);
    const currentNames = new Set(current.tools.map((tool) => tool.name));
    const tools = (source, july) =>
        source.tools
            .filter((tool) => !july || !currentNames.has(tool.name))
            .map((tool) => ({
                ...tool,
                july,
                cells: remap(tool.cells, source),
            }));
    return {
        ...current,
        dims,
        respondents: {
            ...current.respondents,
            cells: remap(current.respondents.cells, current),
        },
        tools: [...tools(current, false), ...tools(previous, true)],
    };
}
if (typeof module !== "undefined") module.exports = mergeSurvey;
