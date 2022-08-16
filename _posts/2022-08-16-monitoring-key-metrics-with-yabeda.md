---
title: "Мониторинг ключевых метрик приложения на Рельсах в Графане"
layout: default
---

<img class="outstanding" src="/assets/yabeda.jpg" width="1280" height="456" />

Иногда у приложения есть какие-то ключевые метрики, которые могут триггерить алерты, ахтунги и жопы. Например, в условном биллинге это может быть процент неудачных списаний за последний час. Если он высокий, скажем, более 75%, пора заводить инцидент и вызванивать инженеров. Самый толковый способ мониторить такое в приложениях на Рельсах — экспорт ключевой метрики в Графану через Прометеус и [Ябеду](https://evilmartians.com/chronicles/meet-yabeda-modular-framework-for-instrumenting-ruby-applications).

Вот как-то так:
```ruby
require "yabeda"

Yabeda.configure do
  # Где мы
  group :billing

  # Что мы экспортируем
  gauge :failed_charges_percentage, tags: [], comment: "The percent of failed charges in last hour"

  # Как собираем данные
  collect do
    failed_charges_percentage.set({}, ChargeMetrics.failed_charges_percentage)
  end
end
```
