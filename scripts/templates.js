function getPokemonCardTemplate(imgSrc, pokemonId, pokedexNumber, pokemonName, pokemonTypesTemplate) {
    return `
        <article class="pokemon_card" onclick="showPokemonDetailsDialogAsync(${pokemonId})">
            <div class="pokemon_image_wrapper">
                <img id="pokemonImage" src="${imgSrc}" alt="The pokemon ${pokemonName}">
            </div>
            <p id="pokedexNumber">Nr. ${pokedexNumber}</p>
            <h2 id="pokemonName">${pokemonName}</h2>
            <div id="pokemonTypesWrapper">
                ${pokemonTypesTemplate}
            </div>
        </article>
    `;
}

function getPokemonTypeTemplate(pokemonType, pokemonTypeDisplayName) {
    return `
        <p class="pokemon_type type_${pokemonType}">${pokemonTypeDisplayName}</p>
    `;
}

function getEmptyFilterResultsTemplate() {
    return `
        <div class="empty_filter_results">
            <img src="../assets/img/prof_oak.png" alt="Prof. Oak holding a book.">
            <h2>Hey! Wait! There are no Pokémon in the tall grass...</h2>
        <div>
    `;
}

function getPokemonGenderTemplate(genderId, genderName, imgSrc, imgAlt) {
    return `
        <button id="${genderName}GenderButton" class="gender_button" onclick="changeGender(${genderId})">
            <img src="${imgSrc}" alt="${imgAlt}">
        </button>
    `;
}