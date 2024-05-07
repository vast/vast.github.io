---
title: "Дефолтный box-sizing в ЦСС. Спасибо, ИЕ!"
layout: default
---

Дефолтный box-sizing в ЦСС. Спасибо, ИЕ!

Все знают, что верстку нужно начинать с заклинания, переключающую блочную модель с инопланетной на человеческую:

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

Если этого не сделать, будет работать значение по умолчанию, box-sizing: content-box, то есть падинги и бордеры не будут входить в ширину элемента. Соответственно, если сказать инпутам width: 100%, они переполнят форму, потому что их ширина будет равна 100% + падинги + бордеры.

Мне такое поведение всегда казалось всратым. Если я измеряю коробку для обуви, то ее ширина — это ширина коробки, а не обуви внутри. 

Оказывается, появлением вменяемой блочной модели мы обязаны Интернет Эксплореру:
> Specifically, IE was treating width to include the border and the padding while CSS1 treated width as including only the content. This became known as the "IE box model".
> 
> In 1998 the Web Standards Project compiled a list of IE's many CSS failings, including this one.

Еще чуть больше подробностей:<br>
<https://www.jefftk.com/p/the-revenge-of-the-ie-box-model>

