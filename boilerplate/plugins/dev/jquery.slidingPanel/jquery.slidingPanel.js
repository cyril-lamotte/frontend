(function( $ ){

  /**
   * Toggle side panel for mobile navigation
   * @param {object} options - Settings
   * @param {string} options.prefix='sliding-panel-' - Classes prefix
   * @param {int} options.duration=300 - Slide effect duration
   * @param {object} options.trigger=$('#sliding-panel-trigger') - Trigger's jQuery object
   * @param {object} options.panel=$('.sliding-panel') - Panel's jQuery object
   * @param {object} options.wrapper=$('.wrapper') - Site wrapper's jQuery object
   * @param {bool} options.overlay=false - If true, adds an overlay when panel is opened
   * @param {string} options.position='right' - Position of the panel
   * @param {function()} onShow - Fires when the panel is showed
   * @param {function()} onHide - Fires when the panel is hidden
   */
  $.slidingPanel = function(element, options) {

    // Defaults options
    var defaults = {
      prefix: 'sp-',
      duration : 300,
      trigger: $('#trigger'),
      wrapper: $('#wrapper'),
      overlay: true,
      position: 'right',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $panel = $(element);

    plugin.settings = {};



    /** Plugin initialisation */
    plugin.init = function() {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);

      initAttributes();


      // Save focusable Elements
      plugin.settings.focusableElements = $panel.find('a, button, input');
      plugin.panelWidth = $panel.outerWidth();

      // Touch
      /*plugin.moved = false;
      plugin.startX = 0;
      plugin.currentXtranslate = 0;*/

      createOverlay();

      attachEvents();

    };



    /** Insert ARIA & classes attributes */
    var initAttributes = function() {

      // Add classes
      $panel.addClass( plugin.settings.prefix +'-panel' );
      plugin.settings.wrapper.addClass( plugin.settings.prefix +'-wrapper' );
      plugin.settings.trigger.addClass( plugin.settings.prefix +'-trigger' );


      // Add attributes
      plugin.settings.trigger.attr({
        'aria-expanded' : false,
        'aria-controls' : $panel.attr('id'),
      });

      $panel.attr({
        'tabindex' : '0',
        'aria-hidden' : true,
        'role' : 'region',
        'aria-labelledby' : plugin.settings.trigger.attr('id')
      });

    };



    /** Insert overlay in DOM */
    var createOverlay = function() {

      // Create overlay
      if( plugin.settings.overlay )
      {
        var $overlay = $('<div></div>');

        $overlay.attr({
          'id': plugin.settings.prefix +'-overlay',
          'class': plugin.settings.prefix +'-overlay'
        })
        .appendTo(plugin.settings.wrapper)
        .bind('touchstart', function(event) {

          event.preventDefault();
          $panel.trigger('hide.sp');

        });

      }

    };



    /** Shows the panel */
    var showPanel = function() {

      // Active trigger
      plugin.settings.trigger.addClass( plugin.settings.prefix +'-trigger--is-active' )
        .attr('aria-expanded', true);


      // Add 'is-expanded' class on body
      $('body').addClass(plugin.settings.prefix +'-is-expanded');

      // Move focus to panel
      $panel
        .attr('aria-hidden', 'false')
        .focus();


      // Callback function
      plugin.settings.onShow();

    };



    /** Hides the panel */
    var hidePanel = function() {

      if( ! plugin.settings.trigger.hasClass( plugin.settings.prefix +'-trigger--is-active' ) )
        return;


      // Move focus to trigger
      plugin.settings.trigger
        .removeClass(plugin.settings.prefix +'-trigger--is-active')
        .attr('aria-expanded', false)
        .trigger('focus-on-trigger.sp');


      $('body').removeClass(plugin.settings.prefix +'-is-expanded');
      $panel.attr('aria-hidden', 'true');


      // Callback function
      plugin.settings.onHide();

    };




    /** Attach trigger events */
    var attachTriggerEvents = function() {

      plugin.settings.trigger.click(function (event) {

        event.stopPropagation();

        // Close panel on click on active trigger
        if( $(this).hasClass( plugin.settings.prefix +'-trigger--is-active' ) ) {
          $panel.trigger('hide.sp');
        }
        else {
          $panel.trigger('show.sp');
        }

      }).bind('focus-on-trigger.sp', function () {

        // Return focus to the trigger
        timeoutID = window.setTimeout(function($trigger) {

          // IE9 FIX
          if($trigger !== undefined)
            $trigger.focus();

        }, plugin.settings.duration, plugin.settings.trigger);


      });

    };



    /** Attach global events */
    var attachGlobalEvents = function() {

      // Hide panel width ESC key and clic outside
      $('body').keydown(function(event) {

        // ESC
        if (event.keyCode == 27) {
          $panel.trigger('hide.sp');
        }

      }).click(function(event) {
        $panel.trigger('hide.sp');
      });


      // Hide on orientationchange & on desktop while resizing
      $(window)
        .bind('orientationchange', function() { $panel.trigger('hide.sp'); })
        .resize(function() {

          if( Modernizr.mq('only screen and (min-width: 992px)') ) {
            $panel.trigger('hide.sp');
          }

        });


      // Save touch start X
      plugin.settings.wrapper.bind('touchstart', function(event) {
        plugin.startX = event.originalEvent.touches[0].clientX;
        plugin.startY = event.originalEvent.touches[0].clientY;
      });


      // Prevent windows move
      $(document).bind('touchmove', function(event) {

        if(plugin.moved)
          event.preventDefault();

      });

/*
      // Show panel width touch swipe
      plugin.settings.wrapper.bind('touchmove', function(event) {

        var currentX = event.originalEvent.touches[0].clientX;
        var currentY = event.originalEvent.touches[0].clientY;
        var dif_x = currentX - plugin.startX;
        var dif_y = currentY - plugin.startY;

        var translateX = dif_x + plugin.currentXtranslate;

        if( translateX > 0 )
          translateX = 0;

        if( translateX < -plugin.panelWidth )
          translateX = -plugin.panelWidth;

        if( Math.abs(dif_x) > 20 & Math.abs(dif_y) < 50 )
        {
          $(this)[0].style['-webkit-transform'] = 'translate3d(' + translateX + 'px, 0, 0)';

          plugin.lastXtranslate = translateX;
          plugin.moved = true;
        }

      });



      // Save touchend X
      plugin.settings.wrapper.bind('touchend', function(event) {
        plugin.currentXtranslate = plugin.lastXtranslate;
        plugin.moved = false;
      });
      */
    };

    /** Attach events */
    var attachEvents = function() {

      // Listen custom events & stop propagation (avoid <body>'s behavior)
      $panel
        .bind('show.sp', function() { showPanel(); })
        .bind('hide.sp', function() { hidePanel(); })
        .click(function (event) { event.stopPropagation(); });


      attachTriggerEvents();
      attachGlobalEvents();


      // Hide when last focusable element loose focus
      plugin.settings.focusableElements.last().keydown(function(event) {

        // TAB
        if (event.keyCode == 9) {
          $panel.trigger('hide.sp');
        }

      });

    };

    plugin.init();

  };



  $.fn.slidingPanel = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('slidingPanel')) {

        var plugin = new $.slidingPanel(this, options);
        $(this).data('slidingPanel', plugin);

      }

    });

  };


})( jQuery );
