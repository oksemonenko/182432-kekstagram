/**
 * @fileoverview Вспомогательные методы
 * @author Oksana Semonenko
 */

'use strict';

define(function() {
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
    }
  };
});
