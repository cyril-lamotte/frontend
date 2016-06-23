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
    '$width': false,
    'onFix': function() {},
    'onUnfix': function() {}
  };

  var settings = {};

  // Merge user's options
  settings = $.extend({}, defaults, options);



  var $fixed = $(this);

  if ( ! $fixed.length)
     throw new Error('The fixed element doesn\'t exists.');

  if ( settings.follow && ! settings.follow.length )
     throw new Error('The follow element doesn\'t exists.');

  $fixed.attr('data-fixable', true);

  var defaultFixedOffset = $fixed.offset().top;
  var followOffset = 0;
  var fixedOffsetBottom = 0;
  var FixedOffset = 0;
  var windowHeight = $(window).height();


  // Recalculate default position
  $fixed.bind('refresh.fixed', function() {
    defaultFixedOffset = $fixed.offset().top;
    $fixed.trigger('setWidth.fixed');
  });



  // Create placeholder
  if( settings.createPlaceholder ) {

    var placeholderClasses = settings.fixedClass +'__placeholder';

    if( $fixed.attr('id') )
    {
      placeholderClasses += ' '+ $fixed.attr('id') + '__placeholder';
    }

    $fixed.before('<div class="'+ placeholderClasses +'"></div>');
    settings.$placeholder = $fixed.prev();

  }

  // Init after page loading
  $(window).load(function() {
    $fixed
      .trigger('refresh.fixed')
      .trigger('scroll.fixed');
  });


  $fixed.bind('scroll.fixed', function() {

    var scrollTop = $(window).scrollTop();

    fixedOffset = $fixed.offset().top;

    // Add or remove fixed class
    if ( scrollTop > defaultFixedOffset + settings.yOffset ) {

      // Fixed offset limit
      if( settings.follow ) {

        followOffset = settings.follow.offset().top + settings.follow[0].getBoundingClientRect().height;
        fixedOffsetBottom = fixedOffset + $fixed[0].getBoundingClientRect().height;


        if( $fixed.hasClass( settings.fixedClass +'--is-frozen' ) ) {

          if(followOffset > scrollTop + windowHeight) {
            $fixed.trigger('unfroze.fixed');
          }

        }

        // Froze if bottom of Element is beyond bottom of follow element
        if( fixedOffsetBottom > followOffset )
        {
          $fixed.trigger('froze.fixed', scrollTop);
        }
        else {
          $fixed.trigger('fix.fixed');
        }

      }
      else {
        $fixed.trigger('fix.fixed');
      }

    }
    else {
      $fixed.trigger('unfix.fixed');
    }



  });



  // Add position fixed
  $fixed.bind('fix.fixed', function() {

    // Do nothing if already visible
    if( $fixed.hasClass( settings.fixedClass ) )
      return;

    $fixed.trigger('setWidth.fixed');

    // Give placeholder height
    var fixedHeight = $fixed[0].getBoundingClientRect().height + parseInt($fixed.css('marginTop')) + parseInt($fixed.css('marginBottom'));
    settings.$placeholder.height(fixedHeight);

    $fixed.addClass( settings.fixedClass );
    settings.$placeholder.addClass(settings.fixedClass +'__placeholder--is-active');

    window.setTimeout(function() {
      $fixed.addClass(settings.fixedClass +'-anim');
    }, 0);


    settings.onFix();

  });


  // Set width with the $width element
  $fixed.on('setWidth.fixed', function() {

    if (settings.$width) {
      var width = settings.$width.width();
      $fixed.width(width);
    }

  });


  // Remove position fixed
  $fixed.bind('unfix.fixed', function() {

    // Do nothing if already hidden
    if( ! $fixed.hasClass( settings.fixedClass ) )
      return;

    $fixed.trigger('setWidth.fixed');

    $fixed
      .removeClass(settings.fixedClass)
      .removeClass('start-animation');

    settings.$placeholder.removeClass( settings.fixedClass +'__placeholder--is-active');

    settings.onUnfix();

    if ($fixed.hasClass(settings.fixedClass +'--is-frozen')) {
      $fixed.trigger('unfroze.fixed');
    }
  });



  // Element is fixed to the bottom of the followed element
  $fixed.bind('froze.fixed', function(event, scrollTop) {

    $fixed.addClass(settings.fixedClass +'--is-frozen').css({
      position: 'absolute',
      top: settings.follow[0].getBoundingClientRect().height - $fixed[0].getBoundingClientRect().height
    });

  });


  // Disable froze state
  $fixed.bind('unfroze.fixed', function(event, scrollTop) {
    $fixed.removeAttr('style').removeClass(settings.fixedClass +'--is-frozen');
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

