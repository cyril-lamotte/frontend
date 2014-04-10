# SASS

## Installations / Mises à jour

### Ruby

* Télécharger Ruby sur http://rubyinstaller.org
* Ouvrir un terminal Windows et tapper 'ruby -v' pour vérifier le numéro de version installée.

### SASS
Documentation : http://sass-lang.com

```
gem install sass
```

```
gem update sass
```


### Compass
Documentation : http://compass-style.org/reference/compass/

```
gem install compass
```

```
gem update compass
```


### Globbing
Permet d'importer un dossier en un seul '@import'.

Documentation : https://github.com/chriseppstein/sass-globbing

```
gem install sass-globbing
```


### Bundler
Gestion des dépendances

Documentation : http://bundler.io/

```
gem install bundler
```

Utilisation : Se placer dans le dossier du projet, et créer le fichier de dépendance "Gemfile" avec :

```
bundler init
```

Editer le fichier avec les dépendances :

```
# A sample Gemfile
source "https://rubygems.org"

gem "sass", "~> 3.2.14" # 3.2.X
gem "compass", "~> 0.12.2" # 0.12.X
gem "sass-globbing"
```

Installer les versions correspondants au projet avec la commande suivante (Plusieurs version de gem peuvent cohabiter).
Un fichier Gemfile.lock sera créé, *ne pas le supprimer*

```
bundler install
```




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

