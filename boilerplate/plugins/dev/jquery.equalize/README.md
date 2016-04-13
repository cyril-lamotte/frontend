# jQuery Equalize

Equalize blocks height which have the same offsetTop.

## Requirements

> `box-sizing` must be `border-box`

[Caution with IE because of `box-sizing` bug - Caniuse.com](http://caniuse.com/#search=box-sizing)


## Features

* IE8+ compliant
* Class `is-equalized` is added after equalizing
* Class `equalize--new-line` is added after to the first element on each processed line.
* 2px range to avoid subpixels bug


## Installation

### 1. Join plugin

```html
<script src="js/jquery.equalize.js"></script>
```



### 2. JavaScript

```js
$(window).load(function() {

	// Equalize blocks height
  $('.box').equalize();

});
```

```js
// Destroy
$('.box').trigger('destroy.equalize');
```




### 3. Events

Name                 | Description
---------------------|----------------------------------------
destroy.equalize     | Delete min-height & remove classes
