import { TodoDomain } from '../../../../domain/models/todo/todo-domain';

export class TodoDto {
  public readonly id: string;
  public readonly content: string;
  public readonly deadline: Date | null;
  public readonly status: number;
  public readonly userId: string;
  public readonly todoTypeId: string;
  public readonly todoTypeName: string;
  public readonly todoTypeSortOrder: number;

  constructor(todo: TodoDomain) {
    this.id = todo.id.value;
    this.content = todo.content.value;
    this.deadline = todo.deadline.value;
    this.status = todo.status.value;
    this.userId = todo.userId.value;
    this.todoTypeId = todo.todoType.id.value;
    this.todoTypeName = todo.todoType.name.value;
    this.todoTypeSortOrder = todo.todoType.sortOrder.value;
  }
}
