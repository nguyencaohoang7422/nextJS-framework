'use client';

// import Backdrop from "@/layout/Backdrop";
import React from 'react';

import Backdrop from '@/features/header/components/Backdrop';
import { SidebarProvider } from '@/providers/SidebarProvider';

import HomeMiddleware from './middleware';

export default function Layout({
  children,
  sidebar,
  header,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen xl:flex">
        {/* sidebar đã có <aside> bên trong */}
        {sidebar}
        <Backdrop />
        {/* header đã có <header> bên trong */}
        <HomeMiddleware header={header}>{children}</HomeMiddleware>
      </div>
    </SidebarProvider>
  );
}
