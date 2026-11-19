let currentlyVisiblePokemon = [];

async function renderPokemonCardsFromCacheAsync() {
    const allPokemonInCache = getAllPokemonFromCache();
    await renderPokemonCardsAsync(allPokemonInCache);
}

async function renderPokemonCardsAsync(pokemonArray) {
    showMainListLoaderLoader();
    toggleFilterDisabled();

    const pokemonCardsWrapper = document.getElementById("pokemonCardsWrapper");
    let pokemonCardsSectionContent = "";

    currentlyVisiblePokemon = pokemonArray.toSorted((p1, p2) => p1.id - p2.id);

    if (currentlyVisiblePokemon.length > 0) {
        const imagePreloadPromises = currentlyVisiblePokemon.map((pokemon) => preloadImagesAsync(pokemon.sprites.other["official-artwork"].front_default));
        await Promise.all(imagePreloadPromises);
        pokemonCardsSectionContent = getPokemonCardTemplates(currentlyVisiblePokemon);
    } else {
        pokemonCardsSectionContent = getEmptyFilterResultsTemplate();
    }

    pokemonCardsWrapper.innerHTML = "";
    pokemonCardsWrapper.innerHTML = pokemonCardsSectionContent;

    closeMainListLoader();
    toggleFilterDisabled();
}

function toggleFilterDisabled() {
    const filterInput = document.getElementById("filterInput");
    const filterButton = document.getElementById("filterButton");

    filterInput.disabled = !filterInput.disabled;
    filterButton.disabled = !filterButton.disabled;
}