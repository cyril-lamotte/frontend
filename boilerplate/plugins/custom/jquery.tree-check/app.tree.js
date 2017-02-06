/**
 * @file UI methods
 *
 */

(function($) {

"use strict";

  /**
   * Add tree behavior.
   */
  app.searchTree = function() {

    var $tree = $('.search-tree');
    var treePrefix = 'st__';
    var $links = $tree.find('a');

    // Create arrows.
    $tree.find('.tree__parent').append('<button type="button" class="'+ treePrefix +'arrow"></button>');

    // Toggle sublevels.
    $('.st__arrow').on('click', function(event) {
      $(this).parent()
        .toggleClass('tree__is-open')
        .next().slideToggle('fast');
    });


    // Check
    $links.on('check', function() {

      var $this = $(this);

      $this.trigger('setCheck', true);

      // Propagation to descending.
      $this.parent().next().find('a').trigger('setCheck', true);

      // Propagation to ascending.
      $this.trigger('setParentsState');

    });


    // Uncheck
    $links.on('uncheck', function() {

      var $this = $(this);

      // Unactive link.
      $this.trigger('setCheck', false);

      // Propagation to descending.
      $this.parent().next().find('a').trigger('setCheck', false);

      // Propagation to ascending.
      $this.trigger('setParentsState');

    });


    $links.on('setParentsState', function() {

      var $this = $(this);
      var $parent = $this.parents('ul').first().prev().find('a');
      var $children = $parent.parent().next().find('> li > div > a');
      var totalCount = $children.length;
      var count = 0;
      var countInt = 0;

      if ( ! $parent.length)
        return;

      $children.each(function(i, el) {

        if ($(el).hasClass('tree__intermediate')) {
          countInt++;
        }
        else if ($(el).hasClass('tree__checked')) {
          count++;
        }

      });


      if (countInt > 0 || count > 0 && count < totalCount) {
        $parent.trigger('setCheck', 'intermediate');
      }
      else if (count === 0) {
        $parent.trigger('setCheck', false);
      }
      else if (count == totalCount) {
        $parent.trigger('setCheck', true);
      }

      //console.log($parent);
      //console.log('Checked: ' + count + '/' + totalCount, 'Inter: ' + countInt + '/' + totalCount);

      $parent.trigger('setParentsState');

    });



    $links.on('setCheck', function(event, state) {

      var $this = $(this);

      if (state === true) {
        $this
          .removeClass('tree__intermediate')
          .addClass('tree__checked');
      }
      else if(state === false) {
        $this
          .removeClass('tree__intermediate')
          .removeClass('tree__checked');
      }
      else {
        $this
          .addClass('tree__intermediate')
          .removeClass('tree__checked');
      }

    });



    // Check / Uncheck
    $links.click(function (event) {

      event.preventDefault();
      var $this = $(this);

      // Propagation.
      if ($this.hasClass('tree__checked')) {
        $this.trigger('uncheck');
      }
      else {
        $this.trigger('check');
      }

    });

  };

})(jQuery);
