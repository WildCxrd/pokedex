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
        const imageDownloads = [];

        for (const pokemon of currentlyVisiblePokemon) {
            const imageUrl = pokemon.sprites.other["official-artwork"].front_default;
            imageDownloads.push(tryPreLoadImageAsync(imageUrl));

            const pokemonTypeTemplates = getPokemonTypeTemplates(pokemon.types);
            pokemonCardTemplates += getPokemonCardTemplate(imageUrl, pokemon.id, getFormattedPokedexNumber(pokemon.id),
                pokemon.name, pokemonTypeTemplates);
        }

        await Promise.all(imageDownloads);

    } else {
        pokemonCardTemplates = getEmptyFilterResultsTemplate();
    }

    pokemonCardsSection.innerHTML = "";
    pokemonCardsSection.innerHTML = pokemonCardTemplates;
}