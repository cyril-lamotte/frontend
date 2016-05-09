# jQuery Menu Level

Display a sliding panel



## Features

* IE8+ compliant



## Installation

### 1. Join plugin & stylesheet

```html
<script src="js/jquery.slidingPanel.js"></script>
```





Avoid scrollbar with a global wrapper

```html
<div class="outer-wrap">
  [...]
</div><!--/outer-wrap-->
```

```css
/* Avoid scrollbar with a global wrapper */
.outer-wrap {
  overflow: hidden;
}
```


```html
<button type="button" id="btn--burger" class="btn--burger" title="<?php print t('Open nav') ?>">Menu</button>
<div id="sliding-panel" class="sp--panel">

  // Content

</div>
```




### 2. JavaScript

```js
$('#sliding-panel').slidingPanel({
  trigger: $('#btn--burger'),
  wrapper: $('#site')
});


// Close
$('#sliding-panel button.btn--close').click(function (event) {
  $('#sliding-panel').trigger('hide.sp')
});
```



```scss
// Panel width
$sp-panel-width: 200px;

/* Site wrapper */
.sp--wrapper {
  left: 0;
  transition: transform 500ms;

  .sp--is-expanded & {
    transform: translate3d($sp-panel-width, 0, 0);
  }

}


/* Panel */
.sp--panel {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  width: $sp-panel-width;
  transform: translate3d(-100%, 0, 0);
  backface-visibility: hidden;
  transition: transform 500ms;

  .no-csstransforms3d & {
    display: none;
  }

  .sp--is-expanded & {
    display: block;
    z-index: 4;
    //transform: translate3d(0, 0, 0); // If nav is outside the wrapper
  }
}


/* Overlay */
.sp--overlay {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fafafa;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.sp--is-expanded .sp--overlay {
  display: block;
}
```


### 3. Options

Options | Type  | Description                    | Default
--------|-------|--------------------------------|--------
lorem   | Array | Images paths                   | null
