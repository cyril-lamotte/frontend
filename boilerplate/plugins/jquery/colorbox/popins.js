/**
 * Defines popins
 */
app.ui.popins = function () {

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
