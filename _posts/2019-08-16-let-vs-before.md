---
title: let и before
layout: default
---

Бывает, встречаешь такое:
```ruby
describe ".active" do
  let!(:active_accounts) { create_list(:active_account, 2) }
  before { create_list(:pending_account, 3) }

  it "returns only active accounts" do
    expect(described_class.active).to match_array(active_accounts)
  end
end
```


Сразу хочется спросить, почему часть зависимостей мы создаем в let, а часть — в before? Что за зависимости в before? Что здесь скрыто? Чаще всего ответ такой: мы не обращаемся к неактивным акаунтам в тесте, значит, и переменная не нужна — захерачим их в before.

Чтобы не ломать голову, лучше быть последовательным: использовать let для создания и указания зависимостей, а before — для приведения системы в нужное состояние:
```ruby
describe ".active" do
  let!(:active_accounts) { create_list(:active_account, 2) }
  let!(:pending_accounts) { create_list(:pending_account, 3) }

  it "returns only active accounts" do
    expect(described_class.active).to match_array(active_accounts)
  end
end
```
