'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

import { authConfig } from '@/config/env';
import { navigator } from '@/lib/navigation';
import { authApi } from '@/shared/api/fetch';
import { ROUTES } from '@/shared/constants';
import { AUTH_SIGNIN_METHOD } from '@/shared/constants/constants';
import { toast } from '@/shared/lib/toast';
import { User } from '@/shared/types';
import { useStore as useMainStore } from '@/stores';

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
    queryKey: ['auth'],
    queryFn: async () => {
      return useAuthStore.getState().user;
    },
    initialData: useAuthStore.getState().user,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}

function setCookie(cookieName: string, cookieValue: string) {
  document.cookie = `${cookieName}=${cookieValue}; path=/;`;
}

// Type for login payload - supports both username/password and token authentication
type LoginPayload =
  | { type: 'credentials'; username: string; password: string }
  | { type: 'token'; token: string };

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      // Option 1: Login with username and password
      if (payload.type === AUTH_SIGNIN_METHOD.CREDENTIALS) {
        return await authApi.login({
          username: payload.username,
          password: payload.password,
        });
      }
      // Option 2: Login with token (sent via header)
      else if (payload.type === AUTH_SIGNIN_METHOD.TOKEN) {
        return await authApi.loginWithToken(payload.token);
      }
      throw new Error('Invalid login payload type');
    },
    onSuccess(query) {
      if (query?.result) {
        // Sync with old store (backward compatibility)
        useAuthStore.getState().setUser(query?.result);
        // Sync with new store
        useMainStore.getState().auth.setUser(query?.result);
        navigator.push(ROUTES.DASHBOARD);
        if (query?.result?.token) {
          setCookie(authConfig.cookieName, query?.result?.token);
        } else {
          throw new Error('Token is not found');
        }
      }
      // refetch me to populate user
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError(error) {
      // if(error?.response?.data?.message)
      toast.error(error.message);
    },
  });
}

function deleteCookie(cookieName: string) {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name === cookieName) {
      document.cookie = `${cookieName}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await authApi.logout(),
    onSuccess() {
      navigator.push(ROUTES.SIGN_IN);
      setTimeout(() => {
        queryClient.setQueryData(['auth'], null);
        useAuthStore.getState().clearUser();
        useMainStore.getState().auth.clearUser();
        deleteCookie(authConfig.cookieName);
      }, 1000);
    },
    onError() {
      toast.error('Network went wrong!');
    },
  });
}
