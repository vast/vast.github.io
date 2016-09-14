---
title: Гигиена в тестах
layout: default
---

Бывает, вижу вот такое:

```ruby
describe "callbacks" do
  describe "before validation" do
    let(:blog) {create(:blog) }
    context "when slug is not set" do
      it "generates it" do
        item = Post.new(blog: blog)
        item.validate
        expect(item.slug).not_to be_nil
      end
    end
    context "when slug is set" do
      it "does not change it" do
        item = Post.new({blog: blog })
        item.slug = 'in the darkness'
        item.validate
        expect(item.slug).to eq 'in the darkness'
      end
    end
  end
end
```

Читать такую простыню не хочется. А странности в форматировании заставляют глаз спотыкаться.

Чтобы тест было в сто раз проще читать, придерживайтесь базовых правил гигиены в тестах: разделяйте фазы и пишите в одном стиле.

## Разделяйте фазы

Тест состоит из трех фаз: подготовка, испытание и проверка. Отбивайте их друг от друга пустой строкой. Так же отбивайте context/describe/it блоки:

```ruby
describe "callbacks" do
  describe "before validation" do
    let(:blog) {create(:blog) }

    context "when slug is not set" do
      it "generates it" do
        item = Post.new(blog: blog)

        item.validate

        expect(item.slug).not_to be_nil
      end
    end

    context "when slug is set" do
      it "does not change it" do
        item = Post.new({blog: blog })
        item.slug = 'in the darkness'

        item.validate

        expect(item.slug).to eq 'in the darkness'
      end
    end
  end
end
```

## Пишите в одном стиле

Чтобы писать единообразно и не вспоминать, какие кавычки надо использовать, накрутите [Rubocop](https://github.com/bbatsov/rubocop). Потом поставьте [Sublime-Linter](http://www.sublimelinter.com/en/latest/) и [SublimeLinter-rubocop](https://github.com/SublimeLinter/SublimeLinter-rubocop), чтобы видеть ошибки прям в редакторе:

<img src="/assets/sublime-linter-rubocop.png" alt="" width="1336" height="1086" />

Тесты станут читаться без запинки:

```ruby
describe "callbacks" do
  describe "before validation" do
    let(:blog) { create(:blog) }

    context "when slug is not set" do
      it "generates it" do
        item = Post.new(blog: blog)

        item.validate

        expect(item.slug).not_to be_nil
      end
    end

    context "when slug is set" do
      it "does not change it" do
        item = Post.new(blog: blog)
        item.slug = "in the darkness"

        item.validate

        expect(item.slug).to eq "in the darkness"
      end
    end
  end
end
```
