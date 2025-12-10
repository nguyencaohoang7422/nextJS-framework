import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

import { ButtonProps, buttonVariants } from './Button.types';

const Loader = () => (
  <svg
    className="animate-spin h-4 w-4 mr-2 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = 'button',
      variant,
      size,
      children,
      loading,
      disabled,
      iconLeft,
      iconRight,
      tooltip,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = loading || disabled;
    const content = (
      <>
        {loading && <Loader />}
        {iconLeft && !loading && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && !loading && <span className="ml-2">{iconRight}</span>}
      </>
    );
    const buttonElement = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {content}
      </Comp>
    );
    if (tooltip) {
      // chưa có tooltip nên để tạm vậy
      return <>{buttonElement}</>;
    }
    return buttonElement;
  },
);
Button.displayName = 'Button';

export default Button;
