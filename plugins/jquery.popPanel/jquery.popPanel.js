(function( $ ){

  /**
  * Plugin jQuery popPanel v1.2.0 (05/2015)
  *
  */

  $.popPanel = function(element, options) {

    // Defaults options
    var defaults = {
      prefix : 'pop-panel-',
      idPopTitle: null,
      closeTrigger: null,
      selectorFocusableElements: 'a, button, input',
      position: {
        my: 'left top',
        at: 'left bottom',
        collision : 'flip'
      },
      onOpen: function() {},
      onClose: function() {}
    };

    var plugin = this,
        $element = $(element);

    plugin.settings = {};



    plugin.init = function() {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);


      // Set trigger
      plugin.settings.trigger =  $element;

      // Get panel id
      plugin.settings.panelId =  plugin.settings.trigger.data('pop-panel-id');

      // Get target
      plugin.settings.pop = $('#'+ plugin.settings.panelId);

      // Set position referer
      plugin.settings.position.of = plugin.settings.trigger;

      // Get focusable elements
      plugin.settings.focusableElements = plugin.settings.pop.find(plugin.settings.selectorFocusableElements);

      // Get pop title for accessibility. It's trigger's text by default
      if( plugin.settings.idPopTitle === null )
        plugin.settings.idPopTitle = plugin.settings.trigger.attr('id');

      // Add ARIA attributes on trigger
      plugin.settings.trigger.attr({
        'aria-expanded': false,
        'aria-controls': plugin.settings.panelId
      }).addClass( plugin.settings.prefix +'-trigger' );

      // Add class & ARIA attributes on pop
      plugin.settings.pop.attr({
        'role':            'region',
        'aria-hidden' :    true,
        'tabindex':        '-1',
        'aria-labelledby': plugin.settings.idPopTitle
      }).addClass( plugin.settings.prefix +'-is-closed' );


      // Attach events
      attachEvents();

    };


    // Attach events
    var attachEvents = function() {

      // On trigger click
      plugin.settings.trigger.click(function (event) {

        event.stopPropagation();


        // Close all others pops
        $('.'+ o.prefix +'-is-active').each(function(i, el) {

          if( el !== o.trigger[0] ) {
            $(this).data('popPanel').close();
          }

        });


        if( $(this).hasClass( plugin.settings.prefix +'-is-active' ) )
        {
          close();
        }
        else {

          // Close opened pops
          $('button.pop-panel--trigger').each(function(i, el) {
            $(this).data('popPanel').close();
          });

          open();

        }

      });


      // Stop propagation (avoid <html> click behavior)
      plugin.settings.pop.click(function (event) {
        event.stopPropagation();
      });


      // Close button
      plugin.settings.pop.find(plugin.settings.closeTrigger).click(function (event) {
        close();
      });


      // Close with ESC key
      plugin.settings.pop.keydown(function(event) {

        // ESC
        if (event.keyCode == 27) { close(); }

      });


      // Close when focus is leaving
      plugin.settings.focusableElements.last().keydown(function(event) {

        // TAB
        if (event.keyCode == 9) { close(); }

      });


      // Close on outside click
      $('html').click(function(event) {
        close();
      });

    };



    // Open pop
    var open = function() {

      // Update trigger attributes
      plugin.settings.trigger
        .addClass( plugin.settings.prefix +'-is-active' )
        .attr('aria-expanded', true);

      // Update pop attributes & move focus to
      plugin.settings.pop
        .removeClass( plugin.settings.prefix +'-is-closed')
        .addClass(plugin.settings.prefix +'-is-opened')
        .position( plugin.settings.position )
        .attr({
          'aria-hidden': false,
          'tabindex': 0
        })
        .focus();

      // Trigger callback function
      plugin.settings.onOpen();

    };


    // Close pop
    var close = function() {

      // Update trigger attributes
      plugin.settings.trigger
        .removeClass( plugin.settings.prefix +'-is-active' )
        .attr('aria-expanded', false);

      // Update pop attributes
      plugin.settings.pop
        .addClass( plugin.settings.prefix +'-is-closed' )
        .removeClass( plugin.settings.prefix +'-is-opened')
        .attr('aria-hidden', true);

      // Trigger callback function
      plugin.settings.onClose();

    };


    // Public method
    // Call : $('.element').data('popPanel').close()
    plugin.close = function() {
      close();
    };


    plugin.init();

  };



  $.fn.popPanel = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('popPanel')) {

        var plugin = new $.popPanel(this, options);
        $(this).data('popPanel', plugin);

      }

    });

  };


})( jQuery );
