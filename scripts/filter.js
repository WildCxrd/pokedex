async function filterPokemonCardsAsync() {
    const filterInput = document.getElementById("filterInput");
    const filterInputTrimmedValue = filterInput.value.trim();

    if (filterInputTrimmedValue != "") {
        const filteredPokemon = filterPokemon(POKEMON_CACHE, filterInputTrimmedValue);
        await renderPokemonCardsAsync(filteredPokemon);
        setLoadPokemonButtonDisplay("none");
        setEmptyFilterButtonsDisplay(true);
    } else {
        emptyCardsWrapper();
        await renderPokemonCardsFromCacheAsync();
        setEmptyFilterButtonsDisplay(false);
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
    const lowerString = string.toLowerCase();

    const nameMatches = pokemon.name.match(lowerString);
    const idMatches = pokemon.id.toString().match(lowerString);
    const allTypeMatches = [];

    pokemon.types.forEach(type => {
        let typeMatches = type.type.name.match(lowerString);
        if (typeMatches != null) {
            allTypeMatches.push(typeMatches);
        }
    });

    return nameMatches != null ||
        idMatches != null ||
        allTypeMatches.length > 0;
}

function setEmptyFilterButtonsDisplay(isCurrentlyFiltered) {
    const emptyFilterButton = document.getElementById("emptyFilterButton");

    switch (isCurrentlyFiltered) {
        case false:
            emptyFilterButton.style.removeProperty("display");
            break;
        default:
            emptyFilterButton.style.setProperty("display", "flex");
            break;
    }
}

async function emptyFilterAsync() {
    const filterInput = document.getElementById("filterInput");
    filterInput.value = "";

    await filterPokemonCardsAsync();
}