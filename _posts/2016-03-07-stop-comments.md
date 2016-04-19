---
title: Стоп-комментарии
layout: default
has_ps: true
---

Без стоп-комментариев код становится лаконичнее и информативнее. Этот пост о комментариях, которым не место в коде.

**Закомментированный код** отвлекает от чтения и исследования, увеличивает риск пропустить важное. Как пятиминутный рекламный блок, начавшийся на словах Вито Корлеоне: «[&hellip;ты никогда не искал моей дружбы и ты боялся быть у меня в долгу](https://www.youtube.com/watch?v=JXhVAjA_tdg)».

```javascript
// var fibonacci = function(n) {
//  if (n < 2){
//    return 1;
//  } else {
//    return fibonacci(n-2) + fibonacci(n-1);
//  }
// }

finallyMakeSomethingUseful()
```

<del>Не предлагайте дружбу.</del> Удаляйте без сожалений. Если что — возьмете из истории Гита.

-----------------------

**Капитанские комментарии** объясняют очевидное, описывают то, что и так ясно из кода.

```ruby
# Associations
has_many :posts
has_many :comments
```

```javascript
// Default Config
var defaultConfig = { showWordCount: true }

// close connection
connection.close()
```

```scss
// в _header.scss
// ========================
// HEADER
// ========================
#header { }
```

В них нет пользы и новой информации. Удаляйте без раздумий.

-----------------------

**Комментарии-зарубки**, «чтобы не забыть», вызывают чувство вины, напоминают о том, до чего никак не дойдут руки. Как новенькие, неопробованные лыжи, три года стоящие на балконе.

```javascript
// TODO: fix this hack!
// TODO: move it somewhere else
// FIXME: this is not a good idea
// TODO: refactor this file
```
Удаляйте без сомнений, чините или выносите в ишки-тудушки в Джиру, Бейскемп, Трелло. В очередной спринт по техдолгу доберетесь до них.

P. S. О «вонючих» и полезных комментариях — в следующем посте.

-----------------------

Еще по теме:

* [Please, don’t commit commented out code](https://medium.com/@kentcdodds/please-don-t-commit-commented-out-code-53d0b5b26d5f#.ptxoookg6);
* [Comment Costs And Benefits](http://c2.com/cgi/wiki?CommentCostsAndBenefits).
