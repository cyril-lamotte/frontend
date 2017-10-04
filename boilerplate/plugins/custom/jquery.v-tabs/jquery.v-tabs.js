(function( $ ){

  $.vTabs = function (element, options) {

    // Default options.
    var defaults = {
      prefix : 'v-tabs__',
      mode: 'slide',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $wrap = $(element);

    plugin.settings = {};

    plugin.init = function() {

      // Merge user's options.
      plugin.settings = $.extend({}, defaults, options);

      plugin.settings.$panels = $wrap.find('.v-tabs__panel');
      plugin.settings.$panelsBody = $wrap.find('.v-tabs__content');
      plugin.settings.$anchors = $wrap.find('.v-tabs__title');

      // Attach events
      attachEvents();

      // Open panels.
      plugin.settings.$panels.filter('[data-v-tabs="open"]').find('.v-tabs__content').trigger('show.vt');

    };


    /** Attach events */
    var attachEvents = function() {

      plugin.settings.$panelsBody
        .on('show.vt', function(event, options) { showPanel($(this), options); event.stopPropagation(); })
        .on('hide.vt', function(event, options) { hidePanel($(this), options); event.stopPropagation(); });

      plugin.settings.$anchors
        .on('click.vt', function(event) {

          event.preventDefault();

          var panelSelector = $(this).attr('href');
          var oneShotSettings = {
            'connect': false
          };

          if ($(this).filter('[data-v-tabs-option="connect"]').length) {
            oneShotSettings.connect = true;
          }

          if ($(this).hasClass(plugin.settings.prefix + 'title--is-active')) {

            if (!oneShotSettings.connect)
              $(panelSelector).trigger('hide.vt', oneShotSettings);

          }
          else {
            $(panelSelector).trigger('show.vt',  oneShotSettings);
          }

        });

    };


    /** Shows the panel */
    var showPanel = function($panel, options) {

      if (options) {

        // Hide others.
        if (options.connect) {
          plugin.settings.$panelsBody.trigger('hide.vt');
        }
      }



      var panelId = $panel.attr('id');
      var $triggers = plugin.settings.$anchors.filter('[href="#' + panelId + '"]');

      $triggers.addClass(plugin.settings.prefix + 'title--is-active');
      $panel.parents('.' + plugin.settings.prefix + 'panel').addClass(plugin.settings.prefix + 'panel--is-active');

      switch(plugin.settings.mode) {

        case 'slide' :

        // Slide FX.
        $panel.slideDown('fast', function() {
          $(this).addClass(plugin.settings.prefix + 'is-opened');
        });

        break;

        case 'toggle' :
          plugin.settings.$panel.addClass(plugin.settings.prefix + 'is-opened');
        break;

        default:
          console.log('Unknow mode.');
      }


      // Callback function.
      plugin.settings.onShow($panel, $triggers);

    };

    /** Hides the panel */
    var hidePanel = function($panel, options) {

      var panelId = $panel.attr('id');
      var $triggers = plugin.settings.$anchors.filter('[href="#' + panelId + '"]');

      $triggers.removeClass(plugin.settings.prefix + 'title--is-active');
      $panel.parents('.' + plugin.settings.prefix + 'panel').removeClass(plugin.settings.prefix + 'panel--is-active');

      switch(plugin.settings.mode) {

        case 'slide' :

        // Slide FX.
        $panel.slideUp('fast', function() {
          $(this).removeClass(plugin.settings.prefix + '-is-opened');
        });

        break;

        case 'toggle' :
          plugin.settings.$panel.removeClass(plugin.settings.prefix + '-is-opened');
        break;

        default:
          console.log('Unknow mode.');
      }

      // Callback function.
      plugin.settings.onHide($panel, $triggers);

    };

    plugin.init();

  };



  $.fn.vTabs = function(options) {

    return this.each(function() {

      if (undefined === $(this).data('vTabs')) {

        var plugin = new $.vTabs(this, options);
        $(this).data('vTabs', plugin);

      }

    });

  };


})( jQuery );
