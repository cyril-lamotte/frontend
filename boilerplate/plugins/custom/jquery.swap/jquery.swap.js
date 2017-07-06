(function( $ ){


  /**
   * Plugin jQuery swap v1.0.0 (05/2012)
   *
   * Options
   * suffix : apparait dans le nom de l'image survolée.
   */
  $.fn.swap = function(options) {

    return this.each(function() {

      // Options par défaut.
      var o = {
        'suffix' : '-active',
        'trigger' : false
      };

      // Ecrasement avec les options utilisateur.
      if(options) {$.extend(o, options);}

      var ext = '.png';
      var $trigger = $(this);
      var $target = $(this);

      if(o.trigger) {
        $trigger = $trigger.parents(o.trigger);
      }

      $trigger.on('mouseenter.swap mouseleave.swap', function() {

        if(isSwap())
          $target.trigger('unswap.swap');
        else
          $target.trigger('swap.swap');

      });

      $target.on('swap.swap', function() {
        if(!isSwap())
          $target.attr('src', $target.attr('src').replace(ext, o.suffix + ext));
      });

      $target.on('unswap.swap', function() {
        if(isSwap())
          $target.attr('src', $target.attr('src').replace(o.suffix + ext, ext));
      });


      // Destroy.
      $trigger.on('destroy.swap', function() {
        $(this).off('.swap');
      });


      var isSwap = function() {
        if ($target.attr('src').indexOf(o.suffix) == -1)
          return false;

        return true;
      };

    });


  };

})( jQuery );
