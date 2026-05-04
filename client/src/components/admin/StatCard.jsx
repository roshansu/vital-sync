import { useState } from "react";
import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";

export default function StatCard({ stat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl p-6 border flex flex-col justify-between h-32 transition-all duration-200"
      style={{
        background: colors.surfaceContainerLowest,
        borderColor: `${colors.outlineVariant}18`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(25,28,30,0.07)" : "0 1px 4px rgba(25,28,30,0.03)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#94a3b8" }}
        >
          {stat.label}
        </span>
        <div
          className="p-1.5 rounded-lg"
          style={{ background: "#eff6ff" }}
        >
          <Icon name={stat.icon} filled size={18} color={colors.primary} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3
          className="text-3xl font-extrabold"
          style={{ fontFamily: "Manrope", color: colors.onSurface }}
        >
          {stat.value}
        </h3>
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: stat.up ? "#f0fdf4" : "#fef2f2",
            color: stat.up ? "#15803d" : "#dc2626",
          }}
        >
          {stat.trend}
        </span>
      </div>
    </div>
  );
}