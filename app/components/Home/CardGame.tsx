"use client"

import { themeAtom } from "@/store/themeAtom";
import { useAtom } from "jotai";

export default function CardGame () {

    const errei = () => {
        console.log("Você clicou em: Errei");
    }

    const acertei = () => {
        console.log("Você clicou em: Acertei");
    }

    const [theme] = useAtom(themeAtom);

    return (
        <>
            <div className="flex flex-col col-span-12 md:col-span-8">
                <div className="mb-6">
                <h3 className="text-slate-400 text-xl font-semibold">
                Nome da disciplina
                </h3>
                </div>

                <div className="flex rounded-2xl text-2xl text-white border border-sky-200 bg-sky-500 p-5 sm:p-6 h-[50vh] shadow-md justify-center items-center">
                Frente do cartão
                </div>
                <div className="flex w-full mt-10 h-3 justify-center items-center mt-10 gap-4">
                    <button
                        onClick={errei}
                        className={`w-1/2 text-md p-4 font-semibold text-center border-b border-b-2 rounded-full
                             ${theme ==='light'? 'bg-slate-50 text-slate-900 border-sky-400' : 'bg-[#0a101c] text-red-500 border-red-500'}
                        `}
                    >
                        Errei
                    </button>
                    <button
                        onClick={acertei}
                        className={`w-1/2  text-md p-4 font-semibold text-center border-b border-b-2 rounded-full
                            ${theme ==='light'? 'bg-slate-50 text-slate-900 border-sky-400' : 'bg-[#0a101c] text-green-500 border-green-500'}
                        `}
                    >
                        Acertei
                    </button>
                </div>
            
            
            </div>

            
        </>
    );
}
