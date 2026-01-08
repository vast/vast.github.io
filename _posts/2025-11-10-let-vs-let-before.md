--- 
title: "let! vs. let + before"
layout: default
---

Последний Ruby Weekly принёс статью о том, что `let!` лучше заменять на `let` + `before` блок:  
<https://allaboutcoding.ghinda.com/rspec-and-let-understanding-the-potential-pitfalls>

Мол, такое:
```ruby
RSpec.describe Thing do   
 let(:account_a) { build(:user, email: email) }  
 let(:account_b) { build(:user, user: email2) }  
 let(:organisation) { build(:organisation, account: account) }  
 let(:team) { build(:team, account: organisation) }  

 before  
   account_a  
   account_b  
 end

 it 'returns that specific value that we want' do  
    # test 
 end  
end
```

Лучше, чем такое:
```ruby
RSpec.describe Thing do   
 let!(:account_a) { build(:user, email: email) }  
 let!(:account_b) { build(:user, user: email2) }  
 let(:organisation) { build(:organisation, account: account) }  
 let(:team) { build(:team, account: organisation) }  

 it 'returns that specific value that we want' do  
    # test 
 end  
end
```

Мне кажется, что это какая-то ерунда. Во-первых, все мы любим Руби за то, что код на нем, читается почти как книга. А тут у нас «сначала акаунт а и б». Это че вообще?

Во-вторых, зачем вообще использовать `let`, если ни в последующих `let`, ни в тестах, мы не обращаемся к этим переменным по имени? Если они реально нужны только для того, чтобы создать окружение (скажем, нужны два акаунта, пользователь создаёт третий), то лучше сразу создать их в `before` блоке:
```ruby
before do
  create(:account)
  create(:account)
end
```

В-третьих, на мой вкус, `let!` такой же заметный, как и `before`. А если хочется сделать позаметнее, сделай себе декоратор `LET!!!11111`.

В-четвертых, мне кажется, что стоит отделять зависимости тестируемого объекта и сетап окружения. Грубо говоря, в `let` зависимости (пользователь --> организация --> акаунт), а в `before` — действия, приводящие систему в нужное нам состояние. А размазывать их по `let` и `before` — странновато.
