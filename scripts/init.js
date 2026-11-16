async function initialize() {
    await loadPokemonFromPokeApiAsync(0, 20);
    renderPokemonCards();
}