export default function DashIcon({ name, filled = false, size = 22, color, style: extraStyle = {} }) {
  return (
    <span
      style={{
        fontFamily: "'Material Symbols Outlined'",
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        fontSize: size,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        color,
        userSelect: "none",
        flexShrink: 0,
        ...extraStyle,
      }}
    >
      {name}
    </span>
  );
}