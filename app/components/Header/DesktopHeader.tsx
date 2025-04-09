'use client';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faSun,
  faSearch,
  faMoon,
  faUserSecret,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { isLoggedAtom, modalLoginAtom, ShowNotifications, ShowOptionsProfile, sidebarToggleAtom, themeAtom, userAtom } from '@/store';

export function DesktopHeader() {
  const [_, setSidebarToggle] = useAtom(sidebarToggleAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
  const [showModal, setShowModal] = useAtom(modalLoginAtom);
  const [showNotifications, setShowNotifications] = useAtom(ShowNotifications);
  const [showOptionsProfile, setShowOptionsProfile] = useAtom(ShowOptionsProfile);
  const [user, setUser] = useAtom(userAtom);

  return (
    <header className={`w-full top-0 hidden md:flex border-b ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#101828] border-gray-800'}
    md:py-4 lg:py-3 
    `}>
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex gap-4 items-center">
          <button
            onClick={()=>setSidebarToggle((prev) => !prev)}
            className={`flex h-[40px] w-[46px] min-w-[40px] items-center justify-center rounded-lg border text-gray-500
              ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#101828] border-gray-800'}
              `}
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
              className={`h-11 w-full rounded-lg border py-2.5 pl-12 pr-14 text-sm shadow-theme-xs xl:w-[430px] focus:outline-none 
              ${theme === 'light' ? 'bg-white border-gray-200 placeholder:text-gray-400 text-gray-800' : 'bg-[#101828] border-gray-800 placeholder:text-slate-300 text-slate-300'}
              `}
            />
          </div>
        </div>

        <a href="#" className="lg:hidden">
          <div className="flex items-center justify-center">
            <h3 className={`text-xl font-bold text-center ${theme === 'light' ? 'bg-[#556B2F] text-white' : 'bg-[#799845]'}`}>ACM</h3>
          </div>
        </a>


        <div className="flex gap-2 items-center">
          <button
           onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={`hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border  text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700
            ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#101828] border-gray-800'}
          `}>
            
            {theme === 'light' ? (
              <FontAwesomeIcon icon={faMoon} className="h-5 w-5 text-slate-600" />
            ): (
              <FontAwesomeIcon icon={faSun} className="h-5 w-5 text-slate-600" />
            )}
            
          </button>
          
          <button 
            onClick={() => setShowNotifications(true)}
            className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors
              ${theme === 'light' ? 'border-orange-600' : 'border-orange-700'}
              hover:bg-orange-600`}
          >
            {/* Badge de notificação */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white font-bold shadow-md">
              1+
            </span>

            {/* Ícone do sino */}
            <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-orange-400" />
          </button>

          
          {isLogged ? (
            <div className='flex justify-center items-center gap-2'>
            <button 
              onClick={() => setShowOptionsProfile(true)} 
              className="h-12 w-12 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center p-0 hover:ring-2 hover:ring-gray-400"
            >
              <img 
                src="/user-profile.png" 
                alt="User profile" 
                className="h-full w-full object-cover" 
              />
            </button>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowOptionsProfile(true)}>
            <p className="text-sm w-[100px] truncate whitespace-nowrap overflow-hidden">
              @{user?.username}
            </p>
              <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 text-slate-600" />
            </div>
          </div>
          ) : (
            <div
              onClick={() => setShowModal(true)}
              className='flex justify-center items-center gap-2 bg-blue-400 rounded-lg cursor-pointer px-4 py-2'
            >
              <p className="text-slate-50 font-medium text-sm">Login</p>
            </div>
          )}
    
        </div>
      </div>
    </header>
  );
}
