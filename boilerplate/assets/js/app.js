/**
 * @file Namespace definition and common methods
 *
 */


var app = {
  themeUrl: '',
  ui: {},


  /**
   * Returns URL anchor
   * @returns {string|bool} Anchor
   */
  getUrlAnchor: function() {
    var anchor = window.location.hash;
    anchor = anchor.substring(1, anchor.length);
    return (anchor) ? anchor : false;
  },



  /**
   * Returns an array of URL params
   * @returns {Array} URL Params
   */
  getParams: function() {

    var url = window.location.href.split('?')[1];
    if( !url)
      return false;

    var params = url.split('&');

    var output_params = [];

    $.each(params, function(k, v) {

      var p = v.split('=');

      var obj = {};
      obj[p[0]] = p[1];
      output_params.push(obj);

    });

    return output_params;

  },



  /**
   * Add browsers polyfills
   */
  polyfills: function() {

    /**
     * Placeholder
     */
    Modernizr.load({
      test: Modernizr.input.placeholder,
      nope: this.themeUrl + 'assets/js/plugins/jquery.placeholder.min.js',
      complete : function() {

        // Placeholder
        if( $.fn.placeholder )
          $('input[placeholder], textarea[placeholder]').placeholder();
        }
    });

  }

};



