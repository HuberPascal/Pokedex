
async function init() {
    for (let i = 0; i < amountsShowing; i++) {
        await loadPokemon(i);
    }
}


async function loadPokemon(i) {
      let pokemonName = pokemon[i];

      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      let response = await fetch(url);
      currentPokemon = await response.json();
      loadPokemonCards(i, currentPokemon, pokemon);
}
    

//////////// render Funktion Startseite
function loadPokemonCards(index, currentPokemon) {   // "i" ist ab jetzt "index". "i" hat immer den Wert eines Pokemons
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
    showPokemonInfoCard();
    loadPokemonName(index);
  
    let pokemonKlein = pokemon[index];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonKlein}`;
    let response = await fetch(url);
    pokemonAPI = await response.json();
    loadPokemonImgFromApi();
    loadPokemonId();

    let likeHeart = document.getElementById('likeHeart');
    likeHeart.innerHTML = likeHearts(index);

    renderPokemonAbilities(pokemonAPI);
    renderAbout();
    renderBaseStats();
    renderMoves();
}


function showPokemonInfoCard() {
    document.getElementById('pokedex').classList.remove('dNone');
    document.getElementById('pokedexInfoArea').classList.remove('dNone');
    document.getElementById('overlay').classList.remove('dNone');
}


function loadPokemonName(index) {
    let pokemonNameContainer = document.getElementById('pokemonName');
    pokemonName = pokemon[index];
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    pokemonNameContainer.innerHTML = pokemonName;
    showAbout();
    goNextImg(index);
}


function loadPokemonImgFromApi() {
    let pokemonImage = document.getElementById('pokemonImg');
    pokemonImage.src = pokemonAPI['sprites']['other']['official-artwork']['front_default'];
}


function loadPokemonId() {
    let pokemonNumber = pokemonAPI['id'];
    let pokemonNumberContainer = document.getElementById('pokemonNumber');
    pokemonNumberContainer.innerHTML = '';
    pokemonNumberContainer.innerHTML += renderPokemonNumber(pokemonNumber);
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


  function renderAbout() {
    document.getElementById('abilities').classList.add('dNone');
    document.getElementById('moves').classList.add('dNone');
    
    let height = pokemonAPI['height'];
    let weight = pokemonAPI['weight'];
    weight = (weight / 10).toFixed(1);
    let abilities1 = pokemonAPI['abilities'][0]['ability']['name'];
    // überprüfen ob zwei "ability" vorhanden sind. links oder rechts wird ausgeführt
    let abilities2 = pokemonAPI['abilities'][1] ? pokemonAPI['abilities'][1]['ability']['name'] : '';

    about.innerHTML = '';
    about.innerHTML = renderAboutHTML(pokemonName, height, weight, abilities1, abilities2);
    }


  function renderPokemonAbilities(pokemonAPI) { 
    let pokedexInfoAbilities = document.getElementById('pokedexInfoAbilities');
    let types = pokemonAPI['types'][0]['type']['name'];
    document.getElementById('pokedex').classList = '';
    document.getElementById('pokedex').classList.add(types);
    pokedexInfoAbilities.innerHTML = '';

    if (pokemonAPI['types'].length >= 2) {
        typesSecond = pokemonAPI['types'][1]['type']['name'];
        pokedexInfoAbilities.innerHTML += renderFirstAndSecondTypsInfoCard(types, typesSecond);
    } else {
        pokedexInfoAbilities.innerHTML += renderOnlyFirstTypInfoCard(types);
}
}


function renderBaseStats() {
    let stats = pokemonAPI['stats'];
    let abilities = document.getElementById('abilities');

    abilities.innerHTML = ''; // Vorherige Fähigkeiten löschen

  for (let i = 0; i < stats.length; i++) {
      let statsName = stats[i]['stat']['name'];
      let baseStat = stats[i]['base_stat'];
      ifBaseStats(statsName);

      statsName = statsName.charAt(0).toUpperCase() + statsName.slice(1);
      let progressBarClass = baseStat > 50 ? 'bg-success' : 'bg-danger';
      abilities.innerHTML += renderBaseStatsHTML(statsName, baseStat, progressBarClass);
  }
}


function ifBaseStats(statsName) {
    if (statsName === 'hp') {
        statsName = 'HP';
    } else if (statsName === 'special-attack') {
        statsName = 'Sp. Attack';
    } else if (statsName === 'special-defense') {
        statsName = 'Sp. Defense';
    }
}


function likeBtn(index) {
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
    document.body.classList.remove('fixed');
}


function playMusic() {
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
    moves.innerHTML ='';

    for (let i = 0; i < pokemonMoves.length; i++) {
        if(pokemonMoves[i]['move']['name'])
        pokemonAPI = pokemonMoves[i]['move']['name'];
        moves.innerHTML += renderMovesHTML(pokemonAPI);
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


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


function hiddenGoRight() {
    document.getElementById('goRight').classList.add('dNone');
}


function hiddenGoLeft() {
    document.getElementById('goLeft').classList.add('dNone');
}


async function loadMore() {
    if (loading) {
        return; // Wenn bereits ein Ladevorgang läuft, wird die Funktion beendet
    }

    loading = true; // Setzen der Ladevariable auf "true", um anzuzeigen, dass ein Ladevorgang läuft

    amountsShowing += +50;
    let load = amountsShowing - 50;

    if(amountsShowing >= 151) {
        document.getElementById('loadMoreBtn').classList.add('dNone');
        for (let i = load; i < amountsShowing; i++) {
            await loadPokemon(i);
        }
    } else {
        for (let i = load; i < amountsShowing; i++) {
            await loadPokemon(i);
        }
    }
    loading = false; // Setzen der Ladevariable auf "false", um anzuzeigen, dass der Ladevorgang abgeschlossen ist
}


async function filter() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let list = document.getElementById('cardsArea');
    ifInputFieldEmpty(search);
 
    if(filterInit) {
        return;
    }
    filterInit = true;
    list.innerHTML = '';


    if(search === '') {
        init();
    } else {
    for(let i = 0; i < pokemon.length; i++) {
        let name = pokemon[i];
        if (name.toLowerCase().includes(search)) {
            let indexOfSearch = pokemon.indexOf(name);
            await loadPokemon(indexOfSearch);
        }
    }
}
    ifInputValueEmpty(search);
}


async function filterResponsive() {
    let search = document.getElementById('searchResponsive').value;
    search = search.toLowerCase();
    let list = document.getElementById('cardsArea');
    ifInputFieldEmpty(search);
 
    if(filterInit) {
        return;
    }
    filterInit = true;
    list.innerHTML = '';

    if(search === '') {
        init();
    } else {
    for(let i = 0; i < pokemon.length; i++) {
        let name = pokemon[i];
        if (name.toLowerCase().includes(search)) {
            let indexOfSearch = pokemon.indexOf(name);
            await loadPokemon(indexOfSearch);
        }
    }
}
    ifInputValueEmpty(search);
}


function ifInputFieldEmpty(search) {
    if(search === '') {
    } else {
        filterInit = false;
    }
}

function ifInputValueEmpty(search) {
    if(search === '') {
        filterInit = true;
    } else {
        filterInit = false;
    }
}


async function showInputField() {
    if (isInputFieldShown) { // damit Init() nicht mehrmals aufgerufen werden kann und neu geladen wird
        return; // Die Funktion wird beendet, wenn das Input-Feld bereits geöffnet ist
    }

    isInputFieldShown = true;
    let searchResponsive = document.getElementById('searchResponsive');
    let InputField = document.getElementById('inputField');
    let cardsArea = document.getElementById('cardsArea');

    if (searchResponsive) {
        InputField.innerHTML = '';
        cardsArea.innerHTML = '';
        await init();
        isInputFieldShown = false; // Das Input-Feld wurde geschlossen, daher wird der Status auf "false" gesetzt
    } else {
        InputField.innerHTML = renderInputField();
        isInputFieldShown = false; // Das Input-Feld wurde geöffnet, daher wird der Status auf "true" gesetzt
    }
}


window.addEventListener('load', function() {
    var loadingAnimation = document.getElementById('loading-animation');
    var cardsArea = document.getElementById('cardsArea');
    let loadMoreBtn = document.getElementById('loadMoreBtn')
  
    // Ladeanimation für 2.5 Sekunden anzeigen
    setTimeout(function() {
      loadingAnimation.style.display = 'none';
      loadMoreBtn.style.display = 'flex';
      cardsArea.style.display = 'flex';
    }, 2500); // Dauer in Millisekunden
  });
  