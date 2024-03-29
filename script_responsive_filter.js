function getPokemomFromInputResponsive() {
  let searchValue = document.getElementById("searchResponsive").value;
  let search = searchValue.trim();
  return search;
}

function enterResponsive(event) {
  let searchInput = getPokemomFromInputResponsive();
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
