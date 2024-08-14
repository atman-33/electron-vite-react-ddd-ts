import { User } from '@prisma/client';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserId } from '../../../domain/value-objects/user-id';
import { UserName } from '../../../domain/value-objects/user-name';

export class UserMapping {
  static toDomain(user: User): UserDomain {
    return UserDomain.reconstruct(new UserId(user.id), new UserName(user.name));
  }
}
