


function loadPokemonApiImgInfo() {
    let pokemonImage = document.getElementById('pokemonImg');
    pokemonImage.src = pokemonImg['sprites']['other']['official-artwork']['front_default'];

    let goNextImg = document.getElementById('goNextImg');
    let goNextImgHTML = '';
    return;
}

async function loadApi(pokemonKlein) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonKlein}`;
    let response = await fetch(url);
    pokemonImg = await response.json();
}