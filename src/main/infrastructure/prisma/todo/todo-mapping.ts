import { Todo, TodoType } from '@prisma/client';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoTypeDomain } from '../../../domain/models/todo/todo-type-domain';
import { Content } from '../../../domain/value-objects/content';
import { Deadline } from '../../../domain/value-objects/deadline';
import { SortOrder } from '../../../domain/value-objects/sort-order';
import { Status } from '../../../domain/value-objects/status';
import { TodoId } from '../../../domain/value-objects/todo-id';
import { TodoTypeId } from '../../../domain/value-objects/todo-type-id';
import { TodoTypeName } from '../../../domain/value-objects/todo-type-name';
import { UserId } from '../../../domain/value-objects/user-id';

export class TodoMapping {
  static toDomain(todo: Todo & { todo_type: TodoType }): TodoDomain {
    return TodoDomain.reconstruct(
      new TodoId(todo.id),
      new Content(todo.content),
      new Deadline(todo.deadline),
      new Status(todo.status),
      new UserId(todo.user_id),
      TodoTypeDomain.reconstruct(
        new TodoTypeId(todo.todo_type_id),
        new TodoTypeName(todo.todo_type.name),
        new SortOrder(todo.todo_type.sort_order)
      )
    );
  }
}
