# Todos React-Native, MobX, MVVM

## Description

This repo complements [`todos-react-mobx`](https://github.com/ChrisLFieldsII/todos-react-mobx) repo.

I should have put both projects under one repo however you'll notice that the `Todo` Model and `TodoViewModel` ViewModel are the same between both repos.

The only difference is the `TodoView` View layer, one is React and the other is React-Native

Decoupling the logic (models/viewModels) from the UI (views) leads to easier to maintain code and makes it a lot easier to share logic between different frontend technologies.
