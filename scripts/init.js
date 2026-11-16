async function initialize() {
    await loadPokemonFromPokeApiAsync(0, 40);
    renderPokemonCardsFromCache();
}