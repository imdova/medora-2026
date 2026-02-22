"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useSidebarOpen, useToggleSidebar } from "@/lib/store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/tasks", label: "Tasks", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
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
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  !open && "justify-center px-0"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {open && <span>{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
      <Separator />
      <div className="p-2">
        <Button
          variant="ghost"
          size={open ? "default" : "icon"}
          className={cn("w-full gap-3", !open && "justify-center")}
          asChild
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            {open && <span>Home</span>}
          </Link>
        </Button>
      </div>
    </motion.aside>
  );
}
