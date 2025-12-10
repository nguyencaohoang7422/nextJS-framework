'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeftIcon, EyeClosedIcon, EyeIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { LoginFormData, loginSchema } from '@/schemas/auth';
import { Button, Checkbox, Input } from '@/shared/ui';

import { useLogin } from '../hooks/useAuth';

export function SignUpForm() {
  const login = useLogin();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    <div className="flex flex-col h-full flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign in with Google
              </button>
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="21"
                  className="fill-current"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
                </svg>
                Sign in with X
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <form>
              <div className="space-y-6">
                <div>
                  <label>
                    Email <span className="text-error-500">*</span>{' '}
                    <Input placeholder="info@gmail.com" type="email" />
                  </label>
                </div>
                <div>
                  <label>
                    Password <span className="text-error-500">*</span>{' '}
                    <div className="relative">
                      <Input
                        //  autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeClosedIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        setIsChecked(checked === true)
                      }
                    />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {''}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
  //     {/* Animated Gradient Background */}
  //     <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 bg-size-[200%_200%] animate-[gradient_15s_ease_infinite]"></div>

  //     {/* Animated Background Orbs */}
  //     <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite]"></div>
  //     <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite] [animation-delay:2s]"></div>
  //     <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite] [animation-delay:4s]"></div>

  //     {/* Language Switcher */}
  //     <div className="absolute top-6 right-6 z-20">
  //       <div className="backdrop-blur-md bg-white rounded-lg p-1 border border-white/20">
  //         <LanguageSwitcher />
  //       </div>
  //     </div>

  //     {/* Login Card */}
  //     <div className="relative z-10 w-full max-w-md">
  //       <div className="backdrop-blur-xl bg-white/90  rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8 transform transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
  //         {/* Header */}
  //         <div className="text-center space-y-2">
  //           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
  //             <Sparkles className="w-8 h-8 text-white" />
  //           </div>
  //           <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
  //             Đăng nhập
  //           </h2>
  //           <p className="text-sm text-gray-600 dark:text-gray-400">
  //             Chào mừng bạn quay trở lại hệ thống
  //           </p>
  //         </div>

  //         {/* Form */}
  //         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
  //           <div className="space-y-4">
  //             {/* Email Input */}
  //             <Controller
  //               control={control}
  //               name="username"
  //               render={({ field }) => (
  //                 <div className="space-y-2">
  //                   <label
  //                     htmlFor="email-address"
  //                     className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
  //                   >
  //                     Email
  //                   </label>
  //                   <div className="group relative">
  //                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
  //                       <Mail className="w-4 h-4" />
  //                     </span>
  //                     <Input
  //                       {...field}
  //                       id="email-address"
  //                       type="text"
  //                       autoComplete="off"
  //                       placeholder="alice@example.com"
  //                       className={`pl-10 w-full transition-all duration-200 focus:scale-[1.02] ${errors.username ? 'border-destructive' : ''}`}
  //                     />
  //                   </div>
  //                   {errors.username && (
  //                     <p className="text-sm text-red-500 animate-[shake_0.3s_ease-in-out]">
  //                       {errors.username.message}
  //                     </p>
  //                   )}
  //                 </div>
  //               )}
  //             />

  //             {/* Password Input */}
  //             <Controller
  //               control={control}
  //               name="password"
  //               render={({ field }) => (
  //                 <div className="space-y-2">
  //                   <label
  //                     htmlFor="password"
  //                     className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
  //                   >
  //                     Mật khẩu
  //                   </label>
  //                   <div className="group relative">
  //                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
  //                       <Lock className="w-4 h-4" />
  //                     </span>
  //                     <Input
  //                       {...field}
  //                       id="password"
  //                       type="password"
  //                       autoComplete="current-password"
  //                       placeholder="••••••••"
  //                       className={`pl-10 w-full transition-all duration-200 focus:scale-[1.02] ${errors.password ? 'border-destructive' : ''}`}
  //                     />
  //                   </div>
  //                   {errors.password && (
  //                     <p className="text-sm text-red-500 animate-[shake_0.3s_ease-in-out]">
  //                       {errors.password.message}
  //                     </p>
  //                   )}
  //                 </div>
  //               )}
  //             />
  //           </div>

  //           {/* Remember Me & Forgot Password */}
  //           <div className="flex items-center justify-between text-sm">
  //             <label className="flex items-center space-x-2 cursor-pointer group">
  //               <input
  //                 id="remember-me"
  //                 name="remember-me"
  //                 type="checkbox"
  //                 className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer transition-all"
  //               />
  //               <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">
  //                 Ghi nhớ đăng nhập
  //               </span>
  //             </label>

  //             <a
  //               href="#"
  //               className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
  //             >
  //               Quên mật khẩu?
  //             </a>
  //           </div>

  //           {/* Submit Button */}
  //           <Button
  //             type="submit"
  //             disabled={isSubmitting || login.isPending}
  //             size="lg"
  //             className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
  //           >
  //             {(isSubmitting || login.isPending) && (
  //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //             )}
  //             Đăng nhập
  //           </Button>
  //         </form>

  //         {/* Footer */}
  //         <div className="text-center text-sm text-gray-600 dark:text-gray-400">
  //           Chưa có tài khoản?{' '}
  //           <a
  //             href="#"
  //             className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
  //           >
  //             Đăng ký ngay
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
