"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";

export function DoctorDashboardHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-6 border-b bg-background px-6">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-bold text-foreground">Welcome back, Dr. Edalin</h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your clinic today.
        </p>
      </div>
      <div className="hidden flex-1 max-w-md justify-center md:flex">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-9 bg-muted/50 border-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"
            aria-hidden
          />
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="hidden text-left text-sm sm:block">
            <p className="font-medium text-foreground">Dr. Edalin Hendry</p>
            <p className="text-xs text-primary font-medium">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}
