/**
 * @fileoverview Галерея
 * @author Oksana Semonenko
 */

'use strict';

// define(function() {
//   /** @constructor */
//   var self = this;
//   this.galleryContainer = document.querySelector('.gallery-overlay');
//   var galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');
//   var closeButton = this.galleryContainer.querySelector('.gallery-overlay-close');
//
//   /** @type {Array.<Object>} */
//   this.galleryPictures = [];
//   /** @type {number} */
//   this.pictureIndexToShow = 0;
//   //Обработчик события клика по фотографии, показывает следующую фотографию
//   this.onPhotoClick = function(evt) {
//     evt.preventDefault();
//     if (self.pictureIndexToShow <= self.galleryPictures.length) {
//       self.pictureIndexToShow++;
//       self.showPicture(self.pictureIndexToShow);
//     } else {
//       self.pictureIndexToShow = 0;
//     }
//   };
//   //Обработчик клавиатурных событий, вызывает закрытие галереи по нажатию Esc
//   this.onDocumentKeyDown = function(evt) {
//     evt.preventDefault();
//     if (event.keyCode === 27) {
//       self.hideGallery();
//     }
//   };
//   //Обработчик события клика по закрывающей кнопке, вызывает закрытие галереи
//   this.onCloseButtonClick = function(evt) {
//     evt.preventDefault();
//     self.hideGallery();
//   };
//   //Обработчик события клика по оверлею вокруг фотографии, вызывает закрытие галереи
//   this.onGalleryOverlayClick = function(evt) {
//     if (evt.target !== galleryImage &&
//       evt.target !== closeButton) {
//       evt.preventDefault();
//       self.hideGallery();
//     }
//   };
//   //Добавляет обработчики событий
//   this.addEventListeners = function() {
//     galleryImage.addEventListener('click', this.onPhotoClick);
//     document.addEventListener('keydown', this.onDocumentKeyDown);
//     closeButton.addEventListener('click', this.onCloseButtonClick);
//     this.galleryContainer.addEventListener('click', this.onGalleryOverlayClick);
//   };
//   //Удаляет обработчики событий
//   this.removeEventListeners = function() {
//     galleryImage.removeEventListener('click', this.onPhotoClick);
//     document.removeEventListener('keydown', this.onDocumentKeyDown);
//     closeButton.removeEventListener('click', this.onCloseButtonClick);
//     this.galleryContainer.removeEventListener('click', this.onGalleryOverlayClick);
//   };
//   //Функция показа фотографии по ее индексу в массиве
//   this.showPicture = function(pictureIndex) {
//     this.pictureIndexToShow = pictureIndex;
//     this.picture = this.galleryPictures[pictureIndex];
//     galleryImage.src = this.picture.url;
//     galleryImage.width = '642';
//     this.galleryContainer.querySelector('.comments-count').textContent = this.picture.comments;
//     this.galleryContainer.querySelector('.likes-count').textContent = this.picture.likes;
//   };
//   //Функция, которая скрывает галерею
//   this.hideGallery = function() {
//     this.galleryContainer.classList.add('invisible');
//     this.removeEventListeners();
//   };
//   /**
//    * @param {Array.<pictures>} pictures
//    */
//   return {
//     //Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
//     savePictures: function(pictures) {
//       self.galleryPictures = pictures;
//     },
//     //Функция показа галереи
//     showGallery: function(pictureIndex) {
//       self.galleryContainer.classList.remove('invisible');
//       self.addEventListeners();
//       self.showPicture(pictureIndex);
//     }
//   };
// });

define(function() {
  /** @constructor */
  var that = this;
  this.galleryContainer = document.querySelector('.gallery-overlay');
  var galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');
  var closeButton = this.galleryContainer.querySelector('.gallery-overlay-close');

  /** @type {Array.<Object>} */
  this.galleryPictures = [];
  /** @type {number} */
  this.pictureIndexToShow = 0;
  // /** @type {string} */
 // this.pictureHashToShow = '';
  var re = /#photo\/(\S+)/;
  this.pictureUrl = function(pictureIndex) {
    return that.galleryPictures[pictureIndex].url;
  };
  //Обработчик события клика по фотографии, показывает следующую фотографию
  this.onPhotoClick = function(evt) {
    evt.preventDefault();
    location.hash = 'photo/' + that.pictureUrl(that.pictureIndexToShow);
    that.pictureIndexToShow = (that.pictureIndexToShow + 1) % that.galleryPictures.length;
  };
  //Обработчик клавиатурных событий, вызывает закрытие галереи по нажатию Esc
  this.onDocumentKeyDown = function(evt) {
    evt.preventDefault();
    if (event.keyCode === 27) {
      location.hash = '';
    }
  };
  //Обработчик события клика по закрывающей кнопке, вызывает закрытие галереи
  this.onCloseButtonClick = function(evt) {
    evt.preventDefault();
    location.hash = '';
  };
  //Обработчик события клика по оверлею вокруг фотографии, вызывает закрытие галереи
  this.onGalleryOverlayClick = function(evt) {
    if (evt.target !== galleryImage &&
      evt.target !== closeButton) {
      evt.preventDefault();
      location.hash = '';
    }
  };
  //Обработчик изменения хэша
  this.onHashChange = function() {
    that.restoreFromHash();
  };
  this.restoreFromHash = function() {
    var pictureUrl = location.hash.match(re)[1];
    that.showGallery(pictureUrl);
  };
  //Добавляет объекту window обработчик события изменения хэша
  window.addEventListener('hashchange', this.onHashChange);
  //Добавляет обработчики событий
  this.addEventListeners = function() {
    galleryImage.addEventListener('click', this.onPhotoClick);
    document.addEventListener('keydown', this.onDocumentKeyDown);
    closeButton.addEventListener('click', this.onCloseButtonClick);
    this.galleryContainer.addEventListener('click', this.onGalleryOverlayClick);
  };
  //Удаляет обработчики событий
  this.removeEventListeners = function() {
    galleryImage.removeEventListener('click', this.onPhotoClick);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    closeButton.removeEventListener('click', this.onCloseButtonClick);
    this.galleryContainer.removeEventListener('click', this.onGalleryOverlayClick);
  };
  //Функция показа фотографии по ее индексу в массиве
  this.showPicture = function(pictureIndexOrUrl) {
    if (typeof (pictureIndexOrUrl) === 'number') {
      this.pictureIndexToShow = pictureIndexOrUrl;
      this.picture = this.galleryPictures[pictureIndexOrUrl];
      galleryImage.src = this.picture.url;
      galleryImage.width = '642';
      this.galleryContainer.querySelector('.comments-count').textContent = this.picture.comments;
      this.galleryContainer.querySelector('.likes-count').textContent = this.picture.likes;
    } else if (typeof (pictureIndexOrUrl) === 'string') {
      //this.pictureHashToShow = pictureHash;
      galleryImage.src = pictureIndexOrUrl;
    }
  };
  //Функция, которая скрывает галерею
  this.hideGallery = function() {
    this.galleryContainer.classList.add('invisible');
    this.removeEventListeners();
  };
  this.showGallery = function(pictureIndexOrUrl) {
    that.galleryContainer.classList.remove('invisible');
    that.addEventListeners();
    that.showPicture(pictureIndexOrUrl);
  };
  /**
   * @param {Array.<pictures>} pictures
   */
  return {
    //Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
    savePictures: function(pictures) {
      that.galleryPictures = pictures;
    },
    //Функция показа галереи
    showGallery: that.showGallery
  };
});
