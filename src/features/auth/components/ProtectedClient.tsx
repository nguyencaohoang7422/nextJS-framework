'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/constants';

import { useAuth } from '../hooks/useAuth';

export function ProtectedClient({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we are done loading, there is no error, and no user
    if (!isLoading && !user && !isError) {
      router.replace(ROUTES.SIGN_IN);
    }
  }, [isLoading, user, isError, router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  // If there's an error (e.g. 401), we might want to redirect to login as well,
  // but let's handle it safely.
  if (isError || !user) {
    // Optional: Render nothing or a message while redirecting
    return null;
  }

  return <>{children}</>;
}
