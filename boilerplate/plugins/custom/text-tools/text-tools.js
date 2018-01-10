(function($) {

"use strict";

/**
 * Manages text size.
 */
app.textTools = function() {

  var $target = $('html');
  var step = 1;
  var minSize = 10;
  var maxSize = 24;
  var rem = 10;
  var $buttonPlus = $('button[data-init="text-plus"]');
  var $buttonMinus = $('button[data-init="text-minus"]');

  $buttonPlus.click(function (event) {
    var currentSize = parseInt($target.css('fontSize'), 10);
    if (currentSize < maxSize)
      $target.css('fontSize', (currentSize + step)/16 + 'rem');
  });

  $buttonMinus.click(function (event) {
    var currentSize = parseInt($target.css('fontSize'), 10);
    if (currentSize > minSize)
      $target.css('fontSize', (currentSize - step)/16 + 'rem');
  });

};


})(jQuery);
