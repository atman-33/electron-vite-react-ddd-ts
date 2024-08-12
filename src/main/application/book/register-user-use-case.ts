import { IUserRepository } from '../../domain/models/user/iuser-repository';
import { UserDomain } from '../../domain/models/user/user-domain';
import { UserName } from '../../domain/value-objects/user-name';
import { ITransactionManager } from '../shared/itransaction-manager';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(name: string): Promise<void> {
    const user = UserDomain.create(new UserName(name));
    await this.transactionManager.begin(async () => {
      await this.userRepository.insert(user);
    });
  }
}
