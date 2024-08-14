import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import type { ITransactionManager } from '../../shared/itransaction-manager';

@injectable()
export class GetUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ITransactionManager')
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
