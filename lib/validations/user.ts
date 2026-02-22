import { z } from "zod";

const roleEnum = z.enum(["admin", "doctor", "patient"]);

export const createUserSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1, "Name is required").max(100),
  role: roleEnum,
  avatar: z.string().url().optional().or(z.literal("")),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
