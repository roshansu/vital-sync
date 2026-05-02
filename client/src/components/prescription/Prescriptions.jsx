import { useState, useRef, useEffect } from "react";
import { colors } from "../../constant/style";
import PrescriptionCard from "./PrescriptionCard";
import Pagination from "../Pagination";
import { ALL_PRESCRIPTIONS } from "../../constant/constData";
import Icon from "../appointment/Icon";
import FilterDropdown from "../FilterDropdown";

const PER_PAGE = 4;
const TIME_FILTERS = ["All Time", "This Month", "Past 3 Months"];
const SPECIALTIES = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Hematology",
  "Immunology",
  "Neurology",
  "Pulmonology",
  "Surgery",
];
const STATUSES = ["All Statuses", "Active", "Completed"];
const SORT_OPTIONS = [
  "Newest First",
  "Oldest First",
  "Doctor A–Z",
  "Doctor Z–A",
];

export default function Prescriptions({ setCurrNav }) {
  const [timeFilter, setTimeFilter] = useState("This Month");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "All Statuses",
    specialty: "All Specialties",
    sort: "Newest First",
  });

  const filterRef = useRef(null);
  console.log(setCurrNav);

  // Close filter on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [search, filters, timeFilter]);

  // Apply filters
  const filtered = ALL_PRESCRIPTIONS.filter((rx) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      rx.doctor.toLowerCase().includes(q) ||
      rx.diagnosis.toLowerCase().includes(q) ||
      rx.specialty.toLowerCase().includes(q);

    const matchStatus =
      filters.status === "All Statuses" || rx.status === filters.status;

    const matchSpecialty =
      filters.specialty === "All Specialties" ||
      rx.specialty === filters.specialty;

    return matchSearch && matchStatus && matchSpecialty;
  }).sort((a, b) => {
    if (filters.sort === "Doctor A–Z") return a.doctor.localeCompare(b.doctor);
    if (filters.sort === "Doctor Z–A") return b.doctor.localeCompare(a.doctor);
    if (filters.sort === "Oldest First") return a.id - b.id;
    return b.id - a.id; // Newest First (default)
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Active filter count (for badge)
  const activeFilterCount = [
    filters.status !== "All Statuses",
    filters.specialty !== "All Specialties",
    filters.sort !== "Newest First",
  ].filter(Boolean).length;

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input::placeholder { color: #94a3b8; }
        select option { background: ${colors.surfaceContainerLowest}; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main
        className="min-h-screen"
        style={{ background: colors.surface, fontFamily: "Inter" }}>
        <div className="p-10 max-w-6xl mx-auto">
          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              {/* Breadcrumb */}
              {/* <nav className="flex items-center gap-1.5 mb-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#94a3b8" }}>
                  Patient Portal
                </span>
                <Icon name="chevron_right" size={12} color="#94a3b8" />
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: colors.primary }}>
                  Prescriptions
                </span>
              </nav> */}
              <h2
                className="lg:text-4xl text-2xl font-extrabold tracking-tight"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                My Prescriptions
              </h2>
            </div>

            {/* Time filter + filter button */}

          <div className="flex items-center gap-3 flex-wrap">
            {/* Time tabs */}
            <div
              className="flex items-center p-1 rounded-xl"
              style={{ background: colors.surfaceContainerLow }}
            >
              {TIME_FILTERS.map((t) => {
                const active = timeFilter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTimeFilter(t)}
                    className="px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap"
                    style={{
                      background: active ? colors.surfaceContainerLowest : "transparent",
                      color: active ? colors.primary : colors.onSurfaceVariant,
                      border: "none",
                      boxShadow: active ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
                      cursor: "pointer",
                      fontFamily: "Inter",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* More Filters */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter((p) => !p)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                style={{
                  background: showFilter ? colors.primaryFixed : colors.surfaceContainerLowest,
                  color: showFilter ? colors.primaryContainer : colors.onSurface,
                  borderColor: showFilter ? `${colors.primaryContainer}40` : `${colors.outlineVariant}25`,
                  cursor: "pointer",
                  fontFamily: "Inter",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <Icon name="tune" size={18} color={showFilter ? colors.primaryContainer : colors.onSurface} />
                <span className="hidden sm:inline">More Filters</span>
                {activeFilterCount > 0 && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ background: colors.primaryContainer, color: colors.onPrimary }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {showFilter && (
                <FilterDropdown
                  onClose={() => setShowFilter(false)}
                  filters={filters}
                  setFilters={setFilters}
                />
              )}
            </div>
          </div>
          </div>

          {/* ── Search bar ── */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 transition-all"
            style={{
              background: colors.surfaceContainerLowest,
              boxShadow: searchFocused
                ? `0 0 0 2px ${colors.primaryContainer}40, 0 4px 16px rgba(0,0,0,0.06)`
                : "0 1px 4px rgba(0,0,0,0.05)",
              border: `1px solid ${searchFocused ? colors.primaryContainer + "40" : colors.outlineVariant + "25"}`,
            }}>
            <Icon name="search" size={18} color="#94a3b8" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search by doctor name, diagnosis, or specialty…"
              className="bg-transparent border-none outline-none text-sm flex-1"
              style={{ color: colors.onSurface, fontFamily: "Inter" }}
            />
            {search && (
              <>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: colors.surfaceContainerHigh,
                    color: colors.onSurfaceVariant,
                  }}>
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </span>
                <button
                  onClick={() => setSearch("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                  }}>
                  <Icon name="close" size={16} color="#94a3b8" />
                </button>
              </>
            )}
          </div>

          {/* ── Cards ── */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 mb-10">
              {paginated.map((rx) => (
                <PrescriptionCard key={rx.id} rx={rx} setCurrNav={setCurrNav} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl py-16 flex flex-col items-center text-center border border-dashed mb-10"
              style={{
                background: colors.surfaceContainerLow,
                borderColor: `${colors.outlineVariant}50`,
              }}>
              <Icon
                name="search_off"
                size={48}
                color="#cbd5e1"
                className="mb-4"
              />
              <p
                className="font-bold text-lg mb-1"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                No prescriptions found
              </p>
              <p className="text-sm" style={{ color: "#64748b" }}>
                {search
                  ? `No results for "${search}"`
                  : "Try adjusting your filters."}
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilters({
                    status: "All Statuses",
                    specialty: "All Specialties",
                    sort: "Newest First",
                  });
                }}
                className="mt-6 px-5 py-2.5 text-sm font-bold rounded-lg transition-opacity hover:opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                  color: colors.onPrimary,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope",
                }}>
                Clear All Filters
              </button>
            </div>
          )}

          {/* ── Pagination + count ── */}
          <div className="flex items-center justify-between mt-4">
            <p
              className="text-sm font-medium"
              style={{ color: colors.onSurfaceVariant }}>
              Showing{" "}
              <span style={{ color: colors.onSurface, fontWeight: 600 }}>
                {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
                {Math.min(page * PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span style={{ color: colors.onSurface, fontWeight: 600 }}>
                {filtered.length}
              </span>{" "}
              prescriptions
            </p>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </main>
    </>
  );
}
