function enterResponsive(event) {
  let searchInput = getPokemomFromInputResponsive();
  let cardsArea = document.getElementById("cardsArea");
  let filteredCardsArea = document.getElementById("filteredCardsArea");
  let loadMoreBtn = document.getElementById("loadMoreBtnContainer");
  filteredCardsArea.innerHTML = "";

  filterPokemons(searchInput, loadMoreBtn, cardsArea, filteredCardsArea);
}

function getPokemomFromInputResponsive() {
  let searchValue = document.getElementById("searchResponsive").value;
  let search = searchValue.trim().toLowerCase();
  return search;
}
