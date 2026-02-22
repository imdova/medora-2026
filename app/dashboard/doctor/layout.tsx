import { DoctorDashboardSidebar } from "@/components/features/dashboard/doctor/doctor-dashboard-sidebar";
import { DoctorDashboardHeader } from "@/components/features/dashboard/doctor/doctor-dashboard-header";

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DoctorDashboardSidebar />
      <div className="flex flex-1 flex-col min-w-0 bg-background">
        <DoctorDashboardHeader />
        <main className="flex-1 min-h-0">{children}</main>
      </div>
    </div>
  );
}
