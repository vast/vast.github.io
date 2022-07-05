---
title: before + after → around
layout: default
---

Часто встречаю в тестах такое:

```ruby
before do
  Timecop.freeze(Time.zone.local(2022, 4, 21))
end

after do
  Timecop.return
end
```

Или с ActiveSupport::Testing::TimeHelpers:

```ruby
before do
  travel_to(Time.zone.local(2022, 4, 21))
end

after do
  travel_back
end
```

Такие конструкции из before с «заморозкой» времени и after с возвратом лучше упрощать с помощью around:

```ruby
around do |example|
  Timecop.freeze(now) { example.run }
  # или
  travel_to(now) { example.run }
end
```
