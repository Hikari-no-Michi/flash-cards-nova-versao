'use client'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { motion } from 'framer-motion'
import { isPlanAtom, isTrialExpiredAtom, Plan, selectedPlanAtom } from '@/store'
import PlanCard from './PlanCard'
import { useState } from 'react'

export default function PlanSelector() {
  const trialStatus = useAtomValue(isTrialExpiredAtom)
  const selectedPlan = useSetAtom(selectedPlanAtom)
  const [isPlan, setIsPlan] = useAtom(isPlanAtom);

  if (trialStatus !== 'expired') return null

  const plans = [
    {
      id: 'plano12meses',
      originalPrice: 'R$ 156,00',
      discountText: 'ECONOMIZE 75%',
      finalPrice: 39.00,
      duration: '*Plano para 12 meses',
      benefits: [
        '✔ R$ 39,00 por mês durante 12 meses',
        '✔ Revisão inteligente com repetição espaçada (Spaced Repetition)',
        '✔ Criação ilimitada de decks personalizados',
        '✔ Estatísticas simplificada de desempenho'
      ],
      isPopular: false,
      highlightColor: 'gray',
      meses: 12
    },
    {
      id: 'plano6meses',
      originalPrice: 'R$ 75,00',
      discountText: 'ECONOMIZE 63%',
      finalPrice: 27.75,
      duration: '*Plano para 6 meses',
      benefits: [
        '✔ R$ 27,00 Reais por mês durante 6 meses',
        '✔ Estatísticas simplificada de desempenho',
        '✔ Criação de Decks colaborativos limitado a 3 decks.'
      ],
      isPopular: true,
      highlightColor: 'purple',
      meses: 6      
    },
    {
      id: 'plano24meses',
      originalPrice: 'R$ 159,99',
      discountText: 'ECONOMIZE 69%',
      finalPrice: 49.99,
      duration: '*Plano para 24 meses',
      benefits: [
        '✔ Todos os recursos avançados liberados',
        '✔ R$ 49,99 por mês durante 24 meses',
        '✔ Estatísticas Avançada por disciplina, tema e questão',
        '✔ Acesso ao modo Quiz Game com ranking nacional',
        '✔ Plano de estudos automático com alertas inteligentes',
        '✔ Flashcards com mapas mentais'
      ],
      isPopular: false,
      highlightColor: 'gray',
      meses: 24
    }
  ]

  const renderPlan = (plan: Plan) => {
    const isPopular = plan.isPopular
    const highlightClass = isPopular ? 'border-2 border-purple-600 bg-purple-50' : 'border'
    const textColor = isPopular ? 'text-purple-800' : 'text-purple-600'
    const buttonClass = isPopular
      ? 'bg-purple-700 text-white hover:bg-purple-800'
      : 'border border-purple-600 text-purple-600 hover:bg-purple-50'

    return (
      <div
        key={plan.id}
        className={`${highlightClass} rounded-xl p-6 flex-1`}
      >
        {isPopular && (
          <div className="mb-2 text-xs font-bold uppercase text-purple-700">
            Mais Popular
          </div>
        )}
        <div className="mb-4 text-sm line-through text-gray-400">{plan.originalPrice}</div>
        <div className={`mb-1 text-sm inline-block px-2 py-1 rounded-full text-xs font-medium ${isPopular ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'}`}>
          {plan.discountText}
        </div>
        <div className={`text-2xl font-bold ${textColor}`}>R$ {plan.finalPrice}/mês</div>
        <div className="text-xs text-gray-500 mb-4">{plan.duration}</div>
        <button onClick={
          () => {
            selectedPlan(plan)
            setIsPlan(true)
          }
        }
        className={`mt-auto w-full font-semibold py-2 rounded-lg ${buttonClass}`}>
          Escolher plano
        </button>
        <ul className="text-sm mt-4 space-y-1 text-left">
          {plan.benefits.map((benefit: string, index: number) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (       
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isPlan&& (
          <PlanCard />
        )}
        {!isPlan && (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch text-center text-gray-800">
          {plans.map(renderPlan)}
          </div>
        )}
        
      </motion.div>
    </div>
  )
}
