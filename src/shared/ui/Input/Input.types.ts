import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Size of the input component.
   * @default 'default'
   */
  size?: "small" | "default" | "large";

  /**
   * Whether the input should take the full width of its container.
   * @default false
   */
  block?: boolean;

  /**
   * Optional icon to be displayed inside the input (e.g., left side).
   */
  icon?: React.ReactNode;

  /**
   * Whether the input is in an error state.
   * @default false
   */
  error?: boolean;

  /**
   * Optional custom class name for additional styling.
   */
  className?: string;
}
