import { render, screen, waitFor } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLogin } from "../../hooks/useAuth";
import { LoginForm } from "../LoginForm";

// Mock the hooks
vi.mock("../../hooks/useAuth", () => ({
  useLogin: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("LoginForm", () => {
  const mockMutateAsync = vi.fn();
  const mockUseLogin = useLogin as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLogin.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      isError: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it("renders login form with email and password inputs", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /đăng nhập/i }),
    ).toBeInTheDocument();
  });

  it("has default values for email and password", () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password",
    ) as HTMLInputElement;

    expect(emailInput.value).toBe("alice@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("allows user to type in email and password fields", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Password",
    ) as HTMLInputElement;

    await user.clear(emailInput);
    await user.type(emailInput, "test@example.com");
    expect(emailInput.value).toBe("test@example.com");

    await user.clear(passwordInput);
    await user.type(passwordInput, "newpassword");
    expect(passwordInput.value).toBe("newpassword");
  });

  it("submits form with correct credentials", async () => {
    const user = userEvent.setup();
    mockMutateAsync.mockResolvedValue({ success: true });

    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /đăng nhập/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        username: "alice@example.com",
        password: "password123",
      });
    });
  });

  it("handles login error", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockMutateAsync.mockRejectedValue(new Error("Login failed"));

    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /đăng nhập/i });
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(alertSpy).toHaveBeenCalledWith("Đăng nhập thất bại");
      },
      { timeout: 3000 },
    );

    alertSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
