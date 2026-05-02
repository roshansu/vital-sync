
import { useState } from "react";
import DashIcon from "./DashIcon";
import { colors } from "../constant/style";

export default function NavLink({ item, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  const active = isActive;
  const bg     = active ? colors.surfaceContainerLowest
               : hovered ? colors.surfaceContainerHigh
               : "transparent";
  const textColor = active ? colors.primaryContainer : hovered ? colors.onSurface : "#475569";
  const shadow    = active
    ? "0 4px 6px -1px rgba(37,99,235,0.1), 0 2px 4px -2px rgba(37,99,235,0.1)"
    : "none";

  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(item.id); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        borderRadius: 10,
        background: bg,
        boxShadow: shadow,
        textDecoration: "none",
        transition: "background 0.15s, color 0.15s",
        cursor: "pointer",
      }}
    >
      <DashIcon
        name={item.icon}
        filled={active}
        size={22}
        color={textColor}
      />
      <span
        style={{
          fontSize: 14,
          fontWeight: active ? 600 : 500,
          fontFamily: "Inter",
          color: textColor,
          transition: "color 0.15s",
        }}
      >
        {item.label}
      </span>
    </a>
  );
}