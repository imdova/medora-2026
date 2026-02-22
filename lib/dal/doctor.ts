/**
 * Data Access Layer: Doctors (Search / Grid).
 * UI imports only from /lib/dal.
 */

import { getDoctors as dbGetDoctors, getDoctorById as dbGetDoctorById, getDoctorCounts as dbGetDoctorCounts, type GetDoctorsOptions } from "@/lib/db/doctors";
import type { Doctor } from "@/types";

export type FetchDoctorsOptions = GetDoctorsOptions;

export async function fetchDoctors(options?: FetchDoctorsOptions): Promise<{
  doctors: Doctor[];
  total: number;
}> {
  return dbGetDoctors(options);
}

export async function fetchDoctorById(id: string): Promise<Doctor | null> {
  return dbGetDoctorById(id);
}

export async function fetchDoctorCounts(): Promise<{
  bySpecialty: Record<string, number>;
  byGender: Record<string, number>;
  byClinic: Record<string, number>;
}> {
  return dbGetDoctorCounts();
}
