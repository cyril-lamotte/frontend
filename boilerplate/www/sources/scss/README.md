# Organisation du code SASS

## Arborescence

### style.scss

C'est le point d'entrée, `style.css` est généré à partir ce ce fichier.


### utils/

Ce sont des mixins génériques réutilisées entre les projets, elles ne génèrent
aucune ligne de code.


### theme/

Ce sont les mixins spécifiques au projet et les classes de base.


#### theme/___global/

Les variables globales du thème sont définie ici.


#### theme/__components/

Ces sont les différents composants / styles utilisés dans le projet.
Tout est sous forme de mixins + classes de base.


### custom/

Les fichiers `scss` spécifiques au projet sont placés ici. Chaque bloc, section
ou page possède son propre fichier dédié. Ils utilisent les mixins définies dans
`theme/` et `utils`.


#### custom/global/

Ce sont les styles globaux (reset, mise en page, images, formulaires...).


# Grilles

Aucune grille par défaut n'est définie. Le module susy est utilisé pour créer
des grille sur mesure au besoin.


# Changelog

- 1.1.0 Update Sprites managment
- 1.0.0


