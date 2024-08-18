import { toast } from 'sonner';
import { create } from 'zustand';
import {
  AddTodoInput,
  DeleteTodoInput,
  GetTodosByUserIdArgs,
  Todo,
  UpdateTodoInput
} from '../types';

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
      toast.error(res.message, {
        closeButton: true,
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
    }
  },
  addTodo: async (addTodoData) => {
    const res = await window.api.addTodo(addTodoData);

    if (res.status === 'success') {
      set((state) => ({ todos: [...state.todos, res.data as Todo] }));

      toast.success('Todo added.', {
        closeButton: true,
        duration: 2000,
        position: 'bottom-center'
      });
    } else if (res.status === 'error') {
      toast.error(res.message, {
        closeButton: true,
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
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

      toast.success('Todo updated.', {
        closeButton: true,
        duration: 2000,
        position: 'bottom-center'
      });
    } else if (res.status === 'error') {
      toast.error(res.message, {
        closeButton: true,
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
    }
  },
  deleteTodo: async (deleteTodoData) => {
    const res = await window.api.deleteTodo(deleteTodoData);

    if (res.status === 'success') {
      set((state) => ({ todos: state.todos.filter((t) => t.id !== deleteTodoData.id) }));

      toast.success('Todo deleted.', {
        closeButton: true,
        duration: 2000,
        position: 'bottom-center'
      });
    } else if (res.status === 'error') {
      toast.error(res.message, {
        closeButton: true,
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
    }
  }
}));
