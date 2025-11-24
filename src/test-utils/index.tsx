import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";

// Create a custom render function that includes all providers
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing library
export * from "@testing-library/react";
export { customRender as render };

// Mock data helpers
export const mockUser = {
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

export const mockLoginCredentials = {
  username: "alice@example.com",
  password: "password123",
};

// Wait for async updates
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));
