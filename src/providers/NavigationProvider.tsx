'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { navigator } from '@/lib/navigation';

/**
 * NavigationProvider component
 * Initializes the navigation service with the Next.js router instance
 * This should be added to your root layout to enable navigation from anywhere
 */
export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Initialize the navigation service with the router instance
    navigator.setRouter(router);
  }, [router]);

  return <>{children}</>;
}
