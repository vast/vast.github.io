---
title: Подростковое тестирование. Подборка
layout: default
---

Многие родители с волнением ждут подросткового возраста своих детей. Что больше пугает?
Ранний секс с болезнями передающимися половым путем, подростковая беременность, алкоголь, наркотики, уголовная ответственность.
Но труднее всего, когда ребенок пишет код без тестов. Скандалы, напряжение в семье и агрессия.
Жизнь превращается в ад.

Чтобы помочь с этим, я собрал полезные статьи по тестированию,
которые можно незаметно подсовывать в читалку вашего чада.

Подборка предназначена для разработчиков знакомых с Ruby и Rspec, но не до конца понимающих что и как тестировать. Для тех, кто прочитал Rspec Book, но не может написать тест с нуля. Для тех, кто исправляет баг за 5 минут, а потом 2 часа пишет для него тест. ~~Для тех, кто прохавал жизнь с самого низа.~~

Если вы не знакомы с Ruby/Rspec, а статьи понять хочется, пройдите эти курсы:

* [Try Ruby](https://www.codeschool.com/courses/try-ruby);
* [Testing with Rspec](https://www.codeschool.com/courses/testing-with-rspec).

<img class="img--break" src="/assets/non-testing-teenager.jpg" alt="" />

### Тестовая пирамида

* [The Rails Testing Pyramid](http://blog.codeclimate.com/blog/2013/10/09/rails-testing-pyramid/). Пирамида тестов, модульные и приемочные тесты.
* [Testing from the Outside-In](https://robots.thoughtbot.com/testing-from-the-outsidein). Тестирование «снаружи внутрь».

### Модульные тесты

* [The Magic Tricks of Testing by Sandi Metz](http://www.youtube.com/watch?v=URSWYvyc42M), [слайды](https://speakerdeck.com/skmetz/magic-tricks-of-testing-railsconf). Все, что нужно знать о модульном тестировании.
* [Four-Phase Test](https://robots.thoughtbot.com/four-phase-test). 4 фазы в тестах.
* [Better Specs](http://betterspecs.org/). Советы о хороших тестах.
* [Structure of RSpec tests](http://jakegoulding.com/presentations/rspec-structure/). Как использовать `describe`, `context`, `let`, `before` и `subject` в Rspec.
* [Техники анализа классов эквивалентности и граничных значений](http://33testers.blogspot.ru/2013/07/blog-post_27.html). Тестировании функций, работающих с огромным разбросом параметров.
* [Speed Up Tests by Selectively Avoiding Factory Girl](https://robots.thoughtbot.com/speed-up-tests-by-selectively-avoiding-factory-girl), [Rspec Test Doubles](https://github.com/rspec/rspec-mocks#test-doubles) и [Factory Girl Associations](https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md#associations). Чтобы разобраться с `build`, `create`, `instance_double` и быстрыми тестами без фабрик.

### Моки и стабы

* [Mocks Aren't Stubs](http://martinfowler.com/articles/mocksArentStubs.html). Фундаментально о моках, стабах, классицистах и мокистах.
* [Mocking with RSpec: Doubles and Expectations](https://semaphoreci.com/community/tutorials/mocking-with-rspec-doubles-and-expectations). Практическое введение в дублеры и моки в Rspec.
* [Thoughts on Mocking](http://myronmars.to/n/dev-blog/2012/06/thoughts-on-mocking). Тесты, привязанных к реализации и интерфейсам.
* [Thoughts on Mocking (2 of 2)](http://blog.rubybestpractices.com/posts/gregory/052-issue-20-thoughts-on-mocking.html). Хорошо/плохо с моками.

### UI, интеграционные, приемочные тесты

* [Capybara README](https://github.com/jnicklas/capybara).
* [Simple tricks to clean up your Capybara tests](http://www.elabs.se/blog/51-simple-tricks-to-clean-up-your-capybara-tests). Как писать сценарии для людей.

### Дополнительно

* [Testing like the TSA](https://signalvnoise.com/posts/3159-testing-like-the-tsa). 7 правил тестирования.
* [50 оттенков красного](http://www.youtube.com/watch?v=ismsJYFKuGQ), [слайды](http://www.slideshare.net/ssuserfc4417/50-45546464). О тестировании без боли.
* [How Much Testing Is Too Much?](http://www.justinweiss.com/blog/2015/05/04/how-much-testing-is-too-much/). Об эффективности тестов.
