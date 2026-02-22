/**
 * Shared patient and appointment data for Doctor Dashboard:
 * Patients directory, Appointments page, and related modals.
 */

export type PatientStatus = "CONFIRMED" | "PENDING" | "FOLLOW UP";

export type PatientRow = {
  id: string;
  name: string;
  email: string;
  patientId: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: PatientStatus;
};

export type PatientDetail = PatientRow & {
  patientSince: string;
  bloodType: string;
  weight: string;
  height: string;
  chronicConditions: { name: string; variant: "red" | "blue" }[];
  prescriptions: { name: string; instructions: string }[];
  recentActivity: { title: string; date: string; by: string; note?: string }[];
};

export const MOCK_PATIENTS: PatientRow[] = [
  { id: "1", name: "James Wilson", email: "j.wilson@example.com", patientId: "#MD-92831", age: 42, gender: "Male", lastVisit: "Oct 12, 2023", status: "CONFIRMED" },
  { id: "2", name: "Emma Thompson", email: "e.thompson@example.com", patientId: "#MD-92832", age: 34, gender: "Female", lastVisit: "Oct 10, 2023", status: "PENDING" },
  { id: "3", name: "Michael Roberts", email: "m.roberts@example.com", patientId: "#MR-4092", age: 55, gender: "Male", lastVisit: "Oct 8, 2023", status: "FOLLOW UP" },
  { id: "4", name: "Michael Brown", email: "m.brown@example.com", patientId: "#MD-92833", age: 58, gender: "Male", lastVisit: "Oct 8, 2023", status: "FOLLOW UP" },
  { id: "5", name: "Sarah Davis", email: "s.davis@example.com", patientId: "#MD-92834", age: 29, gender: "Female", lastVisit: "Oct 5, 2023", status: "CONFIRMED" },
  { id: "6", name: "Elena Rodriguez", email: "e.rodriguez@example.com", patientId: "#MD-92835", age: 38, gender: "Female", lastVisit: "Oct 4, 2023", status: "CONFIRMED" },
  { id: "7", name: "Thomas Miller", email: "t.miller@example.com", patientId: "#MD-92836", age: 62, gender: "Male", lastVisit: "Oct 3, 2023", status: "CONFIRMED" },
  { id: "8", name: "Sophia Lane", email: "s.lane@example.com", patientId: "#MD-92837", age: 45, gender: "Female", lastVisit: "Oct 2, 2023", status: "PENDING" },
  { id: "9", name: "Aria Thorne", email: "a.thorne@example.com", patientId: "#MD-92838", age: 31, gender: "Female", lastVisit: "Oct 1, 2023", status: "PENDING" },
];

export type PendingRequest = {
  id: string;
  patientId: string;
  name: string;
  requested: string;
  tag: string;
  tagClass: string;
  reason: string;
};

export type UpcomingAppointment = {
  id: string;
  patientId: string;
  time: string;
  period: string;
  name: string;
  type: string;
  inProgress: boolean;
  isTelehealth: boolean;
};

export const PENDING_REQUESTS_DATA: PendingRequest[] = [
  { id: "pr1", patientId: "3", name: "Michael Roberts", requested: "Today, 02:45 PM", tag: "URGENT", tagClass: "bg-amber-500 text-white border-0", reason: "Persistent chest pain and shortness of breath for the last two days." },
  { id: "pr2", patientId: "9", name: "Aria Thorne", requested: "Mon, 12 Oct • 10:00 AM", tag: "CHECK-UP", tagClass: "bg-muted text-muted-foreground border-0", reason: "Annual cardiac screening and refill for medication." },
];

export const UPCOMING_APPOINTMENTS_DATA: UpcomingAppointment[] = [
  { id: "u1", patientId: "1", time: "09:00", period: "AM", name: "James Wilson", type: "General Checkup • In-Person", inProgress: false, isTelehealth: false },
  { id: "u2", patientId: "6", time: "10:30", period: "AM", name: "Elena Rodriguez", type: "Follow-up • Telehealth", inProgress: false, isTelehealth: true },
  { id: "u3", patientId: "7", time: "02:00", period: "PM", name: "Thomas Miller", type: "Diagnostic Review • In-Person", inProgress: true, isTelehealth: false },
  { id: "u4", patientId: "8", time: "03:30", period: "PM", name: "Sophia Lane", type: "Consultation • In-Person", inProgress: false, isTelehealth: false },
];

export function getPatientDetail(row: PatientRow): PatientDetail {
  return {
    ...row,
    patientSince: "Jan 2021",
    bloodType: "A+",
    weight: "78kg",
    height: "182cm",
    chronicConditions: [
      { name: "Hypertension", variant: "red" },
      { name: "Asthma", variant: "blue" },
    ],
    prescriptions: [
      { name: "Lisinopril 10mg", instructions: "1 tablet daily in the morning" },
      { name: "Albuterol Inhaler", instructions: "2 puffs every 4-6 hours as needed" },
    ],
    recentActivity: [
      { title: "Annual Checkup", date: "Oct 12, 2023", by: "Dr. Sarah Chen", note: "Blood pressure stable. Patient reports better sleep patterns..." },
      { title: "Lab Results: Blood Panel", date: "Aug 20, 2023", by: "General Labs" },
    ],
  };
}

export function findPatientById(id: string): PatientRow | undefined {
  return MOCK_PATIENTS.find((p) => p.id === id);
}

export function searchPatients(query: string): PatientRow[] {
  if (!query.trim()) return MOCK_PATIENTS;
  const q = query.toLowerCase();
  return MOCK_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.patientId.toLowerCase().includes(q)
  );
}
