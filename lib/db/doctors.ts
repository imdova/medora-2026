import { delay } from "./delay";
import type { Doctor } from "@/types";

const specialties = [
  "Psychologist", "Pediatrician", "Cardiologist", "Urology", "Psychiatry",
  "Neurology", "Pulmonology", "Dentist", "Orthopedist", "Gynecologist",
];
const locations = ["Minneapolis, MN", "Ogden, IA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "New York, NY"];
const clinicEntries: { name: string; address: string }[] = [
  { name: "Bright Smiles Dental Clinic", address: "100 Main St. Minneapolis, MN" },
  { name: "Family Care Clinic", address: "22 Baker St. New York, NY" },
  { name: "Express Health Clinic", address: "105 5th Ave, New York, NY" },
  { name: "City Medical Center", address: "450 Lexington Ave, New York, NY" },
  { name: "City Heart Clinic", address: "22 Baker St. New York, NY" },
  { name: "East Side Cardiology", address: "105 5th Ave, New York, NY" },
  { name: "NY Medical Center", address: "450 Lexington Ave, New York, NY" },
];
const qualificationsTemplates = ["MBBS, MD, FRCP", "MBBS, PhD", "MD, FACC", "MD, FACP", "DO, MPH"];
const slotTimes = ["09:00 AM", "10:00 AM", "10:30 AM", "11:30 AM", "01:00 PM", "02:00 PM", "03:30 PM", "04:30 PM", "05:00 PM"];

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDoctors(count: number): Doctor[] {
  const firstNames = ["James", "Sarah", "Michael", "Emily", "David", "Jessica", "Robert", "Amanda", "John", "Lisa", "Chen", "Mitchell", "Wilson"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Martinez", "Chen", "Mitchell"];
  const list: Doctor[] = [];
  for (let i = 0; i < count; i++) {
    const clinicEntry = randomPick(clinicEntries);
    const exp = randomPick([2, 5, 10, 14, 22]);
    const hasSlots = Math.random() > 0.2;
    const numSlots = hasSlots ? randomInt(2, 5) : 0;
    list.push({
      id: `doc-${i + 1}`,
      name: `Dr. ${randomPick(firstNames)} ${randomPick(lastNames)}`,
      specialty: randomPick(specialties),
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      reviewCount: randomInt(80, 1200),
      available: Math.random() > 0.25,
      location: randomPick(locations),
      clinicAddress: clinicEntry.address,
      durationMinutes: randomPick([30, 45, 60]),
      consultationFee: randomInt(95, 500),
      gender: Math.random() > 0.5 ? "male" : "female",
      experienceYears: exp,
      qualifications: `${randomPick(qualificationsTemplates)} - ${exp} Years Experience`,
      clinic: clinicEntry.name,
      consultationTypes: ["audio", "video", "instant", "chat"].filter(() => Math.random() > 0.4) as Doctor["consultationTypes"],
      languages: ["English", "French", "Spanish", "German", "Mandarin", "Cantonese"].filter(() => Math.random() > 0.5),
      availableSlotsToday: hasSlots ? slotTimes.slice(0, numSlots).sort() : [],
    });
  }
  return list;
}

const allDoctors = generateDoctors(450);

function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export type GetDoctorsOptions = {
  search?: string;
  location?: string;
  specialty?: string;
  gender?: string;
  availableToday?: boolean;
  availableTomorrow?: boolean;
  priceMin?: number;
  priceMax?: number;
  experienceMin?: number;
  clinic?: string;
  consultationType?: string;
  language?: string;
  ratingMin?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "name";
  offset?: number;
  limit?: number;
};

export async function getDoctors(options?: GetDoctorsOptions): Promise<{ doctors: Doctor[]; total: number }> {
  await delay(400);
  let result = [...allDoctors];

  if (options?.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        (d.clinic?.toLowerCase().includes(q) ?? false)
    );
  }
  if (options?.location) {
    result = result.filter((d) => d.location.toLowerCase().includes(options.location!.toLowerCase()));
  }
  if (options?.specialty) {
    result = result.filter((d) => d.specialty === options.specialty);
  }
  if (options?.gender) {
    result = result.filter((d) => d.gender === options.gender);
  }
  if (options?.availableToday) {
    result = result.filter((d) => d.available);
  }
  if (options?.availableTomorrow) {
    result = result.filter((d) => d.available);
  }
  if (options?.consultationType === "video") {
    result = result.filter((d) => d.consultationTypes.includes("video"));
  }
  if (options?.priceMin != null) {
    result = result.filter((d) => d.consultationFee >= options.priceMin!);
  }
  if (options?.priceMax != null) {
    result = result.filter((d) => d.consultationFee <= options.priceMax!);
  }
  if (options?.experienceMin != null) {
    result = result.filter((d) => d.experienceYears >= options.experienceMin!);
  }
  if (options?.clinic) {
    result = result.filter((d) => d.clinic === options.clinic);
  }
  if (options?.language) {
    result = result.filter((d) => d.languages.includes(options.language!));
  }
  if (options?.ratingMin != null) {
    result = result.filter((d) => d.rating >= options.ratingMin!);
  }

  const total = result.length;

  if (options?.sortBy === "price_asc") {
    result.sort((a, b) => a.consultationFee - b.consultationFee);
  } else if (options?.sortBy === "price_desc") {
    result.sort((a, b) => b.consultationFee - a.consultationFee);
  } else if (options?.sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (options?.sortBy === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? 9;
  result = result.slice(offset, offset + limit);

  return { doctors: deepClone(result), total };
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  await delay(250);
  const doctor = allDoctors.find((d) => d.id === id);
  if (!doctor) return null;
  const clone = deepClone(doctor) as Doctor;
  if (id === "doc-1") {
    clone.name = "Dr. Sarah Mitchell";
    clone.specialty = "Cardiologist";
    clone.rating = 4.9;
    clone.reviewCount = 1248;
    clone.consultationFee = 120;
    clone.location = "New York, USA";
    clone.experienceYears = 14;
    clone.qualifications = "MBBS, MD, FRCP - 14 Years Experience";
    clone.about = "Dr. Mitchell is a board-certified interventional cardiologist with over 14 years of experience. She specializes in interventional cardiology and is committed to a patient-centric approach, leveraging the latest technology for diagnosis and treatment. She has published numerous papers in leading cardiology journals.";
    clone.education = [
      { title: "Fellowship in Interventional Cardiology", place: "Mayo Clinic, Rochester, MN", years: "2012-2014" },
      { title: "Residency in Internal Medicine", place: "Johns Hopkins University Hospital", years: "2009-2012" },
      { title: "Doctor of Medicine (MD)", place: "Harvard Medical School", years: "2005-2009" },
    ];
    clone.specialtyTags = ["Interventional Cardiology", "Heart Failure", "Echocardiography", "Preventative Care", "Coronary Artery Disease"];
    clone.satisfaction = 98;
    clone.availableSlotsToday = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"];
  } else {
    if (!clone.about) clone.about = `${clone.name} brings ${clone.experienceYears} years of experience in ${clone.specialty}. Committed to patient-centered care and evidence-based practice.`;
    if (!clone.education?.length) clone.education = [{ title: "Residency", place: "University Hospital", years: "2009-2012" }, { title: "Doctor of Medicine (MD)", place: "Medical School", years: "2005-2009" }];
    if (!clone.specialtyTags?.length) clone.specialtyTags = [clone.specialty];
    if (clone.satisfaction == null) clone.satisfaction = 95 + Math.floor(Math.random() * 4);
  }
  return clone;
}

export async function getDoctorCounts(): Promise<{
  bySpecialty: Record<string, number>;
  byGender: Record<string, number>;
  byClinic: Record<string, number>;
}> {
  await delay(200);
  const bySpecialty: Record<string, number> = {};
  const byGender: Record<string, number> = { male: 0, female: 0 };
  const byClinic: Record<string, number> = {};
  for (const d of allDoctors) {
    bySpecialty[d.specialty] = (bySpecialty[d.specialty] ?? 0) + 1;
    byGender[d.gender]++;
    if (d.clinic) byClinic[d.clinic] = (byClinic[d.clinic] ?? 0) + 1;
  }
  return { bySpecialty, byGender, byClinic };
}
