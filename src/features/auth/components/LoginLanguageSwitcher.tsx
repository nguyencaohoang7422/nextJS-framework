"use client";

import { useTrans } from "@/hooks/useTrans";
import { memo } from "react";

export const LoginLanguageSwitcher = memo(() => {
  const { changeLanguage, currentLanguage } = useTrans();

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`text-sm font-medium transition-colors ${
          currentLanguage === "en"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => changeLanguage("vi")}
        className={`text-sm font-medium transition-colors ${
          currentLanguage === "vi"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        VI
      </button>
    </div>
  );
});

LoginLanguageSwitcher.displayName = "LoginLanguageSwitcher";
