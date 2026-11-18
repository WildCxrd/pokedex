async function initializeAsync() {
    const dataDownloadsResults = await downloadInitialDataAsync();

    POKEMON_GENDERS_FEMALE = dataDownloadsResults[0];
    POKEMON_GENDERS_MALE = dataDownloadsResults[1];
    POKEMON_GENDERS_GENDERLESS = dataDownloadsResults[2];
    savePokemonsInCache(dataDownloadsResults[3]);

    await renderPokemonCardsFromCacheAsync();
}

async function downloadInitialDataAsync() {
    const dataDownloads = [];
    dataDownloads.push(downloadPokemonGenderAsync(1));
    dataDownloads.push(downloadPokemonGenderAsync(2));
    dataDownloads.push(downloadPokemonGenderAsync(3));
    dataDownloads.push(downloadPokemonRangeAsync(0, 20));
    return await Promise.all(dataDownloads);
}