import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";
import { useState } from "react";

export default function StatCard({ icon, iconBg, iconColor, label, value, sub, subIcon, subColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl p-6 border transition-all duration-200"
      style={{
        background: colors.surfaceContainerLowest,
        borderColor: `${colors.outlineVariant}18`,
        boxShadow: hovered
          ? "0 8px 32px rgba(25,28,30,0.09)"
          : "0 4px 20px -4px rgba(0,0,0,0.03)",
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color: colors.outline }}
          >
            {label}
          </p>
          <h3
            className="text-4xl font-bold leading-none mb-1"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            {value}
          </h3>
          {sub && (
            <p
              className="text-xs font-medium flex items-center gap-1 mt-3"
              style={{ color: subColor }}
            >
              <Icon name={subIcon} size={13} color={subColor} />
              {sub}
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200"
          style={{
            background: iconBg,
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <Icon name={icon} size={24} color={iconColor} />
        </div>
      </div>
    </div>
  );
}
