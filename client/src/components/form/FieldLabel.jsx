import { colors } from "../../constant/style";

export default function FieldLabel({ children }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 10,
        fontWeight: 700,
        color: colors.onSurfaceVariant,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        fontFamily: "Inter",
        marginBottom: 8,
      }}
    >
      {children}
    </label>
  );
}
