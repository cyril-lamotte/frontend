# jQuery RWD list to button

Transform a ul list in a toggable button


## Features

* Customisable Labels



## Installation

### 1. Join plugin

```html
<script src="assets/js/plugins/jquery.rwd-list-to-button.js"></script>
```

### 2. JavaScript

```js
$('ul').rwdListToButton({
  triggerdefaultLabel: 'Navigation'
});
```

### 3. Options

Options              | Type   | Description                             | Default
---------------------|--------|-----------------------------------------|--------
triggerdefaultLabel  | String | Default button's label                  | 'Menu'
triggerLabelClosed   | String | Button's title / aria-label when closed | 'Ouvrir le menu'
triggerLabelOpened   | String | Button's title / aria-label when opened | 'Fermer le menu',
prefix               | String | Prefix class                            | 'rwd-ltb-'

