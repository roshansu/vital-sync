import DashIcon from "./DashIcon";
import { useState } from "react";
import { colors } from "../constant/style";
import { DEPARTMENTS, DAYS, MONTHS, DOCTORS } from "./../constant/constData";


export default function MiniCalendar({ selectedDate, onSelect, slots }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const hasSlots = (d) => {
    const date = new Date(year, month, d);
    date.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return slots && slots[dayOfWeek]?.length > 0 && date >= today;
  };

  const isSelected = (d) => {
    if (!d || !selectedDate) return false;
    return (
      selectedDate.getDate() === d &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const isToday = (d) => {
    if (!d) return false;
    return today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
  };

  const isPast = (d) => {
    if (!d) return false;
    const date = new Date(year, month, d);
    return date < today;
  };

  return (
    <div
      style={{
        background: colors.surfaceContainerLowest,
        borderRadius: 14,
        padding: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        width: 260,
        fontFamily: "Inter",
      }}
    >
      {/* Month nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button
          onClick={prevMonth}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <DashIcon name="chevron_left" size={18} color={colors.onSurface} />
        </button>
        <span style={{ fontWeight: 700, fontSize: 13, color: colors.onSurface, fontFamily: "Manrope" }}>
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <DashIcon name="chevron_right" size={18} color={colors.onSurface} />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: colors.outline, textTransform: "uppercase", padding: "2px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const past    = isPast(d);
          const sel     = isSelected(d);
          const tod     = isToday(d);
          const avail   = hasSlots(d) && !past;

          return (
            <button
              key={d}
              disabled={past || !avail}
              onClick={() => onSelect(new Date(year, month, d))}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: 8,
                border: tod && !sel ? `1.5px solid ${colors.primaryContainer}` : "none",
                background: sel ? colors.primaryContainer : "transparent",
                color: sel ? colors.onPrimary
                     : past ? colors.outlineVariant
                     : avail ? colors.onSurface : colors.outlineVariant,
                fontSize: 11,
                fontWeight: sel ? 700 : avail ? 600 : 400,
                cursor: avail && !past ? "pointer" : "default",
                position: "relative",
                transition: "background 0.15s",
                fontFamily: "Inter",
              }}
              onMouseEnter={(e) => {
                if (avail && !past && !sel) e.currentTarget.style.background = colors.surfaceContainerLow;
              }}
              onMouseLeave={(e) => {
                if (!sel) e.currentTarget.style.background = "transparent";
              }}
            >
              {d}
              {/* availability dot */}
              {avail && !sel && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: colors.primaryContainer,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${colors.outlineVariant}30` }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.primaryContainer, display: "inline-block" }} />
        <span style={{ fontSize: 9, color: colors.outline }}>Available slots</span>
      </div>
    </div>
  );
}


