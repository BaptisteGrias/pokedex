let allPokemon = [];
let endArray = [];
const searchInput = document.querySelector('.search-poke input');
const listPoke = document.querySelector('.list-poke');
const loader = document.querySelector('.loader');
const types = {
  grass: '#78c850',
  ground: '#E2BF65',
  dragon: '#6F35FC',
  fire: '#F58271',
  electric: '#F7D02C',
  fairy: '#D685AD',
  poison: '#966DA3',
  bug: '#B3F594',
  water: '#6390F0',
  normal: '#D9D5D8',
  psychic: '#F95587',
  flying: '#A98FF3',
  fighting: '#C25956',
  rock: '#B6A136',
  ghost: '#735797',
  ice: '#96D9D6',
};

function fetchPokemonBase() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((response) => response.json())
    .then((allPoke) => {
      allPoke.results.forEach((pokemon) => {
        fetchFullPokemon(pokemon);
      });
    });
}
fetchPokemonBase();

function fetchFullPokemon(pokemon) {
  let objFullPokemon = {};
  let url = pokemon.url;
  let nameP = pokemon.name;

  fetch(url)
    .then((response) => response.json())
    .then((pokeData) => {
      objFullPokemon.pic = pokeData.sprites.front_default;
      objFullPokemon.type = pokeData.types[0].type.name;
      objFullPokemon.id = pokeData.id;

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then((response) => response.json())
        .then((pokeData) => {
          objFullPokemon.name = pokeData.names[8].name;
          allPokemon.push(objFullPokemon);

          if (allPokemon.length === 151) {
            endArray = allPokemon
              .sort((a, b) => {
                return a.id - b.id;
              })
              .slice(0, 21);

            createCard(endArray);
            loader.style.display = 'none';
          }
        });
    });
}

// card creation

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement('li');
    let color = types[arr[i].type];
    card.style.background = color;
    const txtCard = document.createElement('h5');
    txtCard.innerText = arr[i].name;
    const idCard = document.createElement('p');
    idCard.innerText = `ID# ${arr[i].id}`;
    const imgCard = document.createElement('img');
    imgCard.src = arr[i].pic;

    card.appendChild(imgCard);
    card.appendChild(txtCard);
    card.appendChild(idCard);

    listPoke.appendChild(card);
  }
}

// infinit scroll

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 20) {
    addPoke(6);
  }
});

let index = 21;

function addPoke(nb) {
  if (index > 151) {
    return;
  }
  const arrToAdd = allPokemon.slice(index, index + nb);
  //   console.log(index, index + nb);
  createCard(arrToAdd);
  index += nb;
}

// search pokemon with the button

// const formSearch = document.querySelector('form');
// formSearch.addEventListener('submit', (e) => {
//     e.preventDefault();
//     search()
// })

// search pokemon without the button

searchInput.addEventListener('keyup', search);
function search() {
  if (index < 151) {
    addPoke(130);
  }

  let filter, allLi, titleValue, allTitles;
  filter = searchInput.value.toUpperCase();
  allLi = document.querySelectorAll('li');
  allTitles = document.querySelectorAll('li > h5');

  for (i = 0; i < allLi.length; i++) {
    titleValue = allTitles[i].innerText;

    if (titleValue.toUpperCase().indexOf(filter) > -1) {
      allLi[i].style.display = 'flex';
    } else {
      allLi[i].style.display = 'none';
    }
  }
}

// anim input

searchInput.addEventListener('input', function (e) {
  if (e.target.value !== '') {
    e.target.parentNode.classList.add('active-input');
  } else if (e.target.value === '') {
    e.target.parentNode.classList.remove('active-input');
  }
});
