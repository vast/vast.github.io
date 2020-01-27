---
title: "Не тестируйте attr_reader/_writer/_accessor"
layout: default
---

Регулярно встречаю тесты, в которых проверяют attr_reader:

```ruby
class Alarm
  attr_reader :at

  def initialize(at: )
    @at = at
  end

  def snooze
    # ...
  end
end

RSpec.describe Alarm do
  describe "#at" do
    it "returns alarm time" do
      time = Time.now
      alarm = described_class.new(at: time)

      expect(alarm.at).to eq time
    end
  end
end
```

Это, конечно, бесполезно. Во-первых, так мы тестируем стандартную библиотеку — штуку, у которой уже есть собственные тесты. Зачем ей еще тесты?

Во-вторых, в таких тестах нет пользы, они проверяют тривиальное поведение.

В-третьих, геттер (Alarm#at) мы косвенно проверим в других тестах:

```ruby
describe "#snooze" do
  it "snoozes alarm for nine minutes" do
    # ...

    expect { alarm.snooze }.to change { alarm.at }.by(9.minutes)
  end
end
```

P. S. ПРОТИП: если attr_reader нужен только самому объекту, его лучше сделать приватным:
```ruby
private

attr_reader :repeat
```
