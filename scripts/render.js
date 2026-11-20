let currentlyVisiblePokemon = [];

async function renderPokemonCardsFromCacheAsync() {
    const allPokemonInCache = getAllPokemonFromCache();
    await renderPokemonCardsAsync(allPokemonInCache);
}

async function renderPokemonCardsAsync(pokemonArray) {
    const pokemonCardsWrapper = document.getElementById("pokemonCardsWrapper");
    let pokemonCardsSectionContent = "";

    prepareViewBeforeRendering();

    currentlyVisiblePokemon = pokemonArray.toSorted((p1, p2) => p1.id - p2.id);

    if (currentlyVisiblePokemon.length > 0) {
        const imagePreloadPromises = currentlyVisiblePokemon.map((pokemon) => preloadImagesAsync(pokemon.sprites.other["official-artwork"].front_default));
        await Promise.all(imagePreloadPromises);
        pokemonCardsSectionContent = getPokemonCardTemplates(currentlyVisiblePokemon);
    } else {
        pokemonCardsSectionContent = getEmptyFilterResultsTemplate();
    }

    pokemonCardsWrapper.innerHTML = pokemonCardsSectionContent;

    restoreViewAfterRendering();
}

function prepareViewBeforeRendering() {
    showMainListLoader();
    toggleFilterDisabled();
    setLoadPokemonButtonDisplay("none");
}

function restoreViewAfterRendering() {
    closeMainListLoader();
    setLoadPokemonButtonDisplay("flex");
    toggleFilterDisabled();
}

function toggleFilterDisabled() {
    const filterInput = document.getElementById("filterInput");
    const filterButton = document.getElementById("filterButton");

    filterInput.disabled = !filterInput.disabled;
    filterButton.disabled = !filterButton.disabled;
}

function setLoadPokemonButtonDisplay(displayValue) {
    const loadPokemonButton = document.getElementById("loadPokemonButton");
    loadPokemonButton.style.setProperty("display", displayValue);
}