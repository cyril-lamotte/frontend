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

      // Accéder à l'élément jQuery :     $element
      // Accéder à l'élément DOM :        element
      // Accéder aux options :            plugin.settings.myOption

      // Exécuter une fonction interne    myFonction()
      // Exécuter une fonction plublique  plugin.myFonction()

      // Lancer une temporisation         window.setTimeout('$(".element").data("menuLevel").myFonction()', 1000);


      // Links with sublevel
      plugin.settings.$menuTriggers = $element.find('a:not(.'+ plugin.settings.prefix +'leaf)');

      // Hide sublevels
      $element.find('> .menu-level .menu-level').addClass( plugin.settings.prefix + 'hidden');

      // Attach events
      setEvents();

    };


    // Attach events
    var setEvents = function() {

      // Level's triggers
      plugin.settings.$menuTriggers.click(function (event) {
        event.preventDefault();

        // Show sublevel
        $(this).next('.menu-level').removeClass('menu-level-hidden');

      });


      // Back
      $element.find('button.menu-level-back').click(function (event) {

        // Hide current level
        $(this).parents('.menu-level').first().addClass('menu-level-hidden');


      });

    };


    // Public function
    // Call : $('.element').data('menuLevel').goToFirstPanel()
    plugin.goToFirstPanel = function() {

      $('.menu-level').addClass('menu-level-hidden')
        .first().removeClass('menu-level-hidden');

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
