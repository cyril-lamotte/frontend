

/* -----------------------------------------------------------------------------
   Warning CNIL for cookies
----------------------------------------------------------------------------- */
/*
var warningCNIL = function() {

  $('#cnil-cookies-close').click(function (event) {
    $('.cnil-cookies').slideUp('fast');
  });

};
*/


/* -----------------------------------------------------------------------------
   Polyfills
----------------------------------------------------------------------------- */
/*
var managePolyfills = function () {

  Modernizr.load({
    test: Modernizr.input.placeholder,
    nope: 'assets/js/plugins/jquery.placeholder.min.js',
    complete : function() {

      // Placeholder
      if( $.fn.placeholder )
        $('input[placeholder], textarea[placeholder]').placeholder();
      }
  });

};
*/


/* -----------------------------------------------------------------------------
   Manage popins
----------------------------------------------------------------------------- */
/*
var managePopins = function () {

  // Avoid error if colorbox is not defined
  if ( ! $.fn.colorbox )
    return false;

  // Default inline-popin config
  var cfgPopinDefault = {
    iframe: true,
    innerWidth: '80%',
    innerHeight: '90%',
    opacity: 0.8,
    overlayClose: true,
    close: 'Fermer',
    fadeOut: 100,
    closeButton: true
  };


  $('.popin-trigger').colorbox( cfgPopinDefault );

  // Popin XXX
  //var popinXXX = $.extend({}, cfgPopinDefault);
  //popinXXX.title = 'Titre du popinXXX';
  //popinXXX.innerHeight = '180';
  //$('.popin-trigger-popinXXX').colorbox( popinXXX );


  // Close inline
  $('.close-popin').click(function() {
    $.fn.colorbox.close();
  });

  // Close iframe
  $('.close-popin-iframe').click(function() {
    window.parent.$.fn.colorbox.close();
  });

};
*/



/* -----------------------------------------------------------------------------
   slidingPanel
----------------------------------------------------------------------------- */

/*
var slidingPanel = function(options) {

  // Default options
  var o = {
    prefix :     'sliding-panel-',
    duration :   300,
    trigger:     $('#sliding-panel-trigger'),
    panel:       $('.sliding-panel'),
    wrapper:     $('.wrapper'),
    overlay:     false,
    position:    'right',
    wrapperSlide: true
  };


  // Merge with user's options
  if(options) {$.extend(o, options);}


  // Add class on wrapper
  o.wrapper.addClass( o.prefix +'-wrapper' );
  o.focusableElements = o.panel.find('a, button, input');

  o.trigger
    .attr('aria-expanded', false)
    .attr('aria-controls', o.panel.attr('id') );

  o.panel
    .attr('tabindex', '0')
    .attr('aria-hidden', true)
    .attr('role', 'region')
    .attr('aria-labelledby', o.trigger.attr('id'));


  // Create overlay
  if( o.overlay )
  {
    $('body').append('<div id="'+ o.prefix +'-overlay" class="'+ o.prefix +'-overlay"></div>');

    $('#'+ o.prefix +'-overlay').bind('touchstart', function(event) {
      event.preventDefault();
      closeNav();
    });

  }


  o.trigger.click(function (event) {

    event.stopPropagation();

    // Close panel on click on active trigger
    if( $(this).hasClass(o.prefix +'-trigger-active') )
    {
      closeNav();
      return;
    }


    $(this).addClass(o.prefix +'-trigger-active')
      .attr('aria-expanded', true);

    $('body').addClass(o.prefix +'-expanded');


    // Get panel width
    o.panelOffset = parseInt(o.panel.css('width'), 10);

    // Slide panel
    o.cssPanelPositionOpened = { right: 0 };
    o.cssPanelPositionClosed = { right: -o.panelOffset };

    if(o.position == 'left') {
      o.cssPanelPositionOpened = { left: 0 };
      o.cssPanelPositionClosed = { left: -o.panelOffset };
    }

    o.panel
      .animate( o.cssPanelPositionOpened, o.duration, function() {

        o.panel.focus();

      })
      .addClass(o.prefix +'-is-expanded')
      .attr('aria-hidden', 'false');



    // Slide site
    if( o.wrapperSlide ) {

      o.cssWrapperPositionOpened = { right: o.panelOffset };
      o.cssWrapperPositionClosed = { right: 0 };

      if(o.position == 'left') {
        o.cssWrapperPositionOpened = { left: o.panelOffset };
        o.cssWrapperPositionClosed = { left: 0 };
      }

      o.wrapper.animate( o.cssWrapperPositionOpened, o.duration);
    }

  });



  // Keys managment
  o.panel.keydown(function(event) {

    // ESC
    if (event.keyCode == 27) {
      closeNav();
    }



  });


  o.focusableElements.last().keydown(function(event) {

    // TAB
    if (event.keyCode == 9) {
      closeNav();
    }

  });






  // Stop propagation (avoid <body>'s behavior)
  o.panel.click(function (event) {
    event.stopPropagation();
  });


  // Close nav on clic outside
  $('body').click(function(event) {
    closeNav();
  });


  var closeNav = function() {

    if( ! o.trigger.hasClass(o.prefix +'-trigger-active') )
      return;

    o.trigger
      .removeClass(o.prefix +'-trigger-active')
      .attr('aria-expanded', false)
      .focus();


    // Slide Menu
    o.panel
      .animate( o.cssPanelPositionClosed, o.duration)
      .removeClass(o.prefix +'-is-expanded')
      .attr('aria-hidden', 'true');

    // Slide Site
    if( o.wrapperSlide ) {

      o.wrapper.animate( o.cssWrapperPositionClosed, o.duration, function() {
        $('body').removeClass(o.prefix +'-expanded');
      });

    }

  };


  $(window).bind('orientationchange', function() {
    closeNav();
  });


  // Hide panel on desktop while resizing
  $(window).resize(function() {

    if( Modernizr.mq('only screen and (min-width: 992px)') ) {
      closeNav();
    }
  });

};

*/



/* -----------------------------------------------------------------------------
   popPanel
----------------------------------------------------------------------------- */
/*
var popPanel = function(options) {

  // Default options
  var o = {
    prefix : 'pop-panel-',
    trigger: $('#pop-panel-trigger'),
    idPopTitle: null,
    position:    {
      my: 'center top',
      at: 'center bottom',
      collision : 'flip'
    }
  };


  // Merge with user's options
  if(options) {$.extend(true, o, options);}

  // Get target
  o.pop = $('#'+ o.trigger.data('pop-panel'));
  o.pop
    .attr('aria-hidden', 'true')
    .attr('tabindex', '-1');

  o.position.of = o.trigger;
  o.focusableElements = o.pop.find('a, button, input');

  // Add class on target

  if( o.idPopTitle === null )
  {
    o.idPopTitle = o.trigger.attr('id');
  }

  o.pop
    .addClass( o.prefix +'-is-closed' )
    .attr('role', 'region')
    .attr('aria-labelledby', o.idPopTitle);

  o.trigger.attr('aria-expanded', false);
  o.trigger.attr('aria-controls', o.trigger.data('pop-panel') );

  o.trigger.click(function (event) {

    event.stopPropagation();

    if( $(this).hasClass( o.prefix +'-is-active' ) )
    {
      // Close
      o.trigger
        .removeClass( o.prefix +'-is-active' )
        .attr('aria-expanded', false);

      o.pop
        .addClass( o.prefix +'-is-closed' )
        .attr('aria-hidden', 'true');
    }
    else {
      // Open
      o.trigger
        .addClass( o.prefix +'-is-active' )
        .attr('aria-expanded', true);


      // Move focus
      o.pop
        .removeClass( o.prefix +'-is-closed')
        .position(o.position)
        .attr('aria-hidden', 'false')
        .attr('tabindex', '0')
        .focus();
    }

  });


  // Keys managment
  o.pop.keydown(function(event) {

    // ESC
    if (event.keyCode == 27) {
      o.trigger
        .removeClass( o.prefix +'-is-active' )
        .attr('aria-expanded', false)
        .focus();

      o.pop
        .addClass( o.prefix +'-is-closed' )
        .attr('aria-hidden', 'true');

    }



  });


  o.focusableElements.last().keydown(function(event) {

    // TAB
    if (event.keyCode == 9) {

      o.trigger
        .removeClass( o.prefix +'-is-active' )
        .attr('aria-expanded', false);

      o.pop
        .addClass( o.prefix +'-is-closed' )
        .attr('aria-hidden', 'true');

    }

  });






  // Stop propagation (avoid <body>'s behavior)
  o.pop.click(function (event) {
    event.stopPropagation();
  });


  // Close nav on clic outside
  $('body').click(function(event) {

    o.trigger
      .removeClass( o.prefix +'-is-active' )
      .attr('aria-expanded', false);

    o.pop
      .addClass( o.prefix +'-is-closed' )
      .attr('aria-hidden', 'true');

  });

};
*/



/* -----------------------------------------------------------------------------
   collapsibleList
----------------------------------------------------------------------------- */
/*
var collapsibleList = function(options) {

  // Default options
  var o = {
    list: $('#list'),
    prefix :     'collapsible-list-',
    textCollapsed: 'Déplier la liste',
    textExpanded: 'Replier la liste',
    onShow: function() {},
    onHide: function() {}
  };

  // Merge with user's options
  if(options) {$.extend(true, o, options);}


  o.list.find('> li').each(function(i, el) {

    $(this).find('> a').click(function (event) {

      var $li = $(this).parent();

      if( $li.hasClass('collapsed') ) {

        event.preventDefault();
        $(this).next().slideDown('fast');
        $li.toggleClass('collapsed expanded');

      }
      else if( $li.hasClass('expanded') ) {

        event.preventDefault();
        $(this).next().slideUp('fast');
        $li.toggleClass('collapsed expanded');

      }

    });

  });

};

*/



/* -----------------------------------------------------------------------------
   FAQ
----------------------------------------------------------------------------- */
/*
var faq = function(options) {


  $('.view-faq .views-field-title a')
    .addClass('faq--closed')
    .click(function (event) {

      event.preventDefault();

      $(this).toggleClass('faq--closed').parents('.views-field-title')
        .next().slideToggle('fast');

    });




};
*/
