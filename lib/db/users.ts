import { delay } from "./delay";
import type { User, CreateUserInput, UpdateUserInput } from "@/types";

const users: User[] = [
  {
    id: "1",
    email: "admin@medora247.com",
    name: "Admin User",
    role: "admin",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "amelia.ruth@medora247.com",
    name: "Dr. Amelia Ruth",
    role: "doctor",
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "3",
    email: "john.smith@medora247.com",
    name: "Dr. John Smith",
    role: "doctor",
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "4",
    email: "jane.doe@example.com",
    name: "Jane Doe",
    role: "patient",
    createdAt: "2025-02-10T00:00:00Z",
  },
];

function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export async function getUsers(): Promise<User[]> {
  await delay(300);
  return deepClone(users);
}

export async function getUserById(id: string): Promise<User | null> {
  await delay(200);
  const user = users.find((u) => u.id === id);
  return user ? deepClone(user) : null;
}

export async function createUser(data: CreateUserInput): Promise<User> {
  await delay(250);
  const newUser: User = {
    ...data,
    id: String(users.length + 1),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return deepClone(newUser);
}

export async function updateUser(
  id: string,
  data: UpdateUserInput
): Promise<User | null> {
  await delay(250);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data };
  return deepClone(users[index]);
}

export async function deleteUser(id: string): Promise<boolean> {
  await delay(200);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}
