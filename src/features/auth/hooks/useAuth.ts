"use client";

import { useEffect } from "react";

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

export function useMe() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await authApi.me();
      return res.result as User;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.data) {
      // Sync with old store (backward compatibility)
      useAuthStore.getState().setUser(query.data);

      // Sync with new store
      useMainStore.getState().auth.setUser(query.data);
    }
  }, [query.data]);

  return query;
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      authApi.login({ username: payload.username, password: payload.password }),
    onSuccess() {
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
