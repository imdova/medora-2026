"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Check, User, CalendarClock } from "lucide-react";
import type { Doctor } from "@/types";
import { cn } from "@/lib/utils";
import { getDoctorImageUrl } from "@/lib/utils/doctor-image";

type DoctorCardProps = {
  doctor: Doctor;
};

function formatReviewCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = doctor.imagePlaceholder ?? getDoctorImageUrl(doctor.id, 200);
  const reviews = doctor.reviewCount ?? 0;
  const slots = doctor.availableSlotsToday ?? [];

  return (
    <Card className="overflow-hidden transition hover:shadow-md">
      <CardContent className="flex flex-col items-center pt-6 pb-5">
        {/* Circular profile image with verification badge */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-muted">
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="120px"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <User className="h-12 w-12" />
            </div>
          )}
          <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
            <Check className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Name */}
        <p className="mt-4 text-center text-lg font-bold text-foreground">
          {doctor.name}
        </p>
        {/* Specialty - uppercase, smaller */}
        <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {doctor.specialty}
        </p>

        {/* Rating + reviews */}
        <div className="mt-2 flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-foreground">
            {doctor.rating.toFixed(1)}
          </span>
          <span className="text-muted-foreground">
            ({formatReviewCount(reviews)})
          </span>
        </div>

        {/* Availability status */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-sm">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              doctor.available ? "bg-primary" : "bg-muted-foreground/50"
            )}
            aria-hidden
          />
          <span className="text-muted-foreground">
            {doctor.available ? "Available Today" : "Next: Tomorrow"}
          </span>
        </div>

        {/* Available slots section */}
        <div className="mt-4 w-full">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Available Slots
          </p>
          {slots.length > 0 ? (
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {slots.slice(0, 4).map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-normal"
                  asChild
                >
                  <Link href={`/doctors/${doctor.id}?slot=${encodeURIComponent(time)}`}>
                    {time}
                  </Link>
                </Button>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              No more slots today
            </p>
          )}
          <div className="mt-2 flex items-center justify-center gap-1">
            <CalendarClock className="h-3.5 w-3.5 text-muted-foreground" />
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-primary"
              asChild
            >
              <Link href={`/doctors/${doctor.id}`}>
                {slots.length > 0 ? "More Times" : "Full Schedule"}
              </Link>
            </Button>
          </div>
        </div>

        {/* Book Now - full width green */}
        <Button className="mt-4 w-full" asChild>
          <Link href={`/doctors/${doctor.id}`}>Book Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
