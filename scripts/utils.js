const POKEMON_LOCAL_STORAGE_KEY_PREFIX = "pokemon_";

function savePokemonsInLocalStorage(pokemonJsons) {
    pokemonJsons.forEach(pokemonJson => {
        localStorage.setItem(getPokemonLocalStorageKey(pokemonJson.name), JSON.stringify(pokemonJson));
    });
}

function getAllPokemonFromLocalStorage() {
    const localStorageKeys = Object.keys(localStorage);
    const pokemonInLocalStorage = [];
    localStorageKeys.forEach(key => {
        if (key.startsWith(POKEMON_LOCAL_STORAGE_KEY_PREFIX)) {
            pokemonInLocalStorage.push(JSON.parse(localStorage.getItem(key)));
        }
    });

    return pokemonInLocalStorage;
}

function getPokemonFromLocalStorage(pokemonName) {
    return localStorage.getItem(getPokemonLocalStorageKey(pokemonName));
}

function getPokemonLocalStorageKey(pokemonName) {
    return `${POKEMON_LOCAL_STORAGE_KEY_PREFIX}${pokemonName}`;
}