(function( $ ){

  $.slidingPanel = function(element, options) {

    // Defaults options.
    var defaults = {
      prefix: 'sp-',
      duration : 800,
      trigger: '#trigger',
      wrapper: false,
      overlay: true,
      close_button_text: 'Fermer',
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

      plugin.settings.$trigger = $(plugin.settings.trigger);

      initAttributes();
      createCloseButton();
      createOverlay();

      // Save focusable Elements.
      plugin.settings.focusableElements = $panel.find('a, button, input');
      plugin.settings.focusableElements.attr('tabindex', '-1');

      attachEvents();

    };


    /** Insert ARIA & classes attributes. */
    var initAttributes = function() {

      // Add classes.
      $panel.addClass(plugin.settings.prefix +'-panel');

      if (plugin.settings.wrapper)
        $(plugin.settings.wrapper).addClass(plugin.settings.prefix +'-wrapper');

      plugin.settings.$trigger.addClass(plugin.settings.prefix +'-trigger');


      // Add trigger's attributes.
      plugin.settings.$trigger.attr({
        'aria-expanded': false,
        'aria-controls': $panel.attr('id')
      });

      // Add panel's attributes.
      $panel.attr({
        'tabindex': '-1',
        'aria-hidden': true,
        'role': 'region',
        'aria-label': plugin.settings.panel_text
      }).wrapInner('<div class="' + plugin.settings.prefix + '-panel__inner"></div>');

    };


    /** Insert close button in panel. */
    var createCloseButton = function() {

      if (!plugin.settings.close_button_text)
        return;

      var $button = $('<button type="button" class="' + plugin.settings.prefix + '-close">' + plugin.settings.close_button_text + '</button>');

      $button
        .prependTo($panel.find('.sp--panel__inner'))
        .on('click', function(event) {
          $panel.trigger('hide.sp');
        });

      plugin.settings.$close_button = $button;

    };


    /** Insert overlay in DOM */
    var createOverlay = function() {

      if (!plugin.settings.overlay)
        return;

      var $overlay = $('<div></div>');

      $overlay.attr({
        'id': plugin.settings.prefix +'-overlay',
        'class': plugin.settings.prefix +'-overlay'
      })
      .insertAfter($panel)
      .bind('touchstart', function(event) {

        // Hide on touch.
        event.preventDefault();
        $panel.trigger('hide.sp');

      });

    };


    /** Shows the panel */
    var showPanel = function() {

      // Active trigger.
      plugin.settings.$trigger.addClass(plugin.settings.prefix +'-trigger--is-active')
        .attr('aria-expanded', true);

      // Add 'is-expanded' class on body.
      $('body').addClass(plugin.settings.prefix +'-is-expanded');

      $panel
        .attr('aria-hidden', 'false');

      // Move focus to first item.
      plugin.settings.focusableElements.attr('tabindex', '0');

      requestAnimationFrame(giveFocus);
      function giveFocus() {
        plugin.settings.focusableElements.first().focus();
      }

      // Callback function.
      plugin.settings.onShow();

    };


    /** Hides the panel */
    var hidePanel = function() {

      if( ! plugin.settings.$trigger.hasClass( plugin.settings.prefix +'-trigger--is-active' ) )
        return;


      // Move focus to trigger
      plugin.settings.$trigger
        .removeClass(plugin.settings.prefix +'-trigger--is-active')
        .attr('tabindex', '0')
        .attr('aria-expanded', false)
        .trigger('focus-on-trigger.sp');


      $('body').removeClass(plugin.settings.prefix +'-is-expanded');
      $panel.attr('aria-hidden', 'true');


      // Callback function
      plugin.settings.onHide();

    };


    /** Attach trigger events */
    var attachTriggerEvents = function() {

      plugin.settings.$trigger.click(function (event) {

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

        }, plugin.settings.duration, plugin.settings.$trigger);


      });

    };


    /** Attach global events */
    var attachGlobalEvents = function() {

      // Hide panel width ESC key and clic outside.
      $('body').keydown(function(event) {

        // ESC
        if (event.keyCode == 27) {
          $panel.trigger('hide.sp');
        }

      }).click(function(event) {
        $panel.trigger('hide.sp');
      });

      // Hide on orientationchange & on desktop while resizing.
      $(window)
        .bind('orientationchange', function() { $panel.trigger('hide.sp'); })
        .resize(function() {

          if( screen.width > 992) {
            $panel.trigger('hide.sp');
          }

        });

      // Prevent windows move.
      $(document).bind('touchmove', function(event) {

        if(plugin.moved)
          event.preventDefault();

      });

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


      // Move focus to first focusable element when last focusable element
      // loose focus.
      plugin.settings.focusableElements.last().keydown(function(event) {

        // TAB
        if (event.keyCode == 9 && !event.shiftKey) {
          event.preventDefault();
          plugin.settings.focusableElements.first().focus();
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
