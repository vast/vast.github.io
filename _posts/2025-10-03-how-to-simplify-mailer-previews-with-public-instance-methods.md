---
title: "Как упростить превьюшки мейлеров с помощью #public_instance_methods"
layout: default
---

Представим, что у нас есть тупейший мейлер с пачкой методов:
```ruby
class OnboardingMailer < ApplicationMailer
  default to: -> { @user.email },
    from: "marketing@foo.bar"

  before_action :load_user

  def welcome; end
  def onboarding; end
  def intro; end
  def survey; end
  def goodbye; end

  private

  def load_user
    @user = params[:user]
  end
end
```

Раньше я тупо перечислял и делегировал каждый метод в мейлер в превьюшке:
```ruby
class EventsMailerPreview < ActionMailer::Preview
  delegate :welcome, :onboarding,
    :intro, :survey,
    :goodbye, to: :mailer

  private

  def mailer
    OnboardingMailer.with(user: User.first)
  end
end
```

Получается не очень круто. Если появляются новые письма, приходятся дополнять список методов в превьюшке. Чтобы избавиться от этого гемороя, лучше использовать `public_instance_methods(false)`:
```ruby
class EventsMailerPreview < ActionMailer::Preview
  available_emails = OnboardingMailer.public_instance_methods(false)
  delegate(*available_emails, to: :mailer)

  private

  def mailer
    OnboardingMailer.with(user: User.first)
  end
end
```

`public_instance_methods` возвращает имена всех публичных и протектед методов класса, а `false` просит вернуть только те, что определены в самом классе, игнорируя родителей.
