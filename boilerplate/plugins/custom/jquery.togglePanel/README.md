# jQuery togglePanel

Plugin jQuery - Afficher un élément aprés un évènement sur un autre élément
(Ex: Bouton qui affiche un div)

## Features

* IE8+ compliant
* ARIA




## Installation

### 1. Join plugin

```html
<script src="js/jquery.togglePanel.js"></script>
```

```html
<button type="button" id="trigger">Toggle next element</button>
<div id="panel-1" class="panel"></div>

<button type="button" id="trigger" data-tgp-panel-id="panel-1" data-tgp-opened="true">Toggle id="panel-1"</button>
<div id="panel-1" class="panel"></div>
```



### 2. JavaScript

```js
// Toggle panel.
$('#trigger').togglePanel({
  panel: 'id',
  autoFocus: false,
  panelLabel: 'Recherche'
});
```



### 3. CSS

```css
.panel {
  display: none;
}

.tgp--is-opened {
  display: block;
}


```



### 4. Options

Name                 | Type   | Description                                             | Default or options
---------------------|--------|---------------------------------------------------------|-------------------
prefix               | String | Generated classes prefix                                | 'tgp-'
panel                | String | the panel can be the next element or defined by its id  | 'id' / 'next' (default: 'next')
panelLabel           | String | Label for accessibility                                 | 'Panel'
mode                 | String | 'toggle' / 'slide'                                      | 'slide' / 'toggle' (default: 'slide')
wrapper              | Object | Wrapper of connected panels                             | false
connect              | Bool   | If true, only one panel can be shown                    | false
selfClose            | Bool   | Allow the trigger to close its panel                    | true
autoFocus            | Bool   | Focus is moved to panel at opening                      | true
returnFocus          | Bool   | Return focus to the trigger after closing               | true
onShow()             | Method | Do stuff after showing                                  | function() {}
onHide()             | Method | Do stuff after hiding                                   | function() {}




### 5. Events

Name                 | Description
---------------------|----------------------------------------
no-autofocus.tgp     | Remove autofocus after initialisation
show.tgp             | Show panel
hide.tgp             | Hide panel

