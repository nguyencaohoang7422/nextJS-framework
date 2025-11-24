import { MenuData } from "@/types/menu";
import { NextResponse } from "next/server";

// This would typically fetch from a database or external API
// based on user permissions
export async function GET() {
  try {
    // Mock data for production
    // In real app, you would fetch this from database based on user role/permissions
    const menuData: MenuData = {
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "📊",
          path: "/dashboard",
        },
        {
          id: "users",
          label: "Users",
          icon: "👥",
          path: "/users",
          permission: "users.view",
        },
        {
          id: "settings",
          label: "Settings",
          icon: "⚙️",
          children: [
            {
              id: "profile",
              label: "Profile",
              path: "/settings/profile",
            },
            {
              id: "preferences",
              label: "Preferences",
              path: "/settings/preferences",
            },
          ],
        },
        {
          id: "reports",
          label: "Reports",
          icon: "📈",
          path: "/reports",
          permission: "reports.view",
        },
      ],
    };

    return NextResponse.json(menuData);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
