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
  return function(data, container, pictureIndex) {
    this.data = data;
    this.element = getPictureElement(this.data, container, pictureIndex);
    this.onPhotoClick = function() {
      gallery.showGallery(pictureIndex);
    };
    this.remove = function() {
      this.element.removeEventListener('click', this.onPhotoClick);
      this.element.parentNode.removeChild(this.element);
    };
    this.element.addEventListener('click', this.onPhotoClick);
    container.appendChild(this.element);
  };
});

