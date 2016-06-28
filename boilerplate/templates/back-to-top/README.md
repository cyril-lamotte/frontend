# "Back to top" button

> Afficher un bouton "Retour vers le haut de page" dès que l’utilisateur a fait défilé la fenêtre sur une distance donnée.


## Markup

```html
<a id="top" name="top">&nbsp;</a>` ou `<div id="top">[...]</div>
```

> L'ancre vide ne fonctionne pas sur iPad


```html
<!--Back to top button-->
<div id="back-to-top" class="back-to-top">
  <a href="#top">Haut de page</a>
</div>
```


## Theme

> [_back-to-top.scss](_back-to-top.scss)



## JavaScript

```js
/**
 * Display "Back to top" button when scrolling
 * @param {object} options - Settings
 * @param {jQuery object} target - Trigger
 * @param {int} threshold - Scrolltop before showing
 */
app.ui.backToTop = function(options) {

  // Defaults options
  var defaults = {
    target: $('#back-to-top'),
    threshold: 200
  };

  // Merge user's options
  var settings = $.extend({}, defaults, options);


  // Display "top button" after scrolling until threshold
  $(window).scroll(function () {

    var scrollTop = $(window).scrollTop();

    if ( scrollTop > settings.threshold ) {
      settings.target.addClass('back-to-top--is-visible');
    }
    else {
      settings.target.removeClass('back-to-top--is-visible');
    }

  });


  settings.target.click(function (event) {

    event.preventDefault();
    app.ui.scrollToTarget({
      'targetID': settings.target.find('a').attr('href')
    });

  });

};
```

```js
/* Execute code when the DOM is fully loaded */
$(document).ready(function() {

  // Back to top link
  app.ui.backToTop({
    target: $('#back-to-top'),
    threshold: 200
  });

});
```

> Nécessite cette fonction pour activer le scroll doux.

```js
/**
 * Scroll toward anchor with fixed header
 * targetID = "#anchor"
 */
app.ui.scrollToTarget = function(options) {

  var defaults = {
    'targetID': null,
    'offset': 0,
    'duration': 500
  };

  settings = {};

  // Merge user's options
  settings = $.extend({}, defaults, options);

  if( ! settings.targetID )
    throw new Error('No target defined.');

  var $target = $(settings.targetID);

  if( ! $target.length )
    throw new Error('Target ID not exists.');

  var scrollDestination = $target.offset().top;

  if( settings.offset )
    scrollDestination -= settings.offset;

  $('body, html').animate({ scrollTop: scrollDestination }, settings.duration);
};
```
