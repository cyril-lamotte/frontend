## Emplacement des fichiers de configuration

Menu Preferences / Browse Packages...



## Packages Sublime Text

Package                                                     | Description
------------------------------------------------------------|-------------------------------------
[Package Control](http://wbond.net/sublime_packages/package_control/installation) | Gestion des packages
[Open-Include](https://github.com/SublimeText/Open-Include) | Ouvrir un fichier depuis l'HTML avec `ALT+D`
_SideBar Enhancement_                                       | Ajout de fonctionnalités dans la barre latérale
_Emmet_                                                     | Écriture raccourcie ([Documentation](http://docs.emmet.io/), [Cheat-sheet](http://docs.emmet.io/cheat-sheet/))
[Livestyle](http://livestyle.emmet.io/) | Styler en direct dans le navigateur
[CSS Format](https://sublime.wbond.net/packages/CSS%20Format) | Formater le code CSS
SCSS                                                        | Coloration syntaxique
SublimeLinter-jshint                                        | Nécessite npm jshint
SublimeLinter-csslint                                       | Nécessite npm csslint



## Ouvrir dans le navigateur

> Une touche doit être configurée (voir le fichier de préférences)

Faire un clic droit dans la barre latérale, Project / Edit Preview URLs

```js
{
  "L:/":{
      "url_testing":"http://url"
  },
  "D:/www/mockups.local/":{
      "url_testing":"http://mockups.local/"
  }
}
```


## Augmenter le nombre de projets récents

1. Aller dans `Packages/Default/Main.sublime-menu`
2. Vers la ligne 715, ajouter des lignes  `{ "command": "open_recent_project", "args": {"index": 10 } }`

Source : http://stackoverflow.com/questions/20540492/how-to-increase-number-of-recent-files-in-sublime-text-3




## Raccourcis Emmet

Raccourcis                  | Actions
----------------------------|--------
CTRL + J                    | Aller à la balise fermante/ouvrante
CTRL + SHIFT + G            | Wrapper avec une expression
CTRL + / & CTRL + SHIFT + / | Commenter la ligne / la balise courante
CTRL + SHIFT + Y            | Calculer une expression mathématique
CTRL + R                    | Répercuter les valeurs CSS sur les préfixes vendeur
F12                         | Aller à la déclaration
