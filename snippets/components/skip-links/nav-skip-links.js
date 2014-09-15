
/* -----------------------------------------------------------------------------
   Skip-links
----------------------------------------------------------------------------- */

var skipLinks = function() {

  $('#skip-links a').bind('focus blur', function() {

      $( this.hash )
        .toggleClass('target')
        .attr('tabindex', '-1');
    });

}


/* Code exécuté au chargement de la page */
$(document).ready(function() {

  // Skip-links
  skipLinks();

});