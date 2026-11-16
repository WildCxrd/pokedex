const POKEMON_CASHE = [];

function savePokemonsInCashe(pokemonJsons) {
    pokemonJsons.forEach(pokemonJson => {
        if (getPokemonFromCashe(pokemonJson.id) == undefined) {
            POKEMON_CASHE.push(pokemonJson);
        }
    });
}

function getAllPokemonFromCashe() {
    return POKEMON_CASHE;
}

function getPokemonFromCashe(pokemonId) {
    return POKEMON_CASHE.find(p => p.id == pokemonId);
}