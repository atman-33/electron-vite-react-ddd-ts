import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserId } from '../../../domain/value-objects/user-id';
import { UserDto } from './dto/user-dto';

export type GetUserByIdArgs = {
  id: string;
};

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(getUserByIdArgs: GetUserByIdArgs): Promise<UserDto | null> {
    const user = await this.userRepository.findById(new UserId(getUserByIdArgs.id));
    if (!user) {
      throw new Error('User not found');
    }

    return new UserDto(user);
  }
}
