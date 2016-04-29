/**
 * @fileoverview Галерея
 * @author Oksana Semonenko
 */

'use strict';

// define(function() {
//   var galleryContainer = document.querySelector('.gallery-overlay');
//   var galleryImage = galleryContainer.querySelector('.gallery-overlay-image');
//   var closeButton = galleryContainer.querySelector('.gallery-overlay-close');
//
//   /** @type {Array.<Object>} */
//   var galleryPictures = [];
//   /** @type {number} */
//   var pictureIndexToShow = 0;
//   //Обработчик события клика по фотографии, показывает следующую фотографию
//   var onPhotoClick = function(evt) {
//     evt.preventDefault();
//     if (pictureIndexToShow <= galleryPictures.length) {
//       pictureIndexToShow++;
//       showPicture(pictureIndexToShow);
//     } else {
//       pictureIndexToShow = 0;
//     }
//   };
//   //Обработчик клавиатурных событий, вызывает закрытие галереи по нажатию Esc
//   var onDocumentKeyDown = function(evt) {
//     evt.preventDefault();
//     if (event.keyCode === 27) {
//       hideGallery();
//     }
//   };
//   //Обработчик события клика по закрывающей кнопке, вызывает закрытие галереи
//   var onCloseButtonClick = function(evt) {
//     evt.preventDefault();
//     hideGallery();
//   };
//   //Обработчик события клика по оверлею вокруг фотографии, вызывает закрытие галереи
//   var onGalleryOverlayClick = function(evt) {
//     if (evt.target !== galleryImage &&
//     evt.target !== closeButton) {
//       evt.preventDefault();
//       hideGallery();
//     }
//   };
//   //Добавляет обработчики событий
//   var addEventListeners = function() {
//     galleryImage.addEventListener('click', onPhotoClick);
//     document.addEventListener('keydown', onDocumentKeyDown);
//     closeButton.addEventListener('click', onCloseButtonClick);
//     galleryContainer.addEventListener('click', onGalleryOverlayClick);
//   };
//   //Удаляет обработчики событий
//   var removeEventListeners = function() {
//     galleryImage.removeEventListener('click', onPhotoClick);
//     document.removeEventListener('keydown', onDocumentKeyDown);
//     closeButton.removeEventListener('click', onCloseButtonClick);
//     galleryContainer.removeEventListener('click', onGalleryOverlayClick);
//   };
//   //Функция показа фотографии по ее индексу в массиве
//   var showPicture = function(pictureIndex) {
//     pictureIndexToShow = pictureIndex;
//     var picture = galleryPictures[pictureIndex];
//     galleryImage.src = picture.url;
//     galleryImage.width = '642';
//     galleryContainer.querySelector('.comments-count').textContent = picture.comments;
//     galleryContainer.querySelector('.likes-count').textContent = picture.likes;
//   };
//   //Функция, которая скрывает галерею
//   var hideGallery = function() {
//     galleryContainer.classList.add('invisible');
//     removeEventListeners();
//   };
//   /**
//    * @param {Array.<pictures>} pictures
//    */
//   return {
//     //Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
//     savePictures: function(pictures) {
//       galleryPictures = pictures;
//     },
//     //Функция показа галереи
//     showGallery: function(pictureIndex) {
//       galleryContainer.classList.remove('invisible');
//       addEventListeners();
//       showPicture(pictureIndex);
//     }
//   };
// });

define(function() {
  /** @constructor */
  var self = this;
  this.galleryContainer = document.querySelector('.gallery-overlay');
  var galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');
  var closeButton = this.galleryContainer.querySelector('.gallery-overlay-close');

  /** @type {Array.<Object>} */
  this.galleryPictures = [];
  /** @type {number} */
  this.pictureIndexToShow = 0;
  //Обработчик события клика по фотографии, показывает следующую фотографию
  this.onPhotoClick = function(evt) {
    evt.preventDefault();
    if (self.pictureIndexToShow <= self.galleryPictures.length) {
      self.pictureIndexToShow++;
      self.showPicture(self.pictureIndexToShow);
    } else {
      self.pictureIndexToShow = 0;
    }
  };
  //Обработчик клавиатурных событий, вызывает закрытие галереи по нажатию Esc
  this.onDocumentKeyDown = function(evt) {
    evt.preventDefault();
    if (event.keyCode === 27) {
      self.hideGallery();
    }
  };
  //Обработчик события клика по закрывающей кнопке, вызывает закрытие галереи
  this.onCloseButtonClick = function(evt) {
    evt.preventDefault();
    self.hideGallery();
  };
  //Обработчик события клика по оверлею вокруг фотографии, вызывает закрытие галереи
  this.onGalleryOverlayClick = function(evt) {
    if (evt.target !== galleryImage &&
      evt.target !== closeButton) {
      evt.preventDefault();
      self.hideGallery();
    }
  };
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
  this.showPicture = function(pictureIndex) {
    this.pictureIndexToShow = pictureIndex;
    this.picture = this.galleryPictures[pictureIndex];
    galleryImage.src = this.picture.url;
    galleryImage.width = '642';
    this.galleryContainer.querySelector('.comments-count').textContent = this.picture.comments;
    this.galleryContainer.querySelector('.likes-count').textContent = this.picture.likes;
  };
  //Функция, которая скрывает галерею
  this.hideGallery = function() {
    this.galleryContainer.classList.add('invisible');
    this.removeEventListeners();
  };
  /**
   * @param {Array.<pictures>} pictures
   */
  return {
    //Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
    savePictures: function(pictures) {
      self.galleryPictures = pictures;
    },
    //Функция показа галереи
    showGallery: function(pictureIndex) {
      self.galleryContainer.classList.remove('invisible');
      self.addEventListeners();
      self.showPicture(pictureIndex);
    }
  };
});
