import { isLoggedAtom } from '@/store';
import { useAtom } from 'jotai';
import React from 'react';

interface NotificationBadgeProps {
  value: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ value }) => {
    const [isLogged] = useAtom(isLoggedAtom);
    const badgeClass =
        value >= 1
        ? 'bg-red-600 text-white'
        : 'bg-gray-400 text-white';

  return (
    <>
    {isLogged && (
        <span className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-md ${badgeClass}`}>
        {value}
        </span>
    )}
    {!isLogged && (
        <span className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-md bg-red-500 text-white`}>
        +1
        </span>
    )}    
    </>
    
  );
};

export default NotificationBadge;
