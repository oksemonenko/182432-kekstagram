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
});

