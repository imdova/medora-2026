"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Bell,
  SlidersHorizontal,
  User,
  Pencil,
  X,
  Stethoscope,
  Pill,
  TrendingUp,
  CalendarPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MOCK_PATIENTS,
  getPatientDetail,
  type PatientRow,
  type PatientDetail,
  type PatientStatus,
} from "@/lib/data/doctor-patients";

export type { PatientStatus, PatientRow, PatientDetail };

const PAGE_SIZE = 4;
const TOTAL_PATIENTS = 1284;
const NEW_THIS_WEEK = 24;

const statusClass: Record<PatientStatus, string> = {
  CONFIRMED: "bg-primary text-primary-foreground border-0",
  PENDING: "bg-amber-500 text-white border-0",
  "FOLLOW UP": "bg-blue-600 text-white border-0",
};

type PatientDirectoryViewProps = {
  /** When set, select this patient on mount (e.g. from /patients?patientId=3) */
  highlightPatientId?: string | null;
};

export function PatientDirectoryView({ highlightPatientId }: PatientDirectoryViewProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<PatientDetail | null>(() => getPatientDetail(MOCK_PATIENTS[0]!));

  useEffect(() => {
    if (highlightPatientId) {
      const row = MOCK_PATIENTS.find((p) => p.id === highlightPatientId);
      if (row) setSelected(getPatientDetail(row));
    }
  }, [highlightPatientId]);

  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, TOTAL_PATIENTS);
  const rows = MOCK_PATIENTS; // In real app, slice from fetched list

  return (
    <div className="flex h-full min-h-0">
      {/* Main: Directory */}
      <div className="flex flex-1 flex-col min-w-0 border-r">
        {/* Header: search + filters + bell */}
        <div className="flex items-center gap-4 border-b bg-background px-6 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients by name, ID, or last visit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-muted/50"
            />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Title + subtitle + badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Patient Directory</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              You have {TOTAL_PATIENTS.toLocaleString()} patients registered in your database.
            </p>
          </div>
          <Badge className="bg-primary text-primary-foreground border-0 shrink-0">
            +{NEW_THIS_WEEK} this week
          </Badge>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Patient Name</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Patient ID</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Age / Gender</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Last Visit</TableHead>
                <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "cursor-pointer",
                    selected?.id === row.id && "bg-primary/5"
                  )}
                  onClick={() => setSelected(getPatientDetail(row))}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{row.name}</p>
                        <p className="text-xs text-muted-foreground">{row.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.patientId}</TableCell>
                  <TableCell>{row.age} / {row.gender}</TableCell>
                  <TableCell>{row.lastVisit}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", statusClass[row.status])}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-6 py-3 text-sm text-muted-foreground">
          <span>
            Showing {start + 1} to {Math.min(end, TOTAL_PATIENTS)} of {TOTAL_PATIENTS} patients
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={end >= TOTAL_PATIENTS}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Patient Details Panel */}
      <aside className="flex w-[380px] shrink-0 flex-col border-l bg-card overflow-hidden">
        {selected ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Panel header */}
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="Close" onClick={() => setSelected(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <p className="text-sm text-muted-foreground">Patient since {selected.patientSince}</p>
              </div>

              {/* Vital cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Blood</p>
                  <p className="text-sm font-semibold">{selected.bloodType}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Weight</p>
                  <p className="text-sm font-semibold">{selected.weight}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Height</p>
                  <p className="text-sm font-semibold">{selected.height}</p>
                </div>
              </div>

              {/* Chronic Conditions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    Chronic Conditions
                  </h3>
                  <Button variant="link" className="text-primary p-0 h-auto text-xs font-medium">
                    Manage
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.chronicConditions.map((c) => (
                    <Badge
                      key={c.name}
                      className={cn(
                        "text-xs border-0",
                        c.variant === "red" && "bg-red-600 text-white",
                        c.variant === "blue" && "bg-blue-600 text-white"
                      )}
                    >
                      {c.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Prescriptions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <Pill className="h-4 w-4 text-primary" />
                    Recent Prescriptions
                  </h3>
                  <Badge variant="secondary" className="text-xs">New</Badge>
                </div>
                <ul className="space-y-2">
                  {selected.prescriptions.map((p) => (
                    <li key={p.name} className="text-sm">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-muted-foreground text-xs">{p.instructions}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Recent Activity
                </h3>
                <ul className="space-y-3">
                  {selected.recentActivity.map((a) => (
                    <li key={a.title + a.date} className="text-sm">
                      <p className="font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.date} • {a.by}
                      </p>
                      {a.note && <p className="text-xs text-muted-foreground mt-1">{a.note}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t p-4 space-y-2">
              <Button className="w-full" variant="default" asChild>
                <Link href={`/dashboard/doctor/appointments?new=1&patientId=${selected.id}`}>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="#">View Full Medical Record</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <User className="h-12 w-12 mb-3 opacity-50" />
            <p className="text-sm">Select a patient to view details</p>
          </div>
        )}
      </aside>
    </div>
  );
}
