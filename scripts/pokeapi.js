const pokeApiBaseUrl = "https://pokeapi.co/api/v2";
const pokemonBaseUrl = `${pokeApiBaseUrl}/pokemon`;
const pokemonSpeciesBaseUrl = `${pokeApiBaseUrl}/pokemon-species`;
const pokemonGenderBaseUrl = `${pokeApiBaseUrl}/gender`;
const pokemonAbilityBaseUrl = `${pokeApiBaseUrl}/ability`;

let pokemonTotalCount = 0;

//#region API calls

async function downloadPokemonRangeAsync(offset, limit) {
    const url = `${pokemonBaseUrl}/?offset=${offset}&limit=${limit}`;
    const pokemonResponseJson = await tryGetResponseJsonAsync(url);
    pokemonTotalCount = pokemonResponseJson.count;
    const pokemonUrls = tryGetPokemonResultUrls(pokemonResponseJson);

    if (pokemonUrls.length > 0) {
        return await Promise.all(pokemonUrls.map((url) => tryGetResponseJsonAsync(url)));
    }
}

async function downloadPokemonAsync(pokemonId) {
    const url = `${pokemonBaseUrl}/${pokemonId}`;
    return await tryGetResponseJsonAsync(url);
}

async function downloadPokemonGenderAsync(genderId) {
    const url = `${pokemonGenderBaseUrl}/${genderId}`;
    return await tryGetResponseJsonAsync(url);
}

async function tryGetResponseJsonAsync(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function tryPreLoadImageAsync(imageUrl) {
    if (imageUrl != null) {
        try {
            await new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = resolve;
                image.onerror = reject;
                image.src = imageUrl;
            });
        } catch (error) {
            console.log(error);
        }
    }
}

//#endregion

//#region JSON

function tryGetPokemonResultUrls(pokemonResponseJson) {
    try {
        const pokemonUrls = [];

        pokemonResponseJson.results.forEach(pokemonResult => {
            const pokemonInCache = getPokemonFromCache(pokemonResult.id);
            if (pokemonInCache == null) {
                pokemonUrls.push(pokemonResult.url);
            }
        });

        return pokemonUrls;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

//#endregion