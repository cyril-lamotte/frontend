# Organisation du code SASS

## Arborescence


### style.scss

C'est le point d'entrée, `style.css` est généré à partir ce ce fichier.


### utils/

Ce sont des mixins génériques réutilisées entre les projets, elles ne génèrent
aucune ligne de code.



### theme/

Ce sont les mixins spécifiques au projet, elles ne génèrent aucune ligne de
code.


#### theme/___global/

Les varaibles globales du thème sont définie ici.


#### theme/__components/

Ces sont les différents composants / styles utilisé dans le projet.
Tout est sous forme de mixins.



### custom/

Les fichiers `scss` spécifiques au projet sont placés ici. Chaque bloc, section
ou page possède son propre fichier dédié. Ils utilisent les mixins définies dans
`theme/` et `utils`.


#### custom/global/

Ce sont les styles globaux (reset, mise en page, images, formulaires...).

- **normalize.scss** : Applique le reset de `github.com/necolas/normalize.css`
- **box-sizing.scss** : Défini le modèle de boite CSS
- **image.scss** : Rend les images responsive par défaut
- **helpers.scss** : Fourni des classe d'affichage reponsive
- **basics.scss** : Styles globaux (font-size / couleur des liens...)
- **layout.scss** : Mise en page globale (wrapper / colonnes)
- **forms-default.scss** : Apparence par défaut des composants de formulaire
- **print.scss** : Styles globaux d'impression



# Changelog

- 1.0.0 Refactoring


