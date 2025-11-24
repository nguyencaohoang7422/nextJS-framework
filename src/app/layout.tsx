import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { GlobalLoadingContainer } from "@/shared/components/GlobalLoadingContainer";
import { ToastContainer } from "@/shared/components/Toast";
import "@/styles/global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Framework - User Management",
  description:
    "A modern Next.js framework with authentication and user management",
};

import { VersionCheck } from "@/shared/components/VersionCheck";

import { I18nProvider } from "@/providers/I18nProvider";

import { ThemeProvider } from "@/providers/ThemeProvider";

export default function RootLayout({
  children,
  sidebar,
  header,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
}) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>
        <ReactQueryProvider>
          <ThemeProvider>
            <I18nProvider>
              {header}
              {sidebar}
              <VersionCheck />
              {children}
              <ToastContainer />
              <GlobalLoadingContainer />
            </I18nProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
