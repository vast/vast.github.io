---
title: Что не нужно писать в it
layout: default
---

1\. Бесполезные, общие слова, не несущие никакой конкретики:
```ruby
it "adds certain value"
it "returns correct result"
it "fails"
it "returns formatted string"
it "returns correct url"
it "is ok"
```

2\. Детали реализации:
```ruby
it "changes @scheduled_on"
it "assigns @todos"
```

3\. Ложь:
```ruby
it "returns time in 24-hour format" do
  expect(...).to eq "9:25"
end

it "strips leading zeroes" do
  expect(foo(" 9:25 ")).to eq "9:25"
end
```


И, пожалуйста, не тестируйте конструкторы и attr_reader/writer/accessor: вы все равно их проверите, тестируя публичный АПИ.
