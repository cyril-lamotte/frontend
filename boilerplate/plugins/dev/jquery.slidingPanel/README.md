# jQuery Menu Level

Display a sliding panel



## Features

* IE8+ compliant



## Installation



### 1. Join plugin & stylesheet

```html
<script src="assets/js/plugins/jquery.slidingPanel.js"></script>
```

```html
<button type="button" id="btn--burger" class="btn--burger" title="<?php print t('Open nav') ?>">Menu</button>
<div id="sliding-panel">

	// Content

</div>
```


### 2. JavaScript

```js
$('#sliding-panel').slidingPanel({
  trigger: $('#sliding-panel-trigger'),
  wrapper: $('#site')
});
```



### 3. Options

Options | Type  | Description                    | Default
--------|-------|--------------------------------|--------
lorem   | Array | Images paths                   | null
