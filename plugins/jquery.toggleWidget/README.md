# jQuery toggleWidget

Plugin jQuery - Afficher un élément aprés un évènement sur un autre élément
(Ex: Bouton qui affiche un div)

## Features

* IE8+ compliant


## Installation

### 1. Join plugin

```html
<script src="assets/js/plugins/jquery.toggleWidget.js"></script>
```

### 2. JavaScript

```js
// Display/Hide panels
$('button').toggleWidget({
  activePanelClass: 'nav-touch-panel-active',
  connect: true,
  connectRelationClass: '.header',
  'onShow' : function() {
		console.log('Show');
  }
});

```

### 3. Options

Options              | Type   | Description                                 | Default
---------------------|--------|---------------------------------------------|--------
activePanelClass     | String | Active panel class                          | 'toggle-widget-panel-active'
connect              | Bool   | If true, only one panel can be showed       | false
connectRelationClass | String | Class name of a common parent of the panels | ''
slideMode            | String | 'toggle' / 'slide'                          | 'toggle'
onShow()             | Method | Do stuff after showing                      | function() {}
onHide()             | Method | Do stuff after hidgng                       | function() {}

