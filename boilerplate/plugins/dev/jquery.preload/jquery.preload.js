(function( $ ){


/**
* Plugin jQuery preload v1.0.0 (10/2014)
*
* Options
*
* files : array - Tableau d'url vers les images à précharger - defaut : null
* logs : bool - Afficher un console.log des images passées en paramètre  - defaut : false
*
*/
$.fn.preload = function(options) {

  return this.each(function() {

    // Default options
    var o = {
      'files' : null,
      'logs': false
    };


    // Merge with user's options
    if(options) {$.extend(o, options);}


    // Loads images
    var img = new Array();
    for (var i = 0; i < o.files.length; i++) {
      img[i] = new Image();
      img[i].src = o.files[i];

      if(o.logs)
        console.log('Preload...', o.files[i]);
    }

  });


}

})( jQuery );