let pokemon = [
  'bulbasaur', 'ivysaur', 'venusaur', 'squirtle', 'charmander', 'pikachu', 'jigglypuff', 'meowth', 'psyduck', 'machop', 'geodude', 'gyarados', 'lapras', 'eevee', 'snorlax', 'articuno', 'zapdos', 'moltres', 'chikorita', 'cyndaquil', 'totodile', 'togepi'
];

let currentPokemon;

async function loadPokemon() {
  for (let i = 0; i < pokemon.length; i++) {
      const pokemonName = pokemon[i];

      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      let response = await fetch(url);
      currentPokemon = await response.json();
      console.log('Geladenes Pokémon:', currentPokemon);
      loadPokemonCards(i, currentPokemon);
  }
}

function renderPokemonInfo(index) {
  document.getElementById('pokedex').classList.remove('dNone');
  document.getElementById('pokedexInfoArea').classList.remove('dNone');

  let pokemonNameContainer = document.getElementById('pokemonName');
  let pokemonName = pokemon[index];
  pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  pokemonNameContainer.innerHTML = pokemonName;

  let pokemonImage = document.getElementById('pokemonImg');
  pokemonImage.src = currentPokemon['sprites']['other']['official-artwork']['front_default'];

  renderAbilities(currentPokemon);
}

function renderAbilities(currentPokemon) {
  let stats = currentPokemon['stats'];
  let abilities = document.getElementById('abilities');

  abilities.innerHTML = ''; // Vorherige Fähigkeiten löschen

  for (let i = 0; i < stats.length; i++) {
      let statsName = stats[i]['stat']['name'];
      let baseStat = stats[i]['base_stat'];

      if (statsName === 'hp') {
          statsName = 'KP';
      } else if (statsName === 'special-attack') {
          statsName = 'Spez. Angriff';
      } else if (statsName === 'special-defense') {
          statsName = 'Spez. Verteidigung';
      }

      statsName = statsName.charAt(0).toUpperCase() + statsName.slice(1);

      let progressBarClass = baseStat > 50 ? 'bg-success' : 'bg-danger';

      abilities.innerHTML += `
          <div class="flex">
              <p>${statsName}</p>
              <span>${baseStat}</span>
              <div class="progressInfo">
                  <div class="progress" role="progressbar" aria-label="Erfolgsbeispiel" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                      <div class="progress-bar ${progressBarClass}" style="width: ${baseStat}%"></div>
                  </div>
              </div>
          </div>
      `;
  }
}




//////////// render Funktion Startseite
function loadPokemonCards(index, currentPokemon) {
  let cardsArea = document.getElementById('cardsArea');
  let pokemonName = pokemon[index];
  pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  let pokemonImageSrc = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  let types = currentPokemon['types'][0]['type']['name'];
  let typesSecond = "";

  if (currentPokemon['types'].length >= 2) {
      typesSecond = currentPokemon['types'][1]['type']['name'];
      cardsArea.innerHTML += `
          <div onclick="renderPokemonInfo(${index})" id="container${index}">
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
          <div onclick="renderPokemonInfo(${index})" id="container${index}">
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




  
  












// function renderAbilities(i, currentPokemon) {
//   let stats = currentPokemon['stats'];
//   let abilities = document.getElementById('abilities');
  

//   for (let i = 0; i < stats.length; i++) {
//       let statsName = currentPokemon['stats'][i]['stat']['name'];
//       let baseStat = currentPokemon['stats'][i]['base_stat'];

//       if(statsName === 'hp') {
//           statsName = 'HP';
//       }

//       if(statsName === 'special-attack') {
//           statsName = 'Sp. Attack';
//       }

//       if(statsName === 'special-defense') {
//           statsName = 'Sp. Defense';
//       }


// let pokemon = [
//   'bulbasaur', 'ivysaur', 'venusaur', 'squirtle', 'charmander', 'pikachu', 'jigglypuff', 'meowth', 'psyduck', 'machop', 'geodude', 'gyarados', 'lapras', 'eevee', 'snorlax', 'articuno', 'zapdos', 'moltres', 'chikorita', 'cyndaquil', 'totodile', 'togepi'];
  
//   // 'mareep', 'typhlosion', 'feraligatr', 'lugia', 'ho-oh', 'treecko', 'torchic', 'mudkip', 'gardevoir', 'sceptile', 'blaziken', 'swampert', 'mightyena', 'zigzagoon', 'linoone', 'wurmple', 'silcoon', 'beautifly', 'cascoon'];
  
//   // 'dustox', 'lotad', 'lombre', 'ludicolo', 'seedot', 'nuzleaf', 'shiftry', 'taillow', 'swellow', 'wingull', 'pelipper', 'ralts', 'kirlia', 'gardevoir', 'surskit', 'masquerain', 'shroomish', 'breloom', 'slakoth', 'vigoroth', 'slaking', 'nincada', 'ninjask', 'shedinja', 'whismur', 'loudred', 'exploud', 'makuhita', 'hariyama', 'azurill', 'nosepass', 'skitty', 'delcatty', 'sableye', 'mawile', 'aron', 'lairon', 'aggron', 'meditite', 'medicham', 'electrike', 'manectric', 'plusle', 'minun', 'volbeat', 'illumise', 'roselia', 'gulpin', 'swalot', 'carvanha', 'sharpedo', 'wailmer', 'wailord', 'numel', 'camerupt', 'torkoal',];