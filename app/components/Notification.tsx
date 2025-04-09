"use client"
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { isLoggedAtom, ShowNotifications } from '@/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Notifications(): JSX.Element | null {
  const [showNotifications, setShowNotifications] = useAtom(ShowNotifications);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isLogged] = useAtom(isLoggedAtom);
  
  const [timeLeft, setTimeLeft] = useState(7100);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, setShowNotifications]);

  if (!showNotifications) return null;

  return (
    <div
      ref={notificationRef}
      className="absolute mt-[60px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-300 bg-white p-3 sm:w-[361px] lg:right-0 z-20 shadow-md"
    >
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg font-semibold text-slate-900">Notificações</h5>
        <button
          onClick={() => setShowNotifications(false)}
          className="text-gray-500 dark:text-gray-400"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>
      </div>

      <hr className="my-2" />

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="flex flex-col">
          {isLogged ? (
            <>
              <li>
                <a
                  href="#"
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100"
                >
                  Hello
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100"
                >
                  Hello
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100"
                >
                  Hello
                </a>
              </li>
            </>
          ) : (
            <li>
            <div className="flex flex-col gap-2 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 shadow">
              <p className="font-semibold">🌟 Oferta exclusiva por tempo limitado!</p>
              <p>
                Assine <strong>6 meses adiantados</strong> por apenas <strong>R$114,00</strong> (6 meses de R$19,00) e tenha acesso ilimitado para estudar à vontade!
              </p>
              <p className="text-sm">
                <span className="line-through text-gray-500">Valor Normal: R$285 Reais</span> — você economiza <br/><strong className='text-red-900'>R$ 171 (60%)</strong> com essa oferta!
              </p>
              <div className="text-sm text-red-600 font-bold">
                Oferta expira em: {formatTime(timeLeft)}
              </div>
              <button className="mt-2 w-full rounded-md bg-red-600 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 transition-all">
                Quero aproveitar essa oportunidade agora!
              </button>
            </div>
          </li>
          )}
        </ul>
      </div>

      {/* Botão fixo no fundo */}
      <div className="pt-2">
        <a
          href="#"
          className="mt-3 flex justify-center rounded-lg border border-gray-300 bg-white p-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 hover:text-gray-800"
        >
          Ver todas as notificações
        </a>
      </div>
    </div>
  );
}
