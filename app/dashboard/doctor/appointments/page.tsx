import { Suspense } from "react";
import { ManageAppointmentsView } from "@/components/features/dashboard/doctor/appointments/manage-appointments-view";

export default function DoctorAppointmentsPage() {
  return (
    <div className="h-full min-h-0 flex flex-col">
      <Suspense fallback={<div className="p-6">Loading appointments...</div>}>
        <ManageAppointmentsView />
      </Suspense>
    </div>
  );
}
