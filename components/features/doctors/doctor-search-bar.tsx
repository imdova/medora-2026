"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar } from "lucide-react";

type DoctorSearchBarProps = {
  search?: string;
  location?: string;
  date?: string;
  onSearch?: (value: string) => void;
  onLocation?: (value: string) => void;
  onDate?: (value: string) => void;
  onSubmit?: () => void;
};

export function DoctorSearchBar({
  search = "",
  location = "",
  date = "",
  onSearch,
  onLocation,
  onDate,
  onSubmit,
}: DoctorSearchBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for Doctors, Hospitals, Clinics"
          className="pl-9 bg-background"
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
          aria-label="Search for doctors"
        />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Location"
          className="pl-9 bg-background"
          value={location}
          onChange={(e) => onLocation?.(e.target.value)}
          aria-label="Location"
        />
      </div>
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="date"
          className="pl-9 bg-background"
          value={date}
          onChange={(e) => onDate?.(e.target.value)}
          aria-label="Date"
        />
      </div>
      <Button className="shrink-0" onClick={onSubmit}>
        Search
      </Button>
    </div>
  );
}
