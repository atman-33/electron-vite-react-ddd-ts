import { TodoTypeDto } from '../application/services/todo-type/dto/todo-type-dto';
import { AddTodoInput } from '../application/services/todo/add-todo-use-case';
import { DeleteTodoInput } from '../application/services/todo/delete-todo-use-case';
import { TodoDto } from '../application/services/todo/dto/todo-dto';
import { GetTodosByUserIdArgs } from '../application/services/todo/get-todos-by-user-id-use-case';
import { UpdateTodoInput } from '../application/services/todo/update-todo-use-case';
import { UserDto } from '../application/services/user/dto/user-dto';

/**
 * mainで定義した型をrendererで扱うための型
 */
export interface ApiType {
  UserDto: UserDto;
  TodoDto: TodoDto;
  TodoTypeDto: TodoTypeDto;
  GetTodosByUserIdArgs: GetTodosByUserIdArgs;
  AddTodoInput: AddTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  DeleteTodoInput: DeleteTodoInput;
}
