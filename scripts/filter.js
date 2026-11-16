function filterPokemonCardsOnEnter(event) {
    if (event.key === "Enter") {
        filterPokemonCards();
    }
}

function filterPokemonCards() {
    const filterInput = document.getElementById("filterInput");
    const filterInputTrimmedValue = filterInput.value.trim();

    if (filterInputTrimmedValue != "") {
        const filteredPokemon = filterPokemon(POKEMON_CACHE, filterInputTrimmedValue);
        renderPokemonCards(filteredPokemon);
    } else {
        renderPokemonCardsFromCache();
    }
}

function filterPokemon(pokemonArray, filterString) {
    const filteredPokemon = [];

    pokemonArray.forEach(pokemon => {
        if (filterString != "" && pokemonNameMatches(pokemon, filterString)) {
            filteredPokemon.push(pokemon);
        }
    });

    return filteredPokemon;
}

function pokemonNameMatches(pokemon, string) {
    const nameMatches = pokemon.name.match(string);
    const idMatches = pokemon.id.toString().match(string);
    const allTypeMatches = [];

    pokemon.types.forEach(type => {
        let typeMatches = type.type.name.match(string);
        if (typeMatches != null) {
            allTypeMatches.push(typeMatches);
        }
    });

    return nameMatches != null ||
        idMatches != null ||
        allTypeMatches.length > 0;
}