---
title: Объясни это
layout: default
---

<style>
.axis {
  position: relative;
  height: 20px;
  width: 200px;
  margin: 0 auto;

  font-size: .75rem;
  font-family: serif;
}

.axis:before {
  display: block;
  content: '';

  position: absolute;
  top: 50%;
  left: 0;
  right: 0;

  border-bottom: 1px solid #414141;
}

.point {
  position: absolute;
  left: 0;

  display: block;
  height: 20px;
  width: 20px;
  margin-left: -10px;

  background: #ff0;
  border-radius: 100%;
  line-height: 20px;
  text-align: center;
}

.point--scored_3 {
  left: 60px;
}
</style>

CSS тоже код, и заслуживает быть простым, красивым и _понятным_.
Со сложными, колдовскими и невразумительными значениями CSS становится малопонятным. А количество чезахерня/час увеличивается в порядок.

Смотрите:

<div class="axis">
  <span class="point point--scored_3">
    3
  </span>
</div>

----------------------

```html
<div class="axis">
  <span class="point point--scored_3">
    3
  </span>
</div>
```

```css
.axis {
  position: relative;
  height: 20px;
  width: 200px;

  font-size: .75rem;
}

.axis:before { /* стили для полоски-шкалы */ }

.point {
  position: absolute;
  left: 0;

  display: block;
  height: 20px;
  width: 20px;
  margin-left: -10px;

  background: #ff0;
  border-radius: 100%;
  line-height: 20px;
  text-align: center;
}

.point--scored_3 {
  left: 60px;
}
```

`20px`, `10px`, `60px`, `200px` — это не магические числа, которые удалось подобрать, чтобы эта штука хоть как-то работала в IE. Это странные числа, вызывающие вопросы. Как они связаны между собой? Почему оно работает? Что тут скрыто? Что я сломаю, если поменяю везде `20px` на `30px`?


_Сейчас_ верстальщик знает ответы на эти вопросы. Но через месяц
и он, и люди, работающие над этим CSS впервые, зададут их снова.

Чтобы убрать тайное знание и помочь другим ребятам разобраться в этом коде, введем объясняющую переменную:

```scss
$point-diameter: 20px;
$max-point-count: 10;

.axis {
  position: relative;
  height: $point-diameter;
  width: $max-point-count * $point-diameter;

  font-size: .75rem;
}

.point {
  position: absolute;
  left: 0;

  display: block;
  height: $point-diameter;
  width: $point-diameter;
  margin-left: -($point-diameter / 2);

  background: #ff0;
  border-radius: 100%;
  line-height: $point-diameter;
  text-align: center;
}

.point--scored_3 {
  left: 3 * $point-diameter;
}
```

Теперь зависимость величин от размера метки явно обозначена. Ось в длину `200px` (`$max-point-count * $point-diameter`), чтобы вместить десять меток. Отрицательный отступ слева в половину метки нужен, чтобы отцентрировать ее. А высота строки в `20px` (`$point-diameter`) центрирует текст метки по вертикали.

Кроме того, нам проще вносить изменения. Если окажется, что метки маленькие, а ось короткая, нам не придется исправлять кучу мест, связанных с этими размерами. Скорректируем одну переменную и вуаля!

<img class="img--break" src="/assets/voila.jpg" alt="" />

Объясняйте странные числа, избегайте магических. Ребята, пришедшие в проект несколькими месяцами позже, будут рады такому подходу. И этим пришедшим разработчиком, ~~может быть Альберт Эйнштейн~~ можете быть вы.
