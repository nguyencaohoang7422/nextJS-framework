import { http, HttpResponse } from "msw";

// Mock user data
const mockUser = {
  id: "1",
  username: "alice@example.com",
  firstname: "Alice",
  lastname: "Johnson",
  email: "alice@example.com",
  uiSettings: {
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#8b5cf6",
    },
  },
};

// Mock menu data
const mockMenu = [
  {
    id: "1",
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
  },
  {
    id: "2",
    label: "Users",
    path: "/users",
    icon: "users",
  },
  {
    id: "3",
    label: "Reports",
    path: "/reports",
    icon: "reports",
  },
];

export const handlers = [
  // Login endpoint
  http.post("*/users/login", async ({ request }) => {
    const body = await request.json();
    const { username, password } = body as {
      username: string;
      password: string;
    };

    // Mock validation
    if (username === "alice@example.com" && password === "password123") {
      return HttpResponse.json({
        success: true,
        result: mockUser,
      });
    }

    return HttpResponse.json(
      {
        success: false,
        error: "Invalid credentials",
      },
      { status: 401 },
    );
  }),

  // Logout endpoint
  http.post("*/users/logout", () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  // Get current user endpoint
  http.get("*/users/me", ({ cookies }) => {
    // Mock authentication check
    const token = cookies.token;

    if (token === "mock-token") {
      return HttpResponse.json({
        success: true,
        result: mockUser,
      });
    }

    return HttpResponse.json(
      {
        success: false,
        error: "Not authenticated",
      },
      { status: 401 },
    );
  }),

  // Get menu endpoint
  http.get("*/api/menu", () => {
    return HttpResponse.json({
      success: true,
      result: mockMenu,
    });
  }),
];
