---
title: Сервисы головного мозга
layout: default
---

В понедельник встретил в коде такое:
```ruby
# app/services/user_initials_extractor.rb
class UserInitialsExtractor
  def self.call(name)
    name
      .upcase
      .squeeze
      .split(" ")
      .map { |part| part[0] }
      .join(". ")
      .concat(".")
  end
end

# app/views/shared/_header.html.erb
<%= UserInitialsExtractor.call(current_user.name) %>
```

И меня тригернуло: это процедурное программирование, которое выдает себя за ООП, используя классы-помойки. Объекты — это живые организмы, которые обмениваются друг с другом сообщениями. `UserInitialsExtractor` — тупая процедура, завернутая в класс-сервис с убогим АПИ (`#call`, серьезно?).

Гораздо лучше было бы подумать, какой объект (существующий или новый) должен отвечать на `#initials`? Это мог бы быть `User`, декоратор для него или вообще отдельный объект, представляющий собой `Имя`:
```ruby
class User
  # ...
  delegate :initials, to: :name
end

class UserName
  # ...
  def initials
  end
end
```

Чтобы не заниматься таким, советую прочитать:
<https://www.yegor256.com/2015/03/09/objects-end-with-er.html>
