'use strict';

// Прячет блок с фильтрами

var filtersContainer = document.querySelector('.filters');
filtersContainer.classList.add('hidden');

//Ищет тег template и блок для загрузки клонированных элементов

var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 15000;

/* @constant {String} */
var PICTURES_DATA_URL = '//o0.github.io/assets/json/pictures.json';

/** @type {Array.<Object>} */
var pictures = [];

/** @type {Array.<Object>} */
var filteredPictures = [];

/** @constant {number} */
var PAGE_SIZE = 12;

/** @type {number} */
var pageNumber = 0;

/** @enum {number} */
var Filter = {
  'POPULAR': 'filter-popular',
  'NEW': 'filter-new',
  'DISCUSSED': 'filter-discussed'
};

/** @constant {Filter} */
var DEFAULT_FILTER = Filter.POPULAR;

/** @constant {string} */
var ACTIVE_FILTER_CLASSNAME = 'picture-filter-active';

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
  imageLoadTimeout = setTimeout(function() {
    imageFromData.src = '';
    imageFromData.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  return element;
};

/** @param {function(Array.<Object>)} callback*/
var getPictures = function(callback) {
  var xhr = new XMLHttpRequest();
  /**@param evt */
  xhr.onreadystatechange = function(evt) {
    if (xhr.readyState !== 4) {
      picturesContainer.classList.add('pictures-loading');
    } else {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
      picturesContainer.classList.remove('pictures-loading');
    }
  };
  xhr.timeout = 15000;
  xhr.onerror = xhr.ontimeout = function() {
    picturesContainer.classList.add('pictures-failure');
    picturesContainer.classList.remove('pictures-loading');
  };
  xhr.open('GET', PICTURES_DATA_URL);
  xhr.send();
};

/** @param {Array.<Object>} pics
 * @param {number} page
 * @param {boolean=} replace
 * */
var renderPictures = function(pics, page, replace) {
  if (replace) {
    picturesContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  pics.slice(from, to).forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });
};

/**
 * @param {Array.<Object>} pics
 * @param {string} filter
 */
var getFilteredPictures = function(pics, filter) {
  var picturesToFilter = pictures.slice(0);
  switch (filter) {
    case Filter.POPULAR:
      break;
    case Filter.DISCUSSED:
      picturesToFilter.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
    case Filter.NEW:
      picturesToFilter.filter(function(picsDate) {
        var twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).valueOf();
        var dateOfPicture = new Date(picsDate.date).valueOf();
        return dateOfPicture > twoWeeksAgo;
      });
      picturesToFilter.sort(function(a, b) {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      });
      break;
  }
  return picturesToFilter;
};

/** @param {string} filter */
var realiseFilter = function(filter) {
  filteredPictures = getFilteredPictures(pictures, filter);
  pageNumber = 0;
  renderPictures(filteredPictures, pageNumber, true);
  var activeFilter = filtersContainer.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
  if (activeFilter) {
    activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
  }
  var filterToActivate = document.getElementById(filter);
  filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);
};

/** @param {boolean} enabled */
var realiseFilters = function(enabled) {
  var filters = document.querySelectorAll('.filters-radio');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = enabled ? function() {
      realiseFilter(this.id);
    } : null;
  }
};

/** @return {boolean} */
var isBottomReached = function() {
  var GAP = 100;
  var bodyElement = document.querySelector('body');
  var bodyPosition = bodyElement.getBoundingClientRect();
  return bodyPosition.bottom - window.innerHeight - GAP <= 0;
};

/**
 * @param {Array} pics
 * @param {number} page
 * @param {number} pageSize
 * @return {boolean}
 */
var isNextPageAvailable = function(pics, page, pageSize) {
  return page < Math.floor(pics.length / pageSize);
};

var realiseScroll = function() {
  window.addEventListener('scroll', function() {
    if (isBottomReached() &&
        isNextPageAvailable(pictures, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderPictures(filteredPictures, pageNumber);
    }
  }, 100);
};

getPictures(function(loadedPictures) {
  pictures = loadedPictures;
  realiseFilters(true);
  realiseFilter(DEFAULT_FILTER);
  realiseScroll();
});

// Отображает блок с фильтрами

filtersContainer.classList.remove('hidden');
