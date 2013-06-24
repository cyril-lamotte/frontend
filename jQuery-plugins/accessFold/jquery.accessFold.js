(function( $ ){

	/**
	* Plugin jQuery accessFold v1.0.0 (06/2013)
	*
	*/

	$.accessFold = function(element, options) {

		// Options par défaut
		var defaults = {
			titleActive: 'D\351plier le panneau',
			titleInactive: 'Replier le panneau',
			allOpenlabel : 'Tout d\351plier',
			allCloselabel : 'Tout replier',
			connect: false,
			buttonAll: false,
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

			// Accéder à l'élément jQuery :			$element
			// Accéder à l'élément DOM :				element
			// Accéder aux options :						plugin.settings.myOption

			// Exécuter une fonction interne		myFonction()
			// Exécuter une fonction plublique	plugin.myFonction()

			// Lancer une temporisation					window.setTimeout('$(".element").data("accessFold").myFonction()', 1000);

			var itemCount = $element.find('.fold-item').length;
			plugin.settings.allOpened = false;

			// Ajouter un title sur le déclencheur
			var $triggers = $element.find('.fold-trigger').each(function(i, el) {
				setTitle( $(this), plugin.settings.titleActive + " '"+ $(this).text() +"'" );
			});


			// Créer le bouton "Tout déplier / Tout replier" si au moins 2 zones sont présentes
			if( plugin.settings.buttonAll && itemCount >= 2 )
			{
				$element.prepend('<button type="button" class="fold-all-btn">'+ plugin.settings.allOpenlabel +'</button>');
			}


			// Ouvrir par défaut les panneau identifiés
 			$element.find('.fold-item[data-fold-open]').each(function() {
 				show( $(this) );
 			});

			// Attacher les évènements
			setEvents();

		}


		// Attacher les évènements
		var setEvents = function() {

			// Déplier/Replier
			var $triggers = $element.find('.fold-trigger').click(function(event) {

				event.preventDefault();
				toggle( $(this).parents('div.fold-item') );

			});


			// Tout Déplier/Replier
			$element.find('button.fold-all-btn').click(function() {

				// Modifier le texte du bouton
				$(this).text( plugin.settings.allOpened ? plugin.settings.allOpenlabel : plugin.settings.allCloselabel );

				// Tout déplier/replier
				$element.find('div.fold-item').each(function() {

					if( plugin.settings.allOpened )
						hide( $(this) );
					else
						show( $(this) );

				});

				// Inverser l'état
				plugin.settings.allOpened = ! plugin.settings.allOpened;


			});


		}


		// Modifier un attribut
		var setTitle = function( $el, value ) {
			$el.attr('title', value);
		}

		// Déployer/Replier
		var toggle = function( $item ) {

			if( $item.hasClass('fold-item-active') )
				hide( $item );
			else
				show( $item );

		}


		// Déployer
		var show = function( $item ) {

			var $trigger = $item.find('.fold-trigger');
			var triggerText = $trigger.text();

			$item.addClass('fold-item-active');

			$trigger
				.attr('title', plugin.settings.titleInactive + " '" + triggerText + "'");

			$item.find('div.fold-panel').slideDown( 'fast', plugin.settings.onShow() );

		}

		// Replier
		var hide = function( $item ) {

			var $trigger = $item.find('.fold-trigger');
			var triggerText = $trigger.text();

			$item.removeClass('fold-item-active');

			$trigger
				.attr('title', plugin.settings.titleActive + " '" + triggerText + "'");

			$item.find('div.fold-panel').slideUp('fast', plugin.settings.onHide() );


		}


		plugin.init();

	}



  $.fn.accessFold = function(options) {

		return this.each(function() {

			if (undefined == $(this).data('accessFold')) {

				var plugin = new $.accessFold(this, options);
				$(this).data('accessFold', plugin);

			}

		});

 	};


})( jQuery );