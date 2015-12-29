# jQuery togglePanel

Plugin jQuery - Afficher un élément aprés un évènement sur un autre élément
(Ex: Bouton qui affiche un div)

## Features

* IE8+ compliant
* ARIA




## Installation

### 1. Join plugin

```html
<script src="assets/js/plugins/jquery.togglePanel.js"></script>
```

```html
<button type="button" id="trigger" data-tgp-panel-id="panel-1" data-tgp-opened="true">Show !</a>
<div id="panel-1"></div>
```



### 2. JavaScript

```js
// Display/Hide panels
$('#trigger').togglePanel({
  panel: 'id',
  autoFocus: false
});
```



### 3. CSS

```css

```



### 4. Options

Name                 | Type   | Description                                             | Default or options
---------------------|--------|---------------------------------------------------------|-------------------
prefix               | String | Generated classes prefix                                | 'tgp-'
panel                | String | the panel can be the next element or defined by its id  | 'id' / 'next' (default: 'next')
mode                 | String | 'toggle' / 'slide'                                      | 'slide' / 'toggle' (default: 'slide')
connect              | Bool   | If true, only one panel can be shown                    | false
autoFocus            | Bool   | Focus is moved to panel at opening                      | true
onShow()             | Method | Do stuff after showing                                  | function() {}
onHide()             | Method | Do stuff after hiding                                   | function() {}


### 5. Events

tgp:no-autofocus     | Remove autofocus after initialisation
tgp:show             | Show panel
tgp:hide             | Hide panel

