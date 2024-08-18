import { toast } from 'sonner';
import { create } from 'zustand';
import { User } from '../types';

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
      toast.error(res.message, {
        closeButton: true,
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
    }
  },
  registerUser: async (name) => {
    const res = await window.api.registerUser({ name });

    if (res.status === 'success') {
      set((state) => ({ users: [...state.users, res.data as User] }));

      toast.success('User registerd.', {
        closeButton: true,
        duration: 2000,
        position: 'bottom-center'
      });
    } else if (res.status === 'error') {
      toast.error(res.message, {
        closeButton: true,
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
    }
  },
  deleteUser: async (id) => {
    const res = await window.api.deleteUser({ id });

    if (res.status === 'success') {
      set((state) => ({ users: state.users.filter((u) => u.id !== id) }));

      toast.success('User deleted.', {
        closeButton: true,
        duration: 2000,
        position: 'bottom-center'
      });
    } else if (res.status === 'error') {
      toast.error(res.message, {
        closeButton: true,
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
    }
  }
}));
