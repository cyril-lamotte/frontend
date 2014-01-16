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


## Convention d'écriture

* Identation avec des espaces
* Des commentaires sont insérés pour chaque groupe de règles
* Les règles-enfants sont indentés
* Formatage d'une règle :
 - Mettre un espace aprés le sélecteur, avant et aprés les accolades, et aprés les ":".
 - Sélecteurs d'attribut entre guillemets
 - Retour à la ligne après l'accolade
 - Retour à la ligne après chaque propriété (exception possible si moins de 3 propriétés)
 - 1 point virgule aprés chaque propriété (Charge au minifieur d'optimiser)
 - Les propriétés sont indentées
 - 1 saut de ligne entre deux règles
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


## Recommandations

### Maintenabilité & évolutivité

* Ne pas utiliser les styles en ligne (attribut style)
* Éviter les CSS > 2000 lignes (Avec un préprocesseur SASS par exemple)
* Utiliser une feuille de style de mise à zéro, on privilégie [normalize.css](http://necolas.github.com/normalize.css/).
* Les zones de contenus alimentées par un CMS doivent maintenir les styles classiques des éléments de base.
(p, em, strong…) (ex : `em` doit produire de l’italique, `strong` du gras etc...
* Éviter Les sélecteurs interminables (Ex : `#site .menu #foo #bar .active {...}`)
> * Un long sélecteur implique des problèmes de performances coté navigateur client.
> * IL rend le code difficilement maintenable et réutilisable.
> * C'est trop compliqué !
* Éviter les `!important` & ne pas appliquer un style sur un id (`#foo {...}`)
> La spécificité des #id et des important est trop importante, ce qui les rend
> difficiles à surcharger (difficulté de maintenance) et oblige à étendre les
> sélecteurs ce qui n'est pas bon pour les performances (voir question précédente).
* Éviter de faire dépendre le style d’un élément de son contexte. Un élément
(par exemple un bouton) peut être déplacé n’importe où sans que son apparence
soit altérée. Une approche Orientée Objet est privilégiée.
* Ne pas utiliser de classe pour styler ET pour exécuter un JavaScript.
Le balisage ci-dessous contient deux classes ; la première est associée au style
CSS, la deuxième à une fonction JS.

```css
<div class="style-css action-javascript">...</div>
```

* Tous les composants que vous créez doivent être laissés totalement libres de
largeurs, ils doivent toujours rester fluides et leurs largeurs doivent être
régies par un système de parent / de grille.

### Qualité

* [Ne pas utiliser @import](http://developer.yahoo.com/performance/rules.html#csslink).
* Toujours mettre des polices de secours dans _font-family_

```css
font-family: Arial; /* KO */
font-family: Arial, Helvetica, sans-serif; /* OK */
```

* Utiliser `box-sizing` quand le périmètre navigateur le permet (>= IE8)
* Utiliser les sélecteurs CSS3 &mdash; [W3C : les sélecteurs](http://www.w3.org/TR/css3-selectors/#selectors)
* Ne pas utiliser d'unité pour la propriété _line-height_ `line-height: 1.4`


### Accessibilité

* Toujours utiliser les unités relatives (em ou rem) pour les polices (voir même pour les marges / breakpoints)
* Chaque élément cliquable réagit au survol ou au focus (Un soulignement ou un changement de couleur de fond).
* Pour permettre l’agrandissement des caractères, les zones accueillant du contenu textuel ne sont pas fixées en hauteur (jamais de `height`).
* Le focus des liens n’est jamais supprimé (outline par défaut) ; il peut en revanche être remplacé pas un autre effet graphique.
* Quand une image de fond est appliquée, une couleur de fond est également présente pour maintenir la lisibilité en cas d’absence de l’image ou d’agrandissement du texte.
