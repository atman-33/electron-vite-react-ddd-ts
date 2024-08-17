import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserId } from '../../../domain/value-objects/user-id';
import { UserName } from '../../../domain/value-objects/user-name';
import type { ITransactionManager } from '../../shared/itransaction-manager';

export type UpdateUserInput = {
  id: string;
  name: string;
};

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(updateUserData: UpdateUserInput): Promise<void> {
    const user = UserDomain.reconstruct(
      new UserId(updateUserData.id),
      new UserName(updateUserData.name)
    );
    await this.transactionManager.begin(async () => {
      await this.userRepository.update(user);
    });
  }
}
