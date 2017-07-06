(function( $ ){

  'use strict';

  /**
  * jQuery plugin menuLevel v1.0.0
  *
  */

  $.menuLevel = function(element, options) {

    // Default options
    var defaults = {
      prefix: 'mlvl-',
      sublevel: 'ul',
      repeatParentInSub: true
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
        .wrapInner('<div class="' + plugin.settings.prefix + 'level ' + plugin.settings.prefix + 'level--top"></div>')
        .find(plugin.settings.sublevel)
          .wrap('<div class="' + plugin.settings.prefix +'level"></div>')
        .end()
          .find('.' + plugin.settings.prefix + 'level').prev('a, span')
            .addClass(plugin.settings.prefix + 'parent');

      // Save levels
      plugin.settings.$topLevel = $('.' + plugin.settings.prefix + 'level--top');
      plugin.settings.$subLevels = plugin.settings.$topLevel.find('.' + plugin.settings.prefix + 'level');

      // Links with sublevel
      plugin.settings.$menuTriggers = $element.find('a.'+ plugin.settings.prefix +'parent, span.'+ plugin.settings.prefix +'parent');

      // Create parent link
      if (plugin.settings.repeatParentInSub) {

        $.each(plugin.settings.$subLevels, function(i, el) {
          $(this).prev().clone().prependTo($(this)).removeClass('active '+ plugin.settings.prefix +'parent').addClass(plugin.settings.prefix +'parent-clone');
          $(this).prepend('<button type="button" class="'+ plugin.settings.prefix +'-back"><span class="back-arrow"></span><span>'+ $(this).prev().text() +'</span></button>');
        });

      }
      else {

        $.each(plugin.settings.$subLevels, function(i, el) {
          $(this).prepend('<button type="button" class="'+ plugin.settings.prefix +'-back"><span class="back-arrow"></span><span>'+ $(this).prev().text() +'</span></button>');
        });

      }


      // "Back" buttons
      plugin.settings.$backBtns = $element.find('button.'+ plugin.settings.prefix +'-back');

      // Hide sublevels
      plugin.settings.$subLevels.addClass(plugin.settings.prefix + '-is-hidden');

      // Attach events
      setEvents();

    };


    // Attach events
    var setEvents = function() {

      // Show
      plugin.settings.$subLevels.on('show.mlvl', function() {
        $(this).removeClass( plugin.settings.prefix + '-is-hidden');
      });

      // Hide current level
      plugin.settings.$subLevels.on('hide.mlvl', function() {
        $(this).addClass(plugin.settings.prefix + '-is-hidden');
      });

      // Level's triggers
      plugin.settings.$menuTriggers.click(function (event) {

        event.preventDefault();
        $(this).next().trigger('show.mlvl');

      });

      // Back
      plugin.settings.$backBtns.click(function (event) {
        $(this).parent().trigger('hide.mlvl');
      });

      // Display the first level
      $element.bind('ml:goToFirstPanel', function() {
        plugin.settings.$subLevels.trigger('hide.mlvl');
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
