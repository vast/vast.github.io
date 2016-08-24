---
title: Проблемы с subject
layout: default
---

`subject` — [хелпер в Rspec](https://github.com/rspec/rspec-core/blob/910eb7fb3184ea23a8cd8bd13b14ac84ca39664c/lib/rspec/core/memoized_helpers.rb#L57-L62) для однострочных тестов. Бывает неявным и явным.

```ruby
# Неявный subject
RSpec.describe User do
  # subject — User.new (described_class.new)
  it { is_expected.to validate_presence_of(:name) }

  # Такой тест разворачивается в:
  it "..." do
    expect(User.new).to validate_presence_of(:name)
  end
end

# Явный subject
RSpec.describe User do
  subject { described_class.new(role: "admin") }

  it { is_expected.to be_super_admin }
end
```

## В однострочниках
`subject` здорово сокращает тесты валидаций и ассоциаций в Рельсах с Shoulda Matchers:

```ruby
RSpec.describe ActivityLog do
  it { is_expected.to validate_presence_of(:user_name) }
  it { is_expected.to validate_presence_of(:event) }
  it { is_expected.to validate_presence_of(:ip) }

  it { is_expected.to belong_to(:user) }
end
```

Но излишняя любовь к однострочным тестам порождает чудовищ:

```ruby
RSpec.describe Alarm do
  describe "#snooze" do
    subject { described_class.new(at: time) }

    it { expect { subject.snooze }.to change { subject.at }.by(9.minutes)
  end
end
```

Такой тест тяжело читать, и он не отражает намерений автора. Чтобы понять, что `snooze` делает, придется прочитать и «скомпилировать» проверку в голове.

<div class="outstanding outstanding--therule">
  <code>it { expect(subject) }</code> — очень плохо
</div>

Чтобы исправить ситуацию, разверните тест и добавьте описание:

```ruby
# Ясно, что #snooze передвинет будильник на 9 минут вперед,
# без чтения проверки
it "pauses alarm for next 9 minutes" do
  expect {
    subject.snooze
  }.to change {
    subject.at
  }.by(9.minutes)
end
```
<div class="outstanding outstanding--therule">
  <code>subject</code> для проверок валидаций и ассоциаций в Рельсах — хорошо
</div>

## В начале спеки
Когда `subject` объявляют в начале спеки и используют в проверках, спека получает глобальную переменную и становится запутанной. Чтобы понять, что проверяет тест, приходится возвращаться в начало:

```ruby
RSpec.describe Post do
  let(:author) { build(:author, name: "Melanie C") }
  subject { build(:post, author: author, title: "Awesome News") }

  describe "#slug" do
    it "generates slug from title" do
      expect(subject.slug).to eq "awesome-news"
      # Чтобы понять, почему slug именно такой,
      # придется вернуться в начало спеки и увидеть
      # title у поста
    end
  end

  describe "#author_name" do
    subject { post.author_name }

    context "with author" do
      it { is_expected.to eq "Melanie C" }
      # Чтобы понять, откуда взялась Мелани Си,
      # придется вернуться в начало спеки (и в 90-е, конечно)
    end

    context "without author" do
      let(:author) { nil }

      it { is_expected.to eq "Annoymouse" }
      # Чтобы понять, почему здесь Annoymouse, что
      # и где меняет author = nil,
      # придется вернуться в начало спеки
      # и пройтись по всем describe/let/context
    end
  end
end
```

Проблема в тестах выше в том, что информация важная для восприятия проверки далеко от нее. Читатель превращается в Шерлока Холмса и тратит время впустую, расследуя, что скрывает `subject`.

<div class="outstanding outstanding--therule">
  Глобальный <code>subject</code> — плохо
</div>

Чтобы поправить это, перенесите настройку ближе к проверке и оставьте только значащую информацию:

```ruby
# Хорошо: информация нужная для восприятия проверки на месте
describe "#slug" do
  it "generates slug from title" do
    # Нам нет дела до автора, а вот title важен
    post = build(:post, title: "Awesome News")

    expect(post.slug).to eq "awesome-news"
  end
end
```

```ruby
# Так себе: информация стала ближе к проверке,
# но чтобы понять смысл проверки,
# придется ее «скомпилировать» в голове
describe "#author_name" do
  context "with author" do
    let(:author) { build(:author, name: "Melanie C") }
    let(:post) { build(:post, author: author) }

    subject { post.author_name }

    it { is_expected.to eq "Melanie C" }
  end
end
```

```ruby
# Лучше: информация стала ближе к проверке.
# Описание теста ясно дает понять, что проверяем
describe "#author_name" do
  context "with author" do
    let(:author) { build(:author, name: "Melanie C") }
    let(:post) { build(:post, author: author) }

    it "returns author's name" do
      expect(post.author_name).to eq "Melanie C"
    end
  end
end
```

```ruby
# Хорошо: информация нужная для восприятия проверки на месте
describe "#author_name" do
  context "with author" do
    it "returns author's name" do
      author = build(:author, name: "Melanie C")
      post = build(:post, author: author)

      expect(post.author_name).to eq "Melanie C"
    end
  end
end
```

<div class="outstanding outstanding--therule">
  Держать информацию нужную для понимания проверки рядом с ней — хорошо
</div>

--------------------------------

## Дополнительное чтение

* [Документация RSpec по subject](https://www.relishapp.com/rspec/rspec-core/v/3-5/docs/subject/implicitly-defined-subject);
* [Let's Not](https://robots.thoughtbot.com/lets-not);
* [Writing more readable RSpec tests](http://linduxed.com/blog/2014/08/24/writing-more-readable-rspec-tests/).
