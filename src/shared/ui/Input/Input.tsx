import { Input as ShadcnInput } from "@/components/ui/input";
import clsx from "clsx";
import { forwardRef } from "react";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "default",
      block = false,
      icon,
      error = false,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    // Map size to height classes
    const sizeClasses = {
      small: "h-8 text-xs",
      default: "h-9 text-sm",
      large: "h-10 text-base",
    };

    const inputClasses = clsx(
      sizeClasses[size],
      {
        "w-full": block,
        "border-destructive focus-visible:ring-destructive": error,
        "pl-10": icon, // Add left padding if icon exists
      },
      className,
    );

    // If there's an icon, wrap in a container
    if (icon) {
      return (
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
          <ShadcnInput
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            {...rest}
          />
        </div>
      );
    }

    return (
      <ShadcnInput
        ref={ref}
        className={inputClasses}
        disabled={disabled}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
