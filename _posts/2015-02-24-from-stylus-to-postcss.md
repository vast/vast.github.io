---
title: Stylus → PostCSS
layout: default
classes: favorite
---

Пока [серьезные ребята](http://benfrain.com/breaking-up-with-sass-postcss/) [только подумывают](http://davidtheclark.com/excited-about-postcss/) о переезде на PostCSS, я взял и перевел сайт (не этот, а другой) со Stylus на PostCSS.

У меня было 400 строк кода, 20 переменных, gulp, собирающий фронтенд, и целое множество правил всех сортов и расцветок, а также медиавыражения, псевдоклассы, миксины и вложенные селекторы. Не то что бы это был необходимый запас для сайта. Но если начал собирать фронтенд, становится трудно остановиться.

<img class="img--break" src="/assets/50-shades-of-postcss.jpg" alt="" />

PostCSS — парсер, и работает с текстом похожим на CSS. Поэтому в первую очередь я переехал с SASS-подобного синтаксиса (значащие отступы, отсутствие точек с запятой и фигурных скобок) на SCSS-подобный. Stylus поддерживает оба синтаксиса, поэтому это делается до переезда на PostCSS:

```sass
// было
.footer
  padding: 1rem
```

```scss
/* стало */
.footer {
  padding: 1rem;
}
```

Теперь выкидываем Stylus, меняем расширение `.styl` файлов на `.css` и добавляем PostCSS.
В первую очередь нужен [postcss-import](https://github.com/postcss/postcss-import) для поддержки `@import`, [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars) для переменных и [postcss-nested](https://github.com/postcss/postcss-nested) для вложенных селекторов:


```coffee
postcssImport = require("postcss-import")
postcssVars = require("postcss-simple-vars")
postcssNested = require("postcss-nested")

preprocessors = [
  postcssImport(from: AppConfig.paths.mainStylesheet),
  postcssNested,
  postcssVars
]

gulp.task "stylesheets", ["clean:stylesheets"], ->
  gulp.src(AppConfig.paths.mainStylesheet)
    .pipe(postcss(preprocessors))
```

Объявление переменных придется поменять (` =` на `:`):

```scss
// было
$text-color = rgba(0, 0, 0, .85);
```

```css
/* стало */
$text-color: rgba(0, 0, 0, .85);
```

С миксинами сложнее. Есть [postcss-mixins](https://github.com/postcss/postcss-mixins):

```scss
// было
clearfix() {
}

.footer {
  @include clearfix;
}
```

```css
/* стало */
@define-mixin clearfix {
}

.footer {
  @mixin clearfix;
}
```

[Есть](https://github.com/morishitter/postcss-extend) [аналоги](https://github.com/davidtheclark/postcss-simple-extend) `@extends`, но в обоих случаях бесчеловечный и многословный синтаксис. Временно заменил _единственный_ `@extends` на миксин.

Для работы с цветом есть [postcss-color-function](https://github.com/postcss/postcss-color-function):

```scss
// было
$footer-color = lighten($text-color, 10%);
$submit-shadow-color = darken($link-color, 20%);
```

```css
/* стало */
$footer-color: color($(text-color) lightness(10%));
$submit-shadow-color: color($(link-color) blackness(+20%));
```

Вот и все. Уложился в час.

--------------------------------

Следующий свой проект обязательно буду собирать с PostCSS вместо Stylus/LESS/SASS. Все, что нужно мне от препроцессоров, — вложенные селекторы, переменные, миксины и работа с цветом. Все это есть в PostCSS в виде крохотных подключаемых модулей.

В то же время нет безумных штук вроде `@for`, `@if`, `@at-root`, `@each` из SASS. PostCSS — это ограничения, в которых [рождается хороший дизайн](http://www.artlebedev.ru/kovodstvo/sections/175/) и чистый код.

Ну, и он быстрый:

```
# PostCSS
[21:42:10] Starting 'stylesheets'...
[21:42:10] Finished 'stylesheets' after 206 ms

# Stylus
[21:42:45] Starting 'stylesheets'...
[21:42:45] Finished 'stylesheets' after 325 ms
```

--------------------------------

Дополнительное чтение:

* [Пример использования](https://github.com/fatezh/fatezh) PostCSS с Gulp из [Верстающего Фатежа](https://fatezh.github.io);
* [PostCSS на Гитхабе](https://github.com/postcss/postcss);
* [Андрей Ситник о PostCSS](http://codehipsters.com/2014/11/27/sitnik-interview.html).
