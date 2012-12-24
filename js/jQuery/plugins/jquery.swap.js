(function( $ ){


	/**
	* Plugin jQuery switchImg v1.0.0 (05/2012)
	* 
	* Options
	*
	* suffix : Suffixe apparaissant dans le nom de l'image survolée
	*
	*/
  $.fn.switchImg = function(options) {

		return this.each(function() {

			// Options par défaut
			var o = {
				'suffix' : '-active'
			};

			// Ecrasement avec les options utilisateur
      if(options) {$.extend(o, options);}

      var ext = '.png';
			jQuery(this).hover(function() {

				if(jQuery(this).attr('src').indexOf(o.suffix) != -1)
					jQuery(this).attr('src', jQuery(this).attr('src').replace(o.suffix + ext, ext));
				else
					jQuery(this).attr('src', jQuery(this).attr('src').replace(ext, o.suffix + ext));

			});

		});

	};

})( jQuery );