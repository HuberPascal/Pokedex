let pokemon = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander']

let currentPokemon;

async function loadPokemon() {
    for (let i = 0; i < pokemon.length; i++) {
        const pokemonNames = pokemon[i];
        
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames}`;
    let response = await fetch(url);
    currentPokemon = await response.json();  
    console.log('Loaded pokemon', currentPokemon);
}

    renderPokemonInfo();
}


// function renderPokemon() {
//     let card = document.getElementById('card');
//     card.innerHTML = '';

//     card.innerHTML += /*html*/ `
//     <div>
//         `
// }


function renderPokemonInfo() {
    let = pokekomNameContainer = document.getElementById('pokemonName');
    let pokemonName = currentPokemon['name'];
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    pokekomNameContainer.innerHTML = pokemonName;
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['home']['front_default'];
    renderAbilities();
}

function renderAbilities() {
    let stats = currentPokemon['stats'];
    let abilities = document.getElementById('abilities');
    

    for (let i = 0; i < stats.length; i++) {
        let statsName = currentPokemon['stats'][i]['stat']['name'];
        let baseStat = currentPokemon['stats'][i]['base_stat'];

        if(statsName === 'hp') {
            statsName = 'HP';
        }

        if(statsName === 'special-attack') {
            statsName = 'Sp. Attack';
        }

        if(statsName === 'special-defense') {
            statsName = 'Sp. Defense';
        }

        statsName = statsName.charAt(0).toUpperCase() + statsName.slice(1);


        abilities.innerHTML += /*html*/ `
        <div class="flex">
                    <p>${statsName}</p>
                    <span>${baseStat}</span>
                    <div class="progressInfo">
                        <div
                            class="progress"
                            role="progressbar"
                            aria-label="Success example"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100">
                            <div
                                class="progress-bar bg-success"
                                style="width: ${baseStat}%">
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }
}




//////////// render Funktion Startseite
function loadPokemonCards() {
    let cards = document.getElementById('card');

    let pokemonName = currentPokemon['name'];
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    pokekomNameContainer.innerHTML = pokemonName;
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['home']['front_default'];
    renderAbilities();
    

    cards.innerHTML = /*html*/ `
    <h1>${pokemonName}</h1>
    <h3>hallo</h3>
    `;
    

    for (let i = 0; i < stats.length; i++) {
        let statsName = currentPokemon['stats'][i]['stat']['name'];
}
}