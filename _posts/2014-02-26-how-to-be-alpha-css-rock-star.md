---
title: "Как пользоваться успехом у женщин с помощью CSS"
layout: default
---

Как известно, девушки начинают интересоваться CSS в возрасте 20-22 лет. Именно в этот период многие из них обклеивают стены своих комнат распечатками исходного кода Bootstrap в перемешку с плакатами альфа-программистов, рок-звезд фронтенда и CSS-гуру.

Совместно с редакцией журнала «Верстающий Фатеж» мне удалось выяснить, что отличает гуру CSS от обывателей. Ответ незамысловат — Autoprefixer и методология.

[Autoprefixer](https://github.com/ai/autoprefixer) берет последние данные о префиксах и браузерах с caniuse.com, читает ваш CSS и добавляет только нужные префиксы.

Вот пример из [официальной документации SASS](http://sass-lang.com/guide#6):

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius; // нужен Safari 4.0 (2008 год)
     -moz-border-radius: $radius; // нужен Firefox 3.6 (2010 год)
      -ms-border-radius: $radius; // никогда не поддерживался
       -o-border-radius: $radius; // никогда не поддерживался
          border-radius: $radius;
}
```

Сколько еще мы должны страдать от подобных уродских миксинов? Почему мы вообще должны думать о префиксах? Пусть машины страдают и думают о них. [Ставьте Autoprefixer](https://github.com/ai/autoprefixer#usage) и забывайте о боли.

К сожалению, Autoprefixer не решает проблемы с архитектурой CSS.  Если проект более менее сложный, то слабая и туповатая архитектура CSS усложняет разработку. Это не «дизайнерская проблема», о которой можно позабыть, а часть приложения, которая также должна иметь хорошую архитектуру.

CSS — не только средство визуального дизайна, это тоже код. CSS с хорошей архитектурой предсказуем, его легко поддерживать, масштабировать и использовать повторно. А писать такой CSS помогают методологии, своды правил и рекомендаций.

Не ленитесь, почитайте о некоторых методологиях разработки CSS:

* [БЭМ](http://ru.bem.info/method/), Блок-Элемент-Модификатор от «Яндекса»;
* [SMACSS](http://smacss.com/), Scalable and Modular Architecture for CSS;
* [MCSS](http://operatino.github.io/MCSS/en/), Multilayer CSS от «Одноклассников»;
* [OOCSS](http://oocss.org/), Object-Oriented CSS;
* [OPOR](http://nano.sapegin.ru/all/opor-methodology), микро-методология.

Что бы вы не выбрали, даже если не стали ничего читать из списка выше, не забывайте о том, что CSS — код, который тоже требует любви и правильных подходов, вроде DRY, KISS и принципа единственной обязанности.

<div class="outstanding">
  Перестаньте херачить CSS, начните думать. Девчонкам это нравится.
</div>

Вам ведь еще поддерживать и разрабатывать этот код в будущем.


--------------------------------

Домашнее чтение:

* «[Code smells in CSS](http://csswizardry.com/2012/11/code-smells-in-css/)», чего стоит избегать при написании CSS;
* «[Архитектура CSS](http://web-standards.ru/articles/css-architecture/)», после этой статьи ваш мир уже не будет прежним.