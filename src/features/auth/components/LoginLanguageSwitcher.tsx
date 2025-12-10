'use client';

import { memo, useState } from 'react';

import { useTrans } from '@/hooks/useTrans';
import Button from '@/shared/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown';

export const LoginLanguageSwitcher = memo(() => {
  const { changeLanguage, currentLanguage } = useTrans();

  const [language, setLanguage] = useState<string>(currentLanguage);
  const selectedLanguage: string =
    {
      vi: 'Tiếng Việt',
      en: 'English',
    }[language] || 'English';

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    changeLanguage(lang);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedLanguage}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/50">
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={handleChangeLanguage}
        >
          <DropdownMenuRadioItem value="vi">Tiếng Việt</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

LoginLanguageSwitcher.displayName = 'LoginLanguageSwitcher';
