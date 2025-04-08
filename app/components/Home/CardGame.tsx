"use client";

import { reviewedQuestionsAtom, themeAtom } from "@/store";
import { useAtom } from "jotai";

export default function CardGame() {
  const [theme] = useAtom(themeAtom);
  const [reviewedQuestions, setReviewedQuestions] = useAtom(reviewedQuestionsAtom);
  
  const errei = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Você clicou em: Errei");
  };
  
  const acertei = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Você clicou em: Acertei");
  };

  

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
            onClick={(e)=> errei(e)}
            className={`w-1/2 text-sm p-2 font-semibold text-center rounded-full
                ${
                theme === "light"
                    ? "border-b border-b-2 bg-slate-50 text-slate-900 border-sky-400"
                    : "border-2 text-red-500 border-red-500"
                }
            `}
          >
            Errei
          </button>
          <button
            onClick={(e)=>acertei(e)}
            className={`w-1/2  text-sm p-2 font-semibold text-center rounded-full
                ${
                    theme === "light"
                    ? "border-b border-b-2 bg-slate-50 text-slate-900 border-sky-400"
                    : "border-2 text-green-500 border-green-500"
                }
            `}
          >
            Acertei
          </button>
        </div>
      </div>
    </>
  );
}
