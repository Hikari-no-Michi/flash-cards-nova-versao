import Head from 'next/head';
import { DesktopHeader } from './components/Header/DesktopHeader';
import { MobileHeader } from './components/Header/MobileHeader';
import Sidebar from './components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <DesktopHeader />
        <MobileHeader />
        <div className="p-4 mx-auto w-full md:p-6">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Primeira div – 20% (oculta em telas pequenas) */}
            <div className="hidden md:block md:col-span-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 space-y-4 h-[80vh] shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-green-500 text-xl"
                  />
                  <span className="text-sm text-gray-500">Acertos</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">12</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-500 text-xl"
                  />
                  <span className="text-sm text-gray-500">Erros</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">3</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faChartPie}
                    className="text-indigo-500 text-xl"
                  />
                  <span className="text-sm text-gray-500">Desempenho</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">80%</span>
              </div>
            </div>

            {/* Segunda div – 80% em md+, 100% em sm */}
            <div className="col-span-12 md:col-span-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 h-[30vh] shadow-md">
              Segunda Div (80% em telas grandes, 100% em telas menores)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
