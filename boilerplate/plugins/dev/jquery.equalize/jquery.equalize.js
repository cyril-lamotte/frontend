(function( $ ){

  /**
  * Plugin jQuery equalize v1.3.1
  * @link https://github.com/cyril-lamotte/frontend/tree/master/boilerplate/plugins/dev/jquery.equalize
  */

  $.fn.equalize = function() {

    var minHeight = 0;
    var arrayLines = [];

    $(this).each(function(i, el) {

      var offsetTop = Math.round( $(el).offset().top );
      var offsetLabel = 'offset-'+ offsetTop;
      var offsetLabelRounded = null;


      // Create table
      // 2px range
      if( ! arrayLines[offsetLabel] && ! arrayLines['offset-'+ (offsetTop + 1)] && ! arrayLines['offset-'+ (offsetTop - 1)] ) {
        arrayLines[offsetLabel] = Array();
        arrayLines[offsetLabel].push(el);

        // This offset doesn't exists, add a "new line" class
        $(el).addClass('equalize--new-line');
      }
      else {

        if( arrayLines[offsetLabel] ) {
          offsetLabelRounded = offsetLabel;
        }
        else if( arrayLines['offset-'+ (offsetTop + 1)] ) {
          offsetLabelRounded = 'offset-'+ (offsetTop + 1);
        }
        else if( arrayLines['offset-'+ (offsetTop - 1)] ) {
          offsetLabelRounded = 'offset-'+ (offsetTop - 1);
        }



        arrayLines[offsetLabelRounded].push(el);
        var length = arrayLines[offsetLabelRounded].length;

        minHeight = Math.max(arrayLines[offsetLabelRounded][0].offsetHeight, this.offsetHeight);

        // Apply minHeight
        $.each(arrayLines[offsetLabelRounded], function(i, el) {
          $(el).css('minHeight', minHeight+1).addClass('is-equalized');
        });

      }


    });


    // Destroy
    $(this).bind('destroy.equalize', function() {

      $(this)
        .removeClass('is-equalized')
        .removeAttr('style');

    });


    return $(this);

  };



})( jQuery );
