---
title: RuboCop, RSpec и стайлгад
layout: default
---

Годами стайлгайдом для RSpec был betterspecs.org. К сожалению, он годами не менялся, не развивался и частенько не работал.

Оказывается, 1,5 года назад Better Specs стал RSpec Style Guide и переехал в Rubocop HeadQuarters:  
<https://github.com/rubocop-hq/rspec-style-guide>

И стайлгайд ожил и расцвел:  
<https://rspec.rubystyle.guide>

И, конечно, есть плагин к Рубокопу для работы со спеками:  
<https://github.com/rubocop-hq/rubocop-rspec>

Подключается в два счета:
```ruby
# Gemfile
gem "rubocop-rspec", require: false

# .rubocop.yml
require:
  - ...
  - rubocop-rspec
```

Полный список копов:  
<https://docs.rubocop.org/rubocop-rspec/cops_rspec.html>
