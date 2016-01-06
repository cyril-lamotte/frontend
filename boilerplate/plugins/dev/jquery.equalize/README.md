# jQuery Equalize

Equalize blocks height which have the same offsetTop.

> `box-sizing` must be `border-box`

http://caniuse.com/#search=box-sizing : Caution with IE because of `box-sizing` bug

## Features

* IE8+ compliant
* Class equalized is added after equalizing


## Installation

### 1. Join plugin

```html
<script src="js/jquery.equalize.js"></script>
```



### 2. JavaScript

```js
$(window).load(function() {
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
destroy.equalize     | Delete min-height & remove class
