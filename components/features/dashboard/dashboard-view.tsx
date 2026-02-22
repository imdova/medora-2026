"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { SortableCards, type SortableItem } from "@/components/shared/sortable-cards";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { TaskFormModal } from "./task-form-modal";
import { taskColumns } from "./task-columns";
import { fetchTasks, createTask } from "@/lib/dal";
import type { Task } from "@/types";
import type { CreateTaskSchema } from "@/lib/validations/task";
import { Plus } from "lucide-react";

const defaultSortableItems: SortableItem[] = [
  { id: "1", title: "Priority care", description: "Urgent cases first" },
  { id: "2", title: "Follow-ups", description: "Schedule callbacks" },
  { id: "3", title: "Documentation", description: "Update patient notes" },
];

export function DashboardView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortableItems, setSortableItems] = useState<SortableItem[]>(defaultSortableItems);
  const [editorContent, setEditorContent] = useState("<p>Notes and instructions…</p>");

  useEffect(() => {
    let cancelled = false;
    fetchTasks().then((data) => {
      if (!cancelled) {
        setTasks(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateTask = async (data: CreateTaskSchema) => {
    const created = await createTask(data);
    setTasks((prev) => [created, ...prev]);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview and quick actions for Medora 247.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Tasks</h2>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New task
          </Button>
        </div>
        {loading ? (
          <div className="rounded-md border p-8 text-center text-muted-foreground">
            Loading…
          </div>
        ) : (
          <DataTable
            columns={taskColumns}
            data={tasks}
            enableSorting
            enablePagination
            enableRowSelection
            pageSize={5}
            emptyMessage="No tasks yet. Create one to get started."
          />
        )}
        <TaskFormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSubmit={handleCreateTask}
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick priorities</CardTitle>
            <p className="text-sm text-muted-foreground">
              Drag to reorder. Order is saved in local state.
            </p>
          </CardHeader>
          <CardContent>
            <SortableCards
              items={sortableItems}
              onChange={setSortableItems}
            />
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <p className="text-sm text-muted-foreground">
              Rich text editor with toolbar. Content is controlled.
            </p>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={editorContent}
              onChange={setEditorContent}
              placeholder="Start writing…"
            />
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
