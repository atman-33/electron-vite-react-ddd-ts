import { AddTodoInput, AddTodoUseCase } from '../../application/services/todo/add-todo-use-case';
import { TodoDto } from '../../application/services/todo/dto/todo-dto';
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

  return {
    addTodo
  };
};

export const todoController = useTodoController();
