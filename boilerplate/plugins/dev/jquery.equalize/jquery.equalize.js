(function( $ ){

  /**
  * Plugin jQuery equalize v1.2.0
  * @link https://github.com/cyril-lamotte/frontend/tree/master/boilerplate/plugins/dev/jquery.equalize
  */

  $.fn.equalize = function() {

    var minHeight = 0;
    var arrayLines = [];

    $(this).each(function(i, el) {

      var offsetTop = $(el).offset().top;
      var offsetLabel = 'offset-'+ Math.ceil(offsetTop);

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
          $(el).css('minHeight', minHeight).addClass('equalized');
        });
      }


    });


    // Destroy
    $(this).bind('destroy.equalize', function() {

      $(this)
        .removeClass('equalized')
        .removeAttr('style');

    });


    return $(this);

  };



})( jQuery );
