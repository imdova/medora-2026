import { delay } from "./delay";
import type { Task, CreateTaskInput, UpdateTaskInput } from "@/types";

const tasks: Task[] = [
  {
    id: "1",
    title: "Review patient records",
    status: "in_progress",
    priority: "high",
    assigneeId: "2",
    dueDate: "2026-02-25",
    createdAt: "2026-02-20T09:00:00Z",
    updatedAt: "2026-02-22T10:00:00Z",
  },
  {
    id: "2",
    title: "Update clinic hours",
    status: "todo",
    priority: "medium",
    assigneeId: "1",
    dueDate: "2026-02-28",
    createdAt: "2026-02-21T09:00:00Z",
    updatedAt: "2026-02-21T09:00:00Z",
  },
  {
    id: "3",
    title: "Prepare quarterly report",
    status: "done",
    priority: "high",
    assigneeId: "2",
    dueDate: "2026-02-15",
    createdAt: "2026-02-01T09:00:00Z",
    updatedAt: "2026-02-15T17:00:00Z",
  },
  {
    id: "4",
    title: "Schedule follow-up calls",
    status: "todo",
    priority: "low",
    dueDate: "2026-03-01",
    createdAt: "2026-02-22T08:00:00Z",
    updatedAt: "2026-02-22T08:00:00Z",
  },
];

function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export async function getTasks(): Promise<Task[]> {
  await delay(350);
  return deepClone(tasks);
}

export async function getTaskById(id: string): Promise<Task | null> {
  await delay(200);
  const task = tasks.find((t) => t.id === id);
  return task ? deepClone(task) : null;
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  await delay(250);
  const now = new Date().toISOString();
  const newTask: Task = {
    ...data,
    id: String(tasks.length + 1),
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(newTask);
  return deepClone(newTask);
}

export async function updateTask(
  id: string,
  data: UpdateTaskInput
): Promise<Task | null> {
  await delay(250);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = {
    ...tasks[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return deepClone(tasks[index]);
}

export async function deleteTask(id: string): Promise<boolean> {
  await delay(200);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
