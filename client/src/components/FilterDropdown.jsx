import { colors } from "../constant/style";
import Icon from "./appointment/Icon";

const PER_PAGE = 4;
const TIME_FILTERS = ["All Time", "This Month", "Past 3 Months"];
const SPECIALTIES  = ["All Specialties", "Cardiology", "Dermatology", "Endocrinology", "Hematology", "Immunology", "Neurology", "Pulmonology", "Surgery"];
const STATUSES     = ["All Statuses", "Active", "Completed"];
const SORT_OPTIONS = ["Newest First", "Oldest First", "Doctor A–Z", "Doctor Z–A"];

// ─── Filter Dropdown ──────────────────────────────────────────────────────────
export default function FilterDropdown({ onClose, filters, setFilters }) {
  return (
    <div
      className="absolute lg:right-0 top-full mt-2 z-50 rounded-xl shadow-2xl border"
      style={{
        width: 300,
        background: colors.surfaceContainerLowest,
        borderColor: `${colors.outlineVariant}40`,
        animation: "fadeDown 0.15s ease",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: `${colors.outlineVariant}25` }}
      >
        <span
          className="font-bold text-sm"
          style={{ fontFamily: "Manrope", color: colors.onSurface }}
        >
          Filter Prescriptions
        </span>
        <button
          onClick={onClose}
          className="rounded-full p-1 transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <Icon name="close" size={16} color={colors.onSurfaceVariant} />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Status */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: colors.onSurfaceVariant }}
          >
            Status
          </p>
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map((s) => {
              const active = filters.status === s;
              return (
                <button
                  key={s}
                  onClick={() => setFilters((p) => ({ ...p, status: s }))}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all"
                  style={{
                    background: active ? colors.primaryContainer : colors.surfaceContainerLow,
                    color: active ? colors.onPrimary : colors.onSurfaceVariant,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Specialty */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: colors.onSurfaceVariant }}
          >
            Specialty
          </p>
          <select
            value={filters.specialty}
            onChange={(e) => setFilters((p) => ({ ...p, specialty: e.target.value }))}
            className="w-full rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-all"
            style={{
              background: colors.surfaceContainerLow,
              border: `1px solid ${colors.outlineVariant}40`,
              color: colors.onSurface,
              fontFamily: "Inter",
              cursor: "pointer",
            }}
          >
            {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Sort */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: colors.onSurfaceVariant }}
          >
            Sort By
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SORT_OPTIONS.map((s) => {
              const active = filters.sort === s;
              return (
                <button
                  key={s}
                  onClick={() => setFilters((p) => ({ ...p, sort: s }))}
                  className="px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left"
                  style={{
                    background: active ? `${colors.primaryContainer}18` : colors.surfaceContainerLow,
                    color: active ? colors.primaryContainer : colors.onSurfaceVariant,
                    border: `1px solid ${active ? colors.primaryContainer + "40" : "transparent"}`,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={() =>
            setFilters({ status: "All Statuses", specialty: "All Specialties", sort: "Newest First" })
          }
          className="w-full py-2.5 text-xs font-bold rounded-lg transition-colors"
          style={{
            background: colors.surfaceContainerHigh,
            color: colors.onSurfaceVariant,
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHighest)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}