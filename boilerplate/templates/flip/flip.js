
/* -----------------------------------------------------------------------------
   Effet "Carte"
----------------------------------------------------------------------------- */

var card = function() {

	$('button[data-card-trigger]').click(function() {

		var cardId = $(this).attr('data-card-trigger');

		$('#'+ cardId).toggleClass('card-flip');

	});

};


/* Code exécuté au chargement de la page */
$(document).ready(function() {

	// Effet "Carte"
	card();

});
