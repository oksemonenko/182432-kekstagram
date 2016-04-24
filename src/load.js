/**
 * @fileoverview Загрузка фотографий с сервера
 * @author Oksana Semonenko
 */

'use strict';

define(function() {
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
});
