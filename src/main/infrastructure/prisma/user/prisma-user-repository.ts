import { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserId } from '../../../domain/value-objects/user-id';
import { PrismaClientManager } from '../prisma-client-manager';
import { UserMapping } from './user-mapping';

export class PrismaUserRepository implements IUserRepository {
  constructor(private clientManager: PrismaClientManager) {}

  async insert(user: UserDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.user.create({
      data: {
        id: user.id.value,
        name: user.name.value
      }
    });
  }
  async update(user: UserDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.user.update({
      where: {
        id: user.id.value
      },
      data: {
        name: user.name.value
      }
    });
  }
  async delete(user: UserDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.user.delete({
      where: {
        id: user.id.value
      }
    });
  }
  async findById(id: UserId): Promise<UserDomain | null> {
    const client = this.clientManager.getClient();

    const user = await client.user.findUnique({
      where: {
        id: id.value
      }
    });

    if (!user) {
      return null;
    }

    return UserMapping.toDomain(user);
  }

  async findAll(): Promise<UserDomain[]> {
    const client = this.clientManager.getClient();

    const users = await client.user.findMany();
    return users.map((user) => UserMapping.toDomain(user));
  }
}
