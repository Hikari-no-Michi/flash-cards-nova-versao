import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { ShowNotifications } from '@/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Notifications(): JSX.Element | null {
  const [showNotifications, setShowNotifications] = useAtom(ShowNotifications);
  const notificationRef = useRef<HTMLDivElement>(null);

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
        </ul>
      </div>

      {/* Botão fixo no fundo */}
      <div className="pt-2">
        <a
          href="#"
          className="mt-3 flex justify-center rounded-lg border border-gray-300 bg-white p-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 hover:text-gray-800 "
        >
          Ver todas as notificações
        </a>
      </div>
    </div>
  );
}
