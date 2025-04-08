'use client';
import { themeAtom } from "@/store";
import { faChartPie, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import { useMediaQuery } from 'react-responsive';



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
  const [theme] = useAtom(themeAtom);

  const isMd = useMediaQuery({ maxWidth: 1024 }); // md é até 1024px
  const outerRadius = isMd ? 70 : 100; // menor em md, padrão em lg


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
        <div className={`hidden md:block md:col-span-4 rounded-2xl border ${theme ==='light'? 'bg-slate-50 border-gray-200' : 'bg-[#0a101c] border-gray-800'} p-5 sm:p-6 space-y-4 h-[80vh] shadow-md`}>
             <div >
                <div className="mb-4">
                    <label className={`block mb-1 text-sm font-medium ${theme ==='light'? 'text-slate-900' : 'text-slate-300'} py-3`}>
                    Selecionar Disciplina
                    </label>
                    <select
                    className={`w-full ${theme ==='light'? 'bg-slate-50 border-gray-200 text-slate-800' : 'bg-[#0a101c] border-gray-800 text-slate-300'} px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 `}
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
                        outerRadius={outerRadius}
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

                <div className={`text-center mt-4 text-lg font-semibold ${theme ==='light'? 'text-gray-800' : 'text-slate-300'}`}>
                    Desempenho: {desempenho}%
                </div>
                </div>
        </div>
    )
}