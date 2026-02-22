"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const doctors = [
  { id: "1", name: "Dr. John Doe", specialty: "Dentist", rating: 4.8, reviews: 500, price: 200, ad: true },
  { id: "2", name: "Dr. Amelia Ruth", specialty: "Cardiologist", rating: 4.9, reviews: 320, price: 150, ad: false },
  { id: "3", name: "Dr. Sarah Chen", specialty: "Pediatrician", rating: 4.7, reviews: 280, price: 120, ad: false },
  { id: "4", name: "Dr. James Wilson", specialty: "Orthopedist", rating: 4.8, reviews: 410, price: 180, ad: true },
];

export function DoctorsSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.h2
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Highlighted Doctors
        </motion.h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden transition hover:shadow-md">
                <div className="relative aspect-[4/3] bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-muted-foreground/50">
                    👨‍⚕️
                  </div>
                  {doc.ad && (
                    <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
                      Ad
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <p className="font-semibold text-foreground">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                </CardHeader>
                <CardContent className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{doc.rating}</span>
                  <span className="text-muted-foreground">({doc.reviews} Reviews)</span>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-2">
                  <span className="text-lg font-semibold text-primary">
                    ${doc.price.toFixed(2)}
                  </span>
                  <Button size="sm" asChild>
                    <Link href="/dashboard">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
