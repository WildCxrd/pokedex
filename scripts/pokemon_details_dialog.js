let currentPokemon;

async function showPokemonDetailsDialogAsync(pokemonId) {
    const pokemonDetailsDialog = document.getElementById("pokemonDetailsDialog");
    await setPokemonDetailsDialogViewAsync(pokemonId);
    pokemonDetailsDialog.showModal();
}

async function showPreviousPokemonDetailsAsync() {
    const previousPokemonId = getPreviousPokemonInCache(currentPokemon.id).id;
    await setPokemonDetailsDialogViewAsync(previousPokemonId);
}

async function showNextPokemonDetailsAsync() {
    const nextPokemonId = getNextPokemonInCache(currentPokemon.id).id;
    await setPokemonDetailsDialogViewAsync(nextPokemonId);
}

async function setPokemonDetailsDialogViewAsync(pokemonId) {
    showPokemonDetailsLoaderDialog();

    currentPokemon = getPokemonFromCache(pokemonId);
    await cacheNotExistingPokemonDataAsync(currentPokemon);

    const formattedPokedexNumber = getFormattedPokedexNumber(currentPokemon.id);
    const formattedPokemonFlavorText = cleanText(getFirstEnglishFlavorText(currentPokemon.species_cache.flavor_text_entries));

    const pokemonGenderTemplates = getPokemonGenderTemplates(currentPokemon.genders_cache);
    const pokemonAbilitiesTemplates = await getPokemonAbilitiesTemplatesAsync(currentPokemon.abilities);

    await setPokemonDetailsImagesAsync(currentPokemon, currentPokemon.genders_cache);
    setPokemonImageWrapperBackground(currentPokemon);
    setPokemonDetailsTexts(formattedPokedexNumber, currentPokemon.name, formattedPokemonFlavorText);
    setPokemonDetailsTypes(currentPokemon);
    setPokemonDetails(currentPokemon, pokemonGenderTemplates, pokemonAbilitiesTemplates);
    setPokemonStats(currentPokemon);

    closePokemonDetailsLoaderDialog();
}

function setPokemonImageWrapperBackground(pokemon) {
    const detailsDialogPokemonImageWrapper = document.getElementById("detailsDialogPokemonImageWrapper");

    for (let index = 0; index < detailsDialogPokemonImageWrapper.classList.length; index++) {
        const imagewrapperClass = detailsDialogPokemonImageWrapper.classList[index];

        if (imagewrapperClass.startsWith("type_")) {
            detailsDialogPokemonImageWrapper.classList.remove(imagewrapperClass);
        }
    }

    if (pokemon.types.length < 2) {
        detailsDialogPokemonImageWrapper.style.setProperty("background", null);
        detailsDialogPokemonImageWrapper.classList.add(`type_${pokemon.types[0].type.name}`);
    } else {
        const typesBackgroundGradient = getTypesBackgroundGradient(pokemon.types[0].type.name, pokemon.types[1].type.name);
        detailsDialogPokemonImageWrapper.style.setProperty("background", typesBackgroundGradient);
    }
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
    await preloadGenderImagesAsync(pokemon, pokemonGenders);
    detailsPokemonMainImage.src = await getExistingImageOrPlaceholderSrc(pokemon.sprites.other["official-artwork"].front_default);
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

function setPokemonStats(pokemon) {
    const pokemonStatsTable = document.getElementById("pokemonStatsTable");
    const statsTemplates = getPokemonStatsTemplates(pokemon.stats);
    pokemonStatsTable.innerHTML = statsTemplates;
}

function showAbilityDetailsOverlay(abilityName) {
    const abilityDetailsOverlay = document.getElementById(`abilityDetailsOverlay_${abilityName}`);
    abilityDetailsOverlay.classList.add("open");
}

function closeAbilityDetailsOverlay(abilityName) {
    const abilityDetailsOverlay = document.getElementById(`abilityDetailsOverlay_${abilityName}`);
    abilityDetailsOverlay.classList.remove("open");
}

async function preloadGenderImagesAsync(pokemon, pokemonGenders) {
    const imagePreloads = [];
    if (pokemon.species_cache.has_gender_differences && pokemonGenders.find(g => g.id == FEMALE_GENDER_VALUE)) {
        const frontFemaleImgSrc = getExistingImageOrPlaceholderSrc(pokemon.sprites.front_female);
        const backFemaleImgSrc = getExistingImageOrPlaceholderSrc(pokemon.sprites.back_female);
        imagePreloads.push(preloadImagesAsync(frontFemaleImgSrc, backFemaleImgSrc));
    }
    if (pokemonGenders.find(g => g.id == MALE_GENDER_VALUE)) {
        const frontDefaultImgSrc = getExistingImageOrPlaceholderSrc(pokemon.sprites.front_default);
        const backDefaultImgSrc = getExistingImageOrPlaceholderSrc(pokemon.sprites.back_default);
        imagePreloads.push(preloadImagesAsync(frontDefaultImgSrc, backDefaultImgSrc));
    }
    await Promise.all(imagePreloads);
}

function changeGender(genderId) {
    switch (genderId) {
        case currentPokemon.species_cache.has_gender_differences && FEMALE_GENDER_VALUE:
            detailsPokemonMainImage.src = getExistingImageOrPlaceholderSrc(currentPokemon.sprites.front_female);
            break;
        default:
            detailsPokemonMainImage.src = getExistingImageOrPlaceholderSrc(currentPokemon.sprites.front_default);
            break;
    }
}

function showOfficialArtwork() {
    detailsPokemonMainImage.src = getExistingImageOrPlaceholderSrc(currentPokemon.sprites.other["official-artwork"].front_default);
}

function getFirstEnglishFlavorText(flavorTextEntries) {
    return flavorTextEntries.find(entry => entry.language.name == "en").flavor_text;
}