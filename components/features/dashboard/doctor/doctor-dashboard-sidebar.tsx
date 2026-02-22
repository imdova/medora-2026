"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutGrid,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  UserPlus,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/doctor", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/doctor/patients", label: "Patients", icon: Users },
  { href: "/dashboard/doctor/appointments", label: "Appointments", icon: Calendar },
  { href: "/dashboard/doctor/availability", label: "Availability", icon: Clock },
  { href: "/dashboard/doctor/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/doctor/reports", label: "Reports", icon: BarChart3 },
];

export function DoctorDashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
          <Plus className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold text-foreground">Medora 247 MD DASHBOARD</span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 space-y-0.5 p-3" aria-label="Main">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-normal rounded-r-md border-l-4 border-l-transparent",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground border-l-primary"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Add New Patient */}
      <div className="border-t p-3">
        <Button className="w-full gap-2" size="sm" asChild>
          <Link href="/dashboard/doctor/patients">
            <UserPlus className="h-4 w-4" />
            Add New Patient
          </Link>
        </Button>
      </div>

      {/* Doctor profile */}
      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Dr. Sarah Chen</p>
            <p className="truncate text-xs text-muted-foreground">Cardiologist</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" asChild>
            <Link href="/dashboard/doctor/settings" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Account */}
      <div className="border-t p-3">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Account
        </p>
        <div className="space-y-0.5">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
            asChild
          >
            <Link href="/">
              <LogOut className="h-4 w-4 shrink-0" />
              Logout
            </Link>
          </Button>
        </div>
      </div>

      {/* Pro Plan */}
      <div className="p-3">
        <Card className="rounded-lg border bg-muted/40 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Pro Plan
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Upgrade for unlimited telemedicine calls.
            </p>
            <Button size="sm" className="mt-3 w-full">
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
