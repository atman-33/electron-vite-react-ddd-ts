import { showToastError } from '@renderer/utils/toast';
import { create } from 'zustand';
import { TodoType } from '../types/todo-type';

type TodoTypeStore = {
  todoTypes: TodoType[];
  selectedTodoType: TodoType | null;
  setSelectedTodoType: (todoType: TodoType) => void;
  getTodoTypes: () => void;
};

export const useTodoTyoeStore = create<TodoTypeStore>((set) => ({
  todoTypes: [],
  selectedTodoType: null,
  setSelectedTodoType: (todoType) => {
    set({ selectedTodoType: todoType });
  },
  getTodoTypes: async () => {
    const res = await window.api.getTodoTypes();

    if (res.status === 'success') {
      set({ todoTypes: res.data as TodoType[] });
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      throw new Error('unknown error');
    }
  }
}));
