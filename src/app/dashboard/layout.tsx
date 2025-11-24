"use client";

import { useLogout, useMe } from "@/features/auth/hooks/useAuth";
import { LoadingMain } from "@/shared/components/Loading";
import { useLoadingStore } from "@/shared/lib/loading";
import { toast } from "@/shared/lib/toast";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Users", href: "/dashboard/users", icon: "👥" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  { name: "Profile", href: "/dashboard/profile", icon: "👤" },
  { name: "Loading Demo", href: "/dashboard/loading-demo", icon: "⏳" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useMe();
  const logout = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMainLoading, mainLoadingMessage } = useLoadingStore();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            className="spinner"
            style={{ width: "40px", height: "40px", margin: "0 auto 1rem" }}
          />
          <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-logo">
            {sidebarOpen ? "My Framework" : "MF"}
          </h1>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {sidebarOpen && <span className="nav-text">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h2 className="header-title">
              {navigation.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h2>
          </div>

          <div className="header-right">
            <div className="user-menu">
              <div className="user-info">
                <span className="user-name">
                  {user.firstname || user.username}
                </span>
                <span className="user-email">{user.username}</span>
              </div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleLogout}
                disabled={logout.isPending}
              >
                {logout.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="dashboard-content" style={{ position: "relative" }}>
          {children}
          {isMainLoading && <LoadingMain message={mainLoadingMessage} />}
        </main>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>© 2024 My Framework. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
