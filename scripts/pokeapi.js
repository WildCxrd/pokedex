function initialize() {
    loadPokemonFromPokeApiAsync(0, 20);
}

async function loadPokemonFromPokeApiAsync(offset, limit) {
    const pokemonResponseJson = await tryGetPokemonResponseJsonAsync(offset, limit);
    const pokemonUrls = tryGetPokemonResultUrls(pokemonResponseJson);
    if (pokemonUrls.length > 0) {
        const pokemonResponses = await tryGetPokemonResponsesAsync(pokemonUrls);
        const pokemonJsons = await tryGetPokemonJsonsAsync(pokemonResponses);

        savePokemonsInLocalStorage(pokemonJsons);
    }
}

async function tryGetPokemonResponseJsonAsync(offset, limit) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
        return "";
    }
}

function tryGetPokemonResultUrls(pokemonResponseJson) {
    try {
        const pokemonUrls = [];

        pokemonResponseJson["results"].forEach(pokemonResult => {
            const pokemonInLocalStorage = localStorage.key(pokemonResult.name);
            if (pokemonInLocalStorage == null) {
                pokemonUrls.push(pokemonResult.url);
            }
        });

        return pokemonUrls;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function tryGetPokemonResponsesAsync(pokemonUrls) {
    try {
        const pokemonRequests = pokemonUrls.map((url) => fetch(url));
        const pokemonResponses = await Promise.all(pokemonRequests);
        return pokemonResponses;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function tryGetPokemonJsonsAsync(pokemonResponses) {
    try {
        const pokemonResponsesToJsonPromises = pokemonResponses.map((response) => response.json());
        const pokemonJsons = await Promise.all(pokemonResponsesToJsonPromises);
        return pokemonJsons;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function savePokemonsInLocalStorage(pokemonJsons) {
    pokemonJsons.forEach(pokemonJson => {
        localStorage.setItem(pokemonJson.name, JSON.stringify(pokemonJson));
    });
}