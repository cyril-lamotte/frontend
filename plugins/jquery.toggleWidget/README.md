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

```html
<div class="my-account-wrapper">
  <a href="#" role="button" class="my-account toggle-widget-trigger" data-toggle-widget-id="my-account-pop"><span class="sp sprites-icon-user"></span>Mon compte</a>
  <div id="my-account-pop" class="my-account-pop toggle-widget-panel">
  </div>
</div>
```

### 2. JavaScript

```js
// Display/Hide panels
$('button.result-trigger').toggleWidget({
  slideMode: 'slide',
  connect: false,
  connectRelationClass: '.crud-results',
  onShow: function(settings) {
      settings.$trigger.text('-').attr('title', 'Replier');
  },
  onHide: function(settings) {
      settings.$trigger.text('+').attr('title', 'Déplier');
  }
});
```

### 3. CSS

```css
.toggle-widget--is-closed {
  display: none;
}
```


### 4. Options

Options              | Type   | Description                                 | Default
---------------------|--------|---------------------------------------------|--------
activePanelClass     | String | Active panel class                          | 'toggle-widget-panel-active'
connect              | Bool   | If true, only one panel can be showed       | false
connectRelationClass | String | Class name of a common parent of the panels | ''
slideMode            | String | 'toggle' / 'slide'                          | 'toggle'
onShow()             | Method | Do stuff after showing                      | function() {}
onHide()             | Method | Do stuff after hiding                       | function() {}

