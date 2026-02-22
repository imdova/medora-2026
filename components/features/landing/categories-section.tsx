"use client";

import { motion } from "motion/react";
import {
  Stethoscope,
  Heart,
  Baby,
  Activity,
  UserCircle,
  Brain,
  Bone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Dentist", icon: Stethoscope, color: "bg-violet-500" },
  { label: "Physician", icon: Heart, color: "bg-pink-500" },
  { label: "Pediatrician", icon: Baby, color: "bg-red-500" },
  { label: "Cardiologist", icon: Activity, color: "bg-emerald-500" },
  { label: "Gynecologist", icon: UserCircle, color: "bg-teal-500" },
  { label: "Neurologist", icon: Brain, color: "bg-amber-500" },
  { label: "Orthopedist", icon: Bone, color: "bg-sky-500" },
];

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-20" id="services">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary">Top Categories</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Highlighting Top Care & Support
          </h2>
        </motion.div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8">
          {categories.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full text-white shadow-md transition hover:scale-105",
                    item.color
                  )}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
