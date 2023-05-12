import type { TProcess } from "../types";

export const handleWaitingProcess = (process: TProcess) => {
  return process === "Tunggu Part" || process === "Tunggu Teknisi";
};
