import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserName } from '../../../domain/value-objects/user-name';
import type { ITransactionManager } from '../../shared/itransaction-manager';
import { UserDto } from './dto/user-dto';

type RegisterUserInput = {
  name: string;
};

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ITransactionManager')
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(registerUserData: RegisterUserInput): Promise<UserDto> {
    const user = UserDomain.create(new UserName(registerUserData.name));
    await this.transactionManager.begin(async () => {
      try {
        await this.userRepository.insert(user);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to insert user: ${error.message}`);
        }
        throw new Error('RegisterUserUseCase: unknown error.');
      }
    });
    return new UserDto(user);
  }
}
