const pokeApiBaseUrl = "https://pokeapi.co/api/v2";
const pokemonBaseUrl = `${pokeApiBaseUrl}/pokemon/`;
const pokemonSpeciesBaseUrl = `${pokeApiBaseUrl}/pokemon-species/`;
const pokemonGenderBaseUrl = `${pokeApiBaseUrl}/gender/`;

let pokemonTotalCount = 0;

//#region API calls

async function savePokemonsInCacheAsync(offset, limit) {
    const url = `${pokemonBaseUrl}?offset=${offset}&limit=${limit}`;
    const pokemonResponseJson = await tryGetResponseJson(url);
    const pokemonUrls = tryGetPokemonResultUrls(pokemonResponseJson);

    if (pokemonUrls.length > 0) {
        const pokemonResponses = await tryGetPokemonResponsesAsync(pokemonUrls);
        const pokemonJsons = await tryGetPokemonJsonsAsync(pokemonResponses);

        savePokemonsInCashe(pokemonJsons);
    }
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

async function tryGetPokemonResponsesAsync(pokemonUrls) {
    try {
        const pokemonRequestPromises = pokemonUrls.map((url) => fetch(url));
        const pokemonResponses = await Promise.all(pokemonRequestPromises);
        return pokemonResponses;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function tryGetPokemonFlavorTextAsync(pokemonId) {
    try {
        const url = `${pokemonSpeciesBaseUrl}/${pokemonId}`;
        const responseJson = await tryGetResponseJson(url);

        return responseJson.flavor_text_entries[0].flavor_text;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function tryGetPokemonGenders(genderId) {
    try {
        const url = `${pokemonGenderBaseUrl}/${genderId}`;
        const gendersResponseJson = await tryGetResponseJson(url);
        return gendersResponseJson;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function tryGetAbilityEffectTextAsync(abilityUrl) {
    try {
        const abilityResponseJson = await tryGetResponseJson(abilityUrl);
        let effectText = "";

        for (const x in abilityResponseJson.effect_entries) {
            const effectEntry = abilityResponseJson.effect_entries[x];
            if (effectEntry.language.name == "en") {
                effectText = effectEntry.effect;
                break;
            }
        }

        return effectText;
    } catch (error) {
        console.log(error);
        return "";
    }
}

async function tryGetResponseJson(url) {
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

//#endregion

//#region JSON

function tryGetPokemonResultUrls(pokemonResponseJson) {
    try {
        const pokemonUrls = [];

        pokemonResponseJson["results"].forEach(pokemonResult => {
            const pokemonInLocalStorage = getPokemonFromCashe(pokemonResult.name);
            if (pokemonInLocalStorage == null) {
                pokemonUrls.push(pokemonResult.url);
            }
        });

        return pokemonUrls;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function tryGetPokemonJsonsAsync(pokemonResponses) {
    try {
        const pokemonResponsesToJsonPromises = pokemonResponses.map((response) => response.json());
        const pokemonJsons = await Promise.all(pokemonResponsesToJsonPromises);
        return pokemonJsons;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

//#endregion