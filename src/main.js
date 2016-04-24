/**
 * @fileoverview Фотографии: загрузка, включение фильтрации и постраничная
 * отрисовка
 * @author Oksana Semonenko
 */

'use strict';

// require('./resizer');
// require('./upload');
// require('./pictures');

require([
  './filter/filter',
  './filter/filter-type',
  './picture',
  './load',
  './utilities',
  './resizer',
  './upload'
], function(filter, FilterType, getPictureElement, load, utilities) {
  // Прячет блок с фильтрами
  var filtersContainer = document.querySelector('.filters');
  filtersContainer.classList.add('hidden');
  var picturesContainer = document.querySelector('.pictures');
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

  /** @constant {Filter} */
  var DEFAULT_FILTER = FilterType.POPULAR;

  /** @constant {number} */
  var SCROLL_TIMEOUT = 100;
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
  /** @param {FilterType} filterType */
  var realiseFilter = function(filterType) {
    filteredPictures = filter(pictures, filterType);
    pageNumber = 0;
    renderPictures(filteredPictures, pageNumber, true);
    var activeFilter = filtersContainer.querySelector('input[type=radio]:checked');
    if (activeFilter) {
      activeFilter.removeAttribute('checked');
    }
    var filterToActivate = filtersContainer.querySelector('input[type=radio][value=' + filterType + ']');
    filterToActivate.setAttribute('checked', true);
    addPageUntilScreenFull();
  };

  var realiseFilters = function() {
    filtersContainer.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('filters-radio')) {
        realiseFilter(evt.target.value);
      }
    });
  };
  var realiseScroll = function() {
    var scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        if (utilities.isBottomReached() &&
          utilities.isNextPageAvailable(pictures.length, pageNumber, PAGE_SIZE)) {
          pageNumber++;
          renderPictures(filteredPictures, pageNumber);
        }
      }, SCROLL_TIMEOUT);
    });
  };
  //Проверка того, все ли фотографии показаны при большом разрешении экрана
  function addPageUntilScreenFull() {
    var windowHeight = document.documentElement.clientHeight;
    var picturesContainerBottom = picturesContainer.getBoundingClientRect().bottom;
    if (picturesContainerBottom < windowHeight) {
      pageNumber++;
      renderPictures(filteredPictures, pageNumber);
      addPageUntilScreenFull();
    }
  }

  load(PICTURES_DATA_URL, function(loadedPictures) {
    pictures = loadedPictures;
    realiseFilters();
    realiseFilter(DEFAULT_FILTER);
    realiseScroll();
  });

// Отображает блок с фильтрами

  filtersContainer.classList.remove('hidden');
});
