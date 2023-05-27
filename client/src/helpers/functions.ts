import { format, minutesToHours } from "date-fns";
import type { TMainProcess, TProcess, TUserRole, TManageRole } from "../types";
import { firstQualityCheck, secondQualityCheck, thirdQualityCheck, fourthQualityCheck } from "./constants";

export const manageRole = <T>(
  role: TUserRole,
  { admin, ketok, preparation, pengecatan, inspection }: TManageRole<T>
): T => {
  if (role === "Ketok" && ketok) return ketok;
  if (role === "Preparation" && preparation) return preparation;
  if (role === "Pengecatan" && pengecatan) return pengecatan;
  if (role === "Inspection" && inspection) return inspection;

  // Role Admin
  return admin;
};

export const formatTime = (minutes: number): string => {
  const getDays = Math.floor(minutes / (60 * 24));
  const getHours = minutesToHours(minutes) % 24;
  const getMinutes = Math.floor(minutes % 60);
  const text: string[] = [];

  if (getDays) {
    text.push(`${getDays} Hari`);
  }

  if (getHours) {
    text.push(`${getHours} Jam`);
  }

  if (getMinutes) {
    text.push(`${getMinutes} Menit`);
  }

  if (!getDays && !getHours && !getMinutes) {
    text.push("0 Menit");
  }

  return text.join(" ");
};

export const handleProcess = (process: TMainProcess) => {
  if (process === "Ketokan" || process === "Removal") {
    return firstQualityCheck;
  }

  if (process === "Putty" || process === "Epoxy") {
    return secondQualityCheck;
  }

  if (process === "Masking" || process === "Spraying") {
    return thirdQualityCheck;
  }

  return fourthQualityCheck;
};

export const handleWaitingProcess = (process: TProcess) => {
  return process === "Tunggu Part" || process === "Tunggu Teknisi";
};

export const getNextProcess = (allProcess: TMainProcess[], currentProcess: TMainProcess) => {
  const index = allProcess.indexOf(currentProcess);
  return index >= 0 && index < allProcess.length - 1 ? allProcess[index + 1] : allProcess[index];
};

export const getPreviousProcess = (allProcess: TMainProcess[], currentProcess: TMainProcess) => {
  const index = allProcess.indexOf(currentProcess);
  return index > 0 && index < allProcess.length ? allProcess[index - 1] : allProcess[index];
};

// This might be changed in the future
export const getDateFormattedData = <T>(
  data: Array<
    Omit<T, "entryDate" | "handOver"> & {
      entryDate: string;
      handOver: string;
    }
  >
) => {
  return data.map(unit => {
    const { entryDate, handOver, ...rest } = unit;

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      ...rest,
      entryDate: format(new Date(entryDate), "dd MMMM yyyy"),
      handOver: format(new Date(handOver), "dd MMMM yyyy")
    } as T;
  });
};
