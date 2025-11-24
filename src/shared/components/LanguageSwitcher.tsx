"use client";

import { useTrans } from "@/hooks/useTrans";

export const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage, trans } = useTrans();

  return (
    <div className="flex gap-2 transition-all duration-500 items-center">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded ${
          currentLanguage === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {trans("english")}
      </button>
      <button
        onClick={() => changeLanguage("vi")}
        className={`px-3 py-1 rounded ${
          currentLanguage === "vi" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {trans("vietnamese")}
      </button>

      <div className="h-6 w-px bg-gray-300 mx-2"></div>
    </div>
  );
};
