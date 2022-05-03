---
layout: default
title: "А у нас Faker"
---

Пара ребят в комментариях к предыдущему посту ответили, что у них Faker, и думать о фейковых данных в тестах не нужно. На мой взгляд, Faker в тестах — это антипаттерн.

Во-первых, с Faker тесты становятся недетерминированными: запустил — упали, еще раз запустил — прошли. И вся отладка этого ада ложится на разработчиков.

Во-вторых, рандомные данные замедляют тесты. Отдельный ад — Faker в фабриках: я работал с проектом, в котором переход с Faker на `sequence {}` в фабрике ускорил тесты на 12%. 

В-третьих, чрезмерное увлечение Faker приводит к дублированию тестируемого кода. Взгляните, например, на тест метода, который возвращает инициалы пользователя:

```ruby
it "returns initials"
  user = described_class.new(name: Faker::Name.name)
  expected = user.name
    .upcase
    .split(" ")
    .map { |part| part[0] }
    .join("")

  expect(user.initials).to eq(expected)
end
```

Это непонятный и неподдерживаемый тест: если код помяется, изменения придется дублировать и в тесте. Лучше было бы написать так:

```ruby
it "returns initials"
  user = described_class.new(name: "Daniel Craig Jones")

  expect(user.initials).to eq("DCJ")
end
```

Я, конечно, ни на что не намекаю, но советую присмотреться к Faker: точно ли он вам нужен?


Еще по теме:
* [Stop using Faker and random data in the test fixtures](https://jtway.co/stop-using-faker-and-random-data-in-the-test-fixtures-67332269a64e)
* [FactoryGirl Tips and Tricks](https://arjanvandergaag.nl/blog/factory_girl_tips.html)
* [You Shouldn’t Use Faker (or other test randomization libraries)](https://kevin.burke.dev/kevin/faker-js-problems/)
