---
title: Один тест — одна логическая проверка
layout: default
---

Проверка — фаза теста, в которой мы сверяем результат испытаний с правильным:
```ruby
expect(post.slug).not_to be_nil
expect(account.admins).to match_array(admins)
expect(comment_notification).to have_received(:deliver)
expect { post.destroy }.to change(Post, :count).by(-1)
```

Тест, в котором много проверок, тяжело читать и поддерживать: чтобы найти упавшую проверку придется искать номер строки и читать соседние. Поэтому и советуют использовать одну проверку на тест.

Но бывают ситуации, в которых одна логическая проверка выражается несколькими физическими. Например, чтобы проверить, что цвет в RGB — это синий, проверяем красную, зеленую и синюю компоненту цвета:

```ruby
describe "#color" do
  it "is blue" do
    expect(color.R).to be < 0.2
    expect(color.G).to be < 0.2
    expect(color.B).to be > 0.8
  end
end
```

В таких случаях лучше объединить проверки в одну с помощью `have_attributes`:
```ruby
describe "#color" do
  it "is blue" do
    expect(color).to have_attributes(
      R: (a_value < 0.2),
      G: (a_value < 0.2),
      B: (a_value < 0.8),
    )
  end
end
```

А если проверить нужно несколько связанных сайд-эффектов, лучше объединить их с помощью `and`:
```ruby
it "activates subscription" do
  expect { subscription.activate! }
    .to change { subscription.reload.active? }.to(true)
    .and change { subscription.reload.valid_until }.to(1.month.from_now)
end
```
