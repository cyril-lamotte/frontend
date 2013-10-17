(function ($) {

/* Code exécuté au chargement de la page */
$(document).ready(function() {

	share();

	jQuery.getJSON("http://graph.facebook.com/http://www.immoprix.com").done( function(data) { alert(data.shares); } )
	//http://urls.api.twitter.com/1/urls/count.json?url=http://immoprix.com
}); // /ready



// http://sharrre.com/#documentation
var share = function() {

	// Twitter
	$('#share-twitter').sharrre({
		share: {
			twitter: true
		},
		enableHover: false,
		enableTracking: false,
		click: function(api, options){
			api.simulateClick();
			api.openPopup('twitter');
		}
	});

	// Facebook
	$('#share-facebook').sharrre({
		share: {
			facebook: true
		},
		enableHover: false,
		enableTracking: false,
		click: function(api, options){
			api.simulateClick();
			api.openPopup('facebook');
		}
	});

	// Google +
	$('#share-google-plus').sharrre({
		share: {
			googlePlus: true
		},
		enableHover: false,
		enableTracking: false,
		click: function(api, options){
			api.simulateClick();
			api.openPopup('googlePlus');
		}
	});

}


})(jQuery);