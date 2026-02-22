"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Coffee, Timer, Palmtree, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const BUFFER_OPTIONS = ["5 minutes", "10 minutes", "15 minutes", "20 minutes", "30 minutes"];

function Toggle({
  checked,
  onCheckedChange,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}

export function AvailabilitySettingsView() {
  const [workingDays, setWorkingDays] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });
  const [buffer, setBuffer] = useState("10 minutes");
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationFrom, setVacationFrom] = useState("");
  const [vacationTo, setVacationTo] = useState("");
  const [vacationReason, setVacationReason] = useState("");
  const [upcomingVacations, setUpcomingVacations] = useState(["Dec 24 - Jan 02 Holiday Break"]);
  const [breaks, setBreaks] = useState([{ id: "1", label: "Lunch Break", start: "12:00 PM", end: "01:00 PM" }]);

  const removeVacation = (index: number) => {
    setUpcomingVacations((prev) => prev.filter((_, i) => i !== index));
  };

  const removeBreak = (id: string) => {
    setBreaks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Availability Settings</h1>
        <Button>Save Changes</Button>
      </div>

      {/* Weekly Working Hours */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Weekly Working Hours
          </CardTitle>
          <CardDescription>
            Set your standard weekly schedule for patient appointments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center gap-4 flex-wrap">
                <Toggle
                checked={workingDays[day] ?? false}
                onCheckedChange={(v) => setWorkingDays((prev) => ({ ...prev, [day]: v }))}
              />
              <span className="w-28 text-sm font-medium">{day}</span>
              {workingDays[day] ? (
                <>
                  <Input
                    type="text"
                    defaultValue="09:00 AM"
                    className="w-28 h-9 bg-muted/50"
                  />
                  <span className="text-sm text-muted-foreground">to</span>
                  <Input
                    type="text"
                    defaultValue="05:00 PM"
                    className="w-28 h-9 bg-muted/50"
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="Add time block">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-auto">8h total</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Unavailable</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Break Times */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-primary" />
            Break Times
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {breaks.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
              <div>
                <p className="font-medium text-sm">{b.label}</p>
                <p className="text-sm text-muted-foreground">{b.start} - {b.end}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => removeBreak(b.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          ))}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 py-4 text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Break
          </button>
        </CardContent>
      </Card>

      {/* Buffer Time */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            Buffer Time
          </CardTitle>
          <CardDescription>
            Extra time between appointments for paperwork or preparation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={buffer} onValueChange={setBuffer}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BUFFER_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Vacation Mode */}
      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Palmtree className="h-5 w-5 text-primary" />
                Vacation Mode
              </CardTitle>
              <CardDescription className="mt-1.5">
                Block out specific dates on your calendar when you will be unavailable.
              </CardDescription>
            </div>
            <Toggle checked={vacationMode} onCheckedChange={setVacationMode} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">From Date</Label>
              <Input placeholder="mm/dd/yyyy" value={vacationFrom} onChange={(e) => setVacationFrom(e.target.value)} className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">To Date</Label>
              <Input placeholder="mm/dd/yyyy" value={vacationTo} onChange={(e) => setVacationTo(e.target.value)} className="bg-muted/50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase text-muted-foreground">Reason (optional)</Label>
            <Input placeholder="e.g. Annual Leave" value={vacationReason} onChange={(e) => setVacationReason(e.target.value)} className="bg-muted/50" />
          </div>
          {upcomingVacations.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Upcoming Out-of-Office</p>
              <ul className="space-y-2">
                {upcomingVacations.map((v, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-2 text-sm">
                    {v}
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeVacation(i)} aria-label="Remove">
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Preferences */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Booking Preferences</CardTitle>
          <CardDescription>
            Configure how patients can book appointments with you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Additional booking options can be configured here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
