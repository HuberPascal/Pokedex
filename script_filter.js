function enter(event) {
  let searchInput = getPokemomFromInput();
  let cardsArea = document.getElementById("cardsArea");
  let filteredCardsArea = document.getElementById("filteredCardsArea");
  let loadMoreBtn = document.getElementById("loadMoreBtnContainer");
  filteredCardsArea.innerHTML = "";

  filterPokemons(searchInput, loadMoreBtn, cardsArea, filteredCardsArea);
}

function filterPokemons(
  searchInput,
  loadMoreBtn,
  cardsArea,
  filteredCardsArea
) {
  if (searchInput !== "") {
    loadMoreBtn.classList.add("dNone");
    cardsArea.style.display = "none";
    filteredCardsArea.style.display = "flex";

    pokemonData.forEach((pokemon, index) => {
      if (pokemon.name.toLowerCase().includes(searchInput)) {
        loadPokemonCards(index, pokemonData[index], "filteredCardsArea");
      }
    });
  } else {
    loadMoreBtn.classList.remove("dNone");
    cardsArea.style.display = "flex";
    filteredCardsArea.style.display = "none";
  }
}

function getPokemomFromInput() {
  let searchValue = document.getElementById("search").value;
  let search = searchValue.trim().toLowerCase();
  return search;
}
