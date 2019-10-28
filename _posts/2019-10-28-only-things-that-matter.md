---
title: "Только то, что влияет на проверку"
layout: default
---

Смотрите:
```ruby
it "builds tag slug from its title" do
  tag = Tag.new(name: "Веб-разработка", color: "#ccc")

  expect(tag.slug).to eq "veb-razrabotka"
end
```

Зачем тут color? На что он влияет? Как связан со slug и name? Чтобы ответить на все эти вопросы, придется покопаться в коде.


Бывает обратная ситуация:
```ruby
it "builds tag slug from its title" do
  tag = build(:tag)

  expect(tag.slug).to eq "veb-razrabotka"
end
```

Почему veb-razrabotka? Откуда? От чего зависит? Чтобы ответить на эти вопросы, придется покапаться в фабриках.


Отсюда правило: в тесте должны быть данные, которые непосредственно влияют на проверку. Все остальное — под нож.
