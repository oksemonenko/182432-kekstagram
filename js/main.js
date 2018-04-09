/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".js/main.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
	  __webpack_require__(1),
	  __webpack_require__(2),
	  __webpack_require__(3),
	  __webpack_require__(4),
	  __webpack_require__(5),
	  __webpack_require__(6),
	  __webpack_require__(8),
	  __webpack_require__(9)
	]; (function(filter, FilterType, load, utilities, gallery, Picture) {
	  // Прячет блок с фильтрами
	  var filtersContainer = document.querySelector('.filters');
	  filtersContainer.classList.add('hidden');
	  var picturesContainer = document.querySelector('.pictures');
	  /* @constant {String} */
	  var PICTURES_DATA_URL = '//up.htmlacademy.ru/assets/js_intensive/jsonp/pictures.js';

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
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});


/***/ }
/******/ ]);
