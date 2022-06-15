---
title: "RSpec & Rails: как проверить deliver_later(wait_until: ...)"
layout: default
---

Ситуация: клиенты регистрируются, а через три дня получают письмо с онбордингом. Скажем, таким кодом:

```ruby
after_action :send_onboarding_email, only: :create

def send_onboarding_email
  ClientsMailer
    .with(recipient: user)
    .onboarding_email
    .deliver_later(wait_until: 3.days.from_now)
end
```


Чтобы убедиться, что письмо уйдет точно через три дня, есть два способа:

1\. Цепочка из моков-стабов:
```ruby
mailer = instance_double(ClientsMailer)
email = double(:onboarding_email, deliver_later: true)

allow(ClientsMailer)
  .to receive(:with).with(recipient: user)
  .and_return(email)

# ...

expect(email)
  .to have_received(:deliver_later)
  .with(wait_until: 3.days.from_now)
```


2\. [Встроенный матчер](https://relishapp.com/rspec/rspec-rails/docs/matchers/have-enqueued-job-matcher) и тестовый адаптер для ActiveJob из rspec-rails:
```ruby
# Это, конечно, лучше спрятать в хелперы
def with_test_active_job_adapter
  last_adapter = ActiveJob::Base.queue_adapter
  ActiveJob::Base.queue_adapter = :test

  yield

  ActiveJob::Base.queue_adapter = last_adapter
end

around do |example|
  with_test_active_job_adapter { example.run }
end

it "schedules onboarding email in 3 days from now" do
  expect { ... }
    .to have_enqueued_job(ActionMailer::MailDeliveryJob)
    .with("ClientsMailer", "onboarding_email", "deliver_now")
    .at(3.days.from_now)
end
```

P. S. Использовать `3.days.from_now` без Таймкопа опасно: могут быть ложноотрицательные тесты.
