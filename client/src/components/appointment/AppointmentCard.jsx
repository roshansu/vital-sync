import { useState } from "react"
import { colors } from "../../constant/style";
import Icon from "./Icon";

export default function AppointmentCard({ appt, onCancel }) {
  const [cancelConfirm, setCancelConfirm] = useState(false);

  return (
    <div
      className="rounded-xl p-6 border transition-all duration-200 group"
      style={{
        background: colors.surfaceContainerLowest,
        borderColor: `${colors.outlineVariant}1a`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = `${colors.primaryContainer}33`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = `${colors.outlineVariant}1a`)
      }
    >
      {/* ── Top: Doctor info + badge ── */}
      <div className="lg:flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <img
            src={appt.img}
            alt={appt.name}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div>
            <h3
              className="font-bold lg:text-lg leading-tight"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              {appt.name}
            </h3>
            <p
              className="text-sm font-medium mt-0.5"
              style={{ color: colors.primaryContainer }}
            >
              {appt.specialty}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <Icon
                name="location_on"
                size={14}
                className="text-slate-400"
                style={{ color: "#94a3b8" }}
              />
              <span className="text-xs" style={{ color: "#64748b" }}>
                {appt.location}
              </span>
            </div>
          </div>
        </div>

        {/* Status badge */}
        <span
          className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border"
          style={{
            background: "#eff6ff",
            color: "#1d4ed8",
            borderColor: "#bfdbfe",
          }}
        >
          {appt.status}
        </span>
      </div>

      {/* ── Date / Time row ── */}
      <div
        className="grid grid-cols-2 gap-4 lg:py-4 mb-6"
        style={{
          borderTop: `1px solid ${colors.outlineVariant}1a`,
          borderBottom: `1px solid ${colors.outlineVariant}1a`,
        }}
      >
        {[
          { icon: "calendar_month", label: "Date", value: appt.date },
          { icon: "schedule",       label: "Time", value: appt.time },
        ].map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: colors.surfaceContainerLow, color: colors.primary }}
            >
              <Icon name={icon} size={18} style={{ color: colors.primary }} />
            </div>
            <div>
              <p
                className="text-[10px] uppercase tracking-wider font-bold"
                style={{ color: "#94a3b8" }}
              >
                {label}
              </p>
              <p
                className="text-sm font-semibold"
                style={{ color: colors.onSurface }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Fee + Actions ── */}
      <div className="lg:flex items-center justify-between">
        <div>
          <span
            className="text-[10px] uppercase tracking-wider font-bold block mb-0.5"
            style={{ color: "#94a3b8" }}
          >
            Consultation Fee
          </span>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            {appt.fee}
          </span>
        </div>

        <div className="flex gap-2 lg:mt-0 mt-4">
          {/* Cancel */}
          {cancelConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: colors.error }}>
                Sure?
              </span>
              <button
                onClick={() => { onCancel(appt.id); setCancelConfirm(false); }}
                className="px-3 py-1.5 text-xs font-bold rounded-lg transition-opacity hover:opacity-80"
                style={{ background: colors.error, color: colors.onPrimary }}
              >
                Yes, cancel
              </button>
              <button
                onClick={() => setCancelConfirm(false)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg"
                style={{
                  background: colors.surfaceContainerHigh,
                  color: colors.onSurface,
                }}
              >
                Keep
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCancelConfirm(true)}
              className="px-4 py-2 text-xs font-bold rounded-lg border transition-colors hover:bg-slate-50"
              style={{
                color: "#64748b",
                borderColor: colors.outlineVariant,
              }}
            >
              Cancel Appointment
            </button>
          )}

          {/* View Details */}
          <button
            className="px-4 py-2 text-xs font-bold rounded-lg transition-opacity hover:opacity-90"
            style={{
              background: colors.primary,
              color: colors.onPrimaryContainer,
              fontFamily: "Inter",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}