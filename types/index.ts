/**
 * Shared domain types. Used by db, dal, and UI.
 * Keep stable when switching from dummy DB to real API.
 */

export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "doctor" | "patient";
  avatar?: string;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserInput = Omit<User, "id" | "createdAt">;
export type UpdateUserInput = Partial<CreateUserInput>;

export type CreateTaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type UpdateTaskInput = Partial<CreateTaskInput>;

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount?: number;
  available: boolean;
  location: string;
  clinicAddress?: string;
  durationMinutes: number;
  consultationFee: number;
  imagePlaceholder?: string;
  gender: "male" | "female";
  experienceYears: number;
  qualifications?: string;
  clinic?: string;
  consultationTypes: ("audio" | "video" | "instant" | "chat")[];
  languages: string[];
  availableSlotsToday?: string[];
  /** Profile page: long bio */
  about?: string;
  /** Profile page: education entries */
  education?: { title: string; place: string; years: string }[];
  /** Profile page: specialty tags (pills) */
  specialtyTags?: string[];
  /** Profile page: satisfaction percentage */
  satisfaction?: number;
}
