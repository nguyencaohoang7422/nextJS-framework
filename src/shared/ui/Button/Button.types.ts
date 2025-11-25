import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonType = "primary" | "default" | "dashed" | "text" | "link";
export type ButtonSize = "small" | "default" | "large";
export type ButtonShape = "default" | "circle" | "round";
export type ButtonHTMLType = "submit" | "button" | "reset";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Button type variant */
  type?: ButtonType;

  /** Button size */
  size?: ButtonSize;

  /** Button shape */
  shape?: ButtonShape;

  /** HTML button type */
  htmlType?: ButtonHTMLType;

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Whether the button is in loading state */
  loading?: boolean | { delay?: number };

  /** Whether the button is dangerous (destructive action) */
  danger?: boolean;

  /** Whether the button has a ghost style (transparent background) */
  ghost?: boolean;

  /** Whether the button is block (full width) */
  block?: boolean;

  /** Icon to display in the button */
  icon?: ReactNode;

  /** Button content */
  children?: ReactNode;

  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Custom class name */
  className?: string;

  /** Redirect URL (renders as anchor) */
  href?: string;

  /** Target attribute for anchor */
  target?: string;
}
