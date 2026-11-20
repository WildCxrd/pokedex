async function filterPokemonCardsOnEnterAsync(event) {
    if (event.key === "Enter") {
        await filterPokemonCardsAsync();
    }
}

function loadPokemonInputClicked(event) {
    event.stopPropagation();
}

function loadPokemonInputKeyPressed(event) {
    if (event.key === "Enter") {
        downloadAndRenderNextPokemon();
    }
}