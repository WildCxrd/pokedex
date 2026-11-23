let currentlyVisiblePokemon = [];

async function renderPokemonCardsFromCacheAsync() {
    const allPokemonInCache = getAllPokemonFromCache();
    await renderPokemonCardsAsync(allPokemonInCache);
}

async function renderPokemonCardsAsync(pokemonArray) {
    const pokemonCardsWrapper = document.getElementById("pokemonCardsWrapper");
    let pokemonCardsSectionContent = "";

    prepareViewBeforeRendering();

    currentlyVisiblePokemon = pokemonArray.toSorted((p1, p2) => p1.id - p2.id);

    if (currentlyVisiblePokemon.length > 0) {
        const imagePreloadPromises = currentlyVisiblePokemon.map((pokemon) => preloadImagesAsync(pokemon.sprites.other["official-artwork"].front_default));
        await Promise.all(imagePreloadPromises);
        pokemonCardsSectionContent = await getPokemonCardTemplatesAsync(currentlyVisiblePokemon);
    } else {
        pokemonCardsSectionContent = getEmptyFilterResultsTemplate();
    }

    pokemonCardsWrapper.innerHTML = pokemonCardsSectionContent;

    restoreViewAfterRendering();
}

function prepareViewBeforeRendering() {
    const pokemonCardsWrapper = document.getElementById("pokemonCardsWrapper");
    pokemonCardsWrapper.style.setProperty("height", "unset");

    showMainListLoader();
    setFilterDisabled(true);
    setLoadPokemonButtonDisplay("none");
}

function restoreViewAfterRendering() {
    const pokemonCardsWrapper = document.getElementById("pokemonCardsWrapper");

    closeMainListLoader();
    setFilterDisabled(false);
    setLoadPokemonButtonDisplay("flex");
    pokemonCardsWrapper.style.setProperty("height", "100%");

    if (currentlyVisiblePokemon.length > 0) {
        setScrollButtonsDisplay("unset");
    } else {
        setScrollButtonsDisplay("none");
    }
}

function setFilterDisabled(disableFilter) {
    const filterInput = document.getElementById("filterInput");
    const filterButton = document.getElementById("filterButton");

    filterInput.disabled = disableFilter;
    filterButton.disabled = disableFilter;
}

function setLoadPokemonButtonDisplay(displayValue) {
    const loadPokemonButton = document.getElementById("loadPokemonButton");

    if (loadPokemonButton != null) {
        loadPokemonButton.style.setProperty("display", displayValue);
    }
}

function setScrollButtonsDisplay(displayValue) {
    const scrollToBottomLink = document.getElementById("scrollToBottomLink");
    const scrollToTopLink = document.getElementById("scrollToTopLink");

    scrollToBottomLink.style.setProperty("display", displayValue);
    scrollToTopLink.style.setProperty("display", displayValue);
}

function emptyCardsWrapper() {
    const pokemonCardsWrapper = document.getElementById("pokemonCardsWrapper");
    if (pokemonCardsWrapper != null) {
        pokemonCardsWrapper.innerHTML = "";
    }
}