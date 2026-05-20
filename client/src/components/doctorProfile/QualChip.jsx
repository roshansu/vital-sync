
import { colors } from "../../constant/style";

export default function QualChip({ label, onRemove }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold shadow-sm"
      style={{ background: colors.surfaceContainerLowest, color: "#475569" }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: 0, color: "#94a3b8" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.error)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
        >
          ×
        </button>
      )}
    </span>
  );
}