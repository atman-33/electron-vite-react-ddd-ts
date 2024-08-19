import { UserInputForm } from '@renderer/features/user/components/user-input-form';
import { UserList } from '@renderer/features/user/components/user-list';

const UserPage = () => {
  return (
    <div className="m-4 flex flex-col gap-8">
      <UserInputForm />
      <UserList />
    </div>
  );
};

export default UserPage;
