---
title: "Не проверяйте отдельно ключи"
layout: default
---

Бывает, встречаю в спеках три отдельных теста на то, что полученный хэш в порядке: есть ключи, есть значения, у значений правильный тип. 

```ruby
RSpec.describe UserSerializer do
  describe "#as_json" do
    let(:user) do
      build(:user,
        first_name: "Bart",
        last_name: "Simpson",
        tel: "+777123")
    end
    let(:json) { described_class.new(user).as_json }

    it "has keys" do
      expect(json).to include(:first_name, :last_name, :tel)
    end

    it "has types" do
      expect(json[:first_name]).to be_kind_of(String)
      expect(json[:last_name]).to be_kind_of(String)
      expect(json[:tel]).to be_kind_of(String)
    end

    it "has values" do
      expect(json[:first_name]).to eq(user.first_name)
      expect(json[:last_name]).to eq(user.last_name)
      expect(json[:tel]).to eq(user.tel)
    end
  end
end
```

Такая спека скорее вредит, чем помогает: при изменении полей придется обновлять три теста; тяжело сразу понять, что именно возвращает сериалайзер. Лучше использовать лаконичный вариант:

```ruby
RSpec.describe UserSerializer do
  describe "#as_json" do
    it "includes first name, last name and tel" do
      user = build(:user,
        first_name: "Bart",
        last_name: "Simpson",
        tel: "+777123")
      json = described_class.new(user).as_json

      expect(json).to include(
        first_name: "Bart",
        last_name: "Simpson",
        tel: "+777123"
      )
    end
  end
end
```
