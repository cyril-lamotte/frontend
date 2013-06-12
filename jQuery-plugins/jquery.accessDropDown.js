(function( $ ){

	/**
	* Plugin jQuery accessDropDown v1.4.0
	*
	* Options
	*
	*/

	$.accessDropDown = function(element, options) {

		// Options par défaut
		var defaults = {
			delay: 500,
			position: {
				my: 'left top',
				at: 'left bottom'
			},
			submenuClass: '.nav-2',
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

			plugin.settings.$menu = window.axsddMenu = $element;
			plugin.settings.$activeSubmenu = null;

			// Initialiser le marqueur de survol
			setFlag(false);

			// Définir les évènements
			setEvents();

		}


		// Afficher le sous-menu
		var show = function() {
			plugin.settings.$activeSubmenu.show();
			plugin.settings.onShow();
		}


		// Masquer les sous-menu
		var hide = function() {

			if( plugin.settings.$activeSubmenu == null)
				return;

			plugin.settings.$activeSubmenu
				.removeAttr('data-add-active')
				.hide()
				.prev()
					.removeClass('active');

			plugin.settings.onHide();
		}


		// Masquer le sous-menu avec temporisation
		var hideWithTimeout = function() {

			window.axsddActiveSubmenu = plugin.settings.$activeSubmenu;
			window.timeoutID = window.setTimeout('$.fn.accessDropDownHide()', plugin.settings.delay);

		}


		// Positionner le pop
		var position = function() {

			var $activeSubmenu = plugin.settings.$menu.find( plugin.settings.submenuClass +'[data-add-active=1]');

			if( ! $activeSubmenu.length )
				return;

			plugin.settings.position.of = $activeSubmenu.prev();

			$activeSubmenu
				.position( plugin.settings.position );

		}


		// Définir le flag
		var setFlag = function(flag) {
			plugin.settings.$menu.data('flag', flag);
		}

		var setEvents = function() {


			// Placer un marqueur au survol des sous-menus
			plugin.settings.$menu
				.find( plugin.settings.submenuClass ).hover(function() {

					setFlag(true);

				}, function() {

					setFlag(false);

					// Masquer aprés temporisation
					hideWithTimeout();

				});


			// Afficher au survol du trigger
			plugin.settings.$menu.find('> li > a')
				.bind('mouseenter focus', function() {

					// Masquer les sous-menus
					hide();

					try { clearTimeout(timeoutID); }
					catch(e) {}

					plugin.settings.$activeSubmenu = $(this).next();
					plugin.settings.$activeSubmenu
						.attr('data-add-active', 1)
						.prev()
							.addClass('active');

					show();
					position();

				}).bind('mouseleave', function() {

					// Masquer si la souris ne survole pas
					if( ! plugin.settings.$menu.data('flag') )
					{
						// Masquer aprés temporisation
						hideWithTimeout();
					}

				});


			// Masquer le dernier sous menu à la tabulation sur le dernier lien
			plugin.settings.$menu.find('> li:last ul a:last')
				.blur(function() {
					hide();
				});

		}

		plugin.init();

	}



  $.fn.accessDropDown = function(options) {

		return this.each(function() {

			if (undefined == $(this).data('accessDropDown')) {

				var plugin = new $.accessDropDown(this, options);
				$(this).data('accessDropDown', plugin);

			}

		});

 	};

 	$.fn.accessDropDownHide = function() {

 		if( ! axsddMenu.data('flag') )
 		{
 			axsddActiveSubmenu.hide()
 			.prev()
				.removeClass('active');;
		}
 	}


})( jQuery );