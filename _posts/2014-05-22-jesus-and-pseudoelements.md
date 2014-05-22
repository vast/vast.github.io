---
title: "Иисус и псевдоэлементы"
layout: default
---

<style>
.posts-nav {
  position: relative;
  height: 4em;
  border: 1px dashed #ccc;
  border-width: 1px 0;
}

.posts-nav::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border-right: 1px dashed #ccc;
}

.comments-counter {
  font: normal normal 16px/1 sans-serif;
  position: relative;
  display: inline-block;
  padding: 11px 12px 10px;
  background: #212121;
  color: #fff;
}

.comments-counter::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: -6px;
  margin-top: -6px;
  border-style: solid;
  border-width: 6px 6px 6px 0;
  border-color: transparent #212121 transparent transparent;
}

.post-footer {
  text-align: center;
}

.post-footer::before {
  content: '∞';
  display: block;
  font-size: 1.5em;
}
</style>

Если бы Иисус верстал, то заповедей было бы 11. Последняя гласила бы: «Не нахерачь». И детям на уроках «Основ православной культуры» объясняли бы, что херачить дивы со спанами направо и налево — это грех. Ведь в верстке нет ничего хуже, чем без раздумий добавлять элементы в документ исключительно в оформительских целях.

Добавить еще див для фона, и еще один, чтобы разделить блок напополам изящной полоской. Это удар по семантике, мертвый, бесполезный и некачественный код. Грешновато!

Хорошо, что в CSS есть псевдоэлементы. Они как друзья Джона Нэша: браузер их видит и вместе с ними работает на ЦРУ, а в коде их нет. Псевдоэлементы есть у всех элементов, кроме пустых и «заменяемых»: `<br>`, `<img>`, `<button>`, `<input>`, `<select>`, `<textarea>`, `<object>`.

Самые полезные из псевдоэлементов, `::before` и `::after`, позволяют добавлять инлайн элементы до и после содержимого элемента, к которому применяются:

<footer class="post-footer">
  &copy; John Forbes Nash
</footer>

```scss
.post-footer {
  text-align: center;
}

.post-footer::before {
  content: '∞';
  display: block;
}

```

--------------------------------

С добавлением ~~насилия~~ абсолютного позиционирования:

<nav class="posts-nav"></nav>

```scss
.posts-nav {
  position: relative;
  height: 4em;
  border: 1px dashed #ccc;
  border-width: 1px 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    border-right: 1px dashed #ccc;
  }
}
```

--------------------------------

<div style="text-align: center">
  <span class="comments-counter">19</span>
</div>

```scss
.comments-counter {
  // стили, стили, стили
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: -4px;
    margin-top: -4px;
    border-style: solid;
    border-width: 6px 6px 6px 0;
    border-color: transparent #212121 transparent transparent;
  }
}
```

--------------------------------

<div class="outstanding">
  Когда в следующий раз добавите пустой див,
  вспомните, что у вас есть 2 халявных элемента,
  и подумайте, как бы поступил Иисус?
</div>
