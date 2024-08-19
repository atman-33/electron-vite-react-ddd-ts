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
import { useEffect } from 'react';
import { useUserStore } from '../stores/user-store';

export const UserList = () => {
  const users = useUserStore((state) => state.users);
  const getUsers = useUserStore((state) => state.getUsers);
  const deleteUser = useUserStore((state) => state.deleteUser);

  useEffect(() => {
    console.log('useEffect executed');

    getUsers();
  }, [getUsers]);

  const handleDeleteClick = async (id: string) => {
    deleteUser(id);
  };

  return (
    <Table>
      <TableCaption>A list of registered users.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead>ID</TableHead> */}
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            {/* <TableCell className="text-xs">{user.id}</TableCell> */}
            <TableCell>{user.name}</TableCell>
            <TableCell className="text-center">
              <Button variant="ghost" onClick={() => handleDeleteClick(user.id)}>
                🗑️
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
