---
title: Как тестировать коллбэки ActiveRecord моделей
layout: default
---

Иногда непонятно, с какой стороны подойти к сложному коллбэку и как его протестировать. Например, в ситуации с постом:

```ruby
class Post < ApplicationRecord
  before_save :set_permalink
  after_save :rebuild_preview

  private

  def set_permalink
    self.permalink ||= build_permalink
  end

  def build_permalink
    date.strftime("%Y/%-m/") + title.parameterize("-")
  end

  def rebuild_preview
    Preview.new(self).rebuild
  end
end
```

Если захотелось протестировать их отдельно, с помощью `send`, не надо так. Это приватные методы, в любой момент они поменяются или исчезнут.

Тестируйте публичный интерфейс, использующий эти приватные методы. Если коллбэк на `after_save`/`before_save`, тестируйте `save`, если на `after_initialize`/`before_initialize` — `new`.

В случае с постом спека выглядела бы так:

```ruby
describe "#save"
  context "when permalink is NOT set" do
    it "generates it from year, month and title" do
      post = Post.create(
        date: new Date(2016, 07, 07),
        title: "Hello, its me")

      expect(post.permalink).to eq "2016/7/hello-its-me"
    end
  end

  context "when permalink is set" do
    it "preserves it" do
      post = Post.new(
        title: "Some title",
        permalink: "some-special-post")

      expect { post.save }.not_to change { post.permalink }
    end
  end

  it "rebuilds preview" do
    preview = instance_double(Preview, rebuild: true)
    post = Post.new(title: "Some title")
    allow(Preview).to receive(:new).and_return(preview)

    post.save

    expect(preview).to have_received(:rebuild)
  end
end
```

Вот и все дела.
