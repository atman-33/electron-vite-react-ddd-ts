import { showToastError, showToastSuccess } from '@renderer/utils/toast';
import { create } from 'zustand';
import {
  AddTodoInput,
  DeleteTodoInput,
  GetTodosByUserIdArgs,
  Todo,
  UpdateTodoInput
} from '../types/todo-type';

type TodoStore = {
  todos: Todo[];
  getTodosByUserId: (getTodosByUserIdArgs: GetTodosByUserIdArgs) => void;
  addTodo: (addTodoData: AddTodoInput) => void;
  updateTodo: (updateTodoData: UpdateTodoInput) => void;
  deleteTodo: (deleteTodoData: DeleteTodoInput) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  getTodosByUserId: async (getTodosByUserIdArgs) => {
    const res = await window.api.getTodosByUserId(getTodosByUserIdArgs);

    if (res.status === 'success') {
      set({ todos: res.data as Todo[] });
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      showToastError('unknown error');
    }
  },
  addTodo: async (addTodoData) => {
    // console.log(addTodoData);
    const res = await window.api.addTodo(addTodoData);

    if (res.status === 'success') {
      set((state) => ({ todos: [...state.todos, res.data as Todo] }));
      showToastSuccess('Todo added.');
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      showToastError('unknown error');
    }
  },
  updateTodo: async (updateTodoData) => {
    const res = await window.api.updateTodo(updateTodoData);

    if (res.status === 'success') {
      set((state) => ({
        todos: state.todos.map((t) => {
          if (t.id === updateTodoData.id) {
            return {
              ...t,
              ...updateTodoData
            };
          }
          return t;
        })
      }));

      showToastSuccess('Todo updated.');
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      showToastError('unknown error');
    }
  },
  deleteTodo: async (deleteTodoData) => {
    const res = await window.api.deleteTodo(deleteTodoData);

    if (res.status === 'success') {
      set((state) => ({ todos: state.todos.filter((t) => t.id !== deleteTodoData.id) }));
      showToastSuccess('Todo deleted.');
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      showToastError('unknown error');
    }
  }
}));
