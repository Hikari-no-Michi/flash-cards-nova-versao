import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faGear,
  faChartColumn,
  faCube,
  faClipboardList,
  faClone,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { useAtom } from 'jotai';
import { themeAtom } from '@/store/themeAtom';

export function MobileHeader() {
  const [theme, setTheme] = useAtom(themeAtom);
  
  return (
    <header className={`w-full flex flex-col md:hidden px-2 py-4 justify-between rounded-b-2xl
    ${theme === 'light'? 'bg-white' : 'bg-[#101828]'}
    `}>
      <div className="flex items-center justify-between">
        <button className="h-10 w-10 rounded-full text-sky-600 flex items-center justify-center">
          <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-slate-500" />
        </button>

        <div className="flex items-center justify-center">
          <a href="">
            
            <h3 className={`text-xl px-3 font-bold text-center ${theme === 'light' ? 'bg-[#556B2F] text-white' : 'bg-[#799845]'} text-#101828`}>
              A C M 
              </h3>
            
          </a>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100 hover:text-gray-700
            
          `}>
            
            {theme === 'light' ? (
              <FontAwesomeIcon icon={faMoon} className="h-5 w-5 text-slate-600" />
            ): (
              <FontAwesomeIcon icon={faSun} className="h-5 w-5 text-slate-300" />
            )}
            
          </button>
          <div className='flex justify-center items-center gap-2 px-5 py-1 bg-blue-400 mx-3 rounded-lg cursor-pointer'>
            <p className="text-slate-50 font-medium text-sm">Login</p>
          </div>
        </div>
      </div>

      <div className={`flex justify-around mt-2 p-3 rounded-full
        ${theme === 'light'? 'border border-slate-200': 'border border-slate-700'}
        `}>
        <button className="flex flex-col items-center text-sky-500">
          <FontAwesomeIcon
            icon={faChartColumn}
            className="h-5 w-5 text-sky-500"
          />
          <span className="text-xs">Estatísticas</span>
        </button>
        <button className="flex flex-col items-center text-sky-500">
          <FontAwesomeIcon icon={faCube} className="h-5 w-5 text-sky-500" />
          <span className="text-xs">Disciplina</span>
        </button>
        <button className="flex flex-col items-center text-sky-500">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="h-5 w-5 text-sky-500"
          />
          <span className="text-xs">Revisão</span>
        </button>
        <button className="flex flex-col items-center text-sky-500">
          <FontAwesomeIcon icon={faClone} className="h-5 w-5 text-sky-500" />
          <span className="text-xs">Baralho</span>
        </button>
      </div>
    </header>
  );
}
