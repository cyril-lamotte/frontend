(function( $ ){

	/**
	* Plugin jQuery news-slider v1.0.0 (06/2013)
	*
	* Options
	*
	*
	* UTILISATION
	* -----------
	*
	* 1/ HTML
	* Structure div >



	* 2/ JavaScript
	* Le selecteur doit être le <div> englobant

	$(document).ready(function() {
		$('.news-slider').newsSlider();
	};

	*/

	$.newsSlider = function(element, options) {

		// Options par défaut
		var defaults = {
			delay: 5000,
			auto: false,
			pauseButton: true,
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

			//plugin.settings.$menu = window.axsddMenu = $element;

			// Générer le bouton "pause"
			if( plugin.settings.pauseButton )
				$element.prepend('<button type="button" class="news-slider-pause"></button>');

			// Générer le conteneur des visuels
			$element.prepend('<div class="news-slider-images"></div>');
			plugin.settings.imagesGroup = $element.find('div.news-slider-images');

			// Initialiser le marqueur de survol
			setPauseFlag( false );
			setAutoFlag( plugin.settings.auto );

			// Définir les évènements
			setEvents();

			// Afficher la 1ère news
			plugin.setFocus( $element.find('.news-slider-item:first') );

			// Lancer le défilement automatique
			window.setTimeout('$(".news-slider").data("newsSlider").play()', plugin.settings.delay);

		}

		var setEvents = function() {

			// Mettre en pause le défilement au survol
			$element.hover(function() {
				setPauseFlag( true );
			}, function() {
				setPauseFlag( false );
			});


			// Lancer/relancer le défilement auto
			$element.find('button.news-slider-pause').click(function() {
				setAutoFlag( $element.data('auto') ? false : true );
			});

			// Rendre actif au survol
			$element.find('div.news-slider-item').bind('mouseenter', function() {
				plugin.setFocus( $(this) );
			});

			// Rendre actif au focus
			$('.news-slider-item a').bind('focus', function() {

					// Au clavier, désactiver le mode auto
					setAutoFlag( false );
					plugin.setFocus( $(this).parents('.news-slider-item') );
			});

			// Rendre l'image cliquable
			/*$element.find('.news-slider-images').click(function() {
				window.location = $('.news-slider-item-active h3 a').attr('href');
			});*/


		}


		// Définir le flag
		var setPauseFlag = function( flag ) {
			$element.data('pause', flag);
		}

		var setAutoFlag = function( flag )
		{
			$element.data('auto', flag);
			$element.find('button.news-slider-pause').html( flag == true ? '<img src="assets/img/buttons/icon-pause.png" title="Arrêter" alt="Arrêter" />' : '<img src="assets/img/buttons/icon-play.png" title="Relancer" alt="Relancer" />' );
		}

		// Fonction publique
		// Appel : $('.x').data('newsSlider').setFocus( item )
		plugin.setFocus = function( item ) {

			// Désactiver l'élément précédent
			removeFocus();

			// Donner le focus
			item.addClass('news-slider-item-active');
			var pict = item.find('.news-slider-item-pict');

			pict.clone().appendTo( plugin.settings.imagesGroup );

		}

		// Retirer le focus
		var removeFocus = function() {

			$element.find('div.news-slider-item-active')
				.removeClass('news-slider-item-active');


			plugin.settings.imagesGroup.html('');

			//pict.clone().appendTo( plugin.settings.imagesGroup );

		}


		// Fonction publique
		// Appel : $('.x').data('newsSlider').play()
		plugin.play = function() {

			if( ! $element.data('pause') && $element.data('auto') )
			{
				// Afficher l'élément suivant
				var next = $element.find('.news-slider-item-active').next();
				if( ! next.length )
					next = $('.news-slider-item:first');

				plugin.setFocus( next );
			}
			window.setTimeout('$(".news-slider").data("newsSlider").play()', plugin.settings.delay);

		}


		plugin.init();

	}



  $.fn.newsSlider = function(options) {

		return this.each(function() {

			if (undefined == $(this).data('newsSlider')) {

				var plugin = new $.newsSlider(this, options);
				$(this).data('newsSlider', plugin);

			}

		});

 	};


})( jQuery );