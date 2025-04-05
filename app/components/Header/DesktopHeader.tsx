'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { sidebarToggleAtom } from '@/store/sidebarAtom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faGear,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

export function DesktopHeader() {
  const [_, setSidebarToggle] = useAtom(sidebarToggleAtom);

  const handleToggleSidebar = () => {
    setSidebarToggle((prev) => !prev);
  };

  return (
    <header className="h-[70px] w-full top-0 hidden md:flex border-b border-gray-200 bg-white">
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleToggleSidebar}
            className="flex h-[40px] w-[46px] min-w-[40px] items-center justify-center rounded-lg border border-gray-200 text-gray-500"
          >
            <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-slate-600" />
          </button>

          <div className="flex">
            <span className="pointer-events-none relative left-4 top-1/2 -translate-y-1/2 top-8 left-8">
              <FontAwesomeIcon
                icon={faSearch}
                className="h-5 w-5 text-slate-600"
              />
            </span>
            <input
              type="text"
              className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 xl:w-[430px] focus:outline-none"
            />
          </div>
        </div>

        <a href="#" className="text-gray-700 lg:hidden">
          FlashCards
        </a>

        <div className="flex gap-2">
          <button className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-slate-600" />
          </button>
          <button className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <FontAwesomeIcon icon={faGear} className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
