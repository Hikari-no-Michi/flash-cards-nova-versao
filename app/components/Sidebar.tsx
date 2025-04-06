'use client';
import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { sidebarToggleAtom } from '@/store/sidebarAtom';
import PremiumPlanCard from './PremiumPlanCard';
import { faChartBar, faClipboardList, faEllipsisH, faMoneyCheck, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themeAtom } from '@/store/themeAtom';


export default function Sidebar() {
  const [sidebarToggle] = useAtom(sidebarToggleAtom);
  const [theme] = useAtom(themeAtom);

  return (
    <aside
      className={`
        fixed top-0 left-0 z-[9999] flex h-screen flex-col overflow-y-auto border-r border-gray-200 px-5 transition-all duration-300
        ${
          sidebarToggle
            ? 'translate-x-0 w-[90px] lg:w-[90px] hidden lg:flex'
            : '-translate-x-full w-[290px]'
        }
        lg:static lg:translate-x-0
        ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#101828] border-gray-800'}
      `
}
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
            <ul className={`mb-6 flex flex-col gap-4 mt-8`}>
              <li>
                <a href="" className={`menu-item group menu-item-inactive text-sm flex justify-start items-center gap-2
                  ${theme === 'light' ? 'text-[#344054]' : 'text-purple-300'}
                  ${sidebarToggle ? 'justify-center mb-4' : 'justify-start'}
                  `}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="w-[24px] h-[24px]"
                /> 
                {!sidebarToggle && (
                   <>Perfil do Usuário</>
                )}
                </a>
              </li>
              <li>
                <a href="" className={`menu-item group menu-item-inactive text-sm flex justify-start items-center gap-2
                  ${theme === 'light' ? 'text-[#344054]' : 'text-purple-300'}
                  ${sidebarToggle ? 'justify-center mb-4' : 'justify-start'}
                  `}>
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="w-[24px] h-[24px]"
                /> 
                {!sidebarToggle && (
                   <>Revisão</>
                )}
                </a>
              </li>
              <li>
                <a href="" className={`menu-item group menu-item-inactive text-sm  flex justify-start items-center gap-2
                  ${theme === 'light' ? 'text-[#344054]' : 'text-purple-300'}
                  ${sidebarToggle ? 'justify-center mb-4' : 'justify-start'}
                  `}>
                <FontAwesomeIcon
                  icon={faChartBar}
                  className="w-[24px] h-[24px]"
                /> 
                {!sidebarToggle && (
                   <>Estatísticas</>
                )}
                </a>
              </li>
              <li>
                <a href="" className={`menu-item group menu-item-inactive text-sm  flex justify-start items-center gap-2
                  ${theme === 'light' ? 'text-[#344054]' : 'text-purple-300'}
                  ${sidebarToggle ? 'justify-center mb-4' : 'justify-start'}
                  `}>
                <FontAwesomeIcon
                  icon={faMoneyCheck}
                  className="w-[24px] h-[24px]"
                />
                {!sidebarToggle && (
                   <>Financeiro</>
                )}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className={`${
          sidebarToggle ? 'lg:hidden' : ''
        } mx-auto mb-10 w-full max-w-60 rounded-2xl px-4 py-5 text-center 
        
        ${theme === 'light' ? 'text-[#344054] bg-slate-100' : 'text-purple-300 bg-[#0a101c]'}
        `}>
        <PremiumPlanCard />
      </div>
    </aside>
  );
}
