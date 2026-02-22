import { notFound } from "next/navigation";
import { fetchDoctorById } from "@/lib/dal/doctor";
import { DoctorProfileView } from "@/components/features/doctors/doctor-profile-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DoctorProfilePage({ params }: Props) {
  const { id } = await params;
  const doctor = await fetchDoctorById(id);
  if (!doctor) notFound();
  return <DoctorProfileView doctor={doctor} />;
}
