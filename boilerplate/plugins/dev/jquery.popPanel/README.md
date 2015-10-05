# jQuery popPanel

Toggle panel on trigger action.


## Requirements

* jQuery 1.9+
* jQuery UI position()
* IE8+


## Features

* Buttons are hidden if JavaScript is disabled
* ARIA
* ESC key for closing, the focus returns on trigger


## Installation



### 1. Join plugin

```html
<script src="jquery.min.js"></script>
<script src="jquery.ui.position/position.min.js"></script>
<script src="assets/js/plugins/jquery.popPanel.js"></script>
```



### 2. Markup

```html
<button id="pop-trigger" data-pop-panel-id="demo-1">Trigger</button>
<div id="demo-1" class="pop-panel">

  <button type="button" class="pop-panel--close-trigger">Fermer le panneau</button>

  <h2 id="demo-1-title">Pop</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos porro facere necessitatibus nisi accusantium nobis error molestiae distinctio officiis. Debitis?</p>

</div><!--/pop-panel-->
```



### 3. CSS

```css
.pop-panel {
  position: absolute;
  display: none;
  z-index: 10;
}

.pop-panel--is-closed {
  display: none;
}

.pop-panel--is-opened {
  display: block;
}
```

### 4. JavaScript

```js
$(document).ready(function() {

  $('#pop-trigger').popPanel({
    closeTrigger: 'button.pop-panel--close-trigger',
    idPopTitle: 'demo-1-title',
  	position: {
      my: 'left top',
      at: 'left-50 bottom+10',
      collision : 'flip'
    }
  });

  // Public method for closing
  $('#pop-trigger').data('popPanel').close();

}); // /ready
```


### 5. Options

Options                   | Type            | Description                      | Default
--------------------------|-----------------|----------------------------------|--------------------------------------------------------
prefix                    | string          | prefix for classes               | 'pop-panel-'
idPopTitle                | string          | Accessibility feature : An HTML id, text for labelling pop, if null, the trigger text is used  | null
closeTrigger              | CSS selector    | A click on it will close the pop | null
selectorFocusableElements | CSS selector    | List of focusable elements       | 'a, button, input'
position                  | Position object | (See jQuery UI position documentation)[http://api.jqueryui.com/position/] | { my: 'left top', at: 'left bottom', collision : 'flip' }
onOpen                    | Callback method | Triggers on pop opening          | function() {}
onClose                   | Callback method | Triggers on pop closing          | function() {}
