"use client";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: user } = useAuth();
  // Check authentication
  try {
    if (user) {
      redirect("/dashboard");
    }
  } catch (e) {
    console.error("Auth check failed", e);
  }

  // Not logged in – render login form
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}
