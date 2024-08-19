import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/shadcn/ui/select';
import { useUserStore } from '@renderer/features/user/stores/user-store';
import { useEffect } from 'react';

export const TodoUserSelect = () => {
  const users = useUserStore((store) => store.users);
  const getUsers = useUserStore((store) => store.getUsers);
  const setSelectedUser = useUserStore((store) => store.setSelectedUser);
  const selectedUser = useUserStore((store) => store.selectedUser);

  useEffect(() => {
    getUsers();
  }, []);

  const handleOnValueChange = (value: string) => {
    const user = users.find((u) => u.id === value);

    if (!user) {
      throw new Error('選択したユーザーが存在しません');
    }

    setSelectedUser(user);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="text-sm">ユーザーを選択してください</div>
        <Select value={selectedUser?.id} onValueChange={(value) => handleOnValueChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Username" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
