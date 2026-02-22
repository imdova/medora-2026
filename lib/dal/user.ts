/**
 * Data Access Layer: Users.
 * UI imports only from /lib/dal. Replace this implementation with
 * fetch("/api/users") or server actions when connecting a real backend.
 */

import {
  getUsers as dbGetUsers,
  getUserById as dbGetUserById,
  createUser as dbCreateUser,
  updateUser as dbUpdateUser,
  deleteUser as dbDeleteUser,
} from "@/lib/db/users";
import type { User, CreateUserInput, UpdateUserInput } from "@/types";

export async function fetchUsers(): Promise<User[]> {
  return dbGetUsers();
}

export async function fetchUserById(id: string): Promise<User | null> {
  return dbGetUserById(id);
}

export async function createUser(data: CreateUserInput): Promise<User> {
  return dbCreateUser(data);
}

export async function updateUser(id: string, data: UpdateUserInput): Promise<User | null> {
  return dbUpdateUser(id, data);
}

export async function removeUser(id: string): Promise<boolean> {
  return dbDeleteUser(id);
}
