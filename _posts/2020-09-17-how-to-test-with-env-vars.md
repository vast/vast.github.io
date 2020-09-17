---
title: Как застабить переменные окружения в RSpec
layout: default
---

Чтобы застабить в тесте переменную окружения, заглушите метод, с помощью которого код читает эту переменную:

```ruby
# Если в коде ENV["CHARGES_TOKEN"]
allow(ENV)
  .to receive(:[])
  .with("CHARGES_TOKEN")
  .and_return("XXX")

# Если в коде ENV.fetch("CHARGES_TOKEN")
allow(ENV)
  .to receive(:fetch)
  .with("CHARGES_TOKEN")
  .and_return("XXX")
```

Если вы сторонник готовых гемов, возьмите для этой цели
<a href="https://github.com/thoughtbot/climate_control">ClimateControl</a>:

```ruby
ClimateControl.modify CHARGES_TOKEN: "XXX" do
  # ...
end
```
