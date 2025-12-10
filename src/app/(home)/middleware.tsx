import { useSidebar } from '@/providers/SidebarProvider';

export default function HomeMiddleware({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
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
