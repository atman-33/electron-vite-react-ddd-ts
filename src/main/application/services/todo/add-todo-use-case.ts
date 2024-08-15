import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoTypeDomain } from '../../../domain/models/todo/todo-type-domain';
import { Content } from '../../../domain/value-objects/content';
import { Deadline } from '../../../domain/value-objects/deadline';
import { SortOrder } from '../../../domain/value-objects/sort-order';
import { Status } from '../../../domain/value-objects/status';
import { TodoTypeId } from '../../../domain/value-objects/todo-type-id';
import { TodoTypeName } from '../../../domain/value-objects/todo-type-name';
import { UserId } from '../../../domain/value-objects/user-id';
import type { ITransactionManager } from '../../shared/itransaction-manager';
import { TodoDto } from './dto/todo-dto';

export type AddTodoInput = {
  content: string;
  deadline: Date | null;
  status: number;
  userId: string;
  todoTypeId: string;
  todoTypeName: string;
  todoTypeSortOrder: number;
};

@injectable()
export class AddTodoUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(addTodoData: AddTodoInput): Promise<TodoDto> {
    const { content, deadline, status, userId, todoTypeId, todoTypeName, todoTypeSortOrder } =
      addTodoData;

    const todo = TodoDomain.create(
      new Content(content),
      new Deadline(deadline),
      new Status(status),
      new UserId(userId),
      TodoTypeDomain.reconstruct(
        new TodoTypeId(todoTypeId),
        new TodoTypeName(todoTypeName),
        new SortOrder(todoTypeSortOrder)
      )
    );
    await this.transactionManager.begin(async () => {
      try {
        await this.todoRepository.insert(todo);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to add todo: ${error.message}`);
        }
        throw new Error('AddTodoUseCase: unknown error.');
      }
    });
    return new TodoDto(todo);
  }
}
