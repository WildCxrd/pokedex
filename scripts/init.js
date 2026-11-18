async function initializeAsync() {
    let dataDownloads = [];
    dataDownloads.push(saveGenderDataInCachesAsync());
    dataDownloads.push(savePokemonsInCacheAsync(0, 20));
    await Promise.all(dataDownloads);
    renderPokemonCardsFromCache();
}