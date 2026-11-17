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
        <button id="${genderName}GenderButton" class="gender_button circle_button" onclick="changeGender(${genderId})">
            <img src="${imgSrc}" alt="${imgAlt}">
        </button>
    `;
}

function getPokemonAbilityTemplate(abilityName, abilityEffectText) {
    return `
        <div class="pokemon_ability_wrapper">
            <p class="pokemon_ability">${abilityName}</p>
            <button class="question_mark_button circle_button" onclick="showAbilityDetailsOverlay('${abilityName}')">
                <img src="../assets/icons/question_mark.png" alt="A question mark.">
            </button>
            <div id="abilityDetailsOverlay_${abilityName}" class="ability_details_overlay ability_${abilityName}">
                <button class="ability_details_overlay_close_button" onclick="closeAbilityDetailsOverlay('${abilityName}')">
                    <img src="../assets/icons/close.svg" alt="A cross.">
                </button>
                <h3>${abilityName}</h3>
                <p>${abilityEffectText}</p>
            </div>
        </div>
    `;
}