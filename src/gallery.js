/**
 * @fileoverview Галерея
 * @author Oksana Semonenko
 */

'use strict';

define(function() {
  var galleryContainer = document.querySelector('.gallery-overlay');
  var galleryImage = galleryContainer.querySelector('.gallery-overlay-image');
  var closeButton = galleryContainer.querySelector('.gallery-overlay-close');

  /** @type {Array.<Object>} */
  var galleryPictures = [];
  /** @type {number} */
  var pictureIndexToShow = 0;
  //Обработчик события клика по фотографии, показывает следующую фотографию
  var onPhotoClick = function(evt) {
    evt.preventDefault();
    if (pictureIndexToShow <= galleryPictures.length) {
      pictureIndexToShow++;
      showPicture(pictureIndexToShow);
    } else {
      pictureIndexToShow = 0;
    }
  };
  //Обработчик клавиатурных событий, вызывает закрытие галереи по нажатию Esc
  var onDocumentKeyDown = function(evt) {
    evt.preventDefault();
    if (event.keyCode === 27) {
      hideGallery();
    }
  };
  //Обработчик события клика по закрывающей кнопке, вызывает закрытие галереи
  var onCloseButtonClick = function(evt) {
    evt.preventDefault();
    hideGallery();
  };
  //Обработчик события клика по оверлею вокруг фотографии, вызывает закрытие галереи
  var onGalleryOverlayClick = function(evt) {
    if (evt.target !== galleryImage &&
    evt.target !== closeButton) {
      evt.preventDefault();
      hideGallery();
    }
  };
  //Добавляет обработчики событий
  var addEventListeners = function() {
    galleryImage.addEventListener('click', onPhotoClick);
    document.addEventListener('keydown', onDocumentKeyDown);
    closeButton.addEventListener('click', onCloseButtonClick);
    galleryContainer.addEventListener('click', onGalleryOverlayClick);
  };
  //Удаляет обработчики событий
  var removeEventListeners = function() {
    galleryImage.removeEventListener('click', onPhotoClick);
    document.removeEventListener('keydown', onDocumentKeyDown);
    closeButton.removeEventListener('click', onCloseButtonClick);
    galleryContainer.removeEventListener('click', onGalleryOverlayClick);
  };
  //Функция показа фотографии по ее индексу в массиве
  var showPicture = function(pictureIndex) {
    pictureIndexToShow = pictureIndex;
    var picture = galleryPictures[pictureIndex];
    galleryImage.src = picture.url;
    galleryImage.width = '642';
    galleryContainer.querySelector('.comments-count').textContent = picture.comments;
    galleryContainer.querySelector('.likes-count').textContent = picture.likes;
  };
  //Функция, которая скрывает галерею
  var hideGallery = function() {
    galleryContainer.classList.add('invisible');
    removeEventListeners();
  };
  /**
   * @param {Array.<pictures>} pictures
   */
  return {
    //Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
    savePictures: function(pictures) {
      galleryPictures = pictures;
    },
    //Функция показа галереи
    showGallery: function(pictureIndex) {
      galleryContainer.classList.remove('invisible');
      addEventListeners();
      showPicture(pictureIndex);
    }
  };
});
