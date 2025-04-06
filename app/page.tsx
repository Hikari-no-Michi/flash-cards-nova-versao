"use client"
import Head from 'next/head';
import { DesktopHeader } from './components/Header/DesktopHeader';
import { MobileHeader } from './components/Header/MobileHeader';
import Sidebar from './components/Sidebar';
import { useAtom } from 'jotai';
import { themeAtom } from '@/store/themeAtom';
import CardEstatistica from './components/Home/CardEstatistica';
import CardGame from './components/Home/CardGame';

export default function Home() {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <DesktopHeader />
        <MobileHeader />
        <div className={`p-4 mx-auto w-full md:p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#101828] border-gray-800'} h-screen`}>
          <div className={`grid grid-cols-12 gap-4 md:gap-6`}>            
            <CardGame /> 
            <CardEstatistica />           
          </div>
        </div>
      </div>
    </div>
  );
}
