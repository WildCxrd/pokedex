const POKEMON_CACHE = [];
const POKEMON_ABILITIES_CACHE = [];

const FEMALE_GENDER_VALUE = 1;
const MALE_GENDER_VALUE = 2; // male is also the default gender
const GENDERLESS_GENDER_VALUE = 3;

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