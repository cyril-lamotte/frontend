(function( $ ){

  /**
  * Plugin jQuery equalize v1.0.0 (04/2015)
  *
  */

  $.fn.equalize = function() {

    var minHeight = 0;
    var arrayLines = [];

    $(this).each(function(i, el) {

      var offsetTop = $(el).offset().top;
      var offsetLabel = 'offset-'+ offsetTop;

      // Create table
      if( ! arrayLines[offsetLabel] ) {
        arrayLines[offsetLabel] = Array();
        arrayLines[offsetLabel].push(el);
      }
      else {
        arrayLines[offsetLabel].push(el);
        var length = arrayLines[offsetLabel].length;

        minHeight = Math.max(arrayLines[offsetLabel][0].offsetHeight, this.offsetHeight);

        // Apply minHeight
        $.each(arrayLines[offsetLabel], function(i, el) {
          $(el).css("minHeight", minHeight);
        });
      }

    });

    return $(this);

  };



})( jQuery );
