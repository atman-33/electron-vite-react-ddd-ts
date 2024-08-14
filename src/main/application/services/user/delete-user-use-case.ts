import { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { ITransactionManager } from '../../shared/itransaction-manager';

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(user: UserDomain): Promise<void> {
    await this.transactionManager.begin(async () => {
      await this.userRepository.delete(user);
    });
  }
}
