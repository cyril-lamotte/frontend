(function( $ ){

	/**
	* Plugin jQuery [pluginName] v1.0.0 (06/2013)
	*
	*/

	$.pluginName = function(element, options) {

		// Options par d�faut
		var defaults = {
			myOption: 500,
			onShow: function() {},
			onHide: function() {}
		};

		var plugin = this,
				$element = $(element),
				element = element;

		plugin.settings = {}



		plugin.init = function() {

			// Ecrasement avec les options utilisateur
			plugin.settings = $.extend({}, defaults, options);

			// Acc�der � l'�l�ment jQuery :			$element
			// Acc�der � l'�l�ment DOM :				element
			// Acc�der aux options :						plugin.settings.myOption

			// Ex�cuter une fonction interne		myFonction()
			// Ex�cuter une fonction plublique	plugin.myFonction()

			// Lancer une temporisation					window.setTimeout('$(".element").data("pluginName").myFonction()', 1000);


			// Attacher les �v�nements
			// setEvents();

		}


		// Attacher les �v�nements
		var setEvents = function() {

		}


		// Fonction publique
		// Appel : $('.element').data('pluginName').myFonction()
		plugin.myFonction = function() {

		}


		plugin.init();

	}



  $.fn.pluginName = function(options) {

		return this.each(function() {

			if (undefined == $(this).data('pluginName')) {

				var plugin = new $.pluginName(this, options);
				$(this).data('pluginName', plugin);

			}

		});

 	};


})( jQuery );