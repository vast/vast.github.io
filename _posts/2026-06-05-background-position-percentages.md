---
title: "background-position в процентах"
layout: default
telegram_id: 390
telegram_url: https://t.me/polovnyov_journal/390
---

Хочу поделиться с вами радостью. Спустя 20 лет веб-разработки я наконец-то понял, как работает background-position, заданный в процентах. Всего-то нужно было прочитать спеку:

> With a value pair of 75% 50%, the point 75% across and 50% down the image is to be placed at the point 75% across and 50% down the area.

Или МДН:

> Similarly, background-position: 25% 75% means the spot on the image that is 25% from the left and 75% from the top will be placed at the spot of the container that is 25% from the container's left and 75% from the container's top.

Представим, что у нас bgp: 70% 30%. Находим точку на изображении, которая стоит в (70%, 30%) от размеров изображения. Находим точку в контейнере, которая стоит в (70%, 30%) от размеров контейнера. И просто совмещаем их. То есть точка на изображении, стоящая в (70%, 30%), будет ровно в точке (70%, 30%) в контейнере.

Зная это, легко сымитировать background-position вручную. Пусть у нас такая разметка:

```html
<div class="box">
  <img src="...">
</div>
```

И тогда так:

```css
:root {
  --bgp-x: 70%;
  --bgp-y: 30%;
}

.box {
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 200px;

  img {
    position: absolute;

    left: var(--bgp-x); /* Располагаем левый верхний угол изображения в (70%, 30%) контейнера */
    top: var(--bgp-y);

    translate: calc(-1 * var(--bgp-x)) calc(-1 * var(--bgp-y)); /* Сдвигаем изображение на 70% его ширины и 30% его высоты влево-вверх */
  }
}
```

Пример вживую:<br>
[https://codepen.io/vpolovnyov/pen/MYbXRRJ](https://codepen.io/vpolovnyov/pen/MYbXRRJ)

Еще по теме:<br>
* [https://drafts.csswg.org/css-backgrounds-3/#example-c27a0cea](https://drafts.csswg.org/css-backgrounds-3/#example-c27a0cea)

* [https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-position#regarding_percentages](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-position#regarding_percentages)
