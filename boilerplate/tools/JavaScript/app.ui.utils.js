/**
 * @file UI methods
 *
 */

(function ($) {



/**
 * Returns URL anchor
 * @returns {string|bool} Anchor
 */
app.ui.getUrlAnchor = function() {
  var anchor = window.location.hash;
  anchor = anchor.substring(1, anchor.length);
  return (anchor) ? anchor : false;
};



/**
 * Returns an array of URL params
 * @returns {Array} URL Params
 */
app.ui.getParams = function() {

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

};



/**
 * Add browsers polyfills
 */
app.ui.polyfills = function() {

  /**
   * Placeholder
   */
  Modernizr.load({
    test: Modernizr.input.placeholder,
    nope: this.themeUrl + 'assets/js/plugins/contrib/jquery.placeholder.min.js',
    complete : function() {

      // Placeholder
      if( $.fn.placeholder )
        $('input[placeholder], textarea[placeholder]').placeholder();
      }
  });

};



})(jQuery);
