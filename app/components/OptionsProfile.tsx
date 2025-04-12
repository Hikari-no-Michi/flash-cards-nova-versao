'use client';

import { useRef } from 'react';
import { useAtom } from 'jotai';
import {
  faXmark,
  faUserCircle,
  faCogs,
  faLifeRing,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  authTokenAtom,
  isLoading,
  isLoggedAtom,
  ShowOptionsProfile,
  userAtom,
} from '@/store';

export default function OptionsProfile(): JSX.Element | null {
  const [showOptionsProfile, setShowOptionsProfile] = useAtom(ShowOptionsProfile);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
  const [loading, setLoading] = useAtom(isLoading);
  const [token, setToken] = useAtom(authTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const profileRef = useRef<HTMLDivElement>(null);

  if (!showOptionsProfile) return null;

  function deslogar(): void {
    setIsLogged(false);
    setToken(null);
    setUser(null);
    setLoading(false);
    setShowOptionsProfile(false);
  }

  return (
    <div
      ref={profileRef}
      className="absolute right-0 mt-[60px] flex w-[260px] h-[300px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-xl z-30"
    >
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-lg font-semibold text-slate-900">Perfil</h5>
        <button
          onClick={() => setShowOptionsProfile(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>
      </div>

      <div className="mb-3">
        <span className="block text-sm font-semibold text-gray-800">
          {user?.fullName}
        </span>
        <span className="block text-sm text-gray-500">{user?.email}</span>
      </div>

      <ul className="flex flex-col gap-1 border-b border-gray-200 pb-3 mb-3">
        <li>
          <a
            href="profile.html"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            Editar Perfil
          </a>
        </li>
        <li>
          <a
            href="settings.html"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faCogs} className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            Configurações
          </a>
        </li>
        <li>
          <a
            href="support.html"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faLifeRing} className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            Suporte
          </a>
        </li>
      </ul>

      <button
        onClick={deslogar}
        className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
        Sair
      </button>
    </div>
  );
}
