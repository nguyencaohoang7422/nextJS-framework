import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center">
        <LoginForm />
      </main>
    </div>
  );
}
