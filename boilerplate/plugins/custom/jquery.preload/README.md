# jQuery Preload

Plugin jQuery - Preload images



## Features

* Preload images
* IE8+ compliant


## Installation

### 1. Join plugin

```html
<script src="assets/js/plugins/jquery.preload.js"></script>
```

### 2. JavaScript

```js
// Images to preload
var imagesToPreload = [
  "path/to/img/preloaded-img-1.png",
  "path/to/img/preloaded-img-2.png"
];

$('body').preload({
  'files' : imagesToPreload,
  'logs'  : false
});
```

### 3. Options

Options | Type  | Description                    | Default
--------|-------|--------------------------------|--------
files   | Array | Images paths                   | null
logs    | Bool  | If true, shows logs in console | false

