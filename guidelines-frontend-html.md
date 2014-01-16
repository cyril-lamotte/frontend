# Guide de développement frontend &mdash; HTML

## Introduction

### Objectifs

En travaillant sur des projets d'envergure, il est important de travailler de
façon unifiée dans le but de :

* Garder des gabarits HTML maintenables & extensibles
* Atteindre un niveau d'accessibilité AA



## Convention d'écriture

* Balises, attributs et valeurs en minuscules, les valeurs d’attributs sont
entourées de guillemets doubles.
* Utiliser la tabulation pour indenter le code.

```html<!--Header-->
<div class="header">
  […]
</div><!--/header-->
```




## Recommandations

### Maintenabilité & évolutivité

* Afin de cibler des styles CSS pour Internet Explorer, ne pas créer de feuille
de styles spécialisée. Utiliser la syntaxe suivante autour de la balise `html`
pour pouvoir cibler les différentes versions d’IE :

```html
<!--[if lte IE 7]><html lang="fr" class="ie7 oldies"><![endif]-->
<!--[if IE 8]><html lang="fr" class="ie8 oldies"><![endif]-->
<!--[if IE 9]><html lang="fr" class="ie9"><![endif]-->
<!--[if gt IE 9]><!--><html lang="fr"><!--<![endif]-->
```

Ainsi, dans le CSS, écrire la ligne “standard”, puis les lignes spécifiques à
Internet Explorer.

```css
.test li { padding: 0; background: none; }
.ie7 .test li { overflow: hidden; zoom: 1; }
```

Limiter le plus possible l’utilisation de ces styles spécifiques.
De plus, éviter d’utiliser des hacks CSS (ex : « _margin : » ou « html * » etc.).


* Le plus dur est toujours de trouver des noms de classes, quelques pistes :

```css
-body
-btn
-content
-data
-group
-item
-layout
-title
-more
```css



### Qualité & performances

* La déclaration du type de document (DTD) à utiliser est celle de l’HTML 5 : `<!DOCTYPE HTML>`
* Aucune balise de présentation n’est utilisée (_i_, _b_, _u_, _font_ etc.).
* Insérer les [feuilles de styles dans l’entête](http://developer.yahoo.com/performance/rules.html#css_top).
* [Insérer les scripts en bas de page](http://developer.yahoo.com/performance/rules.html#js_bottom)  (exception : modernizr)
* [Réduire le nombre d’éléments dans le DOM](http://developer.yahoo.com/performance/rules.html#min_dom)

### Accessibilité

* Chaque page produite est valide selon la DTD sélectionnée. Le validateur du W3C
est l’outil de contrôle de référence.
* La structuration du code respecte la sémantique du contenu (Utilisation de `h` pour les titres,
`ul` pour les listes etc...).
* La structure des titres est cohérente et pertinente, sans saut de niveau de titre (voir [headings map pour Firefox](https://addons.mozilla.org/fr/firefox/addon/headingsmap/)
* Aucun attribut de présentation n’est utilisé (_width_, _bgcolor_ etc.).

* Les textes en majuscule doivent être gérés avec `text-transform : uppercase;`
sous peine de voir les lecteurs d’écran prononcer les lettres une par une (T-E-X-T-E E-N…)
au lieu de l’énoncer normalement.

```html
  <h3>TEXTE EN MAJUSCULES INCORRECT</h3>
  <h3>Texte en majuscules correct</h3> (+ uppercase en CSS)
```

> Les sigles sont écris en majuscules mais sont balisés avec `abbr`.

* Les liens vers des fichiers en téléchargement doivent être codés avec un title
reprenant l’intitulé, le format, le poids et l’indication de nouvelle fenêtre :
> Le mieux étant d'afficher ces informations dans l'intitulé du lien.

```html
<a href="#" title="Mon document - Format PDF, 42ko, nouvelle fenêtre" target="_blank">Mon document</a>
```

* Chaque champ de formulaire est associé à une étiquette (qui peut-être masquée de façon accessible).

```html
<label for="id" class="is-hidden">Label</label>
```

```css
.is-hidden { position: absolute; left: -9999px; top: 0; }
```

* Une balise _form_ enveloppe chaque formulaire.
* Les ensembles de cases à cocher / boutons radio sont rassemblés dans une balise _fieldset_ (accompagnée de la balise _legend_).
* Si un picto est utilisé comme bouton de validation, l'input type image doit être utilisé (ou button type="submit" avec une balise image à l'intérieur)

## Outils

* [Validateur W3C](http://validator.w3.org/)
* [HTML Validator pour Firefox](http://users.skynet.be/mgueury/mozilla/)