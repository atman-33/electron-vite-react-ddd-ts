import { UserDomain } from '../../../../domain/models/user/user-domain';

export class UserDto {
  public readonly id: string;
  public readonly name: string;

  constructor(user: UserDomain) {
    this.id = user.id.value;
    this.name = user.name.value;
  }
}
