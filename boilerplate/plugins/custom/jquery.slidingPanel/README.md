# jQuery Sliding panel

Show a side panel on click on the trigger. Useful for a mobile navigation.


## Features

* CSS3 animation
* ARIA
* Close on touch/click on overlay
* ECHAP key to close
* Tabulation stays in panel


## Markup

```html
<script src="js/jquery.sliding-panel.js"></script>
```


Avoid scrollbar with a global wrapper.

```html
<div class="outer-wrap">
  [...]
</div><!--/outer-wrap-->
```

```scss
// Avoid scrollbar with a global wrapper.
.outer-wrap {
  overflow: hidden;
}
```


```html
<div class="wrapper">
  <div id="sliding-panel" class="sp--panel">
    // Content
  </div>
  <button type="button" id="burger" class="burger"><span class="burger__icon"></span> <span class="burger__text">Menu <span>(ouvrir)</span></span></button>
</div>
```


## JavaScript

```js
// Enable panel.
$('#sliding-panel').slidingPanel({
  trigger: '#burger',
  wrapper: '.wrapper',
  close_button_text: 'Fermer le menu',
  panel_text: 'Menu latéral ouvert, pressez la touche ECHAP pour fermer le menu.',
  onShow: function() {
    // Update hidden text for a11y.
    $('#burger').find('.burger__hidden-text').text('(fermer)');
  },
  onHide: function() {
    // Update hidden text for a11y.
    $('#burger').find('.burger__hidden-text').text('(ouvrir)');
  }
});
```


## CSS

* [CSS](sliding-panel.css)
* [SCSS](sliding-panel.scss)



## Options

Options      | Type   | Description                    | Default
-------------|--------|--------------------------------|---------------
prefix       | string | Classes prefix                 | 'sp-'
duration     | int    | Duration before moving focus back | 300
trigger      | jQuery | "Burger" Button                | $('#trigger')
wrapper      | jQuery | Site wrapper will move on opening | false
overlay      | bool   | Add overlay                    | true
onShow       | method | Triggered when panel is shown  | function() {}
onHide       | method | Triggered when panel is hidden | function() {}
