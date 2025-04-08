'use client';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { sidebarToggleAtom } from '@/store/sidebarAtom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faSun,
  faSearch,
  faMoon,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import { themeAtom } from '@/store/themeAtom';
import { isLoggedAtom } from '@/store/isLoggedAtom';
import { modalLoginAtom } from '@/store/loginModalShowAtom';
import { authTokenAtom } from '@/store/authTokenAtom';
import { isLoading } from '@/store/isLoadingAtom';

export function DesktopHeader() {
  const [_, setSidebarToggle] = useAtom(sidebarToggleAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
  const [showModal, setShowModal] = useAtom(modalLoginAtom);
  const [token, setToken] = useAtom(authTokenAtom);  
  const [loading, setLoading] = useAtom(isLoading);

  function deslogar(): void {
    setIsLogged(false);
    setToken(null);
    setLoading(false);
  }

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
          
          <button className={`hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700
            ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#101828] border-gray-800'}
            `}>
            <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-slate-600" />
          </button>
          
          {isLogged ? (
            <div className='flex items-center gap-2 rounded-lg'>
              <p className={`font-medium text-sm ${theme === 'light'? 'text-slate-900 ': 'text-slate-50 '}`}>Bem-vindo, usuário!</p>
              <button className='px-4 py-1 bg-blue-500 mx-2 rounded-md text-white' onClick={deslogar}>Sair</button>
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
