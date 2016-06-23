# jQuery simple Drow Down


## Installation

### 1. Join plugin

```html
<script src="assets/js/contrib/position.min.js"></script>
<script src="assets/js/plugins/jquery.dropDownNav.js"></script>
```


### 2. Markup

```html
<ul class="nav">
  <li><a href="#">Lorem ipsum</a></li>
  <li><a href="#">Lorem ipsum</a></li>
  <li>
    <a href="#">Lorem ipsum</a>
    <div class="sub-nav">
      <ul>
        <li><a href="#">Lorem ipsum</a></li>
        <li><a href="#">Lorem ipsum</a></li>
        <li><a href="#">Lorem ipsum</a></li>
      </ul>
    </div>
  </li>
</ul>
```


.sub-nav {
  display: none;
}


### 2. JavaScript

```js
$('ul.nav').dropDownNav();
```



### 3. Options

Options | Type  | Description                    | Default
--------|-------|--------------------------------|--------

