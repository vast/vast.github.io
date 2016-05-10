---
title: "Дезодоранты и полезные комментарии"
layout: default
---

Программисты оставляют комментарии-дезодоранты, когда понимают, что написали запутанный и непонятный код. Такие комментарии маскируют запах от кода, который можно и нужно улучшить.

Смотрите:

```ruby
def archive
  # unlock and destroy everything in project
  discussions.each(&:unlock!)
  todos.each(&:unlock!)
  discussions.destroy_all
  todos.destroy_all

  # assign read-only role to users
  users.each do |user|
    user.update_attribute(role: "client")
  end

  self.status = 38 # set status to archived
end
```

Чтобы сделать код понятнее, вытащите константу и несколько методов с вразумительными именами:

```ruby
def archive
  clean_up_before_archiving
  reset_user_roles_to_read_only

  self.status = ARCHIVED
end


def clean_up_before_archiving
  discussions.each(&:unlock!)
  todos.each(&:unlock!)

  discussions.destroy_all
  todos.destroy_all
end

def reset_user_roles_to_read_only
  users.each(&:reset_role)
end
```

БА ДУМ ТСС! Отсюда правило:

<div class="outstanding outstanding--therule">
Если код не понять без комментария, рефактори
</div>

## Полезные комментарии

Комментарии, объясняющие _почему_ код написан именно так, помогают узнать предысторию и изначальные намерения разработчика. Чаще всего это многострочные, развернутые заметки с ссылками на дополнительную информацию. Например, когда мы манки-патчим библиотеку:

```ruby
# Monkey patching Paperclip to disable built-in spoofing protection
# which gives many false-positive errors and prevents uploading of
# .xlsx, .caf, .msg files.
#
# For more details see:
#
# * http://robots.thoughtbot.com/prevent-spoofing-with-paperclip
# * https://github.com/thoughtbot/paperclip/issues/1456
# * https://github.com/thoughtbot/paperclip/issues/1530

module Paperclip
  class MediaTypeSpoofDetector
    def spoofed?
      false
    end
  end
end
```

Или объясняем, для чего здесь этот хак:

```scss
.is-visible & {
  // Adding transparent outline fixes jagged edges in Firefox.
  //
  // See: http://stackoverflow.com/a/9333891
  outline: 1px solid rgba(255, 255, 255, 0);
}
```

<p>
Наверняка бывают и другие типы полезных комментариев. Если вы их встречали, <nobr>покажите-расскажите</nobr>: <a href="mailto:vasily@polovnyov.ru">vasily@polovnyov.ru</a>.
</p>

## \#\#\#

Чтобы этот пост активнее шарили в Фейсбуке, прикладываю <nobr>картинку-правило</nobr>, заряженную на рефакторинг и быстрые тесты:

<img src="/assets/stas-refactor.jpg" class="img--break" width="1080" height="538" />
