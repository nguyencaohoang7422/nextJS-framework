import { Outfit } from 'next/font/google';

import {
  I18nProvider,
  NavigationProvider,
  ReactQueryProvider,
  ThemeConfigProvider,
} from '@/providers';
import { GlobalLoadingContainer } from '@/shared/components/GlobalLoadingContainer';
import { ToastContainer } from '@/shared/components/Toast';
import { VersionCheck } from '@/shared/components/VersionCheck';

import '@/styles/global.css';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/shared/ui/ThemeProvider';

import AuthRedirectPage from './(auth)/page';

export const metadata: Metadata = {
  title: 'NEXTJS',
  description:
    'A modern Next.js framework with authentication and user management',
};
const outfit = Outfit({
  subsets: ['latin'],
});
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} select-none`}>
        <ReactQueryProvider>
          <NavigationProvider>
            <ThemeConfigProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <I18nProvider>
                  <VersionCheck />
                  <AuthRedirectPage>{children}</AuthRedirectPage>
                  <ToastContainer />
                  <GlobalLoadingContainer />
                </I18nProvider>
              </ThemeProvider>
            </ThemeConfigProvider>
          </NavigationProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
