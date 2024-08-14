import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserId } from '../../../domain/value-objects/user-id';

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: UserId): Promise<UserDomain | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
