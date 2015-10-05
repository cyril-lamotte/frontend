
/**
 * Manages text size
 * @param {object} options.target - jQuery Object to follow
 */
app.ui.textTools = function(target) {

  var $target = $(target);
  var step = 2;
  var minSize = 10;
  var maxSize = 24;

  $('button.js-text-plus').click(function (event) {

    var currentSize = parseInt($target.css('fontSize'), 10);

    if(currentSize < maxSize)
    $target.css('fontSize', currentSize + step);

  });

  $('button.js-text-minus').click(function (event) {

    var currentSize = parseInt($target.css('fontSize'), 10);

    if(currentSize > minSize)
      $target.css('fontSize', currentSize - step);

  });

};
