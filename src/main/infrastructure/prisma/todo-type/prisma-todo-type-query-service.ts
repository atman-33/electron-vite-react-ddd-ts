import { inject, injectable } from 'tsyringe';
import { ITodoTypeQueryService } from '../../../application/query-services/itodo-type-query-service';
import { TodoTypeDomain } from '../../../domain/models/todo/todo-type-domain';
import { PrismaClientManager } from '../prisma-client-manager';
import { TodoTypeMapping } from './todo-type-mapping';

@injectable()
export class PrismaTodoTypeQueryService implements ITodoTypeQueryService {
  constructor(
    @inject('IDataAccessClientManager')
    private clientManager: PrismaClientManager
  ) {}

  async upsert(todoType: TodoTypeDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.todoType.upsert({
      where: {
        id: todoType.id.value
      },
      update: {
        name: todoType.name.value,
        sort_order: todoType.sortOrder.value
      },
      create: {
        id: todoType.id.value,
        name: todoType.name.value,
        sort_order: todoType.sortOrder.value
      }
    });
  }

  async findAll(): Promise<TodoTypeDomain[]> {
    const client = this.clientManager.getClient();

    const todoTypes = await client.todoType.findMany({});
    return todoTypes.map((t) => TodoTypeMapping.toDomain(t));
  }
}
