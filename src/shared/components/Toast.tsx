"use client";

import { useEffect } from "react";
import { useToastStore } from "../lib/toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

interface ToastItemProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
}

function ToastItem({ type, message, onClose }: ToastItemProps) {
  useEffect(() => {
    // Add animation class
    const timer = setTimeout(() => {
      const el = document.getElementById(`toast-${message}`);
      if (el) el.classList.add("toast-show");
    }, 10);

    return () => clearTimeout(timer);
  }, [message]);

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div id={`toast-${message}`} className={`toast toast-${type}`} role="alert">
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
}
