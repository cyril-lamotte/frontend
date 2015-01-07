(function( $ ){

  /**
  * Plugin jQuery toggleWidget v1.0.0
  *
  */
  $.toggleWidget = function(element, options) {

    // Default options
    var defaults = {
      activePanelClass: 'toggle-widget-panel-active',
      connect: false,
      connectRelationClass: '',
      slideMode: 'toggle',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(element);

    plugin.init = function() {

      // Ecrasement avec les options utilisateur
      plugin.settings = $.extend({}, defaults, options);

      plugin.settings.$trigger = $element;
      var panelID = plugin.settings.$trigger.data('toggle-widget-id');
      plugin.settings.$panel = $('#'+ panelID);

      setARIA();

      // Listen events
      setEvents();

    };


    // set ARIA rôles
    var setARIA = function() {

      plugin.settings.$trigger.attr('aria-expanded', false);
      plugin.settings.$panel.attr({
        'aria-hidden' : 'true'
      });

    };

    // Listen widget events
    var setEvents = function() {

      // Toggle
      plugin.settings.$trigger.click(function(event) {

        event.preventDefault();
        event.stopPropagation();

        toggle();

      });


      plugin.settings.$panel.click(function (event) {
        event.stopPropagation();
      });


      $('body').click(function (event) {

        hideAll();

      });

    };


    // Expand panel on click
    var toggle = function() {

      if ( ! plugin.settings.$panel.is(':visible') )
        show();
      else
        hide();

    };


    // Show panel
    var show = function() {

      // Widget are connected (only one opened)
      if ( plugin.settings.connect )
      {
        hideAll();
      }

      plugin.settings.$trigger
        .attr('aria-expanded', true)
        .addClass('toggle-widget-trigger-active');

      plugin.settings.$panel
        .attr('aria-hidden', false)
        .addClass(plugin.settings.activePanelClass);

      // If slide-mode
      if ( plugin.settings.slideMode == 'slide' ) {
        plugin.settings.$panel.slideDown('fast');
      }

      plugin.settings.onShow();

    };



    // Hide panel
    var hide = function() {

      plugin.settings.$trigger
        .attr('aria-expanded', false)
        .removeClass('toggle-widget-trigger-active');

      plugin.settings.$panel
        .attr('aria-hidden', true)
        .removeClass(plugin.settings.activePanelClass);

      // If slide-mode
      if ( plugin.settings.slideMode == 'slide' ) {
        plugin.settings.$panel.slideUp('fast');
      }

      plugin.settings.onHide();

    };



    // hide all widgets
    var hideAll = function(except) {

      $(plugin.settings.connectRelationClass).find('.'+ plugin.settings.activePanelClass)
      .removeClass(plugin.settings.activePanelClass)
      .attr('aria-hidden', true)
      .each(function(i, el) {

        var id = $(this).attr('id');
        $('[data-toggle-widget-id='+ id +']')
          .removeClass('toggle-widget-trigger-active')
          .attr('aria-expanded', false);

      });

    };

    plugin.init();

  };



  $.fn.toggleWidget = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('toggleWidget')) {

        var plugin = new $.toggleWidget(this, options);
        $(this).data('toggleWidget', plugin);

      }

    });

  };




})( jQuery );
