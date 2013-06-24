(function( $ ){

	/**
	* Plugin jQuery accessFold v1.0.0 (06/2013)
	*
	*/

	$.accessFold = function(element, options) {

		// Options par d�faut
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

			// Acc�der � l'�l�ment jQuery :			$element
			// Acc�der � l'�l�ment DOM :				element
			// Acc�der aux options :						plugin.settings.myOption

			// Ex�cuter une fonction interne		myFonction()
			// Ex�cuter une fonction plublique	plugin.myFonction()

			// Lancer une temporisation					window.setTimeout('$(".element").data("accessFold").myFonction()', 1000);

			var itemCount = $element.find('.fold-item').length;
			plugin.settings.allOpened = false;

			// Ajouter un title sur le d�clencheur
			var $triggers = $element.find('.fold-trigger').each(function(i, el) {
				setTitle( $(this), plugin.settings.titleActive + " '"+ $(this).text() +"'" );
			});


			// Cr�er le bouton "Tout d�plier / Tout replier" si au moins 2 zones sont pr�sentes
			if( plugin.settings.buttonAll && itemCount >= 2 )
			{
				$element.prepend('<button type="button" class="fold-all-btn">'+ plugin.settings.allOpenlabel +'</button>');
			}


			// Ouvrir par d�faut les panneau identifi�s
 			$element.find('.fold-item[data-fold-open]').each(function() {
 				show( $(this) );
 			});

			// Attacher les �v�nements
			setEvents();

		}


		// Attacher les �v�nements
		var setEvents = function() {

			// D�plier/Replier
			var $triggers = $element.find('.fold-trigger').click(function(event) {

				event.preventDefault();
				toggle( $(this).parents('div.fold-item') );

			});


			// Tout D�plier/Replier
			$element.find('button.fold-all-btn').click(function() {

				// Modifier le texte du bouton
				$(this).text( plugin.settings.allOpened ? plugin.settings.allOpenlabel : plugin.settings.allCloselabel );

				// Tout d�plier/replier
				$element.find('div.fold-item').each(function() {

					if( plugin.settings.allOpened )
						hide( $(this) );
					else
						show( $(this) );

				});

				// Inverser l'�tat
				plugin.settings.allOpened = ! plugin.settings.allOpened;


			});


		}


		// Modifier un attribut
		var setTitle = function( $el, value ) {
			$el.attr('title', value);
		}

		// D�ployer/Replier
		var toggle = function( $item ) {

			if( $item.hasClass('fold-item-active') )
				hide( $item );
			else
				show( $item );

		}


		// D�ployer
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