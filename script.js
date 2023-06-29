
  

async function loadPokemon() {
  for (let i = 0; i < pokemon.length; i++) {
      const pokemonName = pokemon[i];

      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      let response = await fetch(url);
      currentPokemon = await response.json();
      console.log(currentPokemon);
      loadPokemonCards(i, currentPokemon, pokemon);
  }
}
    

//////////// render Funktion Startseite
function loadPokemonCards(index, currentPokemon) {   // i ist ab jetzt index. i hat immer den Wert eines Pokemons
    let cardsArea = document.getElementById('cardsArea');
    let pokemonName = pokemon[index];
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    let pokemonImageSrc = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let types = currentPokemon['types'][0]['type']['name'];
    let typesSecond = "";
  
    if (currentPokemon['types'].length >= 2) {
        typesSecond = currentPokemon['types'][1]['type']['name'];
        // index = Zahl eines Pokemons
        cardsArea.innerHTML += renderPokemonCardsWithSecondTyps(index, pokemonName, types, typesSecond, pokemonImageSrc);
    
    } else {
        cardsArea.innerHTML += renderPokemonCardsWithOneTyp(index, pokemonName, types, pokemonImageSrc);
    }
  }
  

async function renderPokemonInfo(index) {  // index = Zahl eines Pokemons. Damit immer die richtigen Daten geladen werden
  document.getElementById('pokedex').classList.remove('dNone');
  document.getElementById('pokedexInfoArea').classList.remove('dNone');
  document.getElementById('overlay').classList.remove('dNone');

//  loadPokemonApiInfo(index);
  let pokemonNameContainer = document.getElementById('pokemonName');
  let pokemonName = pokemon[index];
  pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  pokemonNameContainer.innerHTML = pokemonName;
  

  let pokemonKlein = pokemon[index];
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonKlein}`;
  let response = await fetch(url);
  pokemonAPI = await response.json();


  let pokemonImage = document.getElementById('pokemonImg');
  pokemonImage.src = pokemonAPI['sprites']['other']['official-artwork']['front_default'];

  

  let pokemonNumber = pokemonAPI['id'];
  let pokemonNumberContainer = document.getElementById('pokemonNumber');
  pokemonNumberContainer.innerHTML = '';
  pokemonNumberContainer.innerHTML += `
    <div class"pokemonNumber">#00${pokemonNumber}</div>
  `;

//   renderPokemonAbilities(typesSecond, pokemonAPI) 
// let pokedexInfoAbilities = document.getElementById('pokedexInfoAbilities');
//   let types = pokemonAPI['types'][0]['type']['name'];
//   document.getElementById('pokedex').classList = '';
//   document.getElementById('pokedex').classList.add(types);
//   pokedexInfoAbilities.innerHTML = '';

//   if (pokemonAPI['types'].length >= 2) {
//     typesSecond = pokemonAPI['types'][1]['type']['name'];
//     pokedexInfoAbilities.innerHTML += `
//                 <div class="pokemonTypeInfo">
//                     <b>${types}</b>
//                 </div>
//                 <div class="pokemonTypeSecondInfo">
//                     <b>${typesSecond}</b>
//                 <div>
//     `;
// } else {
//     pokedexInfoAbilities.innerHTML += `
//                 <div class="pokemonTypeInfo">
//                     <b>${types}</b>
//                 </div>   
//     `;
// }


renderPokemonAbilities(pokemonAPI);
showAbout();
renderAbout(pokemonName);
renderBaseStats();
renderMoves();
goNextImg(index);

}


function goNextImg(index) {
    let goNextImg = document.getElementById('goNextImg');
    let goNextImgHTML = '';
    
    if (index > 0) {
      goNextImgHTML += imgGoLeft(index);
    }
    if (index < pokemon.length - 1) {
      goNextImgHTML += imgGoRight(index);
    } 
    goNextImg.innerHTML = goNextImgHTML;
  }


  function renderPokemonAbilities(pokemonAPI) { 
    console.log('das ist das Pokemon', pokemonAPI);
    let pokedexInfoAbilities = document.getElementById('pokedexInfoAbilities');
    // console.log('das ist das Pokemon', pokemonAPI);
  let types = pokemonAPI['types'][0]['type']['name'];
  document.getElementById('pokedex').classList = '';
  document.getElementById('pokedex').classList.add(types);
  pokedexInfoAbilities.innerHTML = '';

  if (pokemonAPI['types'].length >= 2) {
    typesSecond = pokemonAPI['types'][1]['type']['name'];
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
                <div class="pokemonTypeInfo">
                    <b>${types}</b>
                </div>   
    `;
}
}


function renderBaseStats() {
    let stats = pokemonAPI['stats'];
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









function renderAbout(pokemonName) {
    document.getElementById('abilities').classList.add('dNone');
    document.getElementById('moves').classList.add('dNone');
    

    let height = pokemonAPI['height'];
    let weight = pokemonAPI['weight'];
    weight = (weight / 10).toFixed(1);
    let abilities1 = pokemonAPI['abilities'][0]['ability']['name'];
    // überprüfen ob zwei "ability" vorhanden sind. links oder rechts wird ausgeführt
    let abilities2 = pokemonAPI['abilities'][1] ? pokemonAPI['abilities'][1]['ability']['name'] : '';



    about.innerHTML = '';
    about.innerHTML = `
    <div>
        <div class="aboutSection">
            <p>Species</p>
            <p>${pokemonName}</p>
        </div>
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
    </div>
    `;
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
    document.getElementById('overlay').classList.add('dNone');
}


function playMusic() {
    document.getElementById('overlayStartContainer').classList.remove('overlay');
    document.getElementById('musicConfirmation').classList.add('dNone');
    if(audio.paused) {
        audio.play();
        audio.volume = 0.5;
        startAnimateImage();
    } else {
        audio.pause();
        stopAnimateImage();
    }
}

function noneMusic() {
    document.getElementById('overlayStartContainer').classList.remove('overlay');
    document.getElementById('musicConfirmation').classList.add('dNone');
}


function startAnimateImage() {
    const animateImage = document.getElementById('animateImage');
    animateImage.classList.add('zoomed');
}

function stopAnimateImage() {
    const animateImage = document.getElementById('animateImage');
    animateImage.classList.remove('zoomed');
}


function renderMoves() { 
    let pokemonMoves = pokemonAPI['moves'];
    // moves.innerHTML ='';

    for (let i = 0; i < pokemonMoves.length; i++) {
        if(pokemonMoves[i]['move']['name'])
        // const element = pokemonMoves[i];
        pokemonAPI = pokemonMoves[i]['move']['name'];
        moves.innerHTML += `
        <div class="movesCards">
            <p>${pokemonAPI}</p>
        </div>
        `;
    }
}


function showAbout() {
    document.getElementById('abilities').classList.add('dNone');
    document.getElementById('moves').classList.add('dNone');
    let about = document.getElementById('about');
    about.classList.remove('dNone');
}


function showBaseStats() {
    document.getElementById('about').classList.add('dNone');
    document.getElementById('moves').classList.add('dNone');
    let baseStats = document.getElementById('abilities');
    baseStats.classList.remove('dNone');
}


function showMoves() {
    document.getElementById('about').classList.add('dNone');
    document.getElementById('abilities').classList.add('dNone');
    let moves = document.getElementById('moves');
    moves.classList.remove('dNone');
}


function goLeft(index) {
    if (index > 0) {
        index = index - 1;
        renderPokemonInfo(index);
    }

    if (index === 0) {
        renderPokemonInfo(index);
        hiddenGoLeft();
    } else {
        renderPokemonInfo(index);
    }
}


function goRight(index) {
    if (index < pokemon.length - 1) {
        index = index + 1;
        renderPokemonInfo(index);
    }

    if (index === pokemon.length - 1) {
        renderPokemonInfo(index);
        hiddenGoRight();
    } else {
        renderPokemonInfo(index);
    }
}



function hiddenGoRight() {
    document.getElementById('goRight').classList.add('dNone');
}

function hiddenGoLeft() {
    document.getElementById('goLeft').classList.add('dNone');
}


