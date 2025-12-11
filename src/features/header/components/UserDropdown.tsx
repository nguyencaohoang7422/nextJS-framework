'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Info, LogOut, Settings, User } from 'lucide-react';

import { useLogout } from '@/features/auth/hooks/useAuth';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { useAuth } from '@/stores';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const logout = useLogout();

  const buttonProfile = useMemo(
    () => (
      <span className="flex items-center gap-3">
        <Image
          className="rounded-full"
          height={44}
          width={44}
          alt="user-image"
          src={user?.imageURL || '/next.svg'}
        />
        <p>{`${user?.firstname} ${user?.lastname}`}</p>
      </span>
    ),
    [user],
  );

  const DropdownItems = useMemo(
    () => [
      { key: 'profile', label: 'Profile', icon: User, onClick: () => {} },
      {
        key: 'account',
        label: 'Account',
        icon: Settings,
        onClick: () => {},
      },
      {
        key: 'support',
        label: 'support',
        icon: Info,
        onClick: () => {},
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: LogOut,
        onClick: () => logout.mutate(),
      },
    ],
    [logout],
  );
  return (
    <div className="relative select-none">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>{buttonProfile}</DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 z-40 w-[260px] bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
          <DropdownMenuLabel>
            <span className="block font-medium text-gray-700 text-sm dark:text-gray-400">
              {`${user?.firstname} ${user?.lastname}`}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {DropdownItems.map((item) => (
            <DropdownMenuItem key={item.key}>
              <Button
                onClick={() => item.onClick()}
                className="flex items-center w-full gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <item.icon />
                {item.label}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
