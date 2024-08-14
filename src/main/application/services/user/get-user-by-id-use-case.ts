import { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserId } from '../../../domain/value-objects/user-id';
import { ITransactionManager } from '../../shared/itransaction-manager';

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(id: UserId): Promise<UserDomain | null> {
    await this.transactionManager.begin(async () => {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    });

    return null;
  }
}
