async function showPokemonDetailsDialogAsync(pokemonId) {
    const pokemonDetailsDialog = document.getElementById("pokemonDetailsDialog");
    const pokemon = getPokemonFromCache(pokemonId);
    const formattedPokedexNumber = getFormattedPokedexNumber(pokemon.id);
    const pokemonFlavorText = await tryGetPokemonFlavorTextAsync(pokemonId);
    const formattedPokemonFlavorText = cleanText(pokemonFlavorText);

    const pokemonGenders = getPokemonGenders(pokemon);
    const pokemonGenderTemplates = getPokemonGenderTemplates(pokemonGenders);

    const pokemonAbilitiesTemplates = await getPokemonAbilitiesTemplatesAsync(pokemon.abilities);

    setPokemonDetailsTexts(formattedPokedexNumber, pokemon.name, formattedPokemonFlavorText);
    setPokemonDetailsImages(pokemon);
    setPokemonDetailsTypes(pokemon);
    setPokemonDetails(pokemon, pokemonGenderTemplates, pokemonAbilitiesTemplates);

    pokemonDetailsDialog.showModal();
}

function setPokemonDetailsTexts(formattedPokemonId, pokemonName, pokemonFlavorText) {
    const detailsPokedexNumber = document.getElementById("detailsPokedexNumber");
    const detailsPokemonName = document.getElementById("detailsPokemonName");
    const pokemonFlavorTextElement = document.getElementById("pokemonFlavorText");

    detailsPokedexNumber.innerHTML = `Nr. ${formattedPokemonId}`;
    detailsPokemonName.innerHTML = pokemonName;
    pokemonFlavorTextElement.innerHTML = pokemonFlavorText;
}

function setPokemonDetailsImages(pokemon) {
    const detailsDialogPokemonImageWrapper = document.getElementById("detailsDialogPokemonImageWrapper");
    const detailsPokemonMainImage = document.getElementById("detailsPokemonMainImage");

    for (let index = 0; index < detailsDialogPokemonImageWrapper.classList.length; index++) {
        const imagewrapperClass = detailsDialogPokemonImageWrapper.classList[index];

        if (imagewrapperClass.startsWith("type_")) {
            detailsDialogPokemonImageWrapper.classList.remove(imagewrapperClass);
        }
    }

    detailsDialogPokemonImageWrapper.classList.add(`type_${pokemon.types[0].type.name}`);
    detailsPokemonMainImage.src = pokemon.sprites.front_default;
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