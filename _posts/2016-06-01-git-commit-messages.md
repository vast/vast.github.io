---
title: "По хардкору: что писать в комментарии к коммиту"
layout: default
---

У меня был коллега, который коммиты сопровождал одним и тем же комментарием, изредка играя с заглавными буквами. Его история изменений выглядела так:

<img src="/assets/warriors-changes.png" alt="" width="1366" height="768" />

Такие комментарии — ад. Они не говорят о том, что изменилось и почему. Они не помогают при ревью и откате изменений. В них нет ни смысла, ни логики, ни пользы.

Чтобы комментарии к коммитам были полезны и вам, и коллегам, договоритесь об их стиле и содержимом. А я пока поделюсь своим вариантом.

-------------------------------------------

## На каком языке писать

В коде вы работаете с Post, Blog, User. Вы мыслите ими и не задумываясь используете в речи: добавим юзеру аватарку, покажем популярные посты в блоге.

Комментарии на русском сбивают с толку и заставляют вспоминать, что это и где:

```
f0b4ac поправил верстку подвала статьи
```

«Статья». Это у нас что? Article, Post, BlogEntry? Если коммит на английском, проблем нет:

```
f0b4ac fix post footer markup
```

<div class="outstanding outstanding--therule">
Пишите на&nbsp;английском
</div>


## Что писать в комментарии

Дифф коммита рассказывает, _что_ изменилось. Единственный способ рассказать, _зачем_ эти изменения, какая от них польза — комментарий к коммиту.

Полезный комментарий описывает не что было сделано, а результат в мире ~~клиента~~ разработчика:

```
# Плохо: это мы и в диффе видим.
# Зачем добавляли-то? Что пытались поправить?
d77d9f add <div> wrap

# Хорошо: ясно, зачем сделаны изменения, какую проблему решали
d77d9f fix Firefox issue with flexbox padding
```

<div class="outstanding outstanding--therule">
Не&nbsp;<em>что</em>&nbsp;сделано, а&nbsp;<em>зачем</em>
</div>


## В каком времени

Я рассматриваю историю Гита как историю команд, приказов, приводящих репозиторий из одного состояния в другое. Поэтому пишу в повелительном наклонении. Чтобы было проще писать, [использую шаблон-скороговорку](http://codeinthehole.com/writing/a-useful-template-for-commit-messages/):

```
# If applied, this commit will
mention Ubuntu installation instructions in README
```

<div class="outstanding outstanding--therule">
В&nbsp;повелительном наклонении
</div>

ПРОТИП: если в комментарии есть and, скорее всего, в коммите несколько несвязанных изменений:

```
fix ... and update ...
introduce ... and correct ...
```

-------------------------------------------

## Дополнительное чтение

* [Past Tense](http://stackoverflow.com/a/8059167) vs [Present Tense](http://stackoverflow.com/a/3580764);
* [How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/);
* [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html);
* [Atomic Commits](http://www.freshconsulting.com/atomic-commits/);
* [Git Commit Good Practice](https://wiki.openstack.org/wiki/GitCommitMessages);
* [GIT Conventions](https://medium.com/@tjholowaychuk/git-conventions-a940ee20862d#.vacbx5a0o).
