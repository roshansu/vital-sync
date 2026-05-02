import { useState } from "react";
import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";


export default function PrescriptionCard({ rx, setCurrNav }) {
  const [viewHovered, setViewHovered]     = useState(false);
  const [dlHovered, setDlHovered]         = useState(false);
  const [cardHovered, setCardHovered]     = useState(false);
  const isActive = rx.status === "Active";

  return (
    <div
      className="rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-200 border"
      style={{
        background: colors.surfaceContainerLowest,
        borderColor: cardHovered ? "#e2e8f0" : "transparent",
        boxShadow: cardHovered ? "0 8px 32px rgba(0,0,0,0.06)" : "none",
      }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {/* Left: icon + info */}
      <div className="flex items-center gap-5 flex-1">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isActive ? `${colors.primary}0d` : "#f1f5f9",
            color: isActive ? colors.primary : "#94a3b8",
          }}
        >
          <Icon name="medication" filled={isActive} size={30} color={isActive ? colors.primary : "#94a3b8"} />
        </div>

        {/* Text */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              {rx.doctor}
            </h3>
            <span
              className="px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest"
              style={{
                background: isActive ? `${colors.primary}14` : "#f1f5f9",
                color: isActive ? colors.primary : "#64748b",
              }}
            >
              {rx.status}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p
              className="text-sm flex items-center gap-1.5"
              style={{ color: colors.onSurfaceVariant }}
            >
              <Icon name="calendar_today" size={14} color="#94a3b8" />
              {rx.date}
            </p>
            <p
              className="text-sm flex items-center gap-1.5"
              style={{ color: colors.onSurfaceVariant }}
            >
              <Icon name="diagnosis" size={14} color="#94a3b8" />
              {rx.diagnosis}
            </p>
            <p
              className="text-sm flex items-center gap-1.5"
              style={{ color: colors.onSurfaceVariant }}
            >
              <Icon name="stethoscope" size={14} color="#94a3b8" />
              {rx.specialty}
            </p>
          </div>
        </div>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onMouseEnter={() => setViewHovered(true)}
          onMouseLeave={() => setViewHovered(false)}
          onClick={()=>setCurrNav('prescriptionDetail')}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors"
          style={{
            background: viewHovered ? colors.surfaceContainerHigh : colors.surfaceContainerLow,
            color: colors.onSurface,
            border: "none",
            cursor: "pointer",
            fontFamily: "Inter",
          }}
        >
          <Icon name="visibility" size={18} color={colors.onSurface} />
          View Details
        </button>

        <button
          onMouseEnter={() => setDlHovered(true)}
          onMouseLeave={() => setDlHovered(false)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all"
          style={{
            background: "transparent",
            color: dlHovered ? colors.primaryContainer : colors.onSurfaceVariant,
            border: `1px solid ${dlHovered ? colors.primaryContainer + "50" : colors.outlineVariant + "50"}`,
            cursor: "pointer",
            fontFamily: "Inter",
          }}
        >
          <Icon name="picture_as_pdf" size={18} color={dlHovered ? colors.primaryContainer : colors.onSurfaceVariant} />
          Download PDF
        </button>
      </div>
    </div>
  );
}