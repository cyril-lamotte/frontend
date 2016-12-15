# Block-link

Rendre un bloc cliquable sans balise <a>.

## Features

* Mouse middle button complient.
* Focus managment.


## Markup

```html
<div class="custom-block">
  <h2><a href="http://www.example.com">Titre du bloc avec un lien</a></h2>
  <p>[Contenu du bloc, également cliquable, un clic déclenchera le lien du titre] Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas laboriosam ea nam atque reiciendis ut velit quod esse impedit eum.</p>
</div>
```

## Theme

```css
.block-link {
  cursor: pointer;
}
```

## JavaScript

> [jquery.block-link.js](jquery.block-link.js)

```js
$(document).ready(function() {

  // Block link
  $('div.custom-block').blockLink({
    blocks: 'div.custom-block',
    target: 'h2 > a'
  });

});
```

### Options

Options | Type   | Description                          | Default
--------|--------|--------------------------------------|----------
blocks  | string | CSS Selector (element)               | ''
target  | string | CSS Selector (descendant of element) | 'a'

