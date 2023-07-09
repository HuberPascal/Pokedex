
function getPokemomFromInput() {
    let searchValue = document.getElementById('search').value;
    let search = searchValue.trim();
    return search;
}


function enter(event) {
    let searchInput = getPokemomFromInput();
    let search = searchInput.toLowerCase();
    if(search > '') {
        inputEmpty = false;
    }  
    if(inputEmpty) {
        return;
    }

    if (event.keyCode === 13) {
  
      if (search === '') {
        inputIsEmpty();
        return;
      }
        setCardsArea(search);
        document.getElementById('loadMoreBtn').classList.add('dNone');
    }
}
  

function inputIsEmpty() {
    document.getElementById('cardsArea').innerHTML = '';
    document.getElementById('loadMoreBtn').classList.remove('dNone');
    inputEmpty = true;
    init();
}


function setCardsArea(search) {
    document.getElementById('cardsArea').innerHTML = '';
    filter(search);
}


function filter(search) {
    for (let i = 0; i < pokemon.length; i++) {
        let searchedname = pokemon[i];
        if (searchedname.toLowerCase().includes(search)) {
            loadPokemon(i);
        }
    }
}