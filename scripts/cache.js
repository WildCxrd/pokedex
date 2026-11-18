const POKEMON_CACHE = [];
let POKEMON_GENDERS_FEMALE; // has gender.id = 1
let POKEMON_GENDERS_MALE; // has gender.id = 2
let POKEMON_GENDERS_GENDERLESS; // has gender.id = 3

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

async function saveGenderDataInCachesAsync() {
    const loadGenderPromises = [];

    loadGenderPromises.push(tryGetPokemonGenders(1));
    loadGenderPromises.push(tryGetPokemonGenders(2));
    loadGenderPromises.push(tryGetPokemonGenders(3));
    const genderPromiseResults = await Promise.all(loadGenderPromises);

    POKEMON_GENDERS_FEMALE = genderPromiseResults[0];
    POKEMON_GENDERS_MALE = genderPromiseResults[1];
    POKEMON_GENDERS_GENDERLESS = genderPromiseResults[2];
}