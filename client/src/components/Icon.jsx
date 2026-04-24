export default function Icon({ name, filled = false, size = 24, color }) {
  return (
    <span
      style={{
        fontFamily: "'Material Symbols Outlined'",
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        fontSize: size,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        color: color,
        userSelect: "none",
      }}
    >
      {name}
    </span>
  );
}