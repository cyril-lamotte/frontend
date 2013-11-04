

// Chargement des scripts fallback en cas de besoin
var managePolyfills = function () {

	Modernizr.load({
		test: Modernizr.input.placeholder,
		nope: 'assets/js/plugins/jquery.placeholder.js',
		complete : function() {

			// Placeholder
			if( $.fn.placeholder )
				$('input[placeholder]').placeholder();

		}
	});

}





// Mettre en évidence les destinations des liens d'évitement
var skipLinks = function() {

	$('#skip-links a')
		.bind('focus blur', function() { $( this.hash ).toggleClass( 'target' ); });

}
