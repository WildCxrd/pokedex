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
                getFormattedPokedexNumber(pokemon.id), pokemon.name, pokemonTypeTemplates);
        });
    } else {
        pokemonCardTemplates = getEmptyFilterResultsTemplate();
    }

    pokemonCardsSection.innerHTML = "";
    pokemonCardsSection.innerHTML = pokemonCardTemplates;
}

function getPokemonTypeTemplates(pokemonTypes) {
    let pokemonTypeTemplates = "";

    pokemonTypes.forEach(pokemonType => {
        pokemonTypeTemplates += getPokemonTypeTemplate(pokemonType.type.name, pokemonType.type.name);
    });

    return pokemonTypeTemplates;
}

function getFormattedPokedexNumber(pokedexNumber) {
    const pokedexNumberMaxLength = pokemonTotalCount.toString().length;
    return pokedexNumber.toString().padStart(pokedexNumberMaxLength, 0);
}