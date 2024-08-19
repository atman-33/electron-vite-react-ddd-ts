import { TodoTypeDomain } from '../../../../domain/models/todo/todo-type-domain';

export class TodoTypeDto {
  public readonly id: string;
  public readonly name: string;
  public readonly sortOrder: number;

  constructor(todoType: TodoTypeDomain) {
    this.id = todoType.id.value;
    this.name = todoType.name.value;
    this.sortOrder = todoType.sortOrder.value;
  }
}
