import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";
import { useState } from "react";

export default function AppointmentRow({ appt, setCurrNav }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
    onClick={()=>setCurrNav('appointments')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all"
      style={{
        borderColor: hovered ? `${colors.primary}20` : `${colors.outlineVariant}10`,
        background: hovered ? colors.surfaceContainerLow : "transparent",
      }}
    >
      <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
        {/* Date chip */}
        <div
          className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
          style={{ background: colors.primaryFixed, color: colors.primary }}
        >
          <span className="text-[9px] font-bold uppercase leading-none">{new Date(appt.date).toLocaleString("default",{ month: "short" })}</span>
          <span className="text-lg font-bold leading-none mt-0.5">{new Date(appt.date).getDay()+1}</span>
        </div>

        <div className="min-w-0">
          <h4 className="font-bold text-sm truncate" style={{ color: colors.onSurface }}>
            {appt.patient.firstName+" "+appt.patient.lastName}
          </h4>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span
              className="flex items-center gap-1 text-[11px] font-medium"
              style={{ color: colors.outline }}
            >
              <Icon name="schedule" size={13} color={colors.outline} />
              {appt.time}
            </span>
            <span
              className="flex items-center gap-1 text-[11px] font-medium"
              style={{ color: colors.outline }}
            >
              <Icon name={appt.type === "online" ? "videocam" : "location_on"} size={13} color={colors.outline} />
              {appt.type}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 ml-2 flex-shrink-0">
        <span
          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
          style={{ background: `${colors.primary}14`, color: colors.primary }}
        >
          {appt.status}
        </span>
        <button
          className="p-1 transition-colors"
          style={{ color: hovered ? colors.primaryContainer : colors.primary, background: "none", border: "none", cursor: "pointer" }}
        >
          <Icon name="chevron_right" size={18} color={hovered ? colors.primaryContainer : colors.primary} />
        </button>
      </div>
    </div>
  );
}