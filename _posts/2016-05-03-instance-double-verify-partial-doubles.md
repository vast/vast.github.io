---
title: "По хардкору: instance_double, verify_partial_doubles"
layout: default
---


В комментариях к [посту о дублерах, стабах и моках](/posts/double-mock-stub.html) [Макс Прокопьев](https://twitter.com/maxprokopiev) упомянул `instance_double`, секретную технику старших разработчиков. О ней и поговорим. Коротко, по делу и с&nbsp;примерами.

## Ситуация
Возьмем пример с `Notifications`:

```ruby
class Notifications
  def as_json
    # Загружаем и отдаем последние новости
    # и уведомления с серверов Юрия Лозы по ХТТП
  end
end

class NotificationsController
  def index
    # Оборачиваем уведомления в ключ 'data'
    render json: { data: notifications.as_json }
  end

  def notifications
    Notifications.new
  end
end
```

Чтобы не обращаться к серверам Лозы в тестах, используем дублера:

```ruby
describe "NotificationsController#index" do
  let(:notifications) do
    double(:datasource, as_json: { notifications: [] })
  end

  before do
    allow(Notifications)
      .to receive(:new)
      .and_return(notifications)
  end

  it "wraps notifications in 'data' key" do
    get :index, format: :json

    expect(json_response["data"].keys)
      .to have_key "notifications"
  end
end
```

Что произойдет, если мы переименуем `Notifications#as_json` в `Notifications#to_json`? Ничего. Мы останемся наедине с зеленым тестом, проверяющим бесполезного дублера.

<img class="img--break" src="/assets/cantbelieve-double.jpg" alt="" width="620" height="471" />

## `instance_double`
Чтобы не попадать в такую дебильную ситуацию, используйте `instance_double`:

```ruby
describe 'NotificationsController#index' do
  let(:notifications) do
    instance_double(Datasource, as_json: { notifications: [] })
  end

  # ...
end
```

Такой дублер проверит свой интерфейс. Если метода нет или у него другие аргументы — красный тест.

Чтобы так же проверять моки и стабы, убедитесь, что [`verify_partial_doubles`](https://www.relishapp.com/rspec/rspec-mocks/v/3-4/docs/verifying-doubles/partial-doubles) включен в `spec_helper.rb`.

-------------------------------------------

Внимательный читатель со звездочкой наверняка заметил, что одного `instance_double` мало. Все верно. В RSpec есть похожие дублеры для классов, модулей и объектов: [`object_double`](https://www.relishapp.com/rspec/rspec-mocks/docs/verifying-doubles/using-an-object-double) и [`class_double`](https://www.relishapp.com/rspec/rspec-mocks/v/3-4/docs/verifying-doubles/using-a-class-double).
