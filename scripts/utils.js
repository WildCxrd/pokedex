function getPokemonCardTemplates(pokemonArray) {
    let pokemonCardTemplates = "";

    for (const pokemon of pokemonArray) {
        const pokemonTypeTemplates = getPokemonTypeTemplates(pokemon.types);
        pokemonCardTemplates += getPokemonCardTemplate(pokemon.sprites.other["official-artwork"].front_default,
            pokemon.id, getFormattedPokedexNumber(pokemon.id), pokemon.name, pokemon.types[0].type.name, pokemonTypeTemplates);
    }

    return pokemonCardTemplates;
}

function getPokemonTypeTemplates(pokemonTypes) {
    let pokemonTypeTemplates = "";

    pokemonTypes.forEach(pokemonType => {
        pokemonTypeTemplates += getPokemonTypeTemplate(pokemonType.type.name, pokemonType.type.name);
    });

    return pokemonTypeTemplates;
}

async function getPokemonAbilitiesTemplatesAsync(pokemonAbilities) {
    let abilitiesTemplates = "";

    for (let index = 0; index < pokemonAbilities.length; index++) {
        const ability = pokemonAbilities[index];
        const abilityEffectText = await getAbilityEffectTextAsync(ability);
        abilitiesTemplates += getPokemonAbilityTemplate(ability.ability.name, abilityEffectText);
    }

    return abilitiesTemplates;
}

function getPokemonGenderTemplates(pokemonGenders) {
    let genderTemplates = "";

    pokemonGenders.forEach(gender => {
        let genderImgSrc;
        let genderImgAlt;

        switch (gender.id) {
            case FEMALE_GENDER_VALUE:
                genderImgSrc = "../assets/icons/female.png"
                genderImgAlt = "A female symbol."
                break;
            case MALE_GENDER_VALUE:
                genderImgSrc = "../assets/icons/male.png"
                genderImgAlt = "A male symbol."
                break;
            case GENDERLESS_GENDER_VALUE:
                genderImgSrc = "../assets/icons/neutrum.png"
                genderImgAlt = "A neutrum symbol."
                break;
            default:
                break;
        }

        genderTemplates += getPokemonGenderButtonTemplate(gender.id, gender.name, genderImgSrc, genderImgAlt)
    });

    return genderTemplates;
}

function getPokemonGenders(pokemon) {
    // see: https://pokeapi.co/docs/v2#genders
    const genders = [];

    const femaleGender = getPokemonGenderFromCache(pokemon.species.name, POKEMON_GENDERS_FEMALE);
    const maleGender = getPokemonGenderFromCache(pokemon.species.name, POKEMON_GENDERS_MALE)
    const genderless = getPokemonGenderFromCache(pokemon.species.name, POKEMON_GENDERS_GENDERLESS)

    if (femaleGender != null) {
        genders.push(femaleGender);
    }
    if (maleGender != null) {
        genders.push(maleGender);
    }
    if (genderless != null) {
        genders.push(genderless);
    }

    return genders;
}

function getPokemonGenderFromCache(pokemonSpeciesName, genderCache) {
    const foundElement = genderCache.pokemon_species_details.find(s => s.pokemon_species.name == pokemonSpeciesName);

    if (foundElement != null) {
        return { id: genderCache.id, name: genderCache.name };
    } else {
        return null;
    }
}

async function getAbilityEffectTextAsync(ability, languageAbbreviation = "en") {
    let effectText = "";
    let abilityInCache = POKEMON_ABILITIES_CACHE.find(a => a.name == ability.ability.name);

    if (abilityInCache == undefined) {
        abilityInCache = await tryGetResponseJsonAsync(ability.ability.url);
        POKEMON_ABILITIES_CACHE.push(abilityInCache);
    }

    for (const effectEntry of abilityInCache.effect_entries) {
        if (effectEntry.language.name == languageAbbreviation) {
            effectText = effectEntry.effect;
            break;
        }
    }

    return effectText;
}

function getFormattedPokedexNumber(pokemonId) {
    const pokedexNumberMaxLength = pokemonTotalCount.toString().length;
    return pokemonId.toString().padStart(pokedexNumberMaxLength, 0);
}

function getMetricHeight(pokemonHeight) {
    const metricHeight = pokemonHeight / 10;
    return `${metricHeight.toString().replace(".", ",")} m`;
}

function getMetricWeight(pokemonWeight) {
    const metricWeight = pokemonWeight / 10;
    return `${metricWeight.toString().replace(".", ",")} kg`;
}

function cleanText(text) {
    const cleanedText = text.replace("\n", " ")
        .replace("\\u000", " ")
        .replace("\f", " ");
    return cleanedText;
}

async function preloadImagesAsync(...imageUrls) {
    const imageDownloads = [];

    for (const imageUrl of imageUrls) {
        imageDownloads.push(tryPreLoadImageAsync(imageUrl));
    }

    await Promise.all(imageDownloads);
}

async function cacheNotExistingPokemonDataAsync(pokemon) {
    if (pokemon.species_cache == undefined) {
        pokemon.species_cache = await tryGetResponseJsonAsync(pokemon.species.url);
    }
    if (pokemon.genders_cache == undefined) {
        pokemon.genders_cache = getPokemonGenders(pokemon);
    }
}