import DashIcon from "../DashIcon";
import { colors } from "../../constant/style";
import { useState } from "react";

export default function ConsultTypeCard({ icon, label, value, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = selected === value;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px",
        borderRadius: 14,
        border: `2px solid ${active ? colors.primaryContainer : "transparent"}`,
        background: active
          ? colors.primaryFixed
          : hovered
          ? colors.surfaceContainerHigh
          : colors.surfaceContainerLow,
        cursor: "pointer",
        transition: "all 0.18s",
        fontFamily: "Inter",
      }}
    >
      <DashIcon
        name={icon}
        size={20}
        color={active ? colors.primaryContainer : colors.onSurfaceVariant}
      />
      <span
        style={{
          fontWeight: 600,
          fontSize: 14,
          color: active ? colors.primaryContainer : colors.onSurface,
        }}
      >
        {label}
      </span>
    </button>
  );
}