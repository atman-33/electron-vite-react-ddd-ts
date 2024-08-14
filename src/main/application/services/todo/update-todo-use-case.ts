import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import type { ITransactionManager } from '../../shared/itransaction-manager';

@injectable()
export class UpdateTodoUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(todo: TodoDomain): Promise<void> {
    await this.transactionManager.begin(async () => {
      await this.todoRepository.update(todo);
    });
  }
}
