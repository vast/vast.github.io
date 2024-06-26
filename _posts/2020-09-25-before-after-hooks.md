---
title: "RSpec: before и after хуки"
layout: default
---

Почему-то  сталкиваюсь с такими тестами:
```ruby
describe "#foo" do
  before :each do
    # ...
  end
end
```

`:each` можно смело опускать: это поведение по умолчанию для `before`. Лучше так:
```ruby
describe "#foo" do
  before do
    # ...
  end
end
```

И несколько интересных фактов о before и after хуках:
1. `before :each` и `before :all` — алиасы для `before :example` и `before :context`.

2. `before :each` выполняется перед каждым примером, `it do...end`. `after :each` — после.

3. `before :all` выполняется перед контекстом (`context`, `describe`). `after :all` — после.

4. В `before :suite` нельзя задавать переменные экземпляра (instance var, `@foo`)

5. Только в `before :each` можно мокать.
