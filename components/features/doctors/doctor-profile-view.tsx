"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  MapPin,
  ThumbsUp,
  Check,
  GraduationCap,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Phone,
  User,
} from "lucide-react";
import type { Doctor } from "@/types";
import { getDoctorImageUrl } from "@/lib/utils/doctor-image";
import { cn } from "@/lib/utils";

const DAYS = ["MON 14", "TUE 15", "WED 16", "THU 17", "FRI 18"];
const SLOTS = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"];

const MOCK_REVIEWS = [
  { name: "Robert Jenkins", initials: "RJ", rating: 5, text: "Dr. Mitchell was incredibly thorough and took the time to explain everything to me. I felt very heard and cared for.", date: "Visited Oct 12, 2024" },
];

type DoctorProfileViewProps = {
  doctor: Doctor;
};

function formatReviewCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function DoctorProfileView({ doctor }: DoctorProfileViewProps) {
  const [imageError, setImageError] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const imageUrl = doctor.imagePlaceholder ?? getDoctorImageUrl(doctor.id, 200);
  const slots = doctor.availableSlotsToday ?? SLOTS;

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-1">/</span>
            <Link href={`/doctors?specialty=${encodeURIComponent(doctor.specialty)}`} className="hover:text-foreground">{doctor.specialty}s</Link>
            <span className="mx-1">/</span>
            <span className="text-foreground">{doctor.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Doctor info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-muted">
                    {!imageError ? (
                      <Image
                        src={imageUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <User className="h-12 w-12" />
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-foreground">{doctor.name}</h1>
                      <span className="rounded bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                        {doctor.specialty.toUpperCase()}
                      </span>
                    </div>
                    {doctor.qualifications && (
                      <p className="mt-1 text-sm text-muted-foreground">{doctor.qualifications}</p>
                    )}
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-muted-foreground">
                        ({formatReviewCount(doctor.reviewCount ?? 0)} Reviews)
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {doctor.location}
                      </span>
                      {doctor.satisfaction != null && (
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {doctor.satisfaction}% Satisfaction
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 gap-0">
                <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  About
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="locations" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                  Locations
                </TabsTrigger>
                <TabsTrigger value="insurances" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                  Insurances
                </TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-6 space-y-6">
                {doctor.about && (
                  <div>
                    <h2 className="text-lg font-semibold">About {doctor.name.split(" ").pop()}</h2>
                    <p className="mt-2 text-muted-foreground">{doctor.about}</p>
                  </div>
                )}
                {doctor.education && doctor.education.length > 0 && (
                  <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                      <GraduationCap className="h-5 w-5" />
                      Education & Training
                    </h2>
                    <ul className="mt-2 space-y-2 text-muted-foreground">
                      {doctor.education.map((e, i) => (
                        <li key={i} className="flex flex-col">
                          <span className="font-medium text-foreground">{e.title}</span>
                          <span>{e.place} ({e.years})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {doctor.specialtyTags && doctor.specialtyTags.length > 0 && (
                  <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                      <Stethoscope className="h-5 w-5" />
                      Specialties
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {doctor.specialtyTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-3 py-1 text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="reviews">Reviews content</TabsContent>
              <TabsContent value="locations">
                {doctor.clinic && (
                  <p className="text-muted-foreground">
                    {doctor.clinic}
                    {doctor.clinicAddress && ` · ${doctor.clinicAddress}`}
                  </p>
                )}
              </TabsContent>
              <TabsContent value="insurances">
                <p className="text-muted-foreground">Contact the clinic for insurance details.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Appointment sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border bg-muted/30">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Consultation Fee
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${doctor.consultationFee} <span className="text-base font-normal text-muted-foreground">/per visit</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Schedule Appointment</h3>
                  <div className="mt-2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Previous week">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-1 gap-1 overflow-x-auto py-2">
                      {DAYS.map((day, i) => (
                        <Button
                          key={day}
                          variant={selectedDay === i ? "default" : "outline"}
                          size="sm"
                          className={cn("shrink-0", selectedDay === i && "bg-primary")}
                          onClick={() => setSelectedDay(i)}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Next week">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Available Time Slots</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {slots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedSlot === time ? "default" : "outline"}
                        size="sm"
                        className={cn(selectedSlot === time && "bg-primary")}
                        onClick={() => setSelectedSlot(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Confirm Appointment →
                </Button>
                <p className="text-xs text-muted-foreground">
                  No credit card required now. You can cancel up to 24 hours before the appointment.
                </p>
                <div className="rounded-lg bg-primary/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                    <Phone className="h-4 w-4" />
                    Need Help? Call 1-800-MEDORA
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient Reviews */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Patient Reviews</h2>
            <Button variant="link" className="text-primary">See all reviews</Button>
          </div>
          <div className="space-y-4">
            {MOCK_REVIEWS.map((r) => (
              <Card key={r.name}>
                <CardContent className="p-4 flex gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                    {r.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{r.name}</p>
                    <div className="flex gap-1 text-amber-500 mt-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-2 text-muted-foreground">{r.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-lg font-semibold text-primary">Medora 247</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Connecting patients with trusted doctors. Seamless booking and personalized healthcare.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li><Link href="/doctors" className="hover:text-foreground">Find a Doctor</Link></li>
                <li><Link href="/doctors" className="hover:text-foreground">Specialties</Link></li>
                <li><a href="#" className="hover:text-foreground">Video Consultations</a></li>
                <li><a href="#" className="hover:text-foreground">Healthcare Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Support</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            © 2024 Medora 247 Global Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
