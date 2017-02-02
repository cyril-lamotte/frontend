(function( $ ){

  /**
  * Plugin jQuery equalize v1.5.0
  * @link https://github.com/cyril-lamotte/frontend/tree/master/boilerplate/plugins/dev/jquery.equalize
  */

  $.fn.equalize = function() {

    var $boxes = $(this);
    var minHeight = 0;
    var offsetLines = [];

    $boxes
      .on('equalize.equalize', function() {

        // Enable equalizing.

        var $box = $(this);

        // Get vertical position for box grouping.
        var offsetTop = Math.round($box.offset().top);
        var offsetLabel = 'offset-' + offsetTop;
        var offsetLabelRounded = null;
        var offsetLabelPlus1 = 'offset-' + (offsetTop + 1);
        var offsetLabelMinus1 = 'offset-' + (offsetTop - 1);

        $box.attr('data-eq-offset', offsetTop);

        // Create table of the boxes sorted by "offsetTop".
        //
        // All boxes with the same offsetTop (2px range) are pushed in an array cell.

        // Determinate if a similar offsetTop already exists.
        var exact = offsetLabel in offsetLines;
        var plus1 = offsetLabelPlus1 in offsetLines;
        var minus1 = offsetLabelMinus1 in offsetLines;

        // None of the tree values exists, create new line.
        if (!exact && !plus1 && !minus1) {
          offsetLines[offsetLabel] = new Array();
          offsetLines[offsetLabel].push(this);
        }
        else {
          // Value exists, so determinate
          if (exact) {
            offsetLabelRounded = offsetLabel;
          }
          else if (plus1) {
            offsetLabelRounded = offsetLabelPlus1;
          }
          else if (minus1) {
            offsetLabelRounded = offsetLabelMinus1;
          }

          offsetLines[offsetLabelRounded].push(this);

          // Get max.
          // We use getBoundingClientRect() to manage subpixels.
          minHeight = Math.max(offsetLines[offsetLabelRounded][0].getBoundingClientRect().height, this.getBoundingClientRect().height);


          // Apply minHeight.
          $.each(offsetLines[offsetLabelRounded], function(i, box) {
            $(box).css('minHeight', minHeight);
          });

        }

        $box.addClass('is-equalized');

      })
      .on('destroy.equalize', function() {

        // Destroy.

        $(this)
          .removeClass('is-equalized')
          .removeAttr('style')
          .removeAttr('data-eq-offset');

      });


    // Refresh on resize
    $(window).on('resize.equalize', function() {

      // Do not trigger refresh if window is still resizing
      window.clearTimeout(window.timeoutID);

      window.timeoutID = window.setTimeout(function() {

        $boxes
          .trigger('destroy.equalize')
          .trigger('equalize.equalize');

      }, 300);

    });

    // Browse all boxes.
    $boxes.trigger('equalize.equalize');

    //console.log(offsetLines);

    return $(this);

  };

})( jQuery );
