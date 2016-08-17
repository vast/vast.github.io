---
title: "По хардкору: describe и context"
layout: default
---

`describe` и `context` объединяют связанные проверки и задают структуру теста.

Структура — каркас теста, отражающий его логику. Без структуры читать тест сложно: повествование скачет, внимание блуждает, поиск связанных проверок бесит.

Без структуры:

```ruby
it "#accessible_projects return all system projects when user is admin"
it "returns no projects when user is not admin"
it "returns user full name with email"
```

Со структурой:

```ruby
describe "#accessible_projects" do
  context "when user is admin" do
    it "returns all system projects"
  context "when user is NOT admin" do
    it "returns no projects"

describe "#user_name_with_email" do
  it "returns user full name with email in parens"
```

## Когда и что использовать
Я использую `describe` для сущностей (кто, что?), а `context` для состояний (когда, с чем, с какими условиями?). Так легче ориентироваться в возможных ситуациях и исследовать условия.

```ruby
# Так себе
context "associations"
context "#full_name"
describe "when user is admin"
describe "with valid params"

# Хорошо
describe "associations"
describe "#full_name"
context "when user is admin"
context "with invalid params"
```

Контексты начинаю со слов when, if, with, given. Если вижу их в описании проверки — вытаскиваю:

```ruby
# Плохо: условие, описание ситуации
# (user is editor) тяжело заметить
it "returns only published posts when user is not editor"
it "returns published and draft posts when user is editor"

# Хорошо: ситуация явно обозначена контекстом
context "when user is editor" do
  it "returns published and draft posts"

context "when user is NOT editor" do
  it "returns only published posts"
```

Вложенные контексты начинаю с and, чтобы было понятно, что это не все условие:

```ruby
context "when user is editor" do
  context "and post is published" do
    it "displays post views/visitors count"
```

## Шпаргалка

<div class="outstanding outstanding--therule">
  <code>describe</code> &lt;something&gt;<br />
  <code>context</code> &lt;when... / if... / with... / given...&gt;
</div>

---------------

Внимательный читатель со звездочкой залезет в исходники RSpec, чтобы убедиться, что [`describe` и `context` отличаются только по смыслу](https://github.com/rspec/rspec-core/blob/b54e2a161b7de5e6cfdcfde9abce2ea3cec10b82/lib/rspec/core/example_group.rb#L269-L277).
