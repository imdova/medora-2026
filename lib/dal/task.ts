/**
 * Data Access Layer: Tasks.
 * UI imports only from /lib/dal.
 */

import {
  getTasks as dbGetTasks,
  getTaskById as dbGetTaskById,
  createTask as dbCreateTask,
  updateTask as dbUpdateTask,
  deleteTask as dbDeleteTask,
} from "@/lib/db/tasks";
import type { Task, CreateTaskInput, UpdateTaskInput } from "@/types";

export async function fetchTasks(): Promise<Task[]> {
  return dbGetTasks();
}

export async function fetchTaskById(id: string): Promise<Task | null> {
  return dbGetTaskById(id);
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  return dbCreateTask(data);
}

export async function updateTask(id: string, data: UpdateTaskInput): Promise<Task | null> {
  return dbUpdateTask(id, data);
}

export async function removeTask(id: string): Promise<boolean> {
  return dbDeleteTask(id);
}
