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
```



### 3. Options

Options | Type  | Description                    | Default
--------|-------|--------------------------------|--------
lorem   | Array | Images paths                   | null
