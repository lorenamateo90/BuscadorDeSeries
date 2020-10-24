'use strict';
// VARIABLES DECLARADAS
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
const resultList = document.querySelector('.js-results');

// favorite el div no el ul
const favorite = document.querySelector('.js-favorite');
// const buttonRemove = document.querySelector('.js-button-remove');
const imageTVShowDefault =
  'https://via.placeholder.com/210x295/ffffff/666666/?';

// PETICIÓN AL SERVIDOR
// tengo que hacer una constante para luego poder pintarla,
// ahora mismo esa no sirve para nada pero al verlo sabes q luego va a haber un array relleno
let searchResults = [];
function getApiData(datoBusqueda) {
  fetch('http://api.tvmaze.com/search/shows?q=' + datoBusqueda)
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
let favorites = [];

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
  console.log(element.id);
  let itemSelected = searchResults.find((itemsResult) => {
    console.log(itemsResult);
    return itemsResult.show.id === parseInt(element.id);
  });
  console.log(itemSelected);
}

function selectShow(index) {
  console.log('selected', searchResults[index].show.name);
}
