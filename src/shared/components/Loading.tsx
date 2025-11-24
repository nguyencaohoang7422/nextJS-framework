"use client";

import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

/**
 * Spinner Component
 * Reusable loading spinner
 */
export function Spinner({
  size = "md",
  color = "var(--color-primary)",
}: SpinnerProps) {
  const sizeMap = {
    sm: "20px",
    md: "40px",
    lg: "60px",
  };

  return (
    <div
      className="spinner"
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderColor: `${color}33`,
        borderTopColor: color,
      }}
    />
  );
}

interface LoadingFullProps {
  message?: string;
}

/**
 * LoadingFull Component
 * Full page loading overlay
 */
export function LoadingFull({ message }: LoadingFullProps) {
  return (
    <div className="loading-full">
      <div className="loading-full-content">
        <Spinner size="lg" />
        {message && <p className="loading-full-message">{message}</p>}
      </div>
    </div>
  );
}

interface LoadingMainProps {
  message?: string;
}

/**
 * LoadingMain Component
 * Main content area loading overlay
 */
export function LoadingMain({ message }: LoadingMainProps) {
  return (
    <div className="loading-main">
      <div className="loading-main-content">
        <Spinner size="md" />
        {message && <p className="loading-main-message">{message}</p>}
      </div>
    </div>
  );
}

interface LoadingContainerProps {
  children: React.ReactNode;
  isLoading: boolean;
  message?: string;
  type?: "full" | "main";
}

/**
 * LoadingContainer Component
 * Wrapper that shows loading state over its children
 */
export function LoadingContainer({
  children,
  isLoading,
  message,
  type = "main",
}: LoadingContainerProps) {
  return (
    <div style={{ position: "relative" }}>
      {children}
      {isLoading &&
        (type === "full" ? (
          <LoadingFull message={message} />
        ) : (
          <LoadingMain message={message} />
        ))}
    </div>
  );
}
