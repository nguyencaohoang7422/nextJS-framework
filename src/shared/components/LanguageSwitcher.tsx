"use client";
import { useTrans } from "@/hooks/useTrans";
import clsx from "clsx";
import { Button } from "../ui";
export const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useTrans();

  return (
    <div className="flex gap-2 transition-all duration-500 items-center">
      <Button
        onClick={() => changeLanguage("en")}
        className={clsx(
          `px-3 py-1 rounded `,
          currentLanguage === "en" ? "bg-blue-500 text-white" : "bg-gray-200",
        )}
      >
        {"English"}
      </Button>
      <Button
        onClick={() => changeLanguage("vi")}
        className={clsx(
          `px-3 py-1 rounded `,
          currentLanguage === "vi" ? "bg-blue-500 text-white" : "bg-gray-200",
        )}
      >
        {"Tiếng Việt"}
      </Button>
    </div>
  );
};
