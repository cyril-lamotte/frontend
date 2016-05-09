(function ($) {


/**
 * Targeted element will be fixed while scrolling
 * @param {object} options
 * @param {int} options.yOffset [0] - Vertical offset
 * @param {jQuery object} options.follow - jQuery Object to follow
 * @param {bool} options.createPlaceholder [true] - Create placeholder
 */
$.fn.fixedElement = function (options) {

  var defaults = {
    'yOffset': 0,
    'follow': null,
    'createPlaceholder': true,
    'fixedClass': 'fixed-element',
    'onFix': function() {},
    'onUnfix': function() {}
  };

  var settings = {};

  // Merge user's options
  settings = $.extend({}, defaults, options);



  var $fixed = $(this);

  if ( ! $fixed.length)
     throw new Error('The fixed element doesn\'t exists.');


  var defaultFixedOffset = $fixed.offset().top;
  var followOffset = 0;
  var fixedOffsetBottom = 0;



  // Create placeholder
  if( settings.createPlaceholder ) {

    $fixed.before('<div class="'+ settings.fixedClass +'__placeholder"></div>');
    settings.$placeholder = $fixed.prev();

  }


  $fixed.bind('scroll.fixed', function() {

    var scrollTop = $(window).scrollTop();

    // Add or remove fixed class
    if ( scrollTop > defaultFixedOffset + settings.yOffset ) {
      $fixed.trigger('fix.fixed');
    }
    else {
      $fixed.trigger('unfix.fixed');
    }


    // Fixed offset limit
    if( settings.follow ) {

      followOffset = settings.follow.offset().top + settings.follow[0].getBoundingClientRect().height;
      fixedOffsetBottom = defaultFixedOffset + $fixed[0].getBoundingClientRect().height;

      if( fixedOffsetBottom > followOffset )
      {
        $fixed.trigger('unfix.fixed');
      }

    }

  });


  $fixed.bind('fix.fixed', function() {

    // Do nothing if already visible
    if( $fixed.hasClass( settings.fixedClass ) )
      return;

    // Give placeholder height
    var fixedHeight = $fixed[0].getBoundingClientRect().height + parseInt($fixed.css('marginTop')) + parseInt($fixed.css('marginBottom'));
    settings.$placeholder.height(fixedHeight);

    $fixed.addClass( settings.fixedClass );
    settings.$placeholder.addClass( settings.fixedClass +'__placeholder--is-active');

    window.setTimeout(function() {
      $fixed.addClass('start-animation');
    }, 0);


    settings.onFix();

  });


  $fixed.bind('unfix.fixed', function() {

    // Do nothing if already hidden
    if( ! $fixed.hasClass( settings.fixedClass ) )
      return;

    $fixed
      .removeClass(settings.fixedClass)
      .removeClass('start-animation');

    settings.$placeholder.removeClass( settings.fixedClass +'__placeholder--is-active');

    settings.onUnfix();


  });


  // Destroy
  $fixed.bind('destroy.fixed', function() {

    settings.$placeholder.remove();
    $fixed.trigger('unfix.fixed');

  });


  $(window).scroll(function () {
    $fixed.trigger('scroll.fixed');
  });

};


})(jQuery);

