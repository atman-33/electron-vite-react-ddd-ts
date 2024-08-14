import { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomainCollection } from '../../../domain/models/todo/todo-domain-collection';
import { UserId } from '../../../domain/value-objects/user-id';
import { ITransactionManager } from '../../shared/itransaction-manager';

export class GetTodoByUserIdUseCase {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(userId: UserId): Promise<TodoDomainCollection> {
    const todos = await this.transactionManager.begin(async () => {
      return await this.todoRepository.findByUserId(userId);
    });

    return todos ?? new TodoDomainCollection();
  }
}
