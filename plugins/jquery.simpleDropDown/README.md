# jQuery simple Drow Down


## Installation

### 1. Join plugin

```html
<script src="assets/js/jQuery/jquery.min.js"></script>
<script src="assets/js/plugins/position.min.js"></script>
<script src="assets/js/plugins/jquery.simpleDropDown.js"></script>
```


### 2. Markup

```html
<ul class="nav">
  <li><a href="#">Lorem ipsum</a></li>
  <li><a href="#">Lorem ipsum</a></li>
  <li>
    <a href="#">Lorem ipsum</a>
    <div class="sdd-sub-nav">
      <ul>
        <li><a href="#">Lorem ipsum</a></li>
        <li><a href="#">Lorem ipsum</a></li>
        <li><a href="#">Lorem ipsum</a></li>
      </ul>
    </div>
  </li>
</ul>
```



### 2. JavaScript

```js
$('ul.nav').simpleDropDown();
```



### 3. Options

Options | Type  | Description                    | Default
--------|-------|--------------------------------|--------

