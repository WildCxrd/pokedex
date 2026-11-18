let currentlyVisiblePokemon = [];

function renderPokemonCardsFromCache() {
    const allPokemonInCashe = getAllPokemonFromCashe();
    renderPokemonCardsAsync(allPokemonInCashe);
}

async function renderPokemonCardsAsync(pokemonArray) {
    const pokemonCardsSection = document.getElementById("pokemonCardsSection");
    let pokemonCardTemplates = "";

    currentlyVisiblePokemon = pokemonArray.toSorted((p1, p2) => p1.id - p2.id);

    if (currentlyVisiblePokemon.length > 0) {
        await preloadPokemonCardsImages(currentlyVisiblePokemon);

        for (const pokemon of currentlyVisiblePokemon) {
            const pokemonTypeTemplates = getPokemonTypeTemplates(pokemon.types);
            pokemonCardTemplates += getPokemonCardTemplate(pokemon.sprites.other["official-artwork"].front_default,
                pokemon.id, getFormattedPokedexNumber(pokemon.id), pokemon.name, pokemonTypeTemplates);
        }

    } else {
        pokemonCardTemplates = getEmptyFilterResultsTemplate();
    }

    pokemonCardsSection.innerHTML = "";
    pokemonCardsSection.innerHTML = pokemonCardTemplates;
}

async function preloadPokemonCardsImages(pokemonArray) {
    const imageDownloads = [];

    for (const pokemon of pokemonArray) {
        const officialArtworkFrontDefaultUrl = pokemon.sprites.other["official-artwork"].front_default;
        imageDownloads.push(tryPreLoadImageAsync(officialArtworkFrontDefaultUrl));
    }

    await Promise.all(imageDownloads);
}