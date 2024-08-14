import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserId } from '../../../domain/value-objects/user-id';
import type { ITransactionManager } from '../../shared/itransaction-manager';

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ITransactionManager')
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
