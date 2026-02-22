"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MessageCircle, Star, Check } from "lucide-react";
import type { Doctor } from "@/types";
import { getDoctorImageUrl } from "@/lib/utils/doctor-image";

type DoctorListCardProps = {
  doctor: Doctor;
};

function formatReviewCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function DoctorListCard({ doctor }: DoctorListCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = doctor.imagePlaceholder ?? getDoctorImageUrl(doctor.id, 120);
  const reviews = doctor.reviewCount ?? 0;
  const slots = doctor.availableSlotsToday ?? [];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-6">
          {/* Left: avatar, rating, View Profile */}
          <div className="flex flex-col items-center gap-2 sm:w-32 shrink-0">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-muted">
              {!imageError ? (
                <Image
                  src={imageUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <span className="text-2xl font-semibold">
                    {doctor.name.slice(2, 4).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3 w-3" />
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-muted-foreground">
                ({formatReviewCount(reviews)} Reviews)
              </span>
            </div>
            <Button variant="link" className="h-auto p-0 text-primary text-sm" asChild>
              <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
            </Button>
          </div>

          {/* Right: details and actions */}
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">{doctor.name}</p>
                <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {doctor.specialty}
                </p>
              </div>
              <p className="text-lg font-semibold text-primary shrink-0">
                ${doctor.consultationFee}
              </p>
            </div>

            {doctor.qualifications && (
              <p className="text-sm text-muted-foreground">
                {doctor.qualifications}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {doctor.clinic && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {doctor.clinic}
                  {doctor.clinicAddress && ` · ${doctor.clinicAddress}`}
                </span>
              )}
              {doctor.languages.length > 0 && (
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                  Languages {doctor.languages.join(", ")}
                </span>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Available Slots Today
              </p>
              {slots.length > 0 ? (
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {slots.slice(0, 5).map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      asChild
                    >
                      <Link href={`/doctors/${doctor.id}?slot=${encodeURIComponent(time)}`}>
                        {time}
                      </Link>
                    </Button>
                  ))}
                  {slots.length > 5 && (
                    <Button variant="link" className="h-8 text-primary text-xs" asChild>
                      <Link href={`/doctors/${doctor.id}`}>More Times</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  No more slots today
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild>
                <Link href={`/doctors/${doctor.id}`}>Book Appointment</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:+1234567890`}>Call Clinic</a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
