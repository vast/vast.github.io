---
title: "Когда использовать double, а не instance_double?"
layout: default
---

Напомню разницу: `instance_double` может уронить тест, если застабленные методы отсутствуют в указанном классе, `double` на все пофиг.

По моему опыту `double` нужен в двух случаях:  
1\. Вместо объекта, который пока не существует в системе. Нет класса, значит, `instance_double` не на что опереться.

2\. Вместо чего-то незначительного со стабильным АПИ. Например, для писем:

```ruby
allow(DeadlineMailer)
  .to receive(:last_deadline_warning)
  .and_return(double(:email, deliver_later: true))
```

