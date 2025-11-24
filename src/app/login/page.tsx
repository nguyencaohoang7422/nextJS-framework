import { LoginForm } from "@/features/auth/components/LoginForm";
import { authApi } from "@/shared/api/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  // Check authentication
  try {
    const { result: user } = await authApi.me();
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
