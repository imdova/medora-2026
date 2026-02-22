"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle,
  DollarSign,
  Ticket,
} from "lucide-react";
import { useSidebarOpen, useToggleSidebar } from "@/lib/store";

const navItems: { href: string; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/doctor-verification", label: "Doctor Verification", icon: CheckCircle, badge: 12 },
  { href: "/dashboard/patients", label: "Patient Management", icon: Users },
  { href: "/dashboard/revenue", label: "Platform Revenue", icon: DollarSign },
  { href: "/dashboard/support", label: "Support Tickets", icon: Ticket },
  { href: "/dashboard/settings", label: "System Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const open = useSidebarOpen();
  const toggle = useToggleSidebar();

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 240 : 64 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="flex flex-col border-r bg-card"
    >
      <div className="flex h-14 items-center gap-2 border-b px-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
        {open && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-foreground"
          >
            Medora 247
          </motion.span>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2" aria-label="Main">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const badge = item.badge;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  !open && "justify-center px-0"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {open && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {badge != null && (
                      <Badge className="bg-primary text-primary-foreground border-0 text-xs shrink-0">
                        {badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
            <Users className="h-4 w-4" />
          </div>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Alex Rivera</p>
              <p className="truncate text-xs text-muted-foreground">Super Admin</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
