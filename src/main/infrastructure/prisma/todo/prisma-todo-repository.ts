import { inject, injectable } from 'tsyringe';
import { ITodoRepository } from '../../../domain/models/todo/itodo-repository';
import { TodoDomain } from '../../../domain/models/todo/todo-domain';
import { TodoDomainCollection } from '../../../domain/models/todo/todo-domain-collection';
import { UserId } from '../../../domain/value-objects/user-id';
import { PrismaClientManager } from '../prisma-client-manager';
import { TodoMapping } from './todo-mapping';

@injectable()
export class PrismaTodoRepository implements ITodoRepository {
  constructor(
    @inject('IDataAccessClientManager')
    private clientManager: PrismaClientManager
  ) {}

  async insert(todo: TodoDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.todo.create({
      data: {
        id: todo.id.value,
        content: todo.content.value,
        deadline: todo.deadline.value,
        status: todo.status.value,
        user_id: todo.userId.value,
        todo_type_id: todo.todoType.id.value
      }
    });
  }
  async update(todo: TodoDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.todo.update({
      where: {
        id: todo.id.value
      },
      data: {
        content: todo.content.value,
        deadline: todo.deadline.value,
        status: todo.status.value,
        user_id: todo.userId.value,
        todo_type_id: todo.todoType.id.value
      }
    });
  }
  async delete(todo: TodoDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.todo.delete({
      where: {
        id: todo.id.value
      }
    });
  }
  async findByUserId(userId: UserId): Promise<TodoDomainCollection> {
    const client = this.clientManager.getClient();

    const todos = await client.todo.findMany({
      where: {
        user_id: userId.value
      },
      include: {
        todo_type: true
      }
    });

    return new TodoDomainCollection(todos.map((todo) => TodoMapping.toDomain(todo)));
  }
}
