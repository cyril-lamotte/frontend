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
			connect: false,
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


			var $triggers = $element.find('.fold-trigger').each(function(i, el) {

				$(this).attr('title', plugin.settings.titleActive + " '"+ $(this).text() +"'" )

			});



			// Attacher les �v�nements
			setEvents();

		}


		// Attacher les �v�nements
		var setEvents = function() {

			// D�plier/Replier au clic
			var $triggers = $element.find('.fold-trigger').click(function(event) {

				event.preventDefault();
				toggle( $(this).parents('div.fold-item') );

			});

		}

		// D�ployer/Replier
		var toggle = function( $item ) {

			if( $item.find('.fold-trigger-active').length )
				hide( $item );
			else
				show( $item );

		}


		// D�ployer
		var show = function( $item ) {

			var $trigger = $item.find('.fold-trigger');
			var triggerText = $trigger.text();

			$trigger
				.addClass('fold-trigger-active')
				.attr('title', plugin.settings.titleInactive + " '" + triggerText + "'");

			$item.find('div.fold-panel').slideDown( 'fast', plugin.settings.onShow() );

		}

		// Replier
		var hide = function( $item ) {

			var $trigger = $item.find('.fold-trigger');
			var triggerText = $trigger.text();

			$trigger
				.removeClass('fold-trigger-active')
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