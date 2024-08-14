import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';

@injectable()
export class GetUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<UserDomain[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
