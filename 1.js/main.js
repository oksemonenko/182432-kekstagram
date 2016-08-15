webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @fileoverview Функция фильтрации фотографий
	 * @author Oksana Semonenko
	 */

	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(FilterType) {
	  /**
	   * @param {Array.<Object>} pics
	   * @param {FilterType} filter
	   * @param {string} filter
	   */
	  return function(pictures, filter) {
	    var picturesToFilter = pictures.slice(0);
	    switch (filter) {
	      case FilterType.POPULAR:
	        break;
	      case FilterType.DISCUSSED:
	        picturesToFilter.sort(function(a, b) {
	          return b.comments - a.comments;
	        });
	        break;
	      case FilterType.NEW:
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @fileoverview Список доступных видов фильтрации
	 * @author Oksana Semonenko
	 */

	'use strict';

	/** @enum {number} */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  return {
	    'POPULAR': 'popular',
	    'NEW': 'new',
	    'DISCUSSED': 'discussed'
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @fileoverview Загрузка фотографий с сервера
	 * @author Oksana Semonenko
	 */

	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  return function(url, callback) {
	    var picturesContainer = document.querySelector('.pictures');
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
	    xhr.open('GET', url);
	    xhr.send();
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @fileoverview Вспомогательные методы
	 * @author Oksana Semonenko
	 */

	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  /** @constant {number} */
	  var GAP = 100;
	  /** @return {boolean} */
	  return {
	    //Проверка того, достигнут ли низ страницы
	    isBottomReached: function() {
	      var bodyElement = document.body;
	      var bodyPosition = bodyElement.getBoundingClientRect();
	      var windowHeight = document.documentElement.clientHeight;
	      return bodyPosition.bottom - windowHeight - GAP <= 0;
	    },
	    /**Проверка доступности следующей страницы
	     * @param {number} listSize
	     * @param {number} page
	     * @param {number} pageSize
	     * @return {boolean}
	     */
	    isNextPageAvailable: function(listSize, page, pageSize) {
	      return page < Math.floor(listSize / pageSize);
	    },
	    //Отрисовка вокруг жёлтой рамки чёрного слоя с прозрачностью 80%
	    drawOverlay: function(overlay, contWidth, contHeight, side, line) {
	      overlay.fillStyle = 'rgba(0, 0, 0, 0.8)';

	      overlay.fillRect(
	        -contWidth / 2,
	        -contHeight / 2,
	        contWidth,
	        contHeight / 2 - side / 2 - line
	      );
	      overlay.fillRect(
	        -contWidth / 2,
	        side / 2 + line,
	        contWidth,
	        contHeight / 2 - side / 2 - line
	      );
	      overlay.fillRect(
	        -contWidth / 2 - line,
	        -side / 2 - line,
	        contWidth / 2 - side / 2,
	        side + line * 2
	      );
	      overlay.fillRect(
	        side / 2 + line,
	        -side / 2 - line,
	        contWidth / 2 - side / 2,
	        side + line * 2
	      );
	    },
	    // Отрисовка рамки жёлтыми точками
	    drawBorder: function(border, i, j, side, line) {
	      //Функция отрисовки точек-кружочков
	      function drawRounds() {
	        border.strokeStyle = 'transparent';
	        border.fillStyle = '#ffe753';
	        border.beginPath();
	        border.arc(j, i, 3, 0, Math.PI * 2, true);
	        border.fill();
	      }
	      i = (-side / 2) - line / 2;
	      for (j = (-side / 2) - line / 2; j < side / 2 + line / 2; j = j + 10) {
	        drawRounds();
	      }
	      i = side / 2 + line / 2;
	      for (j = (-side / 2) - line / 2; j < side / 2 + line / 2; j = j + 10) {
	        drawRounds();
	      }
	      j = (-side / 2) - line / 2;
	      for (i = (-side / 2) - line / 2; i < side / 2 + line / 2; i = i + 10) {
	        drawRounds();
	      }
	      j = side / 2 + line / 2;
	      for (i = (-side / 2) - line / 2; i < side / 2 + line / 2; i = i + 10) {
	        drawRounds();
	      }
	    },
	    //Выводит размеры кадрируемого изображения над прямоугольником
	    setImageSize: function(textArea, image, side, line) {
	      textArea.fillStyle = 'white';
	      textArea.font = '12pt Arial';
	      textArea.textAlign = 'center';
	      textArea.textBaseline = 'bottom';
	      textArea.fillText(
	        image.naturalWidth + ' x ' + image.naturalHeight,
	        0,
	        -side / 2 - line * 2
	      );
	    },
	    // Создает объект даты таким образом, чтобы он соответствовал моему дню рождения
	    // в том году, в котором будет запущен этот код
	    getBirthDate: function() {
	      var dateObj = new Date(Date.now());
	      var birthDate = new Date();
	      var year1 = dateObj.getFullYear();
	      var month1 = dateObj.getMonth();
	      var day1 = dateObj.getDate();
	      birthDate.setMonth(2);
	      birthDate.setDate(3);
	      var month2 = 2;
	      var day2 = 3;

	      if (month1 < month2) {
	        birthDate.setFullYear(year1 - 1);
	      } else if (month1 === month2) {
	        if (day1 < day2) {
	          birthDate.setFullYear(year1 - 1);
	        }
	      }
	      return birthDate;
	    },
	    // Проверяет, являются ли значения, введенные в поля ввода, числами.
	    checkCorrectNum: function(num) {
	      return (isFinite(+num.value) && (num.value !== ''));
	    }
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @fileoverview Конструктор галереи
	 * @author Oksana Semonenko
	 */

	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @fileoverview Конструктор создания фотографии
	 * @author Oksana Semonenko
	 */

	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(7),
	  __webpack_require__(5)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(getPictureElement, gallery) {
	  /**
	   * @param {Object} data
	   * @param {Element} container
	   * @param {Number} pictureIndexToShow
	   * @constructor
	   */
	  var Picture = function(data, container, pictureIndexToShow) {
	    this.data = data;
	    this.element = getPictureElement(this.data, container, pictureIndexToShow);
	    this.pictureIndexToShow = pictureIndexToShow;
	    this.onPhotoClick = this.onPhotoClick.bind(this);
	    this.element.addEventListener('click', this.onPhotoClick);
	    container.appendChild(this.element);
	  };
	  Picture.prototype.onPhotoClick = function() {
	    location.hash = 'photo/' + gallery.pictureUrl(this.pictureIndexToShow);
	  };
	  Picture.prototype.remove = function() {
	    this.element.removeEventListener('click', this.onPhotoClick);
	    this.element.parentNode.removeChild(this.element);
	  };
	  return Picture;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @fileoverview Фотография
	 * @author Oksana Semonenko
	 */

	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(5)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(gallery) {
	  /** @constant {number} */
	  var IMAGE_LOAD_TIMEOUT = 15000;
	  var templateElement = document.querySelector('template');
	  var elementToClone;
	  if ('content' in templateElement) {
	    elementToClone = templateElement.content.querySelector('.picture');
	  } else {
	    elementToClone = templateElement.querySelector('.picture');
	  }
	  /* @param {Object} data
	   * @param {HTMLElement} container
	   * @param {number} pictureIndex
	   * @return {HTMLElement}
	   */
	  return function(data, container, pictureIndex) {
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
	    element.addEventListener('click', function(evt) {
	      evt.preventDefault();
	      location.hash = 'photo/' + gallery.pictureUrl(pictureIndex);
	    });
	    return element;
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(4)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(utilities) {
	  /**
	   * @constructor
	   * @param {string} image
	   */
	  var Resizer = function(image) {
	    // Изображение, с которым будет вестись работа.
	    this._image = new Image();
	    this._image.src = image;

	    // Холст.
	    this._container = document.createElement('canvas');
	    this._ctx = this._container.getContext('2d');

	    // Создаем холст только после загрузки изображения.
	    this._image.onload = function() {
	      // Размер холста равен размеру загруженного изображения. Это нужно
	      // для удобства работы с координатами.
	      this._container.width = this._image.naturalWidth;
	      this._container.height = this._image.naturalHeight;

	      /**
	       * Предлагаемый размер кадра в виде коэффициента относительно меньшей
	       * стороны изображения.
	       * @const
	       * @type {number}
	       */
	      var INITIAL_SIDE_RATIO = 0.75;

	      // Размер меньшей стороны изображения.
	      var side = Math.min(
	          this._container.width * INITIAL_SIDE_RATIO,
	          this._container.height * INITIAL_SIDE_RATIO);

	      // Изначально предлагаемое кадрирование — часть по центру с размером в 3/4
	      // от размера меньшей стороны.
	      this._resizeConstraint = new Square(
	          this._container.width / 2 - side / 2,
	          this._container.height / 2 - side / 2,
	          side);

	      // Отрисовка изначального состояния канваса.
	      this.setConstraint();
	    }.bind(this);

	    // Фиксирование контекста обработчиков.
	    this._onDragStart = this._onDragStart.bind(this);
	    this._onDragEnd = this._onDragEnd.bind(this);
	    this._onDrag = this._onDrag.bind(this);
	  };

	  Resizer.prototype = {
	    /**
	     * Родительский элемент канваса.
	     * @type {Element}
	     * @private
	     */
	    _element: null,

	    /**
	     * Положение курсора в момент перетаскивания. От положения курсора
	     * рассчитывается смещение на которое нужно переместить изображение
	     * за каждую итерацию перетаскивания.
	     * @type {Coordinate}
	     * @private
	     */
	    _cursorPosition: null,

	    /**
	     * Объект, хранящий итоговое кадрирование: сторона квадрата и смещение
	     * от верхнего левого угла исходного изображения.
	     * @type {Square}
	     * @private
	     */
	    _resizeConstraint: null,

	    /**
	     * Отрисовка канваса.
	     */
	    redraw: function() {
	      // Очистка изображения.
	      this._ctx.clearRect(0, 0, this._container.width, this._container.height);

	      // Параметры линии.
	      // NB! Такие параметры сохраняются на время всего процесса отрисовки
	      // canvas'a поэтому важно вовремя поменять их, если нужно начать отрисовку
	      // чего-либо с другой обводкой.

	      // Толщина линии.
	      this._ctx.lineWidth = 6;

	      // Сохранение состояния канваса.
	      // Подробней см. строку 132.
	      this._ctx.save();

	      // Установка начальной точки системы координат в центр холста.
	      this._ctx.translate(this._container.width / 2, this._container.height / 2);

	      var displX = -(this._resizeConstraint.x + this._resizeConstraint.side / 2);
	      var displY = -(this._resizeConstraint.y + this._resizeConstraint.side / 2);
	      // Отрисовка изображения на холсте. Параметры задают изображение, которое
	      // нужно отрисовать и координаты его верхнего левого угла.
	      // Координаты задаются от центра холста.
	      this._ctx.drawImage(this._image, displX, displY);

	      //Отрисовка вокруг жёлтой рамки чёрного слоя с прозрачностью 80%
	      utilities.drawOverlay(
	        this._ctx,
	        this._container.width,
	        this._container.height,
	        this._resizeConstraint.side,
	        this._ctx.lineWidth
	      );

	      //Выводит размеры кадрируемого изображения над прямоугольником
	      utilities.setImageSize(
	        this._ctx,
	        this._image,
	        this._resizeConstraint.side,
	        this._ctx.lineWidth
	      );

	      // Дополнительное задание
	      // Отрисовка рамки жёлтыми точками
	      var i, j;
	      utilities.drawBorder(
	        this._ctx,
	        i,
	        j,
	        this._resizeConstraint.side,
	        this._ctx.lineWidth
	      );

	      // Отрисовка прямоугольника, обозначающего область изображения после
	      // кадрирования. Координаты задаются от центра.
	      this._ctx.strokeRect(
	          (-this._resizeConstraint.side / 2) - this._ctx.lineWidth / 2,
	          (-this._resizeConstraint.side / 2) - this._ctx.lineWidth / 2,
	          this._resizeConstraint.side + this._ctx.lineWidth,
	          this._resizeConstraint.side + this._ctx.lineWidth);

	      // Восстановление состояния канваса, которое было до вызова ctx.save
	      // и последующего изменения системы координат. Нужно для того, чтобы
	      // следующий кадр рисовался с привычной системой координат, где точка
	      // 0 0 находится в левом верхнем углу холста, в противном случае
	      // некорректно сработает даже очистка холста или нужно будет использовать
	      // сложные рассчеты для координат прямоугольника, который нужно очистить.
	      this._ctx.restore();
	    },

	    /**
	     * Включение режима перемещения. Запоминается текущее положение курсора,
	     * устанавливается флаг, разрешающий перемещение и добавляются обработчики,
	     * позволяющие перерисовывать изображение по мере перетаскивания.
	     * @param {number} x
	     * @param {number} y
	     * @private
	     */
	    _enterDragMode: function(x, y) {
	      this._cursorPosition = new Coordinate(x, y);
	      document.body.addEventListener('mousemove', this._onDrag);
	      document.body.addEventListener('mouseup', this._onDragEnd);
	    },

	    /**
	     * Выключение режима перемещения.
	     * @private
	     */
	    _exitDragMode: function() {
	      this._cursorPosition = null;
	      document.body.removeEventListener('mousemove', this._onDrag);
	      document.body.removeEventListener('mouseup', this._onDragEnd);
	    },

	    /**
	     * Перемещение изображения относительно кадра.
	     * @param {number} x
	     * @param {number} y
	     * @private
	     */
	    updatePosition: function(x, y) {
	      this.moveConstraint(
	          this._cursorPosition.x - x,
	          this._cursorPosition.y - y);
	      this._cursorPosition = new Coordinate(x, y);
	    },

	    /**
	     * @param {MouseEvent} evt
	     * @private
	     */
	    _onDragStart: function(evt) {
	      this._enterDragMode(evt.clientX, evt.clientY);
	    },

	    /**
	     * Обработчик окончания перетаскивания.
	     * @private
	     */
	    _onDragEnd: function() {
	      this._exitDragMode();
	    },

	    /**
	     * Обработчик события перетаскивания.
	     * @param {MouseEvent} evt
	     * @private
	     */
	    _onDrag: function(evt) {
	      this.updatePosition(evt.clientX, evt.clientY);
	    },

	    /**
	     * Добавление элемента в DOM.
	     * @param {Element} element
	     */
	    setElement: function(element) {
	      if (this._element === element) {
	        return;
	      }

	      this._element = element;
	      this._element.insertBefore(this._container, this._element.firstChild);
	      // Обработчики начала и конца перетаскивания.
	      this._container.addEventListener('mousedown', this._onDragStart);
	    },

	    /**
	     * Возвращает кадрирование элемента.
	     * @return {Square}
	     */
	    getConstraint: function() {
	      return this._resizeConstraint;
	    },

	    /**
	     * Смещает кадрирование на значение указанное в параметрах.
	     * @param {number} deltaX
	     * @param {number} deltaY
	     * @param {number} deltaSide
	     */
	    moveConstraint: function(deltaX, deltaY, deltaSide) {
	      this.setConstraint(
	          this._resizeConstraint.x + (deltaX || 0),
	          this._resizeConstraint.y + (deltaY || 0),
	          this._resizeConstraint.side + (deltaSide || 0));
	    },

	    /**
	     * @param {number} x
	     * @param {number} y
	     * @param {number} side
	     */
	    setConstraint: function(x, y, side) {
	      if (typeof x !== 'undefined') {
	        this._resizeConstraint.x = x;
	      }

	      if (typeof y !== 'undefined') {
	        this._resizeConstraint.y = y;
	      }

	      if (typeof side !== 'undefined') {
	        this._resizeConstraint.side = side;
	      }

	      requestAnimationFrame(function() {
	        this.redraw();
	        window.dispatchEvent(new CustomEvent('resizerchange'));
	      }.bind(this));
	    },

	    /**
	     * Удаление. Убирает контейнер из родительского элемента, убирает
	     * все обработчики событий и убирает ссылки.
	     */
	    remove: function() {
	      this._element.removeChild(this._container);

	      this._container.removeEventListener('mousedown', this._onDragStart);
	      this._container = null;
	    },

	    /**
	     * Экспорт обрезанного изображения как HTMLImageElement и исходником
	     * картинки в src в формате dataURL.
	     * @return {Image}
	     */
	    exportImage: function() {
	      // Создаем Image, с размерами, указанными при кадрировании.
	      var imageToExport = new Image();

	      // Создается новый canvas, по размерам совпадающий с кадрированным
	      // изображением, в него добавляется изображение взятое из канваса
	      // с измененными координатами и сохраняется в dataURL, с помощью метода
	      // toDataURL. Полученный исходный код, записывается в src у ранее
	      // созданного изображения.
	      var temporaryCanvas = document.createElement('canvas');
	      var temporaryCtx = temporaryCanvas.getContext('2d');
	      temporaryCanvas.width = this._resizeConstraint.side;
	      temporaryCanvas.height = this._resizeConstraint.side;
	      temporaryCtx.drawImage(this._image,
	          -this._resizeConstraint.x,
	          -this._resizeConstraint.y);
	      imageToExport.src = temporaryCanvas.toDataURL('image/png');

	      return imageToExport;
	    }
	  };

	  /**
	   * Вспомогательный тип, описывающий квадрат.
	   * @constructor
	   * @param {number} x
	   * @param {number} y
	   * @param {number} side
	   * @private
	   */
	  var Square = function(x, y, side) {
	    this.x = x;
	    this.y = y;
	    this.side = side;
	  };

	  /**
	   * Вспомогательный тип, описывающий координату.
	   * @constructor
	   * @param {number} x
	   * @param {number} y
	   * @private
	   */
	  var Coordinate = function(x, y) {
	    this.x = x;
	    this.y = y;
	  };

	  window.Resizer = Resizer;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global Resizer: true */

	/**
	 * @fileoverview
	 * @author Igor Alexeenko (o0)
	 */

	'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(4)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(utilities) {
	  /** @enum {string} */
	  var FileType = {
	    'GIF': '',
	    'JPEG': '',
	    'PNG': '',
	    'SVG+XML': ''
	  };

	  /** @enum {number} */
	  var Action = {
	    ERROR: 0,
	    UPLOADING: 1,
	    CUSTOM: 2
	  };

	  /**
	   * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
	   * из ключей FileType.
	   * @type {RegExp}
	   */
	  var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');

	  /**
	   * @type {Object.<string, string>}
	   */
	  var filterMap;

	  /**
	   * Объект, который занимается кадрированием изображения.
	   * @type {Resizer}
	   */
	  var currentResizer;

	  /**
	   * Удаляет текущий объект {@link Resizer}, чтобы создать новый с другим
	   * изображением.
	   */
	  function cleanupResizer() {
	    if (currentResizer) {
	      currentResizer.remove();
	      currentResizer = null;
	    }
	  }

	  /**
	   * Ставит одну из трех случайных картинок на фон формы загрузки.
	   */
	  function updateBackground() {
	    var images = [
	      'img/logo-background-1.jpg',
	      'img/logo-background-2.jpg',
	      'img/logo-background-3.jpg'
	    ];

	    var backgroundElement = document.querySelector('.upload');
	    var randomImageNumber = Math.round(Math.random() * (images.length - 1));
	    backgroundElement.style.backgroundImage = 'url(' + images[randomImageNumber] + ')';
	  }

	  /**
	   * Проверяет, валидны ли данные, в форме кадрирования.
	   * @return {boolean}
	   */
	  function resizeFormIsValid() {
	    return true;
	  }

	  /**
	   * Форма загрузки изображения.
	   * @type {HTMLFormElement}
	   */
	  var uploadForm = document.forms['upload-select-image'];

	  /**
	   * Форма кадрирования изображения.
	   * @type {HTMLFormElement}
	   */
	  var resizeForm = document.forms['upload-resize'];

	  /**
	   * Форма добавления фильтра.
	   * @type {HTMLFormElement}
	   */
	  var filterForm = document.forms['upload-filter'];

	  /**
	   * @type {HTMLImageElement}
	   */
	  var filterImage = filterForm.querySelector('.filter-image-preview');

	  /**
	   * @type {HTMLElement}
	   */
	  var uploadMessage = document.querySelector('.upload-message');

	  /**
	   * @param {Action} action
	   * @param {string=} message
	   * @return {Element}
	   */
	  function showMessage(action, message) {
	    var isError = false;

	    switch (action) {
	      case Action.UPLOADING:
	        message = message || 'Кексограмим&hellip;';
	        break;

	      case Action.ERROR:
	        isError = true;
	        message = message || 'Неподдерживаемый формат файла<br> <a href="' + document.location + '">Попробовать еще раз</a>.';
	        break;
	    }

	    uploadMessage.querySelector('.upload-message-container').innerHTML = message;
	    uploadMessage.classList.remove('invisible');
	    uploadMessage.classList.toggle('upload-message-error', isError);
	    return uploadMessage;
	  }

	  function hideMessage() {
	    uploadMessage.classList.add('invisible');
	  }

	  /**
	   * Обработчик изменения изображения в форме загрузки. Если загруженный
	   * файл является изображением, считывается исходник картинки, создается
	   * Resizer с загруженной картинкой, добавляется в форму кадрирования
	   * и показывается форма кадрирования.
	   * @param {Event} evt
	   */
	  uploadForm.addEventListener('change', function(evt) {
	    var element = evt.target;
	    if (element.id === 'upload-file') {
	      // Проверка типа загружаемого файла, тип должен быть изображением
	      // одного из форматов: JPEG, PNG, GIF или SVG.
	      if (fileRegExp.test(element.files[0].type)) {
	        var fileReader = new FileReader();

	        showMessage(Action.UPLOADING);

	        fileReader.addEventListener('load', function() {
	          cleanupResizer();

	          currentResizer = new Resizer(fileReader.result);
	          currentResizer.setElement(resizeForm);
	          uploadMessage.classList.add('invisible');

	          uploadForm.classList.add('invisible');
	          resizeForm.classList.remove('invisible');

	          hideMessage();
	        });

	        fileReader.readAsDataURL(element.files[0]);
	      } else {
	        // Показ сообщения об ошибке, если загружаемый файл, не является
	        // поддерживаемым изображением.
	        showMessage(Action.ERROR);
	      }
	    }
	  });

	  var inputX = resizeForm.elements.x;
	  var inputY = resizeForm.elements.y;
	  var inputSize = resizeForm.elements.size;
	  //Синхронизация ресайзера и формы:
	  //берет значения смещения и размера кадра
	  //из объекта resizer и добавляет их в форму
	  /* @param {number} x
	  /* @param {number} y
	  /* @param {number} size
	   */
	  var synchronizeResizerWithForm = function() {
	    inputX.value = currentResizer.getConstraint().x;
	    inputY.value = currentResizer.getConstraint().y;
	    inputSize.value = currentResizer.getConstraint().side;
	  };
	  //Добавляет обработчик события синхронизации ресайзера и формы
	  window.addEventListener('resizerchange', synchronizeResizerWithForm);
	  //Обновление ресайзера по изменению значений формы:
	  //берет значения из полей формы
	  //и устанавливает их объекту resizer
	  var updateResizer = function() {
	    currentResizer.setConstraint(+inputX.value, +inputY.value, +inputSize.value);
	  };
	  //Добавляет обработчики события для полей формы
	  inputX.addEventListener('input', updateResizer);
	  inputY.addEventListener('input', updateResizer);
	  inputSize.addEventListener('input', updateResizer);

	  /**
	   * Обработка сброса формы кадрирования. Возвращает в начальное состояние
	   * и обновляет фон.
	   * @param {Event} evt
	   */
	  resizeForm.addEventListener('reset', function(evt) {
	    evt.preventDefault();

	    cleanupResizer();
	    updateBackground();

	    resizeForm.classList.add('invisible');
	    uploadForm.classList.remove('invisible');
	  });

	  /**
	   * Обработка отправки формы кадрирования. Если форма валидна, экспортирует
	   * кропнутое изображение в форму добавления фильтра и показывает ее.
	   * @param {Event} evt
	   */
	  resizeForm.addEventListener('submit', function(evt) {
	    evt.preventDefault();

	    if (resizeFormIsValid()) {
	      filterImage.src = currentResizer.exportImage().src;

	      resizeForm.classList.add('invisible');
	      filterForm.classList.remove('invisible');
	    }
	  });

	  /**
	   * Сброс формы фильтра. Показывает форму кадрирования.
	   * @param {Event} evt
	   */
	  filterForm.addEventListener('reset', function(evt) {
	    evt.preventDefault();

	    filterForm.classList.add('invisible');
	    resizeForm.classList.remove('invisible');
	  });

	  var browserCookies = __webpack_require__(10);
	  var filterControlsForm = document.querySelector('.upload-filter-controls');

	  //Читает из cookies последний выбранный фильтр: «Оригинал», «Хром» или «Сепия».
	  //Ищет кнопку с этим фильтром и добавляет ей атрибут checked.
	  var setFilter = function() {
	    var currentFilter = browserCookies.get('filter') || 'none';
	    var currentInput = filterControlsForm.querySelector('input[type=radio][value=' + currentFilter + ']');
	    currentInput.setAttribute('checked', true);
	  };
	  setFilter();

	  /**
	   * Отправка формы фильтра. Возвращает в начальное состояние, предварительно
	   * записав сохраненный фильтр в cookie.
	   * @param {Event} evt
	   */
	  filterForm.addEventListener('submit', function(evt) {
	    evt.preventDefault();
	    var filter = filterControlsForm.querySelector('input[name=upload-filter]:checked');
	    var date = new Date(Date.now() + (Date.now() - utilities.getBirthDate()));
	    var expiresDate = date.toUTCString();
	    browserCookies.set('filter', filter.value, {
	      expires: expiresDate
	    });
	    cleanupResizer();
	    updateBackground();
	    filterForm.classList.add('invisible');
	    uploadForm.classList.remove('invisible');
	  });
	  /**
	   * Обработчик изменения фильтра. Добавляет класс из filterMap соответствующий
	   * выбранному значению в форме.
	   */
	  filterForm.addEventListener('change', function() {
	    if (!filterMap) {
	      // Ленивая инициализация. Объект не создается до тех пор, пока
	      // не понадобится прочитать его в первый раз, а после этого запоминается
	      // навсегда.
	      filterMap = {
	        'none': 'filter-none',
	        'chrome': 'filter-chrome',
	        'sepia': 'filter-sepia'
	      };
	    }

	    var selectedFilter = [].filter.call(filterForm['upload-filter'], function(item) {
	      return item.checked;
	    })[0].value;

	    // Класс перезаписывается, а не обновляется через classList потому что нужно
	    // убрать предыдущий примененный класс. Для этого нужно или запоминать его
	    // состояние или просто перезаписывать.
	    filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
	  });

	  cleanupResizer();
	  updateBackground();

	  var left = document.querySelector('#resize-x');
	  var top = document.querySelector('#resize-y');
	  var side = document.querySelector('#resize-size');
	  var button = document.querySelector('#resize-fwd');

	  /**
	   * Дисейблит кнопку
	   */
	  button.setAttribute('disabled', true);

	  /**
	   * Проверяет значения, введенные в поля ввода, и если они не соответствуют размеру картинки,
	   * дисейблит кнопку.
	   * @param {HTMLInputElement} left1
	   * @param {HTMLInputElement} top1
	   * @param {HTMLInputElement} side1
	   */
	  var resizeControls = function(left1, top1, side1) {
	    if (utilities.checkCorrectNum(left1) && utilities.checkCorrectNum(top1) && utilities.checkCorrectNum(side1)) {
	      var leftValue = Number(left1.value);
	      var topValue = Number(top1.value);
	      var sideValue = Number(side1.value);
	      if (!(
	          ((leftValue + sideValue) > currentResizer._image.naturalWidth)
	          || ((topValue + sideValue) > currentResizer._image.naturalHeight)
	          || (leftValue < 0 || topValue < 0 || sideValue < 0)
	        )) {
	        button.removeAttribute('disabled');
	        return;
	      }

	    }
	    button.setAttribute('disabled', true);
	  };

	  var resizeControlsEvt = function() {
	    resizeControls(left, top, side);
	  };
	  var formInputs = [left, top, side];
	  formInputs.forEach(function(formInput) {
	    formInput.addEventListener('input', resizeControlsEvt);
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports) {

	exports.defaults = {};

	exports.set = function(name, value, options) {
	  // Retrieve options and defaults
	  var opts = options || {};
	  var defaults = exports.defaults;

	  // Apply default value for unspecified options
	  var expires  = opts.expires || defaults.expires;
	  var domain   = opts.domain  || defaults.domain;
	  var path     = opts.path     != undefined ? opts.path     : (defaults.path != undefined ? defaults.path : '/');
	  var secure   = opts.secure   != undefined ? opts.secure   : defaults.secure;
	  var httponly = opts.httponly != undefined ? opts.httponly : defaults.httponly;

	  // Determine cookie expiration date
	  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or empty string
	  var expDate = expires == undefined ? '' :
	  // in case expires is an integer, it (should) specify the amount in days till the cookie expires
	  typeof expires == 'number' ? new Date(new Date().getTime() + (expires * 864e5)) :
	  // in case expires is (probably) a Date object
	  expires.getTime ? expires :
	  // in case expires is not in any of the above formats, try parsing as a format recognized by Date.parse()
	  new Date(expires);

	  // Set cookie
	  document.cookie = encodeURIComponent(name) + '=' +                          // Encode cookie name
	  value.replace(/[^#\$&\+/:<-\[\]-}]/g, encodeURIComponent) +                 // Encode cookie value (RFC6265)
	  (expDate && expDate.getTime() ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
	  (domain   ? ';domain=' + domain : '') +                                     // Add domain
	  (path     ? ';path='   + path   : '') +                                     // Add path
	  (secure   ? ';secure'           : '') +                                     // Add secure option
	  (httponly ? ';httponly'         : '');                                      // Add httponly option
	};

	exports.get = function(name) {
	  var cookies = document.cookie.split(';');

	  // Iterate all cookies
	  for(var i = 0; i < cookies.length; i++) {
	    var cookie = cookies[i];

	    // Determine separator index ("name=value")
	    var separatorIndex = cookie.indexOf('=');

	    // If a separator index is found, Decode the cookie name and compare to the requested cookie name
	    if (separatorIndex != -1 && decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g,'')) == name) {
	      return decodeURIComponent(cookie.substring(separatorIndex + 1, cookie.length));
	    }
	  }

	  return null;
	};

	exports.erase = function(name, options) {
	  exports.set(name, '', {
	    expires:  -1,
	    domain:   options && options.domain,
	    path:     options && options.path,
	    secure:   false,
	    httponly: false}
	  );
	};


/***/ }
]);