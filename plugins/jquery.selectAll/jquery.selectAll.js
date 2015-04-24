(function( $ ){

  /**
  * Plugin jQuery selectAll v1.0.0 (05/2015)
  *
  */

  $.fn.selectAll = function(options) {

    return this.each(function() {

      // Defaults options
      var defaults = {
        wrapper: 'form'
      };

      // Merge user's options
      o = $.extend({}, defaults, options);

      $(this).click(function (event) {

        var $wrapperAll = $(this).parents( o.wrapper );

        if( $(this).is(':checked') ) {

          // Check all
          $wrapperAll.find('input:not(:checked)').trigger('click');

        }
        else {

          // Uncheck all
          $wrapperAll.find('input:checked').trigger('click');

        }

      });

    });

  };


})( jQuery );
