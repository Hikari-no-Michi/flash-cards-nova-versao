"use client"
import Head from 'next/head';
import { DesktopHeader } from './components/Header/DesktopHeader';
import { MobileHeader } from './components/Header/MobileHeader';
import Sidebar from './components/Sidebar';
import { useAtom, useAtomValue } from 'jotai';
import CardEstatistica from './components/Home/CardEstatistica';
import CardGame from './components/Home/CardGame';
import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/CRUD/DesktopLogin';
import Notifications from './components/Notification';
import OptionsProfile from './components/OptionsProfile';
import { authTokenAtom, isLoggedAtom, isTrialExpiredAtom, themeAtom, userAtom } from '@/store';
import { useAuthLogger } from '@/hooks/UserUpdater';
import PlanSelector from './components/SeletorDePlanos';
import { RegisterForm } from './components/CRUD/RegisterForm';
import CardDashboard from './components/Home/CardDashBoard';

export default function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [token] = useAtom(authTokenAtom);
  const [theme] = useAtom(themeAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
  
  useAuthLogger({ token, isLogged, user, setUser });  
  
  return (    
    <div className={`flex h-screen overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-[#101828]'} z-5`}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <DesktopHeader />
        <MobileHeader />
        <div className={`p-4 mx-auto w-full md:p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#101828] border-gray-800'} h-screen`}>
          <div className={`grid grid-cols-12 gap-4 md:gap-6`}>            
           {/* <CardGame /> */}
            <CardDashboard />
            <CardEstatistica />           
          </div>
        </div>
      </div>

      
      <LoginForm />
      <RegisterForm />
           
      <div className={`relative ${isLogged === true ? 'right-[200px]' : 'right-[97px]' }`}>
        <Notifications />
      </div>
      
      <div className={`relative ${isLogged === true ? 'right-[20px]' : 'right-[20px]' }`}>
        <OptionsProfile />
      </div>

      <div>
        <PlanSelector />
      </div>
    </div>
  );
}
