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
} from '@fortawesome/free-solid-svg-icons';

export function MobileHeader() {
  return (
    <header className="w-full flex flex-col md:hidden bg-slate-100 px-2 py-4 justify-between rounded-b-xl">
      <div className="flex items-center justify-between">
        <button className="h-10 w-10 rounded-full text-sky-600 flex items-center justify-center">
          <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-slate-500" />
        </button>

        <h1 className="text-sky-500 font-semibold text-lg">App</h1>

        <div className="flex gap-2">
          <button className="h-10 w-10 rounded-full text-sky-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-slate-500" />
          </button>
          <button className="h-10 w-10 rounded-full text-sky-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faGear} className="h-5 w-5 text-slate-500" />
          </button>
        </div>
      </div>

      <div className="flex justify-around mt-2 bg-white p-2 rounded-full shadow-md">
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
