'use strict';
// VARIABLES DECLARADAS
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
const resultList = document.querySelector('.js-results');
const favoriteList = document.querySelector('.js-favorite-list');
const favorite = document.querySelector('.js-favorite');
let searchResults = [];
let favorites = [];
// const buttonRemove = document.querySelector('.js-button-remove');
const imageTVShowDefault =
  'https://via.placeholder.com/210x295/ffffff/666666/?';

// PETICIÓN AL SERVIDOR
// tengo que hacer una constante para luego poder pintarla,
// ahora mismo esa no sirve para nada pero al verlo sabes q luego va a haber un array relleno

function getApiData(value) {
  fetch('http://api.tvmaze.com/search/shows?q=' + value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      searchResults = data;
      console.log(searchResults);
      paintProducts();
    });
}

function handleButtonClick(evento) {
  console.log('evento', evento);
  getApiData(inputSearch.value);
  console.log();
}

buttonSearch.addEventListener('click', handleButtonClick);

// PINTAR LAS SERIES QUE ME DA EL SERVIDOR
function paintProducts() {
  // se declara vacía pq es donde se va a pintar cada iteración del bucle
  let productsCode = '';
  for (let i = 0; i < searchResults.length; i++) {
    let titleTVShow = searchResults[i].show.name;
    let idTVShow = searchResults[i].show.id;
    let imageTVShow = imageTVShowDefault;
    if (searchResults[i].show.image) {
      imageTVShow = searchResults[i].show.image.medium;
    }

    productsCode +=
      '<li class="js-item" id="' +
      idTVShow +
      '"><img src=' +
      imageTVShow +
      '><h3>' +
      titleTVShow +
      '</h3></li>';
  }
  resultList.innerHTML = productsCode;
  getElement();
}

function getElement() {
  const items = document.querySelectorAll('.js-item');
  console.log('voy a mostrar los items', items, 'ya estan pintadas');
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', addTofavorites);
  }
}
// funcion para unir el id del favorito seleccionado con el del objeto
function addTofavorites(ev) {
  let element = ev.currentTarget;
  // console.log(element.id);
  let itemSelected = searchResults.find((itemsResult) => {
    // console.log(itemsResult);
    return itemsResult.show.id === parseInt(element.id);
  });
  // console.log(itemSelected);

  if (!isFavorite(itemSelected)) {
    favorites.push(itemSelected);
    // Una vez que he añadido un Item a favoritos, quiero que me lo guarde ne el Local storage
    setLocalStorage();
    paintFavorite(itemSelected);
  }

  console.log(favorites);
}

function isFavorite(item) {
  let existItem = false;
  for (let i = 0; i < favorites.length; i++) {
    if (parseInt(favorites[i].show.id) === parseInt(item.show.id)) {
      existItem = true;
    }
  }
  return existItem;
}

function paintFavorite(itemSelected) {
  let itemFavoriteList = '';
  let titleTVShow = itemSelected.show.name;
  let idTVShow = itemSelected.show.id;
  let imageTVShow = imageTVShowDefault;
  if (itemSelected.show.image) {
    imageTVShow = itemSelected.show.image.medium;
  }
  // Puedo cambiar el color con la clase en css o con add .class list
  itemFavoriteList +=
    '<li class="fav" id="' +
    idTVShow +
    '"><img src=' +
    imageTVShow +
    '><h3>' +
    titleTVShow +
    '</h3></li>';
  favoriteList.innerHTML += itemFavoriteList;
}

function selectShow(index) {
  console.log('selected', searchResults[index].show.name);
}

function setLocalStorage() {
  localStorage.setItem('favoriteList', JSON.stringify(favorites));
}
// si no existe favorite list en local storage no quiero que se ejecute porque me va a dar null/error pq va a ser un array vacio
function getLocalStore() {
  if (localStorage.getItem('favoriteList')) {
    favorites = JSON.parse(localStorage.getItem('favoriteList'));
    for (let i = 0; i < favorites.length; i++) {
      // invoco la funcion y va a recorrer cada item del array favorites
      paintFavorite(favorites[i]);
    }
  }
}

getLocalStore();
