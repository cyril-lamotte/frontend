# SASS

## Installations / Mises à jour

### Ruby

* Télécharger Ruby sur http://rubyinstaller.org
* Ouvrir un terminal Windows et tapper 'ruby -v' pour vérifier le numéro de version installée.

### SASS

```
gem install sass
```

```
gem update sass
```

Documentation : http://sass-lang.com


### Compass

```
gem install compass
```

```
gem update compass
```

Documentation : http://compass-style.org/reference/compass/


### Globbing
Permet d'importer un dossier en un seul '@import'.

```
gem install sass-globbing
```

Documentation : https://github.com/chriseppstein/sass-globbing


### Bundler
Gestion des dépendances

```
gem install bundler
```

Documentation : http://bundler.io/ 



## Utilisation avec Compass

### Créer le fichier de configuration

```
compass create sdu --bare --sass-dir "sass" --css-dir "css" --javascripts-dir "js" --images-dir "img"
```

### Écouter & compiler les changements

Se positionner dans le dossier, puis

```
cd projet
compass watch .
```

