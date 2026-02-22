"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Apple, Play } from "lucide-react";

export function AppDownloadSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-20 text-primary-foreground">
      <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-primary to-primary/90 opacity-90" aria-hidden />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden />
      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Download the Medora 247 App Today!
            </h2>
            <p className="text-primary-foreground/90">
              Book appointments, chat with doctors, and access your health records on the go. Available on iOS and Android.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 gap-2"
              >
                <Play className="h-5 w-5" />
                Google Play
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 gap-2"
              >
                <Apple className="h-5 w-5" />
                App Store
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-72 w-36 rounded-2xl border-4 border-white/20 bg-background/10 shadow-xl" />
            <div className="h-72 w-36 rounded-2xl border-4 border-white/20 bg-background/10 shadow-xl mt-8" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
