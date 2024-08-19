import { TodoTypeDomain } from '../../domain/models/todo/todo-type-domain';

export interface ITodoTypeQueryService {
  upsert(todoType: TodoTypeDomain): Promise<void>;
  findAll(): Promise<TodoTypeDomain[]>;
}
