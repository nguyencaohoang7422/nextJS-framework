"use client";

import { useAuth, useUI } from "@/stores";
import { MenuItem } from "@/types/menu";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, menuItems, menuLoading, loadMenuData } =
    useUI();
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Load menu data on mount
  useEffect(() => {
    loadMenuData();
  }, [loadMenuData]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen, setSidebarOpen]);

  // Don't render sidebar if user is not logged in
  // IMPORTANT: This must be after all hooks
  if (!user) {
    return null;
  }

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <li key={item.id}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpand(item.id)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
              style={{ paddingLeft: `${(level + 1) * 1}rem` }}
            >
              <span className="flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isExpanded && (
              <ul className="mt-1 space-y-1">
                {item.children?.map((child) =>
                  renderMenuItem(child, level + 1),
                )}
              </ul>
            )}
          </>
        ) : (
          <a
            href={item.path}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ paddingLeft: `${(level + 1) * 1}rem` }}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </a>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {menuLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ul className="space-y-2">
                {menuItems.map((item) => renderMenuItem(item))}
              </ul>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-sm text-gray-500">My Framework v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};
