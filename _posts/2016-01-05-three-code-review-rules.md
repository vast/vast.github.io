---
title: Три правила ревью
layout: default
---

Я люблю ревью кода и тупые правила, вроде «переходя дорогу, смотри в обе стороны». В тупых правилах нет исключений и мудреных условий, поэтому работают они безотказно.

Если вы уже используете ревью кода, но при виде нового пуллреквеста потеете, или не знаете, с чего и как начать ревью — эти правила для вас.

-------------------------------------------

Чтобы ускорить ревью и облегчить жизнь товарищам, сначала просматривайте пуллреквест самостоятельно. Вы обнаружите забытые в коде комментарии, опечатки и прочие тупые проблемы, за которые потом стыдно перед коллегами.

Поэтому правило: открыл пуллреквест → попил чайку → отревьюил. Только чаепитие не пропускайте: это отличный способ отвлечься и взглянуть на код со стороны.

<div class="outstanding outstanding--therule">
Первый ревьюер — ты
</div>

Если изображать Синтаксический Анализатор Пуллреквестов 3000 и при ревью придираться к скобочкам, кавычкам и переносам, легко пропустить важное. Чтобы избавить себя от тупой работы по проверке синтаксиса и освободить время, настройте линтеры.

Отсюда и правило покруче: если что-то можно проверить автоматически, это должен делать робот, а не человек.

<div class="outstanding outstanding--therule">
Синтаксис — роботам
</div>

Чтобы ничего не забыть при ревью, используйте закрытые списки. Вот список вопросов, по которым я прохожусь при ревью пуллреквеста в проекте на Рельсах:

<ul id="my_checklist" class="my_checklist">
  <li class="my_checklist-item">понятно как и какую проблему решает пуллреквест?</li>
  <li class="my_checklist-item">в коде нет потенциальных багов?</li>
  <li class="my_checklist-item">от кода не пахнет (DRY, SRP, комментарии)?</li>
  <li class="my_checklist-item">имена и названия понятны?</li>
  <li class="my_checklist-item">код легко читается?</li>
  <li class="my_checklist-item">тесты на месте?</li>
  <li class="my_checklist-item">тестов достаточно, нет лишних?</li>
  <li class="my_checklist-item">по изменениям в тестах понятно, что изменилось в коде?</li>
  <li class="my_checklist-item">миграции и изменения в схеме совпадают?</li>
  <li class="my_checklist-item">у добавленных в БД полей есть нужные индексы и ограничения?</li>
  <li class="my_checklist-item">не торчит где-нибудь XSS или SQL инъекция?</li>
  <li class="my_checklist-item">не налажали с проверками доступа?</li>
  <li class="my_checklist-item">роуты в порядке?</li>
  <li class="my_checklist-item">нет жирных моделей, контроллеров и вьюх?</li>
  <li class="my_checklist-item">колбэки меняют только собственное состояние?</li>
  <li class="my_checklist-item">нет медленных участков (N+1 запросов, O(n^2) алгоритмов)?</li>
  <li class="my_checklist-item is-done">гифка в пуллреквесте смешная?</li>
</ul>

<div class="outstanding outstanding--therule">
Проверяй по списку
</div>


Если ваш список правил и проверок при ревью круче, поделитесь опытом, напишите: [vasily@polovnyov.ru](mailto:vasily@polovnyov.ru).

-------------------------------------------

Еще по теме:

* [The Code Review Mindset
](https://medium.com/medium-eng/the-code-review-mindset-3280a4af0a89#.16v4n6pbs);
* [Code Review Best Practices](http://kevinlondon.com/2015/05/05/code-review-best-practices.html);
* [Thoughtbot Code Review Guide](https://github.com/thoughtbot/guides/tree/master/code-review);
* [What a CSS Code Review Might Look Like](https://css-tricks.com/what-a-css-code-review-might-look-like/).

<style>
  .my_checklist li {
    cursor: pointer;
  }

  .my_checklist li:before {
    content: '☐';
    display: inline-block;
    width: 1.5em;
    margin-left: -1.5em;
    text-align: center;
  }

  .my_checklist .is-done {
    text-decoration: line-through;
  }

  .my_checklist .is-done:before {
    content: '☒';
  }
</style>

<script>
  (function() {
    document.getElementById('my_checklist').addEventListener('click', function(e) {
      if (e.target && e.target.nodeName === 'LI') {
        e.target.classList.toggle('is-done');
      }
    });
  })();
</script>
