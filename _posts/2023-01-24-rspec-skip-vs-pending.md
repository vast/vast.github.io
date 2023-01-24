---
title: "RSpec: skip и pending"
layout: default
---

Ситуация: пришли дизайнеры, говорят, СРОЧНО меняем механизм рекомендаций к статье. Вы меняете код, запускаете тесты, получаете кучу ошибок: рекомендации теперь другие, результаты не соответствуют действительности. Дизайнеры и маркетологи стоят у вас над душой и просят выкатить все НЕМЕДЛЕННО. Что делать с «битыми» тестами?

В RSpec есть пара тегов для «пропуска» битых тестов: `skip` и `pending`. Добавляем тег к `context`, `describe` или `it` и указываем причину:
```ruby
it "returns posts with tags commonly used together", skip: "Broken in #45"

it "returns posts with tags commonly used together", pending: "Blocked by #46"
```


`skip` и `pending` отличаются по смыслу: `skip` отмечает тесты, которые пропускаем по какой-то причине; `pending` отмечает тесты, которые ждут какого-то события, чтобы заработать. Соответственно, и ведут себя по-разному: `skip` пропускается, а `pending` выполняется. Если тесты в `pending` пройдут, RSpec свалится с ошибкой:
```ruby
1) returns posts with tags commonly used together FIXED
     Expected pending 'Blocked by #46' to fail. No error was raised.
```

Короче, если на собеседовании вас спросят, чем отличается `skip` от `pending`, смело отвечайте: `pending` может завалить тесты, а `skip` — нет.
