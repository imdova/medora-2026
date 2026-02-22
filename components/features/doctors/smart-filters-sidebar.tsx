"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Search, Check, Zap, ChevronDown } from "lucide-react";
import type { DoctorFiltersState } from "./doctor-filter-sidebar";
import { cn } from "@/lib/utils";

const SPECIALITIES = [
  "Urology",
  "Psychiatry",
  "Cardiology",
  "Pediatrics",
  "Neurology",
  "Pulmonology",
];

const GENDERS = [
  { id: "male" as const, label: "Male" },
  { id: "female" as const, label: "Female" },
];

type SmartFiltersSidebarProps = {
  filters: DoctorFiltersState;
  onFiltersChange: (f: DoctorFiltersState) => void;
  onClearAll: () => void;
  counts?: {
    bySpecialty: Record<string, number>;
    byGender: Record<string, number>;
  };
};

export function SmartFiltersSidebar({
  filters,
  onFiltersChange,
  onClearAll,
  counts,
}: SmartFiltersSidebarProps) {
  const set = (patch: Partial<DoctorFiltersState>) => {
    onFiltersChange({ ...filters, ...patch });
  };

  const toggleSpecialty = (id: string) => {
    const next = filters.specialties.includes(id)
      ? filters.specialties.filter((s) => s !== id)
      : [...filters.specialties, id];
    set({ specialties: next });
  };

  const setAvailability = (option: DoctorFiltersState["availabilityOption"]) => {
    set({
      availabilityOption: option,
      availableToday: option === "today",
      availableTomorrow: option === "tomorrow",
      consultationTypes:
        option === "video"
          ? [...new Set([...filters.consultationTypes, "video"])]
          : filters.consultationTypes.filter((c) => c !== "video"),
    });
  };

  return (
    <aside className="w-full shrink-0 space-y-5 lg:w-72">
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Smart Filters</h3>
          <Button
            variant="link"
            className="text-primary h-auto p-0 text-sm"
            onClick={onClearAll}
          >
            Clear all
          </Button>
        </div>

        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Q Name, clinic..."
              className="pl-9"
              value={filters.searchInFilters}
              onChange={(e) => set({ searchInFilters: e.target.value })}
              aria-label="Search doctor or clinic"
            />
          </div>
        </div>

        {/* Specialities - collapsible with checkboxes and count badges */}
        <Collapsible defaultOpen className="mt-5">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-0 font-semibold text-foreground hover:opacity-80">
            Specialities
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform [[data-state=open]_&]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="space-y-2">
              {SPECIALITIES.map((id) => {
                const count = counts?.bySpecialty?.[id] ?? 21;
                return (
                  <label
                    key={id}
                    className="flex cursor-pointer items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={filters.specialties.includes(id)}
                        onCheckedChange={() => toggleSpecialty(id)}
                      />
                      <span className="text-sm">{id}</span>
                    </div>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs text-muted-foreground">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
            <Button
              variant="link"
              className="mt-2 h-auto p-0 text-xs text-primary underline underline-offset-2"
            >
              View More
            </Button>
          </CollapsibleContent>
        </Collapsible>

        <Separator className="my-4" />

        {/* Gender - collapsible with checkboxes and count badges */}
        <Collapsible defaultOpen className="mt-2">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-0 font-semibold text-foreground hover:opacity-80">
            Gender
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform [[data-state=open]_&]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="space-y-2">
              {GENDERS.map((g) => {
                const count = counts?.byGender?.[g.id] ?? 21;
                return (
                  <label
                    key={g.id}
                    className="flex cursor-pointer items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={filters.gender === g.id}
                        onCheckedChange={(checked) =>
                          set({ gender: checked ? g.id : null })
                        }
                      />
                      <span className="text-sm">{g.label}</span>
                    </div>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs text-muted-foreground">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="mt-5">
          <h4 className="text-sm font-medium text-foreground">Availability</h4>
          <div className="mt-2 space-y-2">
            {(
              [
                { value: "today" as const, label: "Available Today" },
                { value: "tomorrow" as const, label: "Available Tomorrow" },
                { value: "video" as const, label: "Video Consultation" },
              ] as const
            ).map(({ value, label }) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 py-2 hover:bg-muted/50"
                onClick={() => setAvailability(value)}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2",
                    filters.availabilityOption === value
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {filters.availabilityOption === value && (
                    <Check className="h-2.5 w-2.5 text-primary-foreground" />
                  )}
                </span>
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-sm font-medium text-foreground">Consultation Fee</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            ${filters.priceRange[0]} - ${filters.priceRange[1] === 500 ? "500+" : filters.priceRange[1]}
          </p>
          <Slider
            className="mt-2"
            min={0}
            max={500}
            step={25}
            value={filters.priceRange}
            onValueChange={(v) => set({ priceRange: v as [number, number] })}
          />
        </div>

        <div className="mt-5 rounded-xl bg-primary p-4 text-primary-foreground relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
              Membership
            </p>
            <p className="mt-1 text-sm font-medium">
              Get Priority Access to Top Specialists
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="mt-3 bg-white text-primary hover:bg-white/90"
            >
              Upgrade Now
            </Button>
          </div>
          <Zap className="absolute right-2 top-1/2 h-16 w-16 -translate-y-1/2 opacity-20" aria-hidden />
        </div>
      </div>
    </aside>
  );
}
