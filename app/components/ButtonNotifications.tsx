"use client";
import { isLoggedAtom, ShowNotifications, themeAtom } from "@/store";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import React, { useState } from "react";
import NotificationBadge from "./NotificationBadge";

const NotificationButton: React.FC = () => {
  const [theme] = useAtom(themeAtom);
  const [showNotifications, setShowNotifications] = useAtom(ShowNotifications);
  const [isLogged] = useAtom(isLoggedAtom);
  const [temNoticiation, setTemNotification] = useState({'tem':false, 'listNotifications': []});

  const bellColor = !isLogged 
    ? "text-red-500"
    : showNotifications
    ? "text-red-500"
    : "text-slate-400";



  return (
    <>
    {isLogged && (
        <button
        onClick={() => setShowNotifications(true)}
        className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors`}
        >
        <NotificationBadge value={temNoticiation.listNotifications.length}/>
        <FontAwesomeIcon icon={faBell} className={`h-5 w-5 
            ${isLogged && temNoticiation.listNotifications.length > 0? 'text-red-500': 'text-gray-600'}
        `} />
        </button>
    )}
    </>
  );
};

export default NotificationButton;
