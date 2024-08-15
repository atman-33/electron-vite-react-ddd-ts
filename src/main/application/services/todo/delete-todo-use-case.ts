import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { UserId } from '../../../domain/value-objects/user-id';
import type { ITransactionManager } from '../../shared/itransaction-manager';

export type DeleteTodoInput = {
  id: string;
};

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  execute(deleteTodoData: DeleteTodoInput): Promise<void> {
    return this.transactionManager.begin(async () => {
      await this.todoRepository.delete(new UserId(deleteTodoData.id));
    });
  }
}
