import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTrans } from "../useTrans";

describe("useTrans", () => {
  it("should return translation function", () => {
    const { result } = renderHook(() => useTrans());

    expect(result.current.trans).toBeDefined();
    expect(typeof result.current.trans).toBe("function");
  });

  it("should return current language", () => {
    const { result } = renderHook(() => useTrans());

    expect(result.current.currentLanguage).toBe("en");
  });

  it("should have changeLanguage function", () => {
    const { result } = renderHook(() => useTrans());

    expect(result.current.changeLanguage).toBeDefined();
    expect(typeof result.current.changeLanguage).toBe("function");
  });

  it("should translate keys", () => {
    const { result } = renderHook(() => useTrans());

    const translated = result.current.trans("test.key");
    expect(translated).toBe("test.key"); // Mock returns the key itself
  });
});
