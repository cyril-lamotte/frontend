(function( $ ){

  $.slidingPanel = function(element, options) {

    // Defaults options.
    var defaults = {
      prefix: 'sp-',
      trigger: '#trigger',
      wrapper: false,
      overlay: true,
      close_button_text: 'Fermer',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $panel = $(element),
        $body = $('body');

    plugin.settings = {};


    /** Plugin initialisation */
    plugin.init = function() {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);

      plugin.settings.$trigger = $(plugin.settings.trigger);
      plugin.settings.supportsTransitions = supportsTransitions();

      initAttributes();
      createCloseButton();
      createOverlay();

      // Save focusable Elements.
      plugin.settings.focusableElements = $panel.find('a, button, input').attr('tabindex', '-1');
      plugin.settings.focusableElementsFirst = plugin.settings.focusableElements.first();
      plugin.settings.focusableElementsLast = plugin.settings.focusableElements.last();
      attachEvents();

    };


    // Detect CSS transition support (<= IE9).
    var supportsTransitions  = function() {
        var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
            v = ['ms','O','Moz','Webkit']; // 'v' for vendor

        if( s.transition === '' )
          return true; // check first for prefeixed-free support
        while( v.length ) // now go over the list of vendor prefixes and check support until one is found
            if( v.pop() + 'Transition' in s )
                return true;
        return false;
    };


    /** Insert ARIA & classes attributes. */
    var initAttributes = function() {

      // Add classes.
      $panel.addClass(plugin.settings.prefix + '-panel');

      if (plugin.settings.wrapper)
        $(plugin.settings.wrapper).addClass(plugin.settings.prefix + '-wrapper');

      plugin.settings.$trigger.addClass(plugin.settings.prefix + '-trigger');


      // Add trigger's attributes.
      plugin.settings.$trigger.attr({
        'aria-expanded': false,
        'aria-controls': $panel.attr('id')
      });

      // Add panel's attributes.
      $panel.attr({
        'aria-hidden': true,
        'role': 'dialog',
        'aria-label': plugin.settings.panel_text
      }).wrapInner('<div class="' + plugin.settings.prefix + '-panel__inner"></div>');

      if ( ! plugin.settings.supportsTransitions) {
        $body.addClass(plugin.settings.prefix + '-no-transitions');
      }

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
        'class': plugin.settings.prefix + '-overlay'
      })
      .insertAfter($panel)
      .on('touchstart', function(event) {

        // Hide on touch.
        event.preventDefault();
        $panel.trigger('hide.sp');

      });

    };


    /** Shows the panel */
    var showPanel = function() {

      // Active trigger.
      plugin.settings.$trigger.addClass(plugin.settings.prefix + '-trigger--is-active')
        .attr('aria-expanded', true);

      // Show panel with CSS.
      $body.addClass(plugin.settings.prefix + '-is-expanded');

      if ( ! plugin.settings.supportsTransitions) {
        transitionend();
      }

    };


    /** Hides the panel */
    var hidePanel = function() {

      if( ! plugin.settings.$trigger.hasClass(plugin.settings.prefix + '-trigger--is-active'))
        return;

      // Hide panel with CSS.
      $body.removeClass(plugin.settings.prefix + '-is-expanded');

      // Remove trigger's active state.
      plugin.settings.$trigger
        .removeClass(plugin.settings.prefix + '-trigger--is-active');

      if ( ! plugin.settings.supportsTransitions) {
        transitionend();
      }

    };


    /** Do DOM work after animation.  */
    var transitionend = function() {

      // Panel is open.
      if ($body.hasClass(plugin.settings.prefix + '-is-expanded')) {

        // Reveal panel to screen readers.
        $panel.attr('aria-hidden', 'false');

        // Make elements focusables.
        plugin.settings.focusableElements.attr('tabindex', '0');

        // Move focus to first item (+IE9 test).
        if (typeof requestAnimationFrame === 'undefined') {
          plugin.settings.focusableElementsFirst.focus();
        }
        else {
          requestAnimationFrame(function() {
            plugin.settings.focusableElementsFirst.focus();
          });
        }

        // Callback function.
        plugin.settings.onShow();

      }
      else {

        // Hide panel to screen readers.
        $panel.attr('aria-hidden', 'true');

        // Move focus to trigger.
        plugin.settings.$trigger
          .attr('tabindex', '0')
          .attr('aria-expanded', false);

        // Return focus to trigger (+IE9 test).
        if (typeof requestAnimationFrame === 'undefined') {
          plugin.settings.$trigger.focus();
        }
        else {
          requestAnimationFrame(function() {
            plugin.settings.$trigger.focus();
          });
        }

        // Callback function.
        plugin.settings.onHide();

      }

    };


    /** Attach trigger events */
    var attachTriggerEvents = function() {

      plugin.settings.$trigger.click(function (event) {

        event.stopPropagation();

        // Close panel on click on active trigger
        if( $(this).hasClass( plugin.settings.prefix + '-trigger--is-active' ) ) {
          $panel.trigger('hide.sp');
        }
        else {
          $panel.trigger('show.sp');
        }

      });

    };


    /** Attach global events */
    var attachGlobalEvents = function() {

      // Hide panel width ESC key and clic outside.
      $body.keydown(function(event) {

        // ESC.
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

      // Listen custom events & stop propagation (avoid <body>'s behavior).
      $panel
        .on('show.sp', function() { showPanel(); })
        .on('hide.sp', function() { hidePanel(); })
        .on('transitionend', function() { transitionend(); })
        .on('click', function (event) { event.stopPropagation(); });

      attachTriggerEvents();
      attachGlobalEvents();

      // Move focus to first focusable element when last focusable element
      // lose focus.
      plugin.settings.focusableElementsLast.keydown(function(event) {

        // TAB
        if (event.keyCode == 9 && !event.shiftKey) {
          event.preventDefault();
          plugin.settings.focusableElementsFirst.focus();
        }

      });

      plugin.settings.focusableElementsFirst.keydown(function(event) {

        // TAB
        if (event.keyCode == 9 && event.shiftKey) {
          event.preventDefault();
          plugin.settings.focusableElementsLast.focus();
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
