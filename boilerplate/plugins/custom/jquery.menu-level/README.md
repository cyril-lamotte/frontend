# jQuery Menu Level

Multi-level navigation


## Features

* Mobile nav
* IE8+ compliant


## Markup

```html
<script src="assets/js/plugins/jquery.menu-level.js"></script>
```

```html
<div class="menu-level-wrapper">
  <ul class="nav">
    <li><a href="#">Lorem ipsum</a></li>
    <li><a href="#">Lorem ipsum</a></li>
    <li>
      <a href="#">Lorem ipsum</a>
      <ul>
        <li><a href="#">Lorem ipsum</a></li>
        <li><a href="#">Lorem ipsum</a></li>
        <li><a href="#">Lorem ipsum</a></li>
      </ul>
    </li>
  </ul>
</div>
```

## Theme

> [_menu-level.scss](_menu-level.scss)


## JavaScript

```js
$('.menu-level-wrapper').menuLevel({
  'sublevel': 'ul > li > ul',
});
```

### Options

Options            | Type   | Description                             | Default
-------------------|--------|-----------------------------------------|--------
prefix             | string | Classes prefix                          | 'mlvl-'
sublevel           | string | CSS Selector for sublevel               | 'ul'
repeatParentInSub  | bool   | Create a button to go back in sublevels | true
