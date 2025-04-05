export default function PremiumPlanCard() {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-gray-900 text-slate-800">
        Plano Premium
      </h3>
      <p className="text-theme-sm mb-4 text-gray-500 text-sm">
        Libere todos os recursos do sistema sem limites.
      </p>
      <a
        //href="#"
        target="_blank"
        rel="nofollow"
        className="bg-green-600 text-theme-sm hover:bg-green-700 flex items-center justify-center rounded-lg p-3 font-medium text-white"
      >
        Assinar Plano Premium
      </a>
    </div>
  );
}
