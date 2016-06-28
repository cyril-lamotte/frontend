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

> [back-to-top.js](back-to-top.js)



```js
$(document).ready(function() {

  // Back to top link
  app.ui.backToTop({
    target: $('#back-to-top'),
    threshold: 200
  });

});
```
