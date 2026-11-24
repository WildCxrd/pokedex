const ENTER_KEY = "Enter";

async function showPokemonDetailsDialogOnKeyPressedAsync(event, pokemonId) {
    if (event.key === ENTER_KEY) {
        await showPokemonDetailsDialogAsync(pokemonId);
    }
}

async function filterPokemonCardsOnEnterAsync(event) {
    if (event.key === ENTER_KEY) {
        await filterPokemonCardsAsync();
    }
}

function loadPokemonInputClicked(event) {
    event.stopPropagation();
}

function loadPokemonInputKeyPressed(event) {
    if (event.key === ENTER_KEY) {
        downloadAndRenderNextPokemon();
    }
}