---
title: Анти-паттерны в тестах
layout: default
---

<img src="/assets/bury-the-lede.png" alt="" />

Тесты — это код без тестов. Чем сложнее и запутаннее они написаны,
тем тяжелее с ними работать, тем больше вероятность ошибок.
Чтобы писать ясные и однозначные тесты, стоит изучать тестовые <nobr>анти-паттерны</nobr>:
типичные проблемы, их последствия и решения.

Ребята из [TestDouble](http://testdouble.com/) собрали каталог таких
анти-паттернов и разбили их на пять групп: неполные, непонятные, ненужные,
нереалистичные и ненадежные тесты. Это самый полный и полезный
справочник <nobr>анти-паттернов</nobr> в тестах из тех, что я видел.

Чтобы больше людей познакомилось с ними, а в мире стало больше прекрасных тестов,
я перевожу каталог на русский. Вот, что получается:

### Неполные тесты

* [Невидимые проверки](https://github.com/vast/test-smells/blob/master/smells/insufficient/invisible-assertions.js)
* [Пропущенные проверки](https://github.com/vast/test-smells/blob/master/smells/insufficient/missing-assertions.js)
* [Донкихотские тесты](https://github.com/vast/test-smells/blob/master/smells/insufficient/quixotic.js)

### Непонятные тесты

* [Тянуть резину](https://github.com/vast/test-smells/blob/master/smells/unclear/bury-the-lede.js)
* [Пересушенные тесты](https://github.com/vast/test-smells/blob/master/smells/unclear/chafing.js)
* [Сложные проверки](https://github.com/vast/test-smells/blob/master/smells/unclear/complex-assertions.js)
* [Генерирующие тесты](https://github.com/vast/test-smells/blob/master/smells/unclear/generative.js)
* [Нерешительные тесты](https://github.com/vast/test-smells/blob/master/smells/unclear/indecisive.js)
* [Длинные тесты](https://github.com/vast/test-smells/blob/master/smells/unclear/long.js)
* [Тесты по касательной](https://github.com/vast/test-smells/blob/master/smells/unclear/tangential.js)

### Ненужные тесты

* [Семислойное тестирование](https://github.com/vast/test-smells/blob/master/smells/unnecessary/7-layer-testing.js) (скоро)
* [Параноидальные тесты](https://github.com/vast/test-smells/blob/master/smells/unnecessary/paranoid.js) (скоро)
* [Предварительные проверки](https://github.com/vast/test-smells/blob/master/smells/unnecessary/premature-assertions.js)
* [Тестовые данные с большим самомнением](https://github.com/vast/test-smells/blob/master/smells/unnecessary/self-important-test-data.js) (скоро)
* [Тест по номеру](https://github.com/vast/test-smells/blob/master/smells/unnecessary/test-by-number.js) (скоро)

### Нереалистичные тесты

* [Загрязненный испытуемый](https://github.com/vast/test-smells/blob/master/smells/unrealistic/contaminated-test-subject.js)
* [Фантастические тесты](https://github.com/vast/test-smells/blob/master/smells/unrealistic/fantasy.js) (скоро)
* [Вторжение в частную жизнь](https://github.com/vast/test-smells/blob/master/smells/unrealistic/invasion-of-privacy.js) (скоро)
* [Моки без границ](https://github.com/vast/test-smells/blob/master/smells/unrealistic/mockers-without-borders.js) (скоро)
* [Нереальные тесты](https://github.com/vast/test-smells/blob/master/smells/unrealistic/surreal.js)
* [Рентгеновские тесты](https://github.com/vast/test-smells/blob/master/smells/unrealistic/x-ray-specs.js) (скоро)

### Ненадежные тесты

* [Самонаводящиеся тесты](https://github.com/vast/test-smells/blob/master/smells/unreliable/fire-and-forget.js)
* [Мусорные ошибки](https://github.com/vast/test-smells/blob/master/smells/unreliable/litter-bugs.js)
* [Жонглирование тарелками](https://github.com/vast/test-smells/blob/master/smells/unreliable/plate-spinning.js)
* [Временные бомбы](https://github.com/vast/test-smells/blob/master/smells/unreliable/time-bombs.js) (скоро)

В некоторых <nobr>анти-паттернах</nobr> нет описания и рекомендаций, но есть код,
по которому можно понять проблему. Если предпочитаете английский,
изучите [оригинальный репозиторий](https://github.com/testdouble/test-smells).

Теперь вы знаете, что почитать на выходных.
