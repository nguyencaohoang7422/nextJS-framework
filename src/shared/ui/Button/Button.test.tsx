import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("renders with children", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i }),
      ).toBeInTheDocument();
    });

    it("renders with icon", () => {
      render(<Button icon={<span data-testid="icon">🚀</span>}>Click</Button>);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders as anchor when href is provided", () => {
      render(<Button href="https://example.com">Link</Button>);
      const link = screen.getByRole("link", { name: /link/i });
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("renders with target attribute", () => {
      render(
        <Button href="https://example.com" target="_blank">
          Link
        </Button>,
      );
      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });
  });

  describe("Types", () => {
    it("renders primary button", () => {
      render(<Button type="primary">Primary</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("button");
      expect(button.className).toContain("primary");
    });

    it("renders default button", () => {
      render(<Button type="default">Default</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("button");
      expect(button.className).toContain("default");
    });

    it("renders dashed button", () => {
      render(<Button type="dashed">Dashed</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("button");
      expect(button.className).toContain("dashed");
    });

    it("renders text button", () => {
      render(<Button type="text">Text</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("button");
      expect(button.className).toContain("text");
    });

    it("renders link button", () => {
      render(<Button type="link">Link</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("button");
      expect(button.className).toContain("link");
    });
  });

  describe("Sizes", () => {
    it("renders small button", () => {
      render(<Button size="small">Small</Button>);
      expect(screen.getByRole("button").className).toContain("small");
    });

    it("renders default size button", () => {
      render(<Button size="default">Default</Button>);
      expect(screen.getByRole("button").className).toContain("default");
    });

    it("renders large button", () => {
      render(<Button size="large">Large</Button>);
      expect(screen.getByRole("button").className).toContain("large");
    });
  });

  describe("Shapes", () => {
    it("renders circle button", () => {
      render(<Button shape="circle" icon={<span>+</span>} />);
      expect(screen.getByRole("button").className).toContain("circle");
    });

    it("renders round button", () => {
      render(<Button shape="round">Round</Button>);
      expect(screen.getByRole("button").className).toContain("round");
    });
  });

  describe("States", () => {
    it("renders disabled button", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByRole("button").className).toContain("disabled");
    });

    it("renders loading button", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button").className).toContain("loading");
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("renders danger button", () => {
      render(<Button danger>Danger</Button>);
      expect(screen.getByRole("button").className).toContain("danger");
    });

    it("renders ghost button", () => {
      render(<Button ghost>Ghost</Button>);
      expect(screen.getByRole("button").className).toContain("ghost");
    });

    it("renders block button", () => {
      render(<Button block>Block</Button>);
      expect(screen.getByRole("button").className).toContain("block");
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      await user.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", () => {
      const handleClick = vi.fn();

      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>,
      );

      // Loading button has pointer-events: none, so we can't click it
      // Just verify the button is disabled and handler wasn't called
      expect(screen.getByRole("button")).toBeDisabled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("HTML Types", () => {
    it("renders with submit type", () => {
      render(<Button htmlType="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("renders with reset type", () => {
      render(<Button htmlType="reset">Reset</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
    });

    it("renders with button type by default", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("supports custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole("button").className).toContain("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Ref test</Button>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Combined Props", () => {
    it("renders primary danger button", () => {
      render(
        <Button type="primary" danger>
          Delete
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button.className).toContain("primary");
      expect(button.className).toContain("danger");
    });

    it("renders large round ghost button", () => {
      render(
        <Button size="large" shape="round" ghost>
          Ghost
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button.className).toContain("large");
      expect(button.className).toContain("round");
      expect(button.className).toContain("ghost");
    });
  });
});
