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
    imageFromData.src = data.url;
    imageFromData.width = '182';
    imageFromData.height = '182';
  };
  image.onerror = function() {
    imageFromData.classList.add('picture-load-failure');
  };

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 15000;
  imageLoadTimeout = setTimeout(function() {
    imageFromData.src = '';
    imageFromData.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  return element;
};

window.pictures.forEach(function(picture) {
  getPictureElement(picture, picturesContainer);
});

// Отображает блок с фильтрами

filters.classList.remove('hidden');
