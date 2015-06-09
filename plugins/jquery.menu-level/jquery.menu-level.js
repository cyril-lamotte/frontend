(function( $ ){

  'use strict';

  /**
  * jQuery plugin menuLevel v1.0.0
  *
  */

  $.menuLevel = function(element, options) {

    // Default options
    var defaults = {
      prefix: 'menu-level-',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $element = $(element);

    plugin.settings = {};



    plugin.init = function() {

      // Include user's options
      plugin.settings = $.extend({}, defaults, options);

      // Wrap all levels
      // and add class on parents
      $element
        .find('ul')
          .wrap('<div class="'+ plugin.settings.prefix +'-level"></div>')
        .end()
          .find('.'+ plugin.settings.prefix +'-level').prev('a')
            .addClass(plugin.settings.prefix +'-parent');

      // Create back button
      $(element).find('> div > ul ul').before('<button type="button" class="'+ plugin.settings.prefix +'-back"><span>Retour</span></button>');

      // Links with sublevel
      plugin.settings.$menuTriggers = $element.find('a.'+ plugin.settings.prefix +'-parent');

      // Hide sublevels
      $element.find('> .'+ plugin.settings.prefix +'-level .'+ plugin.settings.prefix +'-level').addClass( plugin.settings.prefix + '-hidden');



      // Attach events
      setEvents();

    };


    // Attach events
    var setEvents = function() {

      // Level's triggers
      plugin.settings.$menuTriggers.click(function (event) {
        event.preventDefault();

        // Show sublevel
        $(this).next('.'+ plugin.settings.prefix +'-level').removeClass( plugin.settings.prefix +'-hidden');

      });


      // Back
      $element.find('button.'+ plugin.settings.prefix +'-back').click(function (event) {

        // Hide current level
        $(this).parents('.'+ plugin.settings.prefix +'-level').first().addClass( plugin.settings.prefix +'-hidden');

      });

      // Display the first level
      $element.bind('ml:goToFirstPanel', function() {

        $('.'+ plugin.settings.prefix +'-level').addClass( plugin.settings.prefix +'-hidden')
          .first().removeClass('menu-level-hidden');

      });

    };


    plugin.init();

  };



  $.fn.menuLevel = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('menuLevel')) {

        var plugin = new $.menuLevel(this, options);
        $(this).data('menuLevel', plugin);

      }

    });

  };


})( jQuery );
