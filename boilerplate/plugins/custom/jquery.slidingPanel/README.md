# jQuery Sliding panel

Display a sliding panel.



## Features

* IE8+ compliant



## Markup

```html
<script src="js/jquery.slidingPanel.js"></script>
```


Avoid scrollbar with a global wrapper

```html
<div class="outer-wrap">
  [...]
</div><!--/outer-wrap-->
```

```scss
// Avoid scrollbar with a global wrapper
.outer-wrap {
  overflow: hidden;
}
```


```html

<div id="wrapper">

  <div id="sliding-panel" class="sp--panel">
    // Content
  </div>

  <button type="button" id="burger" class="burger" title="<?php print t('Open nav'); ?>"><span class="burger__icon"></span> <span class="burger__text">Menu</span></button>

</div>
```


## JavaScript

```js
var $slidingPanel = $('#sliding-panel');

// Enable panel
$slidingPanel.slidingPanel({
  trigger: $('#burger'),
  wrapper: $('#wrapper')
});

// Close
$slidingPanel.find('button.btn--close').click(function (event) {
  $slidingPanel.trigger('hide.sp');
});
```


## CSS

* [SCSS](_slidingPanel.scss)



## Options

Options      | Type   | Description                    | Default
-------------|--- ----|--------------------------------|---------------
prefix       | string | Classes prefix                 | 'sp-'
duration     | int    | Slide effect duration          | 300
trigger      | jQuery | Button "Burger"                | $('#trigger')
wrapper      | jQuery | Site wrapper                   | $('#wrapper')
overlay      | bool   | Add overlay                    | true
position     | string | Position of panel              | 'left'
onShow       | method | Triggered when panel is shown  | function() {}
onHide       | method | Triggered when panel is hidden | function() {}
