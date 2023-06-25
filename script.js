let pokemon = [
  'bulbasaur', 'ivysaur', 'venusaur', 'squirtle', 'charmander', 'pikachu', 'jigglypuff', 'meowth', 'psyduck', 'machop', 'geodude', 'gyarados', 'lapras', 'eevee', 'snorlax', 'articuno', 'zapdos', 'moltres', 'chikorita', 'cyndaquil', 'totodile', 'togepi'
];

let currentPokemon;
let pokemonImg;

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

async function renderPokemonInfo(index) {
  document.getElementById('pokedex').classList.remove('dNone');
  document.getElementById('pokedexInfoArea').classList.remove('dNone');

  let pokemonNameContainer = document.getElementById('pokemonName');
  let pokemonKlein = pokemon[index];
  let pokemonName = pokemon[index];
  pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  pokemonNameContainer.innerHTML = pokemonName;
  let pokedexInfoAbilities = document.getElementById('pokedexInfoAbilities');

  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonKlein}`;
  let response = await fetch(url);
  pokemonImg = await response.json();
  console.log('Geladenes Pokémon Bild:', pokemonImg);

  let pokemonImage = document.getElementById('pokemonImg');
  pokemonImage.src = pokemonImg['sprites']['other']['official-artwork']['front_default'];

  let types = pokemonImg['types'][0]['type']['name'];
  document.getElementById('pokedex').classList.add(types);


  if (pokemonImg['types'].length >= 2) {
    typesSecond = pokemonImg['types'][1]['type']['name'];
    pokedexInfoAbilities.innerHTML += `
                <div class="pokemonTypeInfo">
                    <b>${types}</b>
                </div>
                <div class="pokemonTypeSecondInfo">
                    <b>${typesSecond}</b>
                <div>
    `;
} else {
    pokedexInfoAbilities.innerHTML += `
                <div class="pokemonType">
                    <b>${types}</b>
                </div>   
    `;
}

renderAbout();

}

function renderBaseStats() {
    document.getElementById('abilities').classList.remove('dNone');
    document.getElementById('about').classList.add('dNone');
    
    let stats = pokemonImg['stats'];
    let abilities = document.getElementById('abilities');

  abilities.innerHTML = ''; // Vorherige Fähigkeiten löschen

  for (let i = 0; i < stats.length; i++) {
      let statsName = stats[i]['stat']['name'];
      let baseStat = stats[i]['base_stat'];

      if (statsName === 'hp') {
          statsName = 'HP';
      } else if (statsName === 'special-attack') {
          statsName = 'Sp. Attack';
      } else if (statsName === 'special-defense') {
          statsName = 'Sp. Defense';
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





function renderAbout() {
    let about = document.getElementById('about');
    about.classList.remove('dNone');
    document.getElementById('abilities').classList.add('dNone');


    let height = pokemonImg['height'];
    let weight = pokemonImg['weight'];
    weight = (weight / 10).toFixed(1);
    let abilities1 = pokemonImg['abilities'][0]['ability']['name'];
    let abilities2 = pokemonImg['abilities'][1]['ability']['name'];

    console.log('die Spezies ist', height);


    about.innerHTML = '';
    about.innerHTML = `
    <div>
        <div class="aboutSection">
            <p>Height</p>
            <p>${height}0cm</p>
        </div>
        <div class="aboutSection">
            <p>Weight</p>
            <p>${weight}kg</p>
        </div>
        <div class="aboutSection">
            <p>Abilities</p>
            <p class="infoWidth">${abilities1}, ${abilities2}</p>
        </div>
        <div class="aboutSection">
        <p>Moves</p>
        <p>${weight}kg</p>
    </div>
    `;
}


function renderMoves() {
    let moves = document.getElementById('moves');

}


function likeBtn() {
    let likeBtn = document.getElementById('likeBtn').src;
    if(likeBtn.indexOf('img/herz(3).png') != -1) {
        document.getElementById('likeBtn').src = 'img/herz(4).png';
    } else {
        document.getElementById('likeBtn').src = 'img/herz(3).png';
    }
}


function goBack() {
    document.getElementById('pokedexInfoArea').classList.add('dNone');
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