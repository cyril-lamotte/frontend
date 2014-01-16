# Guide de développement frontend &mdash; HTML

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


## Convention d'écriture



```html
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

