(function ($) {

  'use strict';

  $.tooltipAria = function (element, options) {

    // Default options
    var defaults = {
      prefix : 'ta__',
    };

    var plugin = this,
        $trigger = $(element);

    plugin.settings = {};


    /** plugins initialisation */
    plugin.init = function () {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);

      // Get text.
      plugin.settings.text = $trigger.attr('title');

      createTooltip();

      plugin.settings.tooltip = $('#' + plugin.settings.id);

      initAttributes();
      attachEvents();

    };

    var createTooltip = function() {

      plugin.settings.id = plugin.settings.prefix + generateId();
      var html = '<span class="' + plugin.settings.prefix + 'tooltip" id="' + plugin.settings.id + '" role="tooltip" aria-hidden="true">' + plugin.settings.text + '</span>';

      $(html).insertAfter($trigger);
    };

    /** Generate unique HTML id */
    var generateId = function() {

      var id = Math.random().toString(32);
      id = id.substr(2, 9);

      if ($('#'+ id ).length)
        id = generateId();

      return id;
    };

    /** Insert ARIA & classes attributes */
    var initAttributes = function() {

      // Add classes
      $trigger
        .addClass(plugin.settings.prefix + 'trigger')
        .attr('data-tp-title', plugin.settings.text)
        .removeAttr('title');

      // Add attributes
      $trigger.attr({
        'aria-describedby' : plugin.settings.id,
      });

    };

    /** Shows the panel */
    var showTooltip = function() {

      // Active trigger
      $trigger.addClass(plugin.settings.prefix + 'trigger--is-tooltip');

      // Show tooltip
      plugin.settings.tooltip.attr('aria-hidden', 'false');

      plugin.settings.tooltip.position({
        of: $trigger,
        my: 'center bottom',
        at: 'center top',
        collision : 'flip'
      });

    };

    /** Hides the panel */
    var hideTooltip = function() {

      // Active trigger
      $trigger.removeClass(plugin.settings.prefix + 'trigger--is-tooltip');

      // Hide tooltip
      plugin.settings.tooltip.attr('aria-hidden', 'true');

    };

    /** Attach events */
    var attachEvents = function () {

      $trigger
       .on('mouseenter focus', function(event) {
          showTooltip();
        })
        .on('mouseleave blur', function(event) {
          hideTooltip();
        })
        .on('keydown', function(event) {

          if ( event.keyCode == 27 ) { // esc
            hideTooltip();
          }

        });

    };

    plugin.init();

  };



  $.fn.tooltipAria = function (options) {

    return this.each(function () {

      if (undefined === $(this).data('tooltipAria')) {
        var plugin = new $.tooltipAria(this, options);
        $(this).data('tooltipAria', plugin);
      }

    });

  };




})(jQuery);

