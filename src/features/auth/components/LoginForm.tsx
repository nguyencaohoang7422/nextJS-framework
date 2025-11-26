'use client';

import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Lock, Mail, Sparkles } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { LoginFormData, loginSchema } from '@/schemas/auth';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { Button, Input } from '@/shared/ui';

import { useLogin } from '../hooks/useAuth';

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
      username: 'vcvdev-admin',
      password: 'Vcv@1234567',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login
        .mutateAsync({
          type: 'credentials',
          username: data.username,
          password: data.password,
        })
        .then((response) => {
          if (response?.success) {
            router.push('/dashboard');
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 bg-size-[200%_200%] animate-[gradient_15s_ease_infinite]"></div>

      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite]"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite] [animation-delay:2s]"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite] [animation-delay:4s]"></div>

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <div className="backdrop-blur-md bg-white rounded-lg p-1 border border-white/20">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/90  rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8 transform transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Đăng nhập
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Chào mừng bạn quay trở lại hệ thống
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Email Input */}
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <div className="group">
                      <Input
                        {...field}
                        id="email-address"
                        type="text"
                        autoComplete="off"
                        placeholder="alice@example.com"
                        error={!!errors.username}
                        block
                        icon={<Mail className="w-4 h-4" />}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-sm text-red-500 animate-[shake_0.3s_ease-in-out]">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Password Input */}
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Mật khẩu
                    </label>
                    <div className="group">
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        error={!!errors.password}
                        block
                        icon={<Lock className="w-4 h-4" />}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 animate-[shake_0.3s_ease-in-out]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer transition-all"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">
                  Ghi nhớ đăng nhập
                </span>
              </label>

              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting || login.isPending}
              size="large"
              className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
            >
              Đăng nhập
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Chưa có tài khoản?{' '}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
