(function ($) {


  $.togglePanel = function (element, options) {

    // Default options
    var defaults = {
      prefix : 'tgp-',
      wrapper: false,
      connect: false,
      panel: 'next',
      findPanel: function() {},
      panelLabel: 'Panel',
      mode: 'slide',
      autoFocus: true,
      selfClose: true,
      returnFocus: true,
      onShow: function () {},
      onShowEnd: function () {},
      onHide: function () {},
      onHideEnd: function () {}
    };

    var plugin = this,
        $trigger = $(element);

    plugin.settings = {};


    /** plugins initialisation */
    plugin.init = function () {

      // Merge user's options
      plugin.settings = $.extend({}, defaults, options);

      // Get associated panel
      getPanel();

      // Get first focusable element.
      plugin.settings.focusableElementsFirst = plugin.settings.$panel.find('a, :input').first();


      initAttributes();
      attachEvents();

      // Open panels.
      if ($trigger.data('tgp-opened'))
      {
        plugin.settings.$panel
          .trigger('show.tgp');
      }

    };

    var getPanel = function() {

      switch (plugin.settings.panel) {

        case 'next':

          // The panel is the next element or the parent's next element.
          if ($trigger.next().length)
            plugin.settings.$panel = $trigger.next();
          else {
            plugin.settings.$panel = $trigger.parent().next();
          }

          // Add id attribute if not exist.
          if (!plugin.settings.$panel.attr('id'))
          {
            // Generate unique id.
            var uniqueId = generateId();
            plugin.settings.$panel.attr('id', 'tp-'+ uniqueId);
          }

          break;

        case 'id':

          // Trigger has 'tgp-panel-id' attributes with panel id.
          if (!$trigger.data('tgp-panel-id'))
            throw new Error('Missing attribute "data-tgp-panel-id".');

          plugin.settings.$panel = $('#'+ $trigger.data('tgp-panel-id'));

          break;

        case 'function':

          // If panel equals to 'function', it needs findPanel setting which
          // must returns the content panel.
          plugin.settings.$panel = plugin.settings.findPanel($trigger);

          if (!plugin.settings.$panel.length) {
            throw new Error('findPanel method does not returns valid element.');
          }

          break;

        default:

          console.log('No panel content detected.');

      }

    };

    /** Generate unique HTML id */
    var generateId = function() {

      var id = Math.random() + '';
      id = id.substr(2, 9);

      if ($('#'+ id).length)
        id = generateId();

      return id;
    };

    /** Insert ARIA & classes attributes */
    var initAttributes = function() {

      // Add classes
      $trigger.addClass(plugin.settings.prefix +'-trigger');
      plugin.settings.$panel.addClass(plugin.settings.prefix +'-panel');

      if (plugin.settings.wrapper.length)
        plugin.settings.wrapper.addClass(plugin.settings.prefix +'-wrapper');


      // Add attributes
      $trigger.attr({
        'aria-expanded' : false,
        'aria-controls' : plugin.settings.$panel.attr('id'),
      });

      plugin.settings.$panel.attr({
        'aria-hidden' : true,
        'role' : 'region',
        'aria-label' : plugin.settings.panelLabel
      });

    };

    /** Shows the panel */
    var showPanel = function() {

      // Active trigger
      $trigger.addClass( plugin.settings.prefix +'-trigger--is-active' )
        .attr('aria-expanded', true);

      // Show panel
      plugin.settings.$panel
        .attr('aria-hidden', 'false');

      // Slide FX
      if (plugin.settings.mode == 'slide')
      {
        plugin.settings.$panel.slideDown('fast', function() {
          $(this).addClass(plugin.settings.prefix + '-is-opened');
          plugin.settings.onShowEnd();
        });
      }

      // Toggle FX
      if (plugin.settings.mode == 'toggle')
      {
        plugin.settings.$panel.addClass(plugin.settings.prefix + '-is-opened');
      }

      // Move focus to panel
      if (plugin.settings.autoFocus) {
        plugin.settings.focusableElementsFirst.focus();
      }

      // Callback function
      plugin.settings.onShow(plugin.settings.$panel, $trigger);

    };



    /** Hides the panel */
    var hidePanel = function() {

      if ( ! $trigger.hasClass( plugin.settings.prefix +'-trigger--is-active' ) )
        return;

      // Move focus to trigger
      $trigger
        .removeClass(plugin.settings.prefix +'-trigger--is-active')
        .attr('aria-expanded', false);

      // Return focus
      if ( plugin.settings.returnFocus === true)
        $trigger.focus();


      plugin.settings.$panel
        .attr('aria-hidden', 'true');

      // Slide FX
      if ( plugin.settings.mode == 'slide' )
      {
        plugin.settings.$panel.slideUp('fast', function() {
          $(this).removeClass(plugin.settings.prefix + '-is-opened');
          plugin.settings.onHideEnd();
        });
      }


      // Toggle FX
      if ( plugin.settings.mode == 'toggle' )
      {
        plugin.settings.$panel.removeClass(plugin.settings.prefix + '-is-opened');
      }



      // Callback function
      plugin.settings.onHide( plugin.settings.$panel, $trigger );

    };



    /** Attach trigger events */
    var attachTriggerEvents = function() {

      $trigger.click(function (event) {

        event.preventDefault();
        event.stopPropagation();

        // Close panel on click on active trigger
        if ( $(this).hasClass( plugin.settings.prefix +'-trigger--is-active' ) && plugin.settings.selfClose === true ) {
          plugin.settings.$panel.trigger('hide.tgp');
        }
        else {


          // If panels are connected, close all
          if ( plugin.settings.connect ) {
            plugin.settings.wrapper.find('.'+ plugin.settings.prefix + '-panel')
            .trigger('hide.tgp');
          }

          plugin.settings.$panel.trigger('show.tgp');

        }

      });

    };



    /** Attach events */
    var attachEvents = function () {

      // Listen custom events & stop propagation (avoid <body>'s behavior)
      plugin.settings.$panel
        .bind('no-autofocus.tgp', function(event) { plugin.settings.autoFocus = false; event.stopPropagation(); })
        .bind('show.tgp', function(event) { showPanel(); event.stopPropagation(); })
        .bind('hide.tgp', function(event) { hidePanel();  event.stopPropagation();});

      attachTriggerEvents();

    };



    plugin.init();

  };



  $.fn.togglePanel = function (options) {

    return this.each(function () {

      if (undefined === $(this).data('togglePanel')) {
        var plugin = new $.togglePanel(this, options);
        $(this).data('togglePanel', plugin);
      }

    });

  };




})(jQuery);

