"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Calendar, MessageCircle, Headphones, Users, Heart, Star, Award } from "lucide-react";

const stats = [
  { value: "400+", label: "Trusted Doctors", icon: Users },
  { value: "10K+", label: "Happy Patients", icon: Heart },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "50+", label: "Specialties", icon: Award },
];

export function WhyChooseSection() {
  return (
    <section className="bg-[hsl(var(--landing-dark))] py-16 md:py-20 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square rounded-xl bg-white/10" />
            <div className="aspect-square rounded-xl bg-white/10" />
            <div className="col-span-2 aspect-[2/1] rounded-xl bg-white/10" />
          </motion.div>
          <div>
            <motion.h2
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Quick, Easy & Fast Service
            </motion.h2>
            <motion.p
              className="mt-4 text-white/80"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              We connect you with verified healthcare providers. Book appointments online, get prescriptions, and access your records—all in one place.
            </motion.p>
            <ul className="mt-6 space-y-3">
              {[
                { icon: Calendar, text: "Online Appointment" },
                { icon: MessageCircle, text: "Live Chat" },
                { icon: Headphones, text: "24/7 Support" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.text}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{item.text}</span>
                  </motion.li>
                );
              })}
            </ul>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" variant="secondary" className="bg-white text-[hsl(var(--landing-dark))] hover:bg-white/90" asChild>
                <Link href="/dashboard">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/20 bg-white/5 p-6 text-center"
              >
                <Icon className="mx-auto mb-2 h-8 w-8 text-primary-foreground/80" />
                <p className="text-2xl font-bold md:text-3xl">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
