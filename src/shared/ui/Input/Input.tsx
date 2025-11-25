import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./Input.module.css";
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
    const classes = clsx(
      styles.input,
      styles[`input-${size}`],
      {
        [styles["input-block"]]: block,
        [styles["input-error"]]: error,
        [styles["input-disabled"]]: disabled,
      },
      className,
    );

    return (
      <div className={styles.wrapper}>
        {icon && <span className={styles["input-icon"]}>{icon}</span>}
        <input ref={ref} className={classes} disabled={disabled} {...rest} />
      </div>
    );
  },
);

Input.displayName = "Input";
