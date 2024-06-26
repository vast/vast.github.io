---
title: "irb: echo on assignment"
layout: default
---

Недавно заметил, что при запуске рельсовой консоли пропало «эхо» при присвоении. Раньше было так:

```
> subscription = Subscription.find(123)
=>
#<Subscription:0x00007fe17d6b6e38
 id: 123,
 product_id: "xxx",
 status: "active">
```

А стало так (некруто):

```
> subscription = Subscription.find(123)
=>
#<Subscription:0x00007fb3f4d06588
...
```

Полез разбираться и узнал пару интересных вещей. Во-первых, с марта [railties бандлит irb](https://github.com/rails/rails/commit/4fefed42398867e4a103d48267395481b2845cb3).

Это нужно для того, чтобы ребята со старым Руби все равно получили новый irb вместо «системного» старья.

Во-вторых, новый irb по умолчанию обрезает «эхо» при присвоении:
* <a href="https://github.com/ruby/irb/commit/4c89b0775be793f34f45766570516dae5a34e8bc">https://github.com/ruby/irb/<wbr>commit/4c89b077</a>
* <a href="https://github.com/ruby/irb/commit/5af637b3c17f85c15a32416bc5b4579307873833">https://github.com/ruby/irb/<wbr>commit/5af637b3</a>

В-третьих, чтобы вернуть «эхо», достаточно подкрутить конфигурацию irb в ~/.irbrc:
```ruby
IRB.conf[:ECHO_ON_ASSIGNMENT] = true
```

Там же можно вырубить всратое автодополнение:
```ruby
IRB.conf[:USE_AUTOCOMPLETE] = false
```
