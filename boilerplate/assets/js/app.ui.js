/**
 * @file UI methods
 *
 */



/**
 * Shows skiplinks on focus and add an outline on the target area
 */
app.ui.skipLinks = function() {

  $('#skip-links a').bind('focus blur', function() {

    // tabindex="-1" for Chrome anchors fix
    $( this.hash )
      .toggleClass('target')
      .attr('tabindex', '-1');

  });

};



/**
 * Defines popins
 */
app.ui.popinsColorbox = function () {

  // Avoid error if colorbox is not defined
  if ( ! $.fn.colorbox )
    return false;

  // Default inline-popin config
  var cfgPopinDefault = {
    iframe: true,
    innerWidth: '80%',
    innerHeight: '90%',
    opacity: 0.8,
    overlayClose: true,
    close: 'Fermer',
    fadeOut: 100,
    closeButton: true
  };


  $('.popin-trigger').colorbox( cfgPopinDefault );

  // Popin XXX
  //var popinXXX = $.extend({}, cfgPopinDefault);
  //popinXXX.title = 'Titre du popinXXX';
  //popinXXX.innerHeight = '180';
  //$('.popin-trigger-popinXXX').colorbox( popinXXX );


  // Close inline
  $('.close-popin').click(function() {
    $.fn.colorbox.close();
  });

  // Close iframe
  $('.close-popin-iframe').click(function() {
    window.parent.$.fn.colorbox.close();
  });

};



/**
 * Manages text size
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
