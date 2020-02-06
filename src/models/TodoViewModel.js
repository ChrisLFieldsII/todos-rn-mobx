import {observable, action} from 'mobx';

import {Todo} from './Todo';

class TodoViewModel {
  @observable todos = [];

  storage = null;

  constructor({storage}) {
    this.storage = storage;
    this.load();
  }

  @action.bound
  add() {
    const todo = new Todo();
    this.todos.push(todo);
    return todo;
  }

  @action.bound
  remove(todo) {
    const index = this.todos.indexOf(todo);
    if (index === -1) {
      return;
    }
    return this.todos.splice(index, 1)[0];
  }

  @action.bound
  async load() {
    if (!this.storage) {
      return;
    }

    const serializedTodos = await this.storage.getItem('todos');
    const json = JSON.parse(serializedTodos || '[]');
    this.todos = json.map(todoJson => Todo.deserialize(todoJson));

    return this.todos;
  }

  @action.bound
  save() {
    if (!this.storage) {
      return;
    }

    if (this.todos.filter(todo => !todo.isValid).length > 0) {
      return alert('Unable to save due to invalid todos');
    }

    const json = this.todos.map(todo => todo.serialize());
    this.storage.setItem('todos', JSON.stringify(json));
  }

  @action.bound
  toggleTodo(todo) {
    if (todo.isDone) {
      todo.isDone = false;
    } else {
      todo.isDone = true;
    }
  }
}

export {TodoViewModel};
