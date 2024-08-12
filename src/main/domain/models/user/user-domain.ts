import { UserId } from '../../value-objects/user-id';
import { UserName } from '../../value-objects/user-name';

export class UserDomain {
  private constructor(
    private readonly _id: UserId,
    private _name: UserName
  ) {}

  public static create(name: UserName) {
    return new UserDomain(new UserId(), name);
  }

  public static reconstruct(id: UserId, name: UserName) {
    return new UserDomain(id, name);
  }

  public get id(): UserId {
    return this._id;
  }

  public get name(): UserName {
    return this._name;
  }
}
