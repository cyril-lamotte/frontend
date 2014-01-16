# Guide de développement frontend &mdash; JavaScript & jQuery



## Convention d'écriture

* Les fichiers de script devront limiter la portée de leurs variables en utilisant un _module pattern_, nous utilisons les "bonnes pratiques recommandées par Drupal":http://drupal.org/node/756722#using-jquery :

```js
(function ($) {
/* Code exécuté au chargement de la page */
$(document).ready(function() {
  // Code
});

// Code

})(jQuery);
```





## Recommandations

### Maintenabilité & évolutivité

* Nous utilisons la bibliothèque "jQuery":http://jquery.com/ pour ajouter des comportements sur les pages.
* Si possible tout de même, utiliser du [Vanilla JS](http://vanilla-js.com/).

### Qualité & performances

### Accessibilité

* Les éléments non-fonctionnel quand JavaScript est désactivé ne doivent pas être
affichés (Ex : Bouton de défilement « Suivant » / « Précédent » d’une galerie photo).
* Chaque script est utilisable au clavier et à la souris
* Chaque script générant un mouvement peut être stoppé et relancé.