import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/shadcn/ui/select';
import { useLayoutEffect } from 'react';
import { useTodoTyoeStore } from '../stores/todo-type-store';

export const TodoTypeSelect = () => {
  const todoTypes = useTodoTyoeStore((store) => store.todoTypes);
  const getTodoTypes = useTodoTyoeStore((store) => store.getTodoTypes);
  const setSelectedTodoType = useTodoTyoeStore((store) => store.setSelectedTodoType);
  const selectedTodoType = useTodoTyoeStore((store) => store.selectedTodoType);
  // const [selectedOption, setSelectedOption] = useState<string | undefined>();

  useLayoutEffect(() => {
    getTodoTypes();
    if (todoTypes.length > 0) {
      setSelectedTodoType(todoTypes.at(0)!);
      // setSelectedOption(todoTypes.at(0)?.id);
    }
  }, []);

  const handleOnValueChange = (value: string) => {
    const todoType = todoTypes.find((t) => t.id === value);

    if (!todoType) {
      return;
    }

    setSelectedTodoType(todoType);
    // setSelectedOption(todoType.id);
  };

  return (
    <>
      <Select value={selectedTodoType?.id} onValueChange={(value) => handleOnValueChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Todo type" />
        </SelectTrigger>
        <SelectContent>
          {todoTypes.map((todoType) => (
            <SelectItem key={todoType.id} value={todoType.id}>
              {todoType.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
