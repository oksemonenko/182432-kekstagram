'use strict';

// Прячет блок с фильтрами

var filters = document.querySelector('.filters');
filters.classList.add('hidden');

//Ищет тег template и блок для загрузки клонированных элементов

var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

/* @constant {String} */
var PICTURES_DATA_URL = '//o0.github.io/assets/json/pictures.json';

/**Функция, которая создает DOM-элемент картинки и добавляет его на страницу
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */
var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  var imageFromData = element.querySelector('img');
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
  container.appendChild(element);
  /**
   * @type {Image}
   */
  var image = new Image();
  var imageLoadTimeout;
  image.onload = function() {
    clearTimeout(imageLoadTimeout);
    imageFromData.src = image.src;
    imageFromData.width = '182';
    imageFromData.height = '182';
  };
  image.onerror = function() {
    imageFromData.classList.add('picture-load-failure');
  };
  image.src = data.url;

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 15000;
  imageLoadTimeout = setTimeout(function() {
    imageFromData.src = '';
    imageFromData.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  return element;
};

/** @param {function(Array.<Object>)} callback*/
var getPictures = function(callback) {
  var xhr = new XMLHttpRequest();
  /** @param {ProgressEvent} */
  // xhr.onload = function(evt) {
  //   var loadedData = JSON.parse(evt.target.response);
  //   callback(loadedData);
  // };
  xhr.onreadystatechange = function(evt) {
    if (xhr.readyState < 4) {
      picturesContainer.classList.add('pictures-loading');
    } else {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
      picturesContainer.classList.remove('pictures-loading');
    }
  };
  xhr.onerror = function() {
    picturesContainer.classList.add('pictures-failure');
  };
  xhr.timeout = 15000;
  xhr.ontimeout = function() {
    picturesContainer.classList.add('pictures-failure');
  };
  xhr.open('GET', PICTURES_DATA_URL);
  xhr.send();
};

/** @param {Array.<Object>} pictures */
var receivedPictures = function(pictures) {
  pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });
};

getPictures(function(loadedPictures) {
  var pictures = loadedPictures;
  receivedPictures(pictures);
});

// Отображает блок с фильтрами

filters.classList.remove('hidden');
