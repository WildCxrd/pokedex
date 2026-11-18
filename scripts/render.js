let currentlyVisiblePokemon = [];

async function renderPokemonCardsFromCacheAsync() {
    const allPokemonInCache = getAllPokemonFromCache();
    await renderPokemonCardsAsync(allPokemonInCache);
}

async function renderPokemonCardsAsync(pokemonArray) {
    const pokemonCardsSection = document.getElementById("pokemonCardsSection");
    let pokemonCardsSectionContent = "";

    currentlyVisiblePokemon = pokemonArray.toSorted((p1, p2) => p1.id - p2.id);

    if (currentlyVisiblePokemon.length > 0) {
        const imagePreloadPromises = currentlyVisiblePokemon.map((pokemon) => preloadImagesAsync(pokemon.sprites.other["official-artwork"].front_default));
        await Promise.all(imagePreloadPromises);
        pokemonCardsSectionContent = getPokemonCardTemplates(currentlyVisiblePokemon);
    } else {
        pokemonCardsSectionContent = getEmptyFilterResultsTemplate();
    }

    pokemonCardsSection.innerHTML = "";
    pokemonCardsSection.innerHTML = pokemonCardsSectionContent;
}