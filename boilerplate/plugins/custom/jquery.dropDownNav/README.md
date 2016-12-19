# jQuery simple Drow Down

Menu déroulant.

## Features

* Ouverture au clic ou au survol.


## Markup

```html
<script src="assets/js/contrib/position.min.js"></script>
<script src="assets/js/plugins/jquery.dropDownNav.js"></script>
```

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


## Theme

```css
.sub-nav {
  display: none;
}
```

## JavaScript

```js
$('ul.nav').dropDownNav();
```



### Options

Options      | Type   | Description                    | Default
-------------|--- ----|--------------------------------|---------------
prefix       | string | Classes prefix                 | 'ddn-'
event        | string | hover | click                  | 'hover'
subSelector  | string | CSS Selector                   | '> li > div'
delay        | int    | Closing delay (hover mode)     | 300
position     | object | jquery ui position config      | { my: 'left top', at: 'left bottom' }
onShow       | method | Triggered when sub is shown    | function() {}
onHide       | method | Triggered when sub is hidden   | function() {}
