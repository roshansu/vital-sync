import { useState } from "react";
import { colors } from "../../constant/style";

export default function FooterAction({ label, hoverColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-[10px] font-bold uppercase tracking-widest transition-colors"
      style={{
        color: hovered ? hoverColor : `${colors.onSurfaceVariant}60`,
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}