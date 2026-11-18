async function initializeAsync() {
    const dataDownloadsResults = await downloadInitialDataAsync();

    POKEMON_GENDERS_FEMALE = dataDownloadsResults[0];
    POKEMON_GENDERS_MALE = dataDownloadsResults[1];
    POKEMON_GENDERS_GENDERLESS = dataDownloadsResults[2];
    savePokemonsInCashe(dataDownloadsResults[3]);

    renderPokemonCardsFromCache();
}

async function downloadInitialDataAsync() {
    const dataDownloads = [];
    dataDownloads.push(tryGetPokemonGenders(1));
    dataDownloads.push(tryGetPokemonGenders(2));
    dataDownloads.push(tryGetPokemonGenders(3));
    dataDownloads.push(tryGetPokemonAsync(0, 20));
    return await Promise.all(dataDownloads);
}