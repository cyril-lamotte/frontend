(function ($) {

/* Code exécuté au chargement de la page */
$(document).ready(function() {

	getHTMLCode();
	prettyPrint();

	// Gérer les Polyfills
	managePolyfills()


	card();


}); // /ready



// Convertir le code en chaine de caractère non-interprétée
var getHTMLCode = function () {

	$('section').each(function(i, el) {

		var $section = $(el);
		var htmlCode = html( $section.html() );
		$section.next().html(htmlCode);

	});

}

var html = function (s) {
 return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}






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



var card = function() {

	$('button[data-card-trigger]').click(function() {

		var cardId = $(this).attr('data-card-trigger');

		$('#'+ cardId).toggleClass('card-flip');

	});

}


})(jQuery);