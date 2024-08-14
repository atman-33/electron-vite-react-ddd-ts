import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserName } from '../../../domain/value-objects/user-name';
import type { ITransactionManager } from '../../shared/itransaction-manager';

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(name: string): Promise<void> {
    const user = UserDomain.create(new UserName(name));
    await this.transactionManager.begin(async () => {
      await this.userRepository.insert(user);
    });
  }
}
