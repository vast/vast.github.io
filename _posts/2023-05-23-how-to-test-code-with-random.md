---
layout: default
title: "Как тестировать код, завязанный на рандом"
---

Скажем, есть у нас банерокрутилка, в которой банеры показываются с заданной вероятностью:

```ruby
class Banner
  attr_reader :probability

  def initialize(probability:)
    @probability = probability
  end

  def visible?
    probability > Kernel.rand
  end
end
```
Чтобы проверить visible?, можно провести достаточно большое количество испытаний и оценить получившийся процент появлений банера:

```ruby
banner = described_class.new(probability: 0.7)

# Проводим 1000 испытаний, результаты — в массив
trials = Array.new(1000) { banner.visible? }
# Сколько раз visible? вернул true
successful_trials = trials.select { |trial| trial }
# Какой процент
successful_trials_percentage = successful_trials.length.to_f / trials.length.to_f

# Проверяем получившийся процент
expect(successful_trials_percentage).to be_within(0.05).of(0.7)
```


Этот вариант кажется логичным и математичным. Но с ним есть проблемы: «мигания» и производительность. Тест будет иногда падать в зависимости от количества испытаний: чем меньше испытаний, тем чаще. Чтобы сделать тест стабильным, придётся увеличить количество испытаний и завернуть тест в rspec-retry.

С другой стороны, можно избавиться от рандома. Например, застабив Kernel#rand:

```ruby
allow(Kernel).to receive(:rand).and_return(0.25)

banner = described_class.new(probability: 0.7)

expect(banner).to be_visible
```

Или зафиксировав сид:
```ruby
# Осторожно, магия!
# rand с таким сидом первым числом возвращает 0.37
srand(42)

banner = described_class.new(probability: 0.7)

expect(banner).to be_visible
```


Ещё по теме:
* [Generating random numbers in Ruby](https://blog.appsignal.com/2018/07/31/generating-random-numbers-in-ruby.html)
* [rspec-retry](https://github.com/NoRedInk/rspec-retry)
