---
title: "<s>Value</s> Data-объекты в Руби"
layout: default
---

Я как-то пропустил, а в Руби 3.2 завезли класс Data для создания value objects:
```ruby
Recipient = Data.define(:name, :email, :role)

vasyan = Recipient.new(name: "Vasyan", email: "vasyan@stark.com", role: :cc)

vasyan.email # vasyan@stark.com
vasyan.role # :cc

# При этом
vasyan.email = "foo" # undefined method 'email='
```

Пример посложнее с кастомными методами:
```ruby
Measure = Data.define(:amount, :unit) do
  def <=>(other)
    return unless other.is_a?(self.class) && other.unit == unit
    amount <=> other.amount
  end

  include Comparable
end

Measure[3, 'm'] < Measure[5, 'm'] #=> true
Measure[3, 'm'] < Measure[5, 'kg'] # ArgumentError
```

Отличается от Struct двумя ключевыми моментами. Во-первых, Data не генерирует сеттеры (attr\_writer) для атрибутов. Во-вторых, Data не включает Enumerable, поэтому в нем нет each, each\_pair, filter и прочих. Короче, Data — это идеальный вариант для минималистичных неизменяемых value objects.
