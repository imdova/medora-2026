"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  Video,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NewAppointmentModal } from "./new-appointment-modal";
import { RescheduleModal } from "./reschedule-modal";
import {
  PENDING_REQUESTS_DATA,
  UPCOMING_APPOINTMENTS_DATA,
} from "@/lib/data/doctor-patients";

const DAYS = [
  { label: "MON 12", date: "Oct 12" },
  { label: "TUE 13", date: "Oct 13" },
  { label: "WED 14", date: "Oct 14" },
  { label: "THU 15", date: "Oct 15" },
  { label: "FRI 16", date: "Oct 16" },
];

export function ManageAppointmentsView() {
  const searchParams = useSearchParams();
  const initialNewPatientId = searchParams.get("new") === "1" ? searchParams.get("patientId") : null;
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState(2);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [reschedulePatient, setReschedulePatient] = useState<{ name: string; patientId: string } | null>(null);

  useEffect(() => {
    if (initialNewPatientId) setNewModalOpen(true);
  }, [initialNewPatientId]);

  const openReschedule = (name: string, patientId: string) => {
    setReschedulePatient({ name, patientId });
    setRescheduleOpen(true);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Page header: search + bell + New Appointment */}
      <div className="flex shrink-0 items-center gap-4 border-b bg-background px-6 py-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients, appointments, or medical IDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted/50"
          />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button className="gap-2" onClick={() => setNewModalOpen(true)}>
          <Plus className="h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Appointments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Organize your daily schedule and handle patient requests
          </p>
        </div>

        {/* Date strip */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-1 flex-1 justify-center flex-wrap">
            {DAYS.map((day, i) => (
              <Button
                key={day.label}
                variant={selectedDay === i ? "default" : "outline"}
                size="sm"
                className={cn("shrink-0", selectedDay === i && "bg-primary")}
                onClick={() => setSelectedDay(i)}
              >
                {day.label}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Two columns */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Requests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">Pending Requests</h2>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-0">
                  3 New
                </Badge>
              </div>
              <Button variant="link" className="text-primary p-0 h-auto text-sm font-medium">
                View all requests
              </Button>
            </div>
            <div className="space-y-4">
              {PENDING_REQUESTS_DATA.map((req) => (
                <Card key={req.id} className="rounded-xl shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/doctor/patients?patientId=${req.patientId}`}
                            className="font-semibold hover:text-primary hover:underline"
                          >
                            {req.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">Requested: {req.requested}</p>
                        </div>
                      </div>
                      <Badge className={cn("text-xs shrink-0", req.tagClass)}>{req.tag}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 italic">&ldquo;{req.reason}&rdquo;</p>
                    <div className="flex gap-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => openReschedule(req.name, req.patientId)}>
                        Reschedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">
                Upcoming - Wednesday, Oct 14
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Filter">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-muted" />
              <div className="space-y-4">
                {UPCOMING_APPOINTMENTS_DATA.map((apt) => (
                  <div key={apt.id} className="relative flex gap-4">
                    <div
                      className={cn(
                        "absolute left-[-22px] top-1 h-3 w-3 rounded-full border-2 border-background",
                        apt.inProgress ? "bg-primary" : "bg-muted-foreground/40"
                      )}
                    />
                    <Card
                      className={cn(
                        "flex-1 rounded-xl shadow-sm",
                        apt.inProgress && "border-primary/30 bg-primary/5"
                      )}
                    >
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-bold">
                            {apt.time}
                            <span className="text-xs font-normal text-muted-foreground ml-1">{apt.period}</span>
                          </p>
                          <Link
                            href={`/dashboard/doctor/patients?patientId=${apt.patientId}`}
                            className="font-semibold hover:text-primary hover:underline block"
                          >
                            {apt.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{apt.type}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {apt.inProgress && (
                            <>
                              <Badge className="bg-primary/20 text-primary border-0">IN PROGRESS</Badge>
                              <Button size="sm">Start Visit</Button>
                            </>
                          )}
                          {!apt.inProgress && (
                            <>
                              {apt.isTelehealth && (
                                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Video call">
                                  <Video className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                Details
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewAppointmentModal
        open={newModalOpen}
        onOpenChange={setNewModalOpen}
        initialPatientId={initialNewPatientId ?? undefined}
      />
      <RescheduleModal
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
        patientName={reschedulePatient?.name ?? ""}
        patientId={reschedulePatient?.patientId ?? ""}
      />
    </div>
  );
}
