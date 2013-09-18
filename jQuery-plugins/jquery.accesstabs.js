
(function( $ ){


	/* Infos : https://github.com/cyril-lamotte/accessTabs */

	$.accessTabs = function(element, options) {

		// Options par défaut
		var defaults = {
		};

		var plugin = this,
				$element = $(element),
				element = element;

		plugin.settings = {}



		plugin.init = function() {

			// Ecrasement avec les options utilisateur
			plugin.settings = $.extend({}, defaults, options);

			$panneaux = $('div[data-accesstabs="panel"]');
console.log('test');
			// Masquer les panneaux et placer les rôles ARIA
			$panneaux.attr({
				'role':			'tabpanel',
				'tabindex':		'0'
			})
			.not(':first')
			.hide();


			$element
				.attr('role', 'tablist')
				.find('li')
					.each(function()
					{
						$this = $(this);

						$this.attr(
						{
							'role':				'tab',
							'aria-selected':	'false',
							'aria-controls':	$this.find('a').attr('href').replace('#', '')
						})
					})
					.on('click', function(e)
					{
						$this = $(this);

						$panneaux
							.hide();

						$this
							.attr('aria-selected', 'true')
								.find('a')
									.addClass('active')
								.end()
							.siblings()
								.attr('aria-selected', 'false')
								.find('a')
									.removeClass('active');

						$($this.find('a').attr('href'))
							.show()
							.focus();

						e.preventDefault();
					})
					.first()
						.attr('aria-selected', 'true')
						.find('a')
							.addClass('active');

		}

		plugin.init();

	}



  $.fn.accessTabs = function(options) {

		return this.each(function() {

			if (undefined == $(this).data('accessTabs')) {

				var plugin = new $.accessTabs(this, options);
				$(this).data('accessTabs', plugin);

			}

		});

 	};


})( jQuery );