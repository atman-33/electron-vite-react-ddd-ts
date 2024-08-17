import { AddTodoInput, AddTodoUseCase } from '../../application/services/todo/add-todo-use-case';
import {
  DeleteTodoInput,
  DeleteTodoUseCase
} from '../../application/services/todo/delete-todo-use-case';
import { TodoDto } from '../../application/services/todo/dto/todo-dto';
import {
  GetTodosByUserIdArgs,
  GetTodosByUserIdUseCase
} from '../../application/services/todo/get-todos-by-user-id-use-case';
import {
  UpdateTodoInput,
  UpdateTodoUseCase
} from '../../application/services/todo/update-todo-use-case';
import { appContainer } from '../di';
import { JSendResponse } from '../shared/jsend-response';

const useTodoController = () => {
  const addTodo = async (addTodoData: AddTodoInput): Promise<JSendResponse<TodoDto>> => {
    const addTodoUseCase = appContainer.resolve(AddTodoUseCase);

    try {
      const todo = await addTodoUseCase.execute(addTodoData);
      return { status: 'success', data: todo };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const getTodosByUserId = async (
    getTodosByUserIdArgs: GetTodosByUserIdArgs
  ): Promise<JSendResponse<TodoDto[]>> => {
    const getTodosByUserIdUseCase = appContainer.resolve(GetTodosByUserIdUseCase);

    try {
      const todos = await getTodosByUserIdUseCase.execute(getTodosByUserIdArgs);
      return { status: 'success', data: todos };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const updateTodo = async (updateTodoData: UpdateTodoInput): Promise<JSendResponse<null>> => {
    const updateTodoUseCase = appContainer.resolve(UpdateTodoUseCase);

    try {
      await updateTodoUseCase.execute(updateTodoData);
      return { status: 'success', data: null };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const deleteTodo = async (deleteTodoData: DeleteTodoInput): Promise<JSendResponse<null>> => {
    const deleteTodoUseCase = appContainer.resolve(DeleteTodoUseCase);

    try {
      await deleteTodoUseCase.execute(deleteTodoData);
      return { status: 'success', data: null };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  return {
    addTodo,
    getTodosByUserId,
    updateTodo,
    deleteTodo
  };
};

export const todoController = useTodoController();
