import { useState } from "react";
import Icon from "../appointment/Icon";
import { colors } from "../../constant/style";

export default function RescheduleModal({ appointment, onClose, onConfirm }) {
  const [date, setDate]   = useState("2024-10-26");
  const [time, setTime]   = useState("11:30");
  const [note, setNote]   = useState("");
  const [dateFocused, setDateFocused] = useState(false);
  const [timeFocused, setTimeFocused] = useState(false);
  const [noteFocused, setNoteFocused] = useState(false);

  const inputStyle = (focused) => ({
    background: colors.surfaceContainerLow,
    border: "none",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "Inter",
    color: colors.onSurface,
    outline: "none",
    width: "100%",
    boxShadow: focused
      ? `0 0 0 2px ${colors.primaryContainer}45`
      : `0 0 0 1px ${colors.outlineVariant}30`,
    transition: "box-shadow 0.2s",
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(25,28,30,0.5)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: colors.surfaceContainerLowest, animation: "popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex justify-between items-start border-b"
          style={{ borderColor: `${colors.outlineVariant}18` }}
        >
          <div>
            <h2
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              Reschedule Appointment
            </h2>
            <p className="text-xs mt-1" style={{ color: colors.onSurfaceVariant }}>
              Adjust slot for{" "}
              <span className="font-bold" style={{ color: colors.primary }}>
                {appointment.patient.firstName+" "+appointment.patient.lastName}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <Icon name="close" size={20} color={colors.onSurfaceVariant} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 ml-1" style={{ color: colors.outline }}>
                New Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={() => setDateFocused(true)}
                onBlur={() => setDateFocused(false)}
                style={inputStyle(dateFocused)}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 ml-1" style={{ color: colors.outline }}>
                Preferred Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onFocus={() => setTimeFocused(true)}
                onBlur={() => setTimeFocused(false)}
                style={inputStyle(timeFocused)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 ml-1" style={{ color: colors.outline }}>
              Reason for Rescheduling
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onFocus={() => setNoteFocused(true)}
              onBlur={() => setNoteFocused(false)}
              placeholder="Provide a brief note to the patient about the change..."
              style={{ ...inputStyle(noteFocused), resize: "none", lineHeight: 1.6 }}
            />
          </div>

          {/* Info notice */}
          <div
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{ background: `${colors.primary}08` }}
          >
            <Icon name="info" size={18} color={colors.primaryContainer} className="mt-0.5 flex-shrink-0" />
            <p className="text-[11px] font-medium leading-relaxed" style={{ color: colors.onPrimaryFixedVariant }}>
              Patient will receive an automated SMS and Email notification once confirmed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-sm transition-colors"
            style={{ background: colors.surfaceContainerHigh, color: colors.onSurface, border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHighest)}
            onMouseLeave={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm({ date, time, note })}
            className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              color: colors.onPrimary,
              border: "none",
              cursor: "pointer",
              fontFamily: "Manrope",
              boxShadow: `0 4px 16px ${colors.primary}30`,
            }}
          >
            Confirm Change
          </button>
        </div>
      </div>
    </div>
  );
}