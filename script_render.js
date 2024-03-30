function renderPokemonCardsWithSecondTyps(
  index,
  pokemonName,
  types,
  typesSecond,
  pokemonImageSrc
) {
  return `
      <div onclick="renderPokemonInfo(${index})" class="cards" id="container${index}">  
        <div id="cards" class="${types}">
          <img class="pokeballImg" src="./img/pokeball_bg.png">
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
}

function renderPokemonCardsWithOneTyp(
  index,
  pokemonName,
  types,
  pokemonImageSrc
) {
  return `
    <div onclick="renderPokemonInfo(${index})" class="cards" id="container${index}">
        <div id="cards" class="${types}">
            <img class="pokeballImg" src="./img/pokeball_bg.png">
            <h2>${pokemonName}</h2>
            <div class="pokemonType">
                <b>${types}</b>
            </div>
            <img id="pokemonNameCards" src="${pokemonImageSrc}">
        </div>
    </div>
`;
}

function imgGoLeft(index) {
  return `
    <img id="goLeft" onclick="goLeft(${index})" class="linkerPfeil imghover" src="./img/linker-pfeil.png" alt="">
  `;
}

function imgGoRight(index) {
  return `
    <img id="goRight" onclick="goRight(${index})" class="rechterPfeil imghover" src="./img/rechter-pfeil.png" alt="">
  `;
}

function renderFirstAndSecondTypsInfoCard(types, typesSecond) {
  return `
    <div class="pokemonTypeInfo">
        <b>${types}</b>
    </div>
    <div class="pokemonTypeSecondInfo">
        <b>${typesSecond}</b>
    <div>
`;
}

function renderOnlyFirstTypInfoCard(types) {
  return `
    <div class="pokemonTypeInfo">
        <b>${types}</b>
    </div>   
`;
}

function renderPokemonNumber(pokemonNumber) {
  return `
    <div class"pokemonNumber">#00${pokemonNumber}</div>
  `;
}

function renderBaseStatsHTML(statsName, baseStat, progressBarClass) {
  return `
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

function renderAboutHTML(pokemonName, height, weight, abilities1, abilities2) {
  return `
    <div>
        <div class="aboutSection">
            <p>Species</p>
            <p class="infoWidth">${pokemonName}</p>
        </div>
        <div class="aboutSection">
            <p>Height</p>
            <p class="infoWidth">${height}0cm</p>
        </div>
        <div class="aboutSection">
            <p>Weight</p>
            <p class="infoWidth">${weight}kg</p>
        </div>
        <div class="aboutSection">
            <p>Abilities</p>
            <p class="infoWidth">${abilities1}, ${abilities2}</p>
        </div>
    </div>
    `;
}

function renderMovesHTML(pokemonAPI) {
  return `
    <div class="movesCards">
        <p>${pokemonAPI}</p>
    </div>
    `;
}

function likeHearts(index) {
  return `
    <div class="pokedexHeadImg">
        <img onclick="likeBtn(${index})" id="likeBtn${index}" src="./img/herz(3).png" alt="">
    </div>
    `;
}

function renderInputField() {
  return `
    <div>
        <input placeholder="search Pokemon ..." id="searchResponsive" onkeyup="enterResponsive(event)" type="text">
    </div>
`;
}
