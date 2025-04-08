import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
  faXmark,
  faUserCircle,
  faCogs,
  faLifeRing,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authTokenAtom, isLoading, isLoggedAtom, ShowOptionsProfile } from "@/store";

export default function OptionsProfile(): JSX.Element | null {
  const [showOptionsProfile, setShowOptionsProfile] =
    useAtom(ShowOptionsProfile);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
  const [loading, setLoading] = useAtom(isLoading);
  const [token, setToken] = useAtom(authTokenAtom);

  const profileRef = useRef<HTMLDivElement>(null);

  function deslogar(): void {
    setIsLogged(false);
    setToken(null);
    setLoading(false);
    setShowOptionsProfile(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowOptionsProfile(false);
      }
    }

    if (showOptionsProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptionsProfile, setShowOptionsProfile]);

  if (!showOptionsProfile) return null;

  return (
    <div
      ref={profileRef}
      className="absolute right-0 mt-[60px] flex w-[260px] h-[300px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-lg "
    >
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg font-semibold text-slate-900"></h5>
        <button
          onClick={() => setShowOptionsProfile(false)}
          className="text-gray-500 dark:text-gray-400"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>
      </div>
      <hr className="my-2" />

      <div>
        <span className="block text-sm font-medium text-gray-700">
          Luiz Henrique
        </span>
        <span className="mt-0.5 block text-sm text-gray-500">
          oliveirachaves.ch97@gmail.com
        </span>
      </div>

      <ul className="flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4">
        <li>
          <a
            href="profile.html"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-gray-100 hover:text-slate-800"
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-slate-800 group-hover:text-slate-800 w-5 h-5"
            />
            Editar Perfil
          </a>
        </li>
        <li>
          <a
            href="settings.html"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-gray-100 hover:text-slate-800"
          >
            <FontAwesomeIcon
              icon={faCogs}
              className="text-slate-800 group-hover:text-slate-800 w-5 h-5"
            />
            Configurações
          </a>
        </li>
        <li>
          <a
            href="support.html"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-gray-100 hover:text-slate-800 "
          >
            <FontAwesomeIcon
              icon={faLifeRing}
              className="text-slate-800 group-hover:text-slate-800 w-5 h-5"
            />
            Suporte
          </a>
        </li>
      </ul>

      <button
        onClick={() => deslogar()}
        className="mt-auto flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-800 hover:text-slate-800"
      >
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="text-slate-800 w-5 h-5"
        />
        Sair
      </button>
    </div>
  );
}
