---
title: "По хардкору: дублеры, моки, стабы"
layout: default
---

Сегодня о тестах. Пост для тех, кто знаком с RSpec, но не понимает, что такое «мокать» и «застабить». Коротко, по делу и с примерами.

## Дублер (test double)

Объект-каскадер, подменяющий реальный объект системы во время тестов:

```ruby
describe NotificationsController do
  # NotificationsController загружает последние уведомления
  # со стороннего сервиса по HTTP
  # с помощью NotificationsDatasource.
  let(:datasource) do
    double(:datasource, as_json: { notifications: [] })
  end

  before do
    # Подменяем реальный NotificationsDatasource дублером,
    # чтобы не зависеть от внешнего сервиса в тестах:
    allow(NotificationsDatasource)
      .to receive(:new)
      .and_return(datasource)
  end

  describe "#index" do
    it "wraps notifications in 'data' key" do
      get :index, format: :json

      expect(json_response["data"].keys).to have_key "notifications"
    end
  end
end
```

## Стаб (stub)

Заглушка для метода или объекта, возвращающая заданное значение:

```ruby
context "when attachment file is too large to email" do
  let(:max_file_size) { Attachment::MAX_FILE_SIZE }

  before do
    allow(attachment)
      .to receive(:file_size)
      .and_return(large_file_warning_size + 1)
  end

  it "raises large file size error" do
    # ...
  end
end
```

Внимательный читатель со звездочкой уже заметил, что и в предыдущем примере с `NotificationsController` был стаб. Все верно: стаб — это дублер с зашитыми ответами.

## Мок (mock)

Стаб с ожиданиями, которые RSpec проверит в конце теста:

```ruby
context "when cloning process cannot be performed" do
  before do
    allow(doctor).to receive(:clone) { raise "can't clone" } # стаб
  end

  it "notifies airbrake" do
    expect(Airbrake).to receive(:notify) # мок
    # Rspec застабит `Airbrake.notify`
    # и в конце этого `it do...end` блока
    # проверит, был ли он вызван.
    # Если вызова не было — ошибка и красный тест.

    clone_this_poor_dolly
  end
end
```

Моки меняют порядок фаз в тесте. Вместо «Настройка — Испытание — Проверка» получается «Проверка+Настройка — Испытание». Если вам как и мне тяжело такое читать, используйте стаб с проверкой:

```ruby
# мок
it "notifies airbrake" do
  expect(Airbrake).to receive(:notify) # проверка + настройка

  do_clone # испытание
end

# стаб + проверка
it "notifies airbrake" do
  allow(Airbrake).to receive(:notify) # настройка

  do_clone # испытание

  expect(Airbrake).to have_received(:notify) # проверка
end
```

Дублеры, моки и стабы привязывают наши тесты к интерфейсу используемого объекта, а реальные объекты — к их реализации. Чтобы узнать об этой дилемме больше и понять, стоит ли вам мокать-стабить все подряд, почитайте:

* [Mocks Aren't Stubs](http://martinfowler.com/articles/mocksArentStubs.html);
* [Thoughts on Mocking, Part 2](https://www.practicingruby.com/articles/thoughts-on-mocking-2);
* [Thoughts on Mocking](http://myronmars.to/n/dev-blog/2012/06/thoughts-on-mocking).

