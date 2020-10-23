'use strict';
// VARIABLES DECLARADAS
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
const resultList = document.querySelector('.js-results');
// favorite el div no el ul
const favorite = document.querySelector('.js-favorite');
// const buttonRemove = document.querySelector('.js-button-remove');

// let favorites = []?? supongo que hay que hacer otra xra favoritos por lo que dijo migul;

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

function handleButtonClick() {
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
    let imageTVShow = 'https://via.placeholder.com/210x295/ffffff/666666/?';
    let classItem = 'item-list-' + (i + 1);

    if (searchResults[i].show.image) {
      imageTVShow = searchResults[i].show.image.medium;
    }

    resultList.innerHTML +=
      '<li class="' +
      classItem +
      '" onclick="selectShow(' +
      i +
      ')"><img src=' +
      imageTVShow +
      '><h3>' +
      titleTVShow +
      '</h3></li>';

    console.log('results');

    // resultList.innerHTML = productsCode; para comprobar que esta bien
    // console.log('pintar');
  }
}

function selectShow(index) {
  console.log('selected', searchResults[index].show.name);
}
// button.click();
