let currentlyVisiblePokemon = [];

function renderPokemonCardsFromCache() {
    const allPokemonInCashe = getAllPokemonFromCashe();
    renderPokemonCards(allPokemonInCashe);
}

function renderPokemonCards(pokemonArray) {
    const pokemonCardsSection = document.getElementById("pokemonCardsSection");
    let pokemonCardTemplates = "";

    currentlyVisiblePokemon = pokemonArray.toSorted((p1, p2) => p1.id - p2.id);

    if (currentlyVisiblePokemon.length > 0) {
        currentlyVisiblePokemon.forEach(pokemon => {
            const pokemonTypeTemplates = getPokemonTypeTemplates(pokemon.types);
            pokemonCardTemplates += getPokemonCardTemplate(pokemon.sprites.front_default,
                pokemon.id, getFormattedPokedexNumber(pokemon.id), 
                pokemon.name, pokemonTypeTemplates);
        });
    } else {
        pokemonCardTemplates = getEmptyFilterResultsTemplate();
    }

    pokemonCardsSection.innerHTML = "";
    pokemonCardsSection.innerHTML = pokemonCardTemplates;
}

