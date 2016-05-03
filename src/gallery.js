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

// define(function() {
//   /** @constructor */
//   var that = this;
//   this.galleryContainer = document.querySelector('.gallery-overlay');
//   var galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');
//   var closeButton = this.galleryContainer.querySelector('.gallery-overlay-close');
//
//   /** @type {Array.<Object>} */
//   this.galleryPictures = [];
//   /** @type {number} */
//   this.pictureIndexToShow = 0;
//  // Регулярное выражение для проверки хэша
//   var re = /#photo\/(\S+)/;
//   //Получение адреса картинки из массива данных
//   this.pictureUrl = function(pictureIndex) {
//     return that.galleryPictures[pictureIndex].url;
//   };
//   //Обработчик события клика по фотографии,записывает в хэш адрес фотографии
//   this.onPhotoClick = function(evt) {
//     evt.preventDefault();
//     that.pictureIndexToShow = (that.pictureIndexToShow + 1) % that.galleryPictures.length;
//     location.hash = 'photo/' + that.pictureUrl(that.pictureIndexToShow);
//   };
//   //Обработчик клавиатурных событий, очищает хэш по нажатию Esc
//   this.onDocumentKeyDown = function(evt) {
//     evt.preventDefault();
//     if (event.keyCode === 27) {
//       location.hash = '';
//     }
//   };
//   //Обработчик события клика по закрывающей кнопке, очищает хэш
//   this.onCloseButtonClick = function(evt) {
//     evt.preventDefault();
//     location.hash = '';
//   };
//   //Обработчик события клика по оверлею вокруг фотографии, очищает хэш
//   this.onGalleryOverlayClick = function(evt) {
//     if (evt.target !== galleryImage &&
//       evt.target !== closeButton) {
//       evt.preventDefault();
//       location.hash = '';
//     }
//   };
//   //Обработчик изменения хэша
//   this.onHashChange = function() {
//     that.restoreFromHash();
//   };
//   this.restoreFromHash = function() {
//     if (location.hash === '') {
//       that.hideGallery();
//     } else if (location.hash.match(re)) {
//       var pictureUrl = location.hash.match(re)[1];
//       that.showGallery(pictureUrl);
//     }
//   };
//   //Добавляет объекту window обработчик события изменения хэша
//   window.addEventListener('hashchange', this.onHashChange);
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
//
//   this.showPictureByIndex = function(pictureIndex) {
//     this.pictureIndexToShow = pictureIndex;
//     this.picture = this.galleryPictures[pictureIndex];
//     galleryImage.src = this.picture.url;
//     galleryImage.width = '642';
//     this.galleryContainer.querySelector('.comments-count').textContent = this.picture.comments;
//     this.galleryContainer.querySelector('.likes-count').textContent = this.picture.likes;
//   };
//
//   /**Функция получения индекса фотографии в массиве по ее url
//    * @param {string} pictureUrl
//    */
//   this.getPictureIndexByUrl = function(pictureUrl) {
//     for(var i = 0; i < this.galleryPictures.length; i++) {
//       var pictureFromArray = this.galleryPictures[i];
//       if (pictureFromArray.url === pictureUrl) {
//         return i;
//       }
//     }
//     //Показывает первую фотографию, если задан неверный url
//     return 0;
//   };
//   //Функция показа фотографии по ее индексу в массиве
//   this.showPicture = function(pictureIndexOrUrl) {
//     if (typeof (pictureIndexOrUrl) === 'number') {
//       that.showPictureByIndex(pictureIndexOrUrl);
//     } else if (typeof (pictureIndexOrUrl) === 'string') {
//       var index = that.getPictureIndexByUrl(pictureIndexOrUrl);
//       that.showPictureByIndex(index);
//     }
//   };
//   //Функция, которая скрывает галерею
//   this.hideGallery = function() {
//     this.galleryContainer.classList.add('invisible');
//     this.removeEventListeners();
//   };
//   //Функция показа галереи
//   this.showGallery = function(pictureIndexOrUrl) {
//     that.galleryContainer.classList.remove('invisible');
//     that.addEventListeners();
//     that.showPicture(pictureIndexOrUrl);
//   };
//   /**
//    * @param {Array.<pictures>} pictures
//    */
//   return {
//     //Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
//     savePictures: function(pictures) {
//       that.galleryPictures = pictures;
//     },
//     //Обработчик изменения хэша
//     restoreFromHash: that.restoreFromHash,
//     pictureUrl: that.pictureUrl,
//     //Функция показа галереи
//     showGallery: that.showGallery
//   };
// });

define(function() {
  /** @constructor */
  // function GalleryType(asdf, asdfasdf) {
  //   this.aaa = asdf;
  //   this.bbb = asdfasdf;
  // }
  // GalleryType.prototype.hideGallery() {
  //   asdf;kjasdfasdf;kjsa;df;
  // }
  // GalleryType.prototype.onCloseButtonClick(evt) {
  //   asdfasdfasdf;
  // }
  //
  // var Gallery = new Gallery(fff, ffffffff);
  var Gallery = function() {
    this.galleryContainer = document.querySelector('.gallery-overlay');
    this.galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');
    this.closeButton = this.galleryContainer.querySelector('.gallery-overlay-close');
    /** @type {Array.<Object>} */
    this.galleryPictures = [];
    /** @type {number} */
    this.pictureIndexToShow = 0;
    //this.pictureUrl = this.pictureUrl.bind(this);
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onGalleryOverlayClick = this.onGalleryOverlayClick.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
    this.restoreFromHash = this.restoreFromHash.bind(this);
    //this.addEventListeners = this.addEventListeners.bind(this);
   // this.removeEventListeners = this.removeEventListeners.bind(this);
   //  this.showGallery = this.showGallery.bind(this);
   //  this.hideGallery = this.hideGallery.bind(this);
    //Добавляет объекту window обработчик события изменения хэша
    window.addEventListener('hashchange', this.onHashChange);
    //this.galleryImage.addEventListener('click', this.onPhotoClick);
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
  Gallery.prototype.restoreFromHash = function() {
    // Регулярное выражение для проверки хэша
    var re = /#photo\/(\S+)/;
    if (location.hash === '') {
      this.hideGallery();
    } else if (location.hash.match(re)) {
      var pictureUrl = location.hash.match(re)[1];
      this.showGallery(pictureUrl);
    }
  };
  //Обработчик изменения хэша
  Gallery.prototype.onHashChange = function() {
    this.restoreFromHash();
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

  Gallery.prototype.showPictureByIndex = function(pictureIndex) {
    this.pictureIndexToShow = pictureIndex;
    this.picture = this.galleryPictures[pictureIndex];
    this.galleryImage.src = this.picture.url;
    this.galleryImage.width = '642';
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
    // /*Функция, принимающая на вход массив объектов, описывающих фотографии, и сохраняющая его
    //  * @param {Array.<pictures>} pictures
    //  */
    // savePictures: function(pictures) {
    //   this.galleryPictures = pictures;
    // },
    // //Обработчик изменения хэша
    // restoreFromHash: Gallery.prototype.restoreFromHash,
    // pictureUrl: Gallery.prototype.pictureUrl,
    // //Функция показа галереи
    // showGallery: Gallery.prototype.showGallery,
    // hideGallery: Gallery.prototype.hideGallery
});

