import React from 'react';
import Image from 'next/image';

import ThemeTogglerTwo from '@/features/auth/components/ThemeTogglerTwo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
        {children}
        <div className="lg:w-1/2 h-full bg-slate-700 dark:bg-white/5 lg:grid items-center hidden">
          <div className="relative items-center justify-center flex z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <div></div>
            <div className="flex flex-col items-center max-w-xs">
              <Image width={231} height={48} src={'/next.svg'} alt="Logo" />
              <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 bg-black right-6 z-50 rounded-full sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
