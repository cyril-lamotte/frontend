/**
 * @file UI methods
 *
 */

(function( $ ) {

  $.dropDownNav = function(element, options) {

    // Defaults options
    var defaults = {
      prefix: 'ddn-',
      subSelector: '> li > ul',
      delay: 500,
      position: {
        my: 'left top',
        at: 'left bottom'
      },
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $nav = $(element);

    plugin.settings = {};


    /** Plugin initialisation */
    plugin.init = function() {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);

      // Merge position object
      if( options )
        plugin.settings.position = $.extend({}, defaults.position, options.position);

      // If a custom "of" is provided, init a setting
      if( plugin.settings.position.of )
        plugin.settings.customPositionOf = true;

      $nav.addClass(plugin.settings.prefix + '-nav');

      // Find parents links from HTML
      $nav.find(plugin.settings.subSelector).each(function(i, el) {
        $(this).addClass(plugin.settings.prefix +'-sub')
          .prev()
          .addClass( plugin.settings.prefix +'-parent' );
      });


      plugin.settings.$level1 = $nav.find('> li > a, > li > span');

      // Save parents
      plugin.settings.$parents = $nav.find('.'+ plugin.settings.prefix +'-parent');

      // Save subs
      plugin.settings.$subs = $nav.find('.'+ plugin.settings.prefix +'-sub');

      plugin.settings.hoverTimer = null;

      // Initialiser le marqueur de survol
      setFlag(false);

      // Attach events
      attachEvents();

    };



    /** Attach global events */
    var attachEvents = function() {

      plugin.settings.$level1
        .bind('show.ddn', function() { show( $(this) ); })
        .bind('hide.ddn', function() { hide( $(this) ); })
        .bind('mouseenter.ddn focus.ddn', function(event) {

          clearTimeout(plugin.settings.hoverTimer);

          // Hide all
          plugin.settings.$level1.trigger('hide.ddn');


          // Show
          if( $(this).hasClass(plugin.settings.prefix +'-parent') ) {

            var $level1 = $(this);

            plugin.settings.hoverTimer = setTimeout(function() {
              $level1.trigger('show.ddn');
            }, 300);

          }

        })
        .bind('mouseout', function() {
          clearTimeout(plugin.settings.hoverTimer);
        });


      // Hide subs if mouseleave links
      plugin.settings.$level1.bind('mouseleave.ddn', function() {

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


      $('body').on('click.ddn', function (event) {

        plugin.settings.$parents.trigger('hide.ddn');

      });


      $nav.bind('destroy.ddn', function() {

        plugin.settings.$level1.unbind('.ddn');

        $nav
        .removeClass('ddn--nav')
        .find('.ddn--parent').removeClass('ddn--parent')
        .end()
        .find('.ddn--sub').removeClass('ddn--sub').removeAttr('style');

      });



    };




    // Afficher le sous-menu
    var show = function( $trigger ) {

      // Clear timeout
      //try { clearTimeout(plugin.timeoutID); }
      //catch(e) {}

      $trigger.addClass(plugin.settings.prefix +'-opened');

      $sub = $trigger.next();

      // Positioning
      if( ! plugin.settings.customPositionOf )
        plugin.settings.position.of = $trigger;

      $sub.position( plugin.settings.position );

      // Callback function
      plugin.settings.onShow($sub);

    };


    // Masquer les sous-menu
    var hide = function( $trigger ) {

      $trigger.removeClass(plugin.settings.prefix +'-opened');

      // Callback function
      plugin.settings.onHide();

    };


    // Masquer le sous-menu avec temporisation
    var hideWithTimeout = function( $sub ) {

      plugin.timeoutID = window.setTimeout(function() {

        if( ! $nav.data('flag') )
          $sub.prev().trigger('hide.ddn');

      }, plugin.settings.delay);

    };


    // Définir le flag
    var setFlag = function(flag) {
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
