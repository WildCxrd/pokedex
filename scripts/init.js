async function initialize() {
    await saveGenderDataInCachesAsync();
    await savePokemonsInCacheAsync(0, 40);
    renderPokemonCardsFromCache();
}