
/* -----------------------------------------------------------------------------
   Responsive-nav
----------------------------------------------------------------------------- */

var responsiveNav = function() {

  var $nav = $('div.responsive-nav');
  var $trigger = $('#responsive-nav-toggle');


  $trigger.attr({
    'role' : 'button',
    'aria-haspopup' : 'true',
    'aria-expanded' : 'false',
    'aria-owns' : 'responsive-nav'
  });

  // Hide nav for screen-readers (mobile)
  if('matchMedia' in window) {
    if(window.matchMedia( '(max-width: 767px)' ).matches)
    {
      $nav
        //.attr('aria-hidden', true)
        .find('a').attr('tabindex', '-1');
    }
  }


  // Toggle navigation
  $trigger.click(function() {

    var $wrapper = $('div.wrapper');

    if( ! $wrapper.hasClass('wrapper-slide-in') )
    {
      // Show nav
      $wrapper
        .removeClass('wrapper-slide-out')
        .addClass('wrapper-slide-in');

      $(this).attr('aria-expanded', true);

      // Allow tab
      $nav
        .attr('aria-hidden', false)
        .find('a').attr('tabindex', '0');
    }
    else {
      // Hide nav
      $wrapper
        .removeClass('wrapper-slide-in')
        .addClass('wrapper-slide-out');

      $(this).attr('aria-expanded', false);

      // Disallow tab
      $nav
        .attr('aria-hidden', true)
        .find('a').attr('tabindex', '-1');
    }

  });

}


/* Code exécuté au chargement de la page */
$(document).ready(function() {

  // Menu responsive
  responsiveNav();

});