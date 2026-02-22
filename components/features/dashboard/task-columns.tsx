"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Task } from "@/types";
import { Badge } from "@/components/ui/badge";

const statusVariant: Record<Task["status"], "secondary" | "default" | "outline"> = {
  todo: "outline",
  in_progress: "default",
  done: "secondary",
};

const priorityVariant: Record<Task["priority"], "secondary" | "default" | "destructive"> = {
  low: "secondary",
  medium: "default",
  high: "destructive",
};

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      return (
        <Badge variant={statusVariant[status]} className="capitalize">
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Task["priority"];
      return (
        <Badge variant={priorityVariant[priority]} className="capitalize">
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due date",
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "—";
    },
  },
];
