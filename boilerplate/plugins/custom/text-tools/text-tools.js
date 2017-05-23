(function($) {

"use strict";

/**
 * Manages text size.
 * @param {object} options.target - CSS selector
 */
app.textTools = function(target) {

  var $target = $(target);
  var step = 2;
  var minSize = 10;
  var maxSize = 24;
  var rem = 10;

  $('button[data-init="text-plus"]').click(function (event) {

    var currentSize = parseInt($target.css('fontSize'), 10);

    if (currentSize < maxSize)
      $target.css('fontSize', (currentSize + step)/16 + 'rem');

  });


  $('button[data-init="text-default"]').click(function (event) {
    $target.removeAttr('style');
  });


  $('button[data-init="text-minus"]').click(function (event) {

    var currentSize = parseInt($target.css('fontSize'), 10);

    if (currentSize > minSize)
      $target.css('fontSize', (currentSize - step)/16 + 'rem');

  });

};


})(jQuery);
