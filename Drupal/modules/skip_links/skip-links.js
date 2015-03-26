/* -----------------------------------------------------------------------------
   Skip-links
----------------------------------------------------------------------------- */

var skipLinks = function() {

  $('#skip-links a').bind('focus blur', function() {

    $( this.hash )
      .toggleClass('target')
      .attr('tabindex', '-1');
    });

};



/* Execute code when the DOM is fully loaded */
$(document).ready(function() {

  skipLinks();

});
