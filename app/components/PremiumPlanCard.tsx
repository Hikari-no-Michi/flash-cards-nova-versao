'use client';

import { themeAtom } from "@/store";
import { useAtom } from "jotai";

export default function PremiumPlanCard() {
  const [theme] = useAtom(themeAtom);

  return (
    <div>
      <h3 className={`mb-2 font-semibold ${theme === 'light' ? 'text-slate-800 bg-slate-100' : 'text-purple-300 bg-[#0a101c]'}`}>
        Plano Premium
      </h3>
      
      <div className="text-theme-sm mb-4 text-gray-500 text-sm">
        <div className={`${theme === 'light' ? 'text-purple-500' : 'text-green-300'}`}>
          A vantagem que faltava para você sair na frente!
        </div>
        Libere todos os recursos do sistema sem limites.
      </div>

      <a
        target="_blank"
        rel="nofollow"
        className="bg-green-600 text-theme-sm hover:bg-green-700 flex items-center justify-center rounded-lg p-3 font-medium text-white"
      >
        Assinar Plano Premium
      </a>
    </div>
  );
}
