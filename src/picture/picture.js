/**
 * @fileoverview Конструктор создания фотографии
 * @author Oksana Semonenko
 */

'use strict';

define([
  './getPictureElement',
  '../gallery'
], function(getPictureElement, gallery) {
  /**
   * @param {Object} data
   * @param {Element} container
   * @param {Number} pictureIndex
   * @constructor
   */
  return function(data, container, pictureIndexToShow) {
    this.data = data;
    this.element = getPictureElement(this.data, container, pictureIndexToShow);
    this.onPhotoClick = function() {
      location.hash = 'photo/' + gallery.pictureUrl(pictureIndexToShow);

    };
    this.remove = function() {
      this.element.removeEventListener('click', this.onPhotoClick);
      this.element.parentNode.removeChild(this.element);
    };
    this.element.addEventListener('click', this.onPhotoClick);
    container.appendChild(this.element);
  };
});

