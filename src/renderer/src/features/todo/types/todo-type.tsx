export type Todo = {
  id: string;
  content: string;
  deadline: Date | null;
  status: number;
  userId: string;
  todoType: TodoType;
};

export type TodoType = {
  id: string;
  name: string;
  sortOrder: number;
};

export type GetTodosByUserIdArgs = {
  id: string;
};

export type AddTodoInput = {
  content: string;
  deadline: Date | null;
  status: number;
  userId: string;
  todoType: {
    id: string;
    name: string;
    sortOrder: number;
  };
};

export type UpdateTodoInput = {
  id: string;
  content: string;
  deadline: Date | null;
  status: number;
  userId: string;
  todoType: {
    id: string;
    name: string;
    sortOrder: number;
  };
};

export type DeleteTodoInput = {
  id: string;
};
