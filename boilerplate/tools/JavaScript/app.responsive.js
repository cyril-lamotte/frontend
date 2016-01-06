/**
 * @file UI methods
 *
 */


/* USAGE
  app.responsive.init({
    'xs': function() {
      // Code
    },
    'sm': function() {
      // Code
    },
    'md': function() {
      // Code
    },
    'onScreenUpdate' : function() {
      // Code
    }
  });
*/


(function ($) {

app.responsive = {
  'screen' : null,
  'launchMap' : {
    'xs': function() {},
    'sm': function() {},
    'md': function() {},
    'onScreenUpdate' : function() {}
  },


  /**
   * Init
   */
  init: function(launchMap) {

    app.responsive.launchMap = launchMap;
    app.responsive.checkDevice();
    app.responsive.onResize();
    app.responsive.launch();

  },



  /**
   * Get client device
   */
  checkDevice: function() {

    // Get screen type
    app.responsive.screen = 'xs';

    if( Modernizr.mq('only screen and (min-width: 768px) and (max-width: 991px)') )
      app.responsive.screen = 'sm';

    else if( Modernizr.mq('only screen and (min-width: 992px)') )
      app.responsive.screen = 'md';

    // Add HTML attributes
    $('body').attr('data-responsive--screen', app.responsive.screen);

    return app.responsive.screen;

  },



  /**
   * Relaunch scripts after resizing
   */
  onResize: function() {

    $(window).resize(function() {

      // Detect screen mode update
      var previousScreen = app.responsive.screen;
      app.responsive.checkDevice();

      if(app.responsive.screen != previousScreen)
        app.responsive.launch(true);

    });

    //$(window).on('orientationchange', function() {
    //  app.responsive.launch(true);
    //});

  },



  /**
   * Launch scripts according to screen
   */
  launch: function(screenUpdate) {

    if(screenUpdate) {
      app.responsive.launchMap.onScreenUpdate();
    }

    $.each(app.responsive.launchMap, function(breakpoint, code) {

      if( app.responsive.screen == breakpoint) {
        code();
      }

    });

  }

};



})(jQuery);
