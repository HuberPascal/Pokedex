let pokemon = [
    'bulbasaur', 'ivysaur', 'venusaur', 'squirtle', 'charmander', 'pikachu', 'jigglypuff', 'meowth', 'psyduck', 'machop', 'geodude', 'gyarados', 'lapras', 'eevee', 'snorlax', 'articuno', 'zapdos', 'moltres', 'moltres', 'chikorita', 'cyndaquil', 'totodile', 'togepi', 'mareep', 'typhlosion', 'feraligatr', 'lugia', 'ho-oh', 'treecko', 'torchic', 'mudkip', 'gardevoir', 'sceptile', 'blaziken', 'swampert', 'mightyena', 'zigzagoon', 'linoone', 'wurmple', 'silcoon', 'beautifly', 'cascoon', 'dustox', 'lotad', 'lombre', 'ludicolo', 'seedot', 'nuzleaf', 'shiftry', 'taillow', 'swellow', 'wingull', 'pelipper', 'ralts', 'kirlia', 'gardevoir', 'surskit', 'masquerain', 'shroomish', 'breloom', 'slakoth', 'vigoroth', 'slaking', 'nincada', 'ninjask', 'shedinja', 'whismur', 'loudred', 'exploud', 'makuhita', 'hariyama', 'azurill', 'nosepass', 'skitty', 'delcatty', 'sableye', 'mawile', 'aron', 'lairon', 'aggron', 'meditite', 'medicham', 'electrike', 'manectric', 'plusle', 'minun', 'volbeat', 'illumise', 'roselia', 'gulpin', 'swalot', 'carvanha', 'sharpedo', 'wailmer', 'wailord', 'numel', 'camerupt', 'torkoal',];
  


let currentPokemon;

async function loadPokemon() {
    for (let i = 0; i < pokemon.length; i++) {
        const pokemonNames = pokemon[i];
        
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames}`;
    let response = await fetch(url);
    currentPokemon = await response.json();  
    console.log('Loaded pokemon', currentPokemon);
    loadPokemonCards(i);
}
    
    
}



function renderPokemonInfo(i) {
    document.getElementById('pokedex').classList.remove('dNone');
    document.getElementById('pokedexInfoArea').classList.remove('dNone');


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
function loadPokemonCards(i) {
    let cardsArea = document.getElementById('cardsArea');
    let pokemonName = currentPokemon['name'];
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    let pokemonImageSrc = currentPokemon['sprites']['other']['home']['front_default'];
    let types = currentPokemon['types'][0]['type']['name'];
    let typesSecond = "";
  
    if (currentPokemon['types'].length >= 2) {
      typesSecond = currentPokemon['types'][1]['type']['name'];
      cardsArea.innerHTML += `
        <div onclick="renderPokemonInfo(${i})" id="container${i}">
          <div id="cards" class="${types}">
            <h2>${pokemonName}</h2>
            <div class="pokemonType">
              <b>${types}</b>
            </div>
            <div class="pokemonTypeSecond">
              <b>${typesSecond}</b>
            </div>
            <img id="pokemonNameCards" src="${pokemonImageSrc}">
          </div>
        </div>
      `;
    } else {
      cardsArea.innerHTML += `
        <div onclick="renderPokemonInfo(${i})" id="container${i}">
          <div id="cards" class="${types}">
            <h2>${pokemonName}</h2>
            <div class="pokemonType">
              <b>${types}</b>
            </div>
            <img id="pokemonNameCards" src="${pokemonImageSrc}">
          </div>
        </div>
      `;
    }
  }
  
  
