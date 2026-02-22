/**
 * Dummy profile image URL for doctors. Stable per doctor id (same id = same image).
 * Uses DiceBear avataaars style for person-like avatars.
 */
const DICEBEAR_BASE = "https://api.dicebear.com/7.x/avataaars/png";

export function getDoctorImageUrl(doctorId: string, size = 400): string {
  return `${DICEBEAR_BASE}?seed=${encodeURIComponent(doctorId)}&size=${size}`;
}
