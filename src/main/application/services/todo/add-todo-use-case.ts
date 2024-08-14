import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoDomainCollection } from '../../../domain/models/todo/todo-domain-collection';
import type { ITransactionManager } from '../../shared/itransaction-manager';

@injectable()
export class AddTodoUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(todos: TodoDomainCollection, newTodo: TodoDomain): Promise<void> {
    await this.transactionManager.begin(async () => {
      todos.add(newTodo);
      await this.todoRepository.insert(newTodo);
    });
  }
}
