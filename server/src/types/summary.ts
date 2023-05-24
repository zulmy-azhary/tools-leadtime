import type { TUnitData } from ".";

export interface TSummaryData extends Omit<TUnitData, "currentProcess" | "currentStatus"> {
  totalDuration: number;
}
