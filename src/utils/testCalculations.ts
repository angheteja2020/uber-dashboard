import {
  calculateNetProfit,
  calculateHourlyRate,
  evaluateOrder,
} from "./calculations";
import { costPerMile, minNet, minRate } from "./constants";

type Scenario = {
  label: string;
  pay: number;
  distance: number;
  timeMinutes: number;
};

const scenarios: Scenario[] = [
  {
    label: "Alta ganancia neta pero poca tasa",
    pay: 9,
    distance: 5,
    timeMinutes: 25,
  },
  {
    label: "Orden excelente (ambos umbrales)",
    pay: 15,
    distance: 4,
    timeMinutes: 18,
  },
  {
    label: "Orden deficiente (ningún umbral)",
    pay: 6,
    distance: 6,
    timeMinutes: 30,
  },
  {
    label: "Alta tasa, ganancia neta insuficiente",
    pay: 8,
    distance: 5,
    timeMinutes: 15,
  },
  {
    label: "Tiempo cero (validación de salvaguarda)",
    pay: 10,
    distance: 4,
    timeMinutes: 0,
  },
];

function classifyExpected(net: number, rate: number): string {
  if (net >= minNet && rate >= minRate) {
    return "Buena";
  }

  if (net >= minNet || rate >= minRate) {
    return "Dudosa";
  }

  return "Mala";
}

function runScenario({ label, pay, distance, timeMinutes }: Scenario) {
  const expectedNet = pay - distance * costPerMile;
  const expectedRate = timeMinutes === 0 ? 0 : (expectedNet / timeMinutes) * 60;
  const expectedVerdict = classifyExpected(expectedNet, expectedRate);

  const net = calculateNetProfit(pay, distance, costPerMile);
  const rate = calculateHourlyRate(net, timeMinutes);
  const verdict = evaluateOrder(net, rate);

  const netMatch = Math.abs(net - expectedNet) < 0.005;
  const rateMatch = Math.abs(rate - expectedRate) < 0.005;
  const verdictMatch = verdict === expectedVerdict;

  console.log(`--- ${label} ---`);
  console.log(
    `Entradas -> pago: ${pay.toFixed(2)}, distancia: ${distance.toFixed(
      2
    )} mi, tiempo: ${timeMinutes.toFixed(
      2
    )} min, costo/mi (global): ${costPerMile.toFixed(2)}`
  );
  console.log(
    `Umbrales globales -> minNet: ${minNet.toFixed(
      2
    )}, minRate: ${minRate.toFixed(2)}`
  );
  console.log(
    `Ganancia neta: ${net.toFixed(2)} (esperado ${expectedNet.toFixed(2)}) ${
      netMatch ? "✅" : "⚠️"
    }`
  );
  console.log(
    `Ganancia por hora: ${rate.toFixed(2)} (esperado ${expectedRate.toFixed(
      2
    )}) ${rateMatch ? "✅" : "⚠️"}`
  );
  console.log(
    `Veredicto: ${verdict} (esperado ${expectedVerdict}) ${
      verdictMatch ? "✅" : "⚠️"
    }`
  );
  console.log("");
}

console.log("=== Escenarios de prueba con umbrales globales ===\n");
scenarios.forEach(runScenario);
