"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--landing-hero))] to-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'%22%2394a3b8%22 fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-80" aria-hidden />
      <div className="container relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:flex lg:items-center lg:gap-12">
        <div className="max-w-xl space-y-6 lg:flex-1">
          <motion.h1
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Discover Health: Find Your{" "}
            <span className="text-primary">Trusted Doctor Today</span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Book appointments, compare specialists, and get care that fits your schedule. Your health journey starts here.
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Input
              type="search"
              placeholder="Search for doctor by name or specialty"
              className="h-11 flex-1 bg-background"
              aria-label="Search for doctor"
            />
            <Button size="lg" className="h-11 gap-2 shrink-0" asChild>
              <Link href="/dashboard">
                <Search className="h-4 w-4" />
                Search
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="relative mt-12 lg:mt-0 lg:flex-1 lg:flex lg:justify-end">
          <motion.div
            className="relative mx-auto h-64 w-64 rounded-2xl bg-muted/50 md:h-80 md:w-80 lg:h-96 lg:w-96"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
              <span className="text-6xl opacity-40">🩺</span>
            </div>
            <motion.div
              className="absolute -right-2 top-8 rounded-lg border bg-background/95 px-3 py-2 shadow-md backdrop-blur sm:right-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <p className="text-xs font-medium text-muted-foreground">14+ Years</p>
              <p className="text-sm font-semibold text-foreground">Experience</p>
            </motion.div>
            <motion.div
              className="absolute -left-2 bottom-12 rounded-lg border bg-background/95 px-3 py-2 shadow-md backdrop-blur sm:left-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <p className="text-xs font-medium text-muted-foreground">4.8 Star</p>
              <p className="text-sm font-semibold text-foreground">5k+ Reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
