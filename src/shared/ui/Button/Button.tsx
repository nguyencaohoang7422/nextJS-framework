"use client";

import { clsx } from "clsx";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
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
      // No need to set state when not delayed
    }, [loading]);

    const isLoading = typeof loading === "object" ? innerLoading : loading;

    const classes = clsx(
      styles.button,
      styles[`button-${type}`],
      styles[`button-${size}`],
      styles[`button-${shape}`],
      {
        [styles["button-loading"]]: isLoading,
        [styles["button-disabled"]]: disabled,
        [styles["button-danger"]]: danger,
        [styles["button-ghost"]]: ghost,
        [styles["button-block"]]: block,
        [styles["button-icon-only"]]: !children && icon,
      },
      className,
    );

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
      <span className={styles["button-loading-icon"]}>
        <svg className={styles.spinner} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </span>
    ) : icon ? (
      <span className={styles["button-icon"]}>{icon}</span>
    ) : null;

    const content = (
      <>
        {iconNode}
        {children && <span className={styles["button-text"]}>{children}</span>}
      </>
    );

    // Render as anchor if href is provided
    if (href && !disabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          className={classes}
          onClick={handleClick}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={htmlType}
        disabled={disabled || isLoading}
        className={classes}
        onClick={handleClick}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
