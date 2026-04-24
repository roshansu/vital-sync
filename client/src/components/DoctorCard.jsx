import { useState, useRef, useEffect } from "react";
import { colors } from "../constant/style";
import DashIcon from "./DashIcon";
import MiniCalendar from './MiniCalendar'
import { DEPARTMENTS, DAYS, MONTHS, DOCTORS } from "./../constant/constData";



export default function DoctorCard({ doctor, setCurrNav }) {
  const [calOpen, setCalOpen]       = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookHovered, setBookHovered]   = useState(false);
  const [slotHovers, setSlotHovers]     = useState({});
  const calRef = useRef(null);

  // close calendar on outside click
  useEffect(() => {
    const handler = (e) => {
      if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const slotsForDate = selectedDate
    ? doctor.slots[selectedDate.getDay()] || []
    : [];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const formatDate = (d) =>
    d ? `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}` : null;

  return (
    <div
      style={{
        background: colors.surfaceContainerLowest,
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${colors.outlineVariant}1a`,
        boxShadow: "0 4px 32px rgba(25,28,30,0.05)",
        fontFamily: "Inter",
        position: "relative",
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <img
          src={doctor.img}
          alt={doctor.name}
          style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: colors.onSurface, fontFamily: "Manrope", lineHeight: 1.2 }}>
              {doctor.name}
            </h3>
            <div style={{
              display: "flex", alignItems: "center", gap: 3,
              background: colors.tertiaryFixed, borderRadius: 9999,
              padding: "2px 8px", flexShrink: 0,
            }}>
              <DashIcon name="star" filled size={13} color={colors.onTertiaryFixedVariant} />
              <span style={{ fontSize: 11, fontWeight: 700, color: colors.onTertiaryFixedVariant }}>{doctor.rating}</span>
            </div>
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: colors.primary, marginBottom: 6 }}>{doctor.specialty}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: colors.onSurfaceVariant }}>
            <DashIcon name="work" size={14} color={colors.onSurfaceVariant} />
            <span style={{ fontSize: 11 }}>{doctor.experience}</span>
          </div>
        </div>
      </div>

      {/* ── Calendar Trigger ── */}
      <div style={{ marginBottom: 16, position: "relative" }} ref={calRef}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: colors.outline }}>
            {selectedDate ? `Slots for ${formatDate(selectedDate)}` : `Available Slots ${doctor.availability}`}
          </p>
          <p style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>{doctor.fee}</p>
        </div>

        {/* Date picker button */}
        <button
          onClick={() => setCalOpen(!calOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            background: calOpen ? colors.primaryFixed : colors.surfaceContainerLow,
            borderRadius: 10,
            border: `1px solid ${calOpen ? colors.primaryContainer : colors.outlineVariant}40`,
            cursor: "pointer",
            marginBottom: 10,
            transition: "background 0.15s, border-color 0.15s",
            fontFamily: "Inter",
          }}
        >
          <DashIcon name="calendar_month" size={16} color={calOpen ? colors.primaryContainer : colors.onSurfaceVariant} />
          <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: calOpen ? colors.primaryContainer : colors.onSurfaceVariant, textAlign: "left" }}>
            {selectedDate ? formatDate(selectedDate) : "Pick a date"}
          </span>
          <DashIcon
            name="expand_more"
            size={16}
            color={calOpen ? colors.primaryContainer : colors.onSurfaceVariant}
            style={{ transform: calOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
          />
        </button>

        {/* Calendar dropdown */}
        {calOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              zIndex: 50,
              animation: "fadeDown 0.15s ease",
            }}
          >
            <MiniCalendar
              selectedDate={selectedDate}
              onSelect={(d) => { handleDateSelect(d); setCalOpen(false); }}
              slots={doctor.slots}
            />
          </div>
        )}

        {/* Time slots */}
        {selectedDate && (
          <div>
            {slotsForDate.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {slotsForDate.map((slot) => {
                  const isSel = selectedSlot === slot;
                  const isHov = slotHovers[slot];
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(isSel ? null : slot)}
                      onMouseEnter={() => setSlotHovers((p) => ({ ...p, [slot]: true }))}
                      onMouseLeave={() => setSlotHovers((p) => ({ ...p, [slot]: false }))}
                      style={{
                        padding: "8px 4px",
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 8,
                        border: `1px solid ${isSel ? colors.primaryContainer : "transparent"}`,
                        background: isSel ? `${colors.primaryContainer}18`
                                  : isHov ? colors.primaryFixed
                                  : colors.surfaceContainerLow,
                        color: isSel ? colors.primaryContainer
                             : isHov ? colors.onPrimaryFixedVariant
                             : colors.onSurface,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontFamily: "Inter",
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{
                textAlign: "center", padding: "14px 0",
                color: colors.outline, fontSize: 12,
                background: colors.surfaceContainerLow,
                borderRadius: 10,
              }}>
                No slots available on this date
              </div>
            )}
          </div>
        )}

        {/* Default slots (no date selected) */}
        {!selectedDate && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {(doctor.slots[new Date().getDay()] || Object.values(doctor.slots)[0] || []).slice(0, 3).map((slot) => {
              const isHov = slotHovers[slot];
              return (
                <button
                  key={slot}
                  onMouseEnter={() => setSlotHovers((p) => ({ ...p, [slot]: true }))}
                  onMouseLeave={() => setSlotHovers((p) => ({ ...p, [slot]: false }))}
                  onClick={() => { setSelectedSlot(slot); }}
                  style={{
                    padding: "8px 4px",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 8,
                    border: "none",
                    background: isHov ? colors.primaryFixed : colors.surfaceContainerLow,
                    color: isHov ? colors.onPrimaryFixedVariant : colors.onSurface,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "Inter",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Book button ── */}
      <button
        onMouseEnter={() => setBookHovered(true)}
        onMouseLeave={() => setBookHovered(false)}
        onClick={()=>setCurrNav('book')}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: bookHovered
            ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
            : colors.surfaceContainerHigh,
          color: bookHovered ? colors.onPrimary : colors.onSurface,
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "Manrope",
          boxShadow: bookHovered ? `0 4px 16px ${colors.primary}30` : "none",
        }}
      >
        {selectedSlot
          ? `Book — ${formatDate(selectedDate) || doctor.availability}, ${selectedSlot}`
          : "Book Appointment"}
      </button>
    </div>
  );
}