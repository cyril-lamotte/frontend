
(function( $ ){


	$.pop = function(element, options) {

		// Options par défaut
		var defaults = {
			delay: 0,
			positionMy: 'center top',
			positionAt: 'center bottom+20',
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
			hide();
			setFlag(false);

			// Définir les évènements
			setEvents();

		}


		// Afficher le pop
		var show = function() {
			plugin.settings.$target.show();
			plugin.settings.onShow();
		}


		// Masquer le pop
		var hide = function() {
			plugin.settings.$target.hide();
			plugin.settings.onHide();
		}

		// Masquer le pop avec temporisation
		var hideWithTimeout = function() {

			var id = plugin.settings.$target.attr('id');
			window.timeoutID = window.setTimeout('$.fn.popHide("'+ id +'")', plugin.settings.delay);

		}

		// Positionner le pop
		var position = function() {

			plugin.settings.$target
				.position({
					of: plugin.settings.$trigger,
					my: plugin.settings.positionMy,
					at: plugin.settings.positionAt
				});

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

				// Masquer si la souris ne survole pas
				if( ! plugin.settings.$target.data('flag') )
				{
					hideWithTimeout();
				}

			});


		}


		plugin.init();

	}



  $.fn.pop = function(options) {

		return this.each(function() {

			if (undefined == $(this).data('pop')) {

				var plugin = new $.pop(this, options);
				$(this).data('pop', plugin);

			}

		});

 	};


 	$.fn.popHide = function(id) {

 		if( ! $('#'+ id).data('flag') )
 			$('#'+ id).hide();
 	}




})( jQuery );