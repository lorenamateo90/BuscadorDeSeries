'use strict';
// VARIABLES DECLARADAS
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
const resultList = document.querySelector('.js-results');
const favoriteList = document.querySelector('.js-favorite-list');
const favorite = document.querySelector('.js-favorite');
const imageTVShowDefault =
  'https://via.placeholder.com/210x295/ffffff/666666/?';

// ARRAYS PRINCIPALES (SERIES BUSCADAS Y FAVORITOS)
let searchResults = [];
let favorites = [];

// PETICIÓN AL SERVIDOR
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

// EVENTO BOTÓN PARA BUSCAR LAS SERIES QUE PONGAN EN EL INPUT
function handleButtonClick(evento) {
  getApiData(inputSearch.value);
}
buttonSearch.addEventListener('click', handleButtonClick);

// PINTAR LAS SERIES QUE ME DA EL SERVIDOR TRAS SER BUSCADAS
function paintProducts() {
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
// FUNCIÓN PARA ESCUCHAR EL EVENTO EN LAS SERIES BUSCADAS
function getElement() {
  const items = document.querySelectorAll('.js-item');
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', addTofavorites);
  }
}
// FUNCIÓN PARA EJECUTAR LAS ACCIONES NECEARIAS EN LOS ELEMENTOS CLICKADOS.
function addTofavorites(ev) {
  let element = ev.currentTarget;
  let itemSelected = searchResults.find(function (itemsResult) {
    return itemsResult.show.id === parseInt(element.id);
  });
  if (!isFavorite(itemSelected)) {
    favorites.push(itemSelected);
    setLocalStorage();
    paintFavorite(itemSelected);
  }
}
function isFavorite(item) {
  let existItem = false;
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].show.id === item.show.id) {
      existItem = true;
    }
  }
  return existItem;
}
// FUNCION PARA PINTAR LOS ELEMENTOS FAVORITOS SELECCIONADOS
function paintFavorite(itemSelected) {
  let itemFavoriteList = '';
  let titleTVShow = itemSelected.show.name;
  let idTVShow = itemSelected.show.id;
  let imageTVShow = imageTVShowDefault;
  if (itemSelected.show.image) {
    imageTVShow = itemSelected.show.image.medium;
  }

  itemFavoriteList +=
    '<li class="js-fav-item" id="' +
    idTVShow +
    '"><img src=' +
    imageTVShow +
    '><h3>' +
    titleTVShow +
    '</h3></li>';
  favoriteList.innerHTML += itemFavoriteList;
}

// GUARDAR INFO DE FAVORITOS EN EL LOCALSTORAGE
function setLocalStorage() {
  localStorage.setItem('favoriteList', JSON.stringify(favorites));
}
function getLocalStore() {
  if (localStorage.getItem('favoriteList')) {
    favorites = JSON.parse(localStorage.getItem('favoriteList'));
    for (let i = 0; i < favorites.length; i++) {
      paintFavorite(favorites[i]);
    }
  }
}
getLocalStore();
