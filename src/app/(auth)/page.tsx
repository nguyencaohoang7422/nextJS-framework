'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { authConfig } from '@/config/env';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { navigator } from '@/lib/navigation';
import { ROUTES } from '@/shared/constants';
import { AUTH_SIGNIN_METHOD } from '@/shared/constants/constants';
import { useAuth } from '@/stores';

export default function AuthRedirectPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const authStore = useAuth(); // Get the entire auth slice from Zustand
  const user = authStore.user; // Extract user from the auth slice
  const login = useLogin();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const hasAttemptedLogin = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (user) {
      navigator.push(ROUTES.DASHBOARD);
      setIsChecking(false);
      return;
    }

    if (hasAttemptedLogin.current) {
      return;
    }

    const getTokenInCookie = () => {
      const cookies = document.cookie.split(';').reduce(
        (acc: Record<string, string>, cookie: string) => {
          const [key, value] = cookie.trim().split('=');
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, string>,
      );
      return cookies[authConfig.cookieName];
    };

    const attemptAutoLogin = async () => {
      try {
        const token = getTokenInCookie();
        if (token) {
          hasAttemptedLogin.current = true;
          await login.mutateAsync({
            type: AUTH_SIGNIN_METHOD.TOKEN,
            token: token,
          });
        } else {
          router.push(ROUTES.SIGN_IN);
        }
      } catch (e) {
        router.push(ROUTES.SIGN_IN);
      } finally {
        setIsChecking(false);
      }
    };

    attemptAutoLogin();
  }, [login, router, user]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
