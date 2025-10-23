import { minNet, minRate } from "./constants";

export function calculateNetProfit(
  pay: number,
  distance: number,
  costPerMile: number
): number {
  return pay - distance * costPerMile;
}

export function calculateHourlyRate(
  netProfit: number,
  timeMinutes: number
): number {
  if (timeMinutes === 0) {
    return 0;
  }

  return (netProfit / timeMinutes) * 60;
}

export function evaluateOrder(net: number, rate: number): string {
  const meetsNet = net >= minNet;
  const meetsRate = rate >= minRate;

  if (meetsNet && meetsRate) {
    return "Buena";
  }

  if (meetsNet || meetsRate) {
    return "Dudosa";
  }

  return "Mala";
}
