import { SquareArrowOutUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function SidebarWidget() {
  return (
    <ul className="flex flex-col gap-1 p-4 items-center min-h-[124px] py-[21px] border-t-[#EBEBEB] border border-x-0 border-b-0">
      <li className={'w-full '}>
        <div className=" w-full flex items-center justify-between px-4 py-3 bg-[#F3F4F6] rounded-md">
          <div className="w-full">
            <span className="leading-5 text-base font-semibold">Support</span>
            <p className="leading-5 text-sm font-normal text-[#6B7280]">
              Marketing
            </p>
          </div>
          <span
            className={cn(
              ' whitespace-nowrap transition-all duration-300 ease-in-out truncate font-medium leading-[14px] !text-base',
              { 'lg:block': true },
            )}
          >
            <SquareArrowOutUpRight />
          </span>
        </div>
        <div className="h-10 w-full min-w-[40px] flex items-center justify-center gap-[14px]">
          <p
            className={cn(
              ' text-[#9CA3AF] text-center leading-4 whitespace-nowrap transition-all duration-300 ease-in-out !min-w-[200px] !truncate font-normal !text-sm',
              { 'lg:block': true },
            )}
          >
            {'@ 2025 TQKy, Inc.'}
          </p>
        </div>
      </li>
    </ul>
  );
}
