(function( $ ){

  /**
  * Plugin jQuery simpleDropDown v1.4.1
  */

  $.simpleDropDown = function(element, options) {

    // Defaults options
    var defaults = {
      prefix: 'sdd-',
      delay: 500,
      position: {
        my: 'left top',
        at: 'left bottom'
      },
      submenuClass: '.sdd-sub-nav',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $element = $(element);

    plugin.settings = {};



    plugin.init = function() {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);

      // Merge position object
      if( options )
        plugin.settings.position = $.extend({}, defaults.position, options.position);

      plugin.settings.$menu = window.axsddMenu = $element;
      plugin.settings.$activeSubmenu = null;

      // Initialiser le marqueur de survol
      setFlag(false);

      // Attach events
      attachEvents();

    };


    // Afficher le sous-menu
    var show = function() {
      plugin.settings.$activeSubmenu.show();
      plugin.settings.onShow();
    };


    // Masquer les sous-menu
    var hide = function() {

      if( plugin.settings.$activeSubmenu === null)
        return;

      plugin.settings.$activeSubmenu
        .removeAttr('data-'+ plugin.settings.prefix +'active')
        .hide()
        .prev()
          .removeClass(plugin.settings.prefix +'active');

      plugin.settings.onHide();
    };


    // Masquer le sous-menu avec temporisation
    var hideWithTimeout = function() {

      window.axsddActiveSubmenu = plugin.settings.$activeSubmenu;
      window.timeoutID = window.setTimeout('$.fn.simpleDropDownHide()', plugin.settings.delay);

    };


    // Positioning
    var position = function() {

      if( Modernizr.mq('only all and (max-width: 768px)') )
        return false;

      var $activeSubmenu = plugin.settings.$menu.find( plugin.settings.submenuClass +'[data-'+ plugin.settings.prefix +'active=1]');

      if( ! $activeSubmenu.length )
        return;

      plugin.settings.position.of = $activeSubmenu.parent();

      $activeSubmenu.position( plugin.settings.position );

    };


    // Définir le flag
    var setFlag = function(flag) {
      plugin.settings.$menu.data('flag', flag);
    };


    var attachEvents = function() {

      // Placer un marqueur au survol des sous-menus
      plugin.settings.$menu
        .find( plugin.settings.submenuClass ).hover(function() {

          setFlag(true);

        }, function() {

          setFlag(false);

          // Masquer aprés temporisation
          hideWithTimeout();

        });


      // Afficher au survol du trigger
      plugin.settings.$menu.find('> li > a')
        .bind('mouseenter focus', function() {

          // Masquer les sous-menus
          hide();

          try { clearTimeout(timeoutID); }
          catch(e) {}

          $(this).addClass(plugin.settings.prefix +'active');

          plugin.settings.$activeSubmenu = $(this).next();
          plugin.settings.$activeSubmenu
            .attr('data-'+ plugin.settings.prefix +'active', 1);

          show();
          position();

        }).bind('mouseleave', function() {

          // Désactiver le menu au mouseleave
          if( ! plugin.settings.$activeSubmenu.length )
            $(this).removeClass(plugin.settings.prefix +'active');

          // Masquer si la souris ne survole pas
          if( ! plugin.settings.$menu.data('flag') )
          {
            // Masquer aprés temporisation
            hideWithTimeout();
          }

        }).bind('click', function(event) {

          if( Modernizr.mq('only all and (max-width: 768px)') )
            event.preventDefault();

        });


      // Masquer le dernier sous menu à la tabulation sur le dernier lien
      plugin.settings.$menu.find('> li:last ul a:last')
        .blur(function() {
          hide();
        });

    };

    plugin.init();

  };



  $.fn.simpleDropDown = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('simpleDropDown')) {

        var plugin = new $.simpleDropDown(this, options);
        $(this).data('simpleDropDown', plugin);

      }

    });

  };

  $.fn.simpleDropDown = function() {

    if( ! axsddMenu.data('flag') )
    {
      axsddActiveSubmenu.hide()
      .prev()
        .removeClass('sdd-'+'active');

    }
  };


})( jQuery );
