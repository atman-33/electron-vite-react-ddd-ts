import { SortOrder } from '../../value-objects/sort-order';
import { TodoTypeId } from '../../value-objects/todo-type-id';
import { TodoTypeName } from '../../value-objects/todo-type-name';

export class TodoTypeDomain {
  private constructor(
    private readonly _id: TodoTypeId,
    private _name: TodoTypeName,
    private _sortOrder: SortOrder
  ) {}

  public static reconstruct(
    id: TodoTypeId,
    name: TodoTypeName,
    sortOrder: SortOrder
  ): TodoTypeDomain {
    return new TodoTypeDomain(id, name, sortOrder);
  }

  public get id(): TodoTypeId {
    return this._id;
  }

  public get name(): TodoTypeName {
    return this._name;
  }

  public get sortOrder(): SortOrder {
    return this._sortOrder;
  }
}
