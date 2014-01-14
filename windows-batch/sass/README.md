# SASS

## Installation

* Installer Ruby en le téléchargeant sur http://rubyinstaller.org/
* Ouvrir une command Windows et tapper 'ruby -v' pour vérifier le numéro de la version de ruby installée.


```
gem install sass
```

```
gem install compass
```

## Utilisation

"Écouter" un dossier

```
cd projet/
sass --watch scss:css
```


Style "étendu" de la sortie CSS

```
sass --style expanded --watch scss:css
```

Style "compressé" de la sortie CSS

```
sass --style compressed --watch scss:css
```
