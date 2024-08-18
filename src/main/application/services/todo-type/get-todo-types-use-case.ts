import { inject, injectable } from 'tsyringe';
import type { ITodoTypeQueryService } from '../../query-services/itodo-type-query-service';
import { TodoTypeDto } from './dto/todo-type-dto';

@injectable()
export class GetTodoTypesUseCase {
  constructor(
    @inject('ITodoTypeQueryService')
    private readonly todoTypeQueryService: ITodoTypeQueryService
  ) {}

  async execute(): Promise<TodoTypeDto[]> {
    const todoTypes = await this.todoTypeQueryService.findAll();

    return todoTypes.map((t) => new TodoTypeDto(t));
  }
}
