(function( $ ){

	/**
	* Plugin jQuery pop v1.1.0
	*
	*/
	$.pop = function(element, options) {

		// Options par défaut
		var defaults = {
			delay: 0,
			position: {
				my: 'left top',
				at: 'left bottom'
			},
			orientation: 'bottom',
			onShow: function() {},
			onHide: function() {}
		};

		var plugin = this;

		plugin.settings = {}

		var $element = $(element),
				element = element;


		plugin.init = function() {

			// Ecrasement avec les options utilisateur
			plugin.settings = $.extend({}, defaults, options);

			plugin.settings.$trigger = $element;
			plugin.settings.$target  = $('#'+ $element.data('pop-target'));

			// Masquer le pop à l'initialisation
			plugin.hide();
			setFlag(false);

			// Définir les évènements
			setEvents();

		}


		// Afficher le pop
		var show = function() {

			// Appliquer une classe selon l'orientation
			plugin.settings.$target

			plugin.settings.$target
				.addClass( 'pop-orientation-'+ plugin.settings.orientation )
				.show();

			plugin.settings.onShow();
		}


		// Masquer le pop
		plugin.hide = function() {

			// Ne pas masquer si la souris survole
			if( plugin.settings.$target.data('flag') )
				return;

			plugin.settings.$target
				.removeClass( 'pop-orientation-'+ plugin.settings.orientation )
				.hide();
			plugin.settings.onHide();
		}

		// Masquer le pop avec temporisation
		var hideWithTimeout = function() {
			window.timeoutID = window.setTimeout('$("'+ plugin.settings.selector +'").data("pop").hide()', plugin.settings.delay);
		}

		// Positionner le pop
		var position = function() {

			if( ! plugin.settings.position.of )
				plugin.settings.position.of = plugin.settings.$trigger;

			plugin.settings.$target
				.position( plugin.settings.position );

		}


		// Définir le flag
		var setFlag = function(flag) {
			plugin.settings.$target.data('flag', flag);
		}

		// Remplir le pop
		var setContent = function() {
			plugin.settings.$target.find('[data-pop-text-wrapper]').text( plugin.settings.$trigger.attr('data-pop-text') );
		}

		var setEvents = function() {

			// Le pop suit la position de la souris
			if( plugin.settings.mousePosition )
			{
				plugin.settings.$trigger.mousemove(function( event ) {
					plugin.settings.position.of = event;
					position();
				});
			}

			// Placer un flag au survol du pop
			plugin.settings.$target.hover(function() {
				setFlag(true);
			}, function() {

				setFlag(false);
				hideWithTimeout();

			});


			// Afficher / Masquer au survol du trigger
			plugin.settings.$trigger.hover(function() {

				setContent();
				show();
				position();

					try { clearTimeout(timeoutID); }
					catch(e) {}

			}, function() {
					hideWithTimeout();
			});


		}


		plugin.init();

	}



  $.fn.pop = function(options) {

		options.selector = this.selector;

		return this.each(function() {

			if (undefined == $(this).data('pop')) {

				var plugin = new $.pop(this, options);
				$(this).data('pop', plugin);

			}

		});

 	};



})( jQuery );