import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";
import { useState } from "react";

export default function MedicineRow({ med }) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      {/* Desktop row */}
      <tr
        className="hidden md:table-row transition-colors"
        style={{ background: hovered ? "#f8fafc" : "transparent" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <td className="px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: med.iconBg }}
            >
              <Icon name={med.icon} size={16} color={med.iconColor} />
            </div>
            <div>
              <span
                className="block text-sm font-bold"
                style={{ color: colors.onSurface }}
              >
                {med.name}
              </span>
              <span className="text-[10px] font-medium" style={{ color: "#94a3b8" }}>
                {med.brand}
              </span>
            </div>
          </div>
        </td>
        <td
          className="px-6 py-5 lg:px-8 text-sm font-semibold"
          style={{ color: "#475569" }}
        >
          {med.dosage}
        </td>
        <td className="px-6 py-5 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#475569" }}>
            <Icon name={med.freqIcon} size={16} color="#94a3b8" />
            {med.frequency}
          </div>
        </td>
        <td className="px-6 py-5 lg:px-8">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "#f1f5f9", color: "#475569" }}
          >
            {med.duration}
          </span>
        </td>
        <td
          className="px-6 py-5 lg:px-8 text-right text-sm font-semibold"
          style={{ color: "#475569" }}
        >
          {med.route}
        </td>
      </tr>

      {/* Mobile card */}
      <tr className="table-row md:hidden">
        <td colSpan={5} className="px-0 py-0">
          <div
            className="mx-4 my-2 rounded-xl p-4 border"
            style={{
              background: colors.surfaceContainerLowest,
              borderColor: `${colors.outlineVariant}30`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: med.iconBg }}
              >
                <Icon name={med.icon} size={18} color={med.iconColor} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: colors.onSurface }}>
                  {med.name}
                </p>
                <p className="text-[10px] font-medium" style={{ color: "#94a3b8" }}>
                  {med.brand}
                </p>
              </div>
            </div>
            {/* Details grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Dosage",    value: med.dosage    },
                { label: "Route",     value: med.route     },
                { label: "Frequency", value: med.frequency },
                { label: "Duration",  value: med.duration  },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg p-2.5"
                  style={{ background: colors.surfaceContainerLow }}
                >
                  <p
                    className="text-[9px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "#94a3b8" }}
                  >
                    {label}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: colors.onSurface }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}