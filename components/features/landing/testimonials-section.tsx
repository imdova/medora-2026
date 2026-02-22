"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Medora 247 made booking my cardiology appointment so simple. I was seen within 48 hours and the doctor was excellent.",
    name: "Pong Yule",
    role: "Patient",
  },
  {
    quote: "As a busy parent, having 24/7 access to pediatric advice and same-day appointments has been a game-changer for our family.",
    name: "Maria Santos",
    role: "Patient",
  },
  {
    quote: "The platform is intuitive and the doctors are well-vetted. I recommend it to everyone looking for reliable healthcare.",
    name: "David Kim",
    role: "Patient",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--landing-hero))] to-background py-16 md:py-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'%2394a3b8\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-80" aria-hidden />
      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.h2
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          5K+ Users Trust Medora 247 Worldwide
        </motion.h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 italic text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
