"use client";

import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";
import { Button, Input } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as y from "yup";
import { useLogin } from "../hooks/useAuth";

// Define validation schema
const loginSchema = y.object({
  username: y.string().min(6, "username phải có ít nhất 6 ký tự").required(""),
  password: y.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required(""),
});

type LoginFormData = y.InferType<typeof loginSchema>;

export function LoginForm() {
  const login = useLogin();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "vcvdev-demo01",
      password: "Vcv@123456",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login.mutateAsync({
        username: data.username,
        password: data.password,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Language Switcher Positioned Top Right */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Chào mừng bạn quay trở lại hệ thống
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>

                  <Input
                    {...field}
                    id="email-address"
                    type="text"
                    autoComplete="off"
                    placeholder="alice@example.com"
                    error={!!errors.username}
                    block
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mật khẩu
                  </label>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    error={!!errors.password}
                    block
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting || login.isPending}
              size="large"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
