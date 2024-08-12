import { Content } from '../../value-objects/content';
import { Deadline } from '../../value-objects/deadline';
import { Status } from '../../value-objects/status';
import { TodoId } from '../../value-objects/todo-id';
import { UserId } from '../../value-objects/user-id';
import { TodoTypeDomain } from './todo-type-domain';

export class TodoDomain {
  private constructor(
    private readonly _id: TodoId,
    private _content: Content,
    private _deadline: Deadline,
    private _status: Status,
    private _userId: UserId,
    private _todoType: TodoTypeDomain
  ) {}

  public static create(
    content: Content,
    deadline: Deadline,
    status: Status,
    userId: UserId,
    todoType: TodoTypeDomain
  ): TodoDomain {
    return new TodoDomain(new TodoId(), content, deadline, status, userId, todoType);
  }

  public static reconstruct(
    id: TodoId,
    content: Content,
    deadline: Deadline,
    status: Status,
    userId: UserId,
    todoType: TodoTypeDomain
  ): TodoDomain {
    return new TodoDomain(id, content, deadline, status, userId, todoType);
  }

  public get id(): TodoId {
    return this._id;
  }

  public get content(): Content {
    return this._content;
  }

  public get deadline(): Deadline {
    return this._deadline;
  }

  public get status(): Status {
    return this._status;
  }

  public get userId(): UserId {
    return this._userId;
  }

  public get todoType(): TodoTypeDomain {
    return this._todoType;
  }
}
