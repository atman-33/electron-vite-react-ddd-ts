import { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { ITransactionManager } from '../../shared/itransaction-manager';

export class UpdateTodoUseCase {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(todo: TodoDomain): Promise<void> {
    await this.transactionManager.begin(async () => {
      await this.todoRepository.update(todo);
    });
  }
}
