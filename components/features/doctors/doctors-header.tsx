"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Find Doctors", active: true },
  { href: "#specialties", label: "Specialties" },
  { href: "#appointments", label: "Appointments" },
  { href: "/dashboard/doctor", label: "Doctor Dashboard" },
  { href: "/dashboard", label: "Admin Dashboard" },
];

export function DoctorsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-semibold text-primary"
        >
          Medora 247
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <DropdownMenu key={item.href}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-1",
                    item.active && "text-primary font-medium"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href={item.href}>View all</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" aria-hidden />
          </Button>
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <User className="h-8 w-8 rounded-full border bg-muted" />
            <div className="hidden text-left text-sm sm:block">
              <p className="font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Patient Account</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
