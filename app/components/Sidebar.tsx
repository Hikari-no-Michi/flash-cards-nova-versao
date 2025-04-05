'use client';
import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { sidebarToggleAtom } from '@/store/sidebarAtom';
import PremiumPlanCard from './PremiumPlanCard';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Sidebar() {
  const [sidebarToggle] = useAtom(sidebarToggleAtom);

  return (
    <aside
      className={`
        fixed top-0 left-0 z-[9999] flex h-screen flex-col overflow-y-auto border-r border-gray-200 bg-white px-5 transition-all duration-300
        ${
          sidebarToggle
            ? 'translate-x-0 w-[90px] lg:w-[90px] hidden lg:flex'
            : '-translate-x-full w-[290px] bg-white'
        }
        lg:static lg:translate-x-0
      `}
    >
      <div className="sidebar-header flex items-center gap-2 pt-8 pb-7 justify-center">
        <a href="">
          {sidebarToggle ? (
            <img
              src="https://demo.tailadmin.com/src/images/logo/logo-icon.svg"
              alt=""
            />
          ) : (
            <img
              src="https://demo.tailadmin.com/src/images/logo/logo.svg"
              alt=""
            />
          )}
        </a>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav>
          <div>
            <h3 className="mb-4 text-xs leading-[20px] text-gray-400 uppercase flex justify-center">
              {sidebarToggle ? (
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className="w-[24px] h-[24px]"
                />
              ) : (
                'MENU'
              )}
            </h3>
          </div>
        </nav>
      </div>
      <div
        className={`${
          sidebarToggle ? 'lg:hidden' : ''
        } mx-auto mb-10 w-full max-w-60 rounded-2xl bg-slate-50 px-4 py-5 text-center`}
      >
        <PremiumPlanCard />
      </div>
    </aside>
  );
}
