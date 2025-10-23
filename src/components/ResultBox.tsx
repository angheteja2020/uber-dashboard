type ResultBoxProps = {
  net: number | null;
  rate: number | null;
  verdict: string | null;
};

const verdictConfig: Record<
  string,
  { emoji: string; color: string; bg: string; label: string }
> = {
  Buena: {
    emoji: "✅",
    color: "text-[#06C167]",
    bg: "bg-[#06C167]/10",
    label: "Excelente orden",
  },
  Dudosa: {
    emoji: "⚠️",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    label: "Considerar con precaución",
  },
  Mala: {
    emoji: "❌",
    color: "text-red-400",
    bg: "bg-red-400/10",
    label: "No recomendada",
  },
};

function ResultBox({ net, rate, verdict }: ResultBoxProps) {
  const formattedNet = net !== null ? `$${net.toFixed(2)}` : "--";
  const formattedRate = rate !== null ? `$${rate.toFixed(2)}` : "--";
  const hasResult = net !== null && rate !== null && verdict !== null;

  const config = verdict ? verdictConfig[verdict] : null;

  return (
    <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#121212] p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8">
      <h2 className="mb-6 text-xl font-bold text-white">Resultados</h2>

      {!hasResult ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-white/5 p-4">
            <svg
              className="h-12 w-12 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            Ingresa los datos de la orden para ver el análisis
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Verdict Card - Prominent */}
          {config && (
            <div
              className={`rounded-2xl border border-white/5 ${config.bg} p-5 backdrop-blur-sm`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black/20">
                  <span className="text-3xl" role="img" aria-label="veredicto">
                    {config.emoji}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Veredicto
                  </p>
                  <p className={`mt-0.5 text-lg font-bold ${config.color}`}>
                    {config.label}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Net Profit */}
            <div className="rounded-xl border border-white/5 bg-black/20 p-5">
              <div className="mb-3 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-[#06C167]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Ganancia neta
                </h3>
              </div>
              <p className="text-3xl font-bold text-white">{formattedNet}</p>
              <p className="mt-1 text-xs text-gray-500">Después de costos</p>
            </div>

            {/* Hourly Rate */}
            <div className="rounded-xl border border-white/5 bg-black/20 p-5">
              <div className="mb-3 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-[#06C167]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Ganancia por hora
                </h3>
              </div>
              <p className="text-3xl font-bold text-white">{formattedRate}</p>
              <p className="mt-1 text-xs text-gray-500">Tasa horaria</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs leading-relaxed text-gray-400">
              💡 <span className="font-medium">Tip:</span> Las órdenes se
              evalúan considerando ganancia neta mínima y tasa horaria óptima
              según tus umbrales configurados.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ResultBox;
