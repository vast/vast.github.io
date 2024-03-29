---
title: "Датчик есть, но его как бы нет"
layout: default
---

В ноябре я попал в жесткое ДТП и серьезно поехал кукухой по безопасности. Исключением не стал и дом: я накупил огнетушителей, детекторов дыма и датчиков протечки. Один из датчиков бросил под ванну, убедился, что он работает, и забыл.

В прошлое воскресенье случайно заглянул под ванну и обнаружил течь: вода подкапывает на стыке сифона и трубы канализации. Датчик при этом молчит: воды вытекает мало, она быстро испаряется и не успевает разлиться до датчика. То есть датчик есть, работает, но его как бы и нет.

Так и в программировании. Мониторим регулярность бэкапов, а когда приходится что-то достать из бэкапа, оказывается, что дампы битые и не восстанавливаются. Проверяем очередь платежей, отправляем алерты в Sentry, а они не доходят до девопсов: интеграция с PagerDuty отвалилась. Мониторим доступность сайта, а форма, через которую клиенты записываются на пробные занятия, сломалась из-за ошибки в скрипте на странице: сайт работает, форма есть, денег нет.

Что с этим можно поделать? Во-первых, убедиться, что датчики проверяют то, что нужно. Во-вторых, убедиться, что датчиков хватает. В-третьих, ввести регулярные «проверки связи» и sanity checks.
