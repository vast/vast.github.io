---
title: "Cursor Rules для хороших тестов с Ruby и RSpec"
layout: default
---

Делюсь моим набором правил для Курсора, которые помогают писать вменяемые тесты с RSpec. Я пользуюсь ими около месяца, в 9 из 10 случаев получается то, что надо. Больше того, я использовал эти правила, чтобы сделать домашку [в Тестовом курсе,](https://vasily.polovnyov.ru/tests/) и получил хорошие тесты, требующие минимальной доработки.


```
---
description: 
globs: **/*_spec.rb
alwaysApply: false
---

# <Project> Tests Style Guide
## General
- Always use English in tests.
- Always test edge, valid, and invalid cases.
- Set up RSpec config in `.rspec` and `spec_helper.rb`.
- Follow DRY principles and avoid duplication. Don't over-DRY at the cost of clarity; duplication is acceptable if it improves readability.
- Use shared examples for repeated behaviors.
- Do not test private methods.
- Do not test trivial methods.
- Do not test external dependencies.

## Layout
- Do not leave empty lines after `describe`, `context`, or `feature` declarations.
- Leave one empty line between example groups (`describe`, `context`, `feature`).
- Leave one empty line after `let`, `before`, and `after` blocks.
- Group all `let` blocks together, separate from `before`/`after`.
- Leave one empty line around each `it`/`specify` block.
- Separate test phases (setup, exercise, assertion) with one empty line.

## Example Group Structure
- Do not use `subject`; prefer `let`/`let!`.
- Use `let`/`let!` for setup, not instance variables or `before` for data.
- Order: `let`/`let!`, then `before`/`after`.
- Use `describe` for methods/classes. Use `.` for class methods, `#` for instance methods.
- Use `context` to describe different conditions, starting with 'when', 'with', 'if', 'unless', 'for', 'and', 'but', 'without', or 'otherwise'.

## Example Structure
- One expectation per example (`it`). If an example description contains 'and', it probably contains more than one expectation.
- When an example consists of multiple linked expectations, consider using `have_attributes` or a custom matcher.
- Keep example descriptions short and clear.
- Use `expect` syntax for assertions.
- For change assertions, prefer `expect { ... }.to change { ... }.from(...).to(...)` or `.to(...)`.
- Extract a `context` if an `it` description contains conditions: when, with, if, unless.

## Naming
- Contexts should describe conditions, forming readable sentences with nested blocks.
- Do not use 'should' in example descriptions. Use present tense, third person.
- Be explicit in `describe` blocks about what is being tested.

## Stubbing & Mocks
- Mock/stub only when necessary. Prefer real objects for integration tests.
- Always use `expect(...).to have_received(...)` to verify method calls on double/spy instead of `expect(...).to receive(...)`.
- Stub HTTP requests (e.g., with webmock) instead of hitting real services.
- Use `Timecop` for time, not stubbing `Time.now`.
```
