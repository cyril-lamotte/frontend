
# [Projet]

## P�rim�tre

Volume :
Compatibilit� :
Accessibilit� :



## Projet

Chef de projet :
Graphisme :



## Sp�cificit�s techniques


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

* Installer Ruby en le t�l�chargeant sur http://rubyinstaller.org
* Ouvrir un terminal Windows et tapper 'ruby -v' pour v�rifier le num�ro de version install�e.



## SASS/COMPASS : Lancer l'�coute du r�pertoire

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

  // Feuilles de style g�n�r�es
  - style.scss
  - print.scss


  // Feuilles de style incluses
  - partials/

    - general/ // Styles globaux & helpers
    - pages/   // Styles sp�cifiques par pages ou modules
    - ui/      // �l�ments d'interface r�currents
    - vendors/ // Mixins tierce partie

    base.scss  // Import des biblioth�ques
    theme.scss // Variables du site (couleurs / polices / breakpoints...)


