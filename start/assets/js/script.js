(function ($) {

/* Code exécuté au chargement de la page */
$(document).ready(function() {


	// Gérer les Polyfills
	managePolyfills()




}); // /ready







// Chargement des scripts fallback uniquement en cas de besoin
var managePolyfills = function () {

	Modernizr.load({
	  test: Modernizr.input.placeholder,
	  nope: 'assets/js/plugins/jquery.placeholder.min.js',
	  complete : function() {

	    // Placeholder
	    if( $.fn.placeholder )
	      $('input[placeholder]').placeholder();

	  }
	});

}


















})(jQuery);