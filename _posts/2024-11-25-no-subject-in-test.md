---
title: "Не используйте subject для испытаний"
layout: default
---

Бывает, вижу в проектах именованные сабжекты в качестве хелперов для испытаний:
```ruby
subject(:process) { described_class.new.process }


before do
  allow(EventProducer).to receive(:emit).and_return(true)
end

context "when run twice" do
  it "emits only one event" do
    process
    process

    expect(EventProducer).to have_received(:emit).once
  end
end
```

Это плохой, ложноположительный тест. Что бы мы не написали внутри process, EventProducer.emit всегда будет вызываться точно один раз.

Проблема в хелпере subject. Как и let, он кеширующий, мемоизирующий. После первого вызова он запоминает результат блока и в последующие вызовы сразу возвращает результат, не тригеря код в блоке.

Это легко проверить мини-тестом:
```ruby
class EventProducer
  def self.emit
  end
end

describe "subject(:process)" do
  subject(:process) { EventProducer.emit("foo") }

  before { allow(EventProducer).to receive(:emit) }

  context "when run twice" do
    it "emits both events" do
      process
      process

      expect(EventProducer).to have_received(:emit).twice
    end
  end
end
```

Результат:
```ruby
Failures:

  1) subject(:process) when run twice emits both events
     Failure/Error: expect(EventProducer).to have_received(:emit).twice

       (EventProducer (class)).emit(*(any args))
           expected: 2 times with any arguments
           received: 1 time with any arguments
     # ./spec.rb:17:in `block (3 levels) in <top (required)>'
```

Пожалуйста, не используйте именованные сабжекты для испытаний. Лучше сделайте старый добрый метод:
```ruby
def process
  described_class.new.process
end
```
