"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Check, RotateCcw, User, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { findPatientById } from "@/lib/data/doctor-patients";

const SLOTS = ["09:00 AM", "10:30 AM", "01:15 PM", "02:30 PM", "04:00 PM", "05:30 PM"];
const OCTOBER_2023 = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31],
];

type RescheduleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  patientId: string;
};

export function RescheduleModal({
  open,
  onOpenChange,
  patientName,
  patientId,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedSlot, setSelectedSlot] = useState("01:15 PM");
  const [message, setMessage] = useState("");

  const handleClose = (next: boolean) => {
    if (!next) {
      setSelectedDate(15);
      setSelectedSlot("01:15 PM");
      setMessage("");
    }
    onOpenChange(next);
  };

  const slotLabel = selectedDate === 15 ? "Thu, Oct 15" : `Oct ${selectedDate}`;
  const patientDisplayId = patientId ? findPatientById(patientId)?.patientId : "MR-4092";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <RotateCcw className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle>Reschedule Appointment</DialogTitle>
              <DialogDescription>
                Find a new time slot that works for both you and the patient.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Original appointment */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Original Appointment
            </p>
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{patientName || "Michael Roberts"}</p>
                <p className="text-sm text-muted-foreground">#{patientDisplayId}</p>
                {patientId && (
                  <Button variant="link" className="text-primary p-0 h-auto mt-1 text-xs font-medium" asChild>
                    <Link href={`/dashboard/doctor/patients?patientId=${patientId}`}>
                      <UserCircle className="h-3.5 w-3.5 mr-1 inline" />
                      View patient
                    </Link>
                  </Button>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold uppercase text-muted-foreground flex items-center justify-end gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Date & Time
                </p>
                <p className="text-sm font-medium">Oct 14, 2023</p>
                <p className="text-sm text-muted-foreground">02:45 PM</p>
              </div>
            </div>
          </div>

          {/* Select new date */}
          <div>
            <Label className="mb-2 block">Select New Date</Label>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  ←
                </Button>
                <span className="font-medium">October 2023</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  →
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((d) => (
                  <span key={d} className="text-muted-foreground font-medium py-1">
                    {d}
                  </span>
                ))}
                {OCTOBER_2023.flatMap((row) =>
                  row.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "rounded-md py-1.5 text-sm font-medium transition-colors",
                        day === 14 && "bg-muted text-muted-foreground",
                        day === selectedDate && "bg-primary text-primary-foreground",
                        day !== 14 && day !== selectedDate && "hover:bg-muted"
                      )}
                    >
                      {day}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Available slots */}
          <div>
            <Label className="mb-2 block">Available Slots ({slotLabel})</Label>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={selectedSlot === slot ? "default" : "outline"}
                  size="sm"
                  className={selectedSlot === slot ? "bg-primary" : ""}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>

          {/* Message to patient */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="reschedule-message">Message to Patient</Label>
              <span className="text-xs text-muted-foreground">Optional</span>
            </div>
            <textarea
              id="reschedule-message"
              placeholder="Explain the reason for rescheduling or provide special instructions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={cn(
                "flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm",
                "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
              rows={3}
            />
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-muted-foreground/50" aria-hidden />
              The patient will receive a notification with the new details and your message.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={() => handleClose(false)}>
            <Check className="h-4 w-4" />
            Confirm Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
