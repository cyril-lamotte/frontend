(function($) {

"use strict";

/**
 * Create expandable tree.
 */
$.popA11y = function(element, options) {

  // Defaults options.
  var defaults = {
    '$trigger': false,
    'label': ''
  };

  // Merge user's options.
  var settings = $.extend({}, defaults, options);

  var plugin = this,
      $pop = $(element);

    /** Plugin initialisation */
    plugin.init = function() {

      // By default, trigger(s) is/are links with anchor = pop's id.
      if (!settings.$trigger) {
        settings.$trigger = $('a[href="#' + $pop.attr('id') + '"]');
      }
      setTrigger(settings.$trigger);

      attachGlobalEvents();
      manageFocus();

      $pop.trigger('hide.pop', {
        returnFocus: false
      });

    };

    var show = function() {

      // Move focus to the pop.
      $pop
        .show()
        .attr({
          'aria-hidden': false
        });

      settings.$focusableElementsFirst.focus();

      if (settings.$trigger) {
        settings.$trigger
          .attr('aria-expanded', true)
          .addClass('pop--open');
      }

    };

    var hide = function(options) {

      if (!options) {
        options = {
          returnFocus: true
        };
      }

      $pop
        .hide()
        .attr({
         'aria-hidden': true
       });

      // Return focus to the trigger.
      if (settings.$trigger) {
        settings.$trigger
          .attr('aria-expanded', false)
          .removeClass('pop--open');

        if (options.returnFocus === true) {
          settings.$trigger.focus();
        }
      }


    };

    var setTrigger = function(el) {
      settings.$trigger = el;
      initTriggerAttributes();
    };


    var attachGlobalEvents = function() {

      $pop
        .on('show.pop', function() { show(); })
        .on('hide.pop', function(event, options) { hide(options); })
        .on('setTrigger.pop', function(event, el) {
          setTrigger(el);
        });


      settings.$trigger.on('click', function(event) {

        if ($(this).hasClass('pop--open')) {
          $pop.trigger('hide.pop');
        }
        else {
          $pop.trigger('show.pop');
        }

      });


      $('body').keydown(function(event) {

        // ESC key to close.
        if (event.keyCode == 27) {

          if ($pop.is(':visible')) {
            $pop.trigger('hide.pop');
          }
        }
      });

    };


    var initTriggerAttributes = function() {

      settings.$trigger.attr({
        'aria-expanded': false,
        'aria-controls': $pop.attr('id')
      });

    };


    var manageFocus = function() {

      // Save focusable Elements.
      settings.$focusableElements = $pop.find('a, button, input');
      settings.$focusableElementsFirst = settings.$focusableElements.first();
      settings.$focusableElementsLast = settings.$focusableElements.last();

      // Move focus to first focusable element when last focusable element
      // lose focus.
      settings.$focusableElementsLast.keydown(function(event) {

        // TAB.
        if (event.keyCode == 9 && !event.shiftKey) {
          event.preventDefault();
          settings.$focusableElementsFirst.focus();
        }

      });

      settings.$focusableElementsFirst.keydown(function(event) {

        // TAB.
        if (event.keyCode == 9 && event.shiftKey) {
          event.preventDefault();
          settings.$focusableElementsLast.focus();
        }

      });

    };


    plugin.init();

};

/**
 * Create accessible popin with ARIA pattern.
 */
$.fn.popA11y = function (options) {

  return this.each(function() {

    if (undefined === $(this).data('tree')) {
      var plugin = new $.popA11y(this, options);
      $(this).data('popA11y', plugin);

    }

  });


};

})(jQuery);
