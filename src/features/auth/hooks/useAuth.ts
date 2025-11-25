"use client";

import { authApi } from "@/shared/api/auth";
import { User } from "@/shared/types";
import { useStore as useMainStore } from "@/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";

type authStore = User | null;

type AuthState = {
  user: authStore;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  clearUser: () => set({ user: null }),
}));

export function useAuth() {
  // const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      return useAuthStore.getState().user;
    },
    initialData: useAuthStore.getState().user,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      authApi.login({ username: payload.username, password: payload.password }),
    onSuccess(query) {
      if (query?.result) {
        // Sync with old store (backward compatibility)
        useAuthStore.getState().setUser(query?.result);

        // Sync with new store
        useMainStore.getState().auth.setUser(query?.result);
      }
      // refetch me to populate user
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess() {
      queryClient.setQueryData(["auth"], null);

      // Clear old store (backward compatibility)
      useAuthStore.getState().clearUser();

      // Clear new store
      useMainStore.getState().auth.clearUser();
    },
  });
}
