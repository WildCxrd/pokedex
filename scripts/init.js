async function initializeAsync() {
    let dataDownloads = [];
    dataDownloads.push(saveGenderDataInCachesAsync());
    dataDownloads.push(tryGetPokemonAsync(0, 20));
    const dataDownloadsResults = await Promise.all(dataDownloads);
    savePokemonsInCashe(dataDownloadsResults[1]);
    renderPokemonCardsFromCache();
}