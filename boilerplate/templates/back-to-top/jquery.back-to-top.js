(function ($) {

  /**
   * Display "Back to top" button when scrolling.
   *
   * @param {object} options - Settings
   * @param {jQuery object} options.target - Trigger
   * @param {int} options.threshold - Scrolltop before showing
   */
  $.fn.backToTop = function (options) {

    "use strict";

    // Defaults options.
    var defaults = {
      threshold: 200,
      visibleClass: 'back-to-top--visible',
      offset: 0,
      scrollDuration: 500
    };


    // Merge user's options.
    var settings = $.extend({}, defaults, options);
    settings.$button = $(this);


    // Display "top button" after scrolling until threshold.
    $(window).scroll(function () {

      var scrollTop = $(window).scrollTop();

      if (scrollTop > settings.threshold) {
        settings.$button.addClass(settings.visibleClass);
      }
      else {
        settings.$button.removeClass(settings.visibleClass);
      }

    });


    // Move scroll.
    $(this).click(function (event) {

      event.preventDefault();

      var target_anchor = settings.$button.find('a').attr('href');
      var $target = $(target_anchor);

      if (!$target.length)
        throw new Error('Target ID not exists.');


      // Get destination.
      var scrollDestination = $target.offset().top;
      if (settings.offset)
        scrollDestination -= settings.offset;

      // Do scroll.
      $('body, html').animate({ scrollTop: scrollDestination }, settings.scrollDuration);

    });

  };


})(jQuery);
