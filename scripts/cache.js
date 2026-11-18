const POKEMON_CACHE = [];
const POKEMON_ABILITIES_CACHE = [];
let POKEMON_GENDERS_FEMALE; // has gender.id = 1
let POKEMON_GENDERS_MALE; // has gender.id = 2
let POKEMON_GENDERS_GENDERLESS; // has gender.id = 3

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