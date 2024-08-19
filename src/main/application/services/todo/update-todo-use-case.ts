import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoTypeDomain } from '../../../domain/models/todo/todo-type-domain';
import { Content } from '../../../domain/value-objects/content';
import { Deadline } from '../../../domain/value-objects/deadline';
import { SortOrder } from '../../../domain/value-objects/sort-order';
import { Status } from '../../../domain/value-objects/status';
import { TodoId } from '../../../domain/value-objects/todo-id';
import { TodoTypeId } from '../../../domain/value-objects/todo-type-id';
import { TodoTypeName } from '../../../domain/value-objects/todo-type-name';
import { UserId } from '../../../domain/value-objects/user-id';
import type { ITransactionManager } from '../../shared/itransaction-manager';

export type UpdateTodoInput = {
  id: string;
  content: string;
  deadline: Date | null;
  status: number;
  userId: string;
  todoType: {
    id: string;
    name: string;
    sortOrder: number;
  };
};

@injectable()
export class UpdateTodoUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(updateTodoData: UpdateTodoInput): Promise<void> {
    const { id, content, deadline, status, userId, todoType } = updateTodoData;

    const todo = TodoDomain.reconstruct(
      new TodoId(id),
      new Content(content),
      new Deadline(deadline),
      new Status(status),
      new UserId(userId),
      TodoTypeDomain.reconstruct(
        new TodoTypeId(todoType.id),
        new TodoTypeName(todoType.name),
        new SortOrder(todoType.sortOrder)
      )
    );
    await this.transactionManager.begin(async () => {
      await this.todoRepository.update(todo);
    });
  }
}
