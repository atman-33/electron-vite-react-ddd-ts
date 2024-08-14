import { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { ITransactionManager } from '../../shared/itransaction-manager';

export class GetUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(): Promise<UserDomain[]> {
    const users = await this.transactionManager.begin(async () => {
      const users = await this.userRepository.findAll();
      return users;
    });

    return users ?? [];
  }
}
