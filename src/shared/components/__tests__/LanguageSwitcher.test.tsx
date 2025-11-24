import { render, screen, waitFor } from "@/test-utils";
import { describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "../LanguageSwitcher";

// Mock the hooks
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
    loading: false,
  }),
}));

vi.mock("@/hooks/useTrans", () => ({
  useTrans: () => ({
    trans: (key: string) => key,
    changeLanguage: vi.fn(),
    currentLanguage: "en",
    i18n: {
      language: "en",
      changeLanguage: vi.fn(),
    },
  }),
}));

describe("LanguageSwitcher", () => {
  it("renders language buttons", async () => {
    render(<LanguageSwitcher />);

    await waitFor(() => {
      expect(screen.getByText("english")).toBeInTheDocument();
      expect(screen.getByText("vietnamese")).toBeInTheDocument();
    });
  });

  it("highlights current language", async () => {
    render(<LanguageSwitcher />);

    await waitFor(() => {
      const englishButton = screen.getByText("english");
      expect(englishButton).toHaveClass("bg-blue-500");
    });
  });

  it("shows login button when user is not logged in", async () => {
    render(<LanguageSwitcher />);

    await waitFor(() => {
      expect(screen.getByText("Login (Mock)")).toBeInTheDocument();
    });
  });
});
