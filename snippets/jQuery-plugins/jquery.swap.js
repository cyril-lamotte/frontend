(function( $ ){


	/**
	* Plugin jQuery swap v1.0.0 (05/2012)
	*
	* Options
	*
	* suffix : Suffixe apparaissant dans le nom de l'image survolée
	*
	*/
  $.fn.swap = function(options) {

		return this.each(function() {

			// Options par défaut
			var o = {
				'suffix' : '-active',
				'trigger' : false
			};

			// Ecrasement avec les options utilisateur
      if(options) {$.extend(o, options);}

      var ext = '.png';
      var $trigger = $(this);
      var $target = $(this);

      if( o.trigger )
      	$trigger = o.trigger;

			$trigger.hover(function() {
				if($target.attr('src').indexOf(o.suffix) != -1)
					$target.attr('src', $target.attr('src').replace(o.suffix + ext, ext));
				else
					$target.attr('src', $target.attr('src').replace(ext, o.suffix + ext));
			});


		});

	};

})( jQuery );