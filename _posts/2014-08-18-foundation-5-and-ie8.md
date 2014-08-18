---
title: "Реквием по ИЕ"
layout: default
---

Здравствуйте. Меня зовут Василий, мне 28 лет, и я ~~слушаю Сергея Лазарева~~ использовал Foundation 5 с IE8.

Я вырос в благополучной семье, окончил престижный ВУЗ, устроился на работу по специальности. Всё шло хорошо. Но полгода назад я в первый раз попробовал Foundation 5 с IE8.

Родители ни о чем не догадывались. По крайней мере, не подавали виду. На их вопросы я умело врал, что устал и не выспался. Мне не было страшно, мне было интересно.

Foundation 5 использует медиавыражения и `rem` в CSS. IE8 не поддерживает ни то, ни другое. Знакомые ребята подсказали [адресок](http://foundation.zurb.com/forum/posts/241-foundation-5-and-ie8). Я добавляю весь этот JavaScript и открываю виртуалку с IE8:


```html
<!--[if lt IE 9]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.2/html5shiv.js"></script>
  <script src="//s3.amazonaws.com/nwapi/nwmatcher/nwmatcher-1.2.5-min.js"></script>
  <script src="//html5base.googlecode.com/svn-history/r38/trunk/js/selectivizr-1.0.3b.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.1.0/respond.min.js"></script>
<![endif]-->


<script src="js/rem.js" type="text/javascript"></script>
```

Работает, но очень медленно: и rem.js, и selectivizr.js, и respond.js запрашивают копию CSS и парсят ее. Самый медленный из них — rem.js.

За пару часов пишу CSS пост-процессор [Rails Pixrem](https://github.com/vast/rails-pixrem), который дублирует правила с `rem` в пикселях:

```css
/* до */
#header {
  font-size: 2rem;
}

/* после */
#header {
  font-size: 2rem;
  font-size: 32px;
}
```

Выкидываю rem.js, добавляю Rails Pixrem. Выкидываю nwmatcher.js и selectivizr.js: никаких суперсложных селекторов в Foundation 5 нет.
Сайт начинает открываться в IE8 меньше, чем за секунду. Херак, херак, и на стейджинг.

IE8 показывает на стейджинге мобильную версию. Respond.js загружает копию CSS AJAX’ом, разбивает ее на блоки по медиавыражениям и добавляет на страницу, включая или выключая их в зависимости от текущего состояния окна браузера. Из соображений безопасности такие запросы не работают в IE8, когда CSS отдается с другого домена (CDN или поддомен со статикой, `assets.foobarbaz.com`).

Не проблема. Отдаем CSS для IE8 с оригинального домена, а остальным браузерам с CDN.

Готовый рецепт с условными комментариями:

```erb
<head>
  <!-- … -->

  <!--[if gt IE 8]><!-->
    <%= stylesheet_link_tag "application" %>
  <!--<![endif]-->

  <!--[if lt IE 9]>
    <%= direct_stylesheet_link_tag "application" %>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
```

`direct_stylesheet_link_tag` хелпер:

```ruby
module AssetHelper
  def direct_stylesheet_link_tag(*sources)
    captured = stylesheet_link_tag(*sources)

    captured.to_str.gsub(/href="([^"]+)"/) do
      path = URI(Regexp.last_match[1]).path
      %(href="#{path}")
    end.html_safe
  end
end
```

-------------------------------------------

Я не запускал виртуалку с IE8 уже 2 месяца. У меня хорошая работа, куча настоящих друзей и отличные отношения в семье. Foundation 5 в IE8 — это не приговор. Выход [есть](https://gist.github.com/vast/bbeea16b50aee1c1715f).
