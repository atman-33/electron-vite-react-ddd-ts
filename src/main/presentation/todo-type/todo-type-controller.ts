import { TodoTypeDto } from '../../application/services/todo-type/dto/todo-type-dto';
import { GetTodoTypesUseCase } from '../../application/services/todo-type/get-todo-types-use-case';
import { appContainer } from '../di';
import { JSendResponse } from '../shared/jsend-response';

const useTodoTypeController = () => {
  const getTodoTypes = async (): Promise<JSendResponse<TodoTypeDto[]>> => {
    const getTodoTypesUseCase = appContainer.resolve(GetTodoTypesUseCase);

    try {
      const todoTypes = await getTodoTypesUseCase.execute();
      return { status: 'success', data: todoTypes };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  return {
    getTodoTypes
  };
};

export const todoTypeController = useTodoTypeController();
