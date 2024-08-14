import { UserId } from '../../value-objects/user-id';
import { UserDomain } from './user-domain';

export interface IUserRepository {
  insert(user: UserDomain): Promise<void>;
  update(user: UserDomain): Promise<void>;
  delete(user: UserDomain): Promise<void>;
  findById(id: UserId): Promise<UserDomain | null>;
  findAll(): Promise<UserDomain[]>;
}
