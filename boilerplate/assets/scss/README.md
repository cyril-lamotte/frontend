
# Spécificités


Spécificités                  | Description
------------------------------|-------------------------------------------------------------
Périmètre de test navigateurs | Navigateurs modernes, IE8+
Accessibilité                 | Oui RGAA
Responsive Design             | Non
Framework                     | [Bootstrap 3.2](http://getbootstrap.com/css/)



# Développement

Spécificités                  | Description
------------------------------|-------------------------------------------------------------
Dépôt SVN                     | https://serv-sources.jouve-hdi.com/jouve/maquettes_studio/jouve/2015/cnfpt/trunk



Fichier ou dossier     | Description
-----------------------|------------
style.scss             | Génère la css principale `style.css`, importe toutes les bibliothèque (ex: Compass)
print.scss             | Génère la css d'impression `print.css`
helpers/               | Styles génériques et réutilisables (alignements, formulaires...)
style/                 | Styles spécifiques au projet
style/_theme.scss      | Variables du site (couleurs / polices / breakpoints...)
style/common/          | Styles globaux du projets (layout / formulaires / header / footer)
style/modules/         | Styles spécifiques à une pages ou un modules
style/ui/              | Éléments d'interface récurrents (Boutons, blocs, navigation, lightbox...)
