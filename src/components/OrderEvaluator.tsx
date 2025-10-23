import { useState } from "react";
import ResultBox from "./ResultBox";
import {
  calculateHourlyRate,
  calculateNetProfit,
  evaluateOrder,
} from "../utils/calculations";
import { costPerMile } from "../utils/constants";

type ResultState = {
  net: number | null;
  rate: number | null;
  verdict: string | null;
};

function OrderEvaluator() {
  const [pay, setPay] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<ResultState>({
    net: null,
    rate: null,
    verdict: null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payValue = parseFloat(pay);
    const distanceValue = parseFloat(distance);
    const timeValue = parseFloat(time);

    if (
      Number.isNaN(payValue) ||
      Number.isNaN(distanceValue) ||
      Number.isNaN(timeValue) ||
      timeValue <= 0
    ) {
      setResult({ net: null, rate: null, verdict: null });
      return;
    }

    const net = calculateNetProfit(payValue, distanceValue, costPerMile);
    const rate = calculateHourlyRate(net, timeValue);
    const verdict = evaluateOrder(net, rate);

    setResult({ net, rate, verdict });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#06C167]/10 px-4 py-1.5">
            <span className="text-sm font-semibold text-[#06C167]">Delivery Intelligence</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Order Evaluator
          </h1>
          <p className="text-base text-gray-400 sm:text-lg">
            Analiza la rentabilidad de tus órdenes en tiempo real
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Form Section */}
          <form
            className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#121212] p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-6 text-xl font-bold text-white">
              Detalles de la orden
            </h2>

            <div className="space-y-5">
              {/* Pay Input */}
              <div className="group">
                <label
                  className="mb-2 block text-sm font-medium text-gray-300"
                  htmlFor="pago-total"
                >
                  Pago total
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-lg text-gray-500">$</span>
                  </div>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-10 pr-4 text-base text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:border-white/20 focus:border-[#06C167] focus:outline-none focus:ring-2 focus:ring-[#06C167]/30"
                    id="pago-total"
                    inputMode="decimal"
                    min="0"
                    name="pago-total"
                    onChange={(event) => setPay(event.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    type="number"
                    value={pay}
                  />
                </div>
              </div>

              {/* Distance Input */}
              <div className="group">
                <label
                  className="mb-2 block text-sm font-medium text-gray-300"
                  htmlFor="distancia"
                >
                  Distancia
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-12 text-base text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:border-white/20 focus:border-[#06C167] focus:outline-none focus:ring-2 focus:ring-[#06C167]/30"
                    id="distancia"
                    inputMode="decimal"
                    min="0"
                    name="distancia"
                    onChange={(event) => setDistance(event.target.value)}
                    placeholder="0.0"
                    step="0.1"
                    type="number"
                    value={distance}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-sm text-gray-500">mi</span>
                  </div>
                </div>
              </div>

              {/* Time Input */}
              <div className="group">
                <label
                  className="mb-2 block text-sm font-medium text-gray-300"
                  htmlFor="tiempo"
                >
                  Tiempo estimado
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      className="h-5 w-5 text-gray-500"
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
                  </div>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-12 text-base text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:border-white/20 focus:border-[#06C167] focus:outline-none focus:ring-2 focus:ring-[#06C167]/30"
                    id="tiempo"
                    min="0"
                    name="tiempo"
                    onChange={(event) => setTime(event.target.value)}
                    placeholder="0"
                    step="1"
                    type="number"
                    value={time}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="mt-8 w-full rounded-xl bg-[#06C167] py-4 text-base font-bold text-white shadow-lg shadow-[#06C167]/25 transition-all duration-200 hover:bg-[#05AB5C] hover:shadow-xl hover:shadow-[#06C167]/30 focus:outline-none focus:ring-4 focus:ring-[#06C167]/40 active:scale-[0.98]"
              type="submit"
            >
              Evaluar orden
            </button>
          </form>

          {/* Results Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ResultBox net={result.net} rate={result.rate} verdict={result.verdict} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderEvaluator;
