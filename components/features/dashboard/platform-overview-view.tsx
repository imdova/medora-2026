"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  UserPlus,
  MessageCircle,
  Calendar,
  Download,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const KPI_CARDS = [
  { label: "Total Active Doctors", value: "1,284", change: "+12%", icon: LayoutDashboard, iconBg: "bg-primary/10 text-primary" },
  { label: "New Registrations", value: "48", change: "+4.2%", icon: UserPlus, iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { label: "Ongoing Consultations", value: "156", change: "Live", live: true, icon: MessageCircle, iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { label: "Total Bookings", value: "12,402", change: "+18%", icon: Calendar, iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
];

const PENDING_DOCTORS = [
  { name: "Dr. Sarah Johnson", specialty: "Cardiology", applicationDate: "Oct 24, 2023", licenseStatus: "REVIEW PENDING", statusClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" },
  { name: "Dr. Michael Chen", specialty: "Neurology", applicationDate: "Oct 23, 2023", licenseStatus: "VERIFYING DOCS", statusClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200" },
  { name: "Dr. Elena Rodriguez", specialty: "Pediatrics", applicationDate: "Oct 23, 2023", licenseStatus: "REVIEW PENDING", statusClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" },
  { name: "Dr. James Wilson", specialty: "Dermatology", applicationDate: "Oct 22, 2023", licenseStatus: "REVIEW PENDING", statusClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" },
];

const AUDIT_LOGS = [
  { title: "New Doctor Approved", detail: "Admin [Alex] approved Dr. Sofia M.", time: "2 mins ago", dot: "bg-primary" },
  { title: "System Maintenance", detail: "Automatic backup completed successfully.", time: "1 hour ago", dot: "bg-muted-foreground/50" },
  { title: "Security Alert", detail: "Unusual login attempt from IP: 192.168.1.1", time: "3 hours ago", dot: "bg-primary" },
  { title: "Platform Update", detail: "Version 2.4.1 deployed to production.", time: "5 hours ago", dot: "bg-muted-foreground/50" },
];

export function PlatformOverviewView() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Platform Overview</h1>
            <p className="text-muted-foreground mt-0.5">
              Welcome back, Alex. Here&apos;s what&apos;s happening on Medora 247 today.
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {KPI_CARDS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="rounded-xl">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                    <p className={cn(
                      "text-sm mt-0.5",
                      kpi.live ? "text-orange-600 dark:text-orange-400 font-medium" : "text-primary font-medium"
                    )}>
                      {kpi.change}
                    </p>
                  </div>
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", kpi.iconBg)}>
                    <Icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pending Doctor Verifications */}
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <h2 className="text-lg font-semibold">Pending Doctor Verifications</h2>
            <Button variant="link" className="text-primary p-0 h-auto font-medium" asChild>
              <Link href="/dashboard/doctor-verification">View all tasks</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Doctor Name</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Specialty</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Application Date</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-muted-foreground">License Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PENDING_DOCTORS.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-muted-foreground">{row.specialty}</TableCell>
                    <TableCell>{row.applicationDate}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", row.statusClass)}>
                        {row.licenseStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <footer className="text-sm text-muted-foreground py-4">
          © 2024 Medora 247 Medical Platform. All rights reserved.
          <span className="mx-2">·</span>
          <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          <span className="mx-2">·</span>
          <Link href="#" className="hover:text-foreground">Terms of Service</Link>
        </footer>
      </div>

      {/* Right sidebar: System Health + Audit Logs */}
      <div className="space-y-6">
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">SERVER LOAD</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[24%] rounded-full bg-primary" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">API LATENCY</span>
                <span className="font-medium">12ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[10%] rounded-full bg-primary" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">DATABASE UPTIME</span>
                <span className="font-medium">99.98%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-full rounded-full bg-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Audit Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {AUDIT_LOGS.map((log) => (
              <div key={log.title + log.time} className="flex gap-3">
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", log.dot)} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">{log.title}</p>
                  <p className="text-xs text-muted-foreground">{log.detail}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              View Full History
            </Button>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden />
          <span className="text-sm font-medium">GLOBAL STATUS: OPTIMAL</span>
        </div>
      </div>
    </div>
  );
}
