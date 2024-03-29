function getPokemomFromInput() {
  let searchValue = document.getElementById("search").value;
  let search = searchValue.trim();
  return search;
}

function enter(event) {
  let searchInput = getPokemomFromInput();
  let search = searchInput.toLowerCase();
  if (search > "") {
    inputEmpty = false;
  }
  if (inputEmpty) {
    return;
  }

  if (event.keyCode === 13) {
    if (search === "") {
      inputIsEmpty();
      return;
    }
    setCardsArea(search);
    document.getElementById("loadMoreBtnContainer").classList.add("dNone");
  }
}

function inputIsEmpty() {
  document.getElementById("cardsArea").innerHTML = "";
  document.getElementById("loadMoreBtnContainer").classList.remove("dNone");
  inputEmpty = true;
  init();
}

function setCardsArea(search) {
  document.getElementById("cardsArea").innerHTML = "";
  filter(search);
}

function filter(search) {
  // pokemonData-Array durchlaufen, um die Suchkriterien zu überprüfen
  for (let i = 0; i < pokemonData.length; i++) {
    let pokemonName = pokemonData[i].name;

    if (pokemonName.toLowerCase().includes(search.toLowerCase())) {
      loadPokemonCards(i, pokemonData[i]);
    }
  }
}
