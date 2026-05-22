import { colors } from "../../constant/style";
import PaymentBadge from './PaymentBadge'
import PatientAvatar from "./PatientAvatar";
import StatusBadge from './StatusBadge'
import { useState } from "react";
import Icon from "../appointment/Icon";

export default function AppointmentRow({ appt, onApprove, onReject, onComplete, onReschedule, visible }) {
  // console.log("apppt",appt)
  
  const [hovered, setHovered] = useState(false);
  const isPending   = appt.status === "Pending";
  const isApproved  = appt.status === "Approved";
  const isCompleted = appt.status === "Completed";
  const isRejected  = appt.status === "Rejected";

  return (
    <div
      className="rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 border transition-all duration-300"
      style={{
        background: colors.surfaceContainerLowest,
        borderColor: `${colors.outlineVariant}0d`,
        opacity: visible ? (isRejected || isCompleted ? 0.85 : 1) : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        boxShadow: hovered ? "0 8px 32px rgba(25,28,30,0.07)" : "0 1px 4px rgba(25,28,30,0.03)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left: avatar + info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <PatientAvatar appt={appt} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 flex-1 min-w-0">
          {/* Patient + datetime */}
          <div className="min-w-0">
            <h3 className="text-sm md:text-base font-bold leading-tight" style={{ color: colors.onSurface }}>
              {appt.patient}
            </h3>
            <p className="text-xs mt-0.5 font-medium" style={{ color: colors.onSurfaceVariant }}>
              {appt.date} · {appt.time}
            </p>
          </div>

          {/* Reason */}
          <div className="hidden md:block">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: colors.outline }}>
              Reason
            </p>
            <p className="text-sm font-medium truncate" style={{ color: colors.onSurface }}>
              {appt.reason}
            </p>
          </div>

          {/* Type */}
          <div className="hidden md:block">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: colors.outline }}>
              Type
            </p>
            <div className="flex items-center gap-1.5">
              <Icon name={appt.typeIcon} size={16} color={appt.typeColor} />
              <span className="text-sm font-semibold" style={{ color: appt.typeColor }}>
                {appt.type}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <PaymentBadge paid={appt.payment === "Paid"} />
            <StatusBadge status={appt.status} />
          </div>
        </div>
      </div>

      {/* Right: actions */}
      <div
        className="flex items-center gap-2 md:pl-5 md:border-l flex-wrap"
        style={{ borderColor: `${colors.outlineVariant}18` }}
      >
        {isPending && (
          <>
            <button
              onClick={() => onReschedule(appt)}
              title="Reschedule"
              className="p-2 rounded-lg transition-colors"
              style={{ color: colors.onSurfaceVariant, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <Icon name="schedule" size={20} color={colors.onSurfaceVariant} />
            </button>
            <button
              onClick={() => onReject(appt)}
              className="px-4 py-2 text-sm font-bold rounded-lg transition-colors"
              style={{ color: colors.error, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${colors.error}0d`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(appt)}
              className="px-4 py-2 text-sm font-bold rounded-lg transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimary,
                border: "none",
                cursor: "pointer",
                boxShadow: `0 4px 12px ${colors.primary}30`,
                fontFamily: "Manrope",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Approve
            </button>
          </>
        )}

        {isApproved && (
          <>
            <button
              onClick={() => {}}
              className="px-4 py-2 text-sm font-bold rounded-lg border transition-colors"
              style={{
                color: colors.primary,
                borderColor: `${colors.primary}30`,
                background: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${colors.primary}08`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              View Patient
            </button>
            <button
              onClick={() => onComplete(appt)}
              className="px-4 py-2 text-sm font-bold rounded-lg transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimary,
                border: "none",
                cursor: "pointer",
                fontFamily: "Manrope",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Mark Completed
            </button>
          </>
        )}

        {isCompleted && (
          <span
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold"
            style={{ background: "#f0fdf4", color: "#15803d" }}
          >
            <Icon name="check_circle" filled size={15} color="#15803d" />
            Completed
          </span>
        )}

        {isRejected && (
          <span
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold"
            style={{ background: colors.errorContainer, color: colors.error }}
          >
            <Icon name="cancel" filled size={15} color={colors.error} />
            Rejected
          </span>
        )}
      </div>
    </div>
  );
}