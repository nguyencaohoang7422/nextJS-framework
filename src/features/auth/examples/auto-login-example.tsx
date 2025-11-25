/**
 * Example: Auto-Login Component
 *
 * Ví dụ này minh họa cách sử dụng token authentication để tự động đăng nhập
 * khi user đã có token trong cookie (ví dụ: sau khi refresh page)
 */

"use client";

import { useLogin } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AutoLoginExample() {
  const login = useLogin();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const attemptAutoLogin = async () => {
      try {
        // Phương thức 2: Đăng nhập với token
        // Token sẽ được tự động lấy từ cookie và gửi qua header
        await login.mutateAsync({
          type: "token",
          token: "", // Token field chỉ để type checking, actual token lấy từ cookie
        });

        // Nếu thành công, redirect đến dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Auto-login failed:", error);
        // Token không hợp lệ hoặc đã hết hạn, redirect về login
        router.push("/login");
      } finally {
        setIsChecking(false);
      }
    };

    attemptAutoLogin();
  }, []);

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

  return null;
}

/**
 * Example: Manual Token Login
 *
 * Ví dụ khi bạn nhận token từ nguồn khác (SSO, deep link, etc.)
 */
export function ManualTokenLoginExample() {
  const login = useLogin();
  const router = useRouter();

  const handleSSOLogin = async (tokenFromSSO: string) => {
    try {
      // Lưu token vào cookie trước (nếu cần)
      // document.cookie = `${authConfig.cookieName}=${tokenFromSSO}`;

      // Đăng nhập với token
      await login.mutateAsync({
        type: "token",
        token: tokenFromSSO,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("SSO login failed:", error);
      alert("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <button onClick={() => handleSSOLogin("example-token-from-sso")}>
        Đăng nhập với SSO
      </button>
    </div>
  );
}

/**
 * Example: Traditional Login Form
 *
 * Ví dụ đăng nhập với username và password (đã implement trong LoginForm.tsx)
 */
export function TraditionalLoginExample() {
  const login = useLogin();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Phương thức 1: Đăng nhập với username và password
      await login.mutateAsync({
        type: "credentials",
        username,
        password,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
