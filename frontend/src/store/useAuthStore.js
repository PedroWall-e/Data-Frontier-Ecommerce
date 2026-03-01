import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,

            login: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),

            updateUser: (user) => set({ user }),
        }),
        {
            name: 'data-frontier-auth',
        }
    )
);

export default useAuthStore;
