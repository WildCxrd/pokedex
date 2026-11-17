async function showPokemonDetailsDialogAsync(pokemonId) {
    const pokemonDetailsDialog = document.getElementById("pokemonDetailsDialog");
    const pokemon = getPokemonFromCashe(pokemonId);
    const formattedPokedexNumber = getFormattedPokedexNumber(pokemon.id);
    const pokemonFlavorText = await tryGetPokemonFlavorTextAsync(pokemonId);
    const formattedPokemonFlavorText = cleanText(pokemonFlavorText);

    const pokemonGenders = getPokemonGenders(pokemon);
    const pokemonGenderTemplates = getPokemonGenderTemplates(pokemonGenders);

    setPokemonDetailsTexts(formattedPokedexNumber, pokemon.name, formattedPokemonFlavorText);
    setPokemonDetailsImages(pokemon);
    setPokemonDetailsTypes(pokemon);
    setPokemonDetails(pokemon, pokemonGenderTemplates);

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

    detailsDialogPokemonImageWrapper.classList.add(`type_${pokemon.types[0].type.name}`);
    detailsPokemonMainImage.src = pokemon.sprites.front_default;
}

function setPokemonDetailsTypes(pokemon) {
    const detailsPokemonTypesWrapper = document.getElementById("detailsPokemonTypesWrapper");

    const pokemonTypesTemplates = getPokemonTypeTemplates(pokemon.types);
    detailsPokemonTypesWrapper.innerHTML = pokemonTypesTemplates;
}

function setPokemonDetails(pokemon, pokemonGenderTemplates) {
    const pokemonHeight = document.getElementById("pokemonHeight");
    const pokemonWeight = document.getElementById("pokemonWeight");
    const pokemonGenderWrapper = document.getElementById("pokemonGenderWrapper");
    const pokemonAbilities = document.getElementById("pokemonAbilities");

    pokemonHeight.innerHTML = getMetricHeight(pokemon.height);
    pokemonWeight.innerHTML = getMetricWeight(pokemon.weight);
    pokemonGenderWrapper.innerHTML = pokemonGenderTemplates;
}

function changeGender(genderId){
    // TODO
}