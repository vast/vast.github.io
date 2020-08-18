---
title: Как протестировать конфиг whenever
layout: default
---

Недавно я опечатался в конфиге whenever:
```ruby
every 1.day, at: "03:30 am", roles: %i(backupable) do
  rake %(
    backup:db
    backup:assets
  ).join(" ")
end
```

При деплое whenever взорвался:
```
NoMethodError: undefined method `join' for "backup:db backup:assets":String
```

Чтобы в будущем такого не было, нужна хотя бы минимальная валидация конфига whenever. Решение оказалось простым: достаточно запустить на CI:
```shell
bundle exec whenever
```

Если в конфиге есть проблемы, он взорвется ошибкой. Если проблем нет, выведет на экран получающийся кронтаб.
