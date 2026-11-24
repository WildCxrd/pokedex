function getPokemonWithOneTypeCardTemplate(imgSrc, pokemonId, pokedexNumber, pokemonName, pokemonPrimaryTypeName, pokemonTypesTemplate) {
    return `
        <li data-id="card" class="pokemon_card" onclick="showPokemonDetailsDialogAsync(${pokemonId})" tabindex=0>
            <div class="pokemon_image_wrapper">
                <img id="pokemonImage" data-id="card-image" src="${imgSrc}" alt="The pokemon ${pokemonName}" class="type_${pokemonPrimaryTypeName}">
            </div>
            <p id="pokedexNumber">Nr. ${pokedexNumber}</p>
            <h2 id="pokemonName">${pokemonName}</h2>
            <div id="pokemonTypesWrapper">
                ${pokemonTypesTemplate}
            </div>
        </li>
    `;
}

function getPokemonWithMultipleTypesCardTemplate(imgSrc, pokemonId, pokedexNumber, pokemonName, typesBackgroundGradient, pokemonTypesTemplate) {
    return `
        <li class="pokemon_card" onclick="showPokemonDetailsDialogAsync(${pokemonId})" 
                                      onkeypress="showPokemonDetailsDialogOnKeyPressedAsync(event, ${pokemonId})" tabindex=0>
            <div class="pokemon_image_wrapper">
                <img id="pokemonImage" src="${imgSrc}" alt="The pokemon ${pokemonName}" style="background: ${typesBackgroundGradient}">
            </div>
            <p id="pokedexNumber">Nr. ${pokedexNumber}</p>
            <h2 id="pokemonName">${pokemonName}</h2>
            <div id="pokemonTypesWrapper">
                ${pokemonTypesTemplate}
            </div>
        </li>
    `;
}

function getPokemonTypeTemplate(pokemonType, pokemonTypeDisplayName) {
    return `
        <p class="pokemon_type type_${pokemonType}">${pokemonTypeDisplayName}</p>
    `;
}

function getEmptyFilterResultsTemplate() {
    return `
        <div data-id="not-found" class="empty_filter_results">
            <img src="./assets/img/prof_oak.png" alt="Prof. Oak holding a book.">
            <h2>Hey! Wait! There are no Pokémon in the tall grass...</h2>
        <div>
    `;
}

function getPokemonGenderButtonTemplate(genderId, genderName, imgSrc, imgAlt) {
    return `
        <button id="${genderName}GenderButton" class="circle_button" onclick="changeGender(${genderId})">
            <img src="${imgSrc}" alt="${imgAlt}">
        </button>
    `;
}

function getPokemonAbilityTemplate(abilityName, abilityEffectText) {
    return `
        <div class="pokemon_ability_wrapper">
            <p class="pokemon_ability">${abilityName}</p>
            <button class="question_mark_button" onclick="showAbilityDetailsOverlay('${abilityName}')">
                <img src="./assets/icons/question_mark.png" alt="A question mark.">
            </button>
            <div id="abilityDetailsOverlay_${abilityName}" class="ability_details_overlay ability_${abilityName}">
                <header class="ability_details_overlay_header">
                    <h3>${abilityName}</h3>
                    <button class="close_button" onclick="closeAbilityDetailsOverlay('${abilityName}')">
                        <img src="./assets/icons/close.svg" alt="A cross.">
                    </button>
                </header>
                <p>${abilityEffectText}</p>
            </div>
        </div>
    `;
}

function getTypesBackgroundLineGradientTemplate(firstColor, secondColor) {
    return `linear-gradient(45deg, ${firstColor} 40%, ${secondColor} 60%)`;
}

function getPokemonStatTableRowTemplate(statName, statBaseStat) {
    return `
        <tr>
            <th>${statName}</th>
            <td>${statBaseStat}</td>
        </tr>
    `;
}

function getPokemonStatUnevenIndexTableRowTemplate(statName, statBaseStat) {
    return `
        <tr class="uneven_index">
            <th>${statName}</th>
            <td>${statBaseStat}</td>
        </tr>
    `;
}