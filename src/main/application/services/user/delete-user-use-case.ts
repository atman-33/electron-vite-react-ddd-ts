import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserId } from '../../../domain/value-objects/user-id';
import type { ITransactionManager } from '../../shared/itransaction-manager';

type DeleteUserInput = {
  id: string;
};

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(deleteUserData: DeleteUserInput): Promise<void> {
    await this.transactionManager.begin(async () => {
      await this.userRepository.delete(new UserId(deleteUserData.id));
    });
  }
}
