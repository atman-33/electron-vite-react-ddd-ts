import { TodoInputForm } from '@renderer/features/todo/components/todo-input-form';
import { TodoList } from '@renderer/features/todo/components/todo-list';
import { TodoUserSelect } from '@renderer/features/todo/components/todo-user-select';

const TodoPage = () => {
  return (
    <div className="m-4 flex flex-col gap-8">
      <TodoUserSelect />
      <TodoInputForm />
      <TodoList />
    </div>
  );
};

export default TodoPage;
