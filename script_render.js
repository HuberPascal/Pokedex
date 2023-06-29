
function renderPokemonCardsWithSecondTyps(index, pokemonName, types, typesSecond, pokemonImageSrc) {
    return `
      <div onclick="renderPokemonInfo(${index})" id="container${index}">  
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


  function renderPokemonCardsWithOneTyp(index, pokemonName, types, pokemonImageSrc) {
    return `
    <div onclick="renderPokemonInfo(${index})" id="container${index}">
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
  
  