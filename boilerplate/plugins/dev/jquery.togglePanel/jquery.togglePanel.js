(function ($) {

  /**
  * Plugin jQuery toggleWidget v1.0.0
  *
  */
  $.toggleWidget = function (element, options) {

    // Default options
    var defaults = {
      prefix : 'toggle-widget-',
      activePanelClass: '-panel-active',
      connect: false,
      connectRelationClass: '',
      slideMode: 'slide',
      onShow: function () {},
      onHide: function () {}
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(element);




    plugin.init = function () {

      // Merge with user's options
      plugin.settings = $.extend({}, defaults, options);
      plugin.settings.$trigger = $element;

      var panelID = plugin.settings.$trigger.data('toggle-widget-id');
      plugin.settings.$panel = $('#' + panelID);


      // Set trigger's attributes
      plugin.settings.$trigger.attr({
        'aria-expanded': false,
        'aria-controls': panelID
      });

      // Get id for labelling
      plugin.settings.idWidgetTitle = plugin.settings.$trigger.attr('id');

      // Set panel's attributes
      plugin.settings.$panel.attr({
        'aria-hidden' : 'true',
        'aria-labelledby' : plugin.settings.idWidgetTitle,
        'role' : 'region',
        'tabindex' : '-1'
      }).addClass(plugin.settings.prefix + '-panel ' + plugin.settings.prefix + '-is-closed ');


      // Listen events
      setEvents();

    };


    // Listen widget events
    var setEvents = function () {

      // Toggle
      plugin.settings.$trigger.click(function (event) {

        event.preventDefault();

        toggle();

      });


      plugin.settings.$panel.click(function (event) {
        event.stopPropagation();
      });

    };


    // Expand panel on click
    var toggle = function () {

      return ( ! plugin.settings.$panel.is(':visible') ) ? show() : hide();

    };


    // Show panel
    var show = function () {

      // Widget are connected (only one opened)
      if ( plugin.settings.connect ) {
        hideAll();
      }


      // If slide-mode
      if ( plugin.settings.slideMode == 'slide' ) {
        plugin.settings.$panel.slideDown('fast', function () {

          plugin.settings.$trigger
            .attr('aria-expanded', true)
            .addClass(plugin.settings.prefix +'-is-active');

          plugin.settings.$panel
            .removeClass( plugin.settings.prefix +'-is-closed')
            .addClass( plugin.settings.prefix +'-is-opened')
            .attr('aria-hidden', false)
            .attr('tabindex', '0')
            .focus();

        });
      }

      plugin.settings.onShow(plugin.settings);

    };



    // Hide panel
    var hide = function () {

      // If slide-mode
      if ( plugin.settings.slideMode == 'slide' ) {

        plugin.settings.$panel.slideUp('fast', function () {

          // Move focus on trigger
          plugin.settings.$trigger
            .attr('aria-expanded', false)
            .removeClass( plugin.settings.prefix +'-is-active' )
            .focus();

          plugin.settings.$panel
            .attr('aria-hidden', true)
            .addClass( plugin.settings.prefix +'-is-closed' )
            .removeClass( plugin.settings.prefix +'-is-opened');

        });

      }

      plugin.settings.onHide(plugin.settings);

    };


    var keys = function () {

      plugin.settings.$panel.keydown(function (event) {

        // ESC
        if (event.keyCode === 27) {
          plugin.settings.$trigger
            .removeClass(plugin.settings.prefix + '-is-active')
            .attr('aria-expanded', false)
            .focus();

          plugin.settings.$panel
            .addClass(plugin.settings.prefix + '-is-closed')
            .removeClass(plugin.settings.prefix + '-is-opened')
            .attr('aria-hidden', 'true');

        }

      });


    };

    // hide all widgets
    var hideAll = function (except) {
/*
      $(plugin.settings.connectRelationClass).find('.'+ plugin.settings.activePanelClass)
      .removeClass(plugin.settings.activePanelClass)
      .attr('aria-hidden', true)
      .each(function (i, el) {

        var id = $(this).attr('id');
        $('[data-toggle-widget-id='+ id +']')
          .removeClass('toggle-widget-trigger-active')
          .attr('aria-expanded', false);

      });
*/
    };

    plugin.init();

  };



  $.fn.toggleWidget = function (options) {

    return this.each(function () {

      if (undefined === $(this).data('toggleWidget')) {

        var plugin = new $.toggleWidget(this, options);
        $(this).data('toggleWidget', plugin);

      }

    });

  };




})(jQuery);
