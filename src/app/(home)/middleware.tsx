import type { Metadata } from 'next';

import { useSidebar } from '@/providers/SidebarProvider';
import { useUIStore } from '@/stores/useUIStore';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
};
export default function HomeMiddleware({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const { isHovered, isMobileOpen } = useSidebar();
  const { sidebarOpen } = useUIStore();
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : sidebarOpen || isHovered
      ? 'lg:ml-[290px]'
      : 'lg:ml-[90px]';

  return (
    <div
      className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
    >
      {header}
      <main className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
        {children}
      </main>
    </div>
  );
}
