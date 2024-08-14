import { UserId } from '../../value-objects/user-id';
import { TodoDomain } from './todo-domain';
import { TodoDomainCollection } from './todo-domain-collection';

export interface ITodoRepository {
  insert(todo: TodoDomain): Promise<void>;
  update(todo: TodoDomain): Promise<void>;
  delete(todo: TodoDomain): Promise<void>;
  findByUserId(userId: UserId): Promise<TodoDomainCollection>;
}
