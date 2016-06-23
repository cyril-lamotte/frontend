(function( $ ){

  /**
  * Plugin jQuery rwdListToButton v1.0.0 (02/2015)
  *
  */

  $.rwdListToButton = function(element, options) {

    // Defaults options
    var defaults = {
      triggerdefaultLabel: 'Menu',
      triggerLabelClosed: 'Ouvrir le menu',
      triggerLabelOpened: 'Fermer le menu',
      prefix: 'rwd-ltb-',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $element = $(element);

    plugin.settings = {};



    plugin.init = function() {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);

      // Hide list
      $element.addClass(plugin.settings.prefix +'closed' +' '+ plugin.settings.prefix +'list' );

      // Create trigger
      $element.before('<button type="button" class="' + plugin.settings.prefix +'trigger">'+ plugin.settings.triggerdefaultLabel +'</button>');
      plugin.settings.$trigger = $element.prev();

      // Update trigger label
      if( $element.find('.active').length )
      {
        plugin.settings.triggerdefaultLabel = $element.find('.active').text();
        plugin.settings.$trigger.text( plugin.settings.triggerdefaultLabel );
      }


      // Manage accessibility
      setARIA();

      // Attach events
      setEvents();

    };



    // set ARIA rôles
    var setARIA = function() {

      var labelClosed = plugin.settings.triggerdefaultLabel +' - '+ plugin.settings.triggerLabelClosed;
      var labelOpened = plugin.settings.triggerdefaultLabel +' - '+ plugin.settings.triggerLabelOpened;

      plugin.settings.triggerAttrsClosed = {
        'aria-label' : labelClosed,
        'aria-expanded' : 'false',
        'title' : labelClosed
      };

      plugin.settings.triggerAttrsOpened = {
        'aria-label' : labelOpened,
        'aria-expanded' : 'true',
        'title' : labelOpened
      };

      plugin.settings.panelAttrsClosed = {
        'aria-hidden' : 'true'
      };

      plugin.settings.panelAttrsOpened = {
        'aria-hidden' : 'false'
      };

      plugin.settings.$trigger.attr( plugin.settings.triggerAttrsClosed );
      $element.attr( plugin.settings.panelAttrsClosed );

    };


    // Attach events
    var setEvents = function() {

      plugin.settings.$trigger.click(function (event) {

        var $trigger = $(this);

        $trigger.toggleClass( plugin.settings.prefix +'opened' );
        $element.toggleClass( plugin.settings.prefix +'closed');

        if( $trigger.hasClass( plugin.settings.prefix +'opened' ) )
        {
          $trigger.attr( plugin.settings.triggerAttrsOpened );
          $element.attr( plugin.settings.panelAttrsOpened );
        }
        else {
          $trigger.attr( plugin.settings.triggerAttrsClosed );
          $element.attr( plugin.settings.panelAttrsClosed );
        }

      });

    };


    // Set ARIA attributes
    var setAriaAttr = function(attr, value, $el) {
      $el.attr('aria-'+ attr, value);
    };


    // Set title
    var setTitle = function(value, $el) {
      $el.attr('title', value);
    };

    plugin.init();

  };



  $.fn.rwdListToButton = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('rwdListToButton')) {

        var plugin = new $.rwdListToButton(this, options);
        $(this).data('rwdListToButton', plugin);

      }

    });

  };


})( jQuery );
