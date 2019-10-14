---
title: "Какой тест упадет, если удалим этот кусок кода?"
layout: default
---

Смотрите, есть такой будильник:

```ruby
class Alarm
  def to_human
    at.strftime("%k:%M").strip
  end
end
```

И такой тест:

```ruby
it "returns alarm in human-readable 24-hour format" do
  time = Time.local(2019, 7, 7, 10, 35)
  alarm = described_class.new(at: time)

  expect(alarm.to_human).to eq "10:35"
end
```

Чтобы понять, достаточно ли этих тестов, я смотрю тестируемый модуль и спрашиваю себя: что тут особенного, если этот кусок кода удалить, какой тест упадет? Если никакой, то у меня 100% не хватает тестов или проверок.

В примере с будильником под вопросом `.strip`. Если удалить его, тест останется зеленым. Значит, не хватает теста:

```ruby
it "strips any leading spaces" do
  time = Time.local(2019, 7, 7, 7, 15)
  alarm = described_class.new(at: time)

  expect(alarm.to_human).to eq "7:15"
end
```
