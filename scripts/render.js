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
        await preloadPokemonCardsImages(currentlyVisiblePokemon);
        pokemonCardsSectionContent = getPokemonCardTemplates(currentlyVisiblePokemon);
    } else {
        pokemonCardsSectionContent = getEmptyFilterResultsTemplate();
    }

    pokemonCardsSection.innerHTML = "";
    pokemonCardsSection.innerHTML = pokemonCardsSectionContent;
}

async function preloadPokemonCardsImages(pokemonArray) {
    const imageDownloads = [];

    for (const pokemon of pokemonArray) {
        const officialArtworkFrontDefaultUrl = pokemon.sprites.other["official-artwork"].front_default;
        imageDownloads.push(tryPreLoadImageAsync(officialArtworkFrontDefaultUrl));
    }

    await Promise.all(imageDownloads);
}