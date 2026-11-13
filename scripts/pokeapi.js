function initialize() {
    loadPokemonFromPokeApiAsync(0, 20);
}

async function loadPokemonFromPokeApiAsync(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const responseJson = await response.json();

    const pokemonUrls = getPokemonResultUrls(responseJson);
    if (pokemonUrls.length > 0) {
        const pokemonResponses = await getPokemonResponsesAsync(pokemonUrls);
        const pokemonResponsesToJsonPromises = pokemonResponses.map((response) => response.json());
        const pokemonJsons = await Promise.all(pokemonResponsesToJsonPromises);

        savePokemonsInLocalStorage(pokemonJsons);
    }
}

function getPokemonResultUrls(pokemonResponseJson) {
    const pokemonUrls = [];

    pokemonResponseJson["results"].forEach(pokemonResult => {
        const pokemonInLocalStorage = localStorage.key(pokemonResult.name);
        if (pokemonInLocalStorage == null) {
            pokemonUrls.push(pokemonResult.url);
        }
    });

    return pokemonUrls;
}

async function getPokemonResponsesAsync(pokemonUrls) {
    const pokemonRequests = pokemonUrls.map((url) => fetch(url));
    const pokemonResponses = await Promise.all(pokemonRequests);
    return pokemonResponses;
}

function savePokemonsInLocalStorage(pokemonJsons) {
    pokemonJsons.forEach(pokemonJson => {
        localStorage.setItem(pokemonJson.name, JSON.stringify(pokemonJson));
    });
}