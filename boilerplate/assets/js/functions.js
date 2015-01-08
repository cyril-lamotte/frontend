

/* -----------------------------------------------------------------------------
   Warning CNIL for cookies
----------------------------------------------------------------------------- */
/*
var warningCNIL = function() {

  $('#cnil-cookies-close').click(function (event) {
    $('.cnil-cookies').slideUp('fast');
  });

};
*/


/* -----------------------------------------------------------------------------
   Polyfills
----------------------------------------------------------------------------- */
/*
var managePolyfills = function () {

  Modernizr.load({
    test: Modernizr.input.placeholder,
    nope: 'assets/js/plugins/jquery.placeholder.min.js',
    complete : function() {

      // Placeholder
      if( $.fn.placeholder )
        $('input[placeholder], textarea[placeholder]').placeholder();
      }
  });

};
*/


/* -----------------------------------------------------------------------------
   Manage popins
----------------------------------------------------------------------------- */
/*
var managePopins = function () {

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
*/
