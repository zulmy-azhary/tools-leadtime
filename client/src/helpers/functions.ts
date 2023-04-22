import { minutesToHours } from "date-fns";
import type { TMainProcess, TUserRole } from "../types";
import { firstQualityCheck, secondQualityCheck, thirdQualityCheck, fourthQualityCheck } from "./constants";
import type { TManageRole } from "../types/auth";

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
