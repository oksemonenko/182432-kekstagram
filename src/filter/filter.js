/**
 * @fileoverview Функция фильтрации фотографий
 * @author Oksana Semonenko
 */

'use strict';

define([
  './filter-type'
], function(FilterType) {
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
});
