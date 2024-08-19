import { showToastError, showToastSuccess } from '@renderer/utils/toast';
import { create } from 'zustand';
import { User } from '../types/user-type';

type UserStore = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  getUsers: () => void;
  registerUser: (name: string) => void;
  deleteUser: (id: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  getUsers: async () => {
    const res = await window.api.getUsers();

    if (res.status === 'success') {
      set({ users: res.data as User[] });
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      showToastError('unknown error');
    }
  },
  registerUser: async (name) => {
    const res = await window.api.registerUser({ name });

    if (res.status === 'success') {
      set((state) => ({ users: [...state.users, res.data as User] }));

      showToastSuccess('User registerd.');
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      showToastError('unknown error');
    }
  },
  deleteUser: async (id) => {
    const res = await window.api.deleteUser({ id });

    if (res.status === 'success') {
      set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
      showToastSuccess('User deleted.');
    } else if (res.status === 'error') {
      showToastError(res.message);
    } else {
      showToastError('unknown error');
    }
  }
}));
