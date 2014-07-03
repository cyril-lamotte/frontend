## Emplacement des fichiers de configuration

Menu Prefrences / Browse Packages...

## Ouvrir les pages dans Chrome avec F12

Faire un clic droit dans la barre latérale, Project / Edit Preview URLs

```js
{
    "L:/":{
        "url_testing":"http://url"
    }
}
```


## Augmenter le nombre de projets récents

1. Aller dans `Packages/Default/Main.sublime-menu`
2. Vers la ligne 715, ajouter les ligne  `{ "command": "open_recent_project", "args": {"index": 10 } }`

Source : http://stackoverflow.com/questions/15769156/increase-number-of-recent-projects-in-sublime-text-2

## Raccourcis Emmet

Raccourcis | Actions
-----------|--------
CTRL + J | Aller à la balise fermante/ouvrante
CTRL + SHIFT + G | Wrapper avec une expression
CTRL + / & CTRL + SHIFT + / | Commenter la ligne / la balise courante
CTRL + SHIFT + Y | Calculer une expression mathématique
CTRL + R | Répercuter les valeurs CSS sur les préfixes vendeur
