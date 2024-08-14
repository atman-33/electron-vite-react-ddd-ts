import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomainCollection } from '../../../domain/models/todo/todo-domain-collection';
import { UserId } from '../../../domain/value-objects/user-id';

@injectable()
export class GetTodoByUserIdUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  async execute(userId: UserId): Promise<TodoDomainCollection> {
    const todos = await this.todoRepository.findByUserId(userId);

    return todos ?? new TodoDomainCollection();
  }
}
