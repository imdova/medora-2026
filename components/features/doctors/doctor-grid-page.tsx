"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DoctorSearchBar } from "./doctor-search-bar";
import { DEFAULT_FILTERS, type DoctorFiltersState } from "./doctor-filter-sidebar";
import { SmartFiltersSidebar } from "./smart-filters-sidebar";
import { DoctorCard } from "./doctor-card";
import { DoctorListCard } from "./doctor-list-card";
import { fetchDoctors, fetchDoctorCounts, type FetchDoctorsOptions } from "@/lib/dal/doctor";
import type { Doctor } from "@/types";
import { LayoutGrid, List, Loader2, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "price_asc", label: "Price (Low to High)" },
  { value: "price_desc", label: "Price (High to Low)" },
  { value: "name", label: "Name" },
] as const;

const PAGE_SIZE_LIST = 10;
const PAGE_SIZE_GRID = 9;

function filtersToOptions(
  filters: DoctorFiltersState,
  search: string,
  location: string,
  sortBy: string,
  offset: number,
  limit: number
): FetchDoctorsOptions {
  const searchQuery = search || filters.searchInFilters || undefined;
  return {
    search: searchQuery,
    location: location || undefined,
    specialty: filters.specialties[0],
    gender: filters.gender ?? undefined,
    availableToday: filters.availabilityOption === "today" || filters.availableToday || undefined,
    availableTomorrow: filters.availabilityOption === "tomorrow" || filters.availableTomorrow || undefined,
    consultationType: filters.availabilityOption === "video" ? "video" : undefined,
    priceMin: filters.priceRange[0],
    priceMax: filters.priceRange[1],
    experienceMin: filters.experience5Plus ? 5 : filters.experience2Plus ? 2 : undefined,
    clinic: filters.clinics[0],
    language: filters.languages[0],
    ratingMin: filters.rating ?? undefined,
    sortBy: sortBy as "price_asc" | "price_desc" | "rating" | "name",
    offset,
    limit,
  };
}

export function DoctorGridPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [filters, setFilters] = useState<DoctorFiltersState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState<{
    bySpecialty: Record<string, number>;
    byGender: Record<string, number>;
  } | null>(null);

  const limit = viewMode === "list" ? PAGE_SIZE_LIST : PAGE_SIZE_GRID;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const startResult = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endResult = Math.min(currentPage * limit, total);

  const loadDoctors = useCallback(
    async (page: number) => {
      setLoading(true);
      const offset = (page - 1) * limit;
      const opts = filtersToOptions(
        filters,
        search,
        location,
        sortBy,
        offset,
        limit
      );
      const res = await fetchDoctors(opts);
      setDoctors(res.doctors);
      setTotal(res.total);
      setLoading(false);
    },
    [filters, search, location, sortBy, limit]
  );

  useEffect(() => {
    setCurrentPage(1);
    loadDoctors(1);
  }, [filters, search, location, sortBy, viewMode, loadDoctors]);

  useEffect(() => {
    fetchDoctorCounts().then((c) =>
      setCounts({ bySpecialty: c.bySpecialty, byGender: c.byGender })
    );
  }, []);

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    loadDoctors(1);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadDoctors(page);
  };

  const titleSpecialty = filters.specialties[0] || "Doctor";
  const titleLocation = location || "New York";
  const titleCount = total > 0 ? `${total} ${titleSpecialty} Specialist${total !== 1 ? "s" : ""}` : "Search";

  return (
    <div className="flex flex-col">
      {/* Breadcrumb + Title */}
      <div className="relative border-b bg-[hsl(var(--landing-hero))]/50">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'%2394a3b8\' fill-opacity=\'0.04\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')]"
          aria-hidden
        />
        <div className="container relative mx-auto max-w-7xl px-4 py-6">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-1 text-primary">/</span>
            <span className="text-foreground">Search</span>
          </nav>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {titleCount} in {titleLocation}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Available today for in-person and video visits
              </p>
            </div>
            <div className="flex gap-1 rounded-lg border bg-background p-1">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className={cn("gap-2", viewMode === "list" && "text-primary")}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                List View
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className={cn("gap-2", viewMode === "grid" && "text-primary")}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
                Map View
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <DoctorSearchBar
          search={search}
          location={location}
          date={date}
          onSearch={setSearch}
          onLocation={setLocation}
          onDate={setDate}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* Main: sidebar + results */}
      <div className="container mx-auto max-w-7xl px-4 pb-12">
        <div className="flex gap-6 lg:gap-8">
          <div className="hidden lg:block">
            <SmartFiltersSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClearAll={handleClearFilters}
              counts={counts ?? undefined}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startResult}-{endResult} of {total} Results
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Smart Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <SmartFiltersSidebar
                        filters={filters}
                        onFiltersChange={setFilters}
                        onClearAll={handleClearFilters}
                        counts={counts ?? undefined}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : viewMode === "list" ? (
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <DoctorListCard key={doctor.id} doctor={doctor} />
                ))}
                {totalPages > 1 && (
                  <nav
                    className="mt-8 flex items-center justify-center gap-1"
                    aria-label="Pagination"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      aria-label="Previous page"
                    >
                      &lt;
                    </Button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page: number;
                      if (totalPages <= 5) page = i + 1;
                      else if (currentPage <= 3) page = i + 1;
                      else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                      else page = currentPage - 2 + i;
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          className={cn(currentPage === page && "bg-primary text-primary-foreground")}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Page ${page}`}
                          aria-current={currentPage === page ? "page" : undefined}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-1 text-muted-foreground">…</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(totalPages)}
                          aria-label={`Page ${totalPages}`}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      aria-label="Next page"
                    >
                      &gt;
                    </Button>
                  </nav>
                )}
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <nav
                    className="mt-8 flex items-center justify-center gap-1"
                    aria-label="Pagination"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      aria-label="Previous page"
                    >
                      &lt;
                    </Button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page: number;
                      if (totalPages <= 5) page = i + 1;
                      else if (currentPage <= 3) page = i + 1;
                      else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                      else page = currentPage - 2 + i;
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          className={cn(currentPage === page && "bg-primary text-primary-foreground")}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-1 text-muted-foreground">…</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      aria-label="Next page"
                    >
                      &gt;
                    </Button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
