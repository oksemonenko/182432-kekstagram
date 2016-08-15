/**
 * @fileoverview Конструктор галереи
 * @author Oksana Semonenko
 */

'use strict';

define(function() {
  /** @constructor */
  var Gallery = function() {
    this.galleryContainer = document.querySelector('.gallery-overlay');
    this.galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');
    this.closeButton = this.galleryContainer.querySelector('.gallery-overlay-close');
    /** @type {Array.<Object>} */
    this.galleryPictures = [];
    /** @type {number} */
    this.pictureIndexToShow = 0;
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onGalleryOverlayClick = this.onGalleryOverlayClick.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
    //Добавляет объекту window обработчик события изменения хэша
    window.addEventListener('hashchange', this.onHashChange);
  };
  //Получение адреса картинки из массива данных
  Gallery.prototype.pictureUrl = function(pictureIndex) {
    return this.galleryPictures[pictureIndex].url;
  };
  //Обработчик события клика по фотографии,записывает в хэш адрес фотографии
  Gallery.prototype.onPhotoClick = function(evt) {
    evt.preventDefault();
    this.pictureIndexToShow = (this.pictureIndexToShow + 1) % this.galleryPictures.length;
    location.hash = 'photo/' + this.pictureUrl(this.pictureIndexToShow);
  };
  //Обработчик клавиатурных событий, очищает хэш по нажатию Esc
  Gallery.prototype.onDocumentKeyDown = function(evt) {
    evt.preventDefault();
    if (event.keyCode === 27) {
      location.hash = '';
    }
  };
  //Обработчик события клика по закрывающей кнопке, очищает хэш
  Gallery.prototype.onCloseButtonClick = function(evt) {
    evt.preventDefault();
    location.hash = '';
  };
  //Обработчик события клика по оверлею вокруг фотографии, очищает хэш
  Gallery.prototype.onGalleryOverlayClick = function(evt) {
    if (evt.target !== this.galleryImage &&
      evt.target !== this.closeButton) {
      evt.preventDefault();
      location.hash = '';
    }
  };
  //Функция, которая скрывает галерею
  Gallery.prototype.hideGallery = function() {
    this.galleryContainer.classList.add('invisible');
    this.removeEventListeners();
  };
  //Обработчик события изменения хэша
  Gallery.prototype.onHashChange = function() {
    // Регулярное выражение для проверки хэша
    var re = /#photo\/(\S+)/;
    if (location.hash === '') {
      this.hideGallery();
    } else if (location.hash.match(re)) {
      var pictureUrl = location.hash.match(re)[1];
      this.showGallery(pictureUrl);
    }
  };
  //Добавляет обработчики событий
  Gallery.prototype.addEventListeners = function() {
    this.galleryImage.addEventListener('click', this.onPhotoClick);
    document.addEventListener('keydown', this.onDocumentKeyDown);
    this.closeButton.addEventListener('click', this.onCloseButtonClick);
    this.galleryContainer.addEventListener('click', this.onGalleryOverlayClick);
  };
  //Удаляет обработчики событий
  Gallery.prototype.removeEventListeners = function() {
    this.galleryImage.removeEventListener('click', this.onPhotoClick);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    this.closeButton.removeEventListener('click', this.onCloseButtonClick);
    this.galleryContainer.removeEventListener('click', this.onGalleryOverlayClick);
  };
  //Функция показа фотографии по ее индексу в массиве
  Gallery.prototype.showPictureByIndex = function(pictureIndex) {
    this.pictureIndexToShow = pictureIndex;
    this.picture = this.galleryPictures[pictureIndex];
    this.galleryImage.src = this.picture.url;
    this.galleryImage.width = '642';
    this.galleryImage.height = '642';
    this.galleryContainer.querySelector('.comments-count').textContent = this.picture.comments;
    this.galleryContainer.querySelector('.likes-count').textContent = this.picture.likes;
  };
  /**Функция получения индекса фотографии в массиве по ее url
   * @param {string} pictureUrl
   */
  Gallery.prototype.getPictureIndexByUrl = function(pictureUrl) {
    for(var i = 0; i < this.galleryPictures.length; i++) {
      var pictureFromArray = this.galleryPictures[i];
      if (pictureFromArray.url === pictureUrl) {
        return i;
      }
    }
    //Показывает первую фотографию, если задан неверный url
    return 0;
  };
  //Функция показа фотографии по ее индексу в массиве
  Gallery.prototype.showPicture = function(pictureIndexOrUrl) {
    if (typeof (pictureIndexOrUrl) === 'number') {
      this.showPictureByIndex(pictureIndexOrUrl);
    } else if (typeof (pictureIndexOrUrl) === 'string') {
      var index = this.getPictureIndexByUrl(pictureIndexOrUrl);
      this.showPictureByIndex(index);
    }
  };
  //Функция показа галереи
  Gallery.prototype.showGallery = function(pictureIndexOrUrl) {
    this.galleryContainer.classList.remove('invisible');
    this.addEventListeners();
    this.showPicture(pictureIndexOrUrl);
  };
  /*Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
   * @param {Array.<pictures>} pictures
   */
  Gallery.prototype.savePictures = function(pictures) {
    this.galleryPictures = pictures;
  };
  return new Gallery();
});

