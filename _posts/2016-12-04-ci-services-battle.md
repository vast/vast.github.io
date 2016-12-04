---
title: "Сравнение CI-сервисов"
layout: default
---

На прошлой неделе меня перестал устраивать Semaphore за $29 в месяц, и я отправился на поиски CI-сервиса подешевле.

На всех опробованных сервисах я использовал один и тот же проект: Rails, RSpec, Rubocop. Сравнивал цены за 10-12 проектов и время, потраченное на билд.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Длительность билда</th>
      <th>Цена в месяц</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://semaphoreci.com">Semaphore</a></td>
      <td>1:08</td>
      <td>$29</td>
    </tr>

    <tr>
      <td><a href="http://vexor.io/">Vexor</a></td>
      <td>1:48</td>
      <td>¯\_(ツ)_/¯<br />$0.015 за минуту</td>
    </tr>

    <tr>
      <td><a href="https://travis-ci.com/">Travis CI</a></td>
      <td>2:25</td>
      <td>$69</td>
    </tr>

    <tr>
      <td><a href="http://snap-ci.com/">Snap</a></td>
      <td>2:40</td>
      <td>$80</td>
    </tr>

    <tr>
      <td><a href="https://circleci.com/">CircleCI</a></td>
      <td>3:23</td>
      <td>$50 за 2 контейнера<br />$0 за контейнер и 1500 минут</td>
    </tr>

    <tr>
      <td><a href="https://www.codeship.io/">Codeship</a></td>
      <td>3:48</td>
      <td>$49</td>
    </tr>

    <tr>
      <td><a href="http://magnum-ci.com/">MagnumCI</a></td>
      <td>&infin;</td>
      <td>$0</td>
    </tr>

    <tr>
      <td><a href="https://www.solanolabs.com/">Solano CI</a></td>
      <td>&infin;</td>
      <td>$15</td>
    </tr>

    <tr>
      <td><a href="https://www.shippable.com/">Shippable</a></td>
      <td>&infin;</td>
      <td>$25</td>
    </tr>

    <tr>
      <td><a href="http://drone.io">Drone</a></td>
      <td>&infin;</td>
      <td>$49</td>
    </tr>
  </tbody>
</table>

В последних четырех сервисах я не смог запустить тестовый билд. Solano CI и Shippable не увидели приватных проектов. В MagnumCI и Drone не было Руби 2.3, а есть ли ruby-build или rvm — непонятно.

<strong>Самый быстрый</strong> — Semaphore. Из-за локального зеркала RubyGems и кучи предустановленных версий Руби. Тот же Travis 20 секунд потратил на установку Руби и 94 секунды — на установку гемов.

<strong>Самый дешевый</strong> — бесплатный CircleCI, если влезете в ограничение на 1500 минут в месяц. Если не влезете, посмотрите Vexor. Меня они смутили тем, что билды тупо не запускались, пока ребята не «перезагрузили сервер».

## Что я выбрал
Semaphore. Чем быстрее работает CI, тем быстрее выкатываются фичи. Кроме того, я попросил у них скидку, и они дали 20%.
