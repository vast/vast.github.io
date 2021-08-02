---
title: Линтим Руби в Виме
layout: default
---


<img src="/assets/vim-ale.jpg" width="650" height="567"/>


Чтобы Вим фоном линтил текущий файл и показывал ошибки прямо в редакторе, нужно:

1\. Установить ALE:
<https://github.com/dense-analysis/ale>

2\. Настроить его:
```
" Что и чем линтим
let g:ale_linters = {
\   'javascript': ['eslint'],
\   'ruby': ['rubocop']
\}

let g:ale_linters_explicit = 1

" Линтим Руби бинстабом, который использует Spring
let g:ale_ruby_rubocop_executable = "bin/rubocop"

" Настраиваем значки
let g:ale_sign_error = "\u2022"
let g:ale_sign_warning = "\u2022"
" Оставляем колонку под значки, чтобы левай край окна не «дрожал»
let g:ale_sign_column_always = 1
```

3\. Вы великолепны.
