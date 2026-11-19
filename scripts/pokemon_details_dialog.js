let currentPokemon;

async function showPokemonDetailsDialogAsync(pokemonId) {
    const pokemonDetailsDialog = document.getElementById("pokemonDetailsDialog");

    currentPokemon = getPokemonFromCache(pokemonId);
    await cacheNotExistingPokemonDataAsync(currentPokemon);

    const formattedPokedexNumber = getFormattedPokedexNumber(currentPokemon.id);
    const formattedPokemonFlavorText = cleanText(currentPokemon.species_cache.flavor_text_entries[0].flavor_text);

    const pokemonGenderTemplates = getPokemonGenderTemplates(currentPokemon.genders_cache);
    const pokemonAbilitiesTemplates = await getPokemonAbilitiesTemplatesAsync(currentPokemon.abilities);

    setPokemonImageWrapperClasses(currentPokemon);
    await setPokemonDetailsImagesAsync(currentPokemon, currentPokemon.genders_cache);
    setPokemonDetailsTexts(formattedPokedexNumber, currentPokemon.name, formattedPokemonFlavorText);
    setPokemonDetailsTypes(currentPokemon);
    setPokemonDetails(currentPokemon, pokemonGenderTemplates, pokemonAbilitiesTemplates);

    pokemonDetailsDialog.showModal();
}

function setPokemonImageWrapperClasses(pokemon) {
    const detailsDialogPokemonImageWrapper = document.getElementById("detailsDialogPokemonImageWrapper");

    for (let index = 0; index < detailsDialogPokemonImageWrapper.classList.length; index++) {
        const imagewrapperClass = detailsDialogPokemonImageWrapper.classList[index];

        if (imagewrapperClass.startsWith("type_")) {
            detailsDialogPokemonImageWrapper.classList.remove(imagewrapperClass);
        }
    }

    detailsDialogPokemonImageWrapper.classList.add(`type_${pokemon.types[0].type.name}`);
}

function setPokemonDetailsTexts(formattedPokemonId, pokemonName, pokemonFlavorText) {
    const detailsPokedexNumber = document.getElementById("detailsPokedexNumber");
    const detailsPokemonName = document.getElementById("detailsPokemonName");
    const pokemonFlavorTextElement = document.getElementById("pokemonFlavorText");

    detailsPokedexNumber.innerHTML = `Nr. ${formattedPokemonId}`;
    detailsPokemonName.innerHTML = pokemonName;
    pokemonFlavorTextElement.innerHTML = pokemonFlavorText;
}

async function setPokemonDetailsImagesAsync(pokemon, pokemonGenders) {
    const detailsPokemonMainImage = document.getElementById("detailsPokemonMainImage");
    await preloadDetailImagesAsync(pokemon, pokemonGenders);
    detailsPokemonMainImage.src = pokemon.sprites.other["official-artwork"].front_default;
}

function setPokemonDetailsTypes(pokemon) {
    const detailsPokemonTypesWrapper = document.getElementById("detailsPokemonTypesWrapper");

    const pokemonTypesTemplates = getPokemonTypeTemplates(pokemon.types);
    detailsPokemonTypesWrapper.innerHTML = pokemonTypesTemplates;
}

function setPokemonDetails(pokemon, pokemonGenderTemplates, pokemonAbilitiesTemplates) {
    const pokemonHeight = document.getElementById("pokemonHeight");
    const pokemonWeight = document.getElementById("pokemonWeight");
    const pokemonGenderWrapper = document.getElementById("pokemonGenderWrapper");
    const pokemonAbilitiesWrapper = document.getElementById("pokemonAbilitiesWrapper");

    pokemonHeight.innerHTML = getMetricHeight(pokemon.height);
    pokemonWeight.innerHTML = getMetricWeight(pokemon.weight);
    pokemonGenderWrapper.innerHTML = pokemonGenderTemplates;
    pokemonAbilitiesWrapper.innerHTML = pokemonAbilitiesTemplates;
}

function showAbilityDetailsOverlay(abilityName) {
    const abilityDetailsOverlay = document.getElementById(`abilityDetailsOverlay_${abilityName}`);
    abilityDetailsOverlay.classList.add("open");
}

function closeAbilityDetailsOverlay(abilityName) {
    const abilityDetailsOverlay = document.getElementById(`abilityDetailsOverlay_${abilityName}`);
    abilityDetailsOverlay.classList.remove("open");
}

async function preloadDetailImagesAsync(pokemon, pokemonGenders) {
    const imagePreloads = [];
    if (pokemon.species_cache.has_gender_differences && pokemonGenders.find(g => g.id == FEMALE_GENDER_VALUE)) {
        imagePreloads.push(preloadImagesAsync(pokemon.sprites.front_female, pokemon.sprites.back_female));
    }
    if (pokemonGenders.find(g => g.id == MALE_GENDER_VALUE)) {
        imagePreloads.push(preloadImagesAsync(pokemon.sprites.front_default, pokemon.sprites.back_default));
    }
    await Promise.all(imagePreloads);
}

function changeGender(genderId)
{
    switch (genderId) {
        case currentPokemon.species_cache.has_gender_differences && FEMALE_GENDER_VALUE:
            detailsPokemonMainImage.src = currentPokemon.sprites.front_female;
            break;
        default:
            detailsPokemonMainImage.src = currentPokemon.sprites.front_default;
            break;
    }
}