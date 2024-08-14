import { TodoDomain } from './todo-domain';

export class TodoDomainCollection {
  constructor(private _todos: TodoDomain[] = []) {}

  public get todos(): TodoDomain[] {
    return this._todos;
  }

  public add(todo: TodoDomain) {
    this._todos.push(todo);
  }

  public remove(todo: TodoDomain) {
    this._todos = this._todos.filter((t) => t.id.value !== todo.id.value);
  }
}
