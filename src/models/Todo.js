import {observable, computed} from 'mobx';
import uuid from 'uuid/v1';

class Todo {
  id = '';
  @observable text = '';
  @observable isDone = false;

  constructor({id = '', text = '', isDone = false} = {}) {
    this.id = id ? id : Todo.getID();
    this.text = text;
    this.isDone = isDone;
  }

  static getID() {
    return uuid();
  }

  static deserialize(todoJson) {
    const todo = new Todo({
      id: todoJson.id,
      text: todoJson.text,
      isDone: todoJson.isDone,
    });
    return todo;
  }

  serialize() {
    return {
      id: this.id,
      text: this.text,
      isDone: this.isDone,
    };
  }

  @computed get isValid() {
    return this.text !== '';
  }

  getShortID() {
    return this.id.slice(0, 8);
  }
}

export {Todo};
