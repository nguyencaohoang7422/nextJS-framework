"use client";

import React, { useEffect } from "react";
import { useMe } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export function ProtectedClient({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) return <div>Loading...</div>;

  return <>{children}</>;
}
