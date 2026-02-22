"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-primary py-6 text-primary-foreground">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-center text-lg font-medium sm:text-left">
          Working for Your Better Health
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shrink-0" asChild>
          <Link href="/dashboard">Get Started Now</Link>
        </Button>
      </div>
    </section>
  );
}
