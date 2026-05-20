import { useState } from "react";
import Icon from "../appointment/Icon";
import { colors } from "../../constant/style";

export default function QuickAction({ icon, label, primary = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95"
      style={{
        background: primary
          ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
          : colors.surfaceContainerHigh,
        color: primary ? colors.onPrimaryContainer : colors.onSurface,
        border: "none",
        cursor: "pointer",
        fontFamily: "Manrope",
        boxShadow: primary && hovered ? `0 8px 20px ${colors.primary}35` : "none",
        opacity: hovered && !primary ? 0.85 : 1,
      }}
    >
      <Icon name={icon} size={20} color={primary ? colors.onPrimary : colors.onSurface} />
      {label}
    </button>
  );
}