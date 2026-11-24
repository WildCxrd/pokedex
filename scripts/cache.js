const POKEMON_CACHE = [];
const POKEMON_ABILITIES_CACHE = [];

let POKEMON_GENDERS_FEMALE;
let POKEMON_GENDERS_MALE;
let POKEMON_GENDERS_GENDERLESS;

function savePokemonsInCache(pokemonJsons) {
    pokemonJsons.forEach(pokemonJson => {
        if (getPokemonFromCache(pokemonJson.id) == undefined) {
            POKEMON_CACHE.push(pokemonJson);
        }
    });
}

function getAllPokemonFromCache() {
    return POKEMON_CACHE;
}

function getPokemonFromCache(pokemonId) {
    return POKEMON_CACHE.find(p => p.id == pokemonId);
}

function getFirstPokemonInCache() {
    return POKEMON_CACHE[0];
}

function getLastPokemonInCache() {
    return POKEMON_CACHE[POKEMON_CACHE.length - 1];
}

function getPreviousPokemonInCache(pokemonId, loop = true) {
    const pokemonCacheSortedByIdAscending = POKEMON_CACHE.toSorted((p1, p2) => p1.id - p2.id);
    const pokemon = pokemonCacheSortedByIdAscending.find(p => p.id == pokemonId);
    const previousPokemonIndex = pokemonCacheSortedByIdAscending.indexOf(pokemon) - 1;

    if (previousPokemonIndex >= 0) {
        return pokemonCacheSortedByIdAscending[previousPokemonIndex];
    }
    else if (loop) {
        return getLastPokemonInCache();
    }
    else {
        return getPokemonFromCache(pokemonId);
    }
}

function getNextPokemonInCache(pokemonId, loop = true) {
    const pokemonCacheSortedByIdAscending = POKEMON_CACHE.toSorted((p1, p2) => p1.id - p2.id);
    const pokemon = pokemonCacheSortedByIdAscending.find(p => p.id == pokemonId);
    const nextPokemonIndex = pokemonCacheSortedByIdAscending.indexOf(pokemon) + 1;

    if (nextPokemonIndex < POKEMON_CACHE.length) {
        return pokemonCacheSortedByIdAscending[nextPokemonIndex];
    }
    else if (loop) {
        return getFirstPokemonInCache();
    }
    else {
        return getPokemonFromCache(pokemonId);
    }
}