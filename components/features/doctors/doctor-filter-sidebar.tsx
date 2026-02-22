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
import { Search, ChevronDown, Star } from "lucide-react";

export type DoctorFiltersState = {
  searchInFilters: string;
  /** "today" | "tomorrow" | "video" for Smart Filters availability radio */
  availabilityOption: "today" | "tomorrow" | "video" | null;
  specialties: string[];
  gender: string | null;
  availableToday: boolean;
  availableTomorrow: boolean;
  priceRange: [number, number];
  experience2Plus: boolean;
  experience5Plus: boolean;
  clinics: string[];
  consultationTypes: string[];
  languages: string[];
  rating: number | null;
};

const DEFAULT_FILTERS: DoctorFiltersState = {
  searchInFilters: "",
  availabilityOption: "today",
  specialties: [],
  gender: null,
  availableToday: true,
  availableTomorrow: false,
  priceRange: [0, 500],
  experience2Plus: false,
  experience5Plus: false,
  clinics: [],
  consultationTypes: [],
  languages: [],
  rating: null,
};

const SPECIALTIES = [
  { id: "Urology", count: 3 },
  { id: "Psychiatry", count: 2 },
  { id: "Cardiology", count: 11 },
  { id: "Pediatrics", count: 8 },
  { id: "Neurology", count: 5 },
  { id: "Pulmonology", count: 4 },
  { id: "Psychologist", count: 6 },
  { id: "Pediatrician", count: 7 },
  { id: "Cardiologist", count: 9 },
];
const GENDERS = [
  { id: "male", label: "Male", count: 280 },
  { id: "female", label: "Female", count: 170 },
];
const CLINICS = [
  "Bright Smiles Dental Clinic",
  "Family Care Clinic",
  "Express Health Clinic",
];
const CONSULTATION_TYPES = ["Audio Call", "Video Call", "Instant Counseling", "Chat"];
const LANGUAGES = ["English", "French", "Spanish", "German"];
const RATINGS = [5, 4, 3, 2, 1];

type DoctorFilterSidebarProps = {
  filters: DoctorFiltersState;
  onFiltersChange: (f: DoctorFiltersState) => void;
  onClearAll: () => void;
  counts?: { bySpecialty: Record<string, number>; byGender: Record<string, number>; byClinic: Record<string, number> };
};

export function DoctorFilterSidebar({
  filters,
  onFiltersChange,
  onClearAll,
  counts,
}: DoctorFilterSidebarProps) {
  const set = (patch: Partial<DoctorFiltersState>) => {
    onFiltersChange({ ...filters, ...patch });
  };

  const toggleSpecialty = (id: string) => {
    const next = filters.specialties.includes(id)
      ? filters.specialties.filter((s) => s !== id)
      : [...filters.specialties, id];
    set({ specialties: next });
  };
  const toggleClinic = (name: string) => {
    const next = filters.clinics.includes(name)
      ? filters.clinics.filter((c) => c !== name)
      : [...filters.clinics, name];
    set({ clinics: next });
  };
  const consultationLabelToId: Record<string, string> = {
    "Audio Call": "audio",
    "Video Call": "video",
    "Instant Counseling": "instant",
    "Chat": "chat",
  };
  const toggleConsultation = (label: string) => {
    const id = consultationLabelToId[label] ?? label;
    const next = filters.consultationTypes.includes(id)
      ? filters.consultationTypes.filter((c) => c !== id)
      : [...filters.consultationTypes, id];
    set({ consultationTypes: next });
  };
  const toggleLanguage = (lang: string) => {
    const next = filters.languages.includes(lang)
      ? filters.languages.filter((l) => l !== lang)
      : [...filters.languages, lang];
    set({ languages: next });
  };

  return (
    <aside className="w-full shrink-0 space-y-4 lg:w-64">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filter</h3>
        <Button variant="link" className="text-primary h-auto p-0" onClick={onClearAll}>
          Clear All
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search in filters..."
          className="pl-9"
          value={filters.searchInFilters}
          onChange={(e) => set({ searchInFilters: e.target.value })}
        />
      </div>

      {/* Specialities */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Specialities
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          {SPECIALTIES.map((s) => (
            <label key={s.id} className="flex cursor-pointer items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={filters.specialties.includes(s.id)}
                  onCheckedChange={() => toggleSpecialty(s.id)}
                />
                <span className="text-sm">{s.id}</span>
              </div>
              <span className="text-xs text-muted-foreground">{(counts?.bySpecialty ?? {})[s.id] ?? s.count}</span>
            </label>
          ))}
          <Button variant="link" className="h-auto p-0 text-xs text-primary">View More</Button>
        </CollapsibleContent>
      </Collapsible>

      {/* Gender */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Gender
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          {GENDERS.map((g) => (
            <label key={g.id} className="flex cursor-pointer items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={filters.gender === g.id}
                  onCheckedChange={(checked) => set({ gender: checked ? g.id : null })}
                />
                <span className="text-sm">{g.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{g.count}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Availability */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Availability
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={filters.availableToday}
              onCheckedChange={(c) => set({ availableToday: !!c })}
            />
            <span className="text-sm">Available Today</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={filters.availableTomorrow}
              onCheckedChange={(c) => set({ availableTomorrow: !!c })}
            />
            <span className="text-sm">Available Tomorrow</span>
          </label>
          <Button variant="link" className="h-auto p-0 text-xs text-primary">View More</Button>
        </CollapsibleContent>
      </Collapsible>

      {/* Pricing */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Pricing
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1">
          <p className="text-sm text-muted-foreground">
            Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </p>
          <Slider
            className="mt-2"
            min={200}
            max={5605}
            step={10}
            value={filters.priceRange}
            onValueChange={(v) => set({ priceRange: v as [number, number] })}
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Experience */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Experience
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={filters.experience2Plus}
              onCheckedChange={(c) => set({ experience2Plus: !!c })}
            />
            <span className="text-sm">2+ Years</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={filters.experience5Plus}
              onCheckedChange={(c) => set({ experience5Plus: !!c })}
            />
            <span className="text-sm">5+ Years</span>
          </label>
          <Button variant="link" className="h-auto p-0 text-xs text-primary">View All</Button>
        </CollapsibleContent>
      </Collapsible>

      {/* Clinics */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Clinics
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          {CLINICS.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.clinics.includes(c)}
                onCheckedChange={() => toggleClinic(c)}
              />
              <span className="text-sm">{c}</span>
            </label>
          ))}
          <Button variant="link" className="h-auto p-0 text-xs text-primary">View More</Button>
        </CollapsibleContent>
      </Collapsible>

      {/* Consultation type */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Consultation type
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          {CONSULTATION_TYPES.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.consultationTypes.includes(consultationLabelToId[t] ?? t)}
                onCheckedChange={() => toggleConsultation(t)}
              />
              <span className="text-sm">{t}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Languages */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Languages
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          {LANGUAGES.map((lang) => (
            <label key={lang} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.languages.includes(lang)}
                onCheckedChange={() => toggleLanguage(lang)}
              />
              <span className="text-sm">{lang}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Rating */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Rating
          <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          {RATINGS.map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.rating === r}
                onCheckedChange={(c) => set({ rating: c ? r : null })}
              />
              <span className="text-sm">{r} Star</span>
              <div className="flex gap-0.5 text-primary">
                {[...Array(r)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}

export { DEFAULT_FILTERS };
