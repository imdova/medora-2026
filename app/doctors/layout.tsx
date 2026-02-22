import { DoctorsHeader } from "@/components/features/doctors/doctors-header";

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DoctorsHeader />
      {children}
    </div>
  );
}
