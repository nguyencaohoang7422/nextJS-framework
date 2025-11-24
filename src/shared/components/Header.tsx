"use client";

import { useAuth, useUI } from "@/stores";

export const Header = () => {
  const { headerVisible, toggleSidebar } = useUI();
  const { user } = useAuth();

  // Don't render header if user is not logged in or header is hidden
  if (!user || !headerVisible) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-xl font-semibold">My Framework</h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Hi, {user.firstname}
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user.firstname?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
