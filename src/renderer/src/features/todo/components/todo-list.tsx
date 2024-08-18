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
import { useEffect } from 'react';
import { useTodoStore } from '../stores/todo-store';

export const TodoList = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const todos = useTodoStore((state) => state.todos);
  const getTodosByUserId = useTodoStore((state) => state.getTodosByUserId);

  useEffect(() => {
    console.log('todo-list useEffect');
    if (selectedUser) {
      console.log('!');
      getTodosByUserId({ id: selectedUser.id });
      console.log('!!');
    }
  }, [selectedUser]);

  return (
    <>
      <div>{selectedUser?.id}</div>
      <div>{todos.length}</div>
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="font-medium">{todo.id}</TableCell>
              <TableCell>{todo.content}</TableCell>
              <TableCell className="text-center">
                {/* <Button variant="ghost" onClick={() => handleDeleteClick(user.id)}>
                🗑️
              </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
