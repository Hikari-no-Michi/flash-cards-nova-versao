"use client";

import { useState } from "react";
import { isLoggedAtom, isTrialExpiredAtom, themeAtom } from "@/store";
import {
  faBrain,
  faCalendarCheck,
  faChartBar,
  faChartLine,
  faGamepad,
  faLayerGroup,
  faProjectDiagram,
  faUsers,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue } from "jotai";

export default function CardDashboard() {
  const [theme] = useAtom(themeAtom);
  const [isLogged] = useAtom(isLoggedAtom);
  const isExpired = useAtomValue(isTrialExpiredAtom);

  const funcionalidades = [
    { icon: faBrain, label: "Revisão Inteligente" },
    { icon: faLayerGroup, label: "Decks Personalizados" },
    { icon: faChartBar, label: "Estatísticas Simples" },
    { icon: faUsers, label: "Decks Colaborativos" },
    { icon: faChartLine, label: "Estatísticas Avançadas" },
    { icon: faGamepad, label: "Quiz Game com Ranking" },
    { icon: faCalendarCheck, label: "Plano de Estudos" },
    { icon: faProjectDiagram, label: "Mapas Mentais" },
  ];

  return (
    <div className="flex flex-col col-span-12 md:col-span-8 relative">
      <div className="mb-6">
        <h3 className="text-slate-500 text-2xl font-bold tracking-tight">
          Dashboard
        </h3>
      </div>

      <div className={`flex rounded-2xl border p-6 min-h-[50vh] max-h-[80vh] shadow-md overflow-y-auto
  ${theme === 'light' ? 'border-slate-300' : 'border-slate-800'}
  items-start justify-start md:items-center md:justify-center transition-all relative`}>
        
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 w-full transition-all
          ${!isLogged && isExpired != "paid" ? "pointer-events-none opacity-50" : ""}`}>
          {funcionalidades.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer
                ${
                  theme === "light"
                    ? "text-slate-800 hover:bg-white shadow-md border border-slate-300"
                    : "bg-slate-800 text-white hover:bg-slate-700 shadow-md"
                }`}
            >
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="h-6 w-6 text-sky-500"
                />
              </div>
              <span className="text-sm text-center font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {!isLogged || isExpired != "paid"  && (
          <div className={`absolute inset-0 ${theme === 'light'? 'bg-white/30': 'bg-slate-800/30'} backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl flex-col`}>
            <FontAwesomeIcon icon={faLock} className={`text-4xl ${theme === 'light'? 'text-slate-500': 'text-slate-100'}`} />
            <p className={`flex items-center justify-center text-slate-500 text-center px-4
            ${theme === 'light'? 'text-slate-500': 'text-slate-100'}    
            `}>
            Faça login para desbloquear os recursos avançados do painel.
            </p>            
          </div>
        )}
      </div>
    </div>
  );
}
