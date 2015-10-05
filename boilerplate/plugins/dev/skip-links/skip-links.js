
/**
 * Shows skiplinks on focus and add an outline on the target area
 */
app.ui.skipLinks = function() {

  $('#skip-links a').bind('focus blur', function() {

    // tabindex="-1" for Chrome anchors fix
    $( this.hash )
      .toggleClass('target')
      .attr('tabindex', '-1');

  });

};



/* Execute code when the DOM is fully loaded */
$(document).ready(function() {

  app.ui.skipLinks();

});
