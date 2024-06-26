---
title: "Дефолтные стили браузеров"
layout: default
---

<img src="/assets/sup.jpg" width="1000" height="582" />

Если сделать текстовый файлик, написать в него немного текста и тегов и открыть в браузере, то текст все равно будет стилизован. Индексы работают, задан какой-то кегль и интерлиньяж.

Так происходит потому, что у браузеров есть user agent stylesheets — цсс-стили, встроенные в сам браузер. То есть это не какое-то дефолтное поведение отдельных текстовых нод, а буквально цсс-файл, который браузер подключает в первую очередь ко всем страницам. И конечно, именно с этих стилей начинается каскад: стили браузера → стили страницы → стили пользователя.

Такое поведение — [часть спецификации CSS2](https://www.w3.org/TR/CSS21/cascade.html#cascade):
> User agent: Conforming user agents must apply a default style sheet (or behave as if they did). A user agent's default style sheet should present the elements of the document language in ways that satisfy general presentation expectations for the document language (e.g., for visual browsers, the EM element in HTML is presented using an italic font). See A sample style sheet for HTML for a recommended default style sheet for HTML documents.

И конечно, эти стили можно посмотреть: опен-сорс, все дела. Например, Хром:  
<a href="https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css">https://chromium.googlesource.com/<wbr>chromium/blink/+/master/<wbr>Source/core/css/html.css</a>

Сафари:  
<a href="https://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css">https://trac.webkit.org/<wbr>browser/trunk/Source/WebCore/css/html.css</a>

Фаерфокс:  
<https://searchfox.org/mozilla-central/source/layout/style/res/html.css>

Эти стили стоит глянуть, чтобы офигеть (1000 строк!), лучше понять ЦСС (`head { display: none }`) и подсмотреть прикольные трюки.
