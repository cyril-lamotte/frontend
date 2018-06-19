(function( $ ) {

  $.dropDownNav = function(element, options) {

    // Defaults options
    var defaults = {
      prefix: 'ddn-',
      event: 'hover',
      subSelector: '> li > div',
      delay: 300,
      position: {
        my: 'left top',
        at: 'left bottom'
      },
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $nav = $(element),
        $body = $('body');

    plugin.settings = {};


    /** Plugin initialisation */
    plugin.init = function() {

      // Merge user's options.
      plugin.settings = $.extend({}, defaults, options);

      // Merge position object.
      if (options)
        plugin.settings.position = $.extend({}, defaults.position, options.position);

      // If a custom "of" is provided, init a setting.
      if (plugin.settings.position.of)
        plugin.settings.customPositionOf = true;

      $nav.addClass(plugin.settings.prefix + '-nav');

      // Find parents links from HTML
      $nav.find(plugin.settings.subSelector).each(function(i, el) {
        $(this).addClass(plugin.settings.prefix +'-sub')
          .prev()
          .addClass( plugin.settings.prefix +'-parent' );
      });


      plugin.settings.$level1 = $nav.find('> li > a, > li > span');

      // Save parents.
      plugin.settings.$parents = $nav.find('.'+ plugin.settings.prefix +'-parent');

      // Save subs.
      plugin.settings.$subs = $nav.find('.'+ plugin.settings.prefix +'-sub');

      plugin.settings.hoverTimer = null;

      initAttributes();

      // Initialiser le marqueur de survol
      setFlag(false);

      // Attach events
      attachEvents();

    };


    var initAttributes = function() {

      // Make level 1 focusable.
      plugin.settings.$level1.attr({
        'aria-expanded': false,
        //'aria-controls': $panel.attr('id'),
        'tabindex': 0
      });

      plugin.settings.$subs.attr({
        'aria-hidden': true
      });

    };


    /** Attach global events */
    var attachEvents = function() {

      plugin.settings.$level1
        .on('show.ddn', function() { show($(this)); })
        .on('hide.ddn', function() { hide($(this)); });


        if (plugin.settings.event == 'click') {

          plugin.settings.$level1
            .on('click.ddn keyup.ddn', function(event) {

              event.stopPropagation();

              // Is "Enter key" pressed ?
              if (event.type == 'keyup' ) {
                if (event.keyCode != 13) {
                  return;
                }
              }

              // If element has children...
              if ($(this).hasClass(plugin.settings.prefix + '-parent')) {

                var $level1 = $(this);

                // Already opened, close sub.
                if ($(this).hasClass(plugin.settings.prefix + '-opened')) {
                  $level1.trigger('hide.ddn');
                  return;
                }

                // Hide all.
                plugin.settings.$level1.trigger('hide.ddn');

                // Show.
                $level1.trigger('show.ddn');

              }

            });

        }
        else {

          plugin.settings.$level1
            .on('mouseenter.ddn focus.ddn', function(event) {

              clearTimeout(plugin.settings.hoverTimer);

              // Hide all.
              plugin.settings.$level1.trigger('hide.ddn');


              // Show
              if( $(this).hasClass(plugin.settings.prefix +'-parent') ) {

                var $level1 = $(this);

                plugin.settings.hoverTimer = setTimeout(function() {
                  $level1.trigger('show.ddn');
                }, plugin.settings.delay);

              }

            })
            .on('mouseout', function() {
              clearTimeout(plugin.settings.hoverTimer);
            });

          plugin.settings.$level1.find('span').on('mouseenter.ddn', function(event) {
            $(this).parent().trigger('mouseenter.ddn');
          });

          // Hide subs if mouseleave links.
          plugin.settings.$level1.on('mouseleave.ddn', function() {
            hideWithTimeout($('.'+ plugin.settings.prefix +'-opened').next() );
          });

          plugin.settings.$subs
            .hover(function() {
              setFlag(true);
            }, function() {
              setFlag(false);

              // Hide width timeout
              hideWithTimeout( $(this) );

            })
            .click(function (event) {
              event.stopPropagation();
            });

        }


      $body.keydown(function(event) {

        // ESC
        if (event.keyCode == 27) {
          plugin.settings.$parents.trigger('hide.ddn');
        }

      }).on('click.ddn', function(event) {
        plugin.settings.$parents.trigger('hide.ddn');
      });

      // Avoid closing on click on subs.
      plugin.settings.$subs.on('click.ddn', function(event) {
        event.stopPropagation();
      });


      $nav.on('destroy.ddn', function() {

        plugin.settings.$level1.off('.ddn');

        $nav
          .removeData('dropDownNav')
          .removeClass('ddn--nav')
          .find('.ddn--parent').removeClass('ddn--parent')
          .end()
          .find('.ddn--sub').removeClass('ddn--sub').removeAttr('style');

      });


      // Recalculate submenu position.
      $nav.on('refreshSub.ddn', function() {
        var $sub = plugin.settings.$subs.filter(':visible');
        $sub.position(plugin.settings.position);
      });


    };


    // Show sub.
    var show = function ($trigger) {

      $trigger
        .addClass(plugin.settings.prefix +'-opened')
        .attr({
          'aria-expanded': true
        });

      $sub = $trigger.next();

      $sub.attr({
        'aria-hidden': false
      });

      // Positioning.
      if( ! plugin.settings.customPositionOf )
        plugin.settings.position.of = $trigger;

      $sub.position(plugin.settings.position);

      // Callback function.
      plugin.settings.onShow($sub);

    };


    // Hide subs.
    var hide = function ($trigger) {

      if ($trigger.hasClass(plugin.settings.prefix + '-opened')) {
        //$trigger.focus();
      }

      $trigger
        .removeClass(plugin.settings.prefix + '-opened')
        .attr({
          'aria-expanded': false
        });

      $sub = $trigger.next();
      $sub.attr({
        'aria-hidden': true
      });


      // Callback function.
      plugin.settings.onHide($sub);

    };


    // Hide sub with timeout.
    var hideWithTimeout = function ($sub) {

      plugin.timeoutID = window.setTimeout(function() {

        if (!$nav.data('flag')) {
          $sub.prev().trigger('hide.ddn');
        }

      }, plugin.settings.delay);

    };


    // Set flag.
    var setFlag = function (flag) {
      $nav.data('flag', flag);
    };


    plugin.init();

  };




  $.fn.dropDownNav = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('dropDownNav')) {

        var plugin = new $.dropDownNav(this, options);
        $(this).data('dropDownNav', plugin);

      }

    });

  };


})( jQuery );
