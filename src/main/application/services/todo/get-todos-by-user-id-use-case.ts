import { inject, injectable } from 'tsyringe';
import type { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { UserId } from '../../../domain/value-objects/user-id';
import { TodoDto } from './dto/todo-dto';

export type GetTodosByUserIdArgs = {
  id: string;
};

@injectable()
export class GetTodosByUserIdUseCase {
  constructor(
    @inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  async execute(getTodosByUserIdArgs: GetTodosByUserIdArgs): Promise<TodoDto[]> {
    const todos = await this.todoRepository.findByUserId(new UserId(getTodosByUserIdArgs.id));

    return todos.todos.map((todo) => new TodoDto(todo));
  }
}
