# SASS

## Documentation

* http://sass-lang.com


## Installation de Ruby

* Installer Ruby en le téléchargeant sur http://rubyinstaller.org
* Ouvrir un terminal Windows et tapper 'ruby -v' pour vérifier le numéro de version installée.


## Nouvelle installation de SASS / Compass & plugins

```
gem install sass
```

```
gem install compass
```

```
gem install sass-globbing
```



## Mise à jour

```
gem update sass
```

```
gem update compass
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

