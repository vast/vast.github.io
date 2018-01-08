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

* [Невидимые проверки](https://github.com/vast/test-smells/blob/old/smells/insufficient/invisible-assertions.js)
* [Пропущенные проверки](https://github.com/vast/test-smells/blob/old/smells/insufficient/missing-assertions.js)
* [Донкихотские тесты](https://github.com/vast/test-smells/blob/old/smells/insufficient/quixotic.js)

### Непонятные тесты

* [Тянуть резину](https://github.com/vast/test-smells/blob/old/smells/unclear/bury-the-lede.js)
* [Пересушенные тесты](https://github.com/vast/test-smells/blob/old/smells/unclear/chafing.js)
* [Сложные проверки](https://github.com/vast/test-smells/blob/old/smells/unclear/complex-assertions.js)
* [Генерирующие тесты](https://github.com/vast/test-smells/blob/old/smells/unclear/generative.js)
* [Нерешительные тесты](https://github.com/vast/test-smells/blob/old/smells/unclear/indecisive.js)
* [Длинные тесты](https://github.com/vast/test-smells/blob/old/smells/unclear/long.js)
* [Тесты по касательной](https://github.com/vast/test-smells/blob/old/smells/unclear/tangential.js)

### Ненужные тесты

* [Семислойное тестирование](https://github.com/vast/test-smells/blob/old/smells/unnecessary/7-layer-testing.js) (скоро)
* [Параноидальные тесты](https://github.com/vast/test-smells/blob/old/smells/unnecessary/paranoid.js) (скоро)
* [Предварительные проверки](https://github.com/vast/test-smells/blob/old/smells/unnecessary/premature-assertions.js)
* [Тестовые данные с большим самомнением](https://github.com/vast/test-smells/blob/old/smells/unnecessary/self-important-test-data.js)
* [Тестирование (раскраска) по номерам](https://github.com/vast/test-smells/blob/old/smells/unnecessary/test-by-number.js)

### Нереалистичные тесты

* [Загрязненный испытуемый](https://github.com/vast/test-smells/blob/old/smells/unrealistic/contaminated-test-subject.js)
* [Фантастические тесты](https://github.com/vast/test-smells/blob/old/smells/unrealistic/fantasy.js) (скоро)
* [Вторжение в частную жизнь](https://github.com/vast/test-smells/blob/old/smells/unrealistic/invasion-of-privacy.js)
* [Моки без границ](https://github.com/vast/test-smells/blob/old/smells/unrealistic/mockers-without-borders.js)
* [Нереальные тесты](https://github.com/vast/test-smells/blob/old/smells/unrealistic/surreal.js)
* [Рентгеновские тесты](https://github.com/vast/test-smells/blob/old/smells/unrealistic/x-ray-specs.js)

### Ненадежные тесты

* [Самонаводящиеся тесты](https://github.com/vast/test-smells/blob/old/smells/unreliable/fire-and-forget.js)
* [Мусорные ошибки](https://github.com/vast/test-smells/blob/old/smells/unreliable/litter-bugs.js)
* [Жонглирование тарелками](https://github.com/vast/test-smells/blob/old/smells/unreliable/plate-spinning.js)
* [Временные бомбы](https://github.com/vast/test-smells/blob/old/smells/unreliable/time-bombs.js) (скоро)

В некоторых <nobr>анти-паттернах</nobr> нет описания и рекомендаций, но есть код,
по которому можно понять проблему. Если предпочитаете английский,
изучите [оригинальный репозиторий](https://github.com/testdouble/test-smells).

Теперь вы знаете, что почитать на выходных.
