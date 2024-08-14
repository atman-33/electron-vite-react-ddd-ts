import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoDomainCollection } from '../../../domain/models/todo/todo-domain-collection';
import type { ITransactionManager } from '../../shared/itransaction-manager';

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  execute(todos: TodoDomainCollection, todo: TodoDomain): Promise<void> {
    return this.transactionManager.begin(async () => {
      todos.remove(todo);
      await this.todoRepository.delete(todo);
    });
  }
}
