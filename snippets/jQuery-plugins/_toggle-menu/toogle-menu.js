
/* -----------------------------------------------------------------------------
   Toggle menu
----------------------------------------------------------------------------- */
var toggleMenu = function() {

  $('button.toggle-menu-trigger').click(function() {

  	$(this).parents('div.toggle-menu').toggleClass('toggle-menu-active');

  });
}


/* Code exécuté au chargement de la page */
$(document).ready(function() {

  // Toggle menu
  toggleMenu();

});