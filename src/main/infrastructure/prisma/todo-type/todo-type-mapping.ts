import { TodoType } from '@prisma/client';
import { TodoTypeDomain } from '../../../domain/models/todo/todo-type-domain';
import { SortOrder } from '../../../domain/value-objects/sort-order';
import { TodoTypeId } from '../../../domain/value-objects/todo-type-id';
import { TodoTypeName } from '../../../domain/value-objects/todo-type-name';

export class TodoTypeMapping {
  static toDomain(todoType: TodoType): TodoTypeDomain {
    return TodoTypeDomain.reconstruct(
      new TodoTypeId(todoType.id),
      new TodoTypeName(todoType.name),
      new SortOrder(todoType.sort_order)
    );
  }
}
