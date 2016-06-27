/**
 * @file UI methods
 *
 */


/* USAGE

  // Init
  app.responsive.init();

  // SubMenu collapsing on mobile devices
  app.responsive.add({
    'breakpoint' : '<md',
    'code': function() {


      var $subNav = $('#secondary-menu');

      // Generate subnav trigger
      var subNavText = $subNav.find('> li.active').text();

      // Otherwise get main nav active item
      if( ! subNavText) {
        subNavText = $('#main-menu').find('> li.active').text();
      }

      $subNav.before('<button type="button" id="subnav-trigger" class="subnav-trigger">' + subNavText + '</button>');

      // Collapse submenu
      $('#subnav-trigger').click(function (event) {
        $(this).toggleClass('is-expanded').next().slideToggle('fast');
      });

      app.responsive.reinit('>sm');
    }
  });

  app.responsive.add({
    'breakpoint' : '>md',
    'code': function() {

      // Destroy mobile subnav
      $('#subnav-trigger').next().removeAttr('style');
      $('#subnav-trigger').remove();

      app.responsive.reinit('<sm');
    }
  });


*/


(function ($) {

app.responsive = {
  'screen' : null,
  'launchMap' : {
    'xs': {
      'mq': 'only screen and (max-width: 480px)',
      'codeArray': []
    },
    '<sm': {
      'mq': 'only screen and (max-width: 767px)',
      'codeArray': []
    },
    'sm': {
      'mq': 'only screen and (min-width: 768px) and (max-width: 991px)',
      'codeArray': []
    },
    '>sm': {
      'mq': 'only screen and (min-width: 768px)',
      'codeArray': []
    },
    '<md': {
      'mq': 'only screen and (max-width: 991px)',
      'codeArray': []
    },
    'md': {
      'mq': 'only screen and (min-width: 992px) and (max-width: 1199px)',
      'codeArray': []
    },
    '>md': {
      'mq': 'only screen and (min-width: 992px)',
      'codeArray': []
    },
    'lg': {
      'mq': 'only screen and (min-width: 1200px)',
      'codeArray': []
    },
  },


  /**
   * Init
   */
  init: function() {
    app.responsive.checkDevice();
    app.responsive.onResize();
  },



  /**
   * Add function in launch map
   */
  add: function(item) {

    app.responsive.launchMap[item.breakpoint].codeArray.push({'code' : item.code});
    app.responsive.launch();

  },



  /**
   * Allow all functions froms a breapkoint to be ran again (ex: after resizing or destroy)
   * app.responsive.reinit('<md');
   */
  reinit: function(breakpoint) {

    $.each(app.responsive.launchMap[breakpoint].codeArray, function(i, el) {
      el.processed = false;
    });

  },



  /**
   * Get client device
   */
  checkDevice: function() {

    // Get screen type
    app.responsive.screen = 'xs';

    if (Modernizr.mq(app.responsive.launchMap.sm.mq)) {
      app.responsive.screen = 'sm';
    }
    else if (Modernizr.mq(app.responsive.launchMap.md.mq)) {
      app.responsive.screen = 'md';
    }
    else if (Modernizr.mq(app.responsive.launchMap.lg.mq))
      app.responsive.screen = 'lg';

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
  launch: function(refresh) {

    if(refresh) {
      //app.responsive.launchMap.onRefresh();
    }

    // Browse launch map...
    $.each(app.responsive.launchMap, function(breakpoint, bpMap) {

      // ...and execute matching code
      if( app.responsive.screen == breakpoint || Modernizr.mq(app.responsive.launchMap[breakpoint].mq)) {

        $.each(bpMap.codeArray, function(i, functionItem) {

          // Dot not run code twice
          if ( ! functionItem.processed) {
            functionItem.code();
            functionItem.processed = true;
          }

        });
      }

    });

  }

};



})(jQuery);
