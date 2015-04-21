

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
   Text size
----------------------------------------------------------------------------- */
/*
var textTools = function(target) {

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





/* -----------------------------------------------------------------------------
   collapsibleList
----------------------------------------------------------------------------- */
/*
var collapsibleList = function(options) {

  // Default options
  var o = {
    list: $('#list'),
    prefix :     'collapsible-list-',
    textCollapsed: 'Déplier la liste',
    textExpanded: 'Replier la liste',
    onShow: function() {},
    onHide: function() {}
  };

  // Merge with user's options
  if(options) {$.extend(true, o, options);}


  o.list.find('> li').each(function(i, el) {

    $(this).find('> a').click(function (event) {

      var $li = $(this).parent();

      if( $li.hasClass('collapsed') ) {

        event.preventDefault();
        $(this).next().slideDown('fast');
        $li.toggleClass('collapsed expanded');

      }
      else if( $li.hasClass('expanded') ) {

        event.preventDefault();
        $(this).next().slideUp('fast');
        $li.toggleClass('collapsed expanded');

      }

    });

  });

};

*/



/* -----------------------------------------------------------------------------
   FAQ
----------------------------------------------------------------------------- */
/*
var faq = function(options) {


  $('.view-faq .views-field-title a')
    .addClass('faq--closed')
    .click(function (event) {

      event.preventDefault();

      $(this).toggleClass('faq--closed').parents('.views-field-title')
        .next().slideToggle('fast');

    });




};
*/


/* -----------------------------------------------------------------------------
   Equalize
----------------------------------------------------------------------------- */
/*
$.fn.equalize = function() {

  var minHeight = 0;
  var arrayLines = [];

  $(this).each(function(i, el) {

    var offsetTop = $(el).offset().top;
    var offsetLabel = 'offset-'+ offsetTop;

    //console.log('offset:', offsetTop);

    // Create table
    if( ! arrayLines[offsetLabel] ) {
      arrayLines[offsetLabel] = Array();
      arrayLines[offsetLabel].push(el);
    }
    else {
      arrayLines[offsetLabel].push(el);
      var length = arrayLines[offsetLabel].length;

      //console.log(arrayLines[offsetLabel]);
      //console.log(arrayLines[offsetLabel][0].offsetHeight, this.offsetHeight);
      minHeight = Math.max(arrayLines[offsetLabel][0].offsetHeight, this.offsetHeight);

      //console.log(minHeight);

      // Apply minHeight
      $.each(arrayLines[offsetLabel], function(i, el) {
        $(el).css("minHeight", minHeight);
      });
    }

  });

  return $(this);

};

*/
