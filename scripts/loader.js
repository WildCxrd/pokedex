function showMainListLoader() {
    const mainListLoader = document.getElementById("mainListLoader");
    mainListLoader.classList.add("open");
}

function closeMainListLoader() {
    const mainListLoader = document.getElementById("mainListLoader");
    mainListLoader.classList.remove("open");
}

function showPokemonDetailsLoaderDialog() {
    const pokemonDetailsLoader = document.getElementById("pokemonDetailsLoaderDialog");
    pokemonDetailsLoader.showModal();
}

function closePokemonDetailsLoaderDialog() {
    const pokemonDetailsLoader = document.getElementById("pokemonDetailsLoaderDialog");
    pokemonDetailsLoader.close();
}