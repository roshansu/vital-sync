import { useState, useEffect, useRef } from "react";
import Icon from "../appointment/Icon";
import { ALL_REPORTS } from "../../constant/constData";
import Pagination from "../Pagination";
import FilterDropdown from "../FilterDropdown";
import { colors } from "../../constant/style";
import ReportRow from './ReportRow'
import StatCard from "./StatCard";

const PER_PAGE      = 4;
const TIME_FILTERS  = ["All Time", "This Month", "Past 3 Months"];
const STATUSES      = ["All Statuses", "Verified", "In Review"];
const CATEGORIES    = ["All Categories", "Lab Results", "Imaging", "Summary"];
const SORT_OPTIONS  = ["Newest First", "Oldest First", "Name A–Z", "Name Z–A"];


export default function Reports() {
  const [timeFilter, setTimeFilter]     = useState("This Month");
  const [search, setSearch]             = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showFilter, setShowFilter]     = useState(false);
  const [page, setPage]                 = useState(1);
  const [reports, setReports]           = useState(ALL_REPORTS);
  const [filters, setFilters]           = useState({
    status: "All Statuses",
    category: "All Categories",
    sort: "Newest First",
  });

  const filterRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target))
        setShowFilter(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setPage(1); }, [search, filters, timeFilter]);

  const toggleStar = (id) =>
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, starred: !r.starred } : r))
    );

  // Apply filters
  const filtered = reports
    .filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      const matchStatus   = filters.status   === "All Statuses"   || r.status   === filters.status;
      const matchCategory = filters.category === "All Categories" || r.category === filters.category;
      return matchSearch && matchStatus && matchCategory;
    })
    .sort((a, b) => {
      if (filters.sort === "Name A–Z") return a.name.localeCompare(b.name);
      if (filters.sort === "Name Z–A") return b.name.localeCompare(a.name);
      if (filters.sort === "Oldest First") return a.dateObj - b.dateObj;
      return b.dateObj - a.dateObj;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeFilterCount = [
    filters.status   !== "All Statuses",
    filters.category !== "All Categories",
    filters.sort     !== "Newest First",
  ].filter(Boolean).length;

  const verifiedCount = reports.filter((r) => r.status   === "Verified").length;
  const starredCount  = reports.filter((r) => r.starred).length;

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; color: ${colors.onSurface}; }
        input::placeholder { color: #94a3b8; }
        select option { background: ${colors.surfaceContainerLowest}; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
      `}</style>

      {/* ── Sticky TopBar ── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderColor: `${colors.outlineVariant}20`,
        }}
      >
        {/* Title + search */}
        <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
          <h2
            className="hidden lg:block font-extrabold text-xl tracking-tight flex-shrink-0"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            Reports Archive
          </h2>
          <div
            className="relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 flex-1 max-w-md transition-all"
            style={{
              background: colors.surfaceContainerLow,
              boxShadow: searchFocused ? `0 0 0 2px ${colors.primaryContainer}35` : "none",
            }}
          >
            <Icon name="search" size={17} color={colors.outline} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search reports, lab results..."
              className="bg-transparent border-none outline-none text-sm w-full"
              style={{ color: colors.onSurface, fontFamily: "Inter" }}
            />
            {search && (
              <button onClick={() => setSearch("")}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <Icon name="close" size={14} color="#94a3b8" />
              </button>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          {/* <button
            className="p-2 rounded-full transition-all"
            style={{ color: colors.onSurfaceVariant, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <Icon name="notifications" size={20} color={colors.onSurfaceVariant} />
          </button> */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white transition-all"
            style={{
              background: colors.primaryContainer,
              border: "none",
              cursor: "pointer",
              fontFamily: "Manrope",
              boxShadow: `0 4px 12px ${colors.primaryContainer}30`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
          >
            <Icon name="upload_file" size={16} color={colors.onPrimary} />
            <span className="hidden sm:inline">Upload PDF</span>
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main
        className="min-h-screen p-6 md:p-10 space-y-8"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >

        {/* ── Page header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-1.5 mb-2">
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest transition-colors"
                style={{ color: colors.outline }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.outline)}>
                Portal
              </a>
              <Icon name="chevron_right" size={11} color={colors.outline} />
              <span className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: colors.onSurface }}>Reports</span>
            </nav>
            <h1
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              My Reports
            </h1>
            <p className="mt-1.5 font-medium text-sm" style={{ color: colors.onSurfaceVariant }}>
              Access and manage your complete clinical history.
            </p>
          </div>

          {/* Time filter + More Filters */}
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

        {/* ── Quick Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="folder"       iconBg="#eff6ff" iconColor="#2563eb"  barColor={colors.primary}       barPct={75}                              label="Total Reports"  value={reports.length} />
          <StatCard icon="verified"     iconBg="#f0fdf4" iconColor="#16a34a"  barColor="#22c55e"              barPct={Math.round(verifiedCount / reports.length * 100)} label="Verified Labs"  value={verifiedCount} />
          <StatCard icon="star"         iconBg="#fffbeb" iconColor="#d97706"  barColor="#fbbf24"              barPct={Math.round(starredCount / reports.length * 100)} label="Starred"        value={starredCount} />
          <StatCard icon="cloud_upload" iconBg={`${colors.primaryContainer}18`} iconColor={colors.primaryContainer} barColor={colors.primaryContainer} barPct={82}          label="Storage"        value="82%" />
        </div>

        {/* ── Reports Table ── */}
        <div
          className="rounded-xl overflow-hidden border"
          style={{
            background: colors.surfaceContainerLowest,
            borderColor: `${colors.outlineVariant}14`,
            boxShadow: `0 8px 32px -12px rgba(25,28,30,0.08)`,
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Desktop thead */}
              <thead className="hidden md:table-header-group">
                <tr style={{ background: `${colors.surfaceContainerLow}80` }}>
                  {[
                    { label: "Report Name",  cls: "px-6 lg:px-8 py-5" },
                    { label: "Upload Date",  cls: "px-6 py-5"         },
                    { label: "Doctor / Lab", cls: "px-6 py-5"         },
                    { label: "Status",       cls: "px-6 py-5"         },
                    { label: "Action",       cls: "px-6 lg:px-8 py-5 text-right" },
                  ].map(({ label, cls }) => (
                    <th
                      key={label}
                      className={`${cls} text-[10px] font-bold uppercase tracking-widest`}
                      style={{ color: colors.outline }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody style={{ borderTop: `1px solid ${colors.outlineVariant}14` }}>
                {paginated.length > 0 ? (
                  paginated.map((report) => (
                    <ReportRow key={report.id} report={report} onToggleStar={toggleStar} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div
                        className="py-16 flex flex-col items-center text-center"
                        style={{ color: colors.onSurfaceVariant }}
                      >
                        <Icon name="search_off" size={40} color="#cbd5e1" className="mb-3" />
                        <p className="font-bold text-base mb-1" style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                          No reports found
                        </p>
                        <p className="text-sm" style={{ color: "#64748b" }}>
                          {search ? `No results for "${search}"` : "Try adjusting your filters."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div
            className="px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4 border-t"
            style={{
              background: `${colors.surfaceContainerLow}60`,
              borderColor: `${colors.outlineVariant}20`,
            }}
          >
            <p className="text-sm font-medium" style={{ color: colors.outline }}>
              Showing{" "}
              <span style={{ color: colors.onSurface, fontWeight: 600 }}>
                {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–
                {Math.min(page * PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span style={{ color: colors.onSurface, fontWeight: 600 }}>
                {filtered.length}
              </span>{" "}
              reports
            </p>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </main>

      {/* ── FAB ── */}
    </>
  );
}