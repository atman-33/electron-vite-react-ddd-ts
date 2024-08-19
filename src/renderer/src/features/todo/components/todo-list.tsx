import { Button } from '@renderer/components/shadcn/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/shadcn/ui/table';
import { useUserStore } from '@renderer/features/user/stores/user-store';
import { formatDate } from '@renderer/utils/date-util';
import { useEffect } from 'react';
import { useTodoStore } from '../stores/todo-store';
import { statusToText } from '../utils/status-converter';

export const TodoList = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const todos = useTodoStore((state) => state.todos);
  const getTodosByUserId = useTodoStore((state) => state.getTodosByUserId);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  useEffect(() => {
    // console.log('todo-list useEffect');
    if (selectedUser) {
      getTodosByUserId({ id: selectedUser.id });
    }
  }, [selectedUser]);

  const handleDeleteClick = (id: string): void => {
    deleteTodo({ id });
  };

  return (
    <>
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>TodoType</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo) => (
            <TableRow key={todo.id}>
              {/* <TableCell className="text-xs">{todo.id}</TableCell> */}
              <TableCell>{todo.todoType.name}</TableCell>
              <TableCell>{todo.content}</TableCell>
              <TableCell>{formatDate(todo.deadline, 'yyyy/MM/dd')}</TableCell>
              <TableCell>{statusToText(todo.status)}</TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" onClick={() => handleDeleteClick(todo.id)}>
                  🗑️
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
