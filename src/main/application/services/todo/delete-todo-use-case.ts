import { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoDomainCollection } from '../../../domain/models/todo/todo-domain-collection';
import { ITransactionManager } from '../../shared/itransaction-manager';

export class DeleteTodoUseCase {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  execute(todos: TodoDomainCollection, todo: TodoDomain): Promise<void> {
    return this.transactionManager.begin(async () => {
      todos.remove(todo);
      await this.todoRepository.delete(todo);
    });
  }
}
