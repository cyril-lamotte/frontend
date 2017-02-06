(function($) {

  /**
   * Make a block clickable.
   *
   * @param {object} options - Settings
   */
  $.blockLink = function(element, options) {

   "use strict";

    // Defaults options.
    var defaults = {
          target: 'a',
          blocks: '',
          prefix: 'block-link'
        },
        plugin = this,
        $block = $(element);

    plugin.settings = {};

    /** Plugin initialisation */
    plugin.init = function() {

      // Merge user's options.
      plugin.settings = $.extend({}, defaults, options);

      // Attach events.
      attachEvents();

    };


    var attachEvents = function() {

      // Init blocks.
      $('body').on('mouseenter touchstart', plugin.settings.blocks, function (event) {

        // Do nothing if there is no link.
        if (!$(this).find(plugin.settings.target).length)
          return;

        $(this).addClass(plugin.settings.prefix);

      });

      // Init blocks on load.
      // (blocks which are inserted after domready are managed too).
      $(plugin.settings.blocks)
        .trigger('mouseenter')
        .trigger('touchstart');


      $('body').on('click', plugin.settings.blocks + ' ' + plugin.settings.target, function(event, eventType) {
        event.stopPropagation();

        // Block was clicked.
        if (eventType !== undefined) {

          // New tab with middle button or click on link "_blank".
          if (eventType.which == 2 || eventType.which == 1 && $(this).attr('target') == '_blank') {
            window.open($(this).attr('href'), '_blank');
            event.preventDefault();
          }
          else if (eventType.which == 1 && $(this).attr('target') != '_blank') {
            location.href = $(this).attr('href');
          }

        }

      }).on('focus blur', plugin.settings.target, function(event) {
        // Toggle class on focus & blur.
        $(this).parents('div.'+ plugin.settings.prefix).toggleClass(plugin.settings.prefix + '--focus');
      });


      // Click on the block.
      $('body').on('click mouseup', plugin.settings.blocks, function(event) {

        // Avoid double tab.
        if (event.type == 'mouseup' && event.which == 1) {
          return;
        }

        event.stopPropagation();

        var $link = $(this).find(plugin.settings.target).first();

        // Do nothing if there is no link.
        if (!$(this).find(plugin.settings.target).length)
          return;

        $link.trigger('click', {'which': event.which});

      });

      // Do not propagate mouseup event (to avoid double tab with middle button).
      $('body').on('mouseup', plugin.settings.blocks + ' ' + plugin.settings.target, function (event) {
        event.stopPropagation();
      });

    };

    plugin.init();

  };


  $.fn.blockLink = function(options) {
    var plugin = new $.blockLink(this, options);
    return this;
  };

})(jQuery);
