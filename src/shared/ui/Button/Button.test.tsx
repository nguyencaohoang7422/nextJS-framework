import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VariantProps } from 'class-variance-authority';
import { describe, expect, it, vi } from 'vitest';

import Button from './Button';
import { buttonVariants } from './Button.types';

// Test data với type chính xác
const variantTests: Array<{
  variant: VariantProps<typeof buttonVariants>['variant'];
  expected: string;
}> = [
  { variant: 'primary', expected: 'button-primary button-default' },
  { variant: 'secondary', expected: 'button-secondary button-default' },
  { variant: 'ghost', expected: 'button-ghost button-default' },
  { variant: 'outline', expected: 'button-outline button-default' },
  { variant: 'destructive', expected: 'button-destructive button-default' },
];

const sizeTests: Array<{
  size: VariantProps<typeof buttonVariants>['size'];
  expected: string;
}> = [
  { size: 'sm', expected: 'button-default button-sm' },
  { size: 'lg', expected: 'button-default button-lg' },
  { size: 'icon', expected: 'button-default button-icon' },
];

const user = userEvent.setup();

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  // ✅ Type-safe variant tests
  it.each(variantTests)(
    'renders $variant variant correctly',
    ({ variant, expected }) => {
      render(<Button variant={variant}>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(expected);
    },
  );

  // ✅ Type-safe size tests
  it.each(sizeTests)('renders $size size correctly', ({ size, expected }) => {
    render(<Button size={size}>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(expected);
  });

  // ✅ asChild test với proper typing
  it('renders as child component when asChild is true', () => {
    const LinkComponent = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement>
    >(({ children, className, ...props }, ref) => (
      <a ref={ref} data-testid="link" href="#" className={className} {...props}>
        {children}
      </a>
    ));
    LinkComponent.displayName = 'LinkComponent';

    render(
      <Button asChild variant="primary" size="sm">
        <LinkComponent>Link Button</LinkComponent>
      </Button>,
    );

    const link = screen.getByTestId('link');
    expect(link).toHaveClass('button-primary button-sm');
    expect(link).toHaveTextContent('Link Button');
  });

  // Các test còn lại giữ nguyên vì đã type-safe...
  it('shows loader and disables button when loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Submit
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector('svg')).toBeInTheDocument();
    expect(button).not.toHaveTextContent('Submit');
  });

  it('renders leftIcon and rightIcon correctly', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const rightIcon = <span data-testid="right-icon">→</span>;

    render(
      <Button iconLeft={leftIcon} iconRight={rightIcon}>
        Icon Button
      </Button>,
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('handles onClick correctly', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
