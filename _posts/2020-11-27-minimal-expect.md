---
title: "Только то, что важно для проверки"
layout: default
---

Ситуация: нужно убедиться, что мы списываем с пользователя правильную сумму, когда он воспользовался скидкой. Важный момент: у класса, отвечающего за это, увесистый АПИ с обязательными аргументами. Делаем первый подход:

```ruby
context "when coupon is applied" do
  it "charges user $500 dollars" do
    allow(Cashier).to receive(:charge)

    purchase.perform

    expect(Cashier).to have_received(:charge)
      .with(
        user: user,
        sum: 500,
        description: "Покупка абонемента",
        coupon: coupon
      )
  end
end
```


Если оставить тест как есть, он будет отвлекать деталями совершенно не важными для проверки: пользователь, описание списания, купон. Раз мы хотим убедиться, что изменилась сумма, то и проверять нужно только сумму:

```ruby
context "when coupon is applied" do
  it "charges user $500 dollars" do
    allow(Cashier).to receive(:charge)

    purchase.perform

    expect(Cashier).to have_received(:charge)
      .with(hash_including(sum: 500))
  end
end
```
