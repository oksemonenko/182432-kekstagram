/* global Resizer: true */

/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

(function() {
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
  uploadForm.onchange = function(evt) {
    var element = evt.target;
    if (element.id === 'upload-file') {
      // Проверка типа загружаемого файла, тип должен быть изображением
      // одного из форматов: JPEG, PNG, GIF или SVG.
      if (fileRegExp.test(element.files[0].type)) {
        var fileReader = new FileReader();

        showMessage(Action.UPLOADING);

        fileReader.onload = function() {
          cleanupResizer();

          currentResizer = new Resizer(fileReader.result);
          currentResizer.setElement(resizeForm);
          uploadMessage.classList.add('invisible');

          uploadForm.classList.add('invisible');
          resizeForm.classList.remove('invisible');

          hideMessage();
        };

        fileReader.readAsDataURL(element.files[0]);
      } else {
        // Показ сообщения об ошибке, если загружаемый файл, не является
        // поддерживаемым изображением.
        showMessage(Action.ERROR);
      }
    }
  };

  /**
   * Обработка сброса формы кадрирования. Возвращает в начальное состояние
   * и обновляет фон.
   * @param {Event} evt
   */
  resizeForm.onreset = function(evt) {
    evt.preventDefault();

    cleanupResizer();
    updateBackground();

    resizeForm.classList.add('invisible');
    uploadForm.classList.remove('invisible');
  };

  /**
   * Обработка отправки формы кадрирования. Если форма валидна, экспортирует
   * кропнутое изображение в форму добавления фильтра и показывает ее.
   * @param {Event} evt
   */
  resizeForm.onsubmit = function(evt) {
    evt.preventDefault();

    if (resizeFormIsValid()) {
      filterImage.src = currentResizer.exportImage().src;

      resizeForm.classList.add('invisible');
      filterForm.classList.remove('invisible');
    }
  };

  /**
   * Сброс формы фильтра. Показывает форму кадрирования.
   * @param {Event} evt
   */
  filterForm.onreset = function(evt) {
    evt.preventDefault();

    filterForm.classList.add('invisible');
    resizeForm.classList.remove('invisible');
  };

  // // Создает объект даты таким образом, чтобы он соответствовал моему дню рождения
  // // в том году, в котором будет запущен этот код
  function getBirthDate() {
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
  }

  var browserCookies = require('browser-cookies');
  var filterControlsForm = document.querySelector('.upload-filter-controls');
  var filter = filterControlsForm.querySelector('input[name=upload-filter]:checked');
  //
  // //Читает из cookies последний выбранный фильтр: «Оригинал», «Хром» или «Сепия».
  // //Ищет кнопку с этим фильтром и добавляет ей атрибут checked.
  var setFilter = function() {
    var currentFilter = browserCookies.get('filter') || 'none';
    var currentInput = filterControlsForm.getElementById('upload-filter-' + currentFilter);
    currentInput.setAttribute('checked', true);
  };

  /**
   * Отправка формы фильтра. Возвращает в начальное состояние, предварительно
   * записав сохраненный фильтр в cookie.
   * @param {Event} evt
   */
  filterForm.onsubmit = function(evt) {
    evt.preventDefault();

    browserCookies.set('filter', filter.value, {
      expires: Date.now() + (Date.now() - getBirthDate())
    });
    //filterForm.submit();

    cleanupResizer();
    updateBackground();

    filterForm.classList.add('invisible');
    uploadForm.classList.remove('invisible');
  };

  /**
   * Обработчик изменения фильтра. Добавляет класс из filterMap соответствующий
   * выбранному значению в форме.
   */
  filterForm.onchange = function() {
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
  };

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
   * Проверяет, являются ли значения, введенные в поля ввода, числами.
   */
  var checkCorrectNum = function(num) {
    return (isFinite(+num.value) && (num.value !== ''));
  };
  /**
   * Проверяет значения, введенные в поля ввода, и если они не соответствуют размеру картинки,
   * дисейблит кнопку.
   * @param {HTMLInputElement} left1
   * @param {HTMLInputElement} top1
   * @param {HTMLInputElement} side1
   */
  var resizeControls = function(left1, top1, side1) {
    if (checkCorrectNum(left1) && checkCorrectNum(top1) && checkCorrectNum(side1)) {
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

  side.oninput = left.oninput = top.oninput = function() {
    resizeControls(left, top, side);
  };

  setFilter();
})();
