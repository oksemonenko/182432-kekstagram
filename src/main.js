'use strict';

require([
  './filter/filter',
  './filter/filter-type',
  './load',
  './utilities',
  './gallery',
  './picture/picture',
  './resizer',
  './upload'
], function(filter, FilterType, load, utilities, gallery, Picture) {
  // Прячет блок с фильтрами
  var filtersContainer = document.querySelector('.filters');
  filtersContainer.classList.add('hidden');
  var picturesContainer = document.querySelector('.pictures');
  /* @constant {String} */
  var PICTURES_DATA_URL = 'json/pictures.json';

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
  /** @type {string} */
  var lastFilter = localStorage.getItem('lastFilter') || DEFAULT_FILTER;

  /** @constant {number} */
  var SCROLL_TIMEOUT = 100;

  /** Массив отрисованных объектов фотографий
   * @type {Array.<Picture>} */
  var renderedPictures = [];

  /**Функция отрисовки фотографий
   *  @param {Array.<Object>} pics
   * @param {number} page
   * @param {boolean=} replace
   * */
  var renderPictures = function(pics, page, replace) {
    if (replace) {
      renderedPictures.forEach(function(picture) {
        picture.remove();
      });
      renderedPictures = [];
    }
    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pictureIndex = from;
    pics.slice(from, to).forEach(function(picture) {
      renderedPictures.push(new Picture(picture, picturesContainer, pictureIndex++));
    });
  };

  /**Функция фильтрации фотографий
   *  @param {FilterType} filterType */
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
    gallery.savePictures(filteredPictures);
    localStorage.setItem('lastFilter', activeFilter.value);
    gallery.onHashChange();
  };

  //Функция включения фильтрации: добавляет обработчики событий
  //при клике на кнопки фильтров
  var realiseFilters = function() {
    filtersContainer.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('filters-radio')) {
        realiseFilter(evt.target.value);
      }
    });
  };

  //Функция реализации скролла
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

  //Загрузка фотографий, установка фильрации и скролла
  load(PICTURES_DATA_URL, function(loadedPictures) {
    pictures = loadedPictures;
    realiseFilters();
    realiseFilter(lastFilter);
    realiseScroll();
  });

  // Отображает блок с фильтрами
  filtersContainer.classList.remove('hidden');
});
