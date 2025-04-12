'use client'

import { useAtomValue } from 'jotai'
import { motion } from 'framer-motion'
import { isTrialExpiredAtom } from '@/store'

export default function PlanSelector() {
  const trialStatus = useAtomValue(isTrialExpiredAtom)

  if (trialStatus !== 'expired') return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch text-center text-gray-800">
          
        <div className="border rounded-xl p-6 flex-1">
        <div className="mb-4 text-sm line-through text-gray-400">R$ 156,00</div>
        <div className="mb-1 text-sm bg-gray-200 inline-block px-2 py-1 rounded-full text-xs font-medium text-gray-700">ECONOMIZE 75%</div>
        <div className="text-2xl font-bold text-purple-600">R$ 39,00/mês</div>
        <div className="text-xs text-gray-500 mb-4">*Plano para 12 meses</div>
        <button className="mt-auto w-full border border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-2 rounded-lg">Escolher plano</button>
        <ul className="text-sm mt-4 space-y-1 text-left">
            <li>✔ R$ 39,00 por mês durante 12 meses</li>
            <li>✔ Revisão inteligente com repetição espaçada (Spaced Repetition)</li>
            <li>✔ Criação ilimitada de decks personalizados</li>
            <li>✔ Estatísticas simplificada de desempenho </li>
            {/*<li>✔ Suporte a imagens, áudios e vídeos nos flashcards</li>*/}
        </ul>
        </div>

        <div className="border-2 border-purple-600 rounded-xl p-6 flex-1 bg-purple-50">
        <div className="mb-2 text-xs font-bold uppercase text-purple-700">Mais Popular</div>
        <div className="mb-4 text-sm line-through text-gray-400">R$ 75,00</div>
        <div className="mb-1 text-sm bg-purple-200 inline-block px-2 py-1 rounded-full text-xs font-medium text-purple-700">ECONOMIZE 63%</div>
        <div className="text-2xl font-bold text-purple-800">R$ 27,75/mês</div>
        <div className="text-xs text-gray-500 mb-4">*Plano para 6 meses</div>
        <button className="mt-auto w-full bg-purple-700 text-white hover:bg-purple-800 font-semibold py-2 rounded-lg">Escolher plano</button>
        <ul className="text-sm mt-4 space-y-1 text-left">
            <li>✔ R$ 27,00 Reais por mês durante 6 meses</li>
            <li>✔ Estatísticas simplificada de desempenho </li>
            <li>✔ Criação de Decks colaborativos limitado a 3 decks.</li>
        </ul>
        </div>

        <div className="border rounded-xl p-6 flex-1">
        <div className="mb-4 text-sm line-through text-gray-400">R$ 159,99</div>
        <div className="mb-1 text-sm bg-gray-200 inline-block px-2 py-1 rounded-full text-xs font-medium text-gray-700">ECONOMIZE 69%</div>
        <div className="text-2xl font-bold text-purple-600">R$ 49,99/mês</div>
        <div className="text-xs text-gray-500 mb-4">*Plano para 24 meses</div>
        <button className="mt-auto w-full border border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-2 rounded-lg">Escolher plano</button>
        <ul className="text-sm mt-4 space-y-1 text-left">
            <li>✔ Todos os recursos avançados liberados</li>
            <li>✔ R$ 49,99 por mês durante 24 meses</li>            
            <li>✔ Estatísticas Avançada por disciplina, tema e questão</li>
            <li>✔ Acesso ao modo Quiz Game com ranking nacional</li>
            <li>✔ Plano de estudos automático com alertas inteligentes</li>
            <li>✔ Flashcards com mapas mentais</li>
        </ul>
        </div>

        </div>
      </motion.div>
    </div>
  )
}
