import { PatientDirectoryView } from "@/components/features/dashboard/doctor/patients/patient-directory-view";

type Props = {
  searchParams: Promise<{ patientId?: string }>;
};

export default async function DoctorPatientsPage({ searchParams }: Props) {
  const { patientId } = await searchParams;
  return (
    <div className="h-full min-h-0 flex flex-col">
      <PatientDirectoryView highlightPatientId={patientId ?? undefined} />
    </div>
  );
}
