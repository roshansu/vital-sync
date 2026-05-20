import { useState } from "react";
import {colors} from '../../constant/style'
import Icon from '../appointment/Icon'

// const colors = {
//   primary: "#004ac6",
//   primaryContainer: "#2563eb",
//   primaryFixed: "#dbe1ff",
//   primaryFixedDim: "#b4c5ff",
//   onPrimaryFixed: "#00174b",
//   onPrimaryFixedVariant: "#003ea8",
//   onPrimaryContainer: "#eeefff",
//   secondary: "#495c95",
//   tertiary: "#943700",
//   surface: "#f7f9fb",
//   surfaceContainer: "#eceef0",
//   surfaceContainerLow: "#f2f4f6",
//   surfaceContainerLowest: "#ffffff",
//   surfaceContainerHigh: "#e6e8ea",
//   surfaceContainerHighest: "#e0e3e5",
//   onSurface: "#191c1e",
//   onSurfaceVariant: "#434655",
//   onPrimary: "#ffffff",
//   outline: "#737686",
//   outlineVariant: "#c3c6d7",
//   error: "#ba1a1a",
//   errorContainer: "#ffdad6",
// };


const DAYS_SHORT  = ["M", "T", "W", "T", "F", "S", "S"];
const DAYS_FULL   = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTHS      = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CAL_DAYS    = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];



export default function OffDaysCalendar({ offDays, setOffDays }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const key = (d) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  // console.log("offDays",offDays)

  const toggleDay = (d) => {
    const k = key(d);
    const date = new Date(viewYear, viewMonth, d);
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    setOffDays((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );
  };

  const isPast = (d) => {
    const date = new Date(viewYear, viewMonth, d);
    const tod  = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < tod;
  };

  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: colors.surfaceContainerLow, border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
        >
          <Icon name="chevron_left" size={18} color={colors.onSurface} />
        </button>
        <span
          className="text-sm font-bold"
          style={{ fontFamily: "Manrope", color: colors.onSurface }}
        >
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: colors.surfaceContainerLow, border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
        >
          <Icon name="chevron_right" size={18} color={colors.onSurface} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {CAL_DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold uppercase tracking-wider py-1"
            style={{ color: "#94a3b8" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const k   = key(d);
          const off = offDays.includes(k);
          const past = isPast(d);
          const isToday =
            d === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();

          return (
            <button
              key={k}
              disabled={past}
              onClick={() => toggleDay(d)}
              className="aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all"
              style={{
                background: off
                  ? colors.error
                  : isToday
                  ? `${colors.primaryContainer}18`
                  : "transparent",
                color: off
                  ? colors.onPrimary
                  : past
                  ? `${colors.outlineVariant}`
                  : isToday
                  ? colors.primaryContainer
                  : colors.onSurface,
                border: isToday && !off ? `1.5px solid ${colors.primaryContainer}` : "none",
                cursor: past ? "not-allowed" : "pointer",
                opacity: past ? 0.4 : 1,
              }}
              onMouseEnter={(e) => {
                if (!off && !past) e.currentTarget.style.background = colors.surfaceContainerHigh;
              }}
              onMouseLeave={(e) => {
                if (!off) e.currentTarget.style.background = isToday ? `${colors.primaryContainer}18` : "transparent";
              }}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3"
        style={{ borderTop: `1px solid ${colors.outlineVariant}25` }}>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: colors.error }} />
          <span className="text-[10px] font-medium" style={{ color: colors.outline }}>Off Day</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border" style={{ borderColor: colors.primaryContainer }} />
          <span className="text-[10px] font-medium" style={{ color: colors.outline }}>Today</span>
        </div>
      </div>
    </div>
  );
}