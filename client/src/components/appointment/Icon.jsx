import { colors } from "../../constant/style";

export default function Icon({ name, filled = false, size = 20, className = "" }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'Material Symbols Outlined'",
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        fontSize: size,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {name}
    </span>
  );
}