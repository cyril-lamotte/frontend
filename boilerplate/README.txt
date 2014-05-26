
# [Projet]

## Périmètre

Volume :
Compatibilité :
Accessibilité :



## Projet

Chef de projet :
Graphisme :



## Spécificités techniques


* RGAA
* Graceful degredation
* Responsive Design

* SASS 3.2.14
* Compass 0.12.2
* sass-globbing






## SASS/Compass

### Documentation

* http://sass-lang.com


### Installation de Ruby

* Installer Ruby en le téléchargeant sur http://rubyinstaller.org
* Ouvrir un terminal Windows et tapper 'ruby -v' pour vérifier le numéro de version installée.



## SASS/COMPASS : Lancer l'écoute du répertoire

* Installation : https://github.com/cyril-lamotte/frontend/blob/master/windows-batch/sass/README.md
* Compilation : Avec la commande windows / mac, se positionner dans le dossier assets/

```
compass watch .
```

A chaque modification des sources, la compilation va se relancer.


## Doc

* Installation de SASS/Compass https://github.com/cyril-lamotte/frontend/blob/master/windows-batch/sass/README.md
* Mixins CSS3 http://compass-style.org/reference/compass/css3/




## Arborescence SCSS

scss/

  // Feuilles de style générées
  - style.scss
  - print.scss


  // Feuilles de style incluses
  - partials/

    - general/ // Styles globaux & helpers
    - pages/   // Styles spécifiques par pages ou modules
    - ui/      // Éléments d'interface récurrents
    - vendors/ // Mixins tierce partie

    base.scss  // Import des bibliothèques
    theme.scss // Variables du site (couleurs / polices / breakpoints...)


