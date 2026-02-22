"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  FileWarning,
  DollarSign,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Video,
  MessageCircle,
  Clock,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const METRIC_CARDS = [
  {
    label: "Total Patients",
    value: "1,284",
    sub: "+12% from last month",
    subClass: "text-primary",
    icon: Users,
    iconClass: "text-primary",
  },
  {
    label: "Appointments",
    value: "24",
    sub: "Today's Schedule",
    subClass: "text-muted-foreground",
    icon: Calendar,
    iconClass: "text-muted-foreground",
  },
  {
    label: "Pending Requests",
    value: "08",
    sub: "Need approval",
    subClass: "text-amber-600 dark:text-amber-500",
    icon: FileWarning,
    iconClass: "text-amber-600 dark:text-amber-500",
  },
  {
    label: "Monthly Earnings",
    value: "$8,420",
    sub: "+5.2%",
    subClass: "text-primary",
    icon: DollarSign,
    iconClass: "text-muted-foreground",
  },
];

const SCHEDULE_ITEMS = [
  {
    time: "09:00 AM",
    name: "Adrian Marshall",
    detail: "General Checkup • #PT0012",
    tag: "IN-CLINIC",
    tagVariant: "default" as const,
    tagClass: "bg-blue-600 text-white border-0 hover:bg-blue-600",
    highlight: false,
    showJoin: false,
  },
  {
    time: "10:30 AM",
    name: "Kelly Stevens",
    detail: "Consultation • #PT0045",
    tag: "VIDEO CALL",
    tagVariant: "default" as const,
    tagClass: "bg-primary text-primary-foreground",
    highlight: true,
    showJoin: true,
  },
  {
    time: "01:00 PM",
    name: "Samuel Anderson",
    detail: "Follow-up • #PT0091",
    tag: "SCHEDULED",
    tagVariant: "secondary" as const,
    tagClass: "bg-muted text-muted-foreground border-0",
    highlight: false,
    showJoin: false,
  },
];

const TIMING_BLOCKS = [
  { label: "MON - WED", value: "09:00 - 17:00", variant: "primary" as const },
  { label: "THU - FRI", value: "10:00 - 18:00", variant: "muted" as const },
  { label: "SATURDAY", value: "09:00 - 13:00", variant: "amber" as const },
  { label: "SUNDAY", value: "Off Duty", variant: "muted" as const },
];

const ACTIVITIES = [
  { icon: "star", title: "New Review from John Doe", body: '"Excellent care and very professional doctor."', time: "2 hours ago" },
  { icon: "check", title: "New Lab Result", body: "Patient #PT0012's blood report is ready.", time: "5 hours ago" },
  { icon: "message", title: "Message Received", body: "Dr. Smith sent you a consultation request.", time: "Yesterday" },
];

export function DoctorDashboardView() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 space-y-6 p-6">
        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRIC_CARDS.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.label} className="rounded-xl bg-muted/40 border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{m.label}</p>
                      <p className="mt-1 text-2xl font-bold">{m.value}</p>
                      <p className={cn("mt-0.5 flex items-center gap-1 text-sm", m.subClass)}>
                        {m.sub.includes("%") && <TrendingUp className="h-3.5 w-3.5" />}
                        {m.sub}
                      </p>
                    </div>
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                      {m.label === "Total Patients" ? (
                        <>
                          <Users className="h-5 w-5 text-muted-foreground absolute right-1 top-1" />
                          <Users className="h-5 w-5 text-primary absolute left-1 bottom-1" />
                        </>
                      ) : (
                        <Icon className={cn("h-5 w-5", m.iconClass)} />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Daily Schedule + Next Tele-Call */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Daily Schedule */}
          <Card className="lg:col-span-2 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <h2 className="text-lg font-semibold">Daily Schedule</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Previous day">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Today, 14 Mar 2025</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Next day">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              <div className="relative flex gap-4">
                <div className="flex flex-col items-center pt-1">
                  {SCHEDULE_ITEMS.map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full border-2 border-muted-foreground/30 bg-background" />
                      {i < SCHEDULE_ITEMS.length - 1 && (
                        <div className="w-px flex-1 min-h-[60px] border-l-2 border-dashed border-muted-foreground/20" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex-1 space-y-3 pb-2">
                  {SCHEDULE_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col gap-1 rounded-lg border p-4",
                        item.highlight ? "border-primary/30 bg-primary/5" : "bg-muted/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground shrink-0 w-16">{item.time}</span>
                          <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.detail}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("text-xs", item.tagClass)}>{item.tag}</Badge>
                          {item.showJoin ? (
                            <>
                              <Button size="sm" className="shrink-0">
                                <Video className="mr-1 h-3.5 w-3.5" />
                                Join Room
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Message">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardContent className="pt-0">
              <Button variant="link" className="text-primary p-0 h-auto font-medium" asChild>
                <Link href="/dashboard/doctor/appointments">View Full Calendar</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Next Tele-Call */}
          <Card className="rounded-xl bg-primary text-primary-foreground border-0 overflow-hidden">
            <CardContent className="p-5 flex flex-col h-full">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
                Next Tele-Call
              </p>
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Kelly Stevens</p>
                  <p className="text-sm opacity-90">Starts in 14:20 mins</p>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/50 text-white hover:bg-white/20 hover:text-white shrink-0"
                >
                  <Video className="mr-1 h-4 w-4" />
                  Start Session
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Timings + Recent Activity + Profile Completion */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Available Timings */}
          <Card className="rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-lg font-semibold">Available Timings</h2>
              <Button variant="link" className="text-primary p-0 h-auto text-sm font-medium">
                Edit Hours
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {TIMING_BLOCKS.map((b) => (
                <div
                  key={b.label}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    b.variant === "primary" && "bg-primary text-primary-foreground",
                    b.variant === "muted" && "bg-muted/60 text-muted-foreground",
                    b.variant === "amber" && "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
                  )}
                >
                  <span className="font-semibold">{b.label}</span>
                  <span className="ml-2 opacity-90">{b.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity + Profile Completion (stacked) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-4">
                {ACTIVITIES.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      {a.icon === "star" && <span className="text-amber-500">★</span>}
                      {a.icon === "check" && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">✓</span>
                      )}
                      {a.icon === "message" && <MessageCircle className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm">{a.title}</p>
                      <p className="text-sm text-muted-foreground">{a.body}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="text-primary p-0 h-auto text-sm font-medium">
                  See All Notifications
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h2 className="text-lg font-semibold">Profile Completion</h2>
                <Moon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">85% Complete</span>
                  <Badge variant="secondary" className="text-xs">High</Badge>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: "85%" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Add your research papers to reach 100% and get featured on the home page.
                </p>
                <Button variant="link" className="text-primary p-0 h-auto font-medium">
                  COMPLETE NOW
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Page footer */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t bg-muted/30 px-6 py-4 text-sm text-muted-foreground">
        <p>© 2025 Medora 247. All Rights Reserved.</p>
        <nav className="flex items-center gap-2" aria-label="Footer">
          <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          <span aria-hidden>•</span>
          <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          <span aria-hidden>•</span>
          <Link href="#" className="hover:text-foreground">Help Center</Link>
        </nav>
      </footer>
    </div>
  );
}
