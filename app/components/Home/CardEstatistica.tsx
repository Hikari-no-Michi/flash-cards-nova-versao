'use client';
import { faChartPie, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const dadosSimulados = [
  { _id: '1', userId: 'user123', questionId: 'q001', disciplinaId: 'matematica', status: 'correct' },
  { _id: '2', userId: 'user123', questionId: 'q002', disciplinaId: 'portugues', status: 'incorrect' },
  { _id: '3', userId: 'user123', questionId: 'q003', disciplinaId: 'historia', status: 'correct' },
  { _id: '4', userId: 'user123', questionId: 'q004', disciplinaId: 'matematica', status: 'incorrect' },
  { _id: '5', userId: 'user123', questionId: 'q005', disciplinaId: 'geografia', status: 'correct' },
];

const COLORS = ['#4CAF50', '#F44336'];

export default function CardEstatistica () {

    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('todas');

  const disciplinasUnicas = Array.from(new Set(dadosSimulados.map((d) => d.disciplinaId)));

  const dadosFiltrados = disciplinaSelecionada === 'todas'
    ? dadosSimulados
    : dadosSimulados.filter((d) => d.disciplinaId === disciplinaSelecionada);

  const acertos = dadosFiltrados.filter((d) => d.status === 'correct').length;
  const erros = dadosFiltrados.filter((d) => d.status === 'incorrect').length;
  const total = acertos + erros;
  const desempenho = total > 0 ? Math.round((acertos / total) * 100) : 0;

  const dataGrafico = [
    { name: 'Acertos', value: acertos },
    { name: 'Erros', value: erros },
  ];

    return (
        <div className="hidden md:block md:col-span-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 space-y-4 h-[85vh] shadow-md">
             <div >
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                    Selecionar Disciplina
                    </label>
                    <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-slate-800"
                    value={disciplinaSelecionada}
                    onChange={(e) => setDisciplinaSelecionada(e.target.value)}
                    >
                    <option value="todas">Todas</option>
                    {disciplinasUnicas.map((disciplina) => (
                        <option key={disciplina} value={disciplina}>
                        {disciplina.charAt(0).toUpperCase() + disciplina.slice(1)}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="w-full h-[300px]">
                    <ResponsiveContainer>
                    <PieChart>
                        <Pie
                        data={dataGrafico}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                        >
                        {dataGrafico.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="text-center mt-4 text-lg font-semibold">
                    Desempenho: {desempenho}%
                </div>
                </div>
        </div>
    )
}