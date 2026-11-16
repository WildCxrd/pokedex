const POKEMON_CACHE = [];

function savePokemonsInCashe(pokemonJsons) {
    pokemonJsons.forEach(pokemonJson => {
        if (getPokemonFromCashe(pokemonJson.id) == undefined) {
            POKEMON_CACHE.push(pokemonJson);
        }
    });
}

function getAllPokemonFromCashe() {
    return POKEMON_CACHE;
}

function getPokemonFromCashe(pokemonId) {
    return POKEMON_CACHE.find(p => p.id == pokemonId);
}