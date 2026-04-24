import DashIcon from "../DashIcon";
import { colors } from "../../constant/style";
import { useState } from "react";

export default function PaymentCard({ label, icons, value, selected, onClick }) {
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
        justifyContent: "space-between",
        padding: "16px",
        borderRadius: 14,
        border: `none`,
        outline: active
          ? `2px solid ${colors.primaryContainer}`
          : `1px solid ${colors.outlineVariant}50`,
        background: hovered && !active ? colors.surfaceContainerLow : colors.surfaceContainerLowest,
        cursor: "pointer",
        transition: "all 0.18s",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: `2px solid ${active ? colors.primaryContainer : colors.outlineVariant}`,
            background: active ? colors.primaryContainer : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.15s",
          }}
        >
          {active && (
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: colors.onPrimary }}
            />
          )}
        </div>
        <span style={{ fontWeight: 600, fontSize: 14, color: colors.onSurface }}>{label}</span>
      </div>
      <div style={{ display: "flex", gap: 6, opacity: 0.55 }}>
        {icons.map((ic) => (
          <DashIcon key={ic} name={ic} size={20} color={colors.onSurfaceVariant} />
        ))}
      </div>
    </button>
  );
}
