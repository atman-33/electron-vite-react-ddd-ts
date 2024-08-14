import { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoDomainCollection } from '../../../domain/models/todo/todo-domain-collection';
import { ITransactionManager } from '../../shared/itransaction-manager';

export class AddTodoUseCase {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(todos: TodoDomainCollection, newTodo: TodoDomain): Promise<void> {
    await this.transactionManager.begin(async () => {
      todos.add(newTodo);
      await this.todoRepository.insert(newTodo);
    });
  }
}
