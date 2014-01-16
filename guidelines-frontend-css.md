# Guide de développement frontend &mdash; CSS

## Introduction

### Objectifs

En travaillant sur des projets d'envergure, il est important de travailler de
façon unifiée dans le but de :

* Garder les feuilles de style maintenables & extensibles
* Garder le code lisible

Pour satisfaire ces objectifs, on essayera d'appliquer une syntaxe et un
formatage cohérent, et de cadrer l'attitude à avoir pour écrire et architecturer
le CSS.

Les clés de voûte étant les principes KISS & DRY.





## Recommandations

* Éviter les CSS > 2000 lignes (Avec un préprocesseur SASS par exemple)
* Éviter Les sélecteurs interminables (Ex : `#site .menu #foo #bar .active {...}`)
> * Un long sélecteur implique des problèmes de performances coté navigateur client.
> * IL rend le code difficilement maintenable et réutilisable.
> * C'est trop compliqué !

* Éviter les `!important` & ne pas appliquer un style sur un id (`#foo {...}`)
> La spécificité des #id et des important est trop importante, ce qui les rend
> difficiles à surcharger (difficulté de maintenance) et oblige à étendre les
> sélecteurs ce qui n'est pas bon pour les performances (voir question précédente).

* Toujours mettre des polices de secours dans `font-family`.
* Utiliser `box-sizing` quand le périmètre navigateur le permet (>= IE8)
* Pas d'unité pour la propriété _line-height_ `line-height: 1.4`
* Toujours utiliser les unités relatives (em ou rem) pour les polices
(voir même pour les marges / breakpoints)
* Utiliser les sélecteurs CSS3 &mdash; [W3C : les sélecteurs](http://www.w3.org/TR/css3-selectors/#selectors)



## Convention d'écriture

* Identation avec des espaces
* Des commentaires sont insérés pour chaque groupe de règles
* Les règles-enfants sont indentés
* Formatage d'une règle :
 - 1 espace entre le sélecteur et l'accolade
 - Sélecteurs d'attribut entre guillemets
 - Retour à la ligne après l'accolade
 - Retour à la ligne après chaque propriété (exception possible si moins de 3 propriétés)
 - 1 espace après les ":"
 - 1 point virgule aprés chaque propriété (Charge au minifieur d'optimiser)
 - Les propriétés sont indentées
 - 1 Saut de ligne entre deux règles
 - Ne pas insérer les unités lorsque c'est inutile (`margin: 0`)
* Utiliser `-` pour délimiter les noms de classe
* Assurez-vous de toujours nommer vos classes judicieusement ; garder un nom
aussi court que possible, mais aussi long que nécessaire. S'assurer que les
objets ou les abstractions sont très vaguement nommés (par exemple `.ui-list`,
`.media`) pour permettre une meilleure réutilisation. Les extensions des objets
devraient être nommées beaucoup plus explicitement (par exemple `.user-avatar-link`).



```css
/* -----------------------------------------------------------------------------
   Exemple
----------------------------------------------------------------------------- */

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

  .footer-list > li {
    display: inline;
    padding: 0 8px;
    border-left: 1px solid #017a97;
  }

  .footer-list input[type="text"] {
    border: 1px solid #000;
  }
```





## Ancres Javascript

Ne pas utiliser de classe pour styler ET pour exécuter un JavaScript.
Le balisage ci-dessous contient deux classes ; la première est associée au style
CSS, la deuxième à une fonction JS.

```css
  <div class="style-css action-javascript">...</div>
```


## Mise en page

Tous les composants que vous créez doivent être laissés totalement libres de
largeurs, ils doivent toujours rester fluides et leurs largeurs doivent être
régies par un système de parent / de grille.

Les hauteurs ne doivent **jamais** être appliquées aux éléments.
Ne jamais mettre de hauteurs sur les balises `p`, `ul`, `div`, ou n'importe
quoi d'autre.
L'effet désiré peut être obtenu avec `line-height` ou `min-height`.



## Styles conditionnels

Les feuilles de style IE peuvent, généralement, être totalement évitées. La
seule fois où une feuille de style IE peut être nécessaire est de contourner
le manque flagrant de fonctionnalités (une correction des PNG par exemple).

En règle générale, toutes les règles de mise en page et le modèle de boîte
_devraient_ fonctionner sans feuille de style IE en réusinant et en
retravaillant le CSS.


