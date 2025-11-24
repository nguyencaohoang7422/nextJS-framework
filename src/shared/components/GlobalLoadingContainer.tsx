"use client";

import { useLoadingStore } from "@/shared/lib/loading";
import { LoadingFull } from "./Loading";

/**
 * GlobalLoadingContainer
 * Renders full-page loading overlay when global loading state is active
 * Should be placed in root layout
 */
export function GlobalLoadingContainer() {
  const { isFullLoading, fullLoadingMessage } = useLoadingStore();

  if (!isFullLoading) return null;

  return <LoadingFull message={fullLoadingMessage} />;
}
