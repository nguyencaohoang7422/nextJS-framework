"use client";

import { Button as ShadcnButton } from "@/components/ui/button";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import React, { forwardRef, useEffect, useState } from "react";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | null,
  ButtonProps
>(
  (
    {
      type = "default",
      size = "default",
      shape = "default",
      htmlType = "button",
      disabled = false,
      loading = false,
      danger = false,
      ghost = false,
      block = false,
      icon,
      children,
      className,
      onClick,
      href,
      target,
      ...rest
    },
    ref,
  ) => {
    const [innerLoading, setInnerLoading] = useState<boolean>(false);

    // Handle loading delay
    useEffect(() => {
      if (typeof loading === "object" && loading?.delay) {
        const timer = setTimeout(() => {
          setInnerLoading(true);
        }, loading?.delay);
        return () => clearTimeout(timer);
      }
    }, [loading]);

    const isLoading = typeof loading === "object" ? innerLoading : loading;

    // Map custom button type to shadcn variant
    const getVariant = () => {
      if (danger) return "destructive";
      if (ghost) return "ghost";
      if (type === "primary") return "default";
      if (type === "dashed" || type === "default") return "outline";
      if (type === "text") return "ghost";
      if (type === "link") return "link";
      return "default";
    };

    // Map custom size to shadcn size
    const getShadcnSize = () => {
      if (size === "small") return "sm";
      if (size === "large") return "lg";
      return "default";
    };

    // Additional classes for custom features
    const additionalClasses = clsx({
      "w-full": block,
      "rounded-full": shape === "circle" || shape === "round",
      "aspect-square p-0": shape === "circle",
    });

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      if (disabled || isLoading) {
        e.preventDefault();
        return;
      }
      onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    };

    const iconNode = isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : icon ? (
      <span className="inline-flex items-center">{icon}</span>
    ) : null;

    const content = (
      <>
        {iconNode}
        {children && <span>{children}</span>}
      </>
    );

    // Render as anchor if href is provided
    if (href && !disabled) {
      return (
        <a
          href={href}
          target={target}
          className={clsx(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            additionalClasses,
            className,
          )}
          onClick={handleClick}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <ShadcnButton
        ref={ref as React.Ref<HTMLButtonElement>}
        type={htmlType}
        variant={getVariant()}
        size={getShadcnSize()}
        disabled={disabled || isLoading}
        className={clsx(additionalClasses, className)}
        onClick={handleClick}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </ShadcnButton>
    );
  },
);

Button.displayName = "Button";
