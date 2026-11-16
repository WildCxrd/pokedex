function getPokemonCardTemplate(imgSrc, pokedexNumber, pokemonName, pokemonTypesTemplate) {
    return `
        <article class="pokemon_card">
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