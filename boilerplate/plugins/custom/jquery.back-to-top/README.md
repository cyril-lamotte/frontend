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
  <a href="#top"><span>Haut de page</span></a>
</div>
```


## Theme

> [_back-to-top.scss](_back-to-top.scss)


## JavaScript

> [jquery.back-to-top.js](jquery.back-to-top.js)

```js
$(document).ready(function() {

  // Back to top link.
  $('#back-to-top').backToTop({
    threshold: 200,
    offset: 200
  });

});
```
