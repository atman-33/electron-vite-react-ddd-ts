import { UserId } from '../../value-objects/user-id';
import { TodoDomain } from './todo-domain';

export interface ITodoRepository {
  insert(todo: TodoDomain): Promise<void>;
  update(todo: TodoDomain): Promise<void>;
  delete(todo: TodoDomain): Promise<void>;
  findByUserId(userId: UserId): Promise<TodoDomain[]>;
}
